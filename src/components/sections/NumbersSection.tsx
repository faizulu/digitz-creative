import { useEffect, useRef } from 'react'
import { useInViewOnce } from '../../hooks/useCountUp'
import { impactMetrics, impactSection } from '../../data/content'

function formatInt(n: number) {
  return `${n.toLocaleString('en-IN')}+`
}

function formatRevenue(n: number) {
  return n >= 100 ? '1Cr+' : `${(n / 100).toFixed(1)}Cr`
}

/** Writes the number into the DOM so the count-up does not re-render the panel. */
function CountLabel({
  target,
  active,
  duration = 1400,
  format,
}: {
  target: number
  active: boolean
  duration?: number
  format: (n: number) => string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !active) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      el.textContent = format(target)
      return
    }

    const start = performance.now()
    let raf = 0
    let cancelled = false
    const tick = (now: number) => {
      if (cancelled) return
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - t) ** 3
      el.textContent = format(Math.round(target * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [active, duration, format, target])

  return <span ref={ref}>{format(0)}</span>
}

export function NumbersSection() {
  const { ref, inView } = useInViewOnce<HTMLElement>(0.2)

  return (
    <section
      ref={ref}
      id="numbers"
      aria-labelledby="numbers-heading"
      className="impact-premium impact-poster relative flex w-full items-center"
    >
      <div className="impact-lens-layout">
        <div className="impact-poster-copy gs-reveal">
          <p className="impact-poster-kicker">{impactSection.eyebrow}</p>
          <h2 id="numbers-heading" className="impact-poster-title">
            {impactSection.titleLine1}
            <span className="impact-poster-title-line">{impactSection.titleLine2}</span>
          </h2>
          <p className="impact-poster-support">{impactSection.support}</p>
          <p className="impact-poster-note">* {impactSection.note}</p>
        </div>

        <div className="impact-lens-fit">
        <div className="impact-lens gs-reveal-item">
          <div className="impact-lens-shine" aria-hidden />
          <div className="impact-lens-colors" aria-hidden>
            <span className="impact-lens-color impact-lens-color--mint" />
            <span className="impact-lens-color impact-lens-color--cyan" />
            <span className="impact-lens-color impact-lens-color--peach" />
          </div>
          <div className="impact-lens-orb" aria-hidden>
            <span className="impact-lens-shell impact-lens-shell--a" />
            <span className="impact-lens-shell impact-lens-shell--b" />
            <span className="impact-lens-sphere" />
            <span className="impact-lens-gem impact-lens-gem--a" />
            <span className="impact-lens-gem impact-lens-gem--b" />
          </div>

          <div className="impact-lens-chips">
            <article className="impact-chip impact-chip--clients">
              <span className="impact-chip-kicker">01 · {impactMetrics[0].label}</span>
              <span className="impact-chip-value">
                <CountLabel target={impactMetrics[0].target} active={inView} format={formatInt} />
              </span>
              <span className="impact-chip-label">{impactMetrics[0].description}</span>
            </article>

            <article className="impact-chip impact-chip--lead">
              <span className="impact-chip-kicker">02 · {impactMetrics[1].label}</span>
              <span className="impact-chip-value impact-chip-value--lead">
                <CountLabel
                  target={impactMetrics[1].target}
                  active={inView}
                  duration={1600}
                  format={formatInt}
                />
              </span>
              <span className="impact-chip-label">{impactMetrics[1].description}</span>
            </article>

            <article className="impact-chip impact-chip--revenue">
              <span className="impact-chip-kicker">03 · {impactMetrics[2].label}</span>
              <span className="impact-chip-value">
                <span className="impact-chip-currency">₹</span>
                <CountLabel target={100} active={inView} duration={1200} format={formatRevenue} />
              </span>
              <span className="impact-chip-label">{impactMetrics[2].description}</span>
            </article>

            <article className="impact-chip impact-chip--hours">
              <span className="impact-chip-kicker">04 · Hours</span>
              <span className="impact-chip-value">75%</span>
              <span className="impact-chip-label">Team hours saved</span>
            </article>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}
