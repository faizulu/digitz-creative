type LogoMarkProps = {
  className?: string
  title?: string
}

/** Compact original Digitz mark for light UI (nav). */
export function LogoMark({ className = '', title = 'Digitz Creative' }: LogoMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 420 96"
      fill="none"
      className={className}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <defs>
        <linearGradient id="dcRocket" x1="48" y1="8" x2="18" y2="78" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F5C242" />
          <stop offset="0.3" stopColor="#7CDE4A" />
          <stop offset="0.7" stopColor="#00C2F0" />
          <stop offset="1" stopColor="#1A86E0" />
        </linearGradient>
        <linearGradient id="dcTrail" x1="52" y1="48" x2="8" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00C2F0" />
          <stop offset="0.55" stopColor="#F5A623" />
          <stop offset="1" stopColor="#F5C242" />
        </linearGradient>
        <linearGradient id="dcDigitz" x1="108" y1="56" x2="250" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1486D4" />
          <stop offset="1" stopColor="#2BB4F0" />
        </linearGradient>
        <linearGradient id="dcCreative" x1="250" y1="56" x2="410" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5BC43A" />
          <stop offset="1" stopColor="#8BE05A" />
        </linearGradient>
      </defs>

      <path
        d="M46 58c-16 12-30 26-34 40"
        stroke="url(#dcTrail)"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <rect x="10" y="70" width="7" height="7" rx="1.2" fill="#F5C242" />
      <rect x="20" y="78" width="5.5" height="5.5" rx="1" fill="#F59E0B" />
      <rect x="6" y="82" width="5.5" height="5.5" rx="1" fill="#38BDF8" />
      <rect x="28" y="86" width="4.5" height="4.5" rx="1" fill="#84CC16" />

      <g transform="translate(58 50) rotate(-38)">
        <path
          d="M0-30c11 14 13 28 6 46L0 24l-6-8C-13-2-11-16 0-30z"
          fill="url(#dcRocket)"
        />
        <circle cy="-6" r="4.8" fill="#0B1220" />
        <path d="M-6 18l-13 11 12-5z" fill="#1A9FE0" />
        <path d="M6 18l13 11-12-5z" fill="#1A9FE0" />
      </g>

      <text
        x="102"
        y="62"
        fontFamily="Inter, Arial Black, Helvetica, sans-serif"
        fontSize="36"
        fontWeight="800"
        letterSpacing="-0.02em"
        fill="url(#dcDigitz)"
      >
        Digitz
      </text>
      <text
        x="228"
        y="62"
        fontFamily="Inter, Arial Black, Helvetica, sans-serif"
        fontSize="36"
        fontWeight="800"
        letterSpacing="-0.02em"
        fill="url(#dcCreative)"
      >
        Creative
      </text>
    </svg>
  )
}
