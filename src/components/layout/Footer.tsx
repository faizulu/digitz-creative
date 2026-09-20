import { LogoLockup } from '../brand/RocketMark'
import { brand, footerServices, whatsappUrl } from '../../data/content'

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" className="ft-ico" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.25">
      <path
        d="M7.2 3.8h2.4l1.2 3.2-1.6 1.2a12.5 12.5 0 0 0 5.6 5.6l1.2-1.6 3.2 1.2v2.4c0 .9-.7 1.7-1.6 1.8-7.4.6-13.4-5.4-12.8-12.8.1-.9.9-1.6 1.8-1.6Z"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconPin() {
  return (
    <svg viewBox="0 0 24 24" className="ft-ico" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" strokeLinejoin="round" />
      <circle cx="12" cy="11" r="1.8" />
    </svg>
  )
}

function IconAt() {
  return (
    <svg viewBox="0 0 24 24" className="ft-ico" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.25">
      <circle cx="12" cy="12" r="3.2" />
      <path d="M15.2 12v1.1a2.1 2.1 0 0 0 4.1 0V12a7.3 7.3 0 1 0-2.7 5.6" strokeLinecap="round" />
    </svg>
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="ft-site" aria-labelledby="footer-brand">
      <div className="ft-shell">
        <div className="ft-grid">
          <div className="ft-brand">
            <div id="footer-brand">
              <LogoLockup />
            </div>
            <p className="ft-lede">
              Digital marketing, content, branding, and growth — from Trichy, for
              business owners who want the work to show up on the balance sheet.
            </p>
            <a
              className="group ft-cta"
              href={whatsappUrl('Hi Digitz Creative — I’d like to start a project.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              Message on WhatsApp
              <span className="ft-cta-mark" aria-hidden>
                ↗
              </span>
            </a>
          </div>

          <div className="ft-rail">
            <div className="ft-col">
              <p className="ft-label">What we do</p>
              <ul className="ft-links">
                {footerServices.map((item) => (
                  <li key={item}>
                    <a href="#services">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ft-col">
              <p className="ft-label">Reach us</p>
              <ul className="ft-contact">
                <li>
                  <a href={`tel:${brand.phoneTel}`}>
                    <IconPhone />
                    <span className="tabular-nums">{brand.phoneDisplay}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={brand.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {brand.websiteDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={brand.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconAt />
                    {brand.instagram}
                  </a>
                </li>
                <li className="ft-meta">
                  <IconPin />
                  {brand.location}
                </li>
                <li className="ft-meta">Founder · {brand.founder}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="ft-bar">
          <p>
            © {year} {brand.name}
          </p>
          <nav className="ft-legal" aria-label="Legal">
            <a href="#contact">Privacy</a>
            <a href="#contact">Terms</a>
            <a
              href={brand.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
