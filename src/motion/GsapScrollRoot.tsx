import { useLayoutEffect, type ReactNode } from 'react'
import gsap from 'gsap'

/**
 * Reveal / parallax for the horizontal deck.
 * Animations fire when a panel becomes active (digitz:section-snap),
 * not via vertical ScrollTrigger (page does not scroll).
 */
export function GsapScrollRoot({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    gsap.set('.gs-reveal', { autoAlpha: 0, y: 36 })
    gsap.set('.gs-reveal-item', { autoAlpha: 0, y: 22 })

    const revealPanel = (index: number) => {
      const main = document.getElementById('main')
      if (!main) return
      const panels = main.querySelectorAll<HTMLElement>(':scope > section, :scope > footer')
      const panel = panels[index]
      if (!panel) return

      const reveals = panel.querySelectorAll<HTMLElement>('.gs-reveal')
      const items = panel.querySelectorAll<HTMLElement>('.gs-reveal-item')

      if (reveals.length) {
        gsap.to(reveals, {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: 'power3.out',
          overwrite: true,
        })
      }
      if (items.length) {
        gsap.to(items, {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.05,
          ease: 'power2.out',
          overwrite: true,
          delay: 0.08,
        })
      }
    }

    // First panel on load
    const t = window.setTimeout(() => revealPanel(0), 120)

    const onSnap = (e: Event) => {
      const index = (e as CustomEvent<{ index: number }>).detail?.index
      if (typeof index === 'number') revealPanel(index)
    }
    window.addEventListener('digitz:section-snap', onSnap)

    return () => {
      window.clearTimeout(t)
      window.removeEventListener('digitz:section-snap', onSnap)
    }
  }, [])

  return children
}
