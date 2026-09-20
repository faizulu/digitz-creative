import { useLayoutEffect, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Site-wide ScrollTrigger setup (gsap-scrolltrigger + gsap-performance):
 * - batch reveals via transform + autoAlpha only
 * - scrub parallax on .gs-parallax (y only, ease none)
 * - matchMedia prefers-reduced-motion
 * - refresh after load; full cleanup on unmount
 */
export function GsapScrollRoot({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set('.gs-reveal, .gs-reveal-item', {
        clearProps: 'all',
      })
    })

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set('.gs-reveal', { autoAlpha: 0, y: 48 })
      gsap.set('.gs-reveal-item', { autoAlpha: 0, y: 28 })

      ScrollTrigger.batch('.gs-reveal', {
        start: 'top 88%',
        once: true,
        interval: 0.12,
        batchMax: 5,
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power3.out',
            overwrite: true,
            clearProps: 'transform',
          })
        },
      })

      ScrollTrigger.batch('.gs-reveal-item', {
        start: 'top 92%',
        once: true,
        interval: 0.1,
        batchMax: 8,
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: 'power2.out',
            overwrite: true,
            clearProps: 'transform',
          })
        },
      })

      gsap.utils.toArray<HTMLElement>('.gs-parallax').forEach((el) => {
        const amount = Number(el.dataset.parallax ?? -48)
        gsap.fromTo(
          el,
          { y: -amount * 0.35 },
          {
            y: amount,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: el.closest('section') ?? el.parentElement ?? el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          },
        )
      })

      gsap.utils.toArray<HTMLElement>('.gs-scrub-fade').forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0.35, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              end: 'top 55%',
              scrub: 0.8,
            },
          },
        )
      })
    })

    const refresh = () => ScrollTrigger.refresh()
    const onLoad = () => refresh()
    window.addEventListener('load', onLoad)

    // Fonts / late layout — single deferred refresh (not every resize)
    const t = window.setTimeout(refresh, 400)

    return () => {
      window.clearTimeout(t)
      window.removeEventListener('load', onLoad)
      mm.revert()
    }
  }, [])

  return children
}
