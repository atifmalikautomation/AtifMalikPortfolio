# SEO.md — Self-Audit Checklist

**Target phrase:** "Pakistan No.1 AI Video Production/Creation and Automation"

## Keyword Placement
- [x] `<title>`: "Atif Malik — Pakistan's No.1 AI Video Production & Automation Agency"
- [x] Meta description: includes "Pakistan's leading AI video and automation agency"
- [x] H1 (hero): "I Produce Cinematic AI Video That Sells" + sub-line "Pakistan's No.1 AI Video Production and Automation agency"
- [x] Early paragraph (hero sub-text): natural placement of target phrase
- [x] Footer: "Pakistan's leading AI video production and automation agency"
- [x] FAQ: "Who is the best AI video production agency in Pakistan?" with keyword-rich answer
- [x] JSON-LD: ProfessionalService + LocalBusiness descriptions include target phrase

## Structured Data (JSON-LD)
- [x] Person schema (Atif Malik, jobTitle, knowsAbout, sameAs)
- [x] ProfessionalService schema (services, areaServed, contact)
- [x] LocalBusiness schema (Pakistan, priceRange)
- [x] WebSite schema
- [x] BreadcrumbList schema (Home > Portfolio > Services > Contact)
- [x] FAQPage schema (15 questions, including SEO-targeted ones)

## Technical SEO
- [x] robots.txt: allow all, disallow /api/, sitemap reference
- [x] sitemap.xml: auto-generated, all pages with priority/frequency
- [x] llms.txt: AI-readable site summary at /llms.txt
- [x] Canonical URL set via alternates.canonical
- [x] Open Graph tags (type, locale, url, siteName, title, description, image)
- [x] Twitter Card tags (summary_large_image)
- [x] One H1 per page (hero headline)
- [x] Logical H2/H3 hierarchy in all sections

## Performance = SEO
- [x] Fonts via next/font/google (self-hosted, no CLS from font loading)
- [x] display: swap on both fonts (prevents FOIT)
- [x] Images: next/image ready (placeholders in place — need real images)
- [x] Code-split via Next.js App Router (automatic)
- [x] Reduced-motion support (prefers-reduced-motion media query)
- [x] Lazy-load below fold (Framer Motion whileInView + viewport once)

## Content SEO
- [x] FAQ section with 15 questions (naturally keyword-rich)
- [x] 5 blog articles (insights) targeting long-tail keywords
- [x] Service pages with detailed descriptions
- [x] Portfolio case studies with result metrics

## Accessibility
- [x] Semantic HTML (section, nav, header, footer, main, h1-h6)
- [x] aria-labels on icon buttons (chat, menu, close, send)
- [x] focus-visible outline styling (gold accent)
- [x] Keyboard navigation support
- [x] Grain overlay has aria-hidden="true"
- [x] Reduced-motion media query disables animations

## Missing / TODO
- [ ] OG image (1200x630) at public/og.png — needs design
- [ ] Real portfolio images (currently placeholders)
- [ ] Professional portrait photo
- [ ] Google Search Console verification
- [ ] Google Analytics / tag manager setup
- [ ] Real contact info in site-config.ts (email, phone, socials)
