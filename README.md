# BLURRED - Personal Portfolio

A cinematic personal portfolio site with a loading screen, scroll-triggered username reveal, bio section, and social links.

## Tech Stack

- TanStack Start (React, file-based routing)
- Tailwind CSS v4
- Google Fonts - Syne (display) + Space Mono (mono)

## Features

- Intro screen with progress bar and ENTER gate (unlocks background music)
- Sticky hero where the username starts blurred and sharpens as you scroll
- Word-by-word scroll-lit bio, focus cards, tech marquee
- Selected work pulled from `content/projects`, socials, contact and Ko-fi sections
- Shared nav, footer, scroll progress bar and a persistent music player across pages
- Dark void aesthetic with gold accent, film grain, and pointer-following spotlights
- Responsive, keyboard-accessible, and respects reduced-motion preferences

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customization

Edit `src/lib/site.tsx`. It holds the username, tagline, bio, socials, email, Ko-fi link and music track.
Add projects as Markdown files in `content/projects/`.

Used ai cause i can :P
