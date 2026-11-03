import { getLead, isAuthed, json, msgsKey, redis, saveLead } from '@/lib/crm'

export const dynamic = 'force-dynamic'

// Conversa do WhatsApp deste lead (mais antigas primeiro)
export async function GET(req: Request, { params }: { params: { id: string } }) {
  if (!(await isAuthed(req))) return json({ erro: 'nao_autorizado' }, 401)
  const id = String(params.id || '')
  if (!/^[A-Za-z0-9_-]{4,64}$/.test(id)) return json({ erro: 'id_invalido' }, 400)
  try {
    const raw = ((await redis(['LRANGE', msgsKey(id), 0, 149])) as string[] | null) || []
    const mensagens = raw.map((r) => { try { return JSON.parse(r) } catch { return null } }).filter(Boolean)
      .sort((a: { em: string }, b: { em: string }) => String(a.em).localeCompare(String(b.em)))
    return json({ mensagens })
  } catch {
    return json({ erro: 'banco_indisponivel' }, 503)
  }
}

// Marca a conversa como lida
export async function POST(req: Request, { params }: { params: { id: string } }) {
  if (!(await isAuthed(req))) return json({ erro: 'nao_autorizado' }, 401)
  const id = String(params.id || '')
  try {
    const lead = await getLead(id)
    if (lead && lead.naoLidas) await saveLead({ ...lead, naoLidas: 0 })
    return json({ ok: true })
  } catch {
    return json({ erro: 'banco_indisponivel' }, 503)
  }
}
