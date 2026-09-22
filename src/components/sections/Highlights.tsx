import { ArrowUpRight } from 'lucide-react'
import { Container } from '../ui/Container'
import {
  highlightsSection,
  influencer,
  personalBranding,
  whatsappUrl,
} from '../../data/content'
import { ActionWord } from '../ui/HeroActionText'

function pad(i: number) {
  return String(i + 1).padStart(2, '0')
}

const cards = [
  {
    key: 'branding',
    tone: 'cyan' as const,
    index: '07',
    eyebrow: personalBranding.eyebrow,
    title: (
      <>
        Personal branding that
        <br />
        builds authority
      </>
    ),
    body: personalBranding.body,
    image: personalBranding.image,
    imageAlt: personalBranding.imageAlt,
    caption: 'Authority-led content',
    flow: personalBranding.flow,
  },
  {
    key: 'influencer',
    tone: 'lime' as const,
    index: '08',
    eyebrow: influencer.eyebrow,
    title: (
      <>
        Creator × Brand ×
        <br />
        Audience
      </>
    ),
    body: influencer.body,
    image: influencer.image,
    imageAlt: influencer.imageAlt,
    caption: 'Creator × brand workflow',
    flow: influencer.flow,
  },
] as const

export function Highlights() {
  return (
    <section
      id="highlights"
      aria-labelledby="highlights-heading"
      className="hl-studio"
    >
      <div className="hl-studio-wash" aria-hidden />
      <div
        className="hl-studio-orb hl-studio-orb--a gs-parallax"
        data-parallax="-48"
        aria-hidden
      />
      <div
        className="hl-studio-orb hl-studio-orb--b gs-parallax"
        data-parallax="36"
        aria-hidden
      />

      <Container className="relative z-[1] w-full px-4 md:px-6">
        <div className="hl-bento">
          {/* Intro — glass + neu panel fills full column height */}
          <div className="hl-intro-shell gs-reveal">
            <header className="hl-intro-core">
              <span className="hl-intro-pill">{highlightsSection.eyebrow}</span>
              <h2 id="highlights-heading" className="hl-intro-title">
                Brands designed to
                <br />
                be <ActionWord>remembered</ActionWord>.
              </h2>
              <p className="hl-intro-support">{highlightsSection.support}</p>

              <div className="hl-intro-stats">
                <div className="hl-stat">
                  <span className="hl-stat-val">07</span>
                  <span className="hl-stat-label">Personal brands</span>
                </div>
                <div className="hl-stat">
                  <span className="hl-stat-val">08</span>
                  <span className="hl-stat-label">Creator × brand</span>
                </div>
              </div>

              <a
                href={whatsappUrl(
                  'Hi Digitz Creative — I’d like to talk personal branding / influencer work.',
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="group hl-intro-cta"
              >
                Start a brief
                <span className="hl-intro-cta-icon" aria-hidden>
                  <ArrowUpRight size={14} strokeWidth={1.5} />
                </span>
              </a>
            </header>
          </div>

          <div className="hl-bento-cards">
            {cards.map((card) => (
              <div
                key={card.key}
                className={`hl-card-shell hl-card-shell--${card.tone} gs-reveal-item`}
              >
                <article className={`hl-card-core hl-card-core--${card.tone}`}>
                  <span className="hl-card-index" aria-hidden>
                    {card.index}
                  </span>

                  <figure className="hl-card-media">
                    <div className="hl-card-media-neu">
                      <img
                        src={card.image}
                        alt={card.imageAlt}
                        className="hl-card-img"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <figcaption className="hl-card-caption">
                      {card.caption}
                    </figcaption>
                  </figure>

                  <div className="hl-card-copy">
                    <p className="hl-card-eyebrow">{card.eyebrow}</p>
                    <h3 className="hl-card-title">{card.title}</h3>
                    <p className="hl-card-text">{card.body}</p>

                    <ol className="hl-chip-row">
                      {card.flow.map((step, i) => (
                        <li key={step} className="hl-chip">
                          <span className="hl-chip-num">{pad(i)}</span>
                          <span className="hl-chip-label">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
