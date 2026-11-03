import { SERVER_FIELDS, cleanLead, getAllLeads, getLead, isAuthed, json, saveLead } from '@/lib/crm'
import { syncMetaEvents } from '@/lib/meta'

export const dynamic = 'force-dynamic'

// Lista todos os leads
export async function GET(req: Request) {
  if (!(await isAuthed(req))) return json({ erro: 'nao_autorizado' }, 401)
  try {
    return json({ leads: await getAllLeads() })
  } catch {
    return json({ erro: 'banco_indisponivel' }, 503)
  }
}

// Cria ou atualiza um lead. Campos do WhatsApp e da Meta são preservados do que já está salvo.
export async function POST(req: Request) {
  if (!(await isAuthed(req))) return json({ erro: 'nao_autorizado' }, 401)
  let body: Record<string, unknown>
  try { body = (await req.json()) as Record<string, unknown> } catch { return json({ erro: 'json_invalido' }, 400) }
  const lead = cleanLead(body)
  if (!lead) return json({ erro: 'dados_invalidos' }, 400)
  try {
    const atual = await getLead(lead.id)
    if (atual) {
      for (const f of SERVER_FIELDS) {
        if (atual[f] !== undefined) (lead as Record<string, unknown>)[f] = atual[f]
      }
      if (!lead.email && atual.email) lead.email = atual.email
    }
    await saveLead(lead)

    // Conversions API: manda Lead / QualifiedLead / Purchase conforme a etapa
    const antes = lead.eventosMeta || []
    const depois = await syncMetaEvents(lead, antes)
    if (depois.length !== antes.length) {
      lead.eventosMeta = depois
      const fresco = await getLead(lead.id)
      await saveLead({ ...(fresco || lead), eventosMeta: depois })
    }
    return json({ ok: true, lead })
  } catch {
    return json({ erro: 'banco_indisponivel' }, 503)
  }
}
