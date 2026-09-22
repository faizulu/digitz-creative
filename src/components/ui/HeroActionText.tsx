import type { ReactNode } from 'react'

type HeroActionTextProps = {
  /** Full headline. The first match of `action` becomes the 3D word. */
  text: string
  /** Any word or short phrase inside `text` to render as the 3D action glyph. */
  action?: string
  className?: string
  as?: 'span' | 'h2' | 'h3'
  id?: string
  children?: ReactNode
}

/**
 * Section hero title helper: unique base font via className,
 * optional single-word (or phrase) 3D model treatment via `action`.
 */
export function HeroActionText({
  text,
  action,
  className = '',
  as: Tag = 'span',
  id,
  children,
}: HeroActionTextProps) {
  const content = children ?? renderWithAction(text, action)

  return (
    <Tag id={id} className={className}>
      {content}
    </Tag>
  )
}

export function ActionWord({ children }: { children: ReactNode }) {
  const label = typeof children === 'string' ? children : undefined
  const dataText = label?.toUpperCase()
  return (
    <span className="hero-action-3d" data-text={dataText} aria-label={label}>
      <span className="hero-action-3d__face">{children}</span>
    </span>
  )
}

function renderWithAction(text: string, action?: string): ReactNode {
  if (!action?.trim()) return text

  const needle = action.trim()
  const lower = text.toLowerCase()
  const at = lower.indexOf(needle.toLowerCase())
  if (at === -1) return text

  const before = text.slice(0, at)
  const word = text.slice(at, at + needle.length)
  const after = text.slice(at + needle.length)

  return (
    <>
      {before}
      <ActionWord>{word}</ActionWord>
      {after}
    </>
  )
}
