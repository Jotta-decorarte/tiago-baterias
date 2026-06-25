'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { wppLink } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

interface CTABannerProps {
  headline: string
  sub: string
  btnLabel: string
  wppMsg: string
  utmMedium: string
  variant?: 'dark' | 'yellow'
}

export default function CTABanner({ headline, sub, btnLabel, wppMsg, utmMedium, variant = 'dark' }: CTABannerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } })
    })
    return () => ctx.revert()
  }, [])

  const isDark   = variant === 'dark'
  const bg       = isDark ? '#111' : 'var(--color-yellow)'
  const textCol  = isDark ? '#fff' : '#0A0A0A'
  const subCol   = isDark ? 'rgba(255,255,255,0.65)' : 'rgba(10,10,10,0.65)'
  const btnBg    = isDark ? '#25D366' : '#0A0A0A'
  const btnColor = '#fff'
  const border   = isDark ? '1px solid rgba(245,197,24,0.2)' : 'none'

  return (
    <div
      ref={ref}
      style={{
        background: bg,
        border,
        padding: 'var(--space-7) 0',
      }}
    >
      <div className="container cta-banner-inner" style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-5)',
      }}>
        <div style={{ flex: '1 1 280px' }}>
          <p style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(22px, 3vw, 32px)', color: textCol, lineHeight: 1.15,
            marginBottom: 6,
          }}>
            {headline}
          </p>
          <p style={{ fontSize: 15, color: subCol, lineHeight: 1.55 }}>{sub}</p>
        </div>

        <a
          href={wppLink(wppMsg, utmMedium)}
          target="_blank" rel="noopener"
          className="btn cta-banner-btn"
          style={{
            background: btnBg, color: btnColor,
            flexShrink: 0,
            boxShadow: isDark ? '0 4px 20px rgba(37,211,102,0.4)' : '0 4px 20px rgba(0,0,0,0.25)',
            border: 'none',
          }}
        >
          <WppIcon /> {btnLabel}
        </a>
      </div>
    </div>
  )
}

const WppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M.057 24l1.687-6.163A11.867 11.867 0 01.157 11.89C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.515 5.26l-.999 3.648 3.973-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
)
