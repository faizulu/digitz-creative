import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from 'react'
import { Shader, LiquidMetal, FlutedGlass, MeshGradient } from 'shaders/react'

type MagicTone = 'warm' | 'cool'

type MagicLiquidCardProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** Mount the WebGPU liquid layer (usually when section is in view) */
  active?: boolean
  /** warm = Impact amber/violet; cool = Digitz cyan/lime */
  tone?: MagicTone
}

const tones = {
  warm: {
    meshA: '#f3ebe3',
    meshB: '#e4d8ef',
    metalLight: '#f6f0ea',
    metalDark: '#9a7a68',
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
 * Section-scale liquid magic card (molten + fluted refraction).
 * Web approximation of liquid glass — not Apple's platform material.
 * Pointer sheen tracks the cursor; content is unchanged.
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
          <Shader className="magic-liquid-card-canvas">
            <MeshGradient
              colorA={t.meshA}
              colorB={t.meshB}
              count={5}
              smoothness={2.4}
              swirl={0.36}
              drift={0.4}
              speed={0.12}
              seed={t.seed}
            />
            <LiquidMetal
              lightColor={t.metalLight}
              darkColor={t.metalDark}
              turbulence={0.52}
              ripple={2.4}
              warp={0.72}
              sharpness={0.24}
              environment={0.95}
              dispersion={0.32}
              opacity={0.28}
              speed={0.12}
            />
            <FlutedGlass
              aberration={0.55}
              angle={34}
              frequency={6}
              highlight={0.24}
              highlightSoftness={0.36}
              lightAngle={-58}
              refraction={4}
              shape="rounded"
              softness={1}
              speed={0.09}
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
