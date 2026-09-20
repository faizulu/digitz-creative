import { motion, useReducedMotion } from 'framer-motion'
import { why } from '../../data/content'
import { Container } from '../ui/Container'

export function Why() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="why" className="relative overflow-hidden py-20 text-white sm:py-24">
      {/* Ambient gradient blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute top-[-10%] left-[-5%] h-[420px] w-[420px] rounded-full bg-indigo-500/25 blur-3xl" />
        <div className="absolute top-[35%] right-[-8%] h-[480px] w-[480px] rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-[-15%] left-[30%] h-[380px] w-[380px] rounded-full bg-violet-500/20 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="mb-12 md:mb-14">
          <p className="mb-3 flex items-center gap-3 text-[12px] font-medium text-white/55">
            <span className="text-cyan-300">10</span>
            <span className="h-px w-6 bg-white/20" />
            Why Digitz Creative
          </p>
          <h2 className="section-hero-title max-w-3xl text-[clamp(1.5rem,3.2vw,2.25rem)] leading-[1.25] font-semibold tracking-[-0.02em] text-white">
            Five reasons owners <span className="text-cyan-300">stay with the work.</span>
          </h2>
        </div>

        <ol className="flex flex-col gap-3 sm:gap-4">
          {why.map((item, i) => {
            const index = String(i + 1).padStart(2, '0')
            return (
              <motion.li
                key={item.title}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -2,
                        scale: 1.01,
                        backgroundColor: 'rgba(255,255,255,0.07)',
                        borderColor: 'rgba(255,255,255,0.2)',
                        transition: { duration: 0.35, ease: 'easeOut' },
                      }
                }
                className="grid gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-5 py-5 backdrop-blur-lg sm:grid-cols-12 sm:items-baseline sm:gap-8 sm:px-7 sm:py-6"
              >
                <span className="font-mono text-sm font-medium tracking-wide text-cyan-300 sm:col-span-2">
                  {index}
                </span>
                <h3 className="text-lg font-semibold tracking-tight text-white sm:col-span-3">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/65 sm:col-span-7">{item.body}</p>
              </motion.li>
            )
          })}
        </ol>
      </Container>
    </section>
  )
}
