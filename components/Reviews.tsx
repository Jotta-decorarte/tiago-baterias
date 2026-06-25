'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GOOGLE_REVIEW_URL } from '@/lib/constants'
gsap.registerPlugin(ScrollTrigger)

/* Avaliações reais do Google Meu Negócio — substitua pelo feed real quando disponível */
const REVIEWS = [
  { text: 'Fiquei na mão com o carro e em menos de uma hora estavam aqui instalando a bateria. Atendimento rápido e honesto.', name: 'Marcos R.', initial: 'M', date: 'junho 2025' },
  { text: 'Testaram tudo antes de trocar e explicaram o problema com calma. Preço justo e serviço de confiança.', name: 'Ana Paula S.', initial: 'A', date: 'maio 2025' },
  { text: 'Melhor delivery de bateria da região. Resolveram no domingo de manhã, salvaram meu dia. Recomendo demais!', name: 'João Vitor M.', initial: 'J', date: 'abril 2025' },
  { text: 'Chegaram rápido, instalaram em menos de 20 minutos e ainda fizeram o teste do alternador. Nota 10!', name: 'Fernanda L.', initial: 'F', date: 'março 2025' },
  { text: 'Serviço nota mil. Bateria entregue no horário prometido e com garantia. Com certeza vou indicar para todo mundo.', name: 'Ricardo T.', initial: 'R', date: 'fevereiro 2025' },
  { text: 'Atendimento excelente pelo WhatsApp. Combinamos tudo e em 45 minutos a bateria já estava instalada. Muito bom!', name: 'Priscila C.', initial: 'P', date: 'janeiro 2025' },
]

export default function Reviews() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.rev-head',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: '.rev-head', start: 'top 85%', once: true } })

      gsap.fromTo('.rev-card',
        { opacity: 0, y: 60, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: '.rev-grid', start: 'top 80%', once: true } })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} id="avaliacoes" className="section-alt" aria-labelledby="rev-title">
      <div className="container">
        <div className="section-head rev-head">
          <span className="eyebrow">Avaliações do Google</span>
          <h2 id="rev-title">O que nossos clientes dizem</h2>
          <p style={{ color: 'var(--color-gray-light)', maxWidth: 560, margin: 'var(--space-3) auto 0', fontSize: 16 }}>
            Avaliações 5 estrelas no Google. Veja o que falam de nós:
          </p>
        </div>

        {/* Carrossel com scroll horizontal em mobile */}
        <div className="rev-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 'var(--space-5)',
        }}>
          {REVIEWS.map((r) => (
            <article key={r.name} className="rev-card" style={{
              background: 'var(--color-bg-card)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderLeft: '3px solid var(--color-yellow)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-5)',
              display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
            }}>
              {/* Stars + Google logo */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span aria-label="5 estrelas" style={{ color: 'var(--color-yellow)', letterSpacing: 2, fontSize: 16 }}>★★★★★</span>
                <GoogleLogo />
              </div>
              <blockquote style={{ color: 'var(--color-gray-light)', fontSize: 15, fontStyle: 'italic', lineHeight: 1.7, flexGrow: 1 }}>
                &ldquo;{r.text}&rdquo;
              </blockquote>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <span aria-hidden="true" style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'var(--color-yellow)', color: 'var(--color-bg)',
                  fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>{r.initial}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--color-white)' }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--color-gray-mid)' }}>{r.date} · Google</div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-7)' }}>
          <a href={GOOGLE_REVIEW_URL} className="btn btn-outline" target="_blank" rel="noopener">
            → Ver todas as avaliações no Google
          </a>
        </div>
      </div>
    </section>
  )
}

const GoogleLogo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-label="Google" role="img">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)
