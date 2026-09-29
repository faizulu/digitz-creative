import { useEffect, useState } from 'react'

type ShaderMod = typeof import('shaders/react')

/**
 * Site-wide liquid glass field.
 * The WebGL stack is deferred until after the boot splash so first paint
 * stays on a static gradient. The live shader then renders in a smaller
 * buffer and is scaled up — soft enough that the lower resolution reads
 * as the same veil, at a fraction of the fill cost.
 */
export function GlassAgencyBackground() {
  const [mod, setMod] = useState<ShaderMod | null>(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const reducedGlass = window.matchMedia('(prefers-reduced-transparency: reduce)').matches
    if (reducedMotion || reducedGlass) return

    let cancelled = false
    let timer = 0

    const load = () => {
      timer = window.setTimeout(() => {
        if (cancelled) return
        void import('shaders/react').then((loaded) => {
          if (!cancelled) setMod(loaded)
        })
      }, 280)
    }

    if (!document.getElementById('boot-splash')) load()
    else window.addEventListener('digitz:boot-done', load, { once: true })

    return () => {
      cancelled = true
      window.removeEventListener('digitz:boot-done', load)
      window.clearTimeout(timer)
    }
  }, [])

  const Shader = mod?.Shader
  const Swirl = mod?.Swirl
  const FlutedGlass = mod?.FlutedGlass

  return (
    <div className={`site-glass-shader${mod ? ' is-live' : ''}`} aria-hidden="true">
      <div className="site-glass-shader-fallback" />
      {Shader && Swirl && FlutedGlass ? (
        <div className="site-glass-shader-stage">
          <Shader className="site-glass-shader-canvas" disableTelemetry>
            <Swirl colorA="#f8fbff" colorB="#e6f3fc" detail={0.72} />
            <FlutedGlass
              aberration={0.35}
              angle={32}
              frequency={4}
              highlight={0.16}
              highlightSoftness={0.34}
              lightAngle={-72}
              refraction={2.2}
              shape="rounded"
              softness={1}
              speed={0.05}
            />
          </Shader>
        </div>
      ) : null}
      <div className="site-liquid-veil" />
    </div>
  )
}
