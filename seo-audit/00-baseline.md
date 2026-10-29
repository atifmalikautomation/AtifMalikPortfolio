# SEO Baseline Audit — atifmalik.me

## Stack
- **Framework:** Next.js 16.3.2 (App Router, TypeScript)
- **Styling:** Tailwind CSS 4, Framer Motion
- **Fonts:** Inter, JetBrains Mono (next/font), Bricolage Grotesque + Playfair Display (Google Fonts link — NOT next/font)
- **Database:** Neon PostgreSQL (serverless)
- **AI:** Gemini 3.8 Flash (chatbot), Anthropic SDK
- **Deployment:** Vercel
- **Analytics:** Custom visitor tracker (no GA4)
- **CRM:** Webhook-based
- **Booking:** Cal.com embed
- **Images:** next/image with AVIF/WebP
- **Config:** `src/lib/site-config.ts` (785 lines, single source for most data)

## Routes Inventory

### Indexable Pages (15)
| Route | Metadata | H1 | JSON-LD | Notes |
|-------|----------|----|---------|----|
| `/` | Root layout | "Build AI Growth Systems & Automation That Convert" | Yes (5 schemas) | H1 doesn't match title |
| `/services` | Static export | "AI Services & Systems" | Via home only | No page-level schema |
| `/services/[slug]` (×8) | generateMetadata | Dynamic | None | No Service schema |
| `/portfolio` | Static export | "Projects that transformed businesses" | Via home only | |
| `/portfolio/[slug]` (×13) | generateMetadata | Dynamic | None | No CreativeWork schema |
| `/insights` | Static export | "Insights & Resources" | Via home only | |
| `/insights/[slug]` (×5) | generateMetadata | Dynamic | None | No BlogPosting schema |
| `/about` | Static export | "I Build AI Systems That Work" | Via home only | No ProfilePage schema |
| `/contact` | Static export | "Let's Build Something Together" | Via home only | No ContactPage schema |
| `/book` | Static export | "Book your free audit call" | Via home only | |
| `/calculator` | Static export | Dynamic | Via home only | No WebApplication schema |
| `/videos` | **NONE** | "Cinematic AI Video Portfolio" | None | Missing metadata entirely |
| `/privacy` | Static export | "Privacy Policy" | None | |
| `/terms` | Static export | "Terms of Service" | None | |

### Noindex Pages
| Route | Status |
|-------|--------|
| `/chat` | Blocked in robots.txt for `*` but NOT for Googlebot |
| `/admin/*` | Blocked |
| `/api/*` | Blocked |

## Critical Issues Found

### P0 — Blocks Indexing/Citation (Impact×Confidence÷Effort)

1. **Stats render as 0 in SSR** (5×5÷2=12.5) — `StatsCounter` uses `useState(0)` and animates client-side. Bots see "0+ Projects Delivered". Hero stats also client-only via framer-motion but at least have text in HTML.

2. **`/chat` inconsistent robots** (4×5÷1=20) — Blocked for `*` but allowed for `Googlebot`. Should be consistent.

3. **No middleware for canonical host** (4×5÷2=10) — `*.vercel.app` serves full duplicate. No 301 redirect.

4. **Sitemap lastmod is always `new Date()`** (4×5÷1=20) — Every URL gets current build timestamp. Google ignores this.

### P1 — Strong Ranking/Citation Lever

5. **H1/title mismatch on homepage** (5×5÷3=8.3) — Title: "Pakistan's No.1 AI Video Production & Automation Agency". H1: "Build AI Growth Systems & Automation That Convert". No entity/geography in H1.

6. **JSON-LD only on homepage** (5×4÷3=6.7) — Service, portfolio, insight pages have zero structured data. No @graph, no stable @id linking.

7. **llms.txt pricing contradicts site** (4×5÷1=20) — llms.txt: "$500/$2,000/$5,000". Site: "$500+$99/mo / $2,500+$249/mo". Entity inconsistency.

8. **24 services in grid, only 8 pages** (5×5÷4=6.25) — GoHighLevel, WordPress, YouTube automation, email marketing, funnels, booking systems, RevOps, etc have no dedicated page.

9. **No IndexNow / Bing Webmaster** (4×4÷2=8) — Not indexed in Bing = invisible to ChatGPT/Copilot.

10. **Google Fonts loaded via `<link>` not `next/font`** (3×5÷2=7.5) — Bricolage Grotesque and Playfair Display are render-blocking.

11. **Testimonials duplicated in DOM** (3×4÷2=6) — Marquee scroll likely clones elements.

12. **No breadcrumbs** (3×4÷2=6) — BreadcrumbList in JSON-LD exists but not visible on page, and it's a static list (not per-page).

13. **`/videos` page has no metadata** (3×5÷1=15) — No title, description, or OG tags.

14. **Emoji in headings** (2×4÷1=8) — Leaks into snippets. Need aria-hidden wrappers.

15. **No AI crawler rules** (3×4÷1=12) — robots.txt has no rules for OAI-SearchBot, PerplexityBot, ClaudeBot, etc.

### P2 — Incremental

16. Insights stale (newest Aug 2026, only 5 posts)
17. No author bio on insight posts
18. No "last updated" dates
19. No video transcripts/summaries on portfolio pages
20. FAQ answers hidden behind click (accordion) — need SSR text
21. No GSC/Bing verification meta tags
22. Missing `<address>` for NAP
23. No comparison/decision content

### P3 — Nice-to-have

24. Image sitemap
25. Video sitemap
26. `?format=md` alternates
27. Content calendar
