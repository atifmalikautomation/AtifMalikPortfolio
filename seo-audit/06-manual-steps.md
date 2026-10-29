# 06 — Manual Steps (Owner-Only Checklist)

Everything in this file requires **Atif's direct action** — no code changes, just account setup, verification, and data input.

---

## 1. Google Search Console

- [ ] Go to [search.google.com/search-console](https://search.google.com/search-console)
- [ ] Add property `https://atifmalik.me`
- [ ] Verify via DNS TXT record (recommended) or HTML meta tag
- [ ] If using meta tag, set `NEXT_PUBLIC_GSC_VERIFICATION` env var in Vercel (see Section 7)
- [ ] Submit sitemap: `https://atifmalik.me/sitemap.xml`
- [ ] Request indexing for the homepage and top 5 landing pages
- [ ] Confirm all pages appear under "Pages" > "Indexed"

## 2. Bing Webmaster Tools

- [ ] Go to [bing.com/webmasters](https://www.bing.com/webmasters)
- [ ] Add site `https://atifmalik.me`
- [ ] Verify via DNS CNAME or meta tag
- [ ] If using meta tag, set `NEXT_PUBLIC_BING_VERIFICATION` env var in Vercel (see Section 7)
- [ ] Submit sitemap: `https://atifmalik.me/sitemap.xml`
- [ ] **IndexNow setup:**
  - Generate an IndexNow key at [bing.com/indexnow](https://www.bing.com/indexnow)
  - Set `INDEXNOW_KEY` env var in Vercel (see Section 7)
  - Confirm the key file is accessible at `https://atifmalik.me/{key}.txt`
  - Test a manual ping: `https://api.indexnow.org/indexnow?url=https://atifmalik.me&key={YOUR_KEY}`
- [ ] **AI Performance report:** Check "AI Performance" tab in Bing WMT monthly for citation data

## 3. Vercel Firewall / Bot Protection

- [ ] Go to Vercel Dashboard > Project Settings > Security > Firewall
- [ ] Ensure the following AI crawler user-agents are **allowed** (not blocked):
  - `GPTBot` (OpenAI)
  - `Google-Extended` (Gemini)
  - `ClaudeBot` / `anthropic-ai` (Anthropic)
  - `PerplexityBot`
  - `Bingbot` (Copilot)
  - `Bytespider` (ByteDance)
  - `CCBot` (Common Crawl)
- [ ] If "Bot Protection" is enabled, add exceptions for the above user-agents
- [ ] Verify with: `curl -A "GPTBot" https://atifmalik.me` — should return 200, not 403

## 4. Google Business Profile

- [ ] Go to [business.google.com](https://business.google.com)
- [ ] Create a profile for "Atif Malik — AI Video & Automation"
- [ ] Category: "Video Production Service" (primary), "Software Company" (secondary)
- [ ] Add website: `https://atifmalik.me`
- [ ] Add service areas (Pakistan + remote/worldwide)
- [ ] Upload portfolio screenshots as photos
- [ ] Add services list matching the site's service pages
- [ ] Request verification (postcard, phone, or video depending on eligibility)

## 5. [NEEDS-INPUT] Items

The codebase has placeholder values that only Atif can fill in. Each item below needs a real value.

### 5a. Founding Year/Date

- **Where it's used:** Schema.org `foundingDate`, About page, footer
- **What to provide:** The year (or full date) you started freelancing professionally
- Example: `2020` or `2020-06-15`

### 5b. City / Locality in Pakistan

- **Where it's used:** Schema.org `address.addressLocality`, local SEO signals
- **What to provide:** Your city name (e.g., Lahore, Karachi, Islamabad)

### 5c. Fiverr Profile URL

- **Where it's used:** Social links, Schema.org `sameAs`
- **What to provide:** Full URL, e.g., `https://www.fiverr.com/atifmalikfx`
- Confirm your exact Fiverr username: `@atifmalikfx` or other?

### 5d. Upwork Profile URL

- **Where it's used:** Social links, Schema.org `sameAs`
- **What to provide:** Full URL, e.g., `https://www.upwork.com/freelancers/~01xxxxxxxxxx`

### 5e. GitHub Profile URL

- **Where it's used:** Social links, Schema.org `sameAs`
- **What to provide:** Full URL, e.g., `https://github.com/atifmalik`

### 5f. Canonical YouTube Channel

- **Where it's used:** Social links, Schema.org `sameAs`, video embeds
- **Which channel is the main one?**
  - `@atifmalikfreelancer`
  - `@AtifMalikAI`
- Pick ONE as canonical. The other can redirect or be listed as secondary.

### 5g. Languages Spoken

- **Where it's used:** Schema.org `knowsLanguage`, service area targeting
- **Confirm:** English, Urdu — any others? (Punjabi, Hindi, etc.)

### 5h. Full Client Names / Companies for Testimonials

- **Where it's used:** Schema.org `Review.author`, testimonials section
- **Current placeholders need real names:**
  - "Dean R." → Dean Russell (confirm OK to use full name publicly)
  - Other testimonial authors — provide full names or confirm abbreviations
  - Company names if applicable

### 5i. Real Project Dates for Portfolio Items

- **Where it's used:** Schema.org `dateCreated`, portfolio sorting
- **What to provide:** Month + year for each portfolio item (e.g., "Bayou Savage — Oct 2024")

### 5j. Contact Hours / Timezone

- **Where it's used:** Schema.org `openingHours`, contact page
- **What to provide:**
  - Your timezone (e.g., `PKT` / `Asia/Karachi` / `UTC+5`)
  - Working hours (e.g., Mon–Fri 10:00–18:00 PKT)
  - Or "Available 24/7" if that's accurate

## 6. Review Collection from Existing Clients

- [ ] Ask Dean Russell for a Google Business review (if GBP is set up)
- [ ] Ask 3–5 past Fiverr/Upwork clients to leave reviews on:
  - Google Business Profile
  - Fiverr (if not already reviewed)
  - Upwork (if contract is closed)
- [ ] Screenshot or export any positive DM/email feedback for use as testimonials (with permission)
- [ ] Add structured `Review` schema for each real testimonial on the site

## 7. Environment Variables to Set in Vercel

Go to **Vercel Dashboard > Project Settings > Environment Variables** and add:

| Variable | Value | Notes |
|----------|-------|-------|
| `INDEXNOW_KEY` | Your generated IndexNow key string | Used by `/api/indexnow` and key file route |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console verification code | The `content` value from the meta tag Google gives you |
| `NEXT_PUBLIC_BING_VERIFICATION` | Bing Webmaster Tools verification code | The `content` value from the meta tag Bing gives you |

Set for **Production** environment (and Preview if desired).

## 8. Note on llms.txt

`llms.txt` is **NOT** used by Google, OpenAI, Anthropic, or Perplexity for ranking or crawling decisions. It is a community convention, not a standard. What matters is:

- **Correctness** of the information in it
- **robots.txt** for actual crawl control
- **Structured data** (Schema.org) for machine-readable content
- **Content quality** for AI training data selection

Do not spend time optimizing `llms.txt` for ranking. Just keep it factually accurate.

## 9. Vercel Domain Setup

Configure DNS for `atifmalik.me` at your domain registrar:

| Type | Name | Value |
|------|------|-------|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

- [ ] Add both records at your registrar (Namecheap, GoDaddy, Cloudflare, etc.)
- [ ] In Vercel Dashboard > Project Settings > Domains, add `atifmalik.me` and `www.atifmalik.me`
- [ ] Set `atifmalik.me` as primary (redirect `www` to apex, or vice versa — pick one)
- [ ] Wait for DNS propagation (up to 48 hours, usually under 1 hour)
- [ ] Verify HTTPS is active (Vercel provisions SSL automatically)
- [ ] Test: `curl -I https://atifmalik.me` should return `200 OK`
