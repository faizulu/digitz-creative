import { useEffect, useRef, useState } from 'react'
import { ChevronRight } from 'lucide-react'

const SECTIONS = [
  { id: 'top', label: 'Home' },
  { id: 'numbers', label: 'Impact' },
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'Process' },
  { id: 'clients', label: 'Clients' },
  { id: 'work', label: 'Work' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'founder', label: 'Founder' },
  { id: 'why', label: 'Why us' },
  { id: 'packages', label: 'Packages' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'voice', label: 'Voice' },
  { id: 'contact', label: 'Contact' },
  { id: 'site-footer', label: 'Footer' },
] as const

function goToSection(index: number) {
  window.dispatchEvent(
    new CustomEvent('digitz:goto-section', { detail: { index } }),
  )
}

export function SectionDots() {
  const [active, setActive] = useState(0)
  const last = SECTIONS.length - 1
  const listRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const onSnap = (e: Event) => {
      const index = (e as CustomEvent<{ index: number }>).detail?.index
      if (typeof index === 'number') setActive(Math.min(index, last))
    }
    window.addEventListener('digitz:section-snap', onSnap)
    return () => window.removeEventListener('digitz:section-snap', onSnap)
  }, [last])

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const btn = list.querySelector<HTMLElement>(`.pg-dock-btn.is-active`)
    btn?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })
  }, [active])

  return (
    <div className="pg-dock" role="navigation" aria-label="Page sections">
      <div className="pg-dock-glass">
        <span className="pg-dock-sheen" aria-hidden />
        <span className="pg-dock-rim" aria-hidden />

        <ol ref={listRef} className="pg-dock-list">
          {SECTIONS.map((s, i) => (
            <li key={s.id} className="pg-dock-item">
              <button
                type="button"
                className={`pg-dock-btn ${i === active ? 'is-active' : ''}`}
                aria-label={s.label}
                aria-current={i === active ? 'true' : undefined}
                onClick={() => goToSection(i)}
              >
                <span className="pg-dock-label">{s.label}</span>
                <span className="pg-dock-dot" aria-hidden />
              </button>
            </li>
          ))}
        </ol>

        <button
          type="button"
          className="pg-dock-next"
          aria-label="Go to next section"
          onClick={() => goToSection(Math.min(active + 1, last))}
          disabled={active >= last}
        >
          <ChevronRight size={18} strokeWidth={2.1} />
        </button>
      </div>
    </div>
  )
}
