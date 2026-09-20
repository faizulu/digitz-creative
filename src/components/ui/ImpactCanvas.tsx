import { useEffect, useRef } from 'react'

export type DropMood = {
  /** Ambient / slick primary */
  a: string
  /** Mid iridescence */
  b: string
  /** Accent rim */
  c: string
  /** Morph intensity 0–1 */
  morph: number
}

const DEFAULT_MOOD: DropMood = {
  a: 'rgba(168, 140, 200, 0.38)',
  b: 'rgba(140, 190, 165, 0.42)',
  c: 'rgba(155, 175, 210, 0.35)',
  morph: 0.7,
}

type ImpactCanvasProps = {
  active?: boolean
  className?: string
  /** Clears to transparent so parent bg shows */
  transparent?: boolean
  mood?: DropMood
}

/** Morphing pearlescent metallic drop — canvas 2D. */
export function ImpactCanvas({
  active = true,
  className = '',
  transparent = false,
  mood = DEFAULT_MOOD,
}: ImpactCanvasProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 })
  const moodRef = useRef(mood)
  const moodSmooth = useRef({ ...mood })

  moodRef.current = mood

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let w = 0
    let h = 0
    let dpr = 1
    let t = 0

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = wrap.clientWidth
      h = wrap.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect()
      mouse.current.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      mouse.current.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    }

    const lerp = (a: number, b: number, k: number) => a + (b - a) * k

    const blobPoint = (
      i: number,
      n: number,
      time: number,
      baseR: number,
      morphAmt: number,
    ) => {
      const a = (i / n) * Math.PI * 2
      const morph =
        (Math.sin(a * 2 + time * 0.9) * 0.07 +
          Math.cos(a * 3 - time * 1.1) * 0.055 +
          Math.sin(a * 5 + time * 0.55) * 0.03) *
        morphAmt
      const tear =
        Math.pow(Math.max(0, Math.cos(a - Math.PI * 0.15)), 2.4) * 0.12 * morphAmt
      const r = baseR * (1 + morph + tear)
      return {
        x: Math.cos(a) * r,
        y: Math.sin(a) * r * 1.08 - tear * baseR * 0.35,
      }
    }

    const drawBlobPath = (
      cx: number,
      cy: number,
      baseR: number,
      time: number,
      morphAmt: number,
      n = 64,
    ) => {
      ctx.beginPath()
      for (let i = 0; i <= n; i++) {
        const p = blobPoint(i % n, n, time, baseR, morphAmt)
        const x = cx + p.x
        const y = cy + p.y
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()
    }

    const draw = () => {
      if (active && !reduced) t += 0.016
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.05
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.05

      // Smooth mood toward target
      const target = moodRef.current
      moodSmooth.current.morph = lerp(moodSmooth.current.morph, target.morph, 0.06)
      // Swap color strings when close enough via opacity blend — keep latest strings
      moodSmooth.current.a = target.a
      moodSmooth.current.b = target.b
      moodSmooth.current.c = target.c
      const m = moodSmooth.current

      ctx.clearRect(0, 0, w, h)

      if (!transparent) {
        ctx.fillStyle = '#f5f2ec'
        ctx.fillRect(0, 0, w, h)
      }

      const cx = w * 0.5 + mouse.current.x * 22
      const cy = h * 0.48 + mouse.current.y * 16
      const baseR = Math.min(w, h) * 0.28

      // Soft contact shadow
      ctx.save()
      ctx.translate(cx, cy + baseR * 1.15)
      ctx.scale(1.35, 0.28)
      const shadow = ctx.createRadialGradient(0, 0, 0, 0, 0, baseR)
      shadow.addColorStop(0, 'rgba(40, 35, 30, 0.14)')
      shadow.addColorStop(0.55, 'rgba(40, 35, 30, 0.05)')
      shadow.addColorStop(1, 'rgba(40, 35, 30, 0)')
      ctx.fillStyle = shadow
      ctx.beginPath()
      ctx.arc(0, 0, baseR, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      const amb = ctx.createRadialGradient(cx, cy, baseR * 0.2, cx, cy, baseR * 1.6)
      amb.addColorStop(0, m.a.replace(/[\d.]+\)$/, '0.16)'))
      amb.addColorStop(0.45, m.b.replace(/[\d.]+\)$/, '0.1)'))
      amb.addColorStop(1, 'rgba(245, 242, 236, 0)')
      ctx.fillStyle = amb
      ctx.fillRect(0, 0, w, h)

      ctx.save()
      drawBlobPath(cx, cy, baseR, t, m.morph)
      ctx.clip()

      const body = ctx.createRadialGradient(
        cx - baseR * 0.35,
        cy - baseR * 0.4,
        baseR * 0.05,
        cx,
        cy + baseR * 0.1,
        baseR * 1.15,
      )
      body.addColorStop(0, '#f7f3ea')
      body.addColorStop(0.22, '#e8dff0')
      body.addColorStop(0.45, '#c9dccf')
      body.addColorStop(0.68, '#b8a8d0')
      body.addColorStop(0.88, '#d4e0d6')
      body.addColorStop(1, '#ebe4d8')
      ctx.fillStyle = body
      ctx.fillRect(cx - baseR * 1.4, cy - baseR * 1.4, baseR * 2.8, baseR * 2.8)

      const slickAngle = t * 0.35 + mouse.current.x * 0.4
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(slickAngle * 0.15)
      const slick = ctx.createLinearGradient(-baseR, -baseR * 0.2, baseR, baseR * 0.6)
      slick.addColorStop(0, 'rgba(168, 140, 200, 0)')
      slick.addColorStop(0.25, m.a)
      slick.addColorStop(0.4, m.b)
      slick.addColorStop(0.55, 'rgba(240, 230, 210, 0.45)')
      slick.addColorStop(0.7, m.c)
      slick.addColorStop(1, 'rgba(200, 170, 150, 0)')
      ctx.globalCompositeOperation = 'soft-light'
      ctx.fillStyle = slick
      ctx.fillRect(-baseR * 1.5, -baseR * 1.5, baseR * 3, baseR * 3)
      ctx.restore()

      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(-slickAngle * 0.22 + 0.8)
      const sheen = ctx.createLinearGradient(-baseR, 0, baseR, 0)
      sheen.addColorStop(0, 'rgba(255,255,255,0)')
      sheen.addColorStop(0.45, 'rgba(255,255,255,0.08)')
      sheen.addColorStop(0.5, 'rgba(255,255,255,0.55)')
      sheen.addColorStop(0.55, 'rgba(255,255,255,0.08)')
      sheen.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.globalCompositeOperation = 'overlay'
      ctx.fillStyle = sheen
      ctx.fillRect(-baseR * 1.4, -baseR * 1.4, baseR * 2.8, baseR * 2.8)
      ctx.restore()

      const keyX = cx - baseR * 0.45 + mouse.current.x * 12
      const keyY = cy - baseR * 0.5 + mouse.current.y * 10
      const key = ctx.createRadialGradient(keyX, keyY, 0, keyX, keyY, baseR * 0.85)
      key.addColorStop(0, 'rgba(255, 248, 235, 0.85)')
      key.addColorStop(0.35, 'rgba(255, 240, 220, 0.28)')
      key.addColorStop(1, 'rgba(255, 240, 220, 0)')
      ctx.globalCompositeOperation = 'screen'
      ctx.fillStyle = key
      ctx.beginPath()
      ctx.arc(keyX, keyY, baseR * 0.85, 0, Math.PI * 2)
      ctx.fill()

      const specX = cx - baseR * 0.32 + mouse.current.x * 18
      const specY = cy - baseR * 0.38 + mouse.current.y * 14
      const spec = ctx.createRadialGradient(specX, specY, 0, specX, specY, baseR * 0.28)
      spec.addColorStop(0, 'rgba(255, 255, 255, 0.95)')
      spec.addColorStop(0.35, 'rgba(255, 255, 255, 0.35)')
      spec.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = spec
      ctx.beginPath()
      ctx.arc(specX, specY, baseR * 0.28, 0, Math.PI * 2)
      ctx.fill()

      const rim = ctx.createRadialGradient(
        cx + baseR * 0.55,
        cy + baseR * 0.2,
        0,
        cx + baseR * 0.55,
        cy + baseR * 0.2,
        baseR * 0.7,
      )
      rim.addColorStop(0, m.c)
      rim.addColorStop(1, 'rgba(210, 230, 220, 0)')
      ctx.globalCompositeOperation = 'soft-light'
      ctx.fillStyle = rim
      ctx.beginPath()
      ctx.arc(cx + baseR * 0.55, cy + baseR * 0.2, baseR * 0.7, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
      ctx.globalCompositeOperation = 'source-over'

      ctx.save()
      drawBlobPath(cx, cy, baseR, t, m.morph)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)'
      ctx.lineWidth = 1.25
      ctx.stroke()
      ctx.restore()

      raf = requestAnimationFrame(draw)
    }

    resize()
    wrap.addEventListener('pointermove', onMove)
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      wrap.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', resize)
    }
  }, [active, transparent])

  return (
    <div ref={wrapRef} className={`impact-canvas ${className}`}>
      <canvas ref={canvasRef} aria-hidden />
    </div>
  )
}
