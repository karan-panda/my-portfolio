# Phase 1 — Source Audit & Implementation Plan

_Generated 9 Nov 2026. Scaffold: Next.js 16.4.5 (App Router, Turbopack), React 19.3, TypeScript strict, Tailwind v4, ESLint 9. Baseline `npm run build` and `npm run lint` pass._

## 1. Source inventory

| Source | Type | Used for | Notes |
|---|---|---|---|
| `My Resume/Career Master Profile/Career_Master_Profile_Karan_Panda.md` (694 lines, read in full) | Markdown | **Primary truth**: roles, dates, 10 projects, metrics register, skills, education, awards, caveats, 7 Nov clarifications | Sections 11–12 define what is verified vs. pending |
| `Resume & ATS Lab/All Resumes/Backend/*` (8 PDFs) | PDF | Wording, contact links, newer detail | 1PercentClub / Azure / Stripe variants (8–9 Nov) are the most recent and most conservative |
| `Resume & ATS Lab/All Resumes/CoreAi/*` (8 PDFs) | PDF | AI wording | Older variants contain **unsupported** claims (see §2) |
| `Resume & ATS Lab/All Resumes/Frontend/*` (3 PDFs) | PDF | Full-stack wording | FullStack_Resume_II uses "Software Engineer (L3)" |
| `Resume & ATS Lab/*.tex` (8) + cover letters (3) | LaTeX / PDF | Source for PDFs; cover letters for narrative tone | Not used as factual evidence beyond resumes |
| `Claude outputs/Karan_Panda_Academic_Record_TCET.pdf` | PDF | Education | Not published |

**Contact (identical across all 22 PDFs):** email `karanpanda1206@gmail.com`, LinkedIn `linkedin.com/in/karanpanda`, GitHub `github.com/karan-panda`. LeetCode, Holopin, Coursera and Cloud Skills Boost links appear only in older variants — not used unless you want them. Phone number will **not** be shown on the site.

## 2. Conflicts & claims needing verification

| # | Claim | Where | Decision on the site |
|---|---|---|---|
| 1 | Title "Software Engineer (L3)" | KP_Amazon, JusPay, WellsFargo, FullStack_II | Use **Associate Software Engineer** (profile §1 says don't use L3). Hero can say "Software Engineer" generically — confirm. |
| 2 | "inference response latency reduced 30%" | Focused_BE, JusPay, AIML, Cloud, CoreAI | **Excluded** — profile says the 65% figure is token/memory, not latency; no 30% latency evidence. |
| 3 | "token consumption reduced 40%" / "responsiveness by 40%" | WellsFargo, AIML, CoreAI | **Excluded** — no source in profile. |
| 4 | KYP "12,000+ DAU" vs "**peak** 12,000+ daily users" | Profile vs. 8–9 Nov resumes | Use the more conservative **"12,000+ peak daily active users (reported)"**. |
| 5 | "**Built the four** MCP tools" + named tool list | 8–9 Nov resumes | Profile §11 still says verify count & personal ownership. Site will say "contributed to MCP tool architecture" until you confirm. |
| 6 | KYP RBAC with signed token claims, 700–1,300 ms gateway latency, golden-set evaluation | 8–9 Nov resumes only | Not in profile. Will omit the latency number; mention RBAC/golden set only if you confirm. |
| 7 | HighFlier Award "for outstanding backend system reliability" | Focused_BE only | Show award name/year only. |
| 8 | Trainee role "IL TakeCare App" | One variant | Omit unless confirmed. |
| 9 | CV renewal "contributing to 30% growth" | One variant | Show 2-week productionization only; 30% segment growth either omitted or explicitly labelled as a business result, not engineering-caused. |
| 10 | Redis removed/replaced; ESB/XML→JSON deployment scope | Profile §12 | Say "core-system JSON (v2.0) services replacing XML" (confirmed live for RYD/Two-Wheeler); no Redis claim. |
| 11 | ECS DR RTO/RPO | — | None shown. Describe config-driven endpoint switching only. |
| 12 | "zeroTat" product mould | Profile | Not mentioned on site. |
| 13 | Travel AI 100-user pilot | Profile | Not shown (target, not result). |
| 14 | "Next.js library of 14+ components reused across 3 customer journeys" | Approved resume only | Not in profile — omitted from the site until confirmed. |

## 3. Resume for download — needs your approval

No file is labelled "general". Recommended: **`All Resumes/Backend/Karan_Panda_Stripe_SWE_New_Grad.pdf`** (8 Nov) — headline "Software Engineer | Backend & Full-Stack", no company-specific wording, none of the excluded claims (#1–3). It does include phone number and claim #5/#6 wording. Alternative: `Microsoft_Azure_Messaging_SWE.pdf` (reliability-leaning). It will be copied to `public/resume/karan-panda-resume.pdf` once approved.

## 4. Design direction

- **Concept: "System Schematic."** The site reads like an engineer's annotated blueprint: a faint coordinate grid, hairline rules, mono-spaced annotations (`01 / KYP`, `[37 → 93]`), and diagrams that *are* the project visuals. One background language (grid + slow scan-line), no blobs/glass.
- **Palette (CSS vars):** `--bg #0B0B0A` graphite, `--surface #141412 / #1C1C19`, `--text #F2EFE8` warm white, `--muted #8A877F`, `--line #2A2925`, `--accent #C6F432` acid lime, `--accent-2 #5CC8E8` cyan (diagrams only).
- **Type:** Space Grotesk (display, tight tracking, `clamp()` scale), Inter (body), JetBrains Mono (annotations/metrics) — via `next/font`, self-hosted.
- **Layout:** 12-col asymmetric grid; hero headline spans 9 cols left, status panel + monogram right; editorial split for About.
- **Projects:** pinned, scroll-driven stack on desktop (each project a full panel whose diagram animates with scroll progress); vertical stacked cards on mobile. Each links to `/work/[slug]`.
- **Signature visuals (SVG, no WebGL):** KYP query → retrieval → MCP tools → response flow; RYD payload bar compressing 17→6 MB and 6→1.1 MB; Motor Renewal Angular→Next.js split with Lighthouse dial 37→93; Travel NDJSON chunks streaming into an itinerary; DR two-region diagram with endpoint switch. WebGL skipped — SVG explains these better and keeps JS small.

## 5. Motion system

- **GSAP + ScrollTrigger:** pinned project sequence, diagram timelines, timeline reveals. Loaded only in the client components that need them.
- **Motion (motion/react):** intro presence, mobile menu, route transitions, hover/state UI.
- **CSS:** buttons, underlines, tag hovers, grid drift.
- **Lenis:** smooth scroll synced to ScrollTrigger; disabled under `prefers-reduced-motion` and on touch.
- Central `lib/motion.ts` (eases, durations, staggers) + `useReducedMotion` gate; all GSAP in `useGSAP` contexts for cleanup.
- Intro: ≤1.4 s, once per session (`sessionStorage`), skipped for reduced motion, content SSR-rendered underneath so no-JS users see the page.

## 6. Architecture

```
src/
  app/            layout.tsx, page.tsx, globals.css, work/[slug]/page.tsx,
                  sitemap.ts, robots.ts, opengraph-image.tsx, icon
  components/     layout/ navigation/ hero/ about/ projects/ diagrams/
                  capabilities/ experience/ metrics/ recognition/ contact/ motion/ ui/
  data/           profile.ts projects.ts experience.ts skills.ts metrics.ts
  lib/            motion.ts, seo.ts
  types/          content.ts
public/resume/karan-panda-resume.pdf
```
Server Components by default; client islands only for intro, nav, cursor, scroll scenes and diagrams. Case studies statically generated via `generateStaticParams` from `data/projects.ts`.

## 7. Build phases

1. ✅ Audit + scaffold (this doc)
2. ✅ Foundation: tokens, fonts, grid, nav, footer, typed content data
3. Home sections: intro → hero → about → work → capabilities → experience → impact → recognition → interests → contact
4. Case studies: KYP, RYD Raksha, Motor Renewal, Travel GenAI, then TripSecure+, ECS DR
5. Motion polish + diagrams
6. SEO (metadata, OG image, JSON-LD Person, sitemap/robots), a11y, performance
7. Browser validation (desktop + mobile screenshots), Lighthouse, README

## 8. Decisions (confirmed by Karan, 9 Nov 2026)

- **Resume download:** `Karan_Panda_Stripe_SWE_New_Grad.pdf` → `public/resume/karan-panda-resume.pdf`.
- **Hero:** "Software Engineer at ICICI Lombard"; timeline uses exact title "Associate Software Engineer".
- **Availability:** subtle hero status "Open to relevant engineering opportunities".
- **KYP (supersedes conflicts #5, #6):** Karan built all four MCP tools (policy lookup across health/travel/motor/home, step-by-step workflow guidance, company-profile answers, RAG over product information); RBAC with signed token claims and golden-set evaluation may be mentioned; standard queries 700–1,300 ms at the API gateway may be shown.
- **Academic projects:** not answered — default to a small, clearly separate section (Diabetes Decoded without the unverified 91→96% accuracy; VANI).

## 9. Original open questions

1. Approve the download resume (§3).
2. Hero wording: "Software Engineer at ICICI Lombard" or exact title "Associate Software Engineer"?
3. "Available for relevant engineering opportunities" — show it?
4. Confirm #5/#6: did you personally build all four KYP MCP tools; OK to mention RBAC + golden-set evaluation?
5. Include academic projects (Diabetes Decoded, VANI) in a small section?
