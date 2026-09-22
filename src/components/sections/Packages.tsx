import { Check } from 'lucide-react'
import { packages, whatsappUrl } from '../../data/content'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { ActionWord } from '../ui/HeroActionText'

export function Packages() {
  return (
    <section id="packages" className="packages-panel relative overflow-hidden">
      <Container className="flex min-h-0 flex-col justify-center py-1">
        <Reveal>
          <div className="packages-intro mx-auto max-w-2xl text-center">
            <p className="mb-3 text-[12px] font-medium tracking-[0.08em] text-slate-500">
              Packages
            </p>
            <h2 className="section-hero-title text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15] font-bold tracking-[-0.03em] text-slate-900">
              Start. Grow. <ActionWord>Scale</ActionWord>.
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-slate-500">
              Simple structure, custom scoped. Pricing is set against the brief and the business,
              never a fake rate card.
            </p>
          </div>
        </Reveal>

        <div className="packages-grid grid items-stretch gap-4 lg:grid-cols-3 lg:gap-5">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 70} className="h-full min-h-0">
              <article
                className={`pkg-glass flex h-full flex-col p-3 sm:p-3.5 ${
                  pkg.featured ? 'pkg-glass--featured' : ''
                }`}
              >
                <span className="pkg-glass-sheen" aria-hidden />
                <span className="pkg-glass-rim" aria-hidden />

                <div className="pkg-glass-inner rounded-[1.4rem] p-5 sm:p-6">
                  <span className="inline-flex rounded-full border border-white/55 bg-white/60 px-3 py-1 text-[11px] font-semibold tracking-wide text-slate-800 shadow-sm backdrop-blur-sm">
                    {pkg.name}
                  </span>

                  <h3 className="mt-4 text-[clamp(1.55rem,2.2vw,2rem)] leading-none font-bold tracking-tight text-slate-900">
                    {pkg.name}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-snug text-slate-600">{pkg.audience}</p>

                  <a
                    href={whatsappUrl(
                      `Hi Digitz Creative - I'm interested in the ${pkg.name} program for my business.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-4 py-3 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Talk about {pkg.name}
                  </a>
                </div>

                <ul className="flex flex-1 flex-col gap-2.5 px-2 pt-4 pb-1 sm:gap-3 sm:px-3 sm:pt-5">
                  {pkg.points.map((point) => (
                    <li key={point} className="flex gap-3 text-[14px] leading-snug text-slate-600">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white/75 text-[#1578b8] shadow-sm">
                        <Check size={12} strokeWidth={2.5} aria-hidden />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {pkg.featured ? (
                  <p className="px-3 pb-1 text-[11px] font-medium tracking-[0.12em] text-slate-500 uppercase">
                    Most partners live here
                  </p>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>

        <p className="packages-note text-center text-sm text-slate-500">
          Custom packages available based on business objectives.
        </p>
      </Container>
    </section>
  )
}
