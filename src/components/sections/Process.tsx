import { useEffect, useRef, type CSSProperties } from 'react'
import gsap from 'gsap'
import { ArrowUpRight } from 'lucide-react'
import { process, whatsappUrl } from '../../data/content'
import { ActionWord } from '../ui/HeroActionText'

const accents = [
  { ink: '#C45C4A', soft: 'rgba(196, 92, 74, 0.18)' },
  { ink: '#D4893A', soft: 'rgba(212, 137, 58, 0.18)' },
  { ink: '#C9A227', soft: 'rgba(201, 162, 39, 0.18)' },
  { ink: '#58b832', soft: 'rgba(88, 184, 50, 0.18)' },
  { ink: '#2E8BB8', soft: 'rgba(46, 139, 184, 0.18)' },
  { ink: '#1578b8', soft: 'rgba(21, 120, 184, 0.2)' },
] as const

export function Process() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !rootRef.current) return

    const play = () => {
      gsap.fromTo(
        '.process-deck-tile',
        { autoAlpha: 0, y: 18, scale: 0.97 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: { each: 0.05, from: 'start' },
          ease: 'power3.out',
          overwrite: true,
        },
      )
    }

    const ctx = gsap.context(() => {
      play()
    }, rootRef)

    const onSnap = (e: Event) => {
      const index = (e as CustomEvent<{ index: number }>).detail?.index
      const main = document.getElementById('main')
      if (!main || typeof index !== 'number') return
      const panels = main.querySelectorAll(':scope > section, :scope > footer')
      if (panels[index] !== rootRef.current) return
      play()
    }
    window.addEventListener('digitz:section-snap', onSnap)

    return () => {
      window.removeEventListener('digitz:section-snap', onSnap)
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="process"
      ref={rootRef}
      aria-labelledby="process-heading"
      className="process-deck relative overflow-hidden"
    >
      <div className="process-deck-glow" aria-hidden />

      <div className="process-deck-shell relative z-10">
        <div className="process-deck-frame">
          <header className="process-deck-head">
            <div className="process-deck-head-copy">
              <p className="process-deck-eyebrow">Signature process</p>
              <h2 id="process-heading" className="process-deck-title">
                Discover to <ActionWord>grow</ActionWord>{' '}
                a single thread.
              </h2>
              <p className="process-deck-body">
                Six stages. No theatre. Each step turns a business problem into a
                published, measurable signal.
              </p>
            </div>

            <a
              href={whatsappUrl(
                "Hi Digitz Creative - I'd like to walk through your process.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="process-deck-cta group"
            >
              Talk process
              <span className="process-deck-cta-mark" aria-hidden>
                <ArrowUpRight size={14} strokeWidth={2} />
              </span>
            </a>
          </header>

          <div className="process-deck-bento process-uv-cards" role="list">
            {process.map((step, i) => {
              const accent = accents[i]
              return (
                <article
                  key={step.title}
                  role="listitem"
                  className={`process-uv-card process-deck-tile process-deck-tile--${i + 1}`}
                  style={
                    {
                      '--pd-ink': accent.ink,
                      '--pd-soft': accent.soft,
                      '--pd-glow': `${accent.ink}4b`,
                    } as CSSProperties
                  }
                >
                  <div className="process-deck-tile-top">
                    <figure className="process-deck-tile-media">
                      <img
                        src={step.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </figure>
                    <p className="process-deck-tile-label">
                      <span className="process-deck-tile-index">{step.index}</span>
                      <span className="process-deck-tile-name">{step.title}</span>
                    </p>
                  </div>
                  <p className="process-deck-tile-title">{step.headline}</p>
                  <p className="process-deck-tile-text">{step.body}</p>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
