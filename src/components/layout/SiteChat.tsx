import { useEffect, useId, useRef, useState } from 'react'
import { brand, whatsappUrl } from '../../data/content'

type Action = { href: string; label: string; external?: boolean }

type Msg = { id: number; from: 'bot' | 'user'; text: string; action?: Action }

const SUGGESTIONS = ['Services', 'Packages', 'Where are you?', 'How do we start?'] as const

function reply(raw: string): { text: string; action?: Action } {
  const q = raw.toLowerCase()
  const has = (...words: string[]) => words.some((word) => q.includes(word))

  if (has('package', 'pricing', 'price', 'cost', 'plan', 'rate', 'start', 'grow', 'scale')) {
    return {
      text: 'Three programs: Start, Grow, and Scale. Pricing is set against the brief, not a public rate card. Most partners sit in Grow.',
      action: { href: '#packages', label: 'See packages' },
    }
  }
  if (has('service', 'offer', 'do you', 'what do', 'reel', 'influencer', 'social', 'ads', 'website', 'branding')) {
    return {
      text: 'We handle influencer marketing, reel production, social media, personal branding, performance marketing, and digital work — websites, apps, WhatsApp, and listings.',
      action: { href: '#services', label: 'See services' },
    }
  }
  if (has('where', 'location', 'trichy', 'address', 'based', 'city')) {
    return {
      text: `${brand.name} is based in ${brand.location}. We work with local businesses and brands across Tamil Nadu.`,
      action: { href: '#contact', label: 'Contact' },
    }
  }
  if (has('who', 'founder', 'faizal', 'about', 'team')) {
    return {
      text: `${brand.founder} leads the studio. The work is content-first and built around business goals, not just views.`,
      action: { href: '#founder', label: 'Meet the founder' },
    }
  }
  if (has('process', 'how do', 'how we', 'steps', 'work with')) {
    return {
      text: 'The path is Discover, Strategize, Create, Promote, Optimize, then Grow. One team stays on the work from strategy through reporting.',
      action: { href: '#process', label: 'See the process' },
    }
  }
  if (has('whatsapp', 'call', 'phone', 'contact', 'talk', 'hello', 'hi', 'hey')) {
    return {
      text: `The fastest way to talk is WhatsApp on ${brand.phoneDisplay}.`,
      action: {
        href: whatsappUrl(),
        label: 'Open WhatsApp',
        external: true,
      },
    }
  }
  return {
    text: 'I can help with services, packages, location, and how a project starts. For a quote or a specific brief, message the team on WhatsApp.',
    action: {
      href: whatsappUrl(`Hi ${brand.name} — ${raw.trim()}`),
      label: 'Continue on WhatsApp',
      external: true,
    },
  }
}

function ChatMark({ open }: { open: boolean }) {
  return (
    <span className={`site-chat-mark ${open ? 'is-open' : ''}`} aria-hidden>
      <svg className="site-chat-mark-bubble" viewBox="0 0 32 32">
        <ellipse className="site-chat-toy-shadow" cx="16" cy="27.4" rx="5.4" ry="1.15" />
        <g className="site-chat-toy">
          <path className="site-chat-toy-antenna" d="M16 5.4v2.6" />
          <circle className="site-chat-toy-bob" cx="16" cy="4.2" r="1.45" />
          <circle className="site-chat-toy-face" cx="16" cy="16.2" r="8.1" />
          <ellipse className="site-chat-toy-eye" cx="13.15" cy="15.2" rx="1.15" ry="1.45" />
          <ellipse className="site-chat-toy-eye" cx="18.85" cy="15.2" rx="1.15" ry="1.45" />
          <path className="site-chat-toy-smile" d="M12.7 18.2c.95 1.15 2.05 1.65 3.3 1.65s2.35-.5 3.3-1.65" />
        </g>
      </svg>
      <svg className="site-chat-mark-x" viewBox="0 0 32 32">
        <path
          d="M11 11l10 10M21 11 11 21"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}

export function SiteChat() {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 1,
      from: 'bot',
      text: 'Hi. Ask about services, packages, or how to start.',
    },
  ])
  const listId = useId()
  const field = useRef<HTMLInputElement>(null)
  const nextId = useRef(2)
  const asked = messages.some((msg) => msg.from === 'user')
  const visible = asked ? messages.slice(-2) : messages

  useEffect(() => {
    if (open) field.current?.focus()
  }, [open])

  const ask = (value: string) => {
    const trimmed = value.trim()
    if (!trimmed) return
    const answer = reply(trimmed)
    const userId = nextId.current++
    const botId = nextId.current++
    setMessages((prev) => [
      ...prev,
      { id: userId, from: 'user', text: trimmed },
      { id: botId, from: 'bot', text: answer.text, action: answer.action },
    ])
    setText('')
  }

  return (
    <div className={`site-chat ${open ? 'is-open' : ''}`}>
      {open ? (
        <section className="site-chat-panel" aria-label="Digitz assistant">
          <span className="site-chat-sheen" aria-hidden />
          <span className="site-chat-rim" aria-hidden />
          <header className="site-chat-head">
            <span className="site-chat-badge" aria-hidden>
              Dg
            </span>
            <div className="site-chat-head-copy">
              <p className="site-chat-title">Digitz</p>
              <p className="site-chat-kicker">Studio assistant</p>
            </div>
            <button type="button" className="site-chat-close" onClick={() => setOpen(false)}>
              Close
            </button>
          </header>

          <div id={listId} className="site-chat-log" role="log" aria-live="polite">
            {visible.map((msg) => (
              <div key={msg.id} className={`site-chat-msg site-chat-msg--${msg.from}`}>
                <p>{msg.text}</p>
                {msg.action ? (
                  <a
                    href={msg.action.href}
                    className="site-chat-action"
                    {...(msg.action.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    onClick={() => {
                      if (!msg.action?.external) setOpen(false)
                    }}
                  >
                    {msg.action.label}
                  </a>
                ) : null}
              </div>
            ))}
            {asked ? null : (
              <div className="site-chat-suggestions" aria-label="Suggested questions">
                {SUGGESTIONS.map((item) => (
                  <button key={item} type="button" className="site-chat-chip" onClick={() => ask(item)}>
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            className="site-chat-form"
            onSubmit={(e) => {
              e.preventDefault()
              ask(text)
            }}
          >
            <input
              ref={field}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="site-chat-input"
              placeholder="Ask a question"
              aria-label="Message"
              maxLength={240}
            />
            <button type="submit" className="site-chat-send" aria-label="Send">
              <svg viewBox="0 0 16 16" aria-hidden>
                <path
                  d="M3 8h10M9.2 4.4 13 8l-3.8 3.6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        </section>
      ) : null}

      <button
        type="button"
        className={`site-chat-toggle ${open ? 'is-open' : ''}`}
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={open ? 'Close chat' : 'Open chat'}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="site-chat-toggle-sheen" aria-hidden />
        <ChatMark open={open} />
      </button>
    </div>
  )
}
