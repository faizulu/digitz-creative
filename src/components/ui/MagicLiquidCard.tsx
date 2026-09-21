import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from 'react'
import { Shader, LiquidMetal, FlutedGlass, MeshGradient } from 'shaders/react'

type MagicTone = 'warm' | 'cool' | 'prism'

type MagicLiquidCardProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** Mount the WebGPU liquid layer (usually when section is in view) */
  active?: boolean
  /**
   * warm = Impact lilac / peach liquid
   * cool = soft cyan / mint
   * prism = Services 3D crystal / metal glass (distinct from Impact)
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
    swirl: 0.36,
    turbulence: 0.52,
    ripple: 2.4,
    warp: 0.72,
    sharpness: 0.24,
    fluteAngle: 34,
    fluteFreq: 6,
    refraction: 4,
    metalOpacity: 0.28,
  },
  cool: {
    meshA: '#e8f4fc',
    meshB: '#dff5e8',
    metalLight: '#f0f9ff',
    metalDark: '#3d7a9a',
    seed: 27,
    swirl: 0.36,
    turbulence: 0.52,
    ripple: 2.4,
    warp: 0.72,
    sharpness: 0.24,
    fluteAngle: 34,
    fluteFreq: 6,
    refraction: 4,
    metalOpacity: 0.28,
  },
  /** Sharper crystalline metal — emerald / cobalt facets */
  prism: {
    meshA: '#d8f5ef',
    meshB: '#c5e4ff',
    metalLight: '#e8fff8',
    metalDark: '#1a6b7a',
    seed: 41,
    swirl: 0.18,
    turbulence: 0.78,
    ripple: 3.6,
    warp: 0.95,
    sharpness: 0.52,
    fluteAngle: 78,
    fluteFreq: 11,
    refraction: 6.2,
    metalOpacity: 0.42,
  },
} as const

/**
 * Section-scale liquid / prism magic card.
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
  const isPrism = tone === 'prism'

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const reducedGlass = window.matchMedia('(prefers-reduced-transparency: reduce)').matches
    setShaderOn(active && !reducedMotion && !reducedGlass)
  }, [active])

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width))
    const y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height))
    el.style.setProperty('--mx', `${x * 100}%`)
    el.style.setProperty('--my', `${y * 100}%`)
    el.style.setProperty('--gloss', isPrism ? '0.72' : '0.55')
    if (isPrism) {
      el.style.setProperty('--rx', `${(0.5 - y) * 4.5}deg`)
      el.style.setProperty('--ry', `${(x - 0.5) * 6}deg`)
    }
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--mx', '48%')
    el.style.setProperty('--my', '36%')
    el.style.setProperty('--gloss', isPrism ? '0.42' : '0.34')
    if (isPrism) {
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
    }
  }

  return (
    <div
      ref={ref}
      className={`magic-liquid-card magic-liquid-card--${tone} ${className}`}
      style={style}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {isPrism ? (
        <div className="magic-prism-stack" aria-hidden>
          <span className="magic-prism-plane magic-prism-plane--back" />
          <span className="magic-prism-plane magic-prism-plane--mid" />
          <span className="magic-prism-plane magic-prism-plane--front" />
          <span className="magic-prism-facet magic-prism-facet--tl" />
          <span className="magic-prism-facet magic-prism-facet--br" />
        </div>
      ) : null}

      {shaderOn ? (
        <div className="magic-liquid-card-shader" aria-hidden>
          <Shader className="magic-liquid-card-canvas">
            <MeshGradient
              colorA={t.meshA}
              colorB={t.meshB}
              count={isPrism ? 7 : 5}
              smoothness={isPrism ? 1.6 : 2.4}
              swirl={t.swirl}
              drift={isPrism ? 0.22 : 0.4}
              speed={isPrism ? 0.08 : 0.12}
              seed={t.seed}
            />
            <LiquidMetal
              lightColor={t.metalLight}
              darkColor={t.metalDark}
              turbulence={t.turbulence}
              ripple={t.ripple}
              warp={t.warp}
              sharpness={t.sharpness}
              environment={isPrism ? 1.15 : 0.95}
              dispersion={isPrism ? 0.48 : 0.32}
              opacity={t.metalOpacity}
              speed={isPrism ? 0.08 : 0.12}
            />
            <FlutedGlass
              aberration={isPrism ? 0.72 : 0.55}
              angle={t.fluteAngle}
              frequency={t.fluteFreq}
              highlight={isPrism ? 0.38 : 0.24}
              highlightSoftness={isPrism ? 0.22 : 0.36}
              lightAngle={isPrism ? -72 : -58}
              refraction={t.refraction}
              shape="rounded"
              softness={isPrism ? 0.55 : 1}
              speed={isPrism ? 0.06 : 0.09}
            />
          </Shader>
        </div>
      ) : null}

      <div className="magic-liquid-card-frost" aria-hidden />
      <div className="magic-liquid-card-sheen" aria-hidden />
      <div className="magic-liquid-card-content">{children}</div>
    </div>
  )
}
