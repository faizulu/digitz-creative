import { useLayoutEffect, type ReactNode } from 'react'
import gsap from 'gsap'

type DigitzDeck = {
  goTo: (index: number) => void
  next: () => void
  prev: () => void
  index: () => number
  count: () => number
}

/**
 * Horizontal full-page deck: swipe / wheel / keys move left-right.
 * No vertical page scroll. One panel = 100vw x 100dvh.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = document.documentElement
    const body = document.body
    const main = document.getElementById('main')
    if (!main) return

    root.classList.add('is-hdeck')
    body.classList.add('is-hdeck')

    const panels = () =>
      Array.from(main.querySelectorAll<HTMLElement>(':scope > section, :scope > footer'))

    let index = 0
    let locked = false
    let animating = false
    let touchX = 0
    let touchY = 0
    let wheelAcc = 0
    let wheelTimer = 0

    const clamp = (i: number) => Math.max(0, Math.min(i, panels().length - 1))

    const emit = (i: number) => {
      window.dispatchEvent(
        new CustomEvent('digitz:section-snap', { detail: { index: i } }),
      )
      const id = panels()[i]?.id
      if (id && window.location.hash !== `#${id}`) {
        history.replaceState(null, '', `#${id}`)
      }
    }

    const apply = (i: number, instant = false) => {
      index = clamp(i)
      const duration = reduced || instant ? 0 : 0.78
      animating = duration > 0
      gsap.to(main, {
        x: () => -index * window.innerWidth,
        duration,
        ease: 'power3.out',
        overwrite: true,
        onComplete: () => {
          animating = false
          emit(index)
        },
      })
      if (duration === 0) emit(index)
    }

    const goTo = (i: number, instant = false) => {
      if (locked) return
      apply(i, instant)
    }

    const next = () => goTo(index + 1)
    const prev = () => goTo(index - 1)

    // Initial position from hash
    const hash = window.location.hash.replace('#', '')
    const hashIdx = panels().findIndex((p) => p.id === hash)
    if (hashIdx >= 0) index = hashIdx
    gsap.set(main, { x: -index * window.innerWidth })
    emit(index)

    const isScrollableTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false
      const panel = target.closest('#main > section, #main > footer')
      if (!(panel instanceof HTMLElement)) return false
      const style = getComputedStyle(panel)
      if (!/(auto|scroll)/.test(style.overflowY)) return false
      return panel.scrollHeight > panel.clientHeight + 4
    }

    const onWheel = (e: WheelEvent) => {
      if (locked || animating) {
        e.preventDefault()
        return
      }

      const dx = e.deltaX
      const dy = e.deltaY

      // Inside a tall panel: allow vertical scroll until edges, then change slide
      if (isScrollableTarget(e.target) && Math.abs(dy) >= Math.abs(dx)) {
        const panel = (e.target as Element).closest(
          '#main > section, #main > footer',
        ) as HTMLElement
        const atTop = panel.scrollTop <= 0
        const atBottom =
          panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 2
        if ((dy < 0 && !atTop) || (dy > 0 && !atBottom)) {
          return
        }
      }

      const dominant = Math.abs(dx) > Math.abs(dy) ? dx : dy
      if (Math.abs(dominant) < 8) return
      e.preventDefault()

      wheelAcc += dominant
      window.clearTimeout(wheelTimer)
      wheelTimer = window.setTimeout(() => {
        wheelAcc = 0
      }, 280)

      if (Math.abs(wheelAcc) < 40) return
      const dir = wheelAcc > 0 ? 1 : -1
      wheelAcc = 0
      goTo(index + dir)
    }

    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if (locked || animating) return

      if (
        e.key === 'ArrowRight' ||
        e.key === 'ArrowDown' ||
        e.key === 'PageDown' ||
        e.key === ' '
      ) {
        e.preventDefault()
        next()
      } else if (
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowUp' ||
        e.key === 'PageUp'
      ) {
        e.preventDefault()
        prev()
      } else if (e.key === 'Home') {
        e.preventDefault()
        goTo(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        goTo(panels().length - 1)
      }
    }

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return
      touchX = e.touches[0].clientX
      touchY = e.touches[0].clientY
    }

    const onTouchEnd = (e: TouchEvent) => {
      if (locked || animating) return
      const t = e.changedTouches[0]
      if (!t) return
      const dx = t.clientX - touchX
      const dy = t.clientY - touchY
      if (Math.abs(dx) < 48) return
      if (Math.abs(dx) < Math.abs(dy) * 1.15) return
      if (dx < 0) next()
      else prev()
    }

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== 'pen' && e.pointerType !== 'mouse') return
      if (e.button !== 0) return
      // Ignore UI controls
      const el = e.target
      if (el instanceof Element && el.closest('a, button, input, textarea, select, .nv-root, .section-dots, .wa-float')) {
        return
      }
      touchX = e.clientX
      touchY = e.clientY
      const onUp = (up: PointerEvent) => {
        window.removeEventListener('pointerup', onUp)
        if (locked || animating) return
        const dx = up.clientX - touchX
        const dy = up.clientY - touchY
        if (Math.abs(dx) < 72) return
        if (Math.abs(dx) < Math.abs(dy) * 1.2) return
        if (dx < 0) next()
        else prev()
      }
      window.addEventListener('pointerup', onUp)
    }

    const onAnchor = (e: MouseEvent) => {
      const target = e.target
      if (!(target instanceof Element)) return
      const anchor = target.closest('a[href^="#"]')
      if (!(anchor instanceof HTMLAnchorElement)) return
      const hashHref = anchor.getAttribute('href')
      if (!hashHref || hashHref === '#') return
      const id = hashHref === '#top' ? 'top' : hashHref.slice(1)
      const idx = panels().findIndex((p) => p.id === id)
      if (idx < 0) return
      e.preventDefault()
      goTo(idx)
    }

    const onGoTo = (e: Event) => {
      const detail = (e as CustomEvent<{ index: number }>).detail
      if (typeof detail?.index === 'number') goTo(detail.index)
    }

    const onLock = () => {
      locked = true
    }
    const onUnlock = () => {
      locked = false
    }

    const onResize = () => {
      gsap.set(main, { x: -index * window.innerWidth })
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('click', onAnchor)
    window.addEventListener('digitz:goto-section', onGoTo)
    window.addEventListener('digitz:scroll-lock', onLock)
    window.addEventListener('digitz:scroll-unlock', onUnlock)
    window.addEventListener('resize', onResize)

    const api: DigitzDeck = {
      goTo,
      next,
      prev,
      index: () => index,
      count: () => panels().length,
    }
    ;(window as Window & { __digitzDeck?: DigitzDeck }).__digitzDeck = api

    return () => {
      window.clearTimeout(wheelTimer)
      root.classList.remove('is-hdeck')
      body.classList.remove('is-hdeck')
      gsap.killTweensOf(main)
      gsap.set(main, { clearProps: 'transform' })
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('click', onAnchor)
      window.removeEventListener('digitz:goto-section', onGoTo)
      window.removeEventListener('digitz:scroll-lock', onLock)
      window.removeEventListener('digitz:scroll-unlock', onUnlock)
      window.removeEventListener('resize', onResize)
      delete (window as Window & { __digitzDeck?: DigitzDeck }).__digitzDeck
    }
  }, [])

  return children
}
