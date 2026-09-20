import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

/** Layout wrapper — sections stay visible while scrolling (no hide-on-scroll). */
export function Reveal({ children, className = '' }: RevealProps) {
  return <div className={className || undefined}>{children}</div>
}
