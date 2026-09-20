import { useEffect, useId, useState } from 'react'

const POINTS: [number, number][] = [
  [0, 168],
  [80, 152],
  [160, 140],
  [240, 128],
  [320, 108],
  [400, 92],
  [480, 62],
  [600, 38],
]

function toPath(points: [number, number][]) {
  return points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ')
}

const LINE = toPath(POINTS)
const AREA = `${LINE} L600 200 L0 200 Z`
const END = POINTS[POINTS.length - 1]

type GrowthChartProps = {
  active: boolean
}

export function GrowthChart({ active }: GrowthChartProps) {
  const gradId = useId().replace(/:/g, '')
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    if (!active) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setDrawn(true)
      return
    }
    const t = window.setTimeout(() => setDrawn(true), 60)
    return () => window.clearTimeout(t)
  }, [active])

  return (
    <div className="impact-chart relative overflow-hidden rounded-[20px] border border-white/60 bg-white px-5 pt-6 pb-5 shadow-[0_12px_36px_rgba(40,50,60,0.06)] sm:px-8 sm:pt-7 sm:pb-6">
      <p className="text-[10px] font-semibold tracking-[0.18em] text-[#9AA3AD] uppercase sm:text-[11px]">
        Growth Trajectory
      </p>

      <div className="relative mt-5 flex flex-wrap justify-end gap-2 sm:absolute sm:inset-x-0 sm:top-5 sm:z-[2] sm:mt-0 sm:px-8">
        <span className="impact-pill tone-lime">+88% Growth</span>
        <span className="impact-pill tone-cyan">+42% Conversion</span>
        <span className="impact-pill tone-gold">3.2× ROI</span>
      </div>

      <svg
        viewBox="0 0 600 200"
        className="mt-4 h-[150px] w-full sm:mt-10 sm:h-[190px] lg:h-[200px]"
        role="img"
        aria-label="Growth trend from 2024 to 2026"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5BA4D9" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#5BA4D9" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[45, 90, 135].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="600"
            y2={y}
            stroke="#E8E4DC"
            strokeWidth="1"
          />
        ))}

        <path
          d={AREA}
          fill={`url(#${gradId})`}
          className={`impact-chart-area ${drawn ? 'is-drawn' : ''}`}
        />
        <path
          d={LINE}
          fill="none"
          stroke="#5BA4D9"
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          className={`impact-chart-line ${drawn ? 'is-drawn' : ''}`}
        />
        <circle
          cx={END[0]}
          cy={END[1]}
          r="5.5"
          fill="#6FBF73"
          className={`impact-chart-dot ${drawn ? 'is-drawn' : ''}`}
        />
      </svg>

      <div className="mt-2 flex justify-between border-t border-[#EFEBE3] pt-3 text-[10px] font-medium tracking-[0.16em] text-[#9AA3AD] uppercase sm:text-[11px]">
        <span>2024</span>
        <span>2025</span>
        <span>2026</span>
      </div>
    </div>
  )
}
