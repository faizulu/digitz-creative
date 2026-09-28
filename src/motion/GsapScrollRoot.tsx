import { useLayoutEffect, type ReactNode } from 'react'
import gsap from 'gsap'

/**
 * Reveal for the horizontal deck.
 * Animations fire once, when a panel becomes active — transform and opacity only.
 */
export function GsapScrollRoot({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const seen = new Set<number>()

    const revealPanel = (index: number) => {
      if (seen.has(index)) return
      const main = document.getElementById('main')
      if (!main) return
      const panels = main.querySelectorAll<HTMLElement>(':scope > section, :scope > footer')
      const panel = panels[index]
      if (!panel) return
      seen.add(index)

      const reveals = panel.querySelectorAll<HTMLElement>('.gs-reveal')
      const items = panel.querySelectorAll<HTMLElement>('.gs-reveal-item')

      if (reveals.length) {
        gsap.fromTo(
          reveals,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: 'power3.out',
            overwrite: true,
          },
        )
      }
      if (items.length) {
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.045,
            ease: 'power2.out',
            overwrite: true,
            delay: 0.06,
          },
        )
      }
    }

    const t = window.setTimeout(() => {
      const deck = (window as Window & { __digitzDeck?: { index: () => number } }).__digitzDeck
      revealPanel(deck?.index() ?? 0)
    }, 80)

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
