export function RocketMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="rocketFill" x1="70" y1="8" x2="20" y2="110" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F5C242" />
          <stop offset="0.3" stopColor="#7CDE4A" />
          <stop offset="0.72" stopColor="#00C2F0" />
          <stop offset="1" stopColor="#1A86E0" />
        </linearGradient>
        <linearGradient id="trailFill" x1="62" y1="70" x2="8" y2="145" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00C2F0" />
          <stop offset="0.6" stopColor="#F5A623" />
          <stop offset="1" stopColor="#F5C242" />
        </linearGradient>
      </defs>
      <path
        d="M62 78c-22 18-40 38-46 58"
        stroke="url(#trailFill)"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <rect x="14" y="102" width="9" height="9" rx="1.5" fill="#F5C242" />
      <rect x="28" y="114" width="7" height="7" rx="1.2" fill="#F59E0B" />
      <rect x="8" y="120" width="7" height="7" rx="1.2" fill="#38BDF8" />
      <rect x="38" y="128" width="6" height="6" rx="1" fill="#84CC16" />
      <rect x="20" y="134" width="5" height="5" rx="1" fill="#00C2F0" />
      <g transform="translate(78 62) rotate(-38)">
        <path
          d="M0-42c14 20 17 40 8 64L0 32  -8 20C-17-2-14-22 0-42z"
          fill="url(#rocketFill)"
        />
        <circle cy="-8" r="6.5" fill="#0B1A2E" />
        <path d="M-8 24l-18 15 16-6.5z" fill="#1A9FE0" />
        <path d="M8 24l18 15-16-6.5z" fill="#1A9FE0" />
      </g>
    </svg>
  )
}

export function LogoLockup({
  compact = false,
  className = '',
}: {
  compact?: boolean
  className?: string
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <RocketMark className={compact ? 'h-10 w-8' : 'h-12 w-10'} />
      <span className="leading-none">
        <span className="font-sans flex items-baseline text-[1.05rem] font-semibold tracking-tight sm:text-[1.15rem]">
          <span className="text-[#1578B8]">Digitz</span>
          <span className="text-[#58B832]">Creative</span>
        </span>
        {!compact ? (
          <span className="mt-1 flex items-center gap-2 text-[10px] font-medium tracking-[0.02em] text-muted">
            Elevating Brands Digitally
            <span className="hidden h-px w-6 bg-lime sm:block" />
          </span>
        ) : null}
      </span>
    </span>
  )
}
