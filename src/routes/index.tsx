import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState, useCallback } from 'react'

export const Route = createFileRoute('/')({
  component: Portfolio,
})

const USERNAME = 'BLURRED'

// Pre-computed particle positions — deterministic so SSR and client markup match
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
  { left: 13, size: 1, dur: 20, delay: 7 },
  { left: 67, size: 2, dur: 26, delay: 1 },
]

// Pre-computed wind streaks — deterministic so SSR and client markup match
const WIND_STREAKS = [
  { top: 14, len: 28, dur: 9, delay: 0, op: 0.5 },
  { top: 23, len: 18, dur: 13, delay: 3, op: 0.35 },
  { top: 35, len: 36, dur: 7, delay: 1.5, op: 0.6 },
  { top: 44, len: 22, dur: 11, delay: 5, op: 0.4 },
  { top: 52, len: 30, dur: 8.5, delay: 2, op: 0.55 },
  { top: 61, len: 16, dur: 14, delay: 6.5, op: 0.3 },
  { top: 70, len: 34, dur: 7.5, delay: 4, op: 0.5 },
  { top: 79, len: 20, dur: 12, delay: 1, op: 0.4 },
  { top: 88, len: 26, dur: 10, delay: 7, op: 0.45 },
]

const SOCIALS = [
  {
    name: 'TikTok',
    handle: '@skid.tech',
    href: 'https://www.tiktok.com/@skid.tech',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.66a8.16 8.16 0 004.77 1.52V6.7a4.85 4.85 0 01-1-.01z" />
      </svg>
    ),
  },
  {
    name: 'Discord',
    handle: 'bl0rred',
    href: 'https://discord.com/users/bl0rred',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 00-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 00-5.487 0 12.36 12.36 0 00-.617-1.23A.077.077 0 008.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 00-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 00.031.055 20.03 20.03 0 005.993 2.98.078.078 0 00.084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 01-1.872-.878.075.075 0 01-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 01.078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 01.079.009c.12.098.245.195.372.288a.075.075 0 01-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 00-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 00.084.028 19.963 19.963 0 006.002-2.981.076.076 0 00.032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 00-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    handle: '@Armand220',
    href: 'https://github.com/Armand220',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
]

export default function Portfolio() {
  const [loadPhase, setLoadPhase] = useState<'booting' | 'ready' | 'done'>('booting')
  const [progress, setProgress] = useState(0)
  const [showEnter, setShowEnter] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [volume, setVolume] = useState(50)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [musicReady, setMusicReady] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const ytPlayerRef = useRef<any>(null)

  // Loading animation — stops at 100% and shows ENTER button
  useEffect(() => {
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 18 + 4
      if (p >= 100) {
        p = 100
        setProgress(100)
        clearInterval(interval)
        setTimeout(() => setShowEnter(true), 400)
      } else {
        setProgress(Math.round(p))
      }
    }, 120)
    return () => clearInterval(interval)
  }, [])

  // ENTER click — user gesture unlocks audio, then dismisses loading screen
  const handleEnter = useCallback(() => {
    setShowEnter(false)
    setLoadPhase('ready')
    setTimeout(() => setLoadPhase('done'), 900)
    if (ytPlayerRef.current) {
      try {
        ytPlayerRef.current.unMute()
        ytPlayerRef.current.setVolume(50)
        ytPlayerRef.current.playVideo()
      } catch (_) {}
    }
  }, [])

  // YouTube Player setup
  useEffect(() => {
    if (typeof window === 'undefined') return

    const initPlayer = () => {
      if (!document.getElementById('yt-player')) return
      ytPlayerRef.current = new (window as any).YT.Player('yt-player', {
        height: '1',
        width: '1',
        videoId: 'As1bpICMhzs',
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          loop: 1,
          playlist: 'As1bpICMhzs',
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: (event: any) => {
            setMusicReady(true)
            event.target.setVolume(50)
            // Stay muted until user clicks ENTER — that gesture unlocks audio
          },
          onStateChange: (event: any) => {
            setMusicPlaying(event.data === 1)
          },
        },
      })
    }

    if ((window as any).YT?.Player) {
      initPlayer()
    } else {
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        document.head.appendChild(tag)
      }
      const prev = (window as any).onYouTubeIframeAPIReady
      ;(window as any).onYouTubeIframeAPIReady = () => {
        if (prev) prev()
        initPlayer()
      }
    }
  }, [])

  // Scroll tracking
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Cursor-follow spotlight in the hero — pure CSS var update, no re-render
  useEffect(() => {
    if (typeof window === 'undefined') return
    let raf = 0
    const move = (e: PointerEvent) => {
      const el = heroRef.current
      if (!el) return
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value)
    setVolume(val)
    if (ytPlayerRef.current) {
      ytPlayerRef.current.setVolume(val)
      if (val > 0 && !musicPlaying && musicReady) {
        ytPlayerRef.current.playVideo()
      }
    }
  }

  const toggleMusic = () => {
    if (!ytPlayerRef.current) return
    if (musicPlaying) {
      ytPlayerRef.current.pauseVideo()
    } else {
      ytPlayerRef.current.playVideo()
    }
  }

  const vh = typeof window !== 'undefined' ? window.innerHeight : 800

  // Username blur: full blur at 0 scroll, clear at 60vh scroll
  const blurProgress = Math.min(scrollY / (vh * 0.6), 1)
  const blurPx = (1 - blurProgress) * 24
  const usernameOpacity = 0.15 + blurProgress * 0.85

  // Description fade in: starts at 40vh scroll
  const descProgress = Math.max(0, Math.min((scrollY - vh * 0.4) / (vh * 0.5), 1))

  // Socials fade in: starts at 90vh scroll
  const socialsProgress = Math.max(0, Math.min((scrollY - vh * 0.9) / (vh * 0.4), 1))

  // Overall scroll progress for the top progress bar
  const docHeight = typeof document !== 'undefined'
    ? document.documentElement.scrollHeight - vh
    : 1
  const scrollProgress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0

  const mainVisible = loadPhase !== 'booting'

  return (
    <>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
        rel="stylesheet"
      />

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #060608;
          --surface: #0e0e12;
          --border: #1c1c26;
          --text: #ece9f3;
          --muted: #6a6882;
          --accent: #d4b25a;
          --accent-bright: #f0d486;
          --accent-dim: #7d6630;
          --cool: #6a72c4;
          --font-display: 'Syne', sans-serif;
          --font-mono: 'Space Mono', monospace;
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-mono);
          overflow-x: hidden;
        }

        ::selection {
          background: rgba(212,178,90,0.22);
          color: var(--accent-bright);
        }

        /* ── Scroll progress ── */
        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--accent-dim), var(--accent-bright));
          box-shadow: 0 0 10px rgba(212,178,90,0.6);
          z-index: 500;
          transition: width 0.1s linear;
        }

        /* ── Noise overlay ── */
        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.5;
        }

        /* ── Cinematic vignette ── */
        body::after {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 90;
          background: radial-gradient(ellipse 120% 100% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%);
        }

        /* ── Loading Screen ── */
        .loader {
          position: fixed;
          inset: 0;
          background: var(--bg);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .loader.exiting {
          opacity: 0;
          transform: scale(1.04);
          pointer-events: none;
        }

        .loader.gone {
          display: none;
        }

        .loader-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 60px 60px;
          opacity: 0.4;
        }

        .loader-glow {
          position: absolute;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%);
          border-radius: 50%;
        }

        .loader-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          color: var(--accent-dim);
          text-transform: uppercase;
          z-index: 1;
        }

        .loader-bar-wrap {
          width: min(380px, 80vw);
          z-index: 1;
        }

        .loader-bar-track {
          height: 1px;
          background: var(--border);
          position: relative;
          overflow: visible;
        }

        .loader-bar-fill {
          height: 1px;
          background: var(--accent);
          transition: width 0.12s ease;
          position: relative;
          box-shadow: 0 0 12px var(--accent), 0 0 24px rgba(201,168,76,0.3);
        }

        .loader-bar-fill::after {
          content: '';
          position: absolute;
          right: -1px;
          top: -3px;
          width: 3px;
          height: 7px;
          background: var(--accent);
        }

        .loader-pct {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--muted);
          margin-top: 0.75rem;
          letter-spacing: 0.15em;
        }

        .loader-sig {
          font-family: var(--font-display);
          font-size: clamp(2rem, 8vw, 5rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--text);
          z-index: 1;
          opacity: 0.05;
          filter: blur(8px);
          animation: loader-sig-pulse 2s ease-in-out infinite;
        }

        @keyframes loader-sig-pulse {
          0%, 100% { opacity: 0.04; }
          50% { opacity: 0.08; }
        }

        /* ── Enter Button ── */
        .loader-enter-btn {
          background: transparent;
          border: 1px solid var(--accent);
          color: var(--accent);
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          padding: 0.75rem 2.5rem;
          cursor: pointer;
          z-index: 1;
          animation: enter-pulse 1.8s ease-in-out infinite;
          transition: background 0.25s ease, box-shadow 0.25s ease;
        }

        .loader-enter-btn:hover {
          background: rgba(201,168,76,0.08);
          box-shadow: 0 0 30px rgba(201,168,76,0.3);
          animation: none;
          box-shadow: 0 0 30px rgba(201,168,76,0.3);
        }

        @keyframes enter-pulse {
          0%, 100% { box-shadow: 0 0 8px rgba(201,168,76,0.15); }
          50% { box-shadow: 0 0 22px rgba(201,168,76,0.35); }
        }

        /* ── Main ── */
        .portfolio {
          min-height: 300vh;
          opacity: 0;
          transition: opacity 0.6s ease 0.2s;
        }

        .portfolio.visible {
          opacity: 1;
        }

        /* ── Hero ── */
        .hero {
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: sticky;
          top: 0;
          overflow: hidden;
          --mx: 50%;
          --my: 50%;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 50% at 50% 60%, rgba(212,178,90,0.05) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 20% 80%, rgba(106,114,196,0.04) 0%, transparent 60%);
        }

        /* ── Cursor-follow spotlight ── */
        .hero-spotlight {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(380px circle at var(--mx) var(--my), rgba(240,212,134,0.07) 0%, transparent 65%);
          transition: background 0.18s ease-out;
          z-index: 1;
        }

        /* ── Floating atmosphere particles ── */
        .hero-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background: var(--accent-bright);
          opacity: 0;
          box-shadow: 0 0 6px rgba(240,212,134,0.6);
          animation: float-up linear infinite;
        }

        @keyframes float-up {
          0% { transform: translate(0, 20px) scale(0.6); opacity: 0; }
          15% { opacity: 0.7; }
          50% { transform: translate(34px, -45vh) scale(0.85); }
          85% { opacity: 0.7; }
          100% { transform: translate(70px, -90vh) scale(1); opacity: 0; }
        }

        /* ── Drifting wind streaks ── */
        .hero-wind {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 1;
        }

        .wind-streak {
          position: absolute;
          left: -40%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(240,212,134,0.5), transparent);
          border-radius: 1px;
          will-change: transform, opacity;
          animation: wind-blow linear infinite;
        }

        @keyframes wind-blow {
          0% { transform: translate(0, 0) scaleX(0.4); opacity: 0; }
          12% { opacity: 1; }
          50% { transform: translate(80vw, 14px) scaleX(1); }
          88% { opacity: 1; }
          100% { transform: translate(165vw, 28px) scaleX(0.4); opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .wind-streak, .particle, .hero-orb { animation: none; }
        }

        /* ── Drifting ambient orbs ── */
        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          pointer-events: none;
          will-change: transform;
        }

        .hero-orb.a {
          width: 46vw;
          height: 46vw;
          background: radial-gradient(circle, rgba(212,178,90,0.10) 0%, transparent 65%);
          top: 8%;
          left: 12%;
          animation: orb-drift-a 22s ease-in-out infinite;
        }

        .hero-orb.b {
          width: 38vw;
          height: 38vw;
          background: radial-gradient(circle, rgba(106,114,196,0.09) 0%, transparent 65%);
          bottom: 6%;
          right: 10%;
          animation: orb-drift-b 28s ease-in-out infinite;
        }

        @keyframes orb-drift-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(6vw, 4vh) scale(1.12); }
        }

        @keyframes orb-drift-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-5vw, -5vh) scale(1.08); }
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 80px 80px;
          opacity: 0.25;
        }

        .hero-corner {
          position: absolute;
          font-family: var(--font-mono);
          font-size: 0.55rem;
          letter-spacing: 0.2em;
          color: var(--muted);
          opacity: 0.5;
        }

        .hero-corner.tl { top: 2rem; left: 2rem; }
        .hero-corner.tr { top: 2rem; right: 2rem; text-align: right; }
        .hero-corner.bl { bottom: 2rem; left: 2rem; }
        .hero-corner.br { bottom: 2rem; right: 2rem; text-align: right; }

        .hero-username {
          font-family: var(--font-display);
          font-size: clamp(4rem, 15vw, 12rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 0.9;
          text-align: center;
          z-index: 1;
          user-select: none;
          transition: filter 0.05s linear, opacity 0.05s linear;
          background: linear-gradient(170deg, #fbf3d8 0%, var(--accent-bright) 32%, var(--accent) 55%, var(--accent-dim) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          background-size: 100% 200%;
          animation: sheen 8s ease-in-out infinite;
          text-shadow: 0 0 60px rgba(212,178,90,0.12);
        }

        @keyframes sheen {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 0% 100%; }
        }

        .hero-scroll-hint {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.7rem;
          z-index: 2;
        }

        .hint-chevron {
          color: var(--accent);
          animation: chevron-bob 1.8s ease-in-out infinite;
        }

        @keyframes chevron-bob {
          0%, 100% { transform: translateY(0); opacity: 0.35; }
          50% { transform: translateY(6px); opacity: 0.9; }
        }

        @keyframes hint-fade {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }

        .hint-line {
          width: 1px;
          height: 36px;
          background: linear-gradient(to bottom, transparent, var(--accent-dim));
        }

        .hint-text {
          font-size: 0.5rem;
          letter-spacing: 0.4em;
          color: var(--muted);
          text-transform: uppercase;
        }

        /* ── macOS Window Chrome ── */
        .mac-window {
          max-width: 680px;
          width: 100%;
          background: rgba(14,14,18,0.72);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          backdrop-filter: blur(18px) saturate(140%);
          -webkit-backdrop-filter: blur(18px) saturate(140%);
          box-shadow:
            0 1px 0 rgba(255,255,255,0.04) inset,
            0 30px 80px -20px rgba(0,0,0,0.8),
            0 0 0 1px rgba(0,0,0,0.4);
        }

        .mac-titlebar {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          height: 38px;
          padding: 0 1rem;
          background: linear-gradient(180deg, rgba(38,38,48,0.9), rgba(26,26,34,0.9));
          border-bottom: 1px solid rgba(0,0,0,0.5);
          position: relative;
          user-select: none;
        }

        .mac-lights {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .mac-light {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          position: relative;
          box-shadow: inset 0 0 0 0.5px rgba(0,0,0,0.35);
        }

        .mac-light.close { background: #ff5f57; }
        .mac-light.min { background: #febc2e; }
        .mac-light.max { background: #28c840; }

        .mac-titlebar:hover .mac-light.close::after,
        .mac-titlebar:hover .mac-light.min::after,
        .mac-titlebar:hover .mac-light.max::after {
          opacity: 0.55;
        }

        .mac-light.close::after,
        .mac-light.min::after,
        .mac-light.max::after {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.2s ease;
          background-position: center;
          background-repeat: no-repeat;
        }

        .mac-light.close::after {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M3.5 3.5l5 5M8.5 3.5l-5 5' stroke='%23590000' stroke-width='1.3' stroke-linecap='round'/%3E%3C/svg%3E");
        }
        .mac-light.min::after {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M3 6h6' stroke='%23593b00' stroke-width='1.3' stroke-linecap='round'/%3E%3C/svg%3E");
        }
        .mac-light.max::after {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M4 4l4 4M8 4l-4 4' stroke='%23003d00' stroke-width='1.3' stroke-linecap='round'/%3E%3C/svg%3E");
        }

        .mac-title {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          color: var(--muted);
          text-transform: lowercase;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          pointer-events: none;
        }

        .mac-title svg {
          opacity: 0.7;
        }

        .mac-body {
          padding: 2.5rem 2.25rem;
        }

        @media (max-width: 600px) {
          .mac-body { padding: 2rem 1.5rem; }
          .mac-title { font-size: 0.6rem; }
        }

        /* ── Description ── */
        .desc-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          position: relative;
        }

        .desc-inner {
          max-width: 640px;
          width: 100%;
        }

        .desc-tag {
          font-size: 0.6rem;
          letter-spacing: 0.35em;
          color: var(--accent);
          text-transform: uppercase;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .desc-tag::before {
          content: '';
          width: 2rem;
          height: 1px;
          background: var(--accent);
        }

        .desc-text {
          font-family: var(--font-display);
          font-size: clamp(1.4rem, 3vw, 2rem);
          font-weight: 600;
          line-height: 1.5;
          color: var(--text);
          margin-bottom: 2rem;
        }

        .desc-sub {
          font-size: 0.85rem;
          line-height: 1.8;
          color: var(--muted);
          border-left: 1px solid var(--border);
          padding-left: 1.5rem;
        }

        /* ── Socials ── */
        .socials-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          position: relative;
        }

        .socials-inner {
          max-width: 640px;
          width: 100%;
        }

        .socials-tag {
          font-size: 0.6rem;
          letter-spacing: 0.35em;
          color: var(--accent);
          text-transform: uppercase;
          margin-bottom: 3rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .socials-tag::before {
          content: '';
          width: 2rem;
          height: 1px;
          background: var(--accent);
        }

        .social-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .social-item {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.5rem 1.25rem;
          border-bottom: 1px solid var(--border);
          text-decoration: none;
          color: var(--text);
          transition: color 0.25s ease, padding 0.25s ease, background 0.25s ease;
          position: relative;
          overflow: hidden;
        }

        .social-item:first-child {
          border-top: 1px solid var(--border);
        }

        .social-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--accent);
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 0.3s ease;
        }

        .social-item:hover::before {
          transform: scaleY(1);
        }

        .social-item:hover {
          color: var(--accent-bright);
          padding-left: 1.75rem;
          background: linear-gradient(90deg, rgba(212,178,90,0.05), transparent 60%);
        }

        .social-index {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          color: var(--muted);
          flex-shrink: 0;
          transition: color 0.25s ease;
        }

        .social-item:hover .social-index {
          color: var(--accent);
        }

        .social-icon {
          opacity: 0.5;
          flex-shrink: 0;
          transition: opacity 0.2s ease;
        }

        .social-item:hover .social-icon {
          opacity: 1;
        }

        .social-name {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          flex: 1;
        }

        .social-handle {
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          color: var(--muted);
          font-family: var(--font-mono);
        }

        .social-arrow {
          opacity: 0;
          transform: translateX(-8px);
          transition: all 0.2s ease;
          color: var(--accent);
        }

        .social-item:hover .social-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* ── Footer ── */
        .footer {
          padding: 4rem 2rem;
          text-align: center;
          border-top: 1px solid var(--border);
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          color: var(--muted);
          text-transform: uppercase;
          position: relative;
        }

        .footer::before {
          content: '';
          position: absolute;
          top: -1px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
        }

        /* ── Volume Slider ── */
        .vol-slider {
          -webkit-appearance: none;
          appearance: none;
          transform: rotate(-90deg);
          width: 110px;
          height: 4px;
          background: transparent;
          cursor: pointer;
          outline: none;
        }

        .vol-slider::-webkit-slider-runnable-track {
          height: 2px;
          background: var(--border);
          border-radius: 1px;
        }

        .vol-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--accent);
          margin-top: -4px;
          box-shadow: 0 0 6px rgba(201,168,76,0.5);
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }

        .vol-slider:hover::-webkit-slider-thumb {
          box-shadow: 0 0 12px rgba(201,168,76,0.8);
          transform: scale(1.2);
        }

        .vol-slider::-moz-range-track {
          height: 2px;
          background: var(--border);
          border-radius: 1px;
        }

        .vol-slider::-moz-range-thumb {
          width: 10px;
          height: 10px;
          border: none;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 6px rgba(201,168,76,0.5);
        }

        .vol-btn {
          background: none;
          border: none;
          padding: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s ease, transform 0.15s ease;
        }

        .vol-btn:hover {
          transform: scale(1.15);
        }

        @media (max-width: 600px) {
          .hero-corner.tr, .hero-corner.br { display: none; }
          .vol-panel { left: 0.75rem !important; }
        }
      `}</style>

      {/* ── Loading Screen ── */}
      <div
        className={`loader ${loadPhase === 'ready' ? 'exiting' : ''} ${loadPhase === 'done' ? 'gone' : ''}`}
      >
        <div className="loader-grid" />
        <div className="loader-glow" />
        <div className="loader-sig" aria-hidden="true">{USERNAME}</div>
        <div className="loader-bar-wrap">
          <div className="loader-label">Initializing</div>
          <div style={{ marginTop: '1.2rem' }}>
            <div className="loader-bar-track">
              <div className="loader-bar-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="loader-pct">{progress.toString().padStart(3, '0')} %</div>
          </div>
        </div>
        {showEnter && (
          <button className="loader-enter-btn" onClick={handleEnter}>
            Enter
          </button>
        )}
      </div>

      {/* ── Hidden YouTube Player ── */}
      <div
        id="yt-player"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          opacity: 0,
          pointerEvents: 'none',
        }}
      />

      {/* ── Volume Panel ── */}
      <div
        className="vol-panel"
        style={{
          position: 'fixed',
          left: '1.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.6rem',
          opacity: loadPhase === 'done' ? 1 : 0,
          transition: 'opacity 0.8s ease 0.6s',
          pointerEvents: loadPhase === 'done' ? 'auto' : 'none',
        }}
      >
        {/* Speaker / toggle button */}
        <button
          className="vol-btn"
          onClick={toggleMusic}
          style={{ color: musicPlaying ? 'var(--accent)' : 'var(--muted)' }}
          aria-label={musicPlaying ? 'Pause music' : 'Play music'}
        >
          {volume === 0 ? (
            /* Muted icon */
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.63 3.63a.996.996 0 000 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .72.73 1.18 1.39.91.8-.33 1.55-.77 2.22-1.31l1.34 1.34a.996.996 0 101.41-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4-.59-.23-1.22.23-1.22.86v.19c0 .38.25.71.61.85C17.18 6.54 19 9.06 19 12zm-8.71-6.29l-.17.17L12 7.76V6.41c0-.89-1.08-1.33-1.71-.7zM16.5 12A4.5 4.5 0 0014 7.97v1.79l2.48 2.48c.01-.08.02-.16.02-.24z"/>
            </svg>
          ) : musicPlaying ? (
            /* Playing icon */
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          ) : (
            /* Paused/stopped icon */
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
            </svg>
          )}
        </button>

        {/* Vertical slider container */}
        <div style={{ height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px' }}>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="vol-slider"
            aria-label="Music volume"
          />
        </div>

        {/* VOL label */}
        <span style={{
          fontSize: '0.42rem',
          letterSpacing: '0.3em',
          color: 'var(--muted)',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-mono)',
        }}>
          VOL
        </span>
      </div>

      {/* ── Main Portfolio ── */}
      <div ref={mainRef} className={`portfolio ${mainVisible ? 'visible' : ''}`}>
        {/* Scroll progress */}
        <div
          className="scroll-progress"
          style={{ width: `${scrollProgress * 100}%`, opacity: loadPhase === 'done' ? 1 : 0 }}
        />
        {/* Hero */}
        <div style={{ height: '160vh', position: 'relative' }}>
          <section className="hero" ref={heroRef}>
            <div className="hero-bg" />
            <div className="hero-orb a" />
            <div className="hero-orb b" />
            <div className="hero-grid" />
            <div className="hero-spotlight" />
            <div className="hero-particles" aria-hidden="true">
              {PARTICLES.map((p, i) => (
                <span
                  key={i}
                  className="particle"
                  style={{
                    left: `${p.left}%`,
                    bottom: `-${p.size}px`,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    animationDuration: `${p.dur}s`,
                    animationDelay: `${p.delay}s`,
                  }}
                />
              ))}
            </div>

            <div className="hero-wind" aria-hidden="true">
              {WIND_STREAKS.map((w, i) => (
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

            <div className="hero-corner tl">
              <div>PORTFOLIO</div>
              <div style={{ marginTop: '0.3rem', color: 'var(--accent-dim)' }}>v1.0</div>
            </div>
            <div className="hero-corner tr">
              <div>EST. 2024</div>
            </div>
            <div className="hero-corner bl" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  boxShadow: '0 0 6px var(--accent)',
                  animation: 'loader-sig-pulse 1.5s ease-in-out infinite',
                }}
              />
              ONLINE
            </div>
            <div className="hero-corner br">SCROLL TO REVEAL</div>

            <h1
              className="hero-username"
              style={{
                filter: `blur(${blurPx}px)`,
                opacity: usernameOpacity,
              }}
            >
              {USERNAME}
            </h1>

            <div className="hero-scroll-hint" style={{ opacity: blurProgress > 0.3 ? 0 : 1, transition: 'opacity 0.4s ease' }}>
              <span className="hint-text">scroll</span>
              <div className="hint-line" />
              <svg className="hint-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </section>
        </div>

        {/* Description */}
        <section
          className="desc-section"
          style={{
            opacity: descProgress,
            transform: `translateY(${(1 - descProgress) * 40}px)`,
            transition: 'none',
          }}
        >
          <div className="desc-inner">
            <div className="mac-window">
              <div className="mac-titlebar">
                <div className="mac-lights">
                  <span className="mac-light close" />
                  <span className="mac-light min" />
                  <span className="mac-light max" />
                </div>
                <div className="mac-title">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-3.5 3.5-6 8-6s8 2.5 8 6" />
                  </svg>
                  about-me.app
                </div>
              </div>
              <div className="mac-body">
                <div className="desc-tag">01 — About</div>
                <p className="desc-text">
                  Grinding to learn code, one line at a time. Building my presence online and figuring it all out along the way.
                </p>
                <p className="desc-sub">
                  Aspiring developer · Growing creator · Learning in public.
                  Just starting the coding journey and sharing the process as it happens. Here for the grind, the growth, and everyone who wants to come along for the ride.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Socials */}
        <section
          className="socials-section"
          style={{
            opacity: socialsProgress,
            transform: `translateY(${(1 - socialsProgress) * 60}px)`,
            transition: 'none',
          }}
        >
          <div className="socials-inner">
            <div className="mac-window">
              <div className="mac-titlebar">
                <div className="mac-lights">
                  <span className="mac-light close" />
                  <span className="mac-light min" />
                  <span className="mac-light max" />
                </div>
                <div className="mac-title">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16v16H4z" />
                    <path d="M4 9h16M9 9v11" />
                  </svg>
                  socials.app
                </div>
              </div>
              <div className="mac-body">
                <div className="socials-tag">02 — Find me</div>
                <nav className="social-list" aria-label="Social links">
                  {SOCIALS.map((s, i) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-item"
                      style={{
                        transitionDelay: `${i * 60}ms`,
                        opacity: socialsProgress > 0.2 ? 1 : 0,
                        transform: `translateX(${socialsProgress > 0.2 ? 0 : -20}px)`,
                        transition: `opacity 0.4s ease ${i * 60}ms, transform 0.4s ease ${i * 60}ms, color 0.2s ease, padding 0.2s ease`,
                      }}
                    >
                      <span className="social-index">{(i + 1).toString().padStart(2, '0')}</span>
                      <span className="social-icon">{s.icon}</span>
                      <span className="social-name">{s.name}</span>
                      <span className="social-handle">{s.handle}</span>
                      <svg className="social-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer">
          <span style={{ color: 'var(--accent-dim)' }}>{USERNAME}</span>
          {' · '}
          made with intent
        </footer>
      </div>
    </>
  )
}
