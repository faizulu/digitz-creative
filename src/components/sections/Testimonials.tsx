import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import { heroRating, testimonials } from '../../data/content'

const items = testimonials.items

function Stars() {
  return (
    <div className="testimonial-stars" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  )
}

function Avatar({ image }: { image: string }) {
  return (
    <img
      src={image}
      alt=""
      className="testimonial-avatar-img"
      width={38}
      height={38}
      loading="lazy"
      decoding="async"
    />
  )
}

export function Testimonials() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % items.length)
    }, 5200)
    return () => window.clearInterval(id)
  }, [])

  const main = items[active]
  const left = items[(active + 1) % items.length]
  const top = items[(active + 2) % items.length]
  const right = items[(active + 3) % items.length]

  return (
    <section
      id="voice"
      className="testimonial-section"
      aria-labelledby="voice-heading"
    >
      <div className="testimonial-header">
        <p className="testimonial-eyebrow">CLIENT VOICE</p>
        <h2 id="voice-heading">
          References on request.{' '}
          <span>Quotes when verified.</span>
        </h2>
      </div>

      <div className="testimonial-composition">
        {/* BACK LEFT */}
        <article className="testimonial-card testimonial-card-left" aria-hidden>
          <Stars />
          <p>{left.quote}</p>
          <div className="testimonial-user">
            <Avatar image={left.image} />
            <div>
              <strong>{left.name}</strong>
              <small>{left.handle}</small>
            </div>
          </div>
        </article>

        {/* BACK TOP */}
        <article className="testimonial-card testimonial-card-top" aria-hidden>
          <Stars />
          <p>{top.quote}</p>
          <div className="testimonial-user">
            <Avatar image={top.image} />
            <div>
              <strong>{top.name}</strong>
              <small>{top.handle}</small>
            </div>
          </div>
        </article>

        {/* BACK RIGHT */}
        <article className="testimonial-card testimonial-card-right" aria-hidden>
          <Stars />
          <p>{right.quote}</p>
          <div className="testimonial-user">
            <Avatar image={right.image} />
            <div>
              <strong>{right.name}</strong>
              <small>{right.handle}</small>
            </div>
          </div>
        </article>

        {/* MAIN */}
        <article className="testimonial-card testimonial-card-main" key={main.handle}>
          <Stars />
          <blockquote>{main.quote}</blockquote>
          <div className="testimonial-divider" aria-hidden />
          <div className="testimonial-main-footer">
            <div className="testimonial-main-user">
              <strong>{main.name}</strong>
              <span>{main.handle}</span>
            </div>
            <div className="testimonial-dots" role="tablist" aria-label="Quotes">
              {items.map((item, i) => (
                <button
                  key={item.handle}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Quote ${i + 1}`}
                  className={i === active ? 'active' : undefined}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>
          </div>
        </article>

        {/* RATING */}
        <div
          className="testimonial-rating"
          aria-label={`${heroRating.score} out of 10 client rating`}
        >
          <strong>{heroRating.score}</strong>
          <span>{heroRating.label}</span>
        </div>
      </div>
    </section>
  )
}
