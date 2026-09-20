import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '../ui/Container'
import { brand, founder } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

export function Founder() {
  const rootRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(root.querySelectorAll('.fd-anim, .fd-glow'), { clearProps: 'all' })
    })

    mm.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top 75%',
            once: true,
          },
        })

        tl.from('.fd-portrait', {
          autoAlpha: 0,
          x: -36,
          duration: 1,
          ease: 'power3.out',
        })
          .from(
            '.fd-quote',
            {
              autoAlpha: 0,
              y: 28,
              duration: 0.85,
              ease: 'power3.out',
            },
            '-=0.55',
          )
          .from(
            '.fd-identity, .fd-body, .fd-points li, .fd-cta',
            {
              autoAlpha: 0,
              y: 18,
              duration: 0.55,
              stagger: 0.06,
              ease: 'power2.out',
              clearProps: 'transform',
            },
            '-=0.45',
          )

        gsap.to('.fd-glow', {
          y: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      },
      root,
    )

    return () => mm.revert()
  }, [])

  return (
    <section
      id="founder"
      ref={rootRef}
      className="fd-stage"
      aria-labelledby="founder-heading"
    >
      <div className="fd-glow fd-glow--a" aria-hidden />
      <div className="fd-glow fd-glow--b" aria-hidden />

      <Container className="relative z-[1] w-full px-4 md:px-6">
        <div className="fd-grid">
          <figure className="fd-portrait fd-anim">
            <div className="fd-portrait-frame">
              <img
                src={founder.image}
                alt={founder.imageAlt}
                className="fd-portrait-img"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="fd-portrait-cap">
              <span>{founder.name}</span>
              <span>{founder.place}</span>
            </figcaption>
          </figure>

          <div className="fd-copy">
            <blockquote className="fd-quote fd-anim">
              <p>{founder.quote}</p>
            </blockquote>

            <div className="fd-identity fd-anim">
              <h2 id="founder-heading" className="fd-name">
                {founder.firstName}{' '}
                <span className="fd-name-last">{founder.lastName}</span>
              </h2>
              <p className="fd-role">
                {founder.role}
                <span className="fd-role-sep" aria-hidden />
                {founder.brandLine}
              </p>
            </div>

            <p className="fd-body fd-anim">{founder.body}</p>

            <ul className="fd-points">
              {founder.points.map((point) => (
                <li key={point} className="fd-anim">
                  {point}
                </li>
              ))}
            </ul>

            <a
              href={brand.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group fd-cta fd-anim"
            >
              Follow the practice
              <span className="fd-cta-icon" aria-hidden>
                <ArrowUpRight size={14} strokeWidth={1.5} />
              </span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
