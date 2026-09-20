import type { ReactNode } from 'react'

export function SectionHeader({
  index,
  eyebrow,
  title,
  kicker,
}: {
  index: string
  eyebrow: string
  title: ReactNode
  kicker?: ReactNode
}) {
  return (
    <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <p className="mb-3 flex items-center gap-3 text-[12px] font-medium text-muted">
          <span className="text-cyan">{index}</span>
          <span className="h-px w-6 bg-line" />
          <span>{eyebrow}</span>
        </p>
        <h2 className="section-hero-title text-[clamp(1.5rem,3.2vw,2.25rem)] leading-[1.25] font-semibold tracking-[-0.02em] text-ink">
          {title}
        </h2>
      </div>
      {kicker ? (
        <p className="max-w-sm text-sm leading-relaxed text-muted md:pb-1">{kicker}</p>
      ) : null}
    </div>
  )
}
