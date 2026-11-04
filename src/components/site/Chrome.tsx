import { Link } from '@tanstack/react-router'
import { useEffect, useState, type ReactNode } from 'react'
import { ArrowUp, ArrowUpRight, Check, Copy } from 'lucide-react'
import { CONTACT_EMAIL, KOFI_URL, SOCIALS, USERNAME, trackSpotlight, type Social } from '@/lib/site'

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/contact', label: 'Contact' },
] as const

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo" aria-label={`${USERNAME} home`}>
          <span className="nav-logo-mark" aria-hidden="true" />
          <span className="nav-logo-text">{USERNAME}</span>
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="nav-link"
              activeProps={{ className: 'is-active', 'aria-current': 'page' }}
              activeOptions={{ exact: true }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

/** Thin gold bar at the top of the viewport showing page scroll. */
export function ScrollProgress() {
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0
      document.documentElement.style.setProperty('--page-progress', p.toFixed(4))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div className="scroll-progress" aria-hidden="true" />
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-name">{USERNAME}</span>
          <span className="footer-meta">© {new Date().getFullYear()} · made by me</span>
        </div>
        <nav className="footer-links" aria-label="Footer">
          <Link to="/contact">Contact</Link>
          {SOCIALS.filter((s) => s.href).map((s) => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.name}
            </a>
          ))}
          <a href={KOFI_URL} target="_blank" rel="noopener noreferrer">
            Ko-fi
          </a>
        </nav>
        <button
          type="button"
          className="footer-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Back to top <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  )
}

/** macOS-style window frame — the site's signature panel. */
export function Window({
  title,
  icon,
  children,
  className = '',
  ...rest
}: {
  title: string
  icon?: ReactNode
  children: ReactNode
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`window ${className}`} {...rest}>
      <div className="window-bar">
        <div className="window-lights" aria-hidden="true">
          <span className="light close" />
          <span className="light min" />
          <span className="light max" />
        </div>
        <div className="window-title">
          {icon}
          {title}
        </div>
      </div>
      <div className="window-body">{children}</div>
    </div>
  )
}

/** Copies text to the clipboard; `copied` flips back after a moment. */
export function useCopy() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1800)
    return () => clearTimeout(t)
  }, [copied])

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      return true
    } catch {
      return false
    }
  }

  return { copied, copy }
}

export function CopyEmailButton({ className = 'btn btn-ghost' }: { className?: string }) {
  const { copied, copy } = useCopy()

  return (
    <button
      type="button"
      className={className}
      onClick={async () => {
        if (!(await copy(CONTACT_EMAIL))) window.location.href = `mailto:${CONTACT_EMAIL}`
      }}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
    </button>
  )
}

/**
 * A social profile. Opens the link, or for copy-only platforms (Discord)
 * copies the username and says so.
 */
export function SocialLink({
  social: s,
  variant,
  index,
  style,
}: {
  social: Social
  variant: 'card' | 'row'
  index?: number
  style?: React.CSSProperties
}) {
  const { copied, copy } = useCopy()
  const isCard = variant === 'card'
  const handle = copied ? 'copied!' : s.handle

  const inner = (
    <>
      {!isCard && index !== undefined && (
        <span className="social-row-index">{String(index + 1).padStart(2, '0')}</span>
      )}
      <span className="social-icon">{s.icon}</span>
      {isCard ? (
        <span className="social-text">
          <span className="social-name">{s.name}</span>
          <span className="social-handle" aria-live="polite">{handle}</span>
        </span>
      ) : (
        <>
          <span className="social-name">{s.name}</span>
          <span className="social-handle" aria-live="polite">{handle}</span>
        </>
      )}
      {s.copy ? (
        copied ? <Check className="social-arrow" size={16} /> : <Copy className="social-arrow" size={16} />
      ) : (
        <ArrowUpRight className="social-arrow" size={isCard ? 18 : 16} />
      )}
    </>
  )

  const className = isCard ? 'social-card card' : 'social-row'
  const extra = isCard ? { 'data-reveal': true, onPointerMove: trackSpotlight, style } : {}

  if (s.copy) {
    const text = s.copy
    return (
      <button
        type="button"
        className={className}
        onClick={() => copy(text)}
        aria-label={`Copy ${s.name} username ${s.copy}`}
        {...extra}
      >
        {inner}
      </button>
    )
  }

  return (
    <a href={s.href} target="_blank" rel="noopener noreferrer" className={className} {...extra}>
      {inner}
    </a>
  )
}

/**
 * Fades in every [data-reveal] element on the page as it enters the
 * viewport. Elements stay visible without JS (see styles.css).
 */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)'))
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}
