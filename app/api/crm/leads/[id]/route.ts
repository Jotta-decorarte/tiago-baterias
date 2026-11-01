import { LEADS_KEY, isAuthed, json, redis } from '@/lib/crm'

export const dynamic = 'force-dynamic'

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  if (!(await isAuthed(req))) return json({ erro: 'nao_autorizado' }, 401)
  const id = String(params.id || '')
  if (!/^[A-Za-z0-9_-]{4,64}$/.test(id)) return json({ erro: 'id_invalido' }, 400)
  try {
    await redis(['HDEL', LEADS_KEY, id])
    return json({ ok: true })
  } catch {
    return json({ erro: 'banco_indisponivel' }, 503)
  }
}
