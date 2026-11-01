import { LEADS_KEY, clientIp, crmConfigured, json, rateLimit, redis } from '@/lib/crm'

export const dynamic = 'force-dynamic'

// Recebe o cadastro da Lista VIP do site e cria um lead no CRM.
// Público, por isso aceita só campos básicos e tem limite por IP.
export async function POST(req: Request) {
  if (!crmConfigured()) return json({ ok: false }, 202)
  let body: Record<string, unknown>
  try { body = (await req.json()) as Record<string, unknown> } catch { return json({ erro: 'json_invalido' }, 400) }

  // campo isca: robôs costumam preencher
  if (typeof body.site === 'string' && body.site.trim()) return json({ ok: true })

  const s = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
  const nome = s(body.nome, 120)
  const telefone = s(body.telefone, 40)
  if (nome.length < 2 || telefone.replace(/\D/g, '').length < 10) return json({ erro: 'dados_invalidos' }, 400)

  try {
    if (!(await rateLimit(`lead:${clientIp(req)}`, 5, 60 * 60))) return json({ erro: 'muitas_tentativas' }, 429)
    const id = 's' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
    const email = s(body.email, 120)
    const lead = {
      id,
      nome,
      telefone,
      unidade: 'Anchieta',
      veiculo: s(body.veiculo, 120),
      bateria: '',
      valor: 0,
      origem: 'Site (Lista VIP)',
      campanha: s(body.campanha, 120),
      etapa: 'novo',
      followup: new Date(Date.now() - 3 * 3600 * 1000).toISOString().slice(0, 10),
      notas: email ? `E-mail: ${email}` : '',
      motivoPerda: '',
      criadoEm: new Date().toISOString(),
      fechadoEm: '',
    }
    await redis(['HSET', LEADS_KEY, id, JSON.stringify(lead)])
    return json({ ok: true })
  } catch {
    return json({ erro: 'banco_indisponivel' }, 503)
  }
}
