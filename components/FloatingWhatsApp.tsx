'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { wppLink } from '@/lib/constants'

export default function FloatingWhatsApp() {
  const btnRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    gsap.fromTo(btnRef.current,
      { opacity: 0, scale: 0.5, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(2)', delay: 1.8 })

    /* Pulse sutil a cada 5s */
    const pulse = gsap.timeline({ repeat: -1, repeatDelay: 5, delay: 3.5 })
    pulse.to(btnRef.current, { scale: 1.2, duration: 0.22, ease: 'power1.out' })
         .to(btnRef.current, { scale: 1, duration: 0.45, ease: 'elastic.out(1, 0.4)' })

    return () => { pulse.kill() }
  }, [])

  return (
    <a
      ref={btnRef}
      href={wppLink('Olá! Vim pelo site e quero pedir uma bateria.', 'botao-flutuante')}
      target="_blank" rel="noopener"
      aria-label="Falar no WhatsApp — (21) 98732-3958"
      style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 999,
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'var(--color-wpp)',
        borderRadius: 'var(--radius-pill)',
        padding: '12px 20px 12px 14px',
        boxShadow: '0 4px 24px rgba(37,211,102,0.55)',
        color: '#fff',
        opacity: 0,
        willChange: 'transform, opacity',
        textDecoration: 'none',
      }}
      onMouseEnter={() => gsap.to(btnRef.current, { scale: 1.06, duration: 0.2 })}
      onMouseLeave={() => gsap.to(btnRef.current, { scale: 1, duration: 0.35, ease: 'elastic.out(1, 0.5)' })}
    >
      <WppIcon />
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, letterSpacing: 0.5, whiteSpace: 'nowrap' }}>
        (21) 98732-3958
      </span>

      <style>{`
        @media (max-width: 500px) {
          .float-wpp-label { display: none; }
        }
      `}</style>
    </a>
  )
}

const WppIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="white" aria-hidden="true">
    <path d="M.057 24l1.687-6.163A11.867 11.867 0 01.157 11.89C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.515 5.26l-.999 3.648 3.973-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
)
