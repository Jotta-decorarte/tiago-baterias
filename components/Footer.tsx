'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { wppLink, INSTAGRAM_URL, FACEBOOK_URL, GOOGLE_REVIEW_URL } from '@/lib/constants'
gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-col',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.65, ease: 'power3.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 90%', once: true } })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={rootRef} style={{ background: 'var(--color-bg)', borderTop: '1px solid var(--color-border)', padding: 'var(--space-7) 0 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>

          {/* Brand */}
          <div className="footer-col">
            <a href="#hero" aria-label="Tiago Baterias" style={{ display: 'inline-block', marginBottom: 'var(--space-4)' }}>
              <Image src="/logo-tiago-baterias.png" alt="Tiago Baterias" width={150} height={48} style={{ height: 44, width: 'auto', objectFit: 'contain' }} />
            </a>
            <p style={{ color: 'var(--color-gray-mid)', fontSize: 14, lineHeight: 1.65, maxWidth: 280, marginBottom: 'var(--space-4)' }}>
              Energia que move você! Delivery de baterias com instalação em Nilópolis, Mesquita, Anchieta e região.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <SocialBtn href={INSTAGRAM_URL} label="Instagram" bg="linear-gradient(45deg,#f09433,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888)"><IgIcon /></SocialBtn>
              <SocialBtn href={FACEBOOK_URL} label="Facebook" bg="#1877F2"><FbIcon /></SocialBtn>
              <SocialBtn href={GOOGLE_REVIEW_URL} label="Google" bg="#fff" color="#333"><GIcon /></SocialBtn>
              <SocialBtn href={wppLink('Olá! Vim pelo site e quero falar com a Tiago Baterias.','rodape')} label="WhatsApp" bg="#25D366"><WppIcon /></SocialBtn>
            </div>
          </div>

          {/* Nav */}
          <div className="footer-col">
            <h4 style={{ color: 'var(--color-white)', marginBottom: 'var(--space-3)', fontSize: 15 }}>Navegação</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {[
                ['#como-funciona', 'Como funciona'],
                ['#catalogo', 'Catálogo'],
                ['#diferenciais', 'Diferenciais'],
                ['#avaliacoes', 'Avaliações'],
                ['#faq', 'Perguntas frequentes'],
                ['#cadastro', 'Lista VIP'],
              ].map(([href, label]) => (
                <li key={href}><FootLink href={href}>{label}</FootLink></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 style={{ color: 'var(--color-white)', marginBottom: 'var(--space-3)', fontSize: 15 }}>Contato</h4>
            <address style={{ fontStyle: 'normal', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <span style={{ color: 'var(--color-gray-mid)', fontSize: 14 }}>Av. Chrisóstomo Pimentel de Oliveira, 547, Anchieta, RJ — CEP 21645-521</span>
              <FootLink href={wppLink('Olá! Vim pelo site e quero pedir uma bateria.', 'rodape')} external>WhatsApp: (21) 98732-3958</FootLink>
              <FootLink href={INSTAGRAM_URL} external>@tiagobaterias</FootLink>
            </address>
          </div>

          {/* Hours */}
          <div className="footer-col">
            <h4 style={{ color: 'var(--color-white)', marginBottom: 'var(--space-3)', fontSize: 15 }}>Horários</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {[['Seg – Sex', '8h às 18h'], ['Sábado', '8h às 16h'], ['Dom e Feriados', 'Horário reduzido']].map(([d, h]) => (
                <li key={d} style={{ display: 'flex', justifyContent: 'space-between', gap: 8, color: 'var(--color-gray-mid)', fontSize: 14 }}>
                  <span style={{ color: 'var(--color-white)', fontWeight: 500 }}>{d}</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--color-border)',
          padding: 'var(--space-4) 0',
          display: 'flex', flexWrap: 'wrap', gap: 8,
          alignItems: 'center', justifyContent: 'space-between',
          fontSize: 13, color: 'var(--color-gray-mid)',
        }}>
          <span>© 2026 Tiago Baterias · Todos os direitos reservados.</span>
          <span>
            Desenvolvido por{' '}
            <a
              href="https://agenciagpv.online"
              target="_blank" rel="noopener"
              style={{ color: 'var(--color-yellow)', fontWeight: 600, transition: 'opacity 0.2s' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.75' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
            >
              Agência GPV
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}

function FootLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      style={{ color: 'var(--color-gray-mid)', fontSize: 14, transition: 'color 0.2s' }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-yellow)' }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-gray-mid)' }}
    >
      {children}
    </a>
  )
}

function SocialBtn({ href, label, bg, color = '#fff', children }: {
  href: string; label: string; bg: string; color?: string; children: React.ReactNode
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  return (
    <a
      ref={ref}
      href={href} target="_blank" rel="noopener" aria-label={label}
      style={{
        width: 44, height: 44, borderRadius: 'var(--radius-md)',
        background: bg, color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        willChange: 'transform', transition: 'opacity 0.2s',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
      onMouseEnter={() => gsap.to(ref.current, { y: -3, scale: 1.08, duration: 0.2 })}
      onMouseLeave={() => gsap.to(ref.current, { y: 0, scale: 1, duration: 0.35, ease: 'power2.out' })}
    >
      {children}
    </a>
  )
}

const IgIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
const FbIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z" /></svg>
const GIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
const WppIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M.057 24l1.687-6.163A11.867 11.867 0 01.157 11.89C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.515 5.26l-.999 3.648 3.973-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
