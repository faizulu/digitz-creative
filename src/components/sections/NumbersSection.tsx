import { useCountUp, useInViewOnce } from '../../hooks/useCountUp'
import { impactMetrics, impactSection } from '../../data/content'
import { MagicLiquidCard } from '../ui/MagicLiquidCard'

function formatInt(n: number) {
  return `${n.toLocaleString('en-IN')}+`
}

const clientAvatars = [
  'https://i.pravatar.cc/48?img=12',
  'https://i.pravatar.cc/48?img=32',
  'https://i.pravatar.cc/48?img=47',
  'https://i.pravatar.cc/48?img=5',
]

export function NumbersSection() {
  const { ref, inView } = useInViewOnce<HTMLElement>(0.12)
  const clients = useCountUp(impactMetrics[0].target, inView)
  const leads = useCountUp(impactMetrics[1].target, inView, 1600)
  const revenue = useCountUp(100, inView, 1200)

  return (
    <section
      ref={ref}
      id="numbers"
      aria-labelledby="numbers-heading"
      className="impact-premium relative flex w-full items-center overflow-hidden"
    >
      <MagicLiquidCard
        active={inView}
        className={`impact-magic-panel ${inView ? 'is-in' : ''}`}
      >
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.18]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(140, 130, 122, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(140, 130, 122, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
          aria-hidden
        />

        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 z-0 hidden -translate-y-1/2 justify-end pr-6 select-none sm:pr-10 lg:flex lg:pr-16"
          aria-hidden
        >
          <p className="text-[clamp(5rem,17vw,14rem)] leading-none font-black tracking-tighter text-[#1C1A17]/[0.028] uppercase">
            Impact
          </p>
        </div>

        <div className="impact-premium-layout relative z-10 mx-auto grid w-full max-w-[1400px] items-start lg:items-center">
          <div className="impact-premium-copy relative flex flex-col justify-center gs-reveal">
            <div className="impact-premium-kicker flex items-center space-x-3">
              <span className="font-mono text-[10px] font-semibold tracking-[0.25em] text-indigo-700 uppercase">
                {impactSection.eyebrow}
              </span>
              <div className="h-px w-12 bg-indigo-200" />
            </div>

            <h2
              id="numbers-heading"
              className="impact-premium-title font-medium tracking-tight text-[#1A1816]"
            >
              {impactSection.titleLine1}
              <br />
              <span className="impact-premium-accent font-normal tracking-normal text-indigo-950 italic">
                {impactSection.titleLine2}
              </span>
            </h2>

            <div className="impact-premium-support max-w-sm border-l border-gray-300 pl-4 sm:pl-5">
              <p className="text-[13px] leading-snug text-[#55504C] sm:text-sm sm:leading-relaxed">
                {impactSection.support}
              </p>
            </div>

            <p className="impact-premium-note font-mono text-[10px] text-gray-400">
              * {impactSection.note}
            </p>
          </div>

          <div className="impact-premium-stage relative gs-reveal-item">
            <div className="impact-premium-atmos pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
              <div className="absolute top-1/4 right-1/4 h-80 w-80 rounded-full bg-[#B2F2BB]/[0.28] blur-[120px]" />
              <div className="absolute right-6 top-[18%] h-64 w-64 rounded-full bg-[#A2D2FF]/[0.26] blur-[100px]" />
              <div className="absolute right-10 bottom-1/4 h-72 w-72 rounded-full bg-[#FFD8A8]/[0.24] blur-[100px]" />
              <svg className="absolute inset-0 h-full w-full opacity-40">
                <line
                  x1="8%"
                  y1="48%"
                  x2="42%"
                  y2="28%"
                  stroke="#9CA3AF"
                  strokeWidth="1"
                  strokeDasharray="3 5"
                />
                <line
                  x1="8%"
                  y1="48%"
                  x2="72%"
                  y2="42%"
                  stroke="#9CA3AF"
                  strokeWidth="1"
                  strokeDasharray="3 5"
                />
                <line
                  x1="8%"
                  y1="48%"
                  x2="48%"
                  y2="78%"
                  stroke="#9CA3AF"
                  strokeWidth="1"
                  strokeDasharray="3 5"
                />
              </svg>
            </div>

            <div className="impact-core relative z-[1] hidden lg:grid">
              <div className="impact-core-shell impact-core-shell--outer" aria-hidden />
              <div className="impact-core-shell impact-core-shell--inner" aria-hidden />
              <div className="impact-core-sphere">
                <div className="impact-core-sphere-frost" aria-hidden />
              </div>
              <span className="impact-crystal impact-crystal--a" aria-hidden />
              <span className="impact-crystal impact-crystal--b" aria-hidden />
            </div>

            <div
              className={`impact-glass-card impact-card impact-card--clients ${inView ? 'is-in' : ''}`}
              style={{ transitionDelay: inView ? '80ms' : '0ms' }}
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <span className="font-mono text-[9px] tracking-widest text-gray-400 uppercase">
                  01. {impactMetrics[0].label}
                </span>
                <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[10px] font-medium text-emerald-700">
                  +14%
                </span>
              </div>
              <h3 className="impact-card-value font-bold tracking-tight text-gray-900">
                {formatInt(clients)}
              </h3>
              <p className="impact-card-desc mt-1 text-[11px] text-gray-500">
                {impactMetrics[0].description}
              </p>
              <div className="impact-card-extra mt-3 flex items-center gap-2">
                <div className="flex -space-x-2">
                  {clientAvatars.map((src) => (
                    <img
                      key={src}
                      src={src}
                      alt=""
                      className="h-6 w-6 rounded-full border-2 border-white object-cover"
                      loading="lazy"
                    />
                  ))}
                </div>
                <span className="text-[9px] font-medium text-gray-500">12% Growth this Mo.</span>
              </div>
            </div>

            <div
              className={`impact-glass-card impact-card impact-card--pipeline ${inView ? 'is-in' : ''}`}
              style={{ transitionDelay: inView ? '160ms' : '0ms' }}
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <span className="font-mono text-[9px] tracking-widest text-gray-400 uppercase">
                  02. {impactMetrics[1].label}
                </span>
                <span className="font-mono text-[9px] text-gray-400">Live Sync</span>
              </div>
              <h3 className="impact-card-value font-bold tracking-tight text-gray-900">
                {formatInt(leads)}
              </h3>
              <p className="impact-card-desc mt-1 text-[11px] text-gray-500">
                {impactMetrics[1].description}
              </p>
              <svg
                className="impact-card-extra mt-3 h-8 w-full"
                viewBox="0 0 120 32"
                aria-hidden
              >
                <polyline
                  fill="none"
                  stroke="#1578b8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="0,24 20,20 40,22 60,12 80,14 100,6 120,8"
                />
              </svg>
            </div>

            <div
              className={`impact-glass-card impact-card impact-card--revenue ${inView ? 'is-in' : ''}`}
              style={{ transitionDelay: inView ? '240ms' : '0ms' }}
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <span className="font-mono text-[9px] tracking-widest text-gray-400 uppercase">
                  03. {impactMetrics[2].label}
                </span>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
              </div>
              <h3 className="impact-card-value flex items-center font-bold tracking-tight text-gray-900">
                <span className="impact-card-currency mr-0.5 font-light text-gray-500">₹</span>
                {revenue >= 100 ? '1Cr+' : `${(revenue / 100).toFixed(1)}Cr`}
              </h3>
              <p className="impact-card-desc mt-1 text-[11px] text-gray-500">
                {impactMetrics[2].description}
              </p>
            </div>

            <div
              className={`impact-glass-card impact-card impact-card--efficiency ${inView ? 'is-in' : ''}`}
              style={{ transitionDelay: inView ? '320ms' : '0ms' }}
            >
              <span className="font-mono text-[9px] text-gray-400 uppercase">04. Efficiency</span>
              <span className="impact-card-value mt-0.5 block font-bold text-gray-900">75%</span>
              <span className="impact-card-desc text-[10px] text-gray-500">Team Hours Saved</span>
            </div>
          </div>
        </div>
      </MagicLiquidCard>
    </section>
  )
}
