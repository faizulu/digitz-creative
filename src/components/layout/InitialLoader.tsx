import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

const STORAGE_KEY = 'digitz-boot-seen'
const MIN_MS = 900
const MAX_MS = 3200

function hasSeenBoot(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function markBootSeen(): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1')
  } catch {
    /* private mode / blocked storage */
  }
}

function getSplashEl(): HTMLElement | null {
  return document.getElementById('boot-splash')
}

function removeSplash(): void {
  getSplashEl()?.remove()
  document.documentElement.classList.remove('is-booting')
}

async function waitForBootReady(startedAt: number): Promise<void> {
  const fonts =
    'fonts' in document
      ? document.fonts.ready.catch(() => undefined)
      : Promise.resolve()

  const paint = new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve())
    })
  })

  const minHold = new Promise<void>((resolve) => {
    const left = Math.max(0, MIN_MS - (performance.now() - startedAt))
    window.setTimeout(resolve, left)
  })

  const maxHold = new Promise<void>((resolve) => {
    window.setTimeout(resolve, MAX_MS)
  })

  await Promise.race([Promise.all([fonts, paint, minHold]), maxHold])
}

function BootMark() {
  return (
    <svg
      viewBox="0 0 120 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="boot-splash__mark"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bootRocket" x1="70" y1="8" x2="20" y2="110" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F5C242" />
          <stop offset="0.3" stopColor="#7CDE4A" />
          <stop offset="0.72" stopColor="#00C2F0" />
          <stop offset="1" stopColor="#1A86E0" />
        </linearGradient>
        <linearGradient id="bootTrail" x1="62" y1="70" x2="8" y2="145" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00C2F0" />
          <stop offset="0.6" stopColor="#F5A623" />
          <stop offset="1" stopColor="#F5C242" />
        </linearGradient>
      </defs>
      <path
        d="M62 78c-22 18-40 38-46 58"
        stroke="url(#bootTrail)"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <rect x="14" y="102" width="9" height="9" rx="1.5" fill="#F5C242" />
      <rect x="28" y="114" width="7" height="7" rx="1.2" fill="#F59E0B" />
      <rect x="8" y="120" width="7" height="7" rx="1.2" fill="#38BDF8" />
      <rect x="38" y="128" width="6" height="6" rx="1" fill="#84CC16" />
      <rect x="20" y="134" width="5" height="5" rx="1" fill="#00C2F0" />
      <g transform="translate(78 62) rotate(-38)">
        <path
          d="M0-42c14 20 17 40 8 64L0 32  -8 20C-17-2-14-22 0-42z"
          fill="url(#bootRocket)"
        />
        <circle cy="-8" r="6.5" fill="#0B1A2E" />
        <path d="M-8 24l-18 15 16-6.5z" fill="#1A9FE0" />
        <path d="M8 24l18 15-16-6.5z" fill="#7CDE4A" />
      </g>
    </svg>
  )
}

function SplashContents() {
  return (
    <>
      <div className="boot-splash__glow" aria-hidden="true" />
      <div className="boot-splash__inner">
        <BootMark />
        <p className="boot-splash__brand">
          Digitz <span>Creative</span>
        </p>
        <div className="boot-splash__bar" aria-hidden="true">
          <span />
        </div>
      </div>
    </>
  )
}

type InitialLoaderProps = {
  children: ReactNode
}

/** One-time session boot cover — hides first-paint lag from fonts / GSAP / WebGL. */
export function InitialLoader({ children }: InitialLoaderProps) {
  const [active, setActive] = useState(() => !hasSeenBoot())
  const [needsPortal, setNeedsPortal] = useState(false)

  useEffect(() => {
    if (!active) {
      removeSplash()
      return
    }

    const existing = getSplashEl()
    if (!existing) {
      setNeedsPortal(true)
    }

    let cancelled = false
    const startedAt = performance.now()

    ;(async () => {
      await waitForBootReady(startedAt)
      if (cancelled) return

      const el = getSplashEl()
      el?.classList.add('is-exit')
      window.setTimeout(() => {
        if (cancelled) return
        markBootSeen()
        removeSplash()
        setActive(false)
        setNeedsPortal(false)
      }, 520)
    })()

    return () => {
      cancelled = true
    }
  }, [active])

  return (
    <>
      {children}
      {active &&
        needsPortal &&
        createPortal(
          <div
            id="boot-splash"
            className="boot-splash"
            role="status"
            aria-live="polite"
            aria-busy="true"
            aria-label="Loading Digitz Creative"
          >
            <SplashContents />
          </div>,
          document.body,
        )}
    </>
  )
}
