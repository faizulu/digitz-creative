import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import { gallery } from '../../data/content'

const byId = Object.fromEntries(gallery.map((item) => [item.id, item])) as Record<
  (typeof gallery)[number]['id'],
  (typeof gallery)[number]
>

const reels = byId.reels
const branding = byId.branding
const ads = byId.ads
const campaigns = byId.campaigns
const social = byId.social

const Sparkle = ({ className = '' }: { className?: string }) => (
  <svg
    className={className}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M12 2.2 13.6 9.4 20.8 11 13.6 12.6 12 19.8 10.4 12.6 3.2 11 10.4 9.4 12 2.2Z" />
  </svg>
)

export function Gallery() {
  return (
    <section id="gallery" className="gallery-bento-section relative overflow-hidden py-20 sm:py-24">
      <div className="gallery-bento-ambient" aria-hidden>
        <span className="gallery-blob gallery-blob--a" />
        <span className="gallery-blob gallery-blob--b" />
        <span className="gallery-blob gallery-blob--c" />
      </div>

      <Container className="relative z-10">
        <SectionHeader
          index="12"
          eyebrow="Work gallery"
          title={
            <>
              Reels. Branding. Ads.{' '}
              <span className="gradient-text">Campaigns. Social.</span>
            </>
          }
          kicker="Visual categories from the brief. Panels are styled placeholders until selected reel covers and campaign stills are licensed for the site."
        />

        <div className="gallery-bento">
          {/* 1 — Reels (tall left) */}
          <Reveal className="gallery-cell gallery-cell--reels">
            <article className="gallery-glass gallery-glass--blue">
              <div className="gallery-glass-copy">
                <h3 className="gallery-glass-title">{reels.title}</h3>
                <p className="gallery-glass-note">{reels.note}</p>
              </div>

              <div className="gallery-phone" aria-hidden>
                <div className="gallery-phone-frame">
                  <img
                    src="/process/03-create.png"
                    alt=""
                    className="gallery-phone-img"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="gallery-phone-chrome">
                    <span />
                    <span />
                  </div>
                  <p className="gallery-phone-label">{reels.title}</p>
                </div>
              </div>
            </article>
          </Reveal>

          {/* 2 — Branding (mid) */}
          <Reveal delay={60} className="gallery-cell gallery-cell--branding">
            <article className="gallery-glass gallery-glass--lavender">
              <div className="gallery-oval-wrap">
                <img
                  src="/founder/faizal.png"
                  alt=""
                  className="gallery-oval-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <Sparkle className="gallery-sparkle text-violet-400/80" />
              <h3 className="gallery-glass-title gallery-glass-title--compact">{branding.title}</h3>
              <p className="gallery-glass-note">{branding.note}</p>
            </article>
          </Reveal>

          {/* 3 — Ads (tall right) */}
          <Reveal delay={90} className="gallery-cell gallery-cell--ads">
            <article className="gallery-glass gallery-glass--mint gallery-glass--dots">
              <div className="gallery-avatar-stack" aria-hidden>
                <img src="/process/01-discover.png" alt="" />
                <img src="/process/04-promote.png" alt="" />
                <img src="/process/06-grow.png" alt="" />
              </div>

              <div className="gallery-pill-row">
                <span className="gallery-pill gallery-pill--solid">Meta</span>
                <span className="gallery-pill gallery-pill--outline">Google</span>
              </div>

              <h3 className="gallery-glass-title mt-auto">{ads.title}</h3>
              <p className="gallery-glass-note">{ads.note}</p>
            </article>
          </Reveal>

          {/* 4 — Campaigns (tags) */}
          <Reveal delay={120} className="gallery-cell gallery-cell--campaigns">
            <article className="gallery-glass gallery-glass--peach gallery-glass--dots">
              <p className="gallery-tags-label">{campaigns.title}</p>
              <div className="gallery-tags">
                {gallery.map((item) => (
                  <span key={item.id} className="gallery-tag">
                    {item.title}
                  </span>
                ))}
              </div>
              <p className="gallery-glass-note gallery-tags-note">{campaigns.note}</p>
            </article>
          </Reveal>

          {/* 5 — Social (wide) */}
          <Reveal delay={150} className="gallery-cell gallery-cell--social">
            <article className="gallery-glass gallery-glass--sky gallery-glass--dots gallery-glass--split">
              <div className="gallery-social-copy">
                <Sparkle className="gallery-sparkle text-sky-500/70" />
                <h3 className="gallery-glass-title">{social.title}</h3>
                <p className="gallery-glass-note">{social.note}</p>
              </div>

              <aside className="gallery-quote-card">
                <span className="gallery-quote-mark" aria-hidden>
                  “
                </span>
                <p className="gallery-quote-text">{social.note}</p>
                <div className="gallery-quote-foot">
                  <div className="gallery-quote-faces" aria-hidden>
                    <img src="/process/02-strategize.png" alt="" />
                    <img src="/process/05-optimize.png" alt="" />
                    <img src="/founder/faizal.png" alt="" />
                  </div>
                  <p className="gallery-quote-attr">
                    Digitz Creative
                    <span>{social.title}</span>
                  </p>
                </div>
              </aside>
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
