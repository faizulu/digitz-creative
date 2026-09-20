import { useEffect, useMemo, useRef, useState } from 'react'

const svgModules = import.meta.glob('../../assets/handwrite/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function loadSvg(name: string): string | null {
  const entry = Object.entries(svgModules).find(([path]) => path.endsWith(`/${name}.svg`))
  return entry?.[1] ?? null
}

export type HandwriteWord = {
  label: string
  file: string
}

type HandwriteTextProps = {
  className?: string
  delay?: number
  durationMs?: number
  holdMs?: number
  words: readonly HandwriteWord[]
}

function uniquifySvgIds(markup: string, uid: string): string {
  const ids = [...markup.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1])
  let out = markup
  for (const id of ids) {
    const next = `${id}-${uid}`
    out = out.split(`id="${id}"`).join(`id="${next}"`)
    out = out.split(`url(#${id})`).join(`url(#${next})`)
  }
  return out
}

function viewBoxFor(file: string): string {
  switch (file) {
    case 'ads':
      return '0 30 640 260'
    case 'apps':
      return '0 40 700 260'
    case 'brands':
      return '0 40 780 270'
    case 'products':
      return '0 35 920 280'
    case 'websites':
      return '0 45 1050 290'
    case 'experinces':
      return '0 45 1080 290'
    case 'campaigns':
    default:
      return '0 45 1000 280'
  }
}

/**
 * Never Settle brush SVG — live stroke draw, cycles words without layout jump.
 * Falls back to plain label text if brush assets are missing (e.g. deploy without SVGs).
 */
export function HandwriteText({
  className = '',
  delay = 280,
  durationMs = 2600,
  holdMs = 1800,
  words,
}: HandwriteTextProps) {
  const hostRef = useRef<HTMLSpanElement>(null)
  const [index, setIndex] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)

  const list = useMemo(() => {
    const withSvg = words.filter((w) => Boolean(w.file && loadSvg(w.file)))
    return withSvg.length > 0 ? withSvg : [...words]
  }, [words])

  const current = list[index % Math.max(list.length, 1)]
  const hasBrush = Boolean(current?.file && loadSvg(current.file))

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (list.length <= 1 || reduceMotion) return
    const t = window.setInterval(
      () => setIndex((i) => (i + 1) % list.length),
      delay + durationMs + holdMs,
    )
    return () => window.clearInterval(t)
  }, [list.length, delay, durationMs, holdMs, reduceMotion])

  useEffect(() => {
    const host = hostRef.current
    if (!host || !current || !hasBrush) {
      if (host) host.innerHTML = ''
      return
    }

    const raw = loadSvg(current.file)
    if (!raw) return

    const uid = Math.random().toString(36).slice(2, 9)
    const markup = uniquifySvgIds(raw, uid).replace(
      /viewBox="[^"]+"/,
      `viewBox="${viewBoxFor(current.file)}"`,
    )

    host.innerHTML = markup
    const svg = host.querySelector('svg')
    const path = host.querySelector('path.path') as SVGPathElement | null
    if (!svg || !path) return

    svg.classList.add('hw-brush-svg')
    svg.removeAttribute('style')
    svg.setAttribute('aria-hidden', 'true')
    svg.setAttribute('preserveAspectRatio', 'xMinYMid meet')

    const len = path.getTotalLength()
    path.style.fill = 'none'
    path.style.strokeDasharray = `${len}`
    path.style.strokeDashoffset = reduceMotion ? '0' : `${len}`
    path.style.transition = 'none'
    host.classList.remove('is-out')
    host.classList.add('is-in')

    if (reduceMotion) return

    const draw = window.setTimeout(() => {
      path.style.transition = `stroke-dashoffset ${durationMs}ms cubic-bezier(0.33, 0, 0.2, 1)`
      path.style.strokeDashoffset = '0'
    }, delay)

    const fade = window.setTimeout(
      () => {
        host.classList.remove('is-in')
        host.classList.add('is-out')
      },
      delay + durationMs + holdMs - 280,
    )

    return () => {
      window.clearTimeout(draw)
      window.clearTimeout(fade)
      host.innerHTML = ''
      host.classList.remove('is-in', 'is-out')
    }
  }, [current, delay, durationMs, holdMs, reduceMotion, hasBrush])

  if (!current) return null

  if (!hasBrush) {
    return (
      <span className={`hw-brush hw-brush--fallback ${className}`} aria-label={current.label}>
        {current.label}
      </span>
    )
  }

  return (
    <span
      ref={hostRef}
      className={`hw-brush ${className}`}
      aria-label={current.label}
    />
  )
}
