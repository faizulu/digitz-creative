import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from 'react'

type MagicTone = 'warm' | 'cool'

type MagicLiquidCardProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /**
   * warm = Impact lilac / peach liquid
   * cool = soft cyan / mint
   */
  tone?: MagicTone
}

/**
 * Section-scale liquid card.
 * Frost and sheen only — a second live shader here stacked on the site
 * field and stalled the deck for seconds.
 */
export function MagicLiquidCard({
  children,
  className = '',
  style,
  tone = 'warm',
}: MagicLiquidCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width))
    const y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height))
    el.style.setProperty('--mx', `${x * 100}%`)
    el.style.setProperty('--my', `${y * 100}%`)
    el.style.setProperty('--gloss', '0.55')
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--mx', '48%')
    el.style.setProperty('--my', '36%')
    el.style.setProperty('--gloss', '0.34')
  }

  return (
    <div
      ref={ref}
      className={`magic-liquid-card magic-liquid-card--${tone} ${className}`}
      style={style}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div className="magic-liquid-card-frost" aria-hidden />
      <div className="magic-liquid-card-sheen" aria-hidden />
      <div className="magic-liquid-card-content">{children}</div>
    </div>
  )
}
