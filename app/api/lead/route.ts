import { clientIp, crmConfigured, json, rateLimit, readCookie } from '@/lib/crm'
import { intakeLead } from '@/lib/intake'

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
    await intakeLead(
      {
        id: s(body.id, 64),
        nome,
        telefone,
        email: s(body.email, 120),
        veiculo: s(body.veiculo, 120),
        origem: 'Site (Lista VIP)',
        campanha: s(body.campanha, 120),
      },
      {
        fonte: 'website',
        url: s(body.url, 500) || 'https://www.tiagobaterias.com.br/',
        ip: clientIp(req) !== 'desconhecido' ? clientIp(req) : undefined,
        userAgent: req.headers.get('user-agent') || undefined,
        fbp: readCookie(req, '_fbp') || undefined,
        fbc: readCookie(req, '_fbc') || undefined,
      },
    )
    return json({ ok: true })
  } catch {
    return json({ erro: 'banco_indisponivel' }, 503)
  }
}
