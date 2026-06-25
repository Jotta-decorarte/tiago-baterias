'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

const BRANDS = [
  { src: '/moura.png',   alt: 'Moura' },
  { src: '/heliar.png',  alt: 'Heliar' },
  { src: '/baterax.png', alt: 'Baterax' },
  { src: '/zetta-B.png', alt: 'Zetta' },
  { src: '/kondor.png',  alt: 'Kondor' },
  { src: '/acdelco.png', alt: 'ACDelco' },
  { src: '/bosch.png',   alt: 'Bosch' },
]

const ITEMS = [...BRANDS, ...BRANDS, ...BRANDS]

export default function BrandStrip() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const totalWidth = track.scrollWidth / 3
    let paused = false

    const ticker = gsap.ticker.add(() => {
      if (paused) return
      const x = gsap.getProperty(track, 'x') as number
      gsap.set(track, { x: x - 0.6 <= -totalWidth ? 0 : x - 0.6 })
    })

    const strip = track.parentElement
    strip?.addEventListener('mouseenter', () => { paused = true })
    strip?.addEventListener('mouseleave', () => { paused = false })

    return () => { gsap.ticker.remove(ticker) }
  }, [])

  return (
    <div
      aria-label="Marcas que trabalhamos"
      style={{ background: 'var(--color-yellow)', padding: '14px 0 20px', overflow: 'hidden' }}
    >
      <p style={{
        textAlign: 'center',
        fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700,
        letterSpacing: '2.5px', textTransform: 'uppercase',
        color: 'rgba(10,10,10,0.5)', marginBottom: 10,
      }}>
        TRABALHAMOS COM AS MAIORES MARCAS DO BRASIL
      </p>

      <div
        ref={trackRef}
        style={{ display: 'flex', alignItems: 'center', gap: 72, willChange: 'transform', width: 'max-content' }}
      >
        {ITEMS.map((brand, i) => (
          <div key={i} style={{ flexShrink: 0, height: 64, display: 'flex', alignItems: 'center' }}>
            <Image
              src={brand.src}
              alt={brand.alt}
              width={130}
              height={64}
              style={{ height: 54, width: 'auto', objectFit: 'contain' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
