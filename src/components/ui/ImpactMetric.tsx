import { useCountUp } from '../../hooks/useCountUp'

type Accent = 'orange' | 'blue' | 'green'

type ImpactMetricProps = {
  index: string
  label: string
  target: number
  format: (n: number) => string
  description: string
  detail: string
  active: boolean
  accent: Accent
  elevated?: boolean
}

const accents: Record<
  Accent,
  { dot: string; border: string; lift: string; value: string }
> = {
  orange: {
    dot: 'bg-[#F4A261]',
    border: 'border-transparent',
    lift: '',
    value: 'text-ink',
  },
  blue: {
    dot: 'bg-[#5BA4D9]',
    border: 'border-[#B8D9F0]',
    lift: 'impact-card-elevated',
    value: 'text-[#1E73B7]',
  },
  green: {
    dot: 'bg-[#6FBF73]',
    border: 'border-transparent',
    lift: '',
    value: 'text-ink',
  },
}

export function ImpactMetric({
  index,
  label,
  target,
  format,
  description,
  detail,
  active,
  accent,
  elevated = false,
}: ImpactMetricProps) {
  const value = useCountUp(target, active)
  const a = accents[accent]

  return (
    <article
      className={`impact-card group relative flex min-h-[210px] flex-col rounded-[20px] border bg-white p-7 shadow-[0_10px_30px_rgba(40,50,60,0.06)] transition-[transform,box-shadow] duration-300 ease-out sm:p-8 motion-safe:md:hover:-translate-y-1 motion-safe:md:hover:shadow-[0_16px_40px_rgba(40,50,60,0.1)] ${a.border} ${elevated || accent === 'blue' ? a.lift : ''}`}
    >
      <div className="flex items-center gap-2.5">
        <span className={`size-2 rounded-full ${a.dot}`} aria-hidden />
        <p className="text-[10px] font-medium tracking-[0.16em] text-[#9AA3AD] uppercase sm:text-[11px]">
          {index} · {label}
        </p>
      </div>

      <p
        className={`mt-7 text-[clamp(2.6rem,5.5vw,3.75rem)] leading-[0.92] font-extrabold tracking-[-0.035em] ${a.value}`}
      >
        {format(value)}
      </p>

      <p className="mt-3 text-[14px] font-medium text-[#6B7280] sm:text-[15px]">
        {description}
      </p>

      <p className="mt-0 max-h-0 overflow-hidden text-[12px] leading-relaxed text-[#9AA3AD] opacity-0 transition-all duration-300 ease-out group-hover:mt-3 group-hover:max-h-14 group-hover:opacity-100">
        {detail}
      </p>
    </article>
  )
}
