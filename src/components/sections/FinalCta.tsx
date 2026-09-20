import { type FormEvent, useState } from 'react'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { brand, finalCta, whatsappUrl } from '../../data/content'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'

/** Tiruchirappalli city centre */
const TRICHY = { lat: 10.7905, lng: 78.7047, zoom: 13 }

const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${TRICHY.lng - 0.06}%2C${TRICHY.lat - 0.045}%2C${TRICHY.lng + 0.06}%2C${TRICHY.lat + 0.045}&layer=mapnik&marker=${TRICHY.lat}%2C${TRICHY.lng}`

const mapLink = `https://www.openstreetmap.org/?mlat=${TRICHY.lat}&mlon=${TRICHY.lng}#map=${TRICHY.zoom}/${TRICHY.lat}/${TRICHY.lng}`

const details = [
  {
    icon: MapPin,
    label: 'Address',
    lines: [brand.location, 'Tamil Nadu, India'],
  },
  {
    icon: Clock,
    label: 'Opening Hours',
    lines: ['Mon – Sat · By appointment', 'WhatsApp replies through the week'],
  },
  {
    icon: Mail,
    label: 'Web',
    lines: [brand.websiteDisplay],
    href: brand.websiteUrl,
  },
  {
    icon: Phone,
    label: 'Phone',
    lines: [brand.phoneDisplay, brand.instagram],
    href: `tel:${brand.phoneTel}`,
  },
] as const

export function FinalCta() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const text = `Hi Digitz Creative — I'm ${name || '[name]'}${email ? ` (${email})` : ''}. ${message || finalCta.body}`
    window.open(whatsappUrl(text), '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="contact" className="contact-section relative overflow-hidden">
      {/* Banner */}
      <div className="contact-banner relative flex min-h-[280px] items-center justify-center sm:min-h-[340px] md:min-h-[400px]">
        <div className="contact-banner-media" aria-hidden />
        <div className="contact-banner-veil" aria-hidden />
        <Reveal className="relative z-10 px-6 text-center">
          <p className="mb-3 text-[11px] font-semibold tracking-[0.28em] text-white/70 uppercase">
            14 — Let’s talk
          </p>
          <h2 className="contact-serif text-[clamp(3rem,10vw,5.5rem)] leading-none font-normal text-white drop-shadow-sm">
            Contact
          </h2>
          <p className="mt-3 text-[15px] font-medium tracking-wide text-white/85 sm:text-base">
            let’s meet together.
          </p>
        </Reveal>
      </div>

      {/* Glass panel overlapping banner → map */}
      <Container className="relative z-20 -mt-16 sm:-mt-24 md:-mt-28">
        <div className="contact-glass-shell grid gap-8 rounded-[1.75rem] border border-white/50 bg-white/35 p-5 shadow-[0_40px_80px_-40px_rgba(15,23,42,0.35)] backdrop-blur-2xl sm:p-8 lg:grid-cols-12 lg:gap-10 lg:p-10">
          <Reveal className="lg:col-span-6 xl:col-span-7">
            <h3 className="contact-serif text-[clamp(1.75rem,3vw,2.35rem)] leading-tight text-slate-800">
              Contact Us
            </h3>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-500">
              {finalCta.headline} {finalCta.headline2} {finalCta.body}
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-7">
              {details.map((item) => {
                const Icon = item.icon
                const content = (
                  <>
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 text-[#2aa8a8]">
                      <Icon size={18} strokeWidth={1.75} aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase">
                        {item.label}
                      </span>
                      {item.lines.map((line) => (
                        <span
                          key={line}
                          className="mt-0.5 block text-[14px] leading-snug font-medium text-slate-700"
                        >
                          {line}
                        </span>
                      ))}
                    </span>
                  </>
                )

                return 'href' in item && item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex gap-3.5 transition-opacity hover:opacity-80"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.label} className="flex gap-3.5">
                    {content}
                  </div>
                )
              })}
            </div>
          </Reveal>

          {/* Floating glass form popup */}
          <Reveal delay={80} className="lg:col-span-6 xl:col-span-5">
            <form
              onSubmit={onSubmit}
              className="contact-form-popup relative rounded-[1.5rem] border border-white/60 bg-white/55 p-6 shadow-[0_32px_64px_-24px_rgba(15,23,42,0.4),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-xl sm:p-8 lg:-mt-6 lg:translate-y-[-0.5rem]"
            >
              <div
                className="pointer-events-none absolute -inset-px rounded-[1.5rem] bg-gradient-to-br from-white/40 via-transparent to-cyan-200/20"
                aria-hidden
              />
              <div className="relative">
                <h3 className="contact-serif text-[clamp(1.5rem,2.5vw,1.85rem)] text-[#2aa8a8]">
                  Drop us a line
                </h3>
                <p className="mt-1 text-[13px] text-slate-500">
                  Continues on WhatsApp — {brand.phoneDisplay}
                </p>

                <label className="mt-8 block">
                  <span className="mb-1.5 block text-[12px] font-medium text-slate-400">
                    Your Name
                  </span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    autoComplete="name"
                    className="w-full border-0 border-b border-slate-200/90 bg-transparent px-0 py-2.5 text-[15px] text-slate-800 outline-none transition-[border-color] placeholder:text-slate-300 focus:border-[#2aa8a8]"
                    placeholder=" "
                  />
                </label>

                <label className="mt-5 block">
                  <span className="mb-1.5 block text-[12px] font-medium text-slate-400">
                    Your Email
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    autoComplete="email"
                    className="w-full border-0 border-b border-slate-200/90 bg-transparent px-0 py-2.5 text-[15px] text-slate-800 outline-none transition-[border-color] placeholder:text-slate-300 focus:border-[#2aa8a8]"
                    placeholder=" "
                  />
                </label>

                <label className="mt-5 block">
                  <span className="mb-1.5 block text-[12px] font-medium text-slate-400">
                    Message
                  </span>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    name="message"
                    rows={3}
                    className="w-full resize-y border-0 border-b border-slate-200/90 bg-transparent px-0 py-2.5 text-[15px] text-slate-800 outline-none transition-[border-color] placeholder:text-slate-300 focus:border-[#2aa8a8]"
                    placeholder="Reels, ads, influencer, a full growth program…"
                  />
                </label>

                <button
                  type="submit"
                  className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-[#2aa8a8] px-5 py-3.5 text-[14px] font-semibold text-white shadow-[0_12px_28px_-12px_rgba(42,168,168,0.7)] transition hover:bg-[#239494] sm:w-auto sm:min-w-[180px]"
                >
                  Send Message!
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </Container>

      {/* Trichy map */}
      <div className="contact-map relative mt-10 sm:mt-14 md:mt-16">
        <div className="contact-map-frame">
          <iframe
            title="Digitz Creative — Trichy, Tamil Nadu"
            src={mapSrc}
            className="contact-map-iframe"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="contact-map-pin" aria-hidden>
            <span className="contact-map-pin-dot" />
            <span className="contact-map-pin-pulse" />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#f5f6f8] to-transparent" />
        <a
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-4 bottom-4 z-10 rounded-full border border-white/50 bg-white/70 px-3.5 py-2 text-[11px] font-semibold tracking-wide text-slate-700 uppercase backdrop-blur-md transition hover:bg-white"
        >
          Open Trichy map
        </a>
      </div>
    </section>
  )
}
