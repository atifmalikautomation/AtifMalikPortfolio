import { siteConfig } from "@/lib/site-config";

export function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Atif Malik",
    url: siteConfig.url,
    image: `${siteConfig.url}/images/atif.jpeg`,
    jobTitle: "AI Video Production & Automation Specialist",
    description:
      "Pakistan's No.1 AI Video Production and Automation expert. Building cinematic AI content, end-to-end automation systems, and intelligent agents for businesses worldwide.",
    knowsAbout: [
      "AI Video Production",
      "AI Video Creation",
      "AI Automation",
      "AI Agents",
      "AI Chatbots",
      "n8n Automation",
      "GoHighLevel",
      "Higgsfield AI",
      "Business Process Automation",
      "Web Development",
    ],
    sameAs: Object.values(siteConfig.social),
    address: {
      "@type": "PostalAddress",
      addressCountry: "PK",
    },
    worksFor: {
      "@type": "Organization",
      name: "Atif Malik AI Agency",
      url: siteConfig.url,
    },
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Atif Malik — AI Video Production & Automation Agency",
    url: siteConfig.url,
    image: `${siteConfig.url}/images/atif.jpeg`,
    logo: `${siteConfig.url}/favicon.ico`,
    description:
      "Premium AI video production, cinematic content creation, and end-to-end automation systems. Pakistan's leading AI video and automation agency.",
    founder: { "@type": "Person", name: "Atif Malik" },
    areaServed: [
      { "@type": "Country", name: "Pakistan" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Saudi Arabia" },
      { "@type": "Country", name: "Canada" },
      "Worldwide",
    ],
    serviceType: [
      "AI Video Production",
      "AI Video Creation",
      "AI Automation",
      "AI Agent Development",
      "AI Chatbot Development",
      "n8n Workflow Automation",
      "GoHighLevel Implementation",
      "Web Application Development",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Services",
      itemListElement: siteConfig.pricing.map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        description: plan.description,
        priceCurrency: "USD",
        price: plan.price === "Custom Quote" ? undefined : plan.price.replace("From $", ""),
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "USD",
          price: plan.price === "Custom Quote" ? undefined : plan.price.replace("From $", ""),
        },
      })),
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "PK",
    },
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "800",
      bestRating: "5",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: { "@type": "Person", name: "Atif Malik" },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/insights?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/services` },
      { "@type": "ListItem", position: 3, name: "Portfolio", item: `${siteConfig.url}/portfolio` },
      { "@type": "ListItem", position: 4, name: "Insights", item: `${siteConfig.url}/insights` },
      { "@type": "ListItem", position: 5, name: "Contact", item: `${siteConfig.url}/contact` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: siteConfig.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const schemas = [
    personSchema,
    professionalServiceSchema,
    websiteSchema,
    breadcrumbSchema,
    faqSchema,
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
