import { useMemo, useState } from 'react'
import { ArrowUpRight, Plus } from 'lucide-react'
import { gallery, galleryFilters } from '../../data/content'

type FilterId = (typeof galleryFilters)[number]['id']
type GalleryId = (typeof gallery)[number]['id']

const byId = Object.fromEntries(gallery.map((item) => [item.id, item])) as Record<
  GalleryId,
  (typeof gallery)[number]
>

/**
 * Section 12 — Work gallery
 * Uses the site-wide iridescent liquid-glass field (same as Clients)
 * with centered frosted work cards.
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
      {/* Soft atmosphere only — site fluted glass stays visible underneath */}
      <div className="work-gallery-atmosphere" aria-hidden>
        <span className="clients-blob clients-blob--mint" />
        <span className="clients-blob clients-blob--cyan" />
        <span className="clients-blob clients-blob--champagne" />
        <span className="clients-blob clients-blob--lavender" />
        <span className="clients-blob clients-blob--peach" />
      </div>

      <div className="work-gallery-shell relative z-10">
        <header className="work-gallery-head">
          <p className="work-gallery-tag">12 | Work gallery</p>
          <h2 id="gallery-heading" className="work-gallery-title">
            Reels. Branding. Ads.{' '}
            <span>Campaigns. Social.</span>
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
            <span className="work-card-plus" aria-hidden>
              <Plus size={13} strokeWidth={2.4} />
            </span>
            <p className="work-card-cat">{byId.reels.title}</p>
            <h3 className="work-card-title">
              {byId.reels.note}{' '}
              <a href={byId.reels.href} className="work-card-link">
                Project link
              </a>
            </h3>
            <div className="work-card-stage">
              <div className="work-phone">
                <img src="/process/03-create.png" alt="" loading="lazy" />
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
            <span className="work-card-plus" aria-hidden>
              <Plus size={13} strokeWidth={2.4} />
            </span>
            <p className="work-card-cat">{byId.branding.title}</p>
            <h3 className="work-card-title">{byId.branding.note}</h3>
            <div className="work-brand-mock" aria-hidden>
              <div className="work-brand-tile work-brand-tile--dark">DC</div>
              <div className="work-brand-tile work-brand-tile--light">Digitz</div>
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
            <span className="work-card-plus" aria-hidden>
              <Plus size={13} strokeWidth={2.4} />
            </span>
            <p className="work-card-cat">{byId.campaigns.title}</p>
            <h3 className="work-card-title">{byId.campaigns.note}</h3>
            <div className="work-logo-grid" aria-hidden>
              <span className="work-logo-cell tone-ink">CS</span>
              <span className="work-logo-cell tone-blue">BB</span>
              <span className="work-logo-cell tone-sand">FF</span>
              <span className="work-logo-cell tone-mint">AR</span>
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
            <span className="work-card-plus" aria-hidden>
              <Plus size={13} strokeWidth={2.4} />
            </span>
            <p className="work-card-cat">{byId.ads.title}</p>
            <h3 className="work-card-title">{byId.ads.note}</h3>
            <div className="work-ads-mock" aria-hidden>
              <div className="work-ads-serp">
                <span className="work-ads-url">digitzcreative.com</span>
                <strong>Grow your local brand online</strong>
                <p>Reels, ads, and always-on social for Trichy businesses.</p>
              </div>
              <div className="work-ads-banner">Meta · Reach +42%</div>
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
            <span className="work-card-plus" aria-hidden>
              <Plus size={13} strokeWidth={2.4} />
            </span>
            <p className="work-card-cat">{byId.social.title}</p>
            <h3 className="work-card-title">{byId.social.note}</h3>
            <div className="work-social-stack" aria-hidden>
              <div className="work-social-post">
                <img src="/process/01-discover.png" alt="" />
                <div>
                  <strong>Chai Sutta Bar</strong>
                  <p>New drop. Same ritual.</p>
                </div>
              </div>
              <div className="work-social-post">
                <img src="/process/04-promote.png" alt="" />
                <div>
                  <strong>Benne Bhavan</strong>
                  <p>Tonight&apos;s special, framed right.</p>
                </div>
              </div>
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
