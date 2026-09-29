import { useEffect, useState } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '../ui/Container'
import { caseStudies, caseStudiesSection } from '../../data/content'
import { HeroActionText } from '../ui/HeroActionText'

function padIndex(i: number) {
  return String(i + 1).padStart(2, '0')
}

const ease = [0.32, 0.72, 0, 1] as const

const COMPACT_QUERY = '(max-width: 1023px)'

function useCompact() {
  const [compact, setCompact] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(COMPACT_QUERY).matches,
  )
  useEffect(() => {
    const mq = window.matchMedia(COMPACT_QUERY)
    const sync = () => setCompact(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  return compact
}

type WorkViewProps = {
  active: number
  select: (i: number) => void
  reduceMotion: boolean
}

/** Phone / tablet: one glass viewer (image + built-in project picker) above the story. */
function WorkCompact({ active, select, reduceMotion }: WorkViewProps) {
  const project = caseStudies[active]

  return (
    <div className="sw-m">
      <header className="sw-m-intro gs-reveal">
        <span className="selected-work-eyebrow">{caseStudiesSection.tag}</span>
        <HeroActionText
          as="h2"
          id="work-heading"
          className="selected-work-heading sw-m-heading text-balance"
          text={caseStudiesSection.title}
          action="move"
        />
        <p className="selected-work-desc sw-m-desc text-pretty">{caseStudiesSection.support}</p>
      </header>

      <div className="sw-m-viewer gs-reveal-item">
        <div className="sw-m-frame">
          <div className="browser-chrome" aria-hidden>
            <span className="browser-dot browser-dot--r" />
            <span className="browser-dot browser-dot--y" />
            <span className="browser-dot browser-dot--g" />
            <span className="browser-url">
              {project.client.toLowerCase().replace(/\s+/g, '')}.studio
            </span>
          </div>

          <div className="sw-m-media">
            <AnimatePresence initial={false}>
              <motion.img
                key={project.client}
                src={project.image}
                alt={project.imageAlt}
                className="sw-m-image"
                decoding="async"
                initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.55, ease }}
              />
            </AnimatePresence>
          </div>

          <div className="sw-m-picker" role="tablist" aria-label="Selected projects">
            {caseStudies.map((item, i) => {
              const isActive = i === active
              return (
                <button
                  key={item.client}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={item.client}
                  className={`sw-m-thumb ${isActive ? 'is-active' : ''}`}
                  onClick={() => select(i)}
                >
                  <span className="sw-m-thumb-img" aria-hidden>
                    <img src={item.image} alt="" loading="lazy" />
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="sw-m-story">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={project.client}
            className="sw-m-meta"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease }}
          >
            <div className="selected-work-meta-top">
              <p className="selected-work-index">
                <span className="tabular-nums">{padIndex(active)}</span>
                <span className="selected-work-index-sep">/</span>
                {project.client}
              </p>
              <p className="selected-work-category">{project.category}</p>
            </div>
            <h3 className="selected-work-title sw-m-title text-balance">{project.title}</h3>
            <p className="selected-work-body sw-m-body text-pretty">{project.description}</p>
            <div className="selected-work-tags sw-m-tags">
              <p>{project.services}</p>
              <p>{project.technology}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="sw-m-actions">
          <a href={project.href} className="group selected-work-link">
            View case study
            <span className="selected-work-link-icon" aria-hidden>
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </span>
          </a>
          <a href={caseStudiesSection.exploreHref} className="sw-m-explore">
            {caseStudiesSection.exploreLabel}
            <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden />
          </a>
        </div>
      </div>
    </div>
  )
}

export function CaseStudies() {
  const [active, setActive] = useState(0)
  const reduceMotion = useReducedMotion()
  const isCompact = useCompact()
  const project = caseStudies[active]

  const select = (i: number) => {
    if (i === active) return
    setActive(i)
  }

  return (
    <section id="work" className="selected-work" aria-labelledby="work-heading">
      <div className="selected-work-grain" aria-hidden />
      <div
        className="selected-work-orb selected-work-orb--a gs-parallax"
        data-parallax="-40"
        aria-hidden
      />
      <div
        className="selected-work-orb selected-work-orb--b gs-parallax"
        data-parallax="32"
        aria-hidden
      />

      <Container className="relative z-[1] selected-work-shell">
        {isCompact ? (
          <WorkCompact active={active} select={select} reduceMotion={Boolean(reduceMotion)} />
        ) : (
        <div className="selected-work-rail">
          <header className="selected-work-intro gs-reveal">
            <div>
              <span className="selected-work-eyebrow">{caseStudiesSection.tag}</span>
              <HeroActionText
                as="h2"
                id="work-heading"
                className="selected-work-heading text-balance"
                text={caseStudiesSection.title}
                action="move"
              />
              <p className="selected-work-desc text-pretty">
                {caseStudiesSection.support}
              </p>
            </div>

            <a
              href={caseStudiesSection.exploreHref}
              className="group selected-work-explore selected-work-explore--inline"
            >
              {caseStudiesSection.exploreLabel}
              <span className="selected-work-link-icon" aria-hidden>
                <ArrowUpRight size={14} strokeWidth={1.5} />
              </span>
            </a>
          </header>

          <div className="selected-work-rail-stage gs-reveal-item">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.client}
                className="selected-work-feature"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease }}
              >
                <div className="selected-work-media-shell">
                  <div className="browser-frame">
                    <div className="browser-chrome" aria-hidden>
                      <span className="browser-dot browser-dot--r" />
                      <span className="browser-dot browser-dot--y" />
                      <span className="browser-dot browser-dot--g" />
                      <span className="browser-url">
                        {project.client.toLowerCase().replace(/\s+/g, '')}.studio
                      </span>
                    </div>
                    <div className="browser-viewport">
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        className="browser-image"
                        loading="eager"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>

                <div className="selected-work-meta">
                  <div className="selected-work-meta-top">
                    <p className="selected-work-index">
                      <span className="tabular-nums">{padIndex(active)}</span>
                      <span className="selected-work-index-sep">/</span>
                      {project.client}
                    </p>
                    <p className="selected-work-category">{project.category}</p>
                  </div>

                  <h3 className="selected-work-title text-balance">
                    {project.title}
                  </h3>
                  <p className="selected-work-body text-pretty">
                    {project.description}
                  </p>

                  <div className="selected-work-tags">
                    <p>{project.services}</p>
                    <p>{project.technology}</p>
                  </div>

                  <a href={project.href} className="group selected-work-link">
                    View case study
                    <span className="selected-work-link-icon" aria-hidden>
                      <ArrowUpRight size={14} strokeWidth={1.5} />
                    </span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            <nav
              className="selected-work-nav"
              aria-label="Selected projects"
              role="tablist"
            >
              {caseStudies.map((item, i) => {
                const isActive = i === active
                return (
                  <button
                    key={item.client}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`selected-work-nav-item ${isActive ? 'is-active' : ''}`}
                    onClick={() => select(i)}
                  >
                    <span className="selected-work-nav-thumb" aria-hidden>
                      <img src={item.image} alt="" />
                    </span>
                    <span className="selected-work-nav-copy">
                      <span className="selected-work-nav-index tabular-nums">
                        {padIndex(i)}
                      </span>
                      <span className="selected-work-nav-name">{item.client}</span>
                    </span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>
        )}
      </Container>
    </section>
  )
}
