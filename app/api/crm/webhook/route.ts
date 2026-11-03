// Webhook de entrada: outros sistemas (Make, Zapier, n8n, Lead Ads do Facebook) criam leads no CRM.
//
// POST https://www.tiagobaterias.com.br/api/crm/webhook
// Autenticação: cabeçalho  X-CRM-Token: <CRM_WEBHOOK_TOKEN>   (ou ?token=<CRM_WEBHOOK_TOKEN> na URL)
// Corpo JSON (um lead ou {"leads":[...]}, até 20):
//   { "nome": "Maria", "telefone": "21999990000", "email": "", "veiculo": "Onix 2019",
//     "origem": "Facebook", "campanha": "Bateria 60Ah", "unidade": "Nilópolis", "notas": "" }
// Também aceita os nomes de campo do Lead Ads: full_name, phone_number, email.

import { clientIp, json, rateLimit } from '@/lib/crm'
import { intakeLead } from '@/lib/intake'

export const dynamic = 'force-dynamic'

function tokenOk(req: Request): boolean {
  const real = process.env.CRM_WEBHOOK_TOKEN || ''
  if (real.length < 16) return false
  const url = new URL(req.url)
  const got = req.headers.get('x-crm-token') || url.searchParams.get('token') || ''
  if (got.length !== real.length) return false
  let r = 0
  for (let i = 0; i < real.length; i++) r |= real.charCodeAt(i) ^ got.charCodeAt(i)
  return r === 0
}

const s = (v: unknown, max: number) => (typeof v === 'string' || typeof v === 'number' ? String(v).trim().slice(0, max) : '')

export async function POST(req: Request) {
  if (!process.env.CRM_WEBHOOK_TOKEN) return json({ erro: 'nao_configurado' }, 503)
  if (!tokenOk(req)) return json({ erro: 'token_invalido' }, 401)
  try {
    if (!(await rateLimit(`hook:${clientIp(req)}`, 120, 60 * 60))) return json({ erro: 'muitas_tentativas' }, 429)
  } catch {
    return json({ erro: 'banco_indisponivel' }, 503)
  }

  let body: unknown
  try { body = await req.json() } catch { return json({ erro: 'json_invalido' }, 400) }
  const lista = (Array.isArray((body as { leads?: unknown }).leads) ? (body as { leads: unknown[] }).leads : [body]).slice(0, 20)

  const resultados: { ok: boolean; id?: string; novo?: boolean; erro?: string }[] = []
  for (const item of lista) {
    const b = (item || {}) as Record<string, unknown>
    const nome = s(b.nome ?? b.name ?? b.full_name, 120)
    const telefone = s(b.telefone ?? b.phone ?? b.phone_number ?? b.whatsapp, 40)
    if (nome.length < 2 || telefone.replace(/\D/g, '').length < 10) {
      resultados.push({ ok: false, erro: 'nome_ou_telefone_invalido' })
      continue
    }
    try {
      const { lead, novo } = await intakeLead({
        nome,
        telefone,
        email: s(b.email, 120),
        veiculo: s(b.veiculo ?? b.carro, 120),
        origem: s(b.origem ?? b.source, 60) || 'Webhook',
        campanha: s(b.campanha ?? b.campaign ?? b.campaign_name ?? b.ad_name, 120),
        unidade: s(b.unidade ?? b.loja, 40),
        notas: s(b.notas ?? b.mensagem ?? b.message, 1000),
      })
      resultados.push({ ok: true, id: lead.id, novo })
    } catch {
      resultados.push({ ok: false, erro: 'banco_indisponivel' })
    }
  }
  const algumOk = resultados.some((r) => r.ok)
  return json({ ok: algumOk, resultados }, algumOk ? 200 : 400)
}
