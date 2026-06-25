'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  { num: '01', title: 'Escolha', body: 'Diga o modelo do seu veículo e a gente indica a bateria certa, recomendada pelo fabricante.' },
  { num: '02', title: 'Peça', body: 'Clique em comprar e fale com a gente direto pelo WhatsApp. Sem formulário complicado.' },
  { num: '03', title: 'Receba', body: 'Entregamos e instalamos no local onde você estiver em até 60 minutos.' },
]

export default function HowItWorks() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hiw-head',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.hiw-head', start: 'top 85%', once: true } })

      gsap.fromTo('.step-num',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.18, duration: 0.6, ease: 'back.out(2)',
          scrollTrigger: { trigger: '.hiw-steps', start: 'top 80%', once: true } })

      gsap.fromTo('.hiw-step',
        { opacity: 0, y: 70 },
        { opacity: 1, y: 0, stagger: 0.18, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.hiw-steps', start: 'top 80%', once: true } })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} id="como-funciona" aria-labelledby="hiw-title"
      style={{ background: '#F5F5F5', padding: 'var(--space-8) 0' }}>
      <div className="container">
        <div className="section-head hiw-head">
          <span className="eyebrow" style={{ color: '#C49B0A' }}>Como funciona</span>
          <h2 id="hiw-title" style={{ color: '#111' }}>Simples, rápido e sem complicação</h2>
        </div>

        <div className="hiw-steps" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-5)' }}>
          {STEPS.map((step) => (
            <article key={step.num} className="hiw-step" style={{
              position: 'relative', overflow: 'hidden',
              background: '#fff',
              border: '1px solid #E0E0E0',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-5)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
            }}>
              <span aria-hidden="true" style={{
                position: 'absolute', right: 14, top: 6,
                fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 80,
                lineHeight: 1, color: 'rgba(245,197,24,0.12)', userSelect: 'none',
              }}>{step.num}</span>
              <div className="step-num" aria-hidden="true" style={{
                width: 48, height: 48, borderRadius: 'var(--radius-md)',
                background: 'var(--color-yellow)', color: '#0A0A0A',
                fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 'var(--space-4)',
              }}>{step.num}</div>
              <h3 style={{ marginBottom: 'var(--space-3)', color: '#111' }}>{step.title}</h3>
              <p style={{ color: '#555', fontSize: 15, lineHeight: 1.65 }}>{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
