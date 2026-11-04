# AGENTS.md

This document provides an overview of the project structure for developers and AI agents working on this codebase.

## Project Overview

A cinematic personal portfolio site for the user BLURRED. Features a loading screen, scroll-triggered username blur reveal, bio section, and social links. Built with TanStack Start (React SSR) on Netlify. All portfolio content lives in a single route file (`src/routes/index.tsx`).

### Key Customization Points

All site copy lives in `src/lib/site.tsx`:

- `USERNAME`, `TAGLINE`, `BIO`, `BIO_DETAIL`, `NOW`, `STACK`
- `SOCIALS` (name, handle, `href` or `copy`, icon), `CONTACT_EMAIL`, `KOFI_URL`
- Copy style: casual, lowercase, first person. No em dashes or slogan-style lines.

### Architecture Notes

- Design system lives in `src/styles.css` (tokens on `:root`, shared classes: `.container`, `.section`, `.eyebrow`, `.btn`, `.card`, `.window`, `.tag`, …). Routes use these classes rather than per-page `<style>` blocks.
- `src/routes/__root.tsx` renders the shared shell: `SiteNav`, `ScrollProgress`, `SiteFooter`, and a styled 404.
- Intro loader (`Intro` in `src/routes/index.tsx`) plays once per visit, only when the visit starts on `/`; `src/lib/intro.ts` tracks that. It fades out on its own (click skips). No music or audio.
- `src/components/site/Chrome.tsx` — nav, footer, scroll progress bar, `Window` (macOS frame), `CopyEmailButton`, and `useReveal()` (IntersectionObserver that adds `.is-in` to `[data-reveal]` elements).
- Scroll effects write CSS variables with `requestAnimationFrame` instead of React state: `--reveal` on `.hero-wrap` (username blur), `--p` on `.about` (word-by-word statement), `--page-progress` on `<html>`. This keeps scrolling smooth and avoids SSR hydration mismatches.
- Hero uses `position: sticky` inside a `170vh` wrapper so the username stays pinned while it unblurs.
- Google Fonts (Syne + Space Mono) are loaded from the root `head()`.
- `prefers-reduced-motion` turns off ambient animation; `[data-reveal]` content stays visible without JS.

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| UI Components | Radix UI + custom components |
| Content | Content Collections (type-safe markdown) |
| AI | TanStack AI with multi-provider support |
| Language | TypeScript 5.7 (strict mode) |
| Deployment | Cloudflare Workers (`wrangler.jsonc` + `@cloudflare/vite-plugin`) |

## Directory Structure

```
├── content
│   ├── blog
│   │   ├── getting-started-with-tanstack.md  # Blog post.
│   │   ├── react-19-features.md  # Blog post.
│   │   └── tailwind-css-v4-guide.md  # Blog post.
│   ├── education
│   │   └── code-school.md  # Education content: Code School.
│   ├── jobs
│   │   └── initech-junior.md  # Job content: Initech Junior.
├── public
│   ├── contact.html  # Static contact form.
│   ├── favicon.ico
│   ├── headshot-on-white.jpg
│   ├── tanstack-circle-logo.png
│   └── tanstack-word-logo-white.svg  # TanStack wordmark logo (white) used in header/nav.
├── src
│   ├── components
│   │   ├── ui
│   │   │   ├── badge.tsx  # Badge component.
│   │   │   ├── card.tsx  # Card component.
│   │   │   ├── checkbox.tsx  # Checkbox component.
│   │   │   ├── hover-card.tsx  # HoverCard component.
│   │   │   └── separator.tsx  # Separator component.
│   │   ├── Header.tsx  # Header.
│   │   ├── HeaderNav.tsx  # Navigation sidebar template: mobile menu, Home link, add-on routes; EJS-driven for dynamic route generation.
│   │   └── ResumeAssistant.tsx  # Resume AI assistant.
│   ├── lib
│   │   ├── resume-ai-hook.ts  # useResumeChat hook.
│   │   ├── resume-tools.ts  # AI tools: getJobsBySkill, getAllJobs, getAllEducation, searchExperience.
│   │   └── utils.ts  # cn() helper.
│   ├── routes
│   │   ├── blog
│   │   │   └── $slug.tsx  # Blog post detail.
│   │   ├── __root.tsx  # Root layout.
│   │   ├── api.resume-chat.ts  # POST handler for resume AI chat with getJobsBySkill, getAllJobs, etc.
│   │   ├── contact.tsx  # Contact page.
│   │   ├── index.tsx  # Portfolio home: blog index.
│   │   └── resume.tsx  # Resume page with ResumeAssistant.
│   ├── router.tsx  # TanStack Router setup: creates router from generated routeTree with scroll restoration.
│   └── styles.css  # Global styles.
├── .gitignore  # Template for .gitignore: node_modules, dist, .env, .netlify, .tanstack, etc.
├── AGENTS.md  # This document provides an overview of the project structure for developers and AI agents working on this codebase.
├── content-collections.ts  # Content Collections: jobs, education, blog schemas.
├── netlify.toml  # Netlify deployment config: build command (vite build), publish directory (dist/client), and dev server settings (port 8888, target 3000).
├── package.json  # Project manifest with TanStack Start, React 19, Vite 7, Tailwind CSS 4, and Netlify plugin dependencies; defines dev and build scripts.
├── pnpm-lock.yaml
├── tsconfig.json  # TypeScript config: ES2022 target, strict mode, @/* path alias for src/*, bundler module resolution.
└── vite.config.ts  # Vite config template: TanStack Start, React, Tailwind, Netlify plugin, and optional add-on integrations; processed by EJS.
```

## Key Concepts

### File-Based Routing (TanStack Router)

Routes are defined by files in `src/routes/`:

- `__root.tsx` - Root layout wrapping all pages
- `index.tsx` - Route for `/`
- `api.*.ts` - Server API endpoints (e.g., `api.resume-chat.ts` → `/api/resume-chat`)

### Component Architecture

**UI Primitives** (`src/components/ui/`):
- Radix UI-based, Tailwind-styled
- Card, Badge, Checkbox, Separator, HoverCard

**Feature Components** (`src/components/`):
- Header, HeaderNav, ResumeAssistant

## Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite plugins: TanStack Start, Netlify, Tailwind, Content Collections |
| `tsconfig.json` | TypeScript config with `@/*` path alias for `src/*` |
| `netlify.toml` | Build command, output directory, dev server settings |
| `content-collections.ts` | Zod schemas for jobs and education frontmatter |
| `styles.css` | Tailwind imports + CSS custom properties (oklch colors) |

## Development Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
```

## Conventions

### Naming
- Components: PascalCase
- Utilities/hooks: camelCase
- Routes: kebab-case files

### Styling
- Tailwind CSS utility classes
- `cn()` helper for conditional class merging
- CSS variables for theme tokens in `styles.css`

### TypeScript
- Strict mode enabled
- Import paths use `@/` alias
- Zod for runtime validation
- Type-only imports with `type` keyword

### State Management
- React hooks for local state
- Zustand if you need it for global state
### Portfolio Integration

Developer portfolio with Content Collections (jobs, education, blog) and ResumeAssistant.

**Content Collections:**
- `jobs` - jobTitle, company, startDate, endDate, location, tags, content
- `education` - school, summary, startDate, endDate, tags, content
- `blog` - title, date, summary, tags, author, content

**AI tools available (ResumeAssistant):**
- `getJobsBySkill` - Query jobs by skill tag
- `getAllJobs` - Get all work experience
- `getAllEducation` - Get education history
- `searchExperience` - Full-text search across resume

**Routes:** /, /contact, /resume, /blog/$slug

## Environment Variables

For AI: ANTHROPIC_API_KEY, OPENAI_API_KEY, GEMINI_API_KEY, or OLLAMA_BASE_URL (same as ai add-on).

## Application Name

This starter uses "Application Name" as a placeholder throughout the UI and metadata. Replace it with the user's desired application name in the following locations:

### UI Components
- `src/components/Header.tsx` — app name displayed in the header
- `src/components/HeaderNav.tsx` — app name in the mobile navigation header

### SEO Metadata
- `src/routes/__root.tsx` — the `title` field in the `head()` configuration

Search for all occurrences of "Application Name" in the `src/` directory and replace with the user's application name.
