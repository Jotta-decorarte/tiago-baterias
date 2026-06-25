'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { wppLink } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

const STORES = [
  {
    name: 'Loja Anchieta',
    address: 'Av. Chrisóstomo Pimentel de Oliveira, 547\nAnchieta, Rio de Janeiro — CEP 21645-521',
    img: '/loja-anchieta.png',
    mapsEmbed: 'https://www.google.com/maps?q=Av.+Chrisostomo+Pimentel+de+Oliveira,+547,+Anchieta,+Rio+de+Janeiro&output=embed',
    mapsLink: 'https://maps.google.com/?q=Av.+Chrisostomo+Pimentel+de+Oliveira,+547,+Anchieta,+Rio+de+Janeiro',
    hours: [['Seg – Sex', '8h–18h'], ['Sábado', '8h–16h'], ['Dom e Feriados', 'Reduzido']],
  },
  {
    name: 'Loja Nilópolis',
    address: 'R. Ver. José Fortes, 365\nCentro, Nilópolis — RJ, CEP 26535-670',
    img: '/loja-nilopolis.png',
    mapsEmbed: 'https://www.google.com/maps?q=R.+Ver.+José+Fortes,+365,+Centro,+Nilópolis,+RJ&output=embed',
    mapsLink: 'https://maps.google.com/?q=R.+Ver.+José+Fortes,+365,+Centro,+Nilópolis+RJ',
    hours: [['Seg – Sex', '8h–18h'], ['Sábado', '8h–16h'], ['Dom e Feriados', 'Reduzido']],
  },
]

export default function Location() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.loc-head',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: '.loc-head', start: 'top 85%', once: true } })

      gsap.fromTo('.store-card',
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, stagger: 0.18, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.stores-grid', start: 'top 80%', once: true } })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} id="contato" aria-labelledby="loc-title">
      <div className="container">
        <div className="section-head loc-head">
          <span className="eyebrow">Onde estamos</span>
          <h2 id="loc-title">Nossas lojas</h2>
          <p style={{ color: 'var(--color-gray-light)', maxWidth: 520, margin: 'var(--space-3) auto 0', fontSize: 16 }}>
            Atendemos presencialmente ou com delivery. Escolha a loja mais perto de você.
          </p>
        </div>

        <div className="stores-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--space-6)',
        }}>
          {STORES.map((store) => (
            <StoreCard key={store.name} store={store} />
          ))}
        </div>

        {/* WhatsApp CTA centralizado */}
        <div style={{ textAlign: 'center', marginTop: 'var(--space-7)' }}>
          <a
            href={wppLink('Olá! Vim pelo site e quero pedir uma bateria.', 'localizacao')}
            className="btn btn-whatsapp"
            target="_blank" rel="noopener"
          >
            <WppIcon /> Pedir pelo WhatsApp — (21) 98732-3958
          </a>
        </div>
      </div>
    </section>
  )
}

function StoreCard({ store }: { store: typeof STORES[0] }) {
  return (
    <article className="store-card" style={{
      background: 'var(--color-bg-card)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
    }}>
      {/* Foto da loja */}
      <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
        <Image
          src={store.img}
          alt={`Foto da ${store.name}`}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 60%)',
        }} />
        <span style={{
          position: 'absolute', bottom: 14, left: 16,
          fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22,
          color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.6)',
        }}>{store.name}</span>
      </div>

      <div style={{ padding: 'var(--space-5)' }}>
        {/* Endereço */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 'var(--space-4)', alignItems: 'flex-start' }}>
          <PinIcon />
          <address style={{ fontStyle: 'normal', color: 'var(--color-gray-light)', fontSize: 14, lineHeight: 1.6, whiteSpace: 'pre-line' }}>
            {store.address}
          </address>
        </div>

        {/* Horários */}
        <ul style={{ marginBottom: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {store.hours.map(([d, h]) => (
            <li key={d} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--color-gray-mid)', borderBottom: '1px solid var(--color-border)', paddingBottom: 5 }}>
              <span style={{ color: 'var(--color-white)', fontWeight: 500 }}>{d}</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {/* Google Maps embed */}
        <iframe
          title={`Mapa ${store.name}`}
          src={store.mapsEmbed}
          width="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{
            border: 0, borderRadius: 'var(--radius-lg)',
            aspectRatio: '16 / 9',
            display: 'block',
            filter: 'grayscale(0.25) contrast(1.05)',
            marginBottom: 'var(--space-4)',
          }}
        />

        <a
          href={store.mapsLink}
          target="_blank" rel="noopener"
          className="btn btn-outline"
          style={{ width: '100%', justifyContent: 'center', fontSize: 14 }}
        >
          <MapIcon /> Ver no Google Maps
        </a>
      </div>
    </article>
  )
}

const PinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-yellow)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
)

const MapIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" /><line x1="9" y1="3" x2="9" y2="18" /><line x1="15" y1="6" x2="15" y2="21" />
  </svg>
)

const WppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M.057 24l1.687-6.163A11.867 11.867 0 01.157 11.89C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.515 5.26l-.999 3.648 3.973-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
)
