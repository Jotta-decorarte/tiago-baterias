'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const ITEMS = [
  { title: 'Testamos antes de instalar', body: 'Verificamos bateria, alternador e folga de corrente.' },
  { title: 'Bateria recomendada pelo fabricante', body: 'Sem gambiarra, sem risco para o seu veículo.' },
  { title: 'Entrega com instalação inclusa', body: 'Você não precisa sair do lugar.' },
  { title: 'Atendemos 7 dias por semana', body: 'Inclusive domingos em horário reduzido.' },
  { title: 'Raio de até 7km', body: 'Nilópolis, Mesquita, Anchieta e bairros próximos.' },
  { title: 'Tecnologia SLI, EFB e AGM', body: 'Para qualquer tipo de veículo e necessidade.' },
]

const CheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

export default function Differentials() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.dif-head',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: '.dif-head', start: 'top 85%', once: true } })

      /* Alternating left / right per card */
      const cards = rootRef.current?.querySelectorAll('.dif-card') ?? []
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, x: i % 2 === 0 ? -60 : 60 },
          { opacity: 1, x: 0, duration: 0.75, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true } })
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} id="diferenciais" aria-labelledby="dif-title">
      <div className="container">
        <div className="section-head dif-head">
          <span className="eyebrow">Diferenciais</span>
          <h2 id="dif-title">Por que escolher a Tiago Baterias?</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
          {ITEMS.map((item) => (
            <DifCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

function DifCard({ item }: { item: typeof ITEMS[0] }) {
  const cardRef = useRef<HTMLElement>(null)

  const onEnter = () => gsap.to(cardRef.current, {
    borderColor: 'rgba(245,197,24,0.4)', y: -4, duration: 0.25, ease: 'power2.out',
  })
  const onLeave = () => gsap.to(cardRef.current, {
    borderColor: 'rgba(255,255,255,0.06)', y: 0, duration: 0.35, ease: 'power2.out',
  })

  return (
    <article
      ref={cardRef}
      className="dif-card"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        background: 'var(--color-bg-card)', border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)',
        display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)',
        willChange: 'transform, border-color',
      }}
    >
      <span style={{
        width: 44, height: 44, flexShrink: 0,
        background: 'rgba(245,197,24,0.12)', color: 'var(--color-yellow)',
        borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <CheckIcon />
      </span>
      <div>
        <h3 style={{ fontSize: 18, marginBottom: 'var(--space-2)' }}>{item.title}</h3>
        <p style={{ color: 'var(--color-gray-light)', fontSize: 15, lineHeight: 1.6 }}>{item.body}</p>
      </div>
    </article>
  )
}
