import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight, Coffee, Mail, ShieldAlert } from 'lucide-react'
import { CopyEmailButton, SocialLink, Window, useReveal } from '@/components/site/Chrome'
import { CONTACT_EMAIL, KOFI_URL, SOCIALS } from '@/lib/site'

export const Route = createFileRoute('/contact')({
  head: () => ({ meta: [{ title: 'contact | BLURRED' }] }),
  component: Contact,
})

function Contact() {
  useReveal()

  return (
    <div className="page">
      <div className="container contact-grid">
        <div data-reveal>
          <div className="eyebrow">contact</div>
          <h1 className="h1">
            send&nbsp;me&nbsp;a <span className="gold">message.</span>
          </h1>
          <p className="lede">
            questions, work stuff, or just saying hi. email is the easiest way to reach me, or add
            me on discord.
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
              trolls and spam get ignored and blocked.
            </span>
          </div>
        </div>

        <div className="contact-side" data-reveal>
          <Window title="socials.app">
            <ul className="social-rows">
              {SOCIALS.map((s, i) => (
                <li key={s.name}>
                  <SocialLink social={s} variant="row" index={i} />
                </li>
              ))}
            </ul>
          </Window>

          <Window title="ko-fi.app">
            <div className="donate-label">
              <Coffee size={14} /> buy me a coffee
            </div>
            <p className="muted-p">
              totally optional. it helps pay for the domain and hosting.
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
