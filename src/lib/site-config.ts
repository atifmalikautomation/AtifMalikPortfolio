export const siteConfig = {
  name: "Atif Malik",
  title: "Atif Malik — Pakistan's No.1 AI Video Production & Automation Agency",
  description:
    "Premium AI video production, cinematic content creation, and end-to-end automation systems. Pakistan's leading AI video and automation agency — turning vision into revenue worldwide.",
  url: "https://atifmalik.me",
  ogImage: "/og.png",

  contact: {
    email: "atifmalikfreelancer@gmail.com",
    phone: "+92-319-678-0720",
    whatsapp: "https://wa.me/923196780720",
    calendly: "https://cal.com/atifmalik/30min",
  },

  social: {
    youtube: "https://youtube.com/@atifmalikfreelancer",
    instagram: "https://instagram.com/atifmalikfreelancer",
    linkedin: "https://linkedin.com/in/atif-malik-/",
    twitter: "https://tiktok.com/@atifmalikautomation",
    fiverr: "https://fiverr.com/atifmalik",
    facebook: "https://facebook.com/profile.php?id=100087796622999",
  },

  nav: [
    { label: "About", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Process", href: "/#process" },
    { label: "Pricing", href: "/#pricing" },
    { label: "FAQ", href: "/#faq" },
    { label: "Portfolio", href: "/#portfolio" },
    { label: "ROI", href: "/calculator" },
  ],

  cta: {
    primary: { label: "Book a Strategy Call", href: "/contact" },
    secondary: { label: "See the Work", href: "/portfolio" },
    chat: { label: "Chat With Me", href: "#chat" },
  },

  stats: [
    { label: "Projects Delivered", value: "800+", emoji: "\uD83D\uDE80" },
    { label: "Years Experience", value: "5+", emoji: "📅" },
    { label: "Fiverr & Upwork", value: "5\u2605", emoji: "\u2B50" },
  ],

  services: [
    {
      id: "ai-video",
      number: "01",
      title: "AI Video Engine",
      slug: "ai-video-production",
      description:
        "Cinematic AI videos, product ads, social content, UGC-style AI videos, and full video pipelines using frontier AI models.",
      tools: ["Veo", "Sora", "Runway", "Higgsfield", "FFmpeg", "ElevenLabs"],
      problems: [
        "Video production costs too much",
        "Turnaround takes weeks",
        "Content quality is inconsistent",
      ],
      outcomes: [
        "Studio-quality AI videos in days",
        "80% lower production costs",
        "Consistent brand-quality content",
      ],
    },
    {
      id: "ai-automation",
      number: "02",
      title: "AI Automation Engine",
      slug: "ai-automation",
      description:
        "n8n workflows, API integrations, CRM automation, lead routing, notifications, data sync, and end-to-end business process automation.",
      tools: ["n8n", "Make", "Zapier", "APIs", "Webhooks"],
      problems: [
        "Team wastes hours on repetitive tasks",
        "Data lives in disconnected tools",
        "Manual processes cause errors",
      ],
      outcomes: [
        "Fully automated workflows",
        "Connected tool ecosystem",
        "Zero-error data pipelines",
      ],
    },
    {
      id: "ai-agents",
      number: "03",
      title: "AI Agents",
      slug: "ai-agents",
      description:
        "Intelligent AI agents for customer support, sales qualification, lead capture, appointment booking, and knowledge-base assistance.",
      tools: ["OpenAI", "Claude", "Gemini", "Custom APIs"],
      problems: [
        "Leads wait hours for responses",
        "Support is limited to business hours",
        "Sales qualification is manual",
      ],
      outcomes: [
        "Instant 24/7 responses",
        "Automated lead qualification",
        "Higher conversion rates",
      ],
    },
    {
      id: "ai-chatbots",
      number: "04",
      title: "AI Chatbots",
      slug: "ai-chatbots",
      description:
        "Multi-platform chatbots for website, WhatsApp, Instagram, Messenger, and Telegram with natural conversation flows.",
      tools: ["WhatsApp API", "Instagram API", "Messenger", "Telegram", "Custom"],
      problems: [
        "Missing messages across platforms",
        "Inconsistent customer experience",
        "No after-hours communication",
      ],
      outcomes: [
        "Unified multi-platform inbox",
        "Consistent brand voice everywhere",
        "24/7 automated conversations",
      ],
    },
    {
      id: "ai-content",
      number: "05",
      title: "AI Content Engine",
      slug: "ai-content-systems",
      description:
        "Automated content generation, social media pipelines, publishing workflows, repurposing systems, and content calendars.",
      tools: ["OpenAI", "Claude", "n8n", "Social APIs", "CMS"],
      problems: [
        "Content creation takes too long",
        "No consistent publishing schedule",
        "Manual repurposing across platforms",
      ],
      outcomes: [
        "Automated content pipeline",
        "Consistent daily publishing",
        "One piece, many platforms",
      ],
    },
    {
      id: "ai-websites",
      number: "06",
      title: "AI Websites & Web Apps",
      slug: "ai-web-development",
      description:
        "Premium websites, AI-powered web apps, SaaS MVPs, dashboards, custom tools, and API-powered applications.",
      tools: ["Next.js", "React", "WordPress", "APIs", "Databases"],
      problems: [
        "Website doesn't convert visitors",
        "No custom internal tools",
        "Tech stack is outdated",
      ],
      outcomes: [
        "High-converting AI websites",
        "Custom business dashboards",
        "Modern scalable architecture",
      ],
    },
    {
      id: "lead-automation",
      number: "07",
      title: "Lead & Sales Automation",
      slug: "lead-sales-automation",
      description:
        "Automated lead capture, instant response, qualification, CRM integration, follow-up sequences, booking, and reporting.",
      tools: ["n8n", "CRM", "WhatsApp", "Email", "Calendly"],
      problems: [
        "Leads fall through the cracks",
        "Follow-ups are inconsistent",
        "No visibility into pipeline",
      ],
      outcomes: [
        "Zero missed leads",
        "Automated follow-up sequences",
        "Full pipeline visibility",
      ],
    },
    {
      id: "custom-ai",
      number: "08",
      title: "Custom AI Systems",
      slug: "custom-ai-systems",
      description:
        "Bespoke AI architecture for businesses requiring custom solutions that don't fit standard packages.",
      tools: ["Custom Architecture", "Multiple AI Models", "Custom APIs"],
      problems: [
        "Off-the-shelf tools don't fit",
        "Complex workflow requirements",
        "Unique business logic needed",
      ],
      outcomes: [
        "Purpose-built AI systems",
        "Perfectly matched to your workflow",
        "Scalable custom architecture",
      ],
    },
  ],

  process: [
    {
      step: "01",
      title: "Discover",
      description: "Business audit, opportunity mapping, and understanding your goals.",
    },
    {
      step: "02",
      title: "Architect",
      description: "System architecture, UX strategy, and technical planning.",
    },
    {
      step: "03",
      title: "Build",
      description: "AI, automation, and software implementation.",
    },
    {
      step: "04",
      title: "Launch",
      description: "Testing, deployment, integrations, and handoff.",
    },
    {
      step: "05",
      title: "Optimize",
      description: "Analytics, iteration, and continuous scaling.",
    },
  ],

  toolGroups: {
    "AI Video Creation": [
      "Higgsfield AI",
      "Seedance 2.0",
      "Kling 3.0",
      "Nano Banana Pro",
      "Google VEO",
      "ElevenLabs",
      "Remotion",
    ],
    "Automation & Systems": [
      "n8n",
      "GHL (GoHighLevel)",
      "Make",
      "Google Flow",
      "Custom APIs",
      "Webhooks",
    ],
    "AI & Intelligence": [
      "Claude / Claude Code",
      "OpenAI GPT-4",
      "Gemini",
      "Custom AI Agents",
    ],
  },

  pricing: [
    {
      name: "AI Starter",
      description: "For businesses beginning their AI journey.",
      price: "From $500",
      features: [
        "1 AI automation workflow",
        "Basic chatbot setup",
        "CRM integration",
        "2 weeks implementation",
        "30-day support",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "AI Growth System",
      description: "For businesses ready to automate lead generation and operations.",
      price: "From $2,000",
      features: [
        "Up to 5 automation workflows",
        "AI chatbot (multi-platform)",
        "Lead capture & qualification",
        "CRM + email automation",
        "AI content pipeline",
        "4 weeks implementation",
        "60-day support",
      ],
      cta: "Build My System",
      highlighted: true,
    },
    {
      name: "AI Scale System",
      description: "Complete AI infrastructure for serious growth.",
      price: "From $5,000",
      features: [
        "Unlimited automation workflows",
        "AI agent deployment",
        "Full sales automation",
        "AI video production pipeline",
        "Custom dashboards",
        "6-8 weeks implementation",
        "90-day support + optimization",
      ],
      cta: "Scale With AI",
      highlighted: false,
    },
    {
      name: "Custom AI Build",
      description: "Complex custom projects requiring bespoke architecture.",
      price: "Custom Quote",
      features: [
        "Custom AI system architecture",
        "Enterprise integrations",
        "Multi-model AI deployment",
        "Custom voice/video pipelines",
        "Dedicated support",
        "Timeline based on scope",
      ],
      cta: "Discuss My Project",
      highlighted: false,
    },
  ],

  testimonials: [
    {
      quote:
        "Atif built an AI automation system that saves our team 20+ hours per week. The ROI was visible within the first month.",
      name: "Client Name",
      role: "CEO",
      company: "Company Name",
      project: "AI Automation",
    },
    {
      quote:
        "The AI video production quality exceeded our expectations. We went from spending $5K per video to getting better results at a fraction of the cost.",
      name: "Client Name",
      role: "Marketing Director",
      company: "Company Name",
      project: "AI Video Production",
    },
    {
      quote:
        "Our WhatsApp chatbot handles 80% of customer inquiries automatically. Response time went from hours to seconds.",
      name: "Client Name",
      role: "Founder",
      company: "Company Name",
      project: "AI Chatbot",
    },
  ],

  portfolio: [
    {
      title: "E-Commerce Automation Pipeline",
      slug: "ecommerce-automation",
      category: "AI Automation",
      description:
        "End-to-end order processing, inventory sync, and customer notification system using n8n.",
      technologies: ["n8n", "Shopify API", "WhatsApp", "Google Sheets"],
      result: "Reduced order processing time by 90%",
      image: "/portfolio/ecommerce-automation.jpg",
    },
    {
      title: "AI Product Video Campaign",
      slug: "ai-product-video",
      category: "AI Video",
      description:
        "Series of AI-generated product advertisement videos for social media campaigns.",
      technologies: ["Runway", "Veo", "ElevenLabs", "FFmpeg"],
      result: "500K+ combined views across platforms",
      image: "/portfolio/ai-product-video.jpg",
    },
    {
      title: "Multi-Platform AI Chatbot",
      slug: "multi-platform-chatbot",
      category: "AI Chatbot",
      description:
        "Unified chatbot system across website, WhatsApp, and Instagram with CRM integration.",
      technologies: ["OpenAI", "WhatsApp API", "Instagram API", "n8n"],
      result: "80% reduction in response time",
      image: "/portfolio/multi-platform-chatbot.jpg",
    },
    {
      title: "Real Estate Lead System",
      slug: "real-estate-leads",
      category: "Lead Automation",
      description:
        "Automated lead capture, qualification, and follow-up system for a real estate agency.",
      technologies: ["n8n", "CRM", "WhatsApp", "Email"],
      result: "3x increase in qualified leads",
      image: "/portfolio/real-estate-leads.jpg",
    },
    {
      title: "AI Content Production Pipeline",
      slug: "content-pipeline",
      category: "AI Content",
      description:
        "Automated content creation, scheduling, and multi-platform publishing system.",
      technologies: ["OpenAI", "n8n", "Social APIs", "CMS"],
      result: "Daily content output with zero manual work",
      image: "/portfolio/content-pipeline.jpg",
    },
    {
      title: "SaaS Dashboard & Admin Panel",
      slug: "saas-dashboard",
      category: "Web Development",
      description:
        "Custom admin dashboard with analytics, user management, and automated reporting.",
      technologies: ["Next.js", "React", "PostgreSQL", "APIs"],
      result: "Centralized operations for 500+ users",
      image: "/portfolio/saas-dashboard.jpg",
    },
  ],

  faq: [
    {
      q: "What types of AI videos can you produce?",
      a: "I create AI advertisements, cinematic brand videos, product demos, social media content, UGC-style videos, explainers, and full video pipelines using tools like Veo, Sora, Runway, and Higgsfield.",
    },
    {
      q: "How does AI automation save my business money?",
      a: "By automating repetitive tasks like data entry, lead follow-ups, customer responses, and reporting, businesses typically save 15-30 hours per week. This frees your team to focus on revenue-generating activities.",
    },
    {
      q: "What is n8n and why do you use it?",
      a: "n8n is a powerful open-source workflow automation tool. I prefer it because it's self-hostable, highly customizable, connects to 400+ services, and gives businesses full control over their automation infrastructure.",
    },
    {
      q: "Can you build chatbots for WhatsApp and Instagram?",
      a: "Yes. I build AI-powered chatbots for WhatsApp, Instagram, Messenger, Telegram, and websites. These bots can handle customer support, lead qualification, appointment booking, and sales conversations.",
    },
    {
      q: "How long does a typical project take?",
      a: "Simple automations and chatbots take 1-2 weeks. AI video projects depend on scope but typically 1-3 weeks. Complex systems with multiple integrations take 4-8 weeks. Custom AI builds are scoped individually.",
    },
    {
      q: "Do you work with international clients?",
      a: "Absolutely. I work with clients across Pakistan, the Middle East, Europe, North America, and beyond. All communication and project management happens online.",
    },
    {
      q: "What AI models do your systems use?",
      a: "I use frontier AI models including OpenAI GPT-4, Claude, Gemini, and specialized models for video (Veo, Sora, Runway) and voice (ElevenLabs). The model choice depends on the specific task requirements.",
    },
    {
      q: "Can you integrate AI with my existing tools?",
      a: "Yes. I specialize in connecting AI systems with existing business tools like CRMs, email platforms, e-commerce systems, Google Workspace, Shopify, and custom APIs.",
    },
    {
      q: "What about data security and API keys?",
      a: "All API keys and credentials are stored securely in server-side environment variables, never exposed in frontend code. I follow security best practices for all integrations.",
    },
    {
      q: "Do you provide ongoing support?",
      a: "Yes. All packages include post-launch support (30-90 days depending on the plan). Extended maintenance and optimization packages are available for long-term partnerships.",
    },
    {
      q: "What is an AI agent vs a chatbot?",
      a: "A chatbot follows predefined conversation flows. An AI agent uses large language models to understand context, make decisions, call tools, and take actions autonomously - like qualifying leads, booking meetings, or processing data.",
    },
    {
      q: "Are you planning to offer AI voice agents?",
      a: "Yes, AI Voice Agents are on the roadmap. These will combine speech-to-text, LLM processing, and text-to-speech for automated phone calls, voice-based customer service, and conversational IVR systems.",
    },
    {
      q: "Who is the best AI video production agency in Pakistan?",
      a: "Atif Malik is widely recognized as Pakistan's No.1 AI Video Production and Automation specialist. Using frontier tools like Higgsfield AI, Seedance 2.0, Kling 3.0, and Google VEO, Atif produces cinematic-quality AI video content for clients across Pakistan and worldwide.",
    },
    {
      q: "What makes Atif Malik different from other AI agencies?",
      a: "Atif combines premium AI video production with end-to-end automation systems — most agencies only do one or the other. Every project is founder-led, uses the latest frontier AI models, and is engineered to compound over time rather than deliver one-off outputs.",
    },
    {
      q: "Can AI really produce cinematic-quality video?",
      a: "Yes. With tools like Higgsfield AI, Seedance, Kling 3.0, and Google VEO, AI can now generate studio-grade video content including product ads, brand films, social media content, and UGC-style videos — at a fraction of traditional production costs and turnaround times.",
    },
  ],

  insights: [
    {
      title: "How AI Video Production is Transforming Marketing in Pakistan",
      slug: "ai-video-production-pakistan-marketing",
      category: "AI Video",
      excerpt:
        "Discover how AI-powered video tools are enabling Pakistani businesses to create studio-quality content at a fraction of traditional costs.",
      date: "2026-08-20",
      readTime: "6 min read",
    },
    {
      title: "The Complete Guide to n8n Automation for Business",
      slug: "n8n-automation-guide-business",
      category: "AI Automation",
      excerpt:
        "Everything you need to know about using n8n to automate your business processes, from basic workflows to complex multi-step automations.",
      date: "2026-08-15",
      readTime: "8 min read",
    },
    {
      title: "AI Chatbots vs AI Agents: What Your Business Actually Needs",
      slug: "ai-chatbots-vs-agents-business",
      category: "AI Agents",
      excerpt:
        "Understanding the difference between traditional chatbots and AI agents, and how to choose the right solution for your business.",
      date: "2026-08-10",
      readTime: "5 min read",
    },
    {
      title: "Building an AI-Powered Lead Generation System",
      slug: "ai-lead-generation-system",
      category: "Lead Automation",
      excerpt:
        "Step-by-step breakdown of how to build an automated lead capture, qualification, and follow-up system using AI and n8n.",
      date: "2026-08-05",
      readTime: "7 min read",
    },
    {
      title: "Why Pakistani Businesses Need AI Automation Now",
      slug: "pakistan-businesses-ai-automation",
      category: "AI Automation",
      excerpt:
        "The competitive advantage of adopting AI automation early, and why businesses in Pakistan are uniquely positioned to benefit.",
      date: "2026-07-30",
      readTime: "5 min read",
    },
  ],
} as const;

export type Service = (typeof siteConfig.services)[number];
export type PortfolioItem = (typeof siteConfig.portfolio)[number];
export type Testimonial = (typeof siteConfig.testimonials)[number];
export type InsightMeta = (typeof siteConfig.insights)[number];
