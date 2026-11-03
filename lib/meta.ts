// Conversions API da Meta (eventos enviados pelo servidor).
// Variáveis de ambiente:
//   META_CAPI_TOKEN        -> token de acesso gerado no Gerenciador de Eventos (obrigatório)
//   META_PIXEL_ID          -> opcional, padrão 1983739398945340
//   META_TEST_EVENT_CODE   -> opcional, para ver os eventos na aba "Testar eventos"
//   WA_WABA_ID             -> opcional, ID da conta WhatsApp Business (eventos de anúncios Clique para WhatsApp)

import { redis } from './crm'

export const META_LOG_KEY = 'crm:meta:log'
const GRAPH = 'https://graph.facebook.com/v21.0'

export type MetaEvent = 'Lead' | 'QualifiedLead' | 'Purchase'

/** Qual evento cada etapa do funil gera. */
export const STAGE_EVENT: Record<string, MetaEvent | undefined> = {
  novo: 'Lead',
  contato: 'Lead',
  orcamento: 'QualifiedLead',
  fechado: 'Purchase',
}
const ORDER: MetaEvent[] = ['Lead', 'QualifiedLead', 'Purchase']

/** Eventos que ainda faltam enviar para um lead ao chegar nesta etapa (inclui os anteriores pulados). */
export function eventsForStage(etapa: string, jaEnviados: string[]): MetaEvent[] {
  const alvo = STAGE_EVENT[etapa]
  if (!alvo) return []
  const ate = ORDER.indexOf(alvo)
  return ORDER.slice(0, ate + 1).filter((e) => !jaEnviados.includes(e))
}

export function metaConfigured(): boolean {
  return Boolean(process.env.META_CAPI_TOKEN)
}

async function sha256(v: string): Promise<string> {
  const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(v))
  return Array.from(new Uint8Array(d)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

/** Telefone no formato que a Meta espera: só dígitos, com 55. */
export function phoneE164(tel: string): string {
  let d = String(tel || '').replace(/\D/g, '')
  if (!d) return ''
  if (d.length <= 11) d = '55' + d
  return d
}

function normText(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z]/g, '')
}

export type LeadLike = {
  id: string
  nome?: string
  telefone?: string
  email?: string
  valor?: number
  campanha?: string
  origem?: string
  unidade?: string
  ctwaClid?: string
}

export type Contexto = {
  /** 'website' para o formulário do site, 'system_generated' para o CRM */
  fonte?: 'website' | 'system_generated'
  url?: string
  ip?: string
  userAgent?: string
  fbp?: string
  fbc?: string
}

/** Envia um evento para a Meta. Nunca lança erro: devolve ok/erro e registra no log. */
export async function sendMetaEvent(evento: MetaEvent, lead: LeadLike, ctx: Contexto = {}): Promise<{ ok: boolean; erro?: string }> {
  const token = process.env.META_CAPI_TOKEN
  const pixel = process.env.META_PIXEL_ID || '1983739398945340'
  if (!token) return { ok: false, erro: 'nao_configurado' }

  const user: Record<string, unknown> = {}
  const ph = phoneE164(lead.telefone || '')
  if (ph) user.ph = [await sha256(ph)]
  const email = String(lead.email || '').trim().toLowerCase()
  if (email.includes('@')) user.em = [await sha256(email)]
  const partes = String(lead.nome || '').trim().split(/\s+/).filter(Boolean)
  if (partes[0]) user.fn = [await sha256(normText(partes[0]))]
  if (partes.length > 1) user.ln = [await sha256(normText(partes[partes.length - 1]))]
  user.ct = [await sha256(normText(lead.unidade === 'Nilópolis' ? 'nilopolis' : 'riodejaneiro'))]
  user.st = [await sha256('rj')]
  user.country = [await sha256('br')]
  user.external_id = [await sha256(lead.id)]
  if (ctx.ip) user.client_ip_address = ctx.ip
  if (ctx.userAgent) user.client_user_agent = ctx.userAgent
  if (ctx.fbp) user.fbp = ctx.fbp
  if (ctx.fbc) user.fbc = ctx.fbc

  const custom: Record<string, unknown> = {
    lead_event_source: 'CRM Tiago Baterias',
    event_source: 'crm',
  }
  if (lead.campanha) custom.content_name = lead.campanha
  if (lead.origem) custom.content_category = lead.origem
  if (evento === 'Purchase') {
    custom.value = Number(lead.valor) > 0 ? Number(lead.valor) : 0
    custom.currency = 'BRL'
  }

  const ev: Record<string, unknown> = {
    event_name: evento,
    event_time: Math.floor(Date.now() / 1000),
    event_id: `${lead.id}:${evento}`,
    action_source: ctx.fonte || 'system_generated',
    user_data: user,
    custom_data: custom,
  }
  if (ctx.fonte === 'website' && ctx.url) ev.event_source_url = ctx.url

  // Lead que veio de anúncio Clique para WhatsApp: a Meta liga o evento ao anúncio pelo ctwa_clid
  if (lead.ctwaClid && process.env.WA_WABA_ID) {
    ev.action_source = 'business_messaging'
    ev.messaging_channel = 'whatsapp'
    user.ctwa_clid = lead.ctwaClid
    user.whatsapp_business_account_id = process.env.WA_WABA_ID
  }

  const body: Record<string, unknown> = { data: [ev] }
  if (process.env.META_TEST_EVENT_CODE) body.test_event_code = process.env.META_TEST_EVENT_CODE

  let ok = false
  let erro = ''
  try {
    const res = await fetch(`${GRAPH}/${pixel}/events?access_token=${encodeURIComponent(token)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    })
    const j = (await res.json().catch(() => ({}))) as { error?: { message?: string } }
    ok = res.ok && !j.error
    if (!ok) erro = (j.error?.message || `HTTP ${res.status}`).slice(0, 200)
  } catch (e) {
    erro = e instanceof Error ? e.message.slice(0, 200) : 'falha_rede'
  }

  try {
    await redis(['LPUSH', META_LOG_KEY, JSON.stringify({ em: new Date().toISOString(), evento, lead: lead.id, ok, erro })])
    await redis(['LTRIM', META_LOG_KEY, 0, 49])
  } catch { /* log é opcional */ }

  return ok ? { ok } : { ok, erro }
}

/** Envia, em ordem, os eventos que faltam e devolve a lista atualizada de enviados. */
export async function syncMetaEvents(lead: LeadLike & { etapa: string }, jaEnviados: string[], ctx?: Contexto): Promise<string[]> {
  if (!metaConfigured()) return jaEnviados
  const enviados = [...jaEnviados]
  for (const ev of eventsForStage(lead.etapa, enviados)) {
    const r = await sendMetaEvent(ev, lead, ctx)
    if (r.ok) enviados.push(ev)
    else break
  }
  return enviados
}
