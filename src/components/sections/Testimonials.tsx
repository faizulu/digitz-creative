import { useCallback, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { testimonials, whatsappUrl } from '../../data/content'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'

const items = testimonials.items

function useVisibleCount() {
  const [count, setCount] = useState(1)

  useEffect(() => {
    const update = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) setCount(3)
      else if (window.matchMedia('(min-width: 768px)').matches) setCount(2)
      else setCount(1)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return count
}

export function Testimonials() {
  const reduceMotion = useReducedMotion()
  const visible = useVisibleCount()
  const maxIndex = Math.max(0, items.length - visible)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex))
  }, [maxIndex])

  const goTo = useCallback(
    (next: number) => {
      setIndex(Math.max(0, Math.min(next, maxIndex)))
    },
    [maxIndex],
  )

  useEffect(() => {
    if (reduceMotion || maxIndex === 0) return
    const id = window.setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1))
    }, 5200)
    return () => window.clearInterval(id)
  }, [maxIndex, reduceMotion])

  return (
    <section id="voice" className="testimonials-section relative overflow-hidden py-20 sm:py-24">
      <div className="testimonials-ambient" aria-hidden>
        <span className="testimonials-blob testimonials-blob--a" />
        <span className="testimonials-blob testimonials-blob--b" />
      </div>

      <Container className="relative z-10">
        <Reveal>
          <header className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
            <p className="mb-3 text-[12px] font-medium tracking-[0.08em] text-slate-400">
              <span className="text-slate-500">13</span>
              <span className="mx-2 text-slate-300">/</span>
              Testimonial
            </p>
            <h2 className="section-hero-title text-[clamp(1.65rem,3.4vw,2.5rem)] leading-[1.15] font-bold tracking-[-0.03em] text-slate-900">
              References on request.{' '}
              <span className="gradient-text">Quotes when verified.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-slate-500">
              {testimonials.intro}
            </p>
          </header>
        </Reveal>

        <div className="testimonials-viewport">
          <motion.div
            className="testimonials-track"
            animate={{ x: `${(-index * 100) / items.length}%` }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: 'spring', stiffness: 260, damping: 32 }
            }
            style={{ width: `${(items.length * 100) / visible}%` }}
          >
            {items.map((item) => (
              <article
                key={item.handle}
                className="testimonials-slide"
                style={{ width: `${100 / items.length}%` }}
              >
                <div className="testimonial-glass">
                  <div className="testimonial-glass-body">
                    <span className="testimonial-quote-mark" aria-hidden>
                      “
                    </span>
                    <p className="testimonial-quote">{item.quote}</p>
                    <p className="testimonial-demo-label">Demo placeholder</p>
                  </div>

                  <div className="testimonial-notch">
                    <img
                      src={item.image}
                      alt=""
                      className="testimonial-avatar"
                      width={44}
                      height={44}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="testimonial-person">
                      <p className="testimonial-name">{item.name}</p>
                      <p className="testimonial-handle">{item.handle}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </motion.div>
        </div>

        <div className="testimonials-dots" role="tablist" aria-label="Testimonials">
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show testimonials group ${i + 1}`}
              className={`testimonials-dot ${i === index ? 'is-active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <Reveal>
          <div className="mt-10 flex justify-center">
            <a
              href={whatsappUrl(
                'Hi Digitz Creative — I’d like to request client references for a potential project.',
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-slate-200/80 bg-white/50 px-5 py-3 text-[11px] font-bold tracking-[0.18em] text-slate-800 uppercase backdrop-blur-md transition-colors hover:bg-white/80"
            >
              Request references
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
