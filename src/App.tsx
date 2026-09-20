import { lazy, Suspense } from 'react'
import { Footer } from './components/layout/Footer'
import { Navigation } from './components/layout/Navigation'
import { WhatsAppFloat } from './components/layout/WhatsAppFloat'
import { CaseStudies } from './components/sections/CaseStudies'
import { Clients } from './components/sections/Clients'
import { FinalCta } from './components/sections/FinalCta'
import { Founder } from './components/sections/Founder'
import { Gallery } from './components/sections/Gallery'
import { Hero } from './components/sections/Hero'
import { Highlights } from './components/sections/Highlights'
import { Packages } from './components/sections/Packages'
import { NumbersSection } from './components/sections/NumbersSection'
import { Process } from './components/sections/Process'
import { Services } from './components/sections/Services'
import { Testimonials } from './components/sections/Testimonials'
import { Why } from './components/sections/Why'
import { GsapScrollRoot } from './motion/GsapScrollRoot'
import { SmoothScroll } from './motion/SmoothScroll'

const GlassAgencyBackground = lazy(() =>
  import('./components/sections/GlassAgencyBackground').then((m) => ({
    default: m.GlassAgencyBackground,
  })),
)

export default function App() {
  return (
    <GsapScrollRoot>
      <SmoothScroll>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Suspense fallback={null}>
        <GlassAgencyBackground />
      </Suspense>
      <div className="bg-noise" aria-hidden="true" />
      <div className="site-glass-foreground">
        <Navigation />
        <main id="main">
          <Hero />
          <NumbersSection />
          <Services />
          <Process />
          <Clients />
          <CaseStudies />
          <Highlights />
          <Founder />
          <Why />
          <Packages />
          <Gallery />
          <Testimonials />
          <FinalCta />
        </main>
        <Footer />
      </div>
      <WhatsAppFloat />
      </SmoothScroll>
    </GsapScrollRoot>
  )
}
