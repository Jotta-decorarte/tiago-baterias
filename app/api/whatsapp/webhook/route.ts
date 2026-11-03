// Webhook da API oficial do WhatsApp (Cloud API da Meta), incluindo o modo coexistência
// (o número continua no app WhatsApp Business e a API recebe cópia das conversas).
//
// URL de callback:   https://www.tiagobaterias.com.br/api/whatsapp/webhook
// Token de verificação: valor de WA_VERIFY_TOKEN
// Campos para assinar no app da Meta: messages, smb_message_echoes, history
//
// Variáveis de ambiente:
//   WA_VERIFY_TOKEN  -> token que você inventa e cola no painel da Meta (obrigatório)
//   WA_APP_SECRET    -> "Chave secreta do app" da Meta, para validar a assinatura (recomendado)

import { Lead, addMessage, findLeadByPhone, getLead, json, redis, saveLead } from '@/lib/crm'
import { intakeLead } from '@/lib/intake'

export const dynamic = 'force-dynamic'

const WA_STATUS_KEY = 'crm:wa:ultimo'

// ---------- verificação (GET) ----------
export async function GET(req: Request) {
  const u = new URL(req.url)
  const token = process.env.WA_VERIFY_TOKEN || ''
  if (token && u.searchParams.get('hub.mode') === 'subscribe' && u.searchParams.get('hub.verify_token') === token) {
    return new Response(u.searchParams.get('hub.challenge') || '', { status: 200, headers: { 'Content-Type': 'text/plain' } })
  }
  return new Response('Forbidden', { status: 403 })
}

// ---------- utilidades ----------
async function hmacHex(secret: string, raw: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(raw))
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

function eq(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let r = 0
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return r === 0
}

async function autorizado(req: Request, raw: string): Promise<boolean> {
  const secret = process.env.WA_APP_SECRET
  if (secret) {
    const got = req.headers.get('x-hub-signature-256') || ''
    return eq(got, 'sha256=' + (await hmacHex(secret, raw)))
  }
  // sem app secret (ex.: alguns parceiros BSP): exige o token na URL
  const token = process.env.WA_VERIFY_TOKEN || ''
  return Boolean(token) && new URL(req.url).searchParams.get('token') === token
}

/** 5521987323958 -> (21) 98732-3958 */
function fmtPhone(waId: string): string {
  let d = String(waId || '').replace(/\D/g, '')
  if (d.startsWith('55') && d.length >= 12) d = d.slice(2)
  if (d.length === 10) d = d.slice(0, 2) + '9' + d.slice(2) // celular antigo sem o 9
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
  return '+' + String(waId || '').replace(/\D/g, '')
}

type WaMsg = Record<string, any>

function textoDa(m: WaMsg): string {
  const t = String(m.type || '')
  switch (t) {
    case 'text': return String(m.text?.body || '')
    case 'image': return '[Foto]' + (m.image?.caption ? ' ' + m.image.caption : '')
    case 'video': return '[Vídeo]' + (m.video?.caption ? ' ' + m.video.caption : '')
    case 'audio': return m.audio?.voice ? '[Áudio de voz]' : '[Áudio]'
    case 'document': return '[Documento]' + (m.document?.filename ? ' ' + m.document.filename : '')
    case 'sticker': return '[Figurinha]'
    case 'location': return '[Localização]' + (m.location?.address || m.location?.name ? ' ' + (m.location.name || m.location.address) : ` ${m.location?.latitude},${m.location?.longitude}`)
    case 'contacts': return '[Contato compartilhado]'
    case 'button': return String(m.button?.text || '[Botão]')
    case 'interactive': return String(m.interactive?.button_reply?.title || m.interactive?.list_reply?.title || '[Resposta]')
    case 'reaction': return `[Reagiu ${m.reaction?.emoji || ''}]`
    case 'order': return '[Pedido pelo catálogo]'
    default: return `[${t || 'mensagem'}]`
  }
}

function quando(ts: unknown): string {
  const n = Number(ts)
  return Number.isFinite(n) && n > 0 ? new Date(n * 1000).toISOString() : new Date().toISOString()
}

/** true se é a primeira vez que vemos esta mensagem */
async function primeiraVez(id: string): Promise<boolean> {
  if (!id) return true
  return (await redis(['SET', `crm:wamid:${id}`, '1', 'NX', 'EX', 60 * 60 * 72])) === 'OK'
}
async function jaVista(id: string): Promise<boolean> {
  if (!id) return false
  return Boolean(await redis(['EXISTS', `crm:wamid:${id}`]))
}

async function registrar(lead: Lead, texto: string, de: 'cliente' | 'loja', em: string, id: string, tipo: string, waNome?: string) {
  await addMessage(lead.id, { id, de, texto: texto.slice(0, 2000), tipo, em })
  const atual = (await getLead(lead.id)) || lead
  const mudou: Lead = {
    ...atual,
    waNome: waNome || atual.waNome,
  }
  if (!atual.ultimaMsgEm || em >= atual.ultimaMsgEm) {
    mudou.ultimaMensagem = texto.slice(0, 160)
    mudou.ultimaMsgEm = em
    mudou.ultimaMsgDe = de
  }
  if (de === 'cliente') {
    mudou.naoLidas = (atual.naoLidas || 0) + 1
    if (atual.etapa === 'perdido') {
      mudou.etapa = 'novo'
      mudou.fechadoEm = ''
      mudou.motivoPerda = ''
    }
  } else {
    mudou.naoLidas = 0
    // a loja respondeu pelo app: lead novo passa para "Contato feito"
    if (atual.etapa === 'novo') mudou.etapa = 'contato'
  }
  await saveLead(mudou)
}

// ---------- recebimento (POST) ----------
export async function POST(req: Request) {
  if (!process.env.WA_VERIFY_TOKEN) return json({ erro: 'nao_configurado' }, 503)
  const raw = await req.text()
  if (!(await autorizado(req, raw))) return json({ erro: 'assinatura_invalida' }, 401)

  let body: Record<string, any>
  try { body = JSON.parse(raw) } catch { return json({ erro: 'json_invalido' }, 400) }

  let processadas = 0
  try {
    for (const entry of Array.isArray(body.entry) ? body.entry : []) {
      for (const change of Array.isArray(entry.changes) ? entry.changes : []) {
        const v = change.value || {}
        const field = String(change.field || '')

        // 1) mensagens que o cliente mandou
        if (field === 'messages' && Array.isArray(v.messages)) {
          const nomes: Record<string, string> = {}
          for (const c of Array.isArray(v.contacts) ? v.contacts : []) {
            if (c?.wa_id) nomes[String(c.wa_id)] = String(c.profile?.name || '')
          }
          for (const m of v.messages) {
            const id = String(m.id || '')
            if (await jaVista(id)) continue
            const from = String(m.from || '')
            const waNome = nomes[from] || ''
            const ref = m.referral || null
            let lead = await findLeadByPhone(from)
            if (!lead) {
              const r = await intakeLead({
                nome: waNome || 'Cliente WhatsApp',
                telefone: fmtPhone(from),
                origem: ref ? 'Anúncio Meta (WhatsApp)' : 'WhatsApp',
                campanha: ref ? String(ref.headline || ref.source_id || '').slice(0, 120) : '',
                notas: ref ? `Veio do anúncio: ${String(ref.headline || '')} ${String(ref.source_url || '')}`.trim() : '',
                ctwaClid: ref?.ctwa_clid ? String(ref.ctwa_clid) : undefined,
                waNome,
              })
              lead = r.lead
            } else if (ref?.ctwa_clid && !lead.ctwaClid) {
              lead = { ...lead, ctwaClid: String(ref.ctwa_clid) }
              await saveLead(lead)
            }
            await registrar(lead, textoDa(m), 'cliente', quando(m.timestamp), id, String(m.type || ''), waNome)
            await primeiraVez(id)
            processadas++
          }
        }

        // 2) mensagens que a loja mandou pelo app WhatsApp Business (coexistência)
        if (field === 'smb_message_echoes' && Array.isArray(v.message_echoes)) {
          for (const m of v.message_echoes) {
            const id = String(m.id || '')
            if (await jaVista(id)) continue
            const lead = await findLeadByPhone(String(m.to || ''))
            if (lead) {
              await registrar(lead, textoDa(m), 'loja', quando(m.timestamp), id, String(m.type || ''))
              processadas++
            }
            await primeiraVez(id)
          }
        }

        // 3) histórico importado ao conectar o número: só anexa a leads que já existem
        if (field === 'history' && Array.isArray(v.history)) {
          for (const h of v.history) {
            for (const th of Array.isArray(h.threads) ? h.threads : []) {
              const cliente = String(th.id || '')
              const lead = await findLeadByPhone(cliente)
              if (!lead) continue
              const msgs = (Array.isArray(th.messages) ? th.messages : []).slice(-100)
              for (const m of msgs) {
                const id = String(m.id || '')
                if (!(await primeiraVez(id))) continue
                const de = String(m.from || '').replace(/\D/g, '') === cliente.replace(/\D/g, '') ? 'cliente' : 'loja'
                await addMessage(lead.id, { id, de, texto: textoDa(m).slice(0, 2000), tipo: String(m.type || ''), em: quando(m.timestamp) })
                processadas++
              }
            }
          }
        }
      }
    }
    await redis(['SET', WA_STATUS_KEY, JSON.stringify({ em: new Date().toISOString(), processadas })])
  } catch {
    // erro de banco: a Meta tenta de novo depois
    return json({ erro: 'banco_indisponivel' }, 500)
  }
  return json({ ok: true, processadas })
}
