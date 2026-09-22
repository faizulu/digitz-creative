import { useMemo, useState } from 'react'
import { ArrowUpRight, Plus } from 'lucide-react'
import { gallery, galleryFilters } from '../../data/content'
import { ActionWord } from '../ui/HeroActionText'

type FilterId = (typeof galleryFilters)[number]['id']
type GalleryId = (typeof gallery)[number]['id']

const byId = Object.fromEntries(gallery.map((item) => [item.id, item])) as Record<
  GalleryId,
  (typeof gallery)[number]
>

const campaigns = [
  { id: 'cs', label: 'CS', src: '/gallery/campaign-cs.png', alt: 'Classic Whites campaign still' },
  { id: 'bb', label: 'BB', src: '/gallery/campaign-bb.png', alt: 'Beverage campaign still' },
  { id: 'ff', label: 'FF', src: '/gallery/campaign-ff.png', alt: 'Femina Food Court campaign still' },
  { id: 'ar', label: 'AR', src: '/gallery/campaign-ar.png', alt: 'Arabs Tea campaign still' },
] as const

function GlassFace() {
  return (
    <>
      <span className="work-card-sheen" aria-hidden />
      <span className="work-card-rim" aria-hidden />
    </>
  )
}

function CardPlus() {
  return (
    <span className="work-card-plus" aria-hidden>
      <Plus size={13} strokeWidth={2.4} />
    </span>
  )
}

/**
 * Section 12 - Work gallery
 * Same 5-card bento. Cleaner media fills. Web glass cards.
 */
export function Gallery() {
  const [filter, setFilter] = useState<FilterId>('all')

  const visible = useMemo(() => {
    if (filter === 'all') return new Set(gallery.map((g) => g.id))
    return new Set([filter as GalleryId])
  }, [filter])

  const on = (id: GalleryId) => visible.has(id)

  return (
    <section
      id="gallery"
      className="work-gallery relative flex w-full overflow-hidden"
      aria-labelledby="gallery-heading"
    >
      <div className="work-gallery-atmosphere" aria-hidden>
        <span className="clients-blob clients-blob--mint" />
        <span className="clients-blob clients-blob--cyan" />
        <span className="clients-blob clients-blob--champagne" />
        <span className="clients-blob clients-blob--lavender" />
        <span className="clients-blob clients-blob--peach" />
      </div>

      <div className="work-gallery-shell relative z-10">
        <header className="work-gallery-head">
          <p className="work-gallery-tag">Work gallery</p>
          <h2 id="gallery-heading" className="work-gallery-title">
            Reels. Branding. Ads.{' '}
            <ActionWord>Campaigns</ActionWord>. Social.
          </h2>

          <div className="work-gallery-filters" role="tablist" aria-label="Gallery filters">
            {galleryFilters.map((chip) => (
              <button
                key={chip.id}
                type="button"
                role="tab"
                aria-selected={filter === chip.id}
                className={`work-filter-chip${filter === chip.id ? ' is-active' : ''}`}
                onClick={() => setFilter(chip.id)}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </header>

        <div className={`work-gallery-grid${filter === 'all' ? '' : ' is-filtered'}`}>
          <article
            className={`work-card work-card--reels${on('reels') ? ' is-on' : ''}`}
            data-category="reels"
          >
            <GlassFace />
            <CardPlus />
            <div className="work-card-copy">
              <p className="work-card-cat">{byId.reels.title}</p>
              <h3 className="work-card-title">
                {byId.reels.note}{' '}
                <a href={byId.reels.href} className="work-card-link">
                  Project link
                </a>
              </h3>
            </div>
            <div className="work-card-stage">
              <div className="work-phone">
                <img src="/gallery/reels.png" alt="Vertical food reel still" loading="lazy" />
              </div>
            </div>
            <a href={byId.reels.href} className="work-card-cta">
              {byId.reels.cta}
              <ArrowUpRight size={14} strokeWidth={2.2} aria-hidden />
            </a>
          </article>

          <article
            className={`work-card work-card--branding${on('branding') ? ' is-on' : ''}`}
            data-category="branding"
          >
            <GlassFace />
            <CardPlus />
            <div className="work-card-copy">
              <p className="work-card-cat">{byId.branding.title}</p>
              <h3 className="work-card-title">{byId.branding.note}</h3>
            </div>
            <div className="work-brand-mock">
              <figure className="work-brand-tile work-brand-tile--dark">
                <img src="/gallery/brand-dark.png" alt="Dark identity system still" loading="lazy" />
                <figcaption>DC</figcaption>
              </figure>
              <figure className="work-brand-tile work-brand-tile--light">
                <img src="/gallery/brand-light.png" alt="Light identity system still" loading="lazy" />
                <figcaption>Digitz</figcaption>
              </figure>
            </div>
            <a href={byId.branding.href} className="work-card-cta">
              {byId.branding.cta}
              <ArrowUpRight size={14} strokeWidth={2.2} aria-hidden />
            </a>
          </article>

          <article
            className={`work-card work-card--campaigns${on('campaigns') ? ' is-on' : ''}`}
            data-category="campaigns"
          >
            <GlassFace />
            <CardPlus />
            <div className="work-card-copy">
              <p className="work-card-cat">{byId.campaigns.title}</p>
              <h3 className="work-card-title">{byId.campaigns.note}</h3>
            </div>
            <div className="work-logo-grid">
              {campaigns.map((item) => (
                <figure key={item.id} className="work-logo-cell">
                  <img src={item.src} alt={item.alt} loading="lazy" />
                  <figcaption>{item.label}</figcaption>
                </figure>
              ))}
            </div>
            <a href={byId.campaigns.href} className="work-card-cta">
              {byId.campaigns.cta}
              <ArrowUpRight size={14} strokeWidth={2.2} aria-hidden />
            </a>
          </article>

          <article
            className={`work-card work-card--ads${on('ads') ? ' is-on' : ''}`}
            data-category="ads"
          >
            <GlassFace />
            <CardPlus />
            <div className="work-card-copy">
              <p className="work-card-cat">{byId.ads.title}</p>
              <h3 className="work-card-title">{byId.ads.note}</h3>
            </div>
            <div className="work-ads-mock">
              <img src="/gallery/ads.png" alt="Local brand Meta ad still" loading="lazy" />
              <span className="work-ads-chip">Meta Ads</span>
            </div>
            <a href={byId.ads.href} className="work-card-cta">
              {byId.ads.cta}
              <ArrowUpRight size={14} strokeWidth={2.2} aria-hidden />
            </a>
          </article>

          <article
            className={`work-card work-card--social${on('social') ? ' is-on' : ''}`}
            data-category="social"
          >
            <GlassFace />
            <CardPlus />
            <div className="work-card-copy">
              <p className="work-card-cat">{byId.social.title}</p>
              <h3 className="work-card-title">{byId.social.note}</h3>
            </div>
            <div className="work-social-stack">
              <figure className="work-social-post">
                <img src="/gallery/social-chai.png" alt="Chai Sutta Bar social still" loading="lazy" />
                <figcaption>
                  <strong>Chai Sutta Bar</strong>
                  <span>New drop. Same ritual.</span>
                </figcaption>
              </figure>
              <figure className="work-social-post">
                <img src="/gallery/social-benne.png" alt="Benne Bhavan social still" loading="lazy" />
                <figcaption>
                  <strong>Benne Bhavan</strong>
                  <span>Tonight&apos;s special.</span>
                </figcaption>
              </figure>
            </div>
            <a href={byId.social.href} className="work-card-cta">
              {byId.social.cta}
              <ArrowUpRight size={14} strokeWidth={2.2} aria-hidden />
            </a>
          </article>
        </div>
      </div>
    </section>
  )
}
