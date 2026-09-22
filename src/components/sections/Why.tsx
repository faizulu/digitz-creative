import { useEffect, useRef, type CSSProperties, type PointerEvent } from 'react'
import gsap from 'gsap'
import { why } from '../../data/content'
import { ActionWord } from '../ui/HeroActionText'

/** Soft pastel glass fills matching the staircase reference */
const rowAccents = [
  { ink: '#3B82B8', soft: 'rgba(147, 197, 253, 0.55)', glow: 'rgba(125, 211, 252, 0.5)', wash: 'rgba(186, 230, 253, 0.72)' },
  { ink: '#4F9A3A', soft: 'rgba(190, 242, 140, 0.5)', glow: 'rgba(163, 230, 120, 0.48)', wash: 'rgba(217, 249, 157, 0.7)' },
  { ink: '#B8893A', soft: 'rgba(253, 230, 168, 0.55)', glow: 'rgba(253, 224, 140, 0.45)', wash: 'rgba(254, 243, 199, 0.78)' },
  { ink: '#C46A52', soft: 'rgba(254, 200, 170, 0.55)', glow: 'rgba(253, 186, 150, 0.48)', wash: 'rgba(254, 215, 190, 0.75)' },
  { ink: '#2E9BB0', soft: 'rgba(165, 243, 252, 0.55)', glow: 'rgba(103, 232, 249, 0.48)', wash: 'rgba(207, 250, 254, 0.72)' },
] as const

function WhyGlassRow({
  index,
  step,
  title,
  body,
  accent,
}: {
  index: string
  step: number
  title: string
  body: string
  accent: (typeof rowAccents)[number]
}) {
  const ref = useRef<HTMLLIElement>(null)

  const onMove = (e: PointerEvent<HTMLLIElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${x * 100}%`)
    el.style.setProperty('--my', `${y * 100}%`)
    el.style.setProperty('--rx', `${((0.5 - y) * 5).toFixed(2)}deg`)
    el.style.setProperty('--ry', `${((x - 0.5) * 7).toFixed(2)}deg`)
    el.style.setProperty('--lift', '1')
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--lift', '0')
    el.style.setProperty('--mx', '50%')
    el.style.setProperty('--my', '40%')
  }

  return (
    <li
      ref={ref}
      className="why-apple-row"
      style={
        {
          '--why-step': step,
          '--why-ink': accent.ink,
          '--why-soft': accent.soft,
          '--why-glow': accent.glow,
          '--why-wash': accent.wash,
        } as CSSProperties
      }
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <span className="why-apple-row-blob" aria-hidden />
      <span className="why-apple-row-sheen" aria-hidden />
      <span className="why-apple-row-index">{index}</span>
      <div className="why-apple-row-copy">
        <h3 className="why-apple-row-title">{title}</h3>
        <p className="why-apple-row-body">{body}</p>
      </div>
    </li>
  )
}

export function Why() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !rootRef.current) return

    const play = () => {
      gsap.fromTo(
        '.why-apple-row',
        { autoAlpha: 0, y: 28, x: 36 },
        {
          autoAlpha: 1,
          y: 0,
          x: 0,
          duration: 0.58,
          stagger: { each: 0.07, from: 'start' },
          ease: 'power3.out',
          overwrite: true,
          clearProps: 'transform',
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
      id="why"
      ref={rootRef}
      aria-labelledby="why-heading"
      className="why-apple relative overflow-hidden"
    >
      <div className="why-apple-glow" aria-hidden />
      <div className="why-apple-prism" aria-hidden />

      <div className="why-apple-panel">
        <header className="why-apple-head">
          <p className="why-apple-eyebrow">Why Digitz Creative</p>
          <h2 id="why-heading" className="why-apple-title">
            Five reasons owners{' '}
            <ActionWord>stay</ActionWord> with the work.
          </h2>
        </header>

        <ol className="why-apple-list">
          {why.map((item, i) => (
            <WhyGlassRow
              key={item.title}
              index={String(i + 1).padStart(2, '0')}
              step={i}
              title={item.title}
              body={item.body}
              accent={rowAccents[i]}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}
