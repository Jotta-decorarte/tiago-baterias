// Entrada única de leads vindos de fora do CRM (site, webhook, WhatsApp).
// Evita duplicar: se já existe lead com o mesmo telefone, atualiza o existente.

import { Lead, blankLead, findLeadByPhone, getLead, saveLead } from './crm'
import { Contexto, syncMetaEvents } from './meta'

export type Entrada = {
  id?: string
  nome: string
  telefone: string
  email?: string
  veiculo?: string
  origem: string
  campanha?: string
  unidade?: string
  notas?: string
  ctwaClid?: string
  waNome?: string
}

const UNIDADES = ['Anchieta', 'Nilópolis']

function dataBR(): string {
  const d = new Date(Date.now() - 3 * 3600 * 1000).toISOString()
  return `${d.slice(8, 10)}/${d.slice(5, 7)} ${d.slice(11, 16)}`
}

export async function intakeLead(e: Entrada, ctx?: Contexto): Promise<{ lead: Lead; novo: boolean }> {
  const existente = await findLeadByPhone(e.telefone)
  if (existente) {
    const extra = [
      `[${dataBR()}] Novo contato via ${e.origem}${e.campanha ? ` (${e.campanha})` : ''}`,
      e.notas || '',
    ].filter(Boolean).join(' · ')
    const atualizado: Lead = {
      ...existente,
      notas: [existente.notas, extra].filter(Boolean).join('\n').slice(-2000),
      email: existente.email || e.email || '',
      veiculo: existente.veiculo || e.veiculo || '',
      campanha: existente.campanha || e.campanha || '',
      ctwaClid: existente.ctwaClid || e.ctwaClid,
      waNome: existente.waNome || e.waNome,
    }
    // lead perdido que voltou a procurar: reabre como novo
    if (existente.etapa === 'perdido') {
      atualizado.etapa = 'novo'
      atualizado.fechadoEm = ''
      atualizado.motivoPerda = ''
      atualizado.followup = new Date(Date.now() - 3 * 3600 * 1000).toISOString().slice(0, 10)
    }
    await saveLead(atualizado)
    return { lead: atualizado, novo: false }
  }

  const lead = blankLead({
    nome: e.nome.slice(0, 120),
    telefone: e.telefone.slice(0, 40),
    email: (e.email || '').slice(0, 120),
    veiculo: (e.veiculo || '').slice(0, 120),
    origem: e.origem.slice(0, 60),
    campanha: (e.campanha || '').slice(0, 120),
    unidade: UNIDADES.includes(e.unidade || '') ? (e.unidade as string) : 'Anchieta',
    notas: (e.notas || '').slice(0, 2000),
    ctwaClid: e.ctwaClid,
    waNome: e.waNome,
  })
  if (e.id && /^[A-Za-z0-9_-]{6,64}$/.test(e.id) && !(await getLead(e.id))) lead.id = e.id
  await saveLead(lead)

  const enviados = await syncMetaEvents(lead, [], ctx)
  if (enviados.length) {
    const fresco = await getLead(lead.id)
    lead.eventosMeta = enviados
    await saveLead({ ...(fresco || lead), eventosMeta: enviados })
  }
  return { lead, novo: true }
}
