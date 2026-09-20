import { useLayoutEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Lenis smooth scroll + ScrollTrigger sync (gsap-scrolltrigger / performance).
 * Respects prefers-reduced-motion. Anchor clicks use Lenis.scrollTo.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.1,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    const onAnchor = (e: MouseEvent) => {
      const target = e.target
      if (!(target instanceof Element)) return
      const anchor = target.closest('a[href^="#"]')
      if (!(anchor instanceof HTMLAnchorElement)) return
      const hash = anchor.getAttribute('href')
      if (!hash || hash === '#' || hash === '#top') {
        if (hash === '#top') {
          e.preventDefault()
          lenis.scrollTo(0, { offset: 0 })
        }
        return
      }
      const el = document.querySelector(hash)
      if (!(el instanceof HTMLElement)) return
      e.preventDefault()
      lenis.scrollTo(el, { offset: -88 })
    }

    document.addEventListener('click', onAnchor)

    const lock = () => lenis.stop()
    const unlock = () => lenis.start()
    window.addEventListener('digitz:scroll-lock', lock)
    window.addEventListener('digitz:scroll-unlock', unlock)

    const refresh = () => ScrollTrigger.refresh()
    const t = window.setTimeout(refresh, 200)

    return () => {
      window.clearTimeout(t)
      document.removeEventListener('click', onAnchor)
      window.removeEventListener('digitz:scroll-lock', lock)
      window.removeEventListener('digitz:scroll-unlock', unlock)
      gsap.ticker.remove(ticker)
      lenis.destroy()
    }
  }, [])

  return children
}
