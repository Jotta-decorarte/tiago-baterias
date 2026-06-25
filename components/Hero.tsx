'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { wppLink } from '@/lib/constants'

export default function Hero() {
  const imgRef    = useRef<HTMLDivElement>(null)
  const btnPrimRef = useRef<HTMLAnchorElement>(null)
  const btnSecRef  = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    /* Ken Burns — só a imagem se move, sem tocar no texto */
    gsap.to(imgRef.current, {
      scale: 1.08, x: '-1.5%', y: '-1%',
      duration: 14, ease: 'none', repeat: -1, yoyo: true,
    })
  }, [])

  const mag = (ref: React.RefObject<HTMLAnchorElement>) => ({
    onMouseMove: (e: React.MouseEvent) => {
      const el = ref.current; if (!el) return
      const r = el.getBoundingClientRect()
      gsap.to(el, { x: (e.clientX - r.left - r.width/2)*0.2, y: (e.clientY - r.top - r.height/2)*0.2, duration: 0.3 })
    },
    onMouseLeave: () => gsap.to(ref.current, { x:0, y:0, duration: 0.5, ease:'elastic.out(1,0.5)' }),
  })

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', alignItems: 'center',
        paddingTop: 'calc(var(--navbar-h) + 48px)',
        paddingBottom: 'var(--space-8)',
        overflow: 'hidden',
      }}
    >
      {/* Imagem de fundo com Ken Burns */}
      <div ref={imgRef} aria-hidden="true" style={{
        position: 'absolute', inset: '-5%',
        transformOrigin: 'center center',
        willChange: 'transform', zIndex: 0,
      }}>
        <Image
          src="/loja-hero.png" alt="" fill priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          sizes="100vw"
        />
      </div>

      {/* Overlay */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to right, rgba(10,10,10,0.93) 50%, rgba(10,10,10,0.5) 80%, rgba(10,10,10,0.15) 100%)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 680 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 600,
            letterSpacing: '1.5px', textTransform: 'uppercase',
            padding: '6px 16px', borderRadius: 'var(--radius-pill)',
            background: 'rgba(245,197,24,0.15)', color: 'var(--color-yellow)',
            border: '1px solid var(--color-border-yellow)', marginBottom: 'var(--space-5)',
          }}>
            ⚡ Entrega em até 60 min
          </span>

          <h1 id="hero-title" style={{ marginBottom: 'var(--space-5)', color: '#fff' }}>
            Bateria descarregada?{' '}
            <span style={{ color: 'var(--color-yellow)' }}>A gente chega até você</span>{' '}
            em até 60 minutos.
          </h1>

          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)', color: 'var(--color-gray-light)',
            maxWidth: 540, marginBottom: 'var(--space-6)', lineHeight: 1.7,
          }}>
            Delivery de baterias com instalação em Nilópolis, Mesquita, Anchieta e região.
            Moura, Heliar, Bosch e muito mais — a bateria certa para o seu veículo.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 'var(--space-6)' }}>
            <a
              ref={btnPrimRef}
              href={wppLink('Olá! Vim pelo site e quero pedir uma bateria. Me ajude a escolher a ideal para meu veículo.', 'hero-cta-principal')}
              className="btn btn-whatsapp"
              target="_blank" rel="noopener"
              style={{ willChange: 'transform' }}
              {...mag(btnPrimRef)}
            >
              <WppIcon /> Pedir pelo WhatsApp agora
            </a>
            <a
              ref={btnSecRef}
              href="#catalogo"
              className="btn btn-outline"
              style={{ willChange: 'transform' }}
              {...mag(btnSecRef)}
            >
              Ver catálogo de baterias
            </a>
          </div>

          <p style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 14, color: 'var(--color-gray-light)',
          }}>
            <span style={{ color: 'var(--color-yellow)', letterSpacing: 2 }} aria-hidden="true">★★★★★</span>
            Mais bem avaliada da região no Google
          </p>
        </div>
      </div>
    </section>
  )
}

const WppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M.057 24l1.687-6.163A11.867 11.867 0 01.157 11.89C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.515 5.26l-.999 3.648 3.973-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
)
