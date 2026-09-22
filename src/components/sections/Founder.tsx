import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { RocketMark } from '../brand/RocketMark'
import { founder } from '../../data/content'
import { ActionWord } from '../ui/HeroActionText'

const bridgeCraft = ['Content', 'Strategy', 'Growth'] as const

function ImpactSparkline() {
  return (
    <svg className="fd-impact-chart" viewBox="0 0 120 40" fill="none" aria-hidden>
      <defs>
        <linearGradient id="fd-spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(21 120 184 / 0.35)" />
          <stop offset="100%" stopColor="rgb(21 120 184 / 0)" />
        </linearGradient>
        <linearGradient id="fd-spark-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1578b8" />
          <stop offset="100%" stopColor="#58b832" />
        </linearGradient>
      </defs>
      <path
        d="M0 32 C18 30 22 22 36 20 C50 18 54 28 68 18 C82 8 90 14 104 10 L120 6 V40 H0 Z"
        fill="url(#fd-spark-fill)"
      />
      <path
        d="M0 32 C18 30 22 22 36 20 C50 18 54 28 68 18 C82 8 90 14 104 10 L120 6"
        stroke="url(#fd-spark-stroke)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function BlobShape() {
  return (
    <svg
      className="fd-blob"
      viewBox="0 0 480 520"
      fill="none"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="fd-blob-fill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D6EAF7" />
          <stop offset="55%" stopColor="#C5E4F5" />
          <stop offset="100%" stopColor="#D4EDC8" />
        </linearGradient>
      </defs>
      <path
        d="M380 48C448 98 478 178 468 258C458 338 408 412 328 458C248 504 148 522 78 478C8 434 -8 338 18 248C44 158 112 78 198 38C284 -2 312 -2 380 48Z"
        fill="url(#fd-blob-fill)"
      />
    </svg>
  )
}

export function Founder() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !rootRef.current) return

    const play = () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', overwrite: true } })
      tl.fromTo(
        '.fd-visual',
        { autoAlpha: 0, scale: 0.94, y: 18 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 0.85 },
      )
        .fromTo(
          '.fd-copy > *',
          { autoAlpha: 0, x: -20 },
          { autoAlpha: 1, x: 0, duration: 0.48, stagger: 0.05 },
          '-=0.55',
        )
        .fromTo(
          '.fd-bridge',
          { autoAlpha: 0, y: 12, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.55 },
          '-=0.4',
        )
        .fromTo(
          '.fd-chip',
          { autoAlpha: 0, y: 16, scale: 0.92 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.1 },
          '-=0.3',
        )
    }

    const ctx = gsap.context(() => {
      play()
    }, rootRef)

    const onSnap = (e: Event) => {
      const index = (e as CustomEvent<{ index: number }>).detail?.index
      const main = document.getElementById('main')
      if (!main || typeof index !== 'number') return
      const panels = main.querySelectorAll(':scope > section, :scope > footer')
      if (panels[index] !== rootRef.current) return
      play()
    }
    window.addEventListener('digitz:section-snap', onSnap)

    return () => {
      window.removeEventListener('digitz:section-snap', onSnap)
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="founder"
      ref={rootRef}
      className="fd-magic"
      aria-labelledby="founder-heading"
    >
      <div className="fd-stage">
        <div className="fd-copy">
          <p className="fd-hello">{founder.hello}</p>
          <h2 id="founder-heading" className="fd-name">
            {founder.firstName}{' '}
            <ActionWord>{founder.lastName}</ActionWord>
          </h2>
          <p className="fd-title">{founder.titleLine}</p>
          <p className="fd-body">{founder.body}</p>

          <div className="fd-actions">
            <a href={founder.primaryCta.href} className="fd-btn fd-btn--solid">
              {founder.primaryCta.label}
              <ArrowUpRight size={15} strokeWidth={2.1} aria-hidden />
            </a>
            <a href={founder.secondaryCta.href} className="fd-btn fd-btn--line">
              <MessageCircle size={14} strokeWidth={2.1} aria-hidden />
              {founder.secondaryCta.label}
            </a>
          </div>

          <div className="fd-trusted">
            <ul className="fd-trusted-list" aria-label={founder.trustedLabel}>
              {founder.trustedBrands.map((brandName) => (
                <li key={brandName} className="fd-trusted-item">
                  {brandName}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="fd-bridge" aria-hidden>
          <span className="fd-bridge-line fd-bridge-line--top" />
          <div className="fd-bridge-orb">
            <span className="fd-bridge-ring fd-bridge-ring--a" />
            <span className="fd-bridge-ring fd-bridge-ring--b" />
            <RocketMark className="fd-bridge-rocket" />
          </div>
          <p className="fd-bridge-brand">{founder.brandLine}</p>
          <ul className="fd-bridge-craft">
            {bridgeCraft.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="fd-bridge-place">{founder.place}</p>
          <span className="fd-bridge-line fd-bridge-line--bot" />
        </div>

        <div className="fd-visual">
          <BlobShape />
          <div className="fd-portrait-wrap">
            <img
              src={founder.image}
              alt={founder.imageAlt}
              className="fd-portrait"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div
            className="fd-chip fd-chip--years"
            aria-label={`${founder.yearsValue} ${founder.yearsLabel}`}
          >
            <p className="fd-chip-value">{founder.yearsValue}</p>
            <p className="fd-chip-label">{founder.yearsLabel}</p>
          </div>

          <div className="fd-chip fd-chip--impact">
            <div className="fd-chip-impact-head">
              <p className="fd-chip-label">{founder.impactLabel}</p>
              <p className="fd-chip-value fd-chip-value--sm">{founder.impactValue}</p>
            </div>
            <ImpactSparkline />
          </div>
        </div>
      </div>
    </section>
  )
}
