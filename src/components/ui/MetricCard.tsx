type MetricCardProps = {
  metric: string
  value: string
  description: string
  accent?: boolean
  className?: string
}

/** Kept for compatibility — NumbersSection uses ImpactMetric */
export function MetricCard({
  metric,
  value,
  description,
  accent = false,
  className = '',
}: MetricCardProps) {
  return (
    <article
      className={`relative flex min-h-[200px] flex-col justify-between border border-line bg-surface p-6 ${className}`}
    >
      <p className="text-[10px] font-medium tracking-[0.14em] text-muted-2 uppercase">
        {metric}
      </p>
      <p
        className={`text-[clamp(2.5rem,5vw,3.5rem)] leading-none font-extrabold ${
          accent ? 'text-cyan' : 'text-ink'
        }`}
      >
        {value}
      </p>
      <p className="text-sm text-muted">{description}</p>
    </article>
  )
}
