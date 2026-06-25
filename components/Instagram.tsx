'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { INSTAGRAM_URL } from '@/lib/constants'
gsap.registerPlugin(ScrollTrigger)

const IG_GRADIENT = 'linear-gradient(45deg, #f09433, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888)'

/* Extrai o ID do post da URL do Instagram */
const POSTS = [
  'https://www.instagram.com/p/DZ8BygTRDZ8/',
  'https://www.instagram.com/p/DZX8Fc4R7U8/',
  'https://www.instagram.com/p/DX1sfx3DZfg/',
  'https://www.instagram.com/p/DUdhfYtDV8j/',
  'https://www.instagram.com/p/DWLvijhjZ54/',
]

function getPostId(url: string) {
  const match = url.match(/\/p\/([^/]+)\//)
  return match ? match[1] : ''
}

export default function Instagram() {
  const rootRef    = useRef<HTMLElement>(null)
  const slideRef   = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const touchStart = useRef<number | null>(null)
  const isAnimating = useRef(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ig-head',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: '.ig-head', start: 'top 85%', once: true } })
      gsap.fromTo('.ig-carousel-wrap',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.ig-carousel-wrap', start: 'top 80%', once: true } })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  const go = useCallback((dir: 1 | -1) => {
    if (isAnimating.current) return
    isAnimating.current = true

    const el = slideRef.current
    /* Slide para fora */
    gsap.to(el, {
      opacity: 0, x: dir === 1 ? -40 : 40, duration: 0.22, ease: 'power2.in',
      onComplete: () => {
        setCurrent((c) => (c + dir + POSTS.length) % POSTS.length)
        /* Slide para dentro */
        gsap.fromTo(el,
          { opacity: 0, x: dir === 1 ? 40 : -40 },
          { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out',
            onComplete: () => { isAnimating.current = false } })
      },
    })
  }, [])

  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX }
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (touchStart.current === null) return
    const diff = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) go(diff > 0 ? 1 : -1)
    touchStart.current = null
  }

  const postId = getPostId(POSTS[current])

  return (
    <section ref={rootRef} id="instagram" aria-labelledby="ig-title">
      <div className="container">
        <div className="section-head ig-head">
          <span className="eyebrow">Instagram</span>
          <h2 id="ig-title">Acompanhe nosso dia a dia</h2>
          <p style={{ color: 'var(--color-gray-light)', maxWidth: 520, margin: 'var(--space-3) auto 0', fontSize: 16 }}>
            Entregas, instalações e dicas — veja nossos últimos posts.
          </p>
        </div>

        <div className="ig-carousel-wrap" style={{ maxWidth: 480, margin: '0 auto', position: 'relative' }}>

          {/* Slide com iframe direto do Instagram */}
          <div
            ref={slideRef}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={{
              borderRadius: 'var(--radius-xl)', overflow: 'hidden',
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              minHeight: 520,
              display: 'flex', alignItems: 'stretch',
            }}
          >
            <iframe
              key={postId}
              src={`https://www.instagram.com/p/${postId}/embed/`}
              width="100%"
              height="540"
              frameBorder="0"
              scrolling="no"
              allowTransparency={true}
              loading="lazy"
              title={`Post Instagram ${current + 1} de ${POSTS.length}`}
              style={{ display: 'block', border: 'none', minHeight: 520 }}
            />
          </div>

          {/* Seta esquerda */}
          <button
            onClick={() => go(-1)}
            aria-label="Post anterior"
            style={{
              position: 'absolute', left: -22, top: '50%', transform: 'translateY(-50%)',
              width: 44, height: 44, borderRadius: '50%',
              background: 'var(--color-yellow)', color: 'var(--color-bg)',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
              zIndex: 2,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>

          {/* Seta direita */}
          <button
            onClick={() => go(1)}
            aria-label="Próximo post"
            style={{
              position: 'absolute', right: -22, top: '50%', transform: 'translateY(-50%)',
              width: 44, height: 44, borderRadius: '50%',
              background: 'var(--color-yellow)', color: 'var(--color-bg)',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
              zIndex: 2,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>

          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20 }}>
            {POSTS.map((_, i) => (
              <button
                key={i}
                onClick={() => { if (i !== current) go(i > current ? 1 : -1) }}
                aria-label={`Post ${i + 1}`}
                style={{
                  width: i === current ? 24 : 8, height: 8,
                  borderRadius: 4, border: 'none', cursor: 'pointer',
                  background: i === current ? 'var(--color-yellow)' : 'rgba(255,255,255,0.2)',
                  transition: 'all 0.3s ease', padding: 0,
                }}
              />
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-7)' }}>
          <a
            href={INSTAGRAM_URL}
            className="btn"
            target="_blank" rel="noopener"
            style={{ background: IG_GRADIENT, color: '#fff', border: 'none', boxShadow: '0 4px 20px rgba(188,24,136,0.4)' }}
          >
            <IgIcon /> Seguir no Instagram
          </a>
        </div>
      </div>
    </section>
  )
}

function IgIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  )
}
