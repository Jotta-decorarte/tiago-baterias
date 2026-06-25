'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { INSTAGRAM_URL } from '@/lib/constants'
gsap.registerPlugin(ScrollTrigger)

const IG_GRADIENT = 'linear-gradient(45deg, #f09433, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888)'

const POSTS = [
  'https://www.instagram.com/p/DZ8BygTRDZ8/',
  'https://www.instagram.com/p/DZX8Fc4R7U8/',
  'https://www.instagram.com/p/DX1sfx3DZfg/',
  'https://www.instagram.com/p/DUdhfYtDV8j/',
  'https://www.instagram.com/p/DWLvijhjZ54/',
]

export default function Instagram() {
  const rootRef    = useRef<HTMLElement>(null)
  const [current, setCurrent] = useState(0)
  const [loaded, setLoaded]   = useState(false)
  const touchStart = useRef<number | null>(null)

  /* Carrega o script de embed do Instagram uma vez */
  useEffect(() => {
    if (document.getElementById('ig-embed-script')) {
      setLoaded(true)
      return
    }
    const s = document.createElement('script')
    s.id  = 'ig-embed-script'
    s.src = 'https://www.instagram.com/embed.js'
    s.async = true
    s.onload = () => setLoaded(true)
    document.body.appendChild(s)
  }, [])

  /* Processa o embed sempre que o slide muda */
  useEffect(() => {
    if (!loaded) return
    const w = window as unknown as { instgrm?: { Embeds: { process(): void } } }
    if (w.instgrm?.Embeds) {
      setTimeout(() => w.instgrm?.Embeds.process(), 100)
    }
  }, [current, loaded])

  /* Animação de entrada da seção */
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
    setCurrent((c) => (c + dir + POSTS.length) % POSTS.length)
  }, [])

  /* Swipe mobile */
  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX }
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (touchStart.current === null) return
    const diff = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) go(diff > 0 ? 1 : -1)
    touchStart.current = null
  }

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

        <div className="ig-carousel-wrap" style={{ maxWidth: 540, margin: '0 auto', position: 'relative' }}>
          {/* Slide */}
          <div
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={{
              borderRadius: 'var(--radius-xl)', overflow: 'hidden',
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              minHeight: 500,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {loaded ? (
              <blockquote
                key={current}
                className="instagram-media"
                data-instgrm-permalink={POSTS[current]}
                data-instgrm-version="14"
                style={{
                  background: '#FFF', border: 0, borderRadius: 3,
                  margin: '0 auto', maxWidth: 540, minWidth: 320, width: '100%',
                  padding: 0,
                }}
              />
            ) : (
              <div style={{ padding: 48, textAlign: 'center', color: 'var(--color-gray-mid)' }}>
                <IgIcon size={40} />
                <p style={{ marginTop: 12, fontSize: 14 }}>Carregando post…</p>
              </div>
            )}
          </div>

          {/* Setas — desktop */}
          <button
            onClick={() => go(-1)}
            aria-label="Post anterior"
            style={{
              position: 'absolute', left: -22, top: '50%', transform: 'translateY(-50%)',
              width: 44, height: 44, borderRadius: '50%',
              background: 'var(--color-yellow)', color: 'var(--color-bg)',
              border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Próximo post"
            style={{
              position: 'absolute', right: -22, top: '50%', transform: 'translateY(-50%)',
              width: 44, height: 44, borderRadius: '50%',
              background: 'var(--color-yellow)', color: 'var(--color-bg)',
              border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>

          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20 }}>
            {POSTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Post ${i + 1}`}
                style={{
                  width: i === current ? 24 : 8, height: 8,
                  borderRadius: 4, border: 'none', cursor: 'pointer',
                  background: i === current ? 'var(--color-yellow)' : 'rgba(255,255,255,0.2)',
                  transition: 'all 0.3s ease',
                  padding: 0,
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
            <IgIcon size={20} /> Seguir no Instagram
          </a>
        </div>
      </div>
    </section>
  )
}

function IgIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  )
}
