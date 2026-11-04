import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight, Coffee, Mail, ShieldAlert } from 'lucide-react'
import { CopyEmailButton, Window, useReveal } from '@/components/site/Chrome'
import { CONTACT_EMAIL, KOFI_URL, SOCIALS } from '@/lib/site'

export const Route = createFileRoute('/contact')({
  head: () => ({ meta: [{ title: 'Contact | BLURRED' }] }),
  component: Contact,
})

function Contact() {
  useReveal()

  return (
    <div className="page">
      <div className="container contact-grid">
        <div data-reveal>
          <div className="eyebrow">Contact</div>
          <h1 className="h1">
            Send your <span className="gold">question</span> here.
          </h1>
          <p className="lede">
            Use the email below for work, questions, or anything you want to discuss. I read
            everything that&rsquo;s worth reading.
          </p>

          <a href={`mailto:${CONTACT_EMAIL}`} className="email-big">
            <Mail size={18} />
            <span>
              {CONTACT_EMAIL.split('@')[0]}
              <wbr />@{CONTACT_EMAIL.split('@')[1]}
            </span>
            <ArrowUpRight size={18} />
          </a>

          <div className="cta-actions">
            <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-primary">
              <Mail size={14} /> Open mail app
            </a>
            <CopyEmailButton />
          </div>

          <div className="note">
            <ShieldAlert size={16} />
            <span>
              Any trolling, spam, or nonsense will be ignored and blocked. Keep it direct and
              useful.
            </span>
          </div>
        </div>

        <div className="contact-side" data-reveal>
          <Window title="socials.app">
            <ul className="social-rows">
              {SOCIALS.map((s, i) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="social-row">
                    <span className="social-row-index">{String(i + 1).padStart(2, '0')}</span>
                    <span className="social-icon">{s.icon}</span>
                    <span className="social-name">{s.name}</span>
                    <span className="social-handle">{s.handle}</span>
                    <ArrowUpRight className="social-arrow" size={16} />
                  </a>
                </li>
              ))}
            </ul>
          </Window>

          <Window title="donate.app">
            <div className="donate-label">
              <Coffee size={14} /> Support the work
            </div>
            <p className="muted-p">
              Ko-fi donations go toward hosting, tools, and time spent refining the site.
            </p>
            <a href={KOFI_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Ko-fi <ArrowUpRight size={14} />
            </a>
          </Window>
        </div>
      </div>
    </div>
  )
}
