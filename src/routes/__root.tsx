import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
  useRouterState,
} from '@tanstack/react-router'
import { useEffect } from 'react'
import { MusicPlayer, MusicProvider, useMusic } from '@/components/site/Music'
import { ScrollProgress, SiteFooter, SiteNav } from '@/components/site/Chrome'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { name: 'theme-color', content: '#060608' },
      { title: 'BLURRED | Personal Portfolio' },
      {
        name: 'description',
        content:
          'BLURRED — a web developer in progress. Cinematic portfolio with projects, socials and contact.',
      },
      { property: 'og:title', content: 'BLURRED | Personal Portfolio' },
      { property: 'og:description', content: 'A web developer in progress, shipping work that feels deliberate.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://blurr3d.co.uk' },
      { name: 'twitter:card', content: 'summary' },
    ],
    links: [
      { rel: 'icon', href: '/favicon.png', type: 'image/png' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function RootLayout() {
  return (
    <MusicProvider>
      <SkipIntroOffHome />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <SiteNav />
      <main id="main">
        <Outlet />
      </main>
      <SiteFooter />
      <MusicPlayer />
    </MusicProvider>
  )
}

/** The intro loader only belongs to a first visit that lands on the home page. */
function SkipIntroOffHome() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const { entered, markEntered } = useMusic()
  useEffect(() => {
    if (!entered && pathname !== '/') markEntered()
  }, [entered, pathname, markEntered])
  return null
}
