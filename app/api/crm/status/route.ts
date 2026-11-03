import { isAuthed, json, redis } from '@/lib/crm'
import { META_LOG_KEY, metaConfigured } from '@/lib/meta'

export const dynamic = 'force-dynamic'

// Situação das integrações, para o painel do CRM
export async function GET(req: Request) {
  if (!(await isAuthed(req))) return json({ erro: 'nao_autorizado' }, 401)
  const parse = (r: unknown) => { try { return JSON.parse(String(r)) } catch { return null } }
  try {
    const wa = parse(await redis(['GET', 'crm:wa:ultimo']))
    const log = (((await redis(['LRANGE', META_LOG_KEY, 0, 9])) as string[] | null) || []).map(parse).filter(Boolean)
    return json({
      whatsapp: { configurado: Boolean(process.env.WA_VERIFY_TOKEN), assinatura: Boolean(process.env.WA_APP_SECRET), ultimo: wa },
      meta: { configurado: metaConfigured(), teste: Boolean(process.env.META_TEST_EVENT_CODE), log },
      webhook: { configurado: (process.env.CRM_WEBHOOK_TOKEN || '').length >= 16 },
    })
  } catch {
    return json({ erro: 'banco_indisponivel' }, 503)
  }
}
