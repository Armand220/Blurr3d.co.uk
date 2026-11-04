import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { MUSIC_VIDEO_ID } from '@/lib/site'

/**
 * Background music lives in the root layout so it keeps playing while
 * you move between pages. The home page's ENTER button calls `start()`
 * — that click is the user gesture browsers need before playing audio.
 */

type MusicState = {
  ready: boolean
  playing: boolean
  volume: number
  /** True once the intro loader has been dismissed this visit. */
  entered: boolean
  start: () => void
  toggle: () => void
  setVolume: (v: number) => void
  markEntered: () => void
}

const MusicContext = createContext<MusicState | null>(null)

export function useMusic() {
  const ctx = useContext(MusicContext)
  if (!ctx) throw new Error('useMusic must be used inside <MusicProvider>')
  return ctx
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const playerRef = useRef<any>(null)
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolumeState] = useState(50)
  const [entered, setEntered] = useState(false)
  const volumeRef = useRef(50)

  useEffect(() => {
    const w = window as any
    const init = () => {
      if (playerRef.current || !document.getElementById('yt-player')) return
      playerRef.current = new w.YT.Player('yt-player', {
        height: '1',
        width: '1',
        videoId: MUSIC_VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          loop: 1,
          playlist: MUSIC_VIDEO_ID,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: (e: any) => {
            e.target.setVolume(volumeRef.current)
            setReady(true)
          },
          onStateChange: (e: any) => setPlaying(e.data === 1),
        },
      })
    }

    if (w.YT?.Player) {
      init()
      return
    }
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      tag.async = true
      document.head.appendChild(tag)
    }
    const prev = w.onYouTubeIframeAPIReady
    w.onYouTubeIframeAPIReady = () => {
      prev?.()
      init()
    }
  }, [])

  const start = useCallback(() => {
    const p = playerRef.current
    if (!p?.playVideo) return
    try {
      p.unMute()
      p.setVolume(volumeRef.current)
      p.playVideo()
    } catch {
      /* player not ready yet — the toggle button still works later */
    }
  }, [])

  const toggle = useCallback(() => {
    const p = playerRef.current
    if (!p?.playVideo) return
    if (playing) p.pauseVideo()
    else start()
  }, [playing, start])

  const setVolume = useCallback(
    (v: number) => {
      volumeRef.current = v
      setVolumeState(v)
      const p = playerRef.current
      if (!p?.setVolume) return
      p.setVolume(v)
      if (v > 0 && !playing) start()
    },
    [playing, start],
  )

  const markEntered = useCallback(() => setEntered(true), [])

  const value = useMemo(
    () => ({ ready, playing, volume, entered, start, toggle, setVolume, markEntered }),
    [ready, playing, volume, entered, start, toggle, setVolume, markEntered],
  )

  return (
    <MusicContext.Provider value={value}>
      {children}
      <div id="yt-player" className="yt-hidden" aria-hidden="true" />
    </MusicContext.Provider>
  )
}

export function MusicPlayer() {
  const { ready, playing, volume, entered, toggle, setVolume } = useMusic()

  return (
    <div className={`music ${entered ? 'is-visible' : ''}`} role="group" aria-label="Background music">
      <button
        type="button"
        className={`music-btn ${playing ? 'is-playing' : ''}`}
        onClick={toggle}
        disabled={!ready}
        aria-label={playing ? 'Pause music' : 'Play music'}
        aria-pressed={playing}
      >
        <span className="eq" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
      </button>
      <span className="music-label">{playing ? 'Now playing' : 'Sound off'}</span>
      <input
        type="range"
        min={0}
        max={100}
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        className="music-range"
        style={{ '--vol': `${volume}%` } as React.CSSProperties}
        aria-label="Music volume"
      />
    </div>
  )
}
