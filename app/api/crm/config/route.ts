import { CONFIG_KEY, isAuthed, json, redis } from '@/lib/crm'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  if (!(await isAuthed(req))) return json({ erro: 'nao_autorizado' }, 401)
  try {
    const raw = (await redis(['GET', CONFIG_KEY])) as string | null
    const cfg = raw ? (JSON.parse(raw) as Record<string, unknown>) : {}
    return json({ investDia: Number(cfg.investDia) > 0 ? Number(cfg.investDia) : 20 })
  } catch {
    return json({ erro: 'banco_indisponivel' }, 503)
  }
}

export async function POST(req: Request) {
  if (!(await isAuthed(req))) return json({ erro: 'nao_autorizado' }, 401)
  let body: Record<string, unknown>
  try { body = (await req.json()) as Record<string, unknown> } catch { return json({ erro: 'json_invalido' }, 400) }
  const v = Number(body.investDia)
  if (!(v > 0 && v < 100000)) return json({ erro: 'valor_invalido' }, 400)
  try {
    await redis(['SET', CONFIG_KEY, JSON.stringify({ investDia: Math.round(v * 100) / 100 })])
    return json({ ok: true })
  } catch {
    return json({ erro: 'banco_indisponivel' }, 503)
  }
}
