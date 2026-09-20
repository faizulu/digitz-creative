import { Check } from 'lucide-react'
import { packages, whatsappUrl } from '../../data/content'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'

export function Packages() {
  return (
    <section id="packages" className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
            <p className="mb-3 text-[12px] font-medium tracking-[0.08em] text-slate-400">
              <span className="text-slate-500">11</span>
              <span className="mx-2 text-slate-300">/</span>
              Packages
            </p>
            <h2 className="section-hero-title text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15] font-bold tracking-[-0.03em] text-slate-900">
              Start. Grow. Scale.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-slate-500">
              Simple structure, custom scoped. Pricing is set against the brief and the business —
              never published as a fake rate card.
            </p>
          </div>
        </Reveal>

        <div className="grid items-stretch gap-5 lg:grid-cols-3 lg:gap-6">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 70}>
              <article
                className={`flex h-full flex-col rounded-[2rem] bg-white p-3 shadow-[0_18px_50px_-24px_rgba(15,23,42,0.18)] sm:p-3.5 ${
                  pkg.featured ? 'lg:-translate-y-2' : ''
                }`}
              >
                {/* Inner header block */}
                <div
                  className={`rounded-[1.5rem] p-5 sm:p-6 ${
                    pkg.featured
                      ? 'bg-gradient-to-br from-[#E8EEF8] via-[#EEF0F8] to-[#F3EAF6]'
                      : 'bg-[#F4F4F4]'
                  }`}
                >
                  <span className="inline-flex rounded-full border border-black/[0.06] bg-white px-3 py-1 text-[11px] font-semibold tracking-wide text-slate-800 shadow-sm">
                    {pkg.name}
                  </span>

                  <h3 className="mt-5 text-[clamp(1.75rem,2.4vw,2.15rem)] leading-none font-bold tracking-tight text-slate-900">
                    {pkg.name}
                  </h3>
                  <p className="mt-3 text-[14px] leading-snug text-slate-500">{pkg.audience}</p>

                  <a
                    href={whatsappUrl(
                      `Hi Digitz Creative — I'm interested in the ${pkg.name} program for my business.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-4 py-3.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Talk about {pkg.name}
                  </a>
                </div>

                {/* Feature list */}
                <ul className="flex flex-1 flex-col gap-3.5 px-2 pt-6 pb-3 sm:px-3 sm:pt-7 sm:pb-4">
                  {pkg.points.map((point) => (
                    <li key={point} className="flex gap-3 text-[14px] leading-snug text-slate-600">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                        <Check size={12} strokeWidth={2.5} aria-hidden />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {pkg.featured ? (
                  <p className="px-3 pb-2 text-[11px] font-medium tracking-[0.12em] text-slate-400 uppercase">
                    Most partners live here
                  </p>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-slate-500 sm:text-left">
          Custom packages available based on business objectives.
        </p>
      </Container>
    </section>
  )
}
