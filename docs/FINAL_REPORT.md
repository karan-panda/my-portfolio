# Final report — Karan Panda portfolio

_9 Nov 2026 · repository: github.com/karan-panda/my-portfolio (branch `main`)_

## 1. What was built

**Home page:** a ~1.3 s once-per-session intro, then the hero:
- A masked headline, a schematic "system dial" that reacts to the cursor, a live status panel (role, base, IST clock, focus ticker), and three CTAs: Explore my work, Download résumé, Let's connect.

The rest of the home page:
- **Engineering identity:** a statement, a narrative, and six principle tiles.
- **Selected work:** six projects. On desktop the panels are sticky and stack, with the previous panel scaling back; on mobile they form a vertical list. Each panel has an architecture diagram.
- **Technical capabilities:** a bento grid of six groups, each tied to the work that shows it. There are no skill bars.
- **Experience:** a timeline whose rail fills as you scroll.
- **Measured impact:** seven metrics that count up once on view, each with its scope and project.
- **Education, awards & leadership,** plus clearly separated academic projects and interests.
- **Contact:** email with copy button, LinkedIn, GitHub, résumé.
- **Footer** with the year (cached), links and back to top.

**Case studies (`/work/[slug]`):** six statically generated pages with:
- A header with role, company and stack, and the full-width diagram.
- Numbered sections with a sticky contents list that tracks the current section.
- A next-project card.
- A shared title morph from the home panel.

**Platform:** SEO metadata, canonical URLs, sitemap, robots, JSON-LD (Person + WebSite), generated Open Graph and Twitter images (site plus one per case study), SVG favicon, Apple icon, and a custom 404.

## 2. Technology choices

- **Next.js 16 App Router + Cache Components.** Server Components by default; client code is limited to motion, navigation, cursor, counters and the contents list. All pages are static.
- **Tailwind v4** with design tokens in CSS variables, a fluid `clamp()` type scale and a 12-column asymmetric grid.
- **Fonts:** Space Grotesk (display), Inter (body) and JetBrains Mono (annotations), self-hosted via `next/font`.
- **SVG diagrams instead of WebGL.** They explain the engineering more clearly and keep JS small.

## 3. Animation libraries and where they're used

| Library | Where |
|---|---|
| GSAP + ScrollTrigger (`useGSAP`) | `Intro`, `HeroMotion`, `Reveal`, `ProjectStackMotion`, `TimelineMotion`, `Counter`, `Magnetic`, `Cursor` |
| Motion | `SiteHeader` mobile menu, `FocusTicker` |
| Lenis | `SmoothScroll` (fine pointer + motion allowed only) |
| CSS | hovers, diagram flows, scan line, marquee, one-shot diagram animations |
| React `<ViewTransition>` | route fade/slide and project-title morph |

## 4. Project content included

| # | Project | Positioning |
|---|---|---|
| 01 | KYP — AI-Powered Insurance Assistant | Production GenAI · RAG · MCP |
| 02 | RYD Raksha — Motor Insurance Product | Full-stack · microfrontends · performance |
| 03 | Motor Renewal Modernization | Enterprise modernization · Next.js · .NET |
| 04 | Travel Itinerary GenAI Sales Accelerator | GenAI · streaming · personalization |
| 05 | TripSecure+ / Voyager Travel Insurance | Backend · event-driven · integrations |
| 06 | Cross-Region Disaster Recovery | AWS ECS · resilience |

Not given full case studies, but kept in the data model for later: Two-Wheeler modernization, CV renewal (mentioned in the experience timeline as "productionized in ~2 weeks"), Motor Challan and the Internal AI Platform.

## 5. Metrics used (all with their scope)

| Metric | Shown as |
|---|---|
| KYP usage | 12,000+ **reported peak** daily active users |
| KYP MCP tools | 4, built by Karan (confirmed 9 Nov) |
| KYP query time | 700–1,300 ms for standard queries, measured at the API gateway (confirmed 9 Nov) |
| Motor Renewal Lighthouse | 37 → 93 **on the migrated renewal journey** |
| Motor Renewal page load | ~27% faster, same scope |
| Motor Renewal API calls | ~14% fewer, renewal journey |
| RYD API payload | ~17 MB → ~6 MB (Brotli + .NET output caching), reference data |
| RYD browser cache | ~6 MB → ~1.1 MB (LZ-String), 1-day TTL |
| Travel GenAI | ~65% less **token/memory** use, explicitly "not a latency figure" |
| CV renewal | productionized in ~2 weeks |

**Deliberately excluded:**
- "30% inference latency" and "40% token reduction". These appear in older résumés but have no source.
- CV "30% segment growth", which is a business result.
- The 100-user travel pilot, which is a target.
- RTO/RPO/uptime figures.
- Redis replacement and "zeroTat".
- The "14+ components across 3 journeys" library claim.

## 6. Claims still worth verifying before wide sharing

1. KYP 12,000+ peak DAU: the measurement period.
2. Motor Renewal Lighthouse, page-load and API-call figures: device, network and baseline conditions.
3. Travel GenAI ~65%: the exact unit (tokens vs memory) and baseline.
4. RYD payload and LocalStorage figures: how they were measured.
5. Case-study wording for KYP's RBAC and golden-set evaluation, and the 700–1,300 ms range (confirmed by you, but not yet in the Career Master Profile).
6. The approved résumé PDF contains claims the site omits (the "14+ components" library) and your phone number. Decide whether to keep that PDF public.
7. The "Associate Software Engineer" title and dates in the timeline.

## 7. Build & test results

| Check | Result |
|---|---|
| `npx tsc --noEmit` (strict) | ✅ pass |
| `npm run lint` | ✅ 0 errors, 0 warnings |
| `npm run build` | ✅ pass. Home, 6 case studies, sitemap, robots, OG/Twitter images and icons all prerendered |
| Link crawl (all pages) | ✅ every internal route 200, every in-page anchor exists, résumé PDF 200 `application/pdf`, GitHub and LinkedIn 200 |
| Unknown slug | ✅ 404 with custom page |
| Browser: navigation | ✅ home → case study, back (scroll restored), forward, direct URL |
| Browser: mobile menu | ✅ opens, Escape closes, page is inert behind it, links navigate and release the scroll lock |
| Browser: animations | ✅ intro, hero entrance, scroll reveals, counters, timeline rail, diagrams, cursor states, nav scrollspy |
| Keyboard | ✅ skip link, logical tab order, visible focus ring, CTAs focusable during the entrance |
| Responsive | ✅ no horizontal overflow at 375 px and 1024 px |
| Automated tests | ⚠️ none. No test suite was requested; checks above were run manually |

## 8. Lighthouse (local production build)

| Page | Profile | Perf | A11y | Best practices | SEO |
|---|---|---|---|---|---|
| Home | Desktop | 99 | 100 | 100 | 100 |
| Home | Mobile (simulated) | 91 | 100 | 100 | 100 |
| Home | Mobile (DevTools throttling) | 95 | 100 | 100 | 100 |
| KYP case study | Desktop | 99 | 100 | 100 | 100 |
| KYP case study | Mobile (simulated) | 91 | 100 | 100 | 100 |

CLS is 0 everywhere. Details and the fixes made are in `docs/AUDIT.md`.

## 9. Known limitations

- Reduced-motion and no-JS paths were reviewed in code but not run in an emulated browser.
- At desktop widths above ~800 px, layout was verified by measurement rather than full screenshots (browser pane size limit).
- Lighthouse reports ~50–70 KB of unused JS per page (GSAP/Motion). This is an opportunity, not a defect.
- View transitions animate only in browsers that support them; others navigate normally.
- Dev-only: Next's instant-navigation validator is opted out for `/work/[slug]` (`instant = false`), because every slug is prerendered and prefetched.

## 10. Deployment

Not deployed. Publishing needs your Vercel account. Follow the **Deploy** section of `README.md`: import the repo, set `NEXT_PUBLIC_SITE_URL`, deploy and add the domain.
