import { LEADS_KEY, cleanLead, isAuthed, json, redis } from '@/lib/crm'

export const dynamic = 'force-dynamic'

// Lista todos os leads
export async function GET(req: Request) {
  if (!(await isAuthed(req))) return json({ erro: 'nao_autorizado' }, 401)
  try {
    const flat = (await redis(['HGETALL', LEADS_KEY])) as string[] | null
    const leads: unknown[] = []
    if (Array.isArray(flat)) {
      for (let i = 1; i < flat.length; i += 2) {
        try { leads.push(JSON.parse(flat[i])) } catch { /* ignora registro corrompido */ }
      }
    }
    return json({ leads })
  } catch {
    return json({ erro: 'banco_indisponivel' }, 503)
  }
}

// Cria ou atualiza um lead
export async function POST(req: Request) {
  if (!(await isAuthed(req))) return json({ erro: 'nao_autorizado' }, 401)
  let body: Record<string, unknown>
  try { body = (await req.json()) as Record<string, unknown> } catch { return json({ erro: 'json_invalido' }, 400) }
  const lead = cleanLead(body)
  if (!lead) return json({ erro: 'dados_invalidos' }, 400)
  try {
    await redis(['HSET', LEADS_KEY, lead.id, JSON.stringify(lead)])
    return json({ ok: true, lead })
  } catch {
    return json({ erro: 'banco_indisponivel' }, 503)
  }
}
