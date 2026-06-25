'use client'

import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { wppLink } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = [
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Avaliações', href: '#avaliacoes' },
  { label: 'Contato', href: '#contato' },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  /* Entry animation */
  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.2 })
  }, [])

  /* Scroll state */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Mobile menu animation */
  useEffect(() => {
    if (open && menuRef.current) {
      gsap.fromTo(menuRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' })
    }
  }, [open])

  const toggleMenu = () => setOpen((v) => !v)
  const closeMenu = () => setOpen(false)

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Navegação principal"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          background: scrolled ? 'rgba(10,10,10,0.98)' : 'rgba(10,10,10,0.9)',
          backdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(245,197,24,0.15)',
          transition: 'background 0.3s ease',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          {/* Logo */}
          <a href="#hero" aria-label="Tiago Baterias — página inicial" style={{ display: 'flex', alignItems: 'center' }}>
            <Image src="/logo-tiago-baterias.png" alt="Tiago Baterias" width={160} height={50} style={{ height: 44, width: 'auto', objectFit: 'contain' }} priority />
          </a>

          {/* Desktop links */}
          <ul style={{ display: 'flex', alignItems: 'center', gap: 32, listStyle: 'none' }} className="nav-links-desktop">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--color-gray-light)', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-yellow)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-gray-light)' }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a
              href={wppLink('Olá! Vim pelo site e quero pedir uma bateria.', 'navbar')}
              className="btn btn-primary nav-cta-desktop"
              target="_blank" rel="noopener"
            >
              Comprar agora
            </a>
            <button
              className="hamburger"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={toggleMenu}
              style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center', justifyContent: 'center', width: 48, height: 48, background: 'none', border: 'none' }}
            >
              {[0, 1, 2].map((i) => (
                <span key={i} style={{
                  display: 'block', width: 26, height: 2,
                  background: 'var(--color-white)',
                  transition: 'transform 0.25s ease, opacity 0.25s ease',
                  transform: open
                    ? i === 0 ? 'translateY(7px) rotate(45deg)'
                    : i === 2 ? 'translateY(-7px) rotate(-45deg)'
                    : 'none'
                    : 'none',
                  opacity: open && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          ref={menuRef}
          id="mobile-menu"
          style={{
            position: 'fixed', top: 68, left: 0, right: 0, zIndex: 99,
            background: 'rgba(10,10,10,0.98)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid var(--color-border-yellow)',
            padding: '16px 24px 24px',
          }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={closeMenu}
              style={{
                display: 'flex', alignItems: 'center', minHeight: 48,
                padding: '12px 8px', color: 'var(--color-gray-light)', fontSize: 17,
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href={wppLink('Olá! Vim pelo site e quero pedir uma bateria.', 'navbar-mobile')}
            className="btn btn-primary btn-block"
            target="_blank" rel="noopener"
            onClick={closeMenu}
            style={{ marginTop: 16 }}
          >
            Comprar agora
          </a>
        </div>
      )}

      <style>{`
        .nav-links-desktop { display: none !important; }
        .nav-cta-desktop { display: none !important; }
        @media (min-width: 1024px) {
          .nav-links-desktop { display: flex !important; }
          .nav-cta-desktop { display: inline-flex !important; }
          .hamburger { display: none !important; }
        }
      `}</style>
    </>
  )
}
