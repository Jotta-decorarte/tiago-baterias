'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const ITEMS = [
  {
    q: 'O que é CCA (Cold Cranking Amps)?',
    a: 'CCA é a capacidade da bateria de dar partida no motor em temperaturas baixas. Quanto maior o CCA, mais potente a partida — essencial para veículos a diesel e motores maiores. Indicamos sempre a bateria com o CCA certo para o seu carro.',
  },
  {
    q: 'O que é tecnologia AGM?',
    a: 'AGM (Absorbent Glass Mat) é uma bateria avançada onde o eletrólito fica absorvido em mantas de fibra de vidro. Ideal para carros com sistema Start-Stop, muitos acessórios elétricos e veículos de luxo. É selada, sem risco de vazamento e tem vida útil longa.',
  },
  {
    q: 'O que é bateria EFB?',
    a: 'EFB (Enhanced Flooded Battery) é uma evolução da bateria convencional com maior ciclo de carga/descarga. Indicada para veículos com Start-Stop de menor intensidade. É o meio-termo entre a SLI e a AGM.',
  },
  {
    q: 'O que é tecnologia SLI?',
    a: 'SLI significa Starting (partida), Lighting (iluminação) e Ignition (ignição). É a bateria automotiva convencional. Excelente relação custo-benefício para veículos sem sistema Start-Stop e uso moderado de elétricos.',
  },
  {
    q: 'O que é o sistema Start-Stop?',
    a: 'É o sistema que desliga automaticamente o motor quando o veículo para (no semáforo, por exemplo) e religa ao soltar o freio ou embreagem. Economiza até 15% de combustível, mas exige bateria EFB ou AGM para suportar os ciclos constantes.',
  },
  {
    q: 'Quanto tempo dura uma bateria automotiva?',
    a: 'Em média, de 3 a 5 anos. Depende do uso, estado do alternador, temperatura e qualidade. Baterias AGM podem durar até 8 anos. No momento da instalação, testamos gratuitamente o alternador e a corrente de carga para garantir que sua nova bateria vai durar o máximo possível.',
  },
  {
    q: 'Como saber se minha bateria está fraca?',
    a: 'Os sinais mais comuns são: dificuldade para dar partida (motor gira devagar), luzes do painel piscando, faróis fracos e o carro morrendo com acessórios ligados. Se tiver dúvida, nos chame — testamos a bateria e o alternador na hora, sem custo adicional.',
  },
  {
    q: 'Vocês testam o alternador na hora da troca?',
    a: 'Sim! Antes de instalar a nova bateria, testamos o alternador e a corrente de carga do veículo. Se o alternador estiver com problema, instalar uma bateria nova não resolve — e você vai perder a bateria em pouco tempo. Fazemos esse diagnóstico incluído no serviço.',
  },
]

export default function FAQ() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.faq-head',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: '.faq-head', start: 'top 85%', once: true } })

      gsap.fromTo('.faq-item',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.07, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: '.faq-list', start: 'top 80%', once: true } })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} id="faq" aria-labelledby="faq-title"
      style={{ background: '#F5F5F5', padding: 'var(--space-8) 0' }}>
      <div className="container">
        <div className="section-head faq-head">
          <span className="eyebrow" style={{ color: '#C49B0A' }}>Tire suas dúvidas</span>
          <h2 id="faq-title" style={{ color: '#111' }}>Perguntas frequentes sobre baterias</h2>
          <p style={{ color: '#555', maxWidth: 540, margin: 'var(--space-3) auto 0', fontSize: 16 }}>
            Entenda os termos técnicos e saiba como cuidar melhor da bateria do seu veículo.
          </p>
        </div>

        <div className="faq-list" style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {ITEMS.map((item, i) => (
            <FAQItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQItem({ item, index }: { item: typeof ITEMS[0]; index: number }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<SVGSVGElement>(null)

  const toggle = () => {
    const body = bodyRef.current
    if (!body) return

    if (!open) {
      /* Abrir */
      gsap.set(body, { height: 'auto', opacity: 1 })
      const h = body.offsetHeight
      gsap.fromTo(body, { height: 0, opacity: 0 }, { height: h, opacity: 1, duration: 0.38, ease: 'power3.out' })
      gsap.to(arrowRef.current, { rotate: 180, duration: 0.35, ease: 'power2.out' })
    } else {
      /* Fechar */
      gsap.to(body, { height: 0, opacity: 0, duration: 0.3, ease: 'power3.in' })
      gsap.to(arrowRef.current, { rotate: 0, duration: 0.3, ease: 'power2.in' })
    }
    setOpen((v) => !v)
  }

  return (
    <div
      className="faq-item"
      style={{
        background: '#fff',
        border: `1px solid ${open ? 'rgba(196,155,10,0.5)' : '#E0E0E0'}`,
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        transition: 'border-color 0.25s ease',
      }}
    >
      <button
        onClick={toggle}
        aria-expanded={open}
        aria-controls={`faq-body-${index}`}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 'var(--space-4)', padding: 'var(--space-5)',
          background: 'none', border: 'none', cursor: 'pointer',
          textAlign: 'left', minHeight: 52,
        }}
      >
        <span style={{ fontFamily: 'var(--font-title)', fontWeight: 600, fontSize: 'clamp(15px,2vw,17px)', color: '#111', lineHeight: 1.4 }}>
          {item.q}
        </span>
        <svg
          ref={arrowRef}
          width="20" height="20"
          viewBox="0 0 24 24"
          fill="none" stroke="var(--color-yellow)"
          strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true"
          style={{ flexShrink: 0 }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <div
        id={`faq-body-${index}`}
        ref={bodyRef}
        style={{ height: 0, overflow: 'hidden', opacity: 0 }}
      >
        <p style={{
          padding: '0 var(--space-5) var(--space-5)',
          color: '#444', fontSize: 15, lineHeight: 1.75,
        }}>
          {item.a}
        </p>
      </div>
    </div>
  )
}
