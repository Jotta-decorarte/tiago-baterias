// Backend do CRM da Tiago Baterias.
// Banco: Redis via REST (Upstash, instalado pela Vercel Marketplace). Sem dependências extras.
// Variáveis de ambiente usadas:
//   KV_REST_API_URL / KV_REST_API_TOKEN  (ou UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN)
//   CRM_SENHA  -> senha de acesso da equipe

export const LEADS_KEY = 'crm:leads'
export const CONFIG_KEY = 'crm:config'
export const COOKIE = 'tb_crm'

function redisEnv() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || ''
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || ''
  return { url: url.replace(/\/$/, ''), token }
}

export function crmConfigured(): boolean {
  const { url, token } = redisEnv()
  return Boolean(url && token && process.env.CRM_SENHA)
}

export async function redis(cmd: (string | number)[]): Promise<unknown> {
  const { url, token } = redisEnv()
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd),
    cache: 'no-store',
  })
  const json = (await res.json()) as { result?: unknown; error?: string }
  if (!res.ok || json.error) throw new Error(json.error || `Redis ${res.status}`)
  return json.result
}

async function hmac(message: string): Promise<string> {
  const secret = process.env.CRM_SENHA || ''
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message))
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

export async function sessionToken(): Promise<string> {
  return hmac('tb-crm-sessao-v1')
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let r = 0
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return r === 0
}

export function readCookie(req: Request, name: string): string {
  const raw = req.headers.get('cookie') || ''
  for (const part of raw.split(';')) {
    const [k, ...v] = part.trim().split('=')
    if (k === name) return decodeURIComponent(v.join('='))
  }
  return ''
}

export async function isAuthed(req: Request): Promise<boolean> {
  if (!crmConfigured()) return false
  const c = readCookie(req, COOKIE)
  if (!c) return false
  return safeEqual(c, await sessionToken())
}

export async function checkPassword(pw: string): Promise<boolean> {
  const real = process.env.CRM_SENHA || ''
  if (!real) return false
  // compara os HMACs para não vazar tamanho/tempo
  const enc = new TextEncoder()
  const h = async (s: string) => {
    const d = await crypto.subtle.digest('SHA-256', enc.encode(s))
    return Array.from(new Uint8Array(d)).map((b) => b.toString(16).padStart(2, '0')).join('')
  }
  return safeEqual(await h(pw), await h(real))
}

export function clientIp(req: Request): string {
  return (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'desconhecido'
}

/** Conta tentativas por janela. Retorna true se ainda está dentro do limite. */
export async function rateLimit(bucket: string, max: number, windowSec: number): Promise<boolean> {
  const key = `crm:rl:${bucket}`
  const n = Number(await redis(['INCR', key]))
  if (n === 1) await redis(['EXPIRE', key, windowSec])
  return n <= max
}

export const STAGES = ['novo', 'contato', 'orcamento', 'fechado', 'perdido']

export type Lead = {
  id: string
  nome: string
  telefone: string
  unidade: string
  veiculo: string
  bateria: string
  valor: number
  origem: string
  campanha: string
  etapa: string
  followup: string
  notas: string
  motivoPerda: string
  criadoEm: string
  fechadoEm: string
}

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.slice(0, max) : '')

export function cleanLead(input: Record<string, unknown>): Lead | null {
  const id = str(input.id, 64)
  if (!/^[A-Za-z0-9_-]{4,64}$/.test(id)) return null
  const nome = str(input.nome, 120).trim()
  if (!nome) return null
  const etapa = STAGES.includes(str(input.etapa, 20)) ? str(input.etapa, 20) : 'novo'
  const valor = Number(input.valor)
  return {
    id,
    nome,
    telefone: str(input.telefone, 40),
    unidade: str(input.unidade, 40) || 'Anchieta',
    veiculo: str(input.veiculo, 120),
    bateria: str(input.bateria, 120),
    valor: Number.isFinite(valor) && valor >= 0 ? Math.round(valor * 100) / 100 : 0,
    origem: str(input.origem, 60),
    campanha: str(input.campanha, 120),
    etapa,
    followup: /^\d{4}-\d{2}-\d{2}$/.test(str(input.followup, 10)) ? str(input.followup, 10) : '',
    notas: str(input.notas, 2000),
    motivoPerda: str(input.motivoPerda, 60),
    criadoEm: str(input.criadoEm, 40) || new Date().toISOString(),
    fechadoEm: str(input.fechadoEm, 40),
  }
}

export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' },
  })
}
