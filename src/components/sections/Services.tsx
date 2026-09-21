import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import {
  ArrowRight,
  BarChart3,
  Megaphone,
  PenLine,
  Play,
  TrendingUp,
  Users,
} from 'lucide-react'
import { Container } from '../ui/Container'
import { services, servicesIntro } from '../../data/content'

const featureIcons = {
  pen: PenLine,
  users: Users,
  megaphone: Megaphone,
  chart: BarChart3,
} as const

export function Services() {
  const [active, setActive] = useState(3) // Personal Branding — matches reference
  const current = services[active]
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !rootRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.svc-stage-anim',
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power3.out',
          overwrite: true,
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [active])

  return (
    <section
      id="services"
      ref={rootRef}
      className="services-liquid relative overflow-hidden"
    >
      <div className="services-liquid-glow" aria-hidden />

      <Container className="services-liquid-shell relative z-10">
        <div className="services-liquid-grid">
          <div className="services-liquid-copy gs-reveal">
            <p className="services-liquid-eyebrow">{servicesIntro.eyebrow}</p>
            <h2 className="services-liquid-title">
              {servicesIntro.titleBefore}{' '}
              <em className="services-serif-accent">{servicesIntro.titleAccent}</em>
            </h2>
            <p className="services-liquid-body">{servicesIntro.body}</p>

            <nav className="services-liquid-tabs" aria-label="Service list">
              {services.map((service, i) => (
                <button
                  key={service.title}
                  type="button"
                  className={`services-liquid-tab${i === active ? ' is-active' : ''}`}
                  onClick={() => setActive(i)}
                  aria-current={i === active ? 'true' : undefined}
                >
                  <span className="services-liquid-tab-num">{service.index}</span>
                  <span className="services-liquid-tab-label">{service.title}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="services-liquid-stage">
            <p className="services-liquid-watermark" aria-hidden>
              {current.index} {current.title}
            </p>

            <div className="services-liquid-laptop svc-stage-anim">
              <div className="services-liquid-laptop-bezel">
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
                  alt="Campaign creative on laptop"
                  className="services-liquid-laptop-screen"
                />
              </div>
              <div className="services-liquid-laptop-base" />
            </div>

            <div className="services-liquid-stat glass-card svc-stage-anim">
              <TrendingUp size={16} className="text-[#58b832]" strokeWidth={2.2} aria-hidden />
              <p>{servicesIntro.stat}</p>
            </div>

            <a href="#contact" className="services-liquid-cta svc-stage-anim">
              Let&apos;s Grow Together
              <ArrowRight size={15} strokeWidth={2.2} aria-hidden />
            </a>
          </div>

          <div className="services-liquid-side gs-reveal">
            <div className="services-liquid-hand">
              <p className="services-liquid-note font-script">{servicesIntro.note}</p>
              <svg
                className="services-liquid-arrow"
                viewBox="0 0 72 36"
                fill="none"
                aria-hidden
              >
                <path
                  d="M8 6c18 4 36 14 52 26"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M50 24l10 8-12 2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="services-liquid-phone">
              <div className="services-liquid-phone-screen">
                <img
                  src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=600&q=80"
                  alt="Social feed on phone"
                />
                <span className="services-liquid-ig" aria-hidden>
                  <svg viewBox="0 0 24 24" width="36" height="36" fill="white">
                    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.2A4.8 4.8 0 1 0 16.8 12 4.8 4.8 0 0 0 12 7.2zm0 7.9A3.1 3.1 0 1 1 15.1 12 3.1 3.1 0 0 1 12 15.1zM17.6 6.2a1.15 1.15 0 1 0 1.15 1.15A1.15 1.15 0 0 0 17.6 6.2z" />
                  </svg>
                </span>
              </div>
            </div>

            <a href="#work" className="services-liquid-watch">
              <span className="services-liquid-watch-play">
                <Play size={12} fill="currentColor" aria-hidden />
              </span>
              {servicesIntro.watchLabel}
            </a>
          </div>
        </div>

        <div className="services-liquid-features" key={current.index}>
          {current.features.map((feature) => {
            const Icon = featureIcons[feature.icon]
            return (
              <article
                key={feature.title}
                className="services-liquid-feature glass-card svc-stage-anim"
              >
                <span className={`services-liquid-feature-ico tone-${feature.tone}`}>
                  <Icon size={15} strokeWidth={2} aria-hidden />
                </span>
                <div>
                  <p className="services-liquid-feature-title">{feature.title}</p>
                  <p className="services-liquid-feature-body">{feature.body}</p>
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
