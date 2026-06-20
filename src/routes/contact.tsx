import { createFileRoute } from '@tanstack/react-router'
import { Mail, ArrowUpRight, ShieldAlert } from 'lucide-react'

export const Route = createFileRoute('/contact')({
  component: Contact,
})

const CONTACT_EMAIL = 'blurredbusinessemail@gmail.com'

function Contact() {
  return (
    <>
      <style>{`
        .contact-shell {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
        }

        .contact-shell * {
          box-sizing: border-box;
        }

        .contact-wrap {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 3rem 1rem;
        }

        .contact-card {
          max-width: 760px;
          width: 100%;
          margin: 0 auto;
          background: rgba(14,14,18,0.72);
          border: 1px solid var(--border);
          border-radius: 12px;
          backdrop-filter: blur(18px) saturate(140%);
          box-shadow: 0 30px 80px -20px rgba(0,0,0,0.8);
          overflow: hidden;
        }

        .contact-titlebar {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          height: 38px;
          padding: 0 1rem;
          background: linear-gradient(180deg, rgba(38,38,48,0.9), rgba(26,26,34,0.9));
          border-bottom: 1px solid rgba(0,0,0,0.5);
          user-select: none;
        }

        .contact-title {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.16em;
          color: var(--text);
          text-transform: uppercase;
        }

        .contact-body {
          padding: 2.5rem 2rem 2.25rem;
          color: var(--text);
        }

        .contact-body h1,
        .contact-body p,
        .contact-body span,
        .contact-body a {
          color: var(--text) !important;
        }

        .contact-lights {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .contact-light {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          position: relative;
          box-shadow: inset 0 0 0 0.5px rgba(0,0,0,0.35);
        }

        .contact-light.close { background: #ff5f57; }
        .contact-light.min { background: #febc2e; }
        .contact-light.max { background: #28c840; }

        .contact-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.35rem;
          padding: 0.5rem 0.7rem;
          border: 1px solid rgba(212,178,90,0.22);
          background: rgba(212,178,90,0.06);
          color: var(--accent-bright);
          font-family: var(--font-mono);
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .contact-note {
          display: flex;
          gap: 0.8rem;
          align-items: flex-start;
          max-width: 42rem;
          margin: 1.5rem 0 1.75rem;
          padding: 1rem 1rem;
          border-left: 1px solid rgba(212,178,90,0.3);
          background: rgba(255,255,255,0.02);
          color: var(--muted) !important;
          line-height: 1.75;
        }

        .contact-note svg {
          flex-shrink: 0;
          margin-top: 0.15rem;
          color: var(--accent) !important;
        }

        .contact-email {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.95rem 1.1rem;
          border: 1px solid var(--border);
          background: rgba(14,14,18,0.72);
          color: #ffffff !important;
          text-decoration: none;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          backdrop-filter: blur(14px);
          transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
        }

        .contact-email:hover {
          border-color: rgba(212,178,90,0.55);
          background: rgba(212,178,90,0.08);
          transform: translateY(-1px);
        }

        @media (max-width: 640px) {
          .contact-body {
            padding: 2rem 1.25rem;
          }
        }
      `}</style>
      <div className="contact-shell">
        <div className="contact-wrap">
          <div className="contact-card">
            <div className="contact-titlebar">
              <div className="contact-lights">
                <span className="contact-light close" />
                <span className="contact-light min" />
                <span className="contact-light max" />
              </div>
              <div className="contact-title">contact.app</div>
            </div>
            <div className="contact-body">
              <div className="contact-badge">03 - Contact</div>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
                  lineHeight: 1,
                  margin: '0 0 1rem',
                  color: 'var(--text)',
                }}
              >
                Send your question here.
              </h1>
              <p
                style={{
                  maxWidth: '42rem',
                  margin: '0',
                  color: 'var(--text)',
                  fontSize: '0.95rem',
                  lineHeight: 1.8,
                }}
              >
                Use the email below for work, questions, or anything you want to
                discuss.
              </p>

              <div className="contact-note">
                <ShieldAlert size={16} />
                <span>
                  Any trolling, spam, or nonsense will be ignored and blocked.
                  Keep it direct and useful.
                </span>
              </div>

              <a href={`mailto:${CONTACT_EMAIL}`} className="contact-email">
                <Mail size={16} />
                {CONTACT_EMAIL}
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
