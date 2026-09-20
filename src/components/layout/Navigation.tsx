import { useEffect, useId, useRef, useState } from 'react'
import { megaNav, whatsappUrl } from '../../data/content'
import { LogoMark } from '../ui/LogoMark'

function ChevronTip({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden
      className={`nv-chevron ${open ? 'is-open' : ''}`}
    >
      <path
        d="M2.2 3.6 5 6.4l2.8-2.8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ArrowTip() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M2.5 6h7M6.2 3.2 9.5 6 6.2 8.8"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [sheetGroup, setSheetGroup] = useState<string | null>(null)
  const closeTimer = useRef<number | null>(null)
  const panelId = useId()
  const sheetId = useId()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    window.dispatchEvent(new Event(open ? 'digitz:scroll-lock' : 'digitz:scroll-unlock'))
    return () => {
      document.body.style.overflow = ''
      window.dispatchEvent(new Event('digitz:scroll-unlock'))
    }
  }, [open])

  useEffect(() => {
    if (!open) setSheetGroup(null)
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      setActive(null)
      setSheetGroup(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => {
      if (mq.matches) {
        setOpen(false)
        setSheetGroup(null)
      }
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const clearClose = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  const scheduleClose = () => {
    clearClose()
    closeTimer.current = window.setTimeout(() => setActive(null), 160)
  }

  const openMenu = (id: string) => {
    clearClose()
    setActive(id)
  }

  const closeSheet = () => {
    setOpen(false)
    setSheetGroup(null)
  }

  const toggleSheetGroup = (id: string) => {
    setSheetGroup((prev) => (prev === id ? null : id))
  }

  const islandActive = scrolled || open || Boolean(active)

  return (
    <header className="nv-root pointer-events-none fixed inset-x-0 top-[max(0.85rem,env(safe-area-inset-top))] z-50 mx-auto w-[min(96%,72rem)] sm:top-6 sm:w-[min(94%,72rem)]">
      <div className="pointer-events-auto relative w-full">
        <div
          className={`nv-shell ${islandActive ? 'is-dense' : ''}`}
          onMouseLeave={scheduleClose}
        >
          <div className="nv-core">
            <div className="nv-bar">
              <a
                href="#top"
                className="nv-logo"
                aria-label="Digitz Creative home"
                onClick={closeSheet}
              >
                <LogoMark className="h-full w-full" />
              </a>

              <nav className="nv-links hidden lg:flex" aria-label="Primary">
                {megaNav.map((item) => {
                  const isOpen = active === item.id
                  return (
                    <div
                      key={item.id}
                      className="relative"
                      onMouseEnter={() => openMenu(item.id)}
                      onFocus={() => openMenu(item.id)}
                    >
                      <button
                        type="button"
                        className={`nv-link ${isOpen ? 'is-active' : ''}`}
                        aria-expanded={isOpen}
                        aria-controls={`${panelId}-${item.id}`}
                        onClick={() => setActive(isOpen ? null : item.id)}
                      >
                        {item.label}
                        <ChevronTip open={isOpen} />
                      </button>
                    </div>
                  )
                })}
              </nav>

              <div className="nv-actions">
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nv-cta group nv-cta--bar"
                >
                  <span className="nv-cta-label">Let&apos;s Talk</span>
                  <span className="nv-cta-mark" aria-hidden>
                    <ArrowTip />
                  </span>
                </a>

                <button
                  type="button"
                  className={`nv-burger lg:hidden ${open ? 'is-open' : ''}`}
                  aria-expanded={open}
                  aria-controls={sheetId}
                  aria-label={open ? 'Close menu' : 'Open menu'}
                  onClick={() => {
                    setActive(null)
                    setOpen((v) => !v)
                  }}
                >
                  <span className="nv-burger-line nv-burger-line--a" />
                  <span className="nv-burger-line nv-burger-line--b" />
                  <span className="nv-burger-line nv-burger-line--c" />
                </button>
              </div>
            </div>

            {megaNav.map((item) => {
              const isOpen = active === item.id
              return (
                <div
                  key={item.id}
                  id={`${panelId}-${item.id}`}
                  className={`nv-mega-anchor absolute inset-x-1 top-[calc(100%+0.65rem)] z-50 hidden lg:block ${
                    isOpen ? 'pointer-events-auto' : 'pointer-events-none'
                  }`}
                  onMouseEnter={clearClose}
                  onMouseLeave={scheduleClose}
                  hidden={!isOpen}
                >
                  <div className={`nv-mega-shell ${isOpen ? 'is-open' : ''}`}>
                    <div className="nv-mega-core">
                      <div className="nv-mega-grid">
                        <div className="nv-mega-cols">
                          {item.columns.map((col) => (
                            <div key={col.title}>
                              <p className="nv-mega-label">{col.title}</p>
                              <ul className="nv-mega-list">
                                {col.links.map((link) => (
                                  <li key={link.label}>
                                    <a
                                      href={link.href}
                                      className="nv-mega-link"
                                      onClick={() => setActive(null)}
                                    >
                                      {link.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <aside className="nv-mega-aside">
                          <p className="nv-mega-label">Digitz Creative</p>
                          <p className="nv-mega-blurb">{item.blurb}</p>
                          <a
                            href={item.cta.href}
                            className="nv-cta group mt-auto w-fit"
                            onClick={() => setActive(null)}
                          >
                            <span>{item.cta.label}</span>
                            <span className="nv-cta-mark" aria-hidden>
                              <ArrowTip />
                            </span>
                          </a>
                        </aside>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Tablet + mobile sheet */}
        {open ? (
          <>
            <button
              type="button"
              className="nv-scrim lg:hidden"
              aria-label="Close menu"
              onClick={closeSheet}
            />
            <nav
              id={sheetId}
              className="nv-sheet lg:hidden"
              aria-label="Site"
            >
              <div className="nv-sheet-shell">
                <div className="nv-sheet-core">
                  <p className="nv-sheet-lead">Find what you need</p>

                  <div className="nv-sheet-groups">
                    {megaNav.map((item) => {
                      const expanded = sheetGroup === item.id
                      const panel = `${sheetId}-${item.id}`
                      return (
                        <div
                          key={item.id}
                          className={`nv-acc ${expanded ? 'is-open' : ''}`}
                        >
                          <div className="nv-acc-head">
                            <a
                              href={item.href}
                              className="nv-acc-title"
                              onClick={closeSheet}
                            >
                              {item.label}
                            </a>
                            <button
                              type="button"
                              className="nv-acc-toggle"
                              aria-expanded={expanded}
                              aria-controls={panel}
                              aria-label={`${expanded ? 'Hide' : 'Show'} ${item.label} links`}
                              onClick={() => toggleSheetGroup(item.id)}
                            >
                              <ChevronTip open={expanded} />
                            </button>
                          </div>

                          <div
                            id={panel}
                            className="nv-acc-body"
                            hidden={!expanded}
                          >
                            <div className="nv-acc-inner">
                              <div className="nv-acc-cols">
                                {item.columns.map((col) => (
                                  <div key={col.title} className="nv-acc-col">
                                    <p className="nv-acc-col-title">{col.title}</p>
                                    <ul className="nv-acc-list">
                                      {col.links.map((link) => (
                                        <li key={link.label}>
                                          <a
                                            href={link.href}
                                            className="nv-acc-link"
                                            onClick={closeSheet}
                                          >
                                            {link.label}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                              <p className="nv-acc-note">{item.blurb}</p>
                              <a
                                href={item.cta.href}
                                className="nv-acc-cta"
                                onClick={closeSheet}
                              >
                                {item.cta.label}
                                <ArrowTip />
                              </a>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeSheet}
                    className="nv-cta group nv-sheet-cta"
                  >
                    <span>Let&apos;s Talk</span>
                    <span className="nv-cta-mark" aria-hidden>
                      <ArrowTip />
                    </span>
                  </a>
                </div>
              </div>
            </nav>
          </>
        ) : null}
      </div>
    </header>
  )
}
