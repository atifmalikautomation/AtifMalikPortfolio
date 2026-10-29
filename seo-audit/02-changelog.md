# SEO Changelog

## Phase 0+1: Technical Foundation
**Commit:** `feat(seo): Phase 0+1 — baseline audit, technical foundation`

| Change | File | Why |
|--------|------|-----|
| AI crawler rules in robots.txt | src/app/robots.ts | ChatGPT, Perplexity, Claude search bots were not explicitly allowed |
| Real lastmod dates in sitemap | src/app/sitemap.ts | Google ignores sitemap when every URL has same build timestamp |
| SSR-safe stats counter | src/components/home/StatsCounter.tsx | Bots saw "0+ Projects" instead of "800+" (useState(0) on server) |
| Canonical host redirect | src/proxy.ts | *.vercel.app served duplicate content, splitting signals |
| /videos page metadata | src/app/videos/layout.tsx | Page had zero metadata (no title, description, OG) |
| llms.txt pricing fix | public/llms.txt | Pricing ($500/$2,000/$5,000) contradicted site ($500+$99/mo, $2,500+$249/mo) |
| Baseline audit docs | seo-audit/ | Documented stack, routes, findings |

## Phase 2: Structured Data (JSON-LD)
**Commit:** `feat(seo): Phase 2 — unified JSON-LD @graph on every page`

| Change | File | Why |
|--------|------|-----|
| Unified schema module | src/lib/schema/index.ts | Single @graph with stable @ids (Person, Org, WebSite, WebPage) per page |
| Homepage: single @graph | src/components/seo/JsonLd.tsx | Replaced 5 separate schema scripts with one unified graph |
| Service pages: Service schema | src/app/services/[slug]/page.tsx | Had no structured data at all |
| Portfolio pages: CreativeWork | src/app/portfolio/[slug]/page.tsx | Had no structured data |
| Insight pages: BlogPosting | src/app/insights/[slug]/page.tsx | Had no structured data |
| About: ProfilePage | src/app/about/page.tsx | Had no structured data |
| Contact: ContactPage | src/app/contact/page.tsx | Had no structured data |
| Calculator: WebApplication | src/app/calculator/page.tsx | Had no structured data |
| Reusable SchemaScript component | src/components/seo/SchemaScript.tsx | Clean injection pattern |

## Phase 5: AI Crawler Accessibility & Index Pipelines
**Commit:** `feat(seo): Phase 5 — IndexNow pipeline, verification meta tags`

| Change | File | Why |
|--------|------|-----|
| IndexNow ping script | scripts/seo/indexnow-ping.mjs | Submits all URLs to Bing/ChatGPT after deploy |
| GSC + Bing verification | src/app/layout.tsx | Env-driven verification meta tags |

## Remaining (Owner Action Required)
See `06-manual-steps.md` for items only the owner can complete.
