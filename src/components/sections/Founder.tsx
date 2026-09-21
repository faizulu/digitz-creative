import { useEffect, useRef, type CSSProperties, type PointerEvent } from 'react'
import gsap from 'gsap'
import {
  ArrowDown,
  ArrowUpRight,
  Crosshair,
  Sparkle,
  Users,
} from 'lucide-react'
import { brand, founder } from '../../data/content'

const cards = [
  { text: founder.points[0], Icon: Sparkle, tint: 'cyan' },
  { text: founder.points[1], Icon: Users, tint: 'mint' },
  { text: founder.points[2], Icon: Crosshair, tint: 'violet' },
] as const

function setTilt(el: HTMLElement, e: PointerEvent<HTMLElement>, strength = 9) {
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width
  const y = (e.clientY - r.top) / r.height
  el.style.setProperty('--rx', `${((0.5 - y) * strength).toFixed(2)}deg`)
  el.style.setProperty('--ry', `${((x - 0.5) * (strength + 2)).toFixed(2)}deg`)
  el.style.setProperty('--mx', `${x * 100}%`)
  el.style.setProperty('--my', `${y * 100}%`)
}

function clearTilt(el: HTMLElement) {
  el.style.setProperty('--rx', '0deg')
  el.style.setProperty('--ry', '0deg')
}

export function Founder() {
  const rootRef = useRef<HTMLElement>(null)
  const bubbleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !rootRef.current) return

    const play = () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', overwrite: true } })
      tl.fromTo(
        '.fd-rail > *',
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.06 },
      )
        .fromTo(
          '.fd-bubble',
          { autoAlpha: 0, scale: 0.92, rotateY: 10 },
          { autoAlpha: 1, scale: 1, rotateY: 0, duration: 0.7 },
          '-=0.25',
        )
        .fromTo(
          '.fd-quote',
          { autoAlpha: 0, y: 24, x: -12 },
          { autoAlpha: 1, y: 0, x: 0, duration: 0.55 },
          '-=0.35',
        )
        .fromTo(
          '.fd-bio > *',
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.045 },
          '-=0.35',
        )
        .fromTo(
          '.fd-card',
          { autoAlpha: 0, x: 28, rotateY: -12, scale: 0.94 },
          { autoAlpha: 1, x: 0, rotateY: 0, scale: 1, duration: 0.5, stagger: 0.08 },
          '-=0.25',
        )
        .fromTo(
          '.fd-orb',
          { autoAlpha: 0, scale: 0.7 },
          { autoAlpha: 1, scale: 1, duration: 1.1, stagger: 0.12 },
          0,
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
      id="founder"
      ref={rootRef}
      className="fd-magic"
      aria-labelledby="founder-heading"
    >
      <div className="fd-shell">
        {/* Floating 3D liquid glass orbs */}
        <div className="fd-orbs" aria-hidden>
          <span className="fd-orb fd-orb--a" />
          <span className="fd-orb fd-orb--b" />
          <span className="fd-orb fd-orb--c" />
          <span className="fd-orb fd-orb--d" />
          <span className="fd-orb fd-orb--e" />
        </div>

        <div className="fd-stage">
          {/* Left rail */}
          <aside className="fd-rail">
            <div className="fd-rail-head">
              <span className="fd-rail-rule" aria-hidden />
              <p className="fd-rail-label">{founder.meetLabel}</p>
            </div>
            <p className="fd-rail-copy">{founder.meetIntro}</p>
            <a href="#why" className="fd-rail-arrow" aria-label="Continue to why Digitz">
              <ArrowDown size={16} strokeWidth={1.75} />
            </a>
          </aside>

          {/* Center — liquid glass portrait + quote */}
          <div className="fd-visual">
            <div
              ref={bubbleRef}
              className="fd-bubble"
              style={{ '--rx': '0deg', '--ry': '0deg', '--mx': '42%', '--my': '28%' } as CSSProperties}
              onPointerMove={(e) => {
                if (bubbleRef.current) setTilt(bubbleRef.current, e, 8)
              }}
              onPointerLeave={() => {
                if (bubbleRef.current) clearTilt(bubbleRef.current)
              }}
            >
              <div className="fd-bubble-glass" aria-hidden />
              <div className="fd-bubble-rim" aria-hidden />
              <div className="fd-bubble-sheen" aria-hidden />
              <img
                src={founder.image}
                alt={founder.imageAlt}
                className="fd-bubble-img"
                loading="lazy"
                decoding="async"
              />
            </div>

            <blockquote className="fd-quote">
              <span className="fd-quote-mark" aria-hidden>
                &ldquo;
              </span>
              <p>{founder.quote}</p>
              <cite className="fd-quote-sign">{founder.legal}</cite>
            </blockquote>
          </div>

          {/* Bio */}
          <div className="fd-bio">
            <span className="fd-badge">{founder.badge}</span>
            <h2 id="founder-heading" className="fd-name">
              {founder.firstName}{' '}
              <span className="fd-name-last">{founder.lastName}</span>
            </h2>
            <p className="fd-role">
              {founder.roleShort}
              <span className="fd-role-sep" aria-hidden>
                ·
              </span>
              {founder.brandLine}
            </p>
            <p className="fd-body">{founder.body}</p>
            <a
              href={brand.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group fd-cta"
            >
              Follow the practice
              <span className="fd-cta-icon" aria-hidden>
                <ArrowUpRight size={14} strokeWidth={1.75} />
              </span>
            </a>
          </div>

          {/* Right — 3 stacked liquid glass cards */}
          <ul className="fd-cards">
            {cards.map(({ text, Icon, tint }, i) => (
              <li
                key={text}
                className={`fd-card fd-card--${tint}`}
                style={
                  {
                    '--rx': '0deg',
                    '--ry': '0deg',
                    '--mx': '50%',
                    '--my': '35%',
                  } as CSSProperties
                }
                onPointerMove={(e) => setTilt(e.currentTarget, e, 10)}
                onPointerLeave={(e) => clearTilt(e.currentTarget)}
              >
                <span className="fd-card-glow" aria-hidden />
                <span className="fd-card-sheen" aria-hidden />
                <div className="fd-card-top">
                  <span className="fd-card-index">{String(i + 1).padStart(2, '0')}</span>
                  <Icon size={15} strokeWidth={1.6} className="fd-card-icon" aria-hidden />
                </div>
                <p className="fd-card-text">{text}</p>
                <span className="fd-card-go" aria-hidden>
                  <ArrowUpRight size={13} strokeWidth={1.75} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
