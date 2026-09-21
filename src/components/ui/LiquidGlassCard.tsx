import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from 'react'
import { createPortal } from 'react-dom'
import LiquidGlass, { type LiquidGlassParams } from 'liquid-glass-js'

type GlassDom = LiquidGlass & {
  glassEl: HTMLElement
  lensEl: HTMLElement
}

type LiquidGlassCardProps = {
  backgroundRef: RefObject<HTMLElement | null>
  children: ReactNode
  className?: string
  faceClassName?: string
  style?: CSSProperties
  tintColor?: string
  tint?: number
  radius?: number
  params?: Partial<LiquidGlassParams>
  enabled?: boolean
}

/**
 * liquid-glass-js lens synced to a layout slot.
 * Web approximation of Apple Liquid Glass (clone-mode refraction).
 */
export function LiquidGlassCard({
  backgroundRef,
  children,
  className = '',
  faceClassName = '',
  style,
  tintColor = '#ffffff',
  tint = 0.28,
  radius = 28,
  params,
  enabled = true,
}: LiquidGlassCardProps) {
  const slotRef = useRef<HTMLDivElement>(null)
  const glassRef = useRef<GlassDom | null>(null)
  const paramsRef = useRef(params)
  paramsRef.current = params
  const [face, setFace] = useState<HTMLElement | null>(null)
  const [useFallback, setUseFallback] = useState(!enabled)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const reducedGlass = window.matchMedia('(prefers-reduced-transparency: reduce)').matches
    if (!enabled || reducedMotion || reducedGlass) {
      setUseFallback(true)
      setFace(null)
      return
    }

    const slot = slotRef.current
    const bg = backgroundRef.current
    if (!slot || !bg) {
      setUseFallback(true)
      return
    }

    let cancelled = false
    let loopRaf = 0
    let tracking = false
    let glass: GlassDom | null = null
    let io: IntersectionObserver | null = null
    let refreshTimer = 0

    const sync = () => {
      const g = glassRef.current
      const el = slotRef.current
      if (!g || !el) return
      const r = el.getBoundingClientRect()
      const w = Math.max(48, Math.round(r.width))
      const h = Math.max(48, Math.round(r.height))
      const onScreen =
        r.bottom > -24 &&
        r.top < window.innerHeight + 24 &&
        r.right > -24 &&
        r.left < window.innerWidth + 24

      g.glassEl.style.visibility = onScreen ? 'visible' : 'hidden'
      g.lensEl.style.visibility = onScreen ? 'visible' : 'hidden'
      if (!onScreen) return

      const cur = g.get()
      if (cur.width !== w || cur.height !== h) g.set({ width: w, height: h })
      g.moveTo(r.left, r.top)
    }

    const loop = () => {
      if (!tracking || cancelled) return
      sync()
      loopRaf = requestAnimationFrame(loop)
    }

    const onSnap = () => {
      sync()
      glass?.refresh()
    }

    const bootTimer = window.setTimeout(() => {
      if (cancelled) return
      const el = slotRef.current
      const scene = backgroundRef.current
      if (!el || !scene) {
        setUseFallback(true)
        return
      }

      const rect = el.getBoundingClientRect()
      if (rect.width < 40 || rect.height < 40) {
        setUseFallback(true)
        return
      }

      setUseFallback(false)
      glass = new LiquidGlass({
        background: scene,
        draggable: false,
        zIndex: 16,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        radius,
        scale: 36,
        depth: 30,
        curvature: 2.8,
        convexity: 1,
        chroma: 0.08,
        blur: 2,
        glow: 0.14,
        edge: 0.55,
        specAngle: 130,
        tint,
        tintColor,
        x: rect.left,
        y: rect.top,
        ...paramsRef.current,
      }) as GlassDom

      const host = document.createElement('div')
      host.className = `gallery-lg-face ${faceClassName}`.trim()
      glass.glassEl.appendChild(host)
      glass.glassEl.style.borderRadius = `${radius}px`
      glass.glassEl.style.overflow = 'hidden'
      glassRef.current = glass
      setFace(host)

      io = new IntersectionObserver(
        ([entry]) => {
          tracking = entry.isIntersecting
          if (tracking) {
            cancelAnimationFrame(loopRaf)
            loopRaf = requestAnimationFrame(loop)
            glass?.refresh()
          } else {
            cancelAnimationFrame(loopRaf)
            if (glass) {
              glass.glassEl.style.visibility = 'hidden'
              glass.lensEl.style.visibility = 'hidden'
            }
          }
        },
        { threshold: 0.02 },
      )
      io.observe(el)

      window.addEventListener('digitz:section-snap', onSnap)
      window.addEventListener('resize', sync)
      refreshTimer = window.setTimeout(() => glass?.refresh(), 200)
    }, 40)

    return () => {
      cancelled = false
      cancelled = true
      tracking = false
      window.clearTimeout(bootTimer)
      window.clearTimeout(refreshTimer)
      cancelAnimationFrame(loopRaf)
      io?.disconnect()
      window.removeEventListener('digitz:section-snap', onSnap)
      window.removeEventListener('resize', sync)
      setFace(null)
      glass?.destroy()
      glassRef.current = null
    }
  }, [backgroundRef, enabled, faceClassName, radius, tint, tintColor])

  return (
    <div ref={slotRef} className={`gallery-lg-slot ${className}`} style={style}>
      {useFallback ? (
        <div className={`gallery-lg-fallback ${faceClassName}`.trim()}>{children}</div>
      ) : face ? (
        createPortal(children, face)
      ) : (
        <div className={`gallery-lg-fallback gallery-lg-fallback--loading ${faceClassName}`.trim()}>
          {children}
        </div>
      )}
    </div>
  )
}
