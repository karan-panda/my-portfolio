# Performance, accessibility & SEO audit

_Measured 9 Nov 2026 with Lighthouse 12.8.2 against a local production build (`next build && next start`), headless Brave (Chromium). Scores vary a few points between runs; these are real measured values, not targets._

## Final results

| Page | Profile | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|---|
| Home | Mobile (simulated throttling) | 91 | 100 | 100 | 100 | 1.1 s | 3.4 s | 20 ms | 0 |
| Home | Mobile (DevTools throttling) | 95 | 100 | 100 | 100 | 1.6 s | 1.6 s | 110 ms | 0 |
| Home | Desktop | 99 | 100 | 100 | 100 | 0.3 s | 0.7 s | 0 ms | 0 |
| KYP case study | Mobile (simulated) | 91 | 100 | 100 | 100 | 0.9 s | 3.3 s | 0 ms | 0 |
| KYP case study | Desktop | 99 | 100 | 100 | 100 | 0.2 s | 0.7 s | 0 ms | 0 |

**About the mobile LCP gap:** with Lighthouse's default *simulated* throttling, LCP is estimated (3.3–3.4 s) and charged for the ~240 KB of JavaScript. The observed LCP in the same run is ~0.1 s (it equals first paint), and with real DevTools throttling it measures 1.6 s. The LCP element is the hero summary paragraph, which now paints immediately.

## Issues found and fixed in Phase 7

| Issue | Cause | Fix |
|---|---|---|
| Mobile LCP render delay ~3 s | LCP paragraph hidden behind its reveal animation | Hero summary and case-study summary render without animation |
| CLS 0.2 on case studies | Suspense fallback shipped in static HTML, then swapped for content | Read `params` directly (`instant = false`); every slug is prerendered and links are prefetched |
| Keyboard users skipped CTAs/links | Reveal pre-state used `visibility: hidden`, which removes elements from the tab order | Pre-state uses `opacity`; focused elements are forced visible |
| `aria-prohibited-attr` | `aria-label` on plain `<span>` in counters | Screen-reader-only final value + `aria-hidden` animated digits |
| `label-content-name-mismatch` | Logo link `aria-label` didn't contain visible text | Visible/sr-only name text instead of `aria-label` |
| Colour contrast / legible text | Muted grey at 11.5 px; marquee measured mid-fade | `--muted` lightened to `#9b988f`, labels to 12 px, marquee no longer fades |
| Duplicate headline for screen readers | Extra `sr-only` copy of the `<h1>` | Removed |

## SEO implemented

- Root metadata: title template, description, keywords, authors, canonical, Open Graph, Twitter card, robots.
- Per-case-study title, description, canonical URL and generated Open Graph image (`/work/[slug]/opengraph-image`).
- `sitemap.xml` and `robots.txt` generated from project data.
- JSON-LD `Person` + `WebSite` graph on the home page.
- SVG favicon and generated Apple touch icon.
- **Set `NEXT_PUBLIC_SITE_URL`** to the real domain before deploying — canonical URLs, sitemap and OG URLs currently fall back to `http://localhost:3000`.

## Remaining opportunities (not done)

- ~51–70 KB unused JavaScript reported per page (mostly GSAP/Motion code not used on first paint). Could lazy-load GSAP-driven sections or drop Motion in favour of GSAP/CSS.
- ~13 KB legacy JavaScript polyfills.
- Reduced-motion paths were reviewed in code but not exercised in an emulated browser.
