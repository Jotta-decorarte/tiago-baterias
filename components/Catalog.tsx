'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { wppLink } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

const S = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, width: 30, height: 30 }

const PRODUCTS = [
  {
    icon: <svg {...S}><path d="M5 17h14M5 17a2 2 0 11-4 0 2 2 0 014 0zm14 0a2 2 0 104 0 2 2 0 00-4 0zM3 13l2-6h11l3 4 4 1v4M5 13h14" /></svg>,
    title: 'Carro passeio',
    desc: 'Tecnologia SLI, EFB e AGM',
    price: 'A partir de R$160',
    badge: 'Mais vendido',
    wppMsg: 'Olá! Vim pelo site e preciso de uma bateria para CARRO.',
  },
  {
    icon: <svg {...S}><circle cx="5" cy="17" r="3" /><circle cx="19" cy="17" r="3" /><path d="M8 17h6l3-6h-4M14 11l-3-4H8M5 17l4-6" /></svg>,
    title: 'Moto',
    desc: 'Leve, potente e durável',
    price: 'A partir de R$160',
    badge: null,
    wppMsg: 'Olá! Vim pelo site e preciso de uma bateria para MOTO.',
  },
  {
    icon: <svg {...S}><path d="M1 7h13v9H1zM14 10h4l3 3v3h-7M7 19a2 2 0 11-4 0 2 2 0 014 0zm12 0a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    title: 'Caminhão / Van',
    desc: 'Alta amperagem para trabalho pesado',
    price: 'Consulte o preço',
    badge: null,
    wppMsg: 'Olá! Vim pelo site e preciso de uma bateria para CAMINHÃO.',
  },
  {
    icon: <svg {...S}><rect x="2" y="7" width="16" height="10" rx="2" /><path d="M18 10h2a2 2 0 012 2v0a2 2 0 01-2 2h-2M6 10v4M9.5 12h-3M13 9l-2 3h2l-2 3" /></svg>,
    title: 'Elétrico / Nobreak',
    desc: 'Tecnologia AGM de longa duração',
    price: 'Consulte o preço',
    badge: null,
    wppMsg: 'Olá! Vim pelo site e preciso de uma bateria para ELÉTRICO.',
  },
]

export default function Catalog() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cat-head',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: '.cat-head', start: 'top 82%', once: true } })

      gsap.fromTo('.cat-card',
        { opacity: 0, y: 80, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.13, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: '.cat-grid', start: 'top 78%', once: true } })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} id="catalogo" className="section-alt" aria-labelledby="cat-title">
      <div className="container">
        <div className="section-head cat-head">
          <span className="eyebrow">Catálogo</span>
          <h2 id="cat-title">Baterias para todo tipo de veículo</h2>
          <p style={{ color: 'var(--color-gray-light)', maxWidth: 560, margin: 'var(--space-3) auto 0', fontSize: 16 }}>
            Carro, moto, caminhão, van ou elétrico — temos a bateria ideal. Preços a partir de R$160.
          </p>
        </div>

        <div
          className="cat-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'var(--space-5)',
          }}
        >
          {PRODUCTS.map((p) => (
            <ProductCard key={p.title} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductCard({ product }: { product: typeof PRODUCTS[0] }) {
  const cardRef = useRef<HTMLElement>(null)

  const onEnter = () => {
    gsap.to(cardRef.current, {
      y: -8, borderColor: 'rgba(245,197,24,0.45)',
      boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
      duration: 0.3, ease: 'power2.out',
    })
  }
  const onLeave = () => {
    gsap.to(cardRef.current, {
      y: 0, borderColor: 'rgba(255,255,255,0.08)',
      boxShadow: 'none',
      duration: 0.4, ease: 'power2.out',
    })
  }

  return (
    <article
      ref={cardRef}
      className="cat-card"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-5)',
        display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
        willChange: 'transform, border-color, box-shadow',
      }}
    >
      {/* Badge */}
      {product.badge && (
        <span style={{
          alignSelf: 'flex-start',
          fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 600,
          letterSpacing: '1.5px', textTransform: 'uppercase',
          padding: '3px 10px', borderRadius: 'var(--radius-sm)',
          background: 'var(--color-yellow)', color: 'var(--color-bg)',
        }}>
          {product.badge}
        </span>
      )}

      {/* Icon */}
      <div style={{
        width: 56, height: 56, borderRadius: 'var(--radius-md)',
        background: 'rgba(245,197,24,0.12)', color: 'var(--color-yellow)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {product.icon}
      </div>

      <h3 style={{ fontSize: 22 }}>{product.title}</h3>
      <p style={{ color: 'var(--color-gray-light)', fontSize: 15 }}>{product.desc}</p>
      <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: 'var(--color-yellow)', marginTop: 'auto' }}>
        {product.price}
      </p>
      <a
        href={wppLink(product.wppMsg, 'card-produto')}
        className="btn btn-primary btn-block"
        target="_blank" rel="noopener"
        style={{ marginTop: 'var(--space-2)' }}
      >
        → Quero essa bateria
      </a>
    </article>
  )
}
