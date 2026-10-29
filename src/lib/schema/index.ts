import { siteConfig } from "@/lib/site-config";

const BASE = siteConfig.url;

// Stable @id references used across pages
const ID = {
  person: `${BASE}/#person`,
  org: `${BASE}/#organization`,
  website: `${BASE}/#website`,
  webpage: (url: string) => `${url}#webpage`,
  service: (slug: string) => `${BASE}/services/${slug}#service`,
  breadcrumb: (url: string) => `${url}#breadcrumb`,
} as const;

// ── Person (Atif Malik) ──
function personSchema() {
  return {
    "@type": "Person",
    "@id": ID.person,
    name: "Atif Malik",
    url: BASE,
    image: `${BASE}/images/atif.jpeg`,
    jobTitle: "AI Video Production & Automation Specialist",
    description:
      "Pakistan's leading AI Video Production and Automation specialist. 800+ projects delivered across AI video, n8n automation, AI chatbots, and intelligent agents for businesses worldwide.",
    knowsAbout: [
      "AI Video Production", "AI Automation", "n8n", "GoHighLevel",
      "AI Agents", "AI Chatbots", "Next.js", "Higgsfield AI",
      "Kling", "Google VEO", "ElevenLabs", "Make", "Zapier",
      "Business Process Automation", "Web Development",
    ],
    sameAs: Object.values(siteConfig.social),
    address: { "@type": "PostalAddress", addressCountry: "PK" },
    worksFor: { "@id": ID.org },
  };
}

// ── Organization ──
function orgSchema() {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ID.org,
    name: "Atif Malik",
    url: BASE,
    logo: {
      "@type": "ImageObject",
      url: `${BASE}/icon-512.png`,
      width: 512,
      height: 512,
    },
    image: `${BASE}/images/atif.jpeg`,
    founder: { "@id": ID.person },
    description: siteConfig.description,
    slogan: "Pakistan's No.1 AI Video Production & Automation Agency",
    areaServed: [
      { "@type": "Country", name: "Pakistan" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Saudi Arabia" },
      { "@type": "Country", name: "Canada" },
    ],
    address: { "@type": "PostalAddress", addressCountry: "PK" },
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phone,
      contactType: "sales",
      availableLanguage: ["English", "Urdu"],
    },
    sameAs: Object.values(siteConfig.social),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Services",
      itemListElement: siteConfig.pricing.map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        description: plan.description,
        priceCurrency: "USD",
        ...(plan.price !== "Custom Quote" && {
          price: plan.price.replace("From $", "").replace(",", ""),
        }),
      })),
    },
  };
}

// ── WebSite ──
function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": ID.website,
    name: siteConfig.name,
    url: BASE,
    publisher: { "@id": ID.org },
    inLanguage: "en",
  };
}

// ── WebPage (per page) ──
function webpageSchema(opts: {
  url: string;
  title: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@type": "WebPage",
    "@id": ID.webpage(opts.url),
    url: opts.url,
    name: opts.title,
    description: opts.description,
    isPartOf: { "@id": ID.website },
    about: { "@id": ID.org },
    ...(opts.datePublished && { datePublished: opts.datePublished }),
    ...(opts.dateModified && { dateModified: opts.dateModified }),
  };
}

// ── BreadcrumbList ──
function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": ID.breadcrumb(items[items.length - 1]?.url || BASE),
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ── Service ──
function serviceSchema(service: (typeof siteConfig.services)[number]) {
  return {
    "@type": "Service",
    "@id": ID.service(service.slug),
    name: service.title,
    serviceType: service.title,
    description: service.description,
    provider: { "@id": ID.org },
    areaServed: [
      { "@type": "Country", name: "Pakistan" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Arab Emirates" },
    ],
  };
}

// ── BlogPosting ──
function blogPostingSchema(article: {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  readTime?: string;
}) {
  const url = `${BASE}/insights/${article.slug}`;
  return {
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    author: { "@id": ID.person },
    publisher: { "@id": ID.org },
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: { "@id": ID.webpage(url) },
    url,
    inLanguage: "en",
  };
}

// ── FAQPage ──
function faqSchema(items: readonly { readonly q: string; readonly a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

// ── Public API: build @graph for each page type ──

export function buildHomeSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personSchema(),
      orgSchema(),
      websiteSchema(),
      webpageSchema({
        url: BASE,
        title: siteConfig.title,
        description: siteConfig.description,
      }),
      breadcrumbSchema([{ name: "Home", url: BASE }]),
      faqSchema(siteConfig.faq),
    ],
  };
}

export function buildServicePageSchema(service: (typeof siteConfig.services)[number]) {
  const url = `${BASE}/services/${service.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      personSchema(),
      orgSchema(),
      websiteSchema(),
      webpageSchema({
        url,
        title: `${service.title} — Atif Malik AI Services`,
        description: service.description,
      }),
      breadcrumbSchema([
        { name: "Home", url: BASE },
        { name: "Services", url: `${BASE}/services` },
        { name: service.title, url },
      ]),
      serviceSchema(service),
    ],
  };
}

export function buildPortfolioPageSchema(project: {
  title: string;
  slug: string;
  description: string;
  category: string;
  result: string;
}) {
  const url = `${BASE}/portfolio/${project.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      personSchema(),
      orgSchema(),
      websiteSchema(),
      webpageSchema({
        url,
        title: `${project.title} — Case Study`,
        description: project.description,
      }),
      breadcrumbSchema([
        { name: "Home", url: BASE },
        { name: "Portfolio", url: `${BASE}/portfolio` },
        { name: project.title, url },
      ]),
      {
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        creator: { "@id": ID.org },
        about: project.category,
      },
    ],
  };
}

export function buildInsightPageSchema(article: {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  readTime?: string;
}) {
  const url = `${BASE}/insights/${article.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      personSchema(),
      orgSchema(),
      websiteSchema(),
      webpageSchema({
        url,
        title: article.title,
        description: article.excerpt,
        datePublished: article.date,
        dateModified: article.date,
      }),
      breadcrumbSchema([
        { name: "Home", url: BASE },
        { name: "Insights", url: `${BASE}/insights` },
        { name: article.title, url },
      ]),
      blogPostingSchema(article),
    ],
  };
}

export function buildAboutSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personSchema(),
      orgSchema(),
      websiteSchema(),
      webpageSchema({
        url: `${BASE}/about`,
        title: "About Atif Malik — AI Growth Systems Expert",
        description: "Meet Atif Malik. AI video production specialist, automation architect, and full-stack builder.",
      }),
      breadcrumbSchema([
        { name: "Home", url: BASE },
        { name: "About", url: `${BASE}/about` },
      ]),
      {
        "@type": "ProfilePage",
        mainEntity: { "@id": ID.person },
      },
    ],
  };
}

export function buildContactSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personSchema(),
      orgSchema(),
      websiteSchema(),
      webpageSchema({
        url: `${BASE}/contact`,
        title: "Contact — Let's Build Your AI System",
        description: "Get in touch with Atif Malik for AI video production, automation, and AI systems.",
      }),
      breadcrumbSchema([
        { name: "Home", url: BASE },
        { name: "Contact", url: `${BASE}/contact` },
      ]),
      {
        "@type": "ContactPage",
        mainEntity: { "@id": ID.org },
      },
    ],
  };
}

export function buildCalculatorSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personSchema(),
      orgSchema(),
      websiteSchema(),
      webpageSchema({
        url: `${BASE}/calculator`,
        title: "AI ROI Calculator — See How Much You're Losing Without AI",
        description: "Free AI ROI calculator. Find out exactly how much revenue your business is leaving on the table.",
      }),
      breadcrumbSchema([
        { name: "Home", url: BASE },
        { name: "ROI Calculator", url: `${BASE}/calculator` },
      ]),
      {
        "@type": "WebApplication",
        name: "AI ROI Calculator",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@id": ID.org },
      },
    ],
  };
}

export function buildGenericPageSchema(opts: {
  url: string;
  title: string;
  description: string;
  breadcrumbs: { name: string; url: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personSchema(),
      orgSchema(),
      websiteSchema(),
      webpageSchema(opts),
      breadcrumbSchema(opts.breadcrumbs),
    ],
  };
}
