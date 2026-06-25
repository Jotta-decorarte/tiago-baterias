import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import BrandStrip from '@/components/BrandStrip'
import HowItWorks from '@/components/HowItWorks'
import Catalog from '@/components/Catalog'
import CTABanner from '@/components/CTABanner'
import Differentials from '@/components/Differentials'
import Reviews from '@/components/Reviews'
import FAQ from '@/components/FAQ'
import Instagram from '@/components/Instagram'
import LeadForm from '@/components/LeadForm'
import Location from '@/components/Location'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <BrandStrip />
        <HowItWorks />

        {/* CTA 1 — após explicar como funciona, convida a pedir */}
        <CTABanner
          variant="yellow"
          headline="Precisa de uma bateria agora?"
          sub="Respondemos em minutos e chegamos até você em até 1 hora."
          btnLabel="Chamar no WhatsApp"
          wppMsg="Olá! Vi como funciona no site e quero pedir uma bateria para meu veículo."
          utmMedium="cta-apos-como-funciona"
        />

        <Catalog />
        <Differentials />

        {/* CTA 2 — após mostrar diferenciais, reforça a decisão */}
        <CTABanner
          variant="dark"
          headline="Chega de bateria fraca. Resolva hoje."
          sub="Atendemos 7 dias por semana. Instalamos onde você estiver — sem custo extra."
          btnLabel="Quero resolver agora — WhatsApp"
          wppMsg="Olá! Vi os diferenciais no site e quero pedir uma bateria. Podem me ajudar?"
          utmMedium="cta-apos-diferenciais"
        />

        <Reviews />
        <FAQ />
        <Instagram />
        <LeadForm />
        <Location />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
