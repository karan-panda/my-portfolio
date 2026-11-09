# Karan Panda — Portfolio

Personal portfolio of Karan Panda, Software Engineer at ICICI Lombard (Mumbai). It is a cinematic, schematic-styled site with six production case studies, built to be fast, accessible and easy to update.

**Stack:** Next.js 16 (App Router, Turbopack, Cache Components) · React 19 · TypeScript (strict) · Tailwind CSS v4 · GSAP + ScrollTrigger · Motion · Lenis · Lucide

---

## Run locally

Requires Node.js 20.9+ (developed on Node 24).

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000.

## Build & check

```bash
npm run lint
```

```bash
npx tsc --noEmit
```

```bash
npm run build && npm run start
```

`npm run build` prerenders the home page, all six case studies, the sitemap, robots.txt and the social images.

## Deploy (Vercel)

1. Import `karan-panda/my-portfolio` at https://vercel.com/new. The framework (Next.js) is detected automatically, so no build settings are needed.
2. Add the environment variable **`NEXT_PUBLIC_SITE_URL`** with your final domain, for example `https://karanpanda.dev`, with no trailing slash. It drives canonical URLs, `sitemap.xml`, `robots.txt` and Open Graph URLs. Without it they fall back to `http://localhost:3000`.
3. Deploy, then add a custom domain in **Settings → Domains** and redeploy, so the build picks up the URL.
4. Optional: submit `https://<domain>/sitemap.xml` in Google Search Console.

Any Node host that runs `next build && next start` also works (Netlify, Render, a VPS, and so on). The site has no database and no secrets.

---

## Where things live

```
src/
  app/                 routes, metadata, sitemap/robots, OG images, icons, globals.css (design tokens)
    work/[slug]/       case study route (statically generated from data)
  components/          one folder per section + motion/, ui/, diagrams/
  data/                ← all content lives here
    profile.ts         name, role, contact links, résumé path, site URL
    projects.ts        the six projects and their full case studies
    experience.ts      roles, education/awards, academic projects, interests
    skills.ts          capability groups, impact metrics, principles
  lib/                 motion tokens (motion.ts), GSAP registration, SEO helpers
  types/content.ts     content types: the contract between data and components
public/resume/         the downloadable résumé
docs/                  Phase 1 source audit/plan and Lighthouse audit results
```

### Update projects

Edit `src/data/projects.ts`. Each project's card, case study page, sitemap entry and OG image come from its entry.

- `highlights` are the metrics shown on the home page card (0–2 items).
- `caseStudy.*` are the case study sections. **Optional sections (`constraints`, `decisions`, `challenges`, `learnings`) only render when present.** Leave them out rather than inventing content.
- Every `Metric` needs a `context` string, the measurement scope shown under the number. Add `from`/`to` (plus `prefix`/`suffix`/`unit`) to animate it as a counter.

### Add a case study

1. Append a new object to `projects` in `src/data/projects.ts` with a unique `slug` and the next `index` (for example `"07"`).
2. Pick a `diagram`. To create a new one, add a component in `src/components/diagrams/` using the primitives in `primitives.tsx`. Then add its key to `DiagramKind` in `src/types/content.ts` and to the map in `ProjectDiagram.tsx`.
3. Run `npm run build`. The route `/work/<slug>` is generated automatically.

### Update the résumé

Replace `public/resume/karan-panda-resume.pdf` and keep the same filename. Every button (nav, hero, contact) points to it through `profile.links.resume`.

### Update contact links

Edit `email` and `links` in `src/data/profile.ts`. Nav, hero, contact, footer and the JSON-LD all read from there.

### Change colours or type

Design tokens are CSS variables at the top of `src/app/globals.css` (`--accent`, `--muted`, and so on). Accent tints derive from `--accent` automatically. Fonts are loaded with `next/font` in `src/app/layout.tsx`.

---

## Motion system

| Tool | Used for |
|---|---|
| **GSAP + ScrollTrigger** | Intro timeline, hero entrance + parallax, scroll reveals (`Reveal`), stacked project panels, timeline rail, counters, magnetic buttons, cursor follower |
| **Motion** | Mobile menu presence, hero focus ticker |
| **CSS** | Hovers, underlines, diagram flows, marquee, scan line, one-shot diagram animations |
| **Lenis** | Smooth scroll on fine-pointer devices only, driven by GSAP's ticker |
| **React `<ViewTransition>`** | Route transitions and the shared project-title morph |

Shared easing, durations and staggers live in `src/lib/motion.ts`. All GSAP code runs inside `useGSAP` contexts for automatic cleanup.

**Reduced motion:** the intro, smooth scrolling, parallax, the cursor follower, looping animations and view transitions are all disabled, and content is shown immediately. **Without JavaScript**, all content renders: reveal states fall back to visible via CSS, and the intro never shows.

## Accuracy policy

All professional claims come from the Career Master Profile and the approved résumé. Each metric is shown with its scope, and nothing confidential (internal URLs, customer data, source code, proprietary architecture) is published. See `docs/PHASE1_PLAN.md` for the source inventory and the list of claims excluded pending verification.
