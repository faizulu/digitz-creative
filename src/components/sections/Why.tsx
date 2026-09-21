import { useEffect, useRef, type CSSProperties, type PointerEvent } from 'react'
import gsap from 'gsap'
import { why } from '../../data/content'

const rowAccents = [
  { ink: '#1578b8', soft: 'rgba(21, 120, 184, 0.22)', glow: 'rgba(86, 194, 252, 0.45)' },
  { ink: '#58b832', soft: 'rgba(88, 184, 50, 0.2)', glow: 'rgba(143, 208, 100, 0.42)' },
  { ink: '#D4893A', soft: 'rgba(212, 137, 58, 0.22)', glow: 'rgba(255, 186, 100, 0.4)' },
  { ink: '#C45C4A', soft: 'rgba(196, 92, 74, 0.2)', glow: 'rgba(240, 140, 120, 0.4)' },
  { ink: '#2E8BB8', soft: 'rgba(46, 139, 184, 0.22)', glow: 'rgba(100, 180, 230, 0.42)' },
] as const

function WhyGlassRow({
  index,
  title,
  body,
  accent,
}: {
  index: string
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
    el.style.setProperty('--rx', `${((0.5 - y) * 7).toFixed(2)}deg`)
    el.style.setProperty('--ry', `${((x - 0.5) * 9).toFixed(2)}deg`)
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
          '--why-ink': accent.ink,
          '--why-soft': accent.soft,
          '--why-glow': accent.glow,
        } as CSSProperties
      }
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <span className="why-apple-row-blob" aria-hidden />
      <span className="why-apple-row-sheen" aria-hidden />
      <span className="why-apple-row-index">{index}</span>
      <h3 className="why-apple-row-title">{title}</h3>
      <p className="why-apple-row-body">{body}</p>
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
        { autoAlpha: 0, y: 22, rotateX: 8 },
        {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          duration: 0.55,
          stagger: { each: 0.06, from: 'start' },
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
      id="why"
      ref={rootRef}
      aria-labelledby="why-heading"
      className="why-apple relative overflow-hidden"
    >
      <div className="why-apple-glow" aria-hidden />

      <div className="why-apple-panel">
        <header className="why-apple-head">
          <p className="why-apple-eyebrow">Why Digitz Creative</p>
          <h2 id="why-heading" className="why-apple-title">
            Five reasons owners{' '}
            <em className="why-apple-title-em">stay with the work.</em>
          </h2>
        </header>

        <ol className="why-apple-list">
          {why.map((item, i) => (
            <WhyGlassRow
              key={item.title}
              index={String(i + 1).padStart(2, '0')}
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
