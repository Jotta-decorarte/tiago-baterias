import type { Metadata, Viewport } from 'next'
import { Barlow_Condensed, Barlow, Inter } from 'next/font/google'
import './globals.css'

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})
const barlow = Barlow({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-title',
  display: 'swap',
})
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
})

export const viewport: Viewport = { themeColor: '#0A0A0A' }

export const metadata: Metadata = {
  metadataBase: new URL('https://tiagobaterias.com.br'),
  title: 'Tiago Baterias Delivery — Bateria com instalação em até 60 minutos | Nilópolis, Mesquita, Anchieta',
  description:
    'Delivery de baterias automotivas com instalação em até 60 minutos em Nilópolis, Mesquita, Anchieta e região. Moura, Heliar, Bosch e mais. Atendemos 7 dias por semana. Ligue (21) 98732-3958.',
  keywords: [
    'bateria automotiva', 'delivery de bateria', 'instalação de bateria',
    'bateria Nilópolis', 'bateria Mesquita', 'bateria Anchieta',
    'Moura', 'Heliar', 'Bosch', 'Zetta', 'troca de bateria',
    'bateria moto', 'bateria caminhão', 'bateria AGM', 'bateria EFB',
    'Tiago Baterias', 'bateria a domicílio', 'socorro bateria',
  ],
  authors: [{ name: 'Tiago Baterias', url: 'https://tiagobaterias.com.br' }],
  creator: 'Agência GPV',
  publisher: 'Tiago Baterias',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://tiagobaterias.com.br',
    siteName: 'Tiago Baterias Delivery',
    title: 'Tiago Baterias — Bateria com instalação em até 60 minutos',
    description: 'Bateria descarregada? A gente chega até você em até 60 minutos. Nilópolis, Mesquita, Anchieta e região.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Tiago Baterias Delivery' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tiago Baterias — Bateria com instalação em até 60 minutos',
    description: 'Delivery de baterias com instalação em Nilópolis, Mesquita, Anchieta e região.',
  },
  alternates: { canonical: 'https://tiagobaterias.com.br' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${barlowCondensed.variable} ${barlow.variable} ${inter.variable}`}
    >
      <head>
        {/* ── Google Tag Manager ─────────────────────────────────────────
            Substitua GTM-XXXXXXX pelo seu ID real no Google Tag Manager   */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-XXXXXXX');
        `}} />

        {/* ── Facebook Pixel ─────────────────────────────────────────────
            Substitua 0000000000000000 pelo seu Pixel ID real               */}
        <script dangerouslySetInnerHTML={{ __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '0000000000000000');
          fbq('track', 'PageView');
        `}} />
        <noscript dangerouslySetInnerHTML={{ __html:
          `<img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=0000000000000000&ev=PageView&noscript=1"/>`
        }} />

        {/* Schema.org LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'AutoRepair',
              name: 'Tiago Baterias Delivery',
              description: 'Delivery de baterias automotivas com instalação em até 60 minutos.',
              telephone: '+55-21-98732-3958',
              url: 'https://tiagobaterias.com.br',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Av. Chrisóstomo Pimentel de Oliveira, 547',
                addressLocality: 'Anchieta',
                addressRegion: 'RJ',
                postalCode: '21645-521',
                addressCountry: 'BR',
              },
              geo: { '@type': 'GeoCoordinates', latitude: -22.8773, longitude: -43.3695 },
              openingHoursSpecification: [
                { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '18:00' },
                { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '08:00', closes: '16:00' },
              ],
              sameAs: ['https://instagram.com/tiagobaterias', 'https://facebook.com/share/18saCzrpKQ'],
            }),
          }}
        />
      </head>
      <body>
        {/* GTM noscript fallback */}
        <noscript dangerouslySetInnerHTML={{ __html:
          `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`
        }} />
        <a href="#main" className="skip-link">Pular para o conteúdo</a>
        {children}
      </body>
    </html>
  )
}
