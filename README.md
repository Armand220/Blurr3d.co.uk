# BLURRED - Personal Portfolio

A cinematic personal portfolio site with a loading screen, scroll-triggered username reveal, bio section, and social links.

## Tech Stack

- TanStack Start (React, file-based routing)
- Tailwind CSS v4
- Google Fonts - Syne (display) + Space Mono (mono)

## Features

- Short intro screen with a progress bar (first visit to the home page)
- Sticky hero where the username starts blurred and sharpens as you scroll
- Word-by-word scroll-lit bio, `now.txt` window, tech marquee
- Socials (Discord copies the username), contact and Ko-fi sections
- Shared nav, footer and scroll progress bar across pages
- Dark void aesthetic with gold accent, film grain, and pointer-following spotlights
- Responsive, keyboard-accessible, and respects reduced-motion preferences

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploying

The site deploys to Cloudflare Workers. `npm run build` produces the Worker, and Cloudflare's
GitHub integration uploads it with `wrangler`. The Worker name is set in `wrangler.jsonc` and must
match the Worker's name in the Cloudflare dashboard.

## Customization

Edit `src/lib/site.tsx`. It holds the username, tagline, bio, the `now.txt` rows, socials, email and Ko-fi link.

Used ai cause i can :P
