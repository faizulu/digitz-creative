import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { process, whatsappUrl } from '../../data/content'
import { Container } from '../ui/Container'

const accents = [
  { ink: '#8B2E2E', soft: 'rgba(139, 46, 46, 0.1)' },
  { ink: '#B86A1A', soft: 'rgba(184, 106, 26, 0.1)' },
  { ink: '#9A7B1C', soft: 'rgba(154, 123, 28, 0.12)' },
  { ink: '#4F7A2E', soft: 'rgba(79, 122, 46, 0.12)' },
  { ink: '#2E5F7A', soft: 'rgba(46, 95, 122, 0.12)' },
  { ink: '#1578B8', soft: 'rgba(21, 120, 184, 0.12)' },
] as const

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="process-vanguard relative overflow-hidden py-16 sm:py-20 md:py-24"
    >
      <div className="process-vanguard-grain" aria-hidden />
      <div
        className="process-vanguard-orb process-vanguard-orb--a gs-parallax"
        data-parallax="-44"
        aria-hidden
      />
      <div
        className="process-vanguard-orb process-vanguard-orb--b gs-parallax"
        data-parallax="36"
        aria-hidden
      />

      <Container className="relative z-10 w-full px-4 md:px-6">
        <div className="process-rail">
          <header className="process-rail-intro gs-reveal">
            <div>
              <span className="mb-6 inline-flex rounded-full border border-[#1A1816]/[0.08] bg-[#1A1816]/[0.03] px-3 py-1 font-mono text-[10px] font-medium tracking-[0.2em] text-[#5C564E] uppercase">
                04 — Signature process
              </span>
              <h2
                id="process-heading"
                className="process-vanguard-title max-w-[12ch] text-[clamp(2.2rem,4.5vw,3.75rem)] leading-[0.98] tracking-[-0.04em] text-[#1A1816]"
              >
                Discover to grow —{' '}
                <em className="process-vanguard-serif">a single thread.</em>
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#6B655C] sm:text-[16px]">
                Six stages. No theatre. Each step exists to turn a business
                problem into a published, measurable signal.
              </p>
            </div>

            <a
              href={whatsappUrl(
                'Hi Digitz Creative — I’d like to walk through your process.',
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="group process-vanguard-cta mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-[#1A1816] py-2 pr-2 pl-6 text-[13px] font-semibold text-[#FDFBF7] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#2A2622] active:scale-[0.98] md:mt-0"
            >
              Talk process
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden />
              </span>
            </a>
          </header>

          <div className="process-rail-cards">
            {process.map((step, i) => {
              const accent = accents[i]
              return (
                <article
                  key={step.title}
                  className="process-strip gs-reveal-item"
                  style={
                    {
                      '--ps-ink': accent.ink,
                      '--ps-soft': accent.soft,
                    } as CSSProperties
                  }
                >
                  <span className="process-strip-spine" aria-hidden />
                  <figure className="process-strip-media">
                    <img
                      src={step.image}
                      alt={step.imageAlt}
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                  <div className="process-strip-body">
                    <div className="process-strip-top">
                      <span className="process-strip-index">{step.index}</span>
                      <span className="process-strip-name">{step.title}</span>
                    </div>
                    <h3 className="process-strip-title">{step.headline}</h3>
                    <p className="process-strip-text">{step.body}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
