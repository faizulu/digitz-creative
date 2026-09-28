import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from 'react'
import { Shader, FlutedGlass, MeshGradient } from 'shaders/react'

type MagicTone = 'warm' | 'cool'

type MagicLiquidCardProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** Mount the WebGPU liquid layer (usually when section is in view) */
  active?: boolean
  /**
   * warm = Impact lilac / peach liquid
   * cool = soft cyan / mint
   */
  tone?: MagicTone
}

const tones = {
  warm: {
    meshA: '#f2e8fb',
    meshB: '#fad8d0',
    metalLight: '#faf4ff',
    metalDark: '#9b7eb8',
    seed: 11,
  },
  cool: {
    meshA: '#e8f4fc',
    meshB: '#dff5e8',
    metalLight: '#f0f9ff',
    metalDark: '#3d7a9a',
    seed: 27,
  },
} as const

/**
 * Section-scale liquid magic card.
 * Web approximation of liquid glass — not Apple's platform material.
 */
export function MagicLiquidCard({
  children,
  className = '',
  style,
  active = true,
  tone = 'warm',
}: MagicLiquidCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [shaderOn, setShaderOn] = useState(false)
  const t = tones[tone]

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const reducedGlass = window.matchMedia('(prefers-reduced-transparency: reduce)').matches
    if (!active || reducedMotion || reducedGlass) {
      setShaderOn(false)
      return
    }
    const timer = window.setTimeout(() => setShaderOn(true), 520)
    return () => window.clearTimeout(timer)
  }, [active])

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
      {shaderOn ? (
        <div className="magic-liquid-card-shader" aria-hidden>
          <div className="magic-liquid-card-stage">
            <Shader className="magic-liquid-card-canvas" disableTelemetry>
              <MeshGradient
                colorA={t.meshA}
                colorB={t.meshB}
                count={3}
                smoothness={2.2}
                swirl={0.28}
                drift={0.28}
                speed={0.08}
                seed={t.seed}
              />
              <FlutedGlass
                aberration={0.4}
                angle={34}
                frequency={5}
                highlight={0.2}
                highlightSoftness={0.36}
                lightAngle={-58}
                refraction={3}
                shape="rounded"
                softness={1}
                speed={0.07}
              />
            </Shader>
          </div>
        </div>
      ) : null}

      <div className="magic-liquid-card-frost" aria-hidden />
      <div className="magic-liquid-card-sheen" aria-hidden />
      <div className="magic-liquid-card-content">{children}</div>
    </div>
  )
}
