import type { ReactNode } from 'react'
import { Star } from 'lucide-react'
import { heroRating, testimonials } from '../../data/content'
import { ActionWord } from '../ui/HeroActionText'

const items = testimonials.items

type Item = (typeof items)[number]
type Layout = Item['layout']

function Stars({ className }: { className?: string }) {
  return (
    <div className={className ? `tm-stars ${className}` : 'tm-stars'} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={11} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  )
}

function QuoteMark({ className }: { className?: string }) {
  return (
    <span className={className ? `tm-quote-mark ${className}` : 'tm-quote-mark'} aria-hidden>
      “
    </span>
  )
}

function Signature({ name }: { name: string }) {
  return (
    <span className="tm-signature" aria-hidden>
      {name.split(' ')[0]}
    </span>
  )
}

function AvatarStack({ images }: { images: readonly string[] }) {
  return (
    <div className="tm-avatar-stack" aria-hidden>
      {images.map((src) => (
        <img key={src} src={src} alt="" width={28} height={28} loading="lazy" decoding="async" />
      ))}
    </div>
  )
}

function CardShell({
  item,
  className,
  children,
}: {
  item: Item
  className: string
  children: ReactNode
}) {
  return (
    <article className={`tm-card ${className}`} data-layout={item.layout}>
      {children}
    </article>
  )
}

function TestimonialCard({ item }: { item: Item }) {
  switch (item.layout) {
    case 'overlap_top':
      return (
        <CardShell item={item} className="tm-card--overlap-top">
          <img
            className="tm-avatar tm-avatar--overlap-top"
            src={item.image}
            alt=""
            width={56}
            height={56}
            loading="lazy"
            decoding="async"
          />
          <h3 className="tm-heading">{item.headline}</h3>
        </CardShell>
      )

    case 'quote_corner':
      return (
        <CardShell item={item} className="tm-card--quote-corner">
          <img
            className="tm-avatar tm-avatar--corner"
            src={item.image}
            alt=""
            width={44}
            height={44}
            loading="lazy"
            decoding="async"
          />
          <QuoteMark className="tm-quote-mark--sm" />
          <div className="tm-quote-corner-copy">
            <span className="tm-pill">{item.name}</span>
            <h3 className="tm-heading">{item.headline}</h3>
          </div>
        </CardShell>
      )

    case 'portrait_wide':
      return (
        <CardShell item={item} className="tm-card--portrait-wide">
          <div className="tm-portrait-col">
            <img
              className="tm-avatar tm-avatar--lg"
              src={item.image}
              alt=""
              width={92}
              height={92}
              loading="lazy"
              decoding="async"
            />
            {'stack' in item && item.stack ? <AvatarStack images={item.stack} /> : null}
          </div>
          <div className="tm-portrait-copy">
            <Stars className="tm-stars--left" />
            <QuoteMark />
            <p className="tm-body">{item.quote}</p>
            <span className="tm-pill tm-pill--soft">
              {item.name}
              <em>{item.role}</em>
            </span>
          </div>
        </CardShell>
      )

    case 'split_right':
      return (
        <CardShell item={item} className="tm-card--split-right">
          <div className="tm-split-copy">
            <QuoteMark className="tm-quote-mark--sm" />
            <p className="tm-body">{item.quote}</p>
          </div>
          <div className="tm-split-person">
            <img
              className="tm-avatar"
              src={item.image}
              alt=""
              width={52}
              height={52}
              loading="lazy"
              decoding="async"
            />
            <strong>{item.name}</strong>
            <span>{item.role}</span>
          </div>
        </CardShell>
      )

    case 'tall_photo':
      return (
        <CardShell item={item} className="tm-card--tall-photo">
          <div className="tm-photo-wrap">
            <img
              className="tm-photo"
              src={item.image}
              alt=""
              width={220}
              height={180}
              loading="lazy"
              decoding="async"
            />
            <QuoteMark className="tm-quote-mark--on-photo" />
          </div>
          <div className="tm-attrib-row">
            <strong>{item.name}</strong>
            {'signature' in item && item.signature ? <Signature name={item.name} /> : null}
          </div>
        </CardShell>
      )

    case 'compact_center':
      return (
        <CardShell item={item} className="tm-card--compact">
          <img
            className="tm-avatar tm-avatar--center"
            src={item.image}
            alt=""
            width={48}
            height={48}
            loading="lazy"
            decoding="async"
          />
          {item.rating ? <Stars /> : null}
          <strong className="tm-name">{item.name.split(' ')[0]}</strong>
          {'signature' in item && item.signature ? <Signature name={item.name} /> : null}
        </CardShell>
      )

    case 'portrait_quote':
      return (
        <CardShell item={item} className="tm-card--portrait-quote">
          <img
            className="tm-photo tm-photo--square"
            src={item.image}
            alt=""
            width={72}
            height={72}
            loading="lazy"
            decoding="async"
          />
          <div className="tm-portrait-copy">
            <QuoteMark className="tm-quote-mark--sm" />
            <h3 className="tm-heading">{item.headline}</h3>
            <p className="tm-body">{item.quote}</p>
          </div>
        </CardShell>
      )

    case 'heading_stack':
      return (
        <CardShell item={item} className="tm-card--heading-stack">
          <h3 className="tm-heading">{item.headline}</h3>
          <p className="tm-body">{item.quote}</p>
          <strong className="tm-name">{item.name}</strong>
          {'stack' in item && item.stack ? <AvatarStack images={item.stack} /> : null}
        </CardShell>
      )

    case 'mega_quote':
      return (
        <CardShell item={item} className="tm-card--mega-quote">
          <QuoteMark className="tm-quote-mark--xl" />
          <div className="tm-mega-copy">
            <p className="tm-body">{item.quote}</p>
            {item.rating ? <Stars className="tm-stars--left" /> : null}
            <span className="tm-pill tm-pill--dark">
              {item.name}
              <em>{item.role}</em>
            </span>
          </div>
          <img
            className="tm-avatar tm-avatar--mega"
            src={item.image}
            alt=""
            width={72}
            height={72}
            loading="lazy"
            decoding="async"
          />
        </CardShell>
      )

    case 'large_quote':
      return (
        <CardShell item={item} className="tm-card--large-quote">
          <div className="tm-quote-badge" aria-hidden>
            “
          </div>
          <p className="tm-body tm-body--lg">{item.quote}</p>
          <div className="tm-large-foot">
            <div className="tm-large-person">
              <img
                className="tm-avatar tm-avatar--sm"
                src={item.image}
                alt=""
                width={36}
                height={36}
                loading="lazy"
                decoding="async"
              />
              <strong>{item.name}</strong>
            </div>
            {'signature' in item && item.signature ? <Signature name={item.name} /> : null}
          </div>
        </CardShell>
      )

    default:
      return null
  }
}

/* 2×3 collage — sized to fit one fullpage panel without clipping */
const COLUMNS: readonly (readonly Layout[])[] = [
  ['portrait_wide', 'split_right'],
  ['tall_photo', 'compact_center'],
  ['heading_stack', 'mega_quote'],
]

export function Testimonials() {
  const byLayout = Object.fromEntries(items.map((item) => [item.layout, item])) as Record<
    Layout,
    Item
  >

  return (
    <section id="voice" className="testimonial-section" aria-labelledby="voice-heading">
      <div className="testimonial-shell">
        <div className="testimonial-top">
          <div className="testimonial-header">
            <p className="testimonial-eyebrow">CLIENT VOICE</p>
            <h2 id="voice-heading">
              References on request.{' '}
              Quotes when <ActionWord>verified</ActionWord>.
            </h2>
          </div>

          <div
            className="testimonial-rating"
            aria-label={`${heroRating.score} out of 10 client rating`}
          >
            <strong>{heroRating.score}</strong>
            <span>{heroRating.label}</span>
          </div>
        </div>

        <div className="tm-masonry" role="list">
          {COLUMNS.map((column, colIndex) => (
            <div
              key={colIndex}
              className={`tm-col tm-col--${colIndex === 0 ? 'left' : colIndex === 1 ? 'mid' : 'right'}`}
            >
              {column.map((layout) => {
                const item = byLayout[layout]
                if (!item) return null
                return (
                  <div key={item.handle} className={`tm-cell tm-cell--${layout}`} role="listitem">
                    <TestimonialCard item={item} />
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
