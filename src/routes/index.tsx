import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Coffee, Mail } from 'lucide-react'
import { CopyEmailButton, SocialLink, Window, useReveal } from '@/components/site/Chrome'
import { useMusic } from '@/components/site/Music'
import {
  BIO,
  BIO_DETAIL,
  CONTACT_EMAIL,
  KOFI_URL,
  NOW,
  SOCIALS,
  STACK,
  TAGLINE,
  USERNAME,
  trackSpotlight,
} from '@/lib/site'

export const Route = createFileRoute('/')({
  component: Home,
})

// Deterministic so SSR and client markup match
const PARTICLES = [
  { left: 8, size: 2, dur: 16, delay: 0 },
  { left: 18, size: 1, dur: 22, delay: 4 },
  { left: 27, size: 3, dur: 19, delay: 8 },
  { left: 38, size: 2, dur: 25, delay: 2 },
  { left: 46, size: 1, dur: 14, delay: 11 },
  { left: 55, size: 2, dur: 21, delay: 6 },
  { left: 63, size: 3, dur: 18, delay: 13 },
  { left: 72, size: 1, dur: 24, delay: 3 },
  { left: 81, size: 2, dur: 17, delay: 9 },
  { left: 90, size: 2, dur: 23, delay: 15 },
]

const WIND = [
  { top: 18, len: 28, dur: 9, delay: 0, op: 0.45 },
  { top: 34, len: 36, dur: 7, delay: 1.5, op: 0.5 },
  { top: 52, len: 30, dur: 8.5, delay: 2, op: 0.45 },
  { top: 70, len: 34, dur: 7.5, delay: 4, op: 0.4 },
  { top: 86, len: 22, dur: 11, delay: 6, op: 0.35 },
]

const clamp01 = (n: number) => Math.max(0, Math.min(1, n))

function Home() {
  useReveal()
  const heroWrapRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)

  // Scroll-linked effects write CSS variables directly, so scrolling never re-renders React.
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const vh = window.innerHeight
      heroWrapRef.current?.style.setProperty('--reveal', clamp01(window.scrollY / (vh * 0.6)).toFixed(3))
      const about = aboutRef.current
      if (about) {
        const r = about.getBoundingClientRect()
        const p = clamp01((vh * 0.85 - r.top) / (r.height * 0.6))
        about.style.setProperty('--p', p.toFixed(3))
      }
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

  // Cursor-follow spotlight in the hero
  useEffect(() => {
    let raf = 0
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = heroRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
        el.style.setProperty('--my', `${e.clientY - rect.top}px`)
      })
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  const words = BIO.split(' ')

  return (
    <>
      <Intro />

      {/* ── Hero ── */}
      <div className="hero-wrap" ref={heroWrapRef}>
        <section className="hero" ref={heroRef} aria-label="Intro">
          <div className="hero-bg" aria-hidden="true">
            <div className="hero-orb a" />
            <div className="hero-orb b" />
            <div className="hero-grid" />
            <div className="hero-spotlight" />
            <div className="hero-particles">
              {PARTICLES.map((p, i) => (
                <span
                  key={i}
                  className="particle"
                  style={{
                    left: `${p.left}%`,
                    width: p.size,
                    height: p.size,
                    animationDuration: `${p.dur}s`,
                    animationDelay: `${p.delay}s`,
                  }}
                />
              ))}
            </div>
            <div className="hero-wind">
              {WIND.map((w, i) => (
                <span
                  key={i}
                  className="wind-streak"
                  style={{
                    top: `${w.top}%`,
                    width: `${w.len}vw`,
                    opacity: w.op,
                    animationDuration: `${w.dur}s`,
                    animationDelay: `${w.delay}s`,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="hero-corner tl">
            <span>blurr3d.co.uk</span>
            <span className="accent-dim">v2</span>
          </div>
          <div className="hero-corner bl">
            <span className="status-dot" aria-hidden="true" />
            online
          </div>
          <div className="hero-corner br">
            <span>keep scrolling</span>
            <span className="hero-meter" aria-hidden="true">
              <span />
            </span>
          </div>

          <div className="hero-center">
            <h1 className="hero-name">{USERNAME}</h1>
            <p className="hero-tagline">
              <span className="line" aria-hidden="true" />
              {TAGLINE}
              <span className="line" aria-hidden="true" />
            </p>
          </div>

          <div className="hero-hint" aria-hidden="true">
            <span>scroll</span>
            <span className="hint-line" />
          </div>
        </section>
      </div>

      {/* ── Stack marquee ── */}
      <div className="marquee" aria-label="Stuff I use">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <div className="marquee-group" key={k} aria-hidden={k === 1}>
              {STACK.map((s) => (
                <span key={s} className="marquee-item">
                  {s}
                  <span className="marquee-star" aria-hidden="true">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── About ── */}
      <section className="section about" ref={aboutRef} id="about">
        <div className="container">
          <div className="eyebrow" data-reveal>
            about
          </div>
          <p className="about-statement" style={{ '--n': words.length } as React.CSSProperties}>
            {words.map((w, i) => (
              <span key={i} className="word" style={{ '--i': i } as React.CSSProperties}>
                {w}{' '}
              </span>
            ))}
          </p>

          <div className="about-grid">
            <p className="about-detail" data-reveal>
              {BIO_DETAIL}
            </p>
            <Window title="now.txt" className="about-window" data-reveal>
              <dl className="spec">
                {NOW.map((row) => (
                  <div key={row.label}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
                <div>
                  <dt>status</dt>
                  <dd>
                    <span className="status-dot" aria-hidden="true" /> probably coding
                  </dd>
                </div>
              </dl>
            </Window>
          </div>
        </div>
      </section>

      {/* ── Socials ── */}
      <section className="section" id="socials">
        <div className="container">
          <div className="section-head" data-reveal>
            <div>
              <div className="eyebrow">socials</div>
              <h2 className="h2">where to find me.</h2>
            </div>
          </div>
          <div className="social-grid">
            {SOCIALS.map((s, i) => (
              <SocialLink key={s.name} social={s} variant="card" style={{ transitionDelay: `${i * 80}ms` }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact + Donate ── */}
      <section className="section cta" id="contact">
        <div className="container">
          <div className="cta-panel" data-reveal>
            <div className="eyebrow">contact</div>
            <h2 className="cta-title">
              want to talk?
              <br />
              <span className="gold">just email&nbsp;me.</span>
            </h2>
            <div className="cta-actions">
              <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-primary">
                <Mail size={14} /> Email me
              </a>
              <CopyEmailButton />
            </div>
          </div>

          <div className="donate card" data-reveal onPointerMove={trackSpotlight}>
            <div>
              <div className="donate-label">
                <Coffee size={14} /> ko-fi
              </div>
              <p>
                if you like what i&rsquo;m doing you can buy me a coffee. it helps pay for the domain and
                hosting.
              </p>
            </div>
            <a href={KOFI_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Ko-fi <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

/** Boot screen. ENTER is the click that unlocks audio. Shown once per visit. */
function Intro() {
  const { entered, markEntered, start } = useMusic()
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)
  const [gone, setGone] = useState(entered)
  const btnRef = useRef<HTMLButtonElement>(null)
  const ready = progress >= 100

  useEffect(() => {
    if (gone) return
    let p = 0
    const id = setInterval(() => {
      p = Math.min(100, p + Math.random() * 16 + 6)
      setProgress(Math.round(p))
      if (p >= 100) clearInterval(id)
    }, 90)
    return () => clearInterval(id)
  }, [gone])

  // Lock scroll while the loader is up
  useEffect(() => {
    if (gone) return
    window.scrollTo(0, 0)
    document.documentElement.classList.add('is-locked')
    return () => document.documentElement.classList.remove('is-locked')
  }, [gone])

  useEffect(() => {
    if (ready) btnRef.current?.focus({ preventScroll: true })
  }, [ready])

  const enter = useCallback(() => {
    start()
    setExiting(true)
    markEntered()
    setTimeout(() => setGone(true), 900)
  }, [start, markEntered])

  if (gone) return null

  return (
    <div className={`intro ${exiting ? 'is-exiting' : ''}`} role="dialog" aria-label="Welcome">
      <div className="intro-grid" aria-hidden="true" />
      <div className="intro-glow" aria-hidden="true" />
      <div className="intro-sig" aria-hidden="true">
        {USERNAME}
      </div>
      <div className="intro-bar">
        <div className="intro-row">
          <span>{ready ? 'ready' : 'loading'}</span>
          <span>{String(progress).padStart(3, '0')}%</span>
        </div>
        <div className="intro-track">
          <div className="intro-fill" style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
      </div>
      <button
        ref={btnRef}
        type="button"
        className={`intro-enter ${ready ? 'is-ready' : ''}`}
        onClick={enter}
        disabled={!ready}
      >
        Enter
      </button>
      <p className="intro-note">turn your sound on</p>
    </div>
  )
}
