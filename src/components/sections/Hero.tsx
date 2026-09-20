import { ArrowRight, ArrowUpRight, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  clientCategories,
  hero,
  heroCollage,
  heroQuotes,
  heroRating,
  whatsappUrl,
} from '../../data/content'
import { Container } from '../ui/Container'
import { HandwriteText } from '../ui/HandwriteText'
import { Reveal } from '../ui/Reveal'

const trustedNames = clientCategories.flatMap((c) => c.clients).slice(0, 10)

function Stars({ size = 14 }: { size?: number }) {
  return (
    <div className="flex gap-0.5 text-amber-400" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  )
}

export function Hero() {
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [rotateIndex, setRotateIndex] = useState(0)

  useEffect(() => {
    const q = window.setInterval(() => {
      setQuoteIndex((i) => (i + 1) % heroQuotes.length)
    }, 5600)
    const r = window.setInterval(() => {
      setRotateIndex((i) => (i + 1) % hero.rotating.length)
    }, 2200)
    return () => {
      window.clearInterval(q)
      window.clearInterval(r)
    }
  }, [])

  const quote = heroQuotes[quoteIndex]
  const peekA = heroQuotes[(quoteIndex + 1) % heroQuotes.length]
  const peekB = heroQuotes[(quoteIndex + 2) % heroQuotes.length]
  const leftCard = heroCollage[0]
  const rightCard = heroCollage[1]
  const bottomCard = heroCollage[2]

  return (
    <section
      id="top"
      className="hero-liquid relative w-full overflow-hidden pt-24 pb-10 sm:pt-28 sm:pb-12"
    >
      <Container className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-6 xl:gap-10">
          <div className="lg:col-span-6 xl:col-span-6">
            <Reveal>
              <p className="mb-6 block font-mono text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                {hero.eyebrow}
              </p>

              <h1 className="hero-headline max-w-5xl text-[clamp(2.75rem,8.2vw,6.25rem)] leading-[0.88] font-bold tracking-[-0.045em] text-ink">
                <span className="hero-headline-row">
                  <span>{hero.headlineBefore}</span>
                  <HandwriteText
                    words={hero.handwriteWords}
                    delay={300}
                    durationMs={2700}
                    holdMs={1600}
                  />
                </span>
                <span className="mt-1 block">{hero.headlineAfter}</span>
              </h1>

              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink/60 sm:text-base">
                {hero.support}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {hero.rotating.map((label, i) => (
                  <span
                    key={label}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold shadow-sm transition-all duration-500 ${
                      i === rotateIndex
                        ? 'border-ink bg-ink text-white shadow-md'
                        : 'border-white/60 bg-white/40 text-slate-800 backdrop-blur-sm'
                    }`}
                  >
                    {label}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-5 py-3 text-sm"
                >
                  {hero.primaryCta}
                  <ArrowRight size={15} color="#ffffff" aria-hidden />
                </a>
                <a href="#work" className="btn-secondary px-5 py-3 text-sm">
                  {hero.secondaryCta}
                  <ArrowUpRight size={15} aria-hidden />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right — image 1 collage */}
          <div className="relative lg:col-span-6 xl:col-span-6">
            <Reveal delay={80}>
              <div className="hero-collage">
                {/* Color blobs — vivid like image 1 */}
                <div className="hero-collage-blob hero-collage-blob--green" aria-hidden />
                <div className="hero-collage-blob hero-collage-blob--amber" aria-hidden />
                <div className="hero-collage-blob hero-collage-blob--teal" aria-hidden />
                <div className="hero-collage-blob hero-collage-blob--orange" aria-hidden />

                {/* 9.8 / 10 badge — top right */}
                <div className="glass-card hero-collage-rating">
                  <strong>{heroRating.score}</strong>
                  <span>{heroRating.label}</span>
                </div>

                {/* Satellite — far back top */}
                <article className="glass-card hero-collage-card hero-collage-card--peek-a" aria-hidden>
                  <Stars size={11} />
                  <p className="hero-collage-quote-xs">“{peekA.quote}”</p>
                </article>

                {/* Satellite — far back right */}
                <article className="glass-card hero-collage-card hero-collage-card--peek-b" aria-hidden>
                  <div className="flex items-center gap-2">
                    <img src={peekB.image} alt="" className="hero-collage-avatar" />
                    <div>
                      <p className="hero-collage-name">{peekB.attribution}</p>
                      <p className="hero-collage-role">{peekB.company}</p>
                    </div>
                  </div>
                </article>

                {/* Left floating card */}
                <article className="glass-card hero-collage-card hero-collage-card--left" aria-hidden>
                  <div className="mb-2 flex items-center gap-2">
                    <img src={leftCard.image} alt="" className="hero-collage-avatar" />
                    <Stars size={11} />
                  </div>
                  <p className="hero-collage-quote-sm">“{leftCard.quote}”</p>
                  <p className="mt-2 text-[11px] font-bold text-slate-800">{leftCard.attribution}</p>
                  <p className="text-[10px] text-slate-500">{leftCard.company}</p>
                </article>

                {/* Right floating card */}
                <article className="glass-card hero-collage-card hero-collage-card--right" aria-hidden>
                  <div className="mb-2 flex items-center gap-2">
                    <img src={rightCard.image} alt="" className="hero-collage-avatar" />
                    <div>
                      <p className="hero-collage-name">{rightCard.attribution}</p>
                      <p className="hero-collage-role">{rightCard.company}</p>
                    </div>
                  </div>
                  <p className="hero-collage-quote-sm">“{rightCard.quote}”</p>
                </article>

                {/* Bottom floating card — logo */}
                <article className="glass-card hero-collage-card hero-collage-card--bottom" aria-hidden>
                  <div className="mb-2 flex items-center gap-2.5">
                    <span className="hero-collage-logo">{bottomCard.logo}</span>
                    <div>
                      <p className="hero-collage-name">{bottomCard.attribution}</p>
                      <p className="hero-collage-role">{bottomCard.company}</p>
                    </div>
                  </div>
                  <p className="hero-collage-quote-sm">“{bottomCard.quote}”</p>
                </article>

                {/* Main foreground card */}
                <article className="glass-card hero-collage-card hero-collage-card--main">
                  <Stars size={15} />
                  <p className="hero-collage-quote">“{quote.quote}”</p>
                  <div className="mt-5 flex items-end justify-between gap-3 border-t border-white/30 pt-4">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{quote.attribution}</p>
                      <p className="text-xs text-slate-500">{quote.company}</p>
                    </div>
                    <div className="flex items-center gap-1.5" aria-label="Testimonial slides">
                      {heroQuotes.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          className={`rounded-full transition-all ${
                            i === quoteIndex
                              ? 'h-1.5 w-5 bg-[#1578b8]'
                              : 'h-1.5 w-1.5 bg-slate-300'
                          }`}
                          aria-label={`Show quote ${i + 1}`}
                          onClick={() => setQuoteIndex(i)}
                        />
                      ))}
                    </div>
                  </div>
                </article>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={120}>
          <div className="mt-10 border-t border-slate-200/70 pt-6 sm:mt-12">
            <p className="mb-4 text-[11px] font-semibold tracking-[0.22em] text-ink/45 uppercase">
              {hero.trustedLabel}
            </p>
            <div className="relative overflow-hidden">
              <div className="trusted-marquee flex w-max gap-10 whitespace-nowrap">
                {[...trustedNames, ...trustedNames].map((name, i) => (
                  <span
                    key={`${name}-${i}`}
                    className="text-[15px] font-semibold tracking-tight text-ink/55"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
