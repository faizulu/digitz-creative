import { useLayoutEffect, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

type DigitzDeck = {
  goTo: (index: number) => void
  next: () => void
  prev: () => void
  index: () => number
  count: () => number
}

const IGNORE =
  'a, button, input, textarea, select, .nv-root, .section-dots, .pg-dock, .wa-float'

/**
 * Horizontal full-page deck.
 * The track follows the finger with one reused tween, then eases onto the
 * nearest panel. Wheel movement inside a tall panel is eased the same way.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = document.documentElement
    const body = document.body
    const main = document.getElementById('main')
    if (!main) return

    gsap.ticker.lagSmoothing(250, 16)

    root.classList.add('is-hdeck')
    body.classList.add('is-hdeck')

    const panels = () =>
      Array.from(main.querySelectorAll<HTMLElement>(':scope > section, :scope > footer'))

    let index = 0
    let locked = false
    let hotKey = ''
    let wheelAcc = 0
    let wheelTimer = 0
    let wheelGate = 0
    const scrollIntent = new WeakMap<HTMLElement, number>()

    const clamp = (i: number) => Math.max(0, Math.min(i, panels().length - 1))
    const width = () => window.innerWidth
    const minX = () => -(panels().length - 1) * width()

    const markHot = (center: number, spread: number) => {
      const list = panels()
      const c = Math.max(0, Math.min(list.length - 1, Math.round(center)))
      const key = `${c}:${spread}:${list.length}`
      if (key === hotKey) return
      hotKey = key
      list.forEach((panel, i) => {
        panel.classList.toggle('is-deck-hot', Math.abs(i - c) <= spread)
      })
    }

    const emit = (i: number) => {
      window.dispatchEvent(
        new CustomEvent('digitz:section-snap', { detail: { index: i } }),
      )
      const id = panels()[i]?.id
      if (id && window.location.hash !== `#${id}`) {
        history.replaceState(null, '', `#${id}`)
      }
    }

    const xTo = gsap.quickTo(main, 'x', { duration: 0.34, ease: 'power3.out' })

    const resist = (x: number) => {
      const min = minX()
      if (x > 0) return x * 0.28
      if (x < min) return min + (x - min) * 0.28
      return x
    }

    const goTo = (i: number, instant = false) => {
      if (locked) return
      const next = clamp(i)
      const from = index
      const changed = next !== from
      index = next
      const distance = Math.abs(next - from)
      const duration = reduced || instant ? 0 : Math.min(1.05, 0.78 + distance * 0.04)
      markHot(next, duration === 0 ? 0 : 1)
      if (duration === 0) {
        gsap.killTweensOf(main)
        gsap.set(main, { x: -next * width(), force3D: true })
        if (changed) emit(next)
        return
      }
      gsap.to(main, {
        x: () => -index * width(),
        duration,
        ease: 'expo.out',
        overwrite: true,
        force3D: true,
        onStart: () => {
          if (changed) emit(index)
        },
        onComplete: () => markHot(index, 0),
      })
    }

    const next = () => goTo(index + 1)
    const prev = () => goTo(index - 1)

    const hash = window.location.hash.replace('#', '')
    const hashIdx = panels().findIndex((p) => p.id === hash)
    if (hashIdx >= 0) index = hashIdx
    gsap.set(main, { x: -index * width(), force3D: true })
    markHot(index, 0)
    emit(index)

    const horizontalRail = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return null
      const rail = target.closest('.clients-constellation-stage')
      if (!(rail instanceof HTMLElement)) return null
      if (rail.scrollWidth <= rail.clientWidth + 8) return null
      return rail
    }

    let scrollableCache = new WeakMap<Element, boolean>()
    const isScrollableTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false
      const panel = target.closest('#main > section, #main > footer')
      if (!(panel instanceof HTMLElement)) return false
      let overflow = scrollableCache.get(panel)
      if (overflow == null) {
        overflow = /(auto|scroll)/.test(getComputedStyle(panel).overflowY)
        scrollableCache.set(panel, overflow)
      }
      return overflow && panel.scrollHeight > panel.clientHeight + 4
    }

    const panelOf = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return null
      const panel = target.closest('#main > section, #main > footer')
      return panel instanceof HTMLElement ? panel : null
    }

    const intentOf = (el: HTMLElement, axis: 'x' | 'y' = 'y') => {
      const remembered = scrollIntent.get(el)
      const visual = axis === 'x' ? el.scrollLeft : el.scrollTop
      if (remembered == null || !gsap.isTweening(el)) return visual
      return remembered
    }

    const nudgePanel = (panel: HTMLElement, dy: number) => {
      const max = Math.max(0, panel.scrollHeight - panel.clientHeight)
      const base = intentOf(panel)
      const nextTop = Math.max(0, Math.min(max, base + dy))
      scrollIntent.set(panel, nextTop)
      gsap.to(panel, {
        scrollTo: { y: nextTop },
        duration: 0.7,
        ease: 'power3.out',
        overwrite: 'auto',
      })
      return { base, nextTop, max }
    }

    const onWheel = (e: WheelEvent) => {
      if (locked) {
        e.preventDefault()
        return
      }

      const dx = e.deltaX
      const dy = e.deltaY

      const rail = horizontalRail(e.target)
      if (rail && Math.abs(dx) > Math.abs(dy)) {
        const max = rail.scrollWidth - rail.clientWidth
        const base = intentOf(rail, 'x')
        const atStart = base <= 1
        const atEnd = base >= max - 2
        if ((dx > 0 && !atEnd) || (dx < 0 && !atStart)) {
          const nextLeft = Math.max(0, Math.min(max, base + dx))
          scrollIntent.set(rail, nextLeft)
          gsap.to(rail, {
            scrollTo: { x: nextLeft },
            duration: 0.45,
            ease: 'power3.out',
            overwrite: 'auto',
          })
          e.preventDefault()
          return
        }
      }

      if (isScrollableTarget(e.target) && Math.abs(dy) >= Math.abs(dx)) {
        const panel = panelOf(e.target)
        if (panel) {
          const max = Math.max(0, panel.scrollHeight - panel.clientHeight)
          const base = intentOf(panel)
          const atTop = base <= 1
          const atBottom = base >= max - 2
          if (dy > 0 && !atBottom) {
            nudgePanel(panel, dy)
            e.preventDefault()
            return
          }
          if (dy < 0 && !atTop) {
            nudgePanel(panel, dy)
            e.preventDefault()
            return
          }
        }
      }

      const dominant = Math.abs(dx) > Math.abs(dy) ? dx : dy
      if (Math.abs(dominant) < 6) return
      e.preventDefault()

      if (performance.now() < wheelGate) return

      wheelAcc += dominant
      window.clearTimeout(wheelTimer)
      wheelTimer = window.setTimeout(() => {
        wheelAcc = 0
      }, 260)

      if (Math.abs(wheelAcc) < 36) return
      const dir = wheelAcc > 0 ? 1 : -1
      wheelAcc = 0
      wheelGate = performance.now() + 480
      goTo(index + dir)
    }

    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if (locked) return

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

    type Drag = {
      pointerId: number
      startX: number
      startY: number
      originX: number
      targetX: number
      lastX: number
      lastT: number
      velocity: number
      axis: 'undecided' | 'x' | 'y'
      target: EventTarget | null
    }

    let drag: Drag | null = null

    const ignored = (target: EventTarget | null) =>
      target instanceof Element && Boolean(target.closest(IGNORE))

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 || locked) return
      if (e.pointerType === 'mouse' && e.target instanceof Element && e.target.closest('a, button')) {
        return
      }
      if (ignored(e.target) || horizontalRail(e.target)) return
      const origin = Number(gsap.getProperty(main, 'x')) || 0
      drag = {
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        originX: origin,
        targetX: origin,
        lastX: e.clientX,
        lastT: performance.now(),
        velocity: 0,
        axis: 'undecided',
        target: e.target,
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.pointerId) return
      const dx = e.clientX - drag.startX
      const dy = e.clientY - drag.startY

      if (drag.axis === 'undecided') {
        if (Math.hypot(dx, dy) < 8) return
        if (Math.abs(dy) > Math.abs(dx) && isScrollableTarget(drag.target)) {
          drag.axis = 'y'
          return
        }
        if (Math.abs(dx) < Math.abs(dy) * 0.9) {
          drag = null
          return
        }
        drag.axis = 'x'
        gsap.killTweensOf(main)
        drag.originX = Number(gsap.getProperty(main, 'x')) || 0
        drag.startX = e.clientX
        drag.targetX = drag.originX
        drag.lastX = e.clientX
        drag.lastT = performance.now()
      }

      if (drag.axis !== 'x') return
      if (e.cancelable) e.preventDefault()

      const now = performance.now()
      const dt = Math.max(8, now - drag.lastT)
      drag.velocity = (e.clientX - drag.lastX) / dt
      drag.lastX = e.clientX
      drag.lastT = now

      const nextX = resist(drag.originX + dx)
      drag.targetX = nextX
      xTo(nextX)
      markHot(-nextX / width(), 1)
    }

    const finishDrag = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.pointerId) return
      const current = drag
      drag = null
      if (current.axis !== 'x') return

      const w = width()
      const progress = -current.targetX / w
      let target: number
      if (current.velocity < -0.42) target = Math.ceil(progress - 0.02)
      else if (current.velocity > 0.42) target = Math.floor(progress + 0.02)
      else target = Math.round(progress)
      goTo(target)
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
      scrollableCache = new WeakMap()
      gsap.killTweensOf(main)
      gsap.set(main, { x: -index * width(), force3D: true })
      markHot(index, 0)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove, { passive: false })
    window.addEventListener('pointerup', finishDrag)
    window.addEventListener('pointercancel', finishDrag)
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
      panels().forEach((panel) => panel.classList.remove('is-deck-hot'))
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', finishDrag)
      window.removeEventListener('pointercancel', finishDrag)
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
