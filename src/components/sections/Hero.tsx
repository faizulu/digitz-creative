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
      className="hero-liquid relative w-full overflow-hidden"
    >
      <Container className="hero-liquid-shell relative z-10">
        <div className="hero-liquid-main grid items-center gap-6 lg:grid-cols-12 lg:gap-5 xl:gap-8">
          <div className="lg:col-span-6 xl:col-span-6">
            <Reveal>
              <p className="hero-liquid-eyebrow mb-3 block font-mono text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase sm:mb-4 sm:text-[11px]">
                {hero.eyebrow}
              </p>

              <h1 className="hero-headline max-w-5xl text-[clamp(2.1rem,5.8vw,4.75rem)] leading-[0.9] font-bold tracking-[-0.045em] text-ink">
                <span className="hero-headline-row">
                  <span>{hero.headlineBefore}</span>
                  <HandwriteText
                    words={hero.handwriteWords}
                    delay={300}
                    durationMs={2700}
                    holdMs={1600}
                  />
                </span>
                <span className="mt-0.5 block">{hero.headlineAfter}</span>
              </h1>

              <p className="hero-liquid-support mt-3 max-w-xl text-[13px] leading-relaxed text-ink/60 sm:mt-4 sm:text-[15px]">
                {hero.support}
              </p>

              <div className="hero-liquid-tags mt-4 flex flex-wrap items-center gap-2 sm:mt-5 sm:gap-3">
                {hero.rotating.map((label, i) => (
                  <span
                    key={label}
                    className={`hero-tag ${i === rotateIndex ? 'is-active' : ''}`}
                  >
                    {label}
                  </span>
                ))}
              </div>

              <div className="hero-liquid-ctas mt-5 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:items-center sm:gap-3">
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-liquid-primary group"
                >
                  {hero.primaryCta}
                  <span className="btn-liquid-mark" aria-hidden>
                    <ArrowRight size={14} strokeWidth={2} />
                  </span>
                </a>
                <a href="#work" className="btn-liquid-secondary group">
                  {hero.secondaryCta}
                  <ArrowUpRight size={15} strokeWidth={1.85} aria-hidden />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right — image 1 collage */}
          <div className="relative min-h-0 lg:col-span-6 xl:col-span-6">
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
                  <div className="mt-4 flex items-end justify-between gap-3 border-t border-white/30 pt-3">
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
          <div className="hero-trusted border-t border-white/40">
            <p className="mb-3 text-[10px] font-semibold tracking-[0.22em] text-ink/45 uppercase sm:text-[11px]">
              {hero.trustedLabel}
            </p>
            <div className="relative overflow-hidden">
              <div className="trusted-marquee flex w-max gap-10 whitespace-nowrap">
                {[...trustedNames, ...trustedNames].map((name, i) => (
                  <span
                    key={`${name}-${i}`}
                    className="text-[14px] font-semibold tracking-tight text-ink/55 sm:text-[15px]"
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
