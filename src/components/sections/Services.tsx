import { useState } from 'react'
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
  const [active, setActive] = useState(2) // match mock: Social Media active
  const current = services[active]

  return (
    <section id="services" className="services-new relative overflow-hidden">
      {/* —— Intro: copy + collage —— */}
      <Container className="pt-14 pb-10 sm:pt-16 sm:pb-12 lg:pb-14">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="mb-5 flex items-center gap-3 text-[12px] font-semibold tracking-[0.22em] text-ink/55 uppercase">
              {servicesIntro.eyebrow}
              <span className="h-px w-10 bg-ink/25" />
            </p>
            <h2 className="section-hero-title max-w-md text-[clamp(2.1rem,4.2vw,3.35rem)] leading-[1.08] font-bold tracking-[-0.03em] text-ink">
              {servicesIntro.titleBefore}{' '}
              <em className="services-serif-accent">{servicesIntro.titleAccent}</em>
            </h2>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-muted">
              {servicesIntro.body}
            </p>
          </div>

          <div className="relative lg:col-span-7">
            <div className="services-collage">
              <div className="services-collage-glow" aria-hidden />

              <div className="services-collage-main">
                <div className="services-stat-card">
                  <TrendingUp size={18} className="text-cyan" strokeWidth={2} />
                  <p className="text-[13px] leading-snug font-semibold text-ink">
                    {servicesIntro.stat}
                  </p>
                </div>

                <div className="services-laptop">
                  <div className="services-laptop-bezel">
                    <img
                      src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
                      alt="Campaign creative on laptop"
                      className="services-laptop-screen"
                    />
                  </div>
                  <div className="services-laptop-base" />
                </div>
              </div>

              <div className="services-collage-side">
                <div className="services-hand-block">
                  <p className="services-hand-note font-script">{servicesIntro.note}</p>
                  <svg
                    className="services-hand-arrow"
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

                <div className="services-phone">
                  <img
                    src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=600&q=80"
                    alt="Social feed on phone"
                    className="services-phone-screen"
                  />
                </div>

                <a href="#work" className="services-watch-card">
                  <span className="services-watch-play">
                    <Play size={14} fill="currentColor" />
                  </span>
                  <span className="text-[13px] font-semibold text-ink">
                    {servicesIntro.watchLabel}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* —— Detail: tabs + content —— */}
      <Container className="pb-20 sm:pb-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Left nav */}
          <nav className="services-tabs lg:col-span-3" aria-label="Service list">
            {services.map((service, i) => (
              <button
                key={service.title}
                type="button"
                className={`services-tab${i === active ? ' is-active' : ''}`}
                onClick={() => setActive(i)}
                aria-current={i === active ? 'true' : undefined}
              >
                <span className="services-tab-num">{service.index}</span>
                <span className="services-tab-label">{service.title}</span>
              </button>
            ))}
          </nav>

          {/* Right panel */}
          <div className="lg:col-span-9">
            <div key={current.index} className="services-detail">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span className="services-detail-num">{current.index}</span>
                <span className="services-detail-rule" aria-hidden />
                <h3 className="services-detail-title">{current.title}</h3>
              </div>

              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-[16px]">
                {current.body}
              </p>

              <a href="#contact" className="services-grow-btn mt-7 inline-flex">
                Let&apos;s Grow Together
                <ArrowRight size={16} strokeWidth={2.2} />
              </a>

              {/* Feature row */}
              <div className="services-features mt-10">
                {current.features.map((feature) => {
                  const Icon = featureIcons[feature.icon]
                  return (
                    <div key={feature.title} className="services-feature">
                      <span className={`services-feature-ico tone-${feature.tone}`}>
                        <Icon size={16} strokeWidth={2} />
                      </span>
                      <p className="text-[14px] font-semibold text-ink">{feature.title}</p>
                      <p className="mt-1 text-[12px] leading-snug text-muted">{feature.body}</p>
                    </div>
                  )
                })}
              </div>

              {/* Work gallery */}
              <div className="services-works mt-8">
                {current.works.map((work) => (
                  <figure key={work.caption} className="services-work">
                    <img src={work.image} alt={work.caption} loading="lazy" />
                    <figcaption>{work.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
