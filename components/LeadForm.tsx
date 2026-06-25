'use client'

import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { wppLink } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

type Fields = { nome: string; telefone: string; email: string; veiculo: string }
type Errors = Partial<Record<keyof Fields, string>>

export default function LeadForm() {
  const rootRef  = useRef<HTMLElement>(null)
  const bodyRef  = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<SVGSVGElement>(null)
  const [open, setOpen]         = useState(false)
  const [fields, setFields]     = useState<Fields>({ nome: '', telefone: '', email: '', veiculo: '' })
  const [errors, setErrors]     = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.vip-wrap',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: '.vip-wrap', start: 'top 85%', once: true } })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  const toggle = () => {
    const body = bodyRef.current
    if (!body) return
    if (!open) {
      gsap.set(body, { height: 'auto', opacity: 1 })
      const h = body.offsetHeight
      gsap.fromTo(body, { height: 0, opacity: 0 }, { height: h, opacity: 1, duration: 0.4, ease: 'power3.out' })
      gsap.to(arrowRef.current, { rotate: 180, duration: 0.35 })
    } else {
      gsap.to(body, { height: 0, opacity: 0, duration: 0.3, ease: 'power3.in' })
      gsap.to(arrowRef.current, { rotate: 0, duration: 0.3 })
    }
    setOpen((v) => !v)
  }

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((f) => ({ ...f, [k]: e.target.value }))
    setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const validate = (): Errors => {
    const e: Errors = {}
    if (fields.nome.trim().length < 2) e.nome = 'Informe seu nome.'
    if (fields.telefone.replace(/\D/g, '').length < 10) e.telefone = 'WhatsApp inválido.'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const err = validate()
    if (Object.keys(err).length) { setErrors(err); return }
    const msg = [
      'Olá! Quero entrar na lista VIP da Tiago Baterias.',
      `Nome: ${fields.nome}`,
      `Telefone: ${fields.telefone}`,
      fields.email  ? `E-mail: ${fields.email}`    : '',
      fields.veiculo ? `Veículo: ${fields.veiculo}` : '',
    ].filter(Boolean).join('\n')
    setSubmitted(true)
    window.open(wppLink(msg, 'form-cadastro'), '_blank', 'noopener')
  }

  const inp: React.CSSProperties = {
    width: '100%', background: '#fff',
    border: '1px solid #ddd', borderRadius: 'var(--radius-md)',
    padding: '11px 14px', fontFamily: 'var(--font-body)', fontSize: 14,
    color: '#111', outline: 'none', minHeight: 46,
  }

  return (
    <section ref={rootRef} id="cadastro" aria-labelledby="vip-title"
      style={{ background: '#F5F5F5', padding: 'var(--space-7) 0' }}>
      <div className="container">
        <div className="vip-wrap" style={{ maxWidth: 680, margin: '0 auto' }}>
          {/* Header clicável — accordion trigger */}
          <div
            style={{
              background: '#fff',
              border: `1px solid ${open ? 'var(--color-border-yellow)' : '#E0E0E0'}`,
              borderRadius: open ? 'var(--radius-xl) var(--radius-xl) 0 0' : 'var(--radius-xl)',
              padding: 'var(--space-4) var(--space-5)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              cursor: 'pointer',
              transition: 'border-color 0.25s, border-radius 0.25s',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            }}
            onClick={toggle}
            role="button"
            aria-expanded={open}
            aria-controls="vip-body"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{
                background: 'var(--color-yellow)', color: 'var(--color-bg)',
                borderRadius: 'var(--radius-md)', padding: '6px 12px',
                fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 12,
                letterSpacing: '1.5px', textTransform: 'uppercase',
              }}>VIP</span>
              <div>
                <p id="vip-title" style={{ fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: 17, color: '#111', lineHeight: 1.2 }}>
                  Lista VIP — ofertas exclusivas
                </p>
                <p style={{ fontSize: 13, color: '#888', marginTop: 2 }}>
                  Cadastre-se e receba promoções e lembretes de troca
                </p>
              </div>
            </div>
            <svg ref={arrowRef} width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="var(--color-yellow)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true" style={{ flexShrink: 0 }}>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>

          {/* Body — accordion */}
          <div id="vip-body" ref={bodyRef} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
            <div style={{
              background: '#fff',
              border: '1px solid var(--color-border-yellow)',
              borderTop: 0,
              borderRadius: '0 0 var(--radius-xl) var(--radius-xl)',
              padding: 'var(--space-5)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            }}>
              {submitted ? (
                <SuccessMsg />
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Linha 1: Nome + Telefone */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                    <Field label="Nome *" id="nome" error={errors.nome}>
                      <input id="nome" type="text" style={inp} placeholder="Seu nome" autoComplete="name" value={fields.nome} onChange={set('nome')} />
                    </Field>
                    <Field label="WhatsApp *" id="telefone" error={errors.telefone}>
                      <input id="telefone" type="tel" style={inp} placeholder="(21) 99999-9999" autoComplete="tel" value={fields.telefone} onChange={set('telefone')} />
                    </Field>
                  </div>
                  {/* Linha 2: Email + Veículo */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                    <Field label="E-mail" id="email" error={errors.email}>
                      <input id="email" type="email" style={inp} placeholder="seu@email.com" autoComplete="email" value={fields.email} onChange={set('email')} />
                    </Field>
                    <Field label="Modelo do carro" id="veiculo">
                      <input id="veiculo" type="text" style={inp} placeholder="Ex: Civic 2019" value={fields.veiculo} onChange={set('veiculo')} />
                    </Field>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    → Quero me cadastrar
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, id, error, children }: { label: string; id: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} style={{ fontSize: 12, fontWeight: 600, color: '#555', marginBottom: 5, display: 'block' }}>
        {label}
      </label>
      {children}
      {error && <span role="alert" style={{ color: 'var(--color-error)', fontSize: 12, marginTop: 4, display: 'block' }}>{error}</span>}
    </div>
  )
}

function SuccessMsg() {
  return (
    <div style={{ textAlign: 'center', padding: 'var(--space-5) var(--space-4)' }} role="status">
      <div style={{
        width: 60, height: 60, margin: '0 auto var(--space-3)',
        background: 'rgba(37,211,102,0.12)', color: '#25D366',
        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <p style={{ color: '#333', fontWeight: 600, fontSize: 16 }}>Cadastrado com sucesso!</p>
      <p style={{ color: '#666', fontSize: 14, marginTop: 4 }}>Em breve entraremos em contato.</p>
    </div>
  )
}
