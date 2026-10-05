import { Footer } from './components/layout/Footer'
import { InitialLoader } from './components/layout/InitialLoader'
import { Navigation } from './components/layout/Navigation'
import { SectionDots } from './components/layout/SectionDots'
import { SiteChat } from './components/layout/SiteChat'
import { CaseStudies } from './components/sections/CaseStudies'
import { Clients } from './components/sections/Clients'
import { FinalCta } from './components/sections/FinalCta'
import { Founder } from './components/sections/Founder'
import { Gallery } from './components/sections/Gallery'
import { GlassAgencyBackground } from './components/sections/GlassAgencyBackground'
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

export default function App() {
  return (
    <InitialLoader>
      <GsapScrollRoot>
        <SmoothScroll>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <GlassAgencyBackground />
          <div className="bg-noise" aria-hidden="true" />
          <div className="site-glass-foreground">
            <Navigation />
            <SectionDots />
            <main id="main" className="fullpage-main hdeck-track" aria-label="Site panels">
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
              <Footer />
            </main>
          </div>
          <SiteChat />
        </SmoothScroll>
      </GsapScrollRoot>
    </InitialLoader>
  )
}
