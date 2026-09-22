import { type FormEvent, useState } from 'react'
import {
  ArrowUpRight,
  Clock,
  Globe,
  Instagram,
  MapPin,
  Phone,
} from 'lucide-react'
import { brand, finalCta, whatsappUrl } from '../../data/content'
import { ActionWord } from '../ui/HeroActionText'

/** Tiruchirappalli city centre */
const TRICHY = { lat: 10.7905, lng: 78.7047, zoom: 13 }

const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${TRICHY.lng - 0.05}%2C${TRICHY.lat - 0.038}%2C${TRICHY.lng + 0.05}%2C${TRICHY.lat + 0.038}&layer=mapnik&marker=${TRICHY.lat}%2C${TRICHY.lng}`

const mapLink = `https://www.openstreetmap.org/?mlat=${TRICHY.lat}&mlon=${TRICHY.lng}#map=${TRICHY.zoom}/${TRICHY.lat}/${TRICHY.lng}`

const details = [
  {
    icon: MapPin,
    label: 'Address',
    value: `${brand.location}, India`,
  },
  {
    icon: Globe,
    label: 'Web',
    value: brand.websiteDisplay,
    href: brand.websiteUrl,
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon - Sat · By appointment',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: brand.phoneDisplay,
    href: `tel:${brand.phoneTel}`,
  },
] as const

export function FinalCta() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const text = `Hi Digitz Creative - I'm ${name || '[name]'}${email ? ` (${email})` : ''}. ${message || finalCta.body}`
    window.open(whatsappUrl(text), '_blank', 'noopener,noreferrer')
  }

  return (
    <section
      id="contact"
      className="contact-section"
      aria-labelledby="contact-heading"
    >
      <div className="ct-shell">
        <span className="ct-shell-sheen" aria-hidden />
        <span className="ct-shell-rim" aria-hidden />

        <div className="ct-stage">
          {/* Left — identity + details */}
          <div className="ct-info">
            <p className="ct-eyebrow">Let&apos;s talk</p>
            <h2 id="contact-heading" className="ct-title">
              <ActionWord>Contact</ActionWord>
            </h2>
            <p className="ct-lead">
              {finalCta.headline} {finalCta.headline2}
            </p>
            <p className="ct-body">{finalCta.body}</p>

            <ul className="ct-details">
              {details.map((item) => {
                const Icon = item.icon
                const inner = (
                  <>
                    <span className="ct-detail-icon" aria-hidden>
                      <Icon size={15} strokeWidth={1.75} />
                    </span>
                    <span className="ct-detail-copy">
                      <span className="ct-detail-label">{item.label}</span>
                      <span className="ct-detail-value">{item.value}</span>
                    </span>
                  </>
                )

                return (
                  <li key={item.label}>
                    {'href' in item && item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={
                          item.href.startsWith('http')
                            ? 'noopener noreferrer'
                            : undefined
                        }
                        className="ct-detail"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="ct-detail">{inner}</div>
                    )}
                  </li>
                )
              })}
            </ul>

            <a
              href={brand.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ct-ig"
            >
              <Instagram size={14} strokeWidth={1.75} aria-hidden />
              {brand.instagram}
            </a>
          </div>

          {/* Center — WhatsApp form */}
          <form onSubmit={onSubmit} className="ct-form">
            <span className="ct-form-sheen" aria-hidden />
            <div className="ct-form-inner">
              <h3 className="ct-form-title">Drop us a line</h3>
              <p className="ct-form-note">
                Continues on WhatsApp · {brand.phoneDisplay}
              </p>

              <label className="ct-field">
                <span>Your name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  autoComplete="name"
                  placeholder=" "
                />
              </label>

              <label className="ct-field">
                <span>Your email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  autoComplete="email"
                  placeholder=" "
                />
              </label>

              <label className="ct-field">
                <span>Message</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  name="message"
                  rows={2}
                  placeholder="Reels, ads, influencer, a full growth program..."
                />
              </label>

              <button type="submit" className="ct-submit group">
                Send on WhatsApp
                <span className="ct-submit-mark" aria-hidden>
                  <ArrowUpRight size={14} strokeWidth={2} />
                </span>
              </button>
            </div>
          </form>

          {/* Right — compact Trichy map card */}
          <aside className="ct-map">
            <div className="ct-map-frame">
              <iframe
                title="Digitz Creative - Trichy, Tamil Nadu"
                src={mapSrc}
                className="ct-map-iframe"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ct-map-link"
            >
              Open Trichy map
              <ArrowUpRight size={12} strokeWidth={2} aria-hidden />
            </a>
          </aside>
        </div>
      </div>
    </section>
  )
}
