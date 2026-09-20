import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { clientConstellation, clientsSection } from '../../data/content'
import { Container } from '../ui/Container'

const PARTICLES = [
  { x: 42, y: 28, s: 2, d: 0 },
  { x: 58, y: 32, s: 1.5, d: 1.2 },
  { x: 48, y: 48, s: 2.5, d: 0.4 },
  { x: 55, y: 55, s: 1.5, d: 2.1 },
  { x: 38, y: 52, s: 2, d: 1.5 },
  { x: 62, y: 44, s: 1.5, d: 0.8 },
  { x: 45, y: 38, s: 1, d: 2.6 },
  { x: 52, y: 62, s: 2, d: 1.1 },
  { x: 36, y: 42, s: 1.5, d: 1.8 },
  { x: 64, y: 58, s: 1, d: 0.3 },
  { x: 50, y: 34, s: 2, d: 2.4 },
  { x: 40, y: 60, s: 1.5, d: 1.6 },
  { x: 60, y: 36, s: 1, d: 0.9 },
  { x: 47, y: 56, s: 2.5, d: 2.0 },
  { x: 54, y: 42, s: 1.5, d: 0.5 },
  { x: 44, y: 46, s: 1, d: 1.4 },
  { x: 57, y: 50, s: 2, d: 2.8 },
  { x: 41, y: 35, s: 1.5, d: 0.7 },
  { x: 53, y: 58, s: 1, d: 1.9 },
  { x: 49, y: 40, s: 2, d: 1.3 },
] as const

const CONSTELLATION_PATHS = [
  'M18 18 C 30 28, 38 36, 48 44',
  'M78 16 C 68 28, 60 36, 52 44',
  'M14 52 C 28 50, 38 48, 46 46',
  'M86 48 C 72 50, 62 48, 54 46',
  'M22 78 C 32 68, 40 58, 48 50',
  'M76 80 C 66 68, 58 58, 52 50',
  'M48 18 C 49 30, 50 38, 50 44',
] as const

const FLOAT_META: Record<string, { duration: number; delay: number }> = {
  '01': { duration: 4.2, delay: -1.1 },
  '02': { duration: 3.6, delay: -0.4 },
  '03': { duration: 4.8, delay: -2.2 },
  '04': { duration: 3.4, delay: -1.6 },
  '05': { duration: 4.5, delay: -0.8 },
  '06': { duration: 3.8, delay: -2.8 },
  '07': { duration: 5.0, delay: -1.9 },
  '08': { duration: 3.5, delay: -0.2 },
  '09': { duration: 4.1, delay: -2.5 },
  '10': { duration: 3.7, delay: -1.3 },
  '11': { duration: 4.6, delay: -0.6 },
  '12': { duration: 3.9, delay: -2.0 },
}

function depthFromSize(size: 'primary' | 'secondary' | 'tertiary') {
  if (size === 'primary') return 'near'
  if (size === 'secondary') return 'mid'
  return 'far'
}

export function Clients() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const [hovered, setHovered] = useState<string | null>(null)
  const [inView, setInView] = useState(false)
  const [isFinePointer, setIsFinePointer] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const sync = () => setIsFinePointer(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!isFinePointer || reduceMotion) return
    const stage = stageRef.current
    if (!stage) return

    let raf = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const rect = stage.getBoundingClientRect()
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
        const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1
        stage.style.setProperty('--mx', nx.toFixed(3))
        stage.style.setProperty('--my', ny.toFixed(3))
        stage.style.setProperty('--mouse-x', `${((e.clientX - rect.left) / rect.width) * 100}%`)
        stage.style.setProperty('--mouse-y', `${((e.clientY - rect.top) / rect.height) * 100}%`)
      })
    }

    const onLeave = () => {
      stage.style.setProperty('--mx', '0')
      stage.style.setProperty('--my', '0')
    }

    stage.addEventListener('pointermove', onMove, { passive: true })
    stage.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerleave', onLeave)
    }
  }, [isFinePointer, reduceMotion])

  return (
    <section
      id="clients"
      ref={sectionRef}
      className={`clients-constellation ${inView ? 'is-in' : ''} ${hovered ? 'is-dimming' : ''} ${
        reduceMotion ? 'is-reduced' : ''
      }`}
    >
      <div className="clients-constellation-atmosphere" aria-hidden>
        <span className="clients-blob clients-blob--mint" />
        <span className="clients-blob clients-blob--cyan" />
        <span className="clients-blob clients-blob--champagne" />
        <span className="clients-blob clients-blob--lavender" />
        <span className="clients-blob clients-blob--peach" />
      </div>

      <Container className="relative z-10">
        <div className="clients-constellation-shell">
          <header className="clients-constellation-header">
            <p className="clients-constellation-eyebrow">{clientsSection.tag}</p>
            <h2 className="clients-constellation-title">
              <span className="clients-constellation-title-strong">{clientsSection.title}</span>
              <em className="clients-constellation-title-accent">{clientsSection.titleAccent}</em>
            </h2>
            <p className="clients-constellation-support">{clientsSection.support}</p>
          </header>

          <div
            ref={stageRef}
            className={`clients-constellation-stage gs-scrub-fade ${isFinePointer && !reduceMotion ? 'has-cursor-light' : ''}`}
            style={
              {
                ['--mouse-x' as string]: '50%',
                ['--mouse-y' as string]: '46%',
                ['--mx' as string]: '0',
                ['--my' as string]: '0',
              } as CSSProperties
            }
          >
            <div className="clients-cursor-light" aria-hidden />

            <div className="clients-core" aria-hidden>
              <div className="clients-core-ambient" />
              <div className="clients-core-orb">
                <span className="clients-core-orb-body" />
                <span className="clients-core-orb-rim" />
                <span className="clients-core-orb-core" />
                <span className="clients-core-orb-shine" />
                <span className="clients-core-orb-caustic" />
              </div>
            </div>

            <svg
              className="clients-net"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              {CONSTELLATION_PATHS.map((d, i) => (
                <path key={i} className={`clients-net-path clients-net-path--${i % 3}`} d={d} />
              ))}
            </svg>

            <div className="clients-dust" aria-hidden>
              {PARTICLES.map((p, i) => (
                <span
                  key={i}
                  className="clients-dust-bit"
                  style={
                    {
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                      width: p.s,
                      height: p.s,
                      ['--dust-delay' as string]: `${p.d}s`,
                    } as CSSProperties
                  }
                />
              ))}
            </div>

            {clientConstellation.map((client, i) => {
              const plane = depthFromSize(client.size)
              const float = FLOAT_META[client.id] ?? { duration: 4, delay: -1 }
              const isActive = hovered === client.id
              const isRecessed = Boolean(hovered && hovered !== client.id)

              return (
                <article
                  key={client.id}
                  className={`clients-glass clients-glass--${client.size} clients-glass--${plane} ${
                    isActive ? 'is-active' : ''
                  } ${isRecessed ? 'is-recessed' : ''}`}
                  style={
                    {
                      ['--x' as string]: `${client.x}%`,
                      ['--y' as string]: `${client.y}%`,
                      ['--glass-a' as string]: client.opacity,
                      ['--rot' as string]: `${client.rotate}deg`,
                      ['--depth' as string]: client.depth,
                      ['--stagger' as string]: `${90 + i * 70}ms`,
                    } as CSSProperties
                  }
                  onMouseEnter={() => setHovered(client.id)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(client.id)}
                  onBlur={() => setHovered(null)}
                  tabIndex={0}
                >
                  <motion.div
                    className="relative z-[1]"
                    animate={reduceMotion || isActive ? { y: 0 } : { y: [-5, 5] }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : {
                            duration: float.duration,
                            delay: float.delay,
                            ease: 'easeInOut',
                            repeat: Infinity,
                            repeatType: 'reverse',
                          }
                    }
                  >
                    <span className="clients-glass-sheen" aria-hidden />
                    <p className="clients-glass-category">{client.category}</p>
                    <h3 className="clients-glass-brand">
                      <span>{client.brand}</span>
                      <span className="clients-glass-arrow" aria-hidden>
                        →
                      </span>
                    </h3>
                  </motion.div>
                </article>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
