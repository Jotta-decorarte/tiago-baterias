import { COOKIE, checkPassword, clientIp, crmConfigured, json, rateLimit, sessionToken } from '@/lib/crm'

export const dynamic = 'force-dynamic'

const MAX_AGE = 60 * 60 * 24 * 30 // 30 dias

// Entrar
export async function POST(req: Request) {
  if (!crmConfigured()) return json({ erro: 'nao_configurado' }, 503)
  try {
    if (!(await rateLimit(`login:${clientIp(req)}`, 10, 15 * 60))) return json({ erro: 'muitas_tentativas' }, 429)
  } catch {
    return json({ erro: 'banco_indisponivel' }, 503)
  }
  let senha = ''
  try { senha = String(((await req.json()) as Record<string, unknown>).senha || '') } catch { /* vazio */ }
  if (!(await checkPassword(senha))) return json({ erro: 'senha_incorreta' }, 401)
  const res = json({ ok: true })
  res.headers.append('Set-Cookie', `${COOKIE}=${await sessionToken()}; Path=/; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Lax`)
  return res
}

// Sair
export async function DELETE() {
  const res = json({ ok: true })
  res.headers.append('Set-Cookie', `${COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`)
  return res
}
