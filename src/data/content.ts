/**
 * Source of truth: Digitz Creative Portfolio — Designer Brief (15 pages)
 * plus the official client wall graphic for names, phone, and site URL.
 *
 * Stats should be replaced if newer verified figures are supplied.
 * Testimonials: brief requires verified quotes with permission. Placeholders
 * are labeled as such and must not be presented as real reviews.
 */

export const brand = {
  name: 'Digitz Creative',
  tagline: 'Elevating Brands Digitally',
  positioning:
    'Strategy + Content + Marketing + Digital Solutions, delivered under one roof.',
  message:
    'We turn businesses into brands through creative content, strategic marketing and digital solutions.',
  location: 'Trichy, Tamil Nadu',
  founder: 'Faizal Ahamed',
  founderHandle: 'Foodiee Faizall',
  phoneDisplay: '+91 99946 39700',
  phoneTel: '+919994639700',
  whatsapp: '919994639700',
  websiteDisplay: 'www.digitzcreative.com',
  websiteUrl: 'https://www.digitzcreative.com',
  instagram: '@digitzcreative',
  instagramUrl: 'https://www.instagram.com/digitzcreative',
  socialHandle: 'Digitz Creative',
} as const

export const whatsappUrl = (text?: string) => {
  const message =
    text ??
    "Hi Digitz Creative — I'd like to discuss a project for my business."
  return `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(message)}`
}

export const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#clients', label: 'Clients' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
] as const

/** Never Settle–style mega menu (Digitz sections) */
export const megaNav = [
  {
    id: 'services',
    label: 'Services',
    href: '#services',
    columns: [
      {
        title: 'Growth',
        links: [
          { label: 'Influencer Marketing', href: '#services' },
          { label: 'Performance Marketing', href: '#services' },
          { label: 'Personal Branding', href: '#services' },
        ],
      },
      {
        title: 'Content',
        links: [
          { label: 'Reel Production', href: '#work' },
          { label: 'Social Media Management', href: '#services' },
          { label: 'Campaign Creatives', href: '#work' },
        ],
      },
      {
        title: 'Digital',
        links: [
          { label: 'Websites & Apps', href: '#services' },
          { label: 'WhatsApp API', href: '#services' },
          { label: 'Business Listings', href: '#services' },
        ],
      },
    ],
    blurb: 'Strategy, content and paid growth under one roof.',
    cta: { label: 'See all services', href: '#services' },
  },
  {
    id: 'work',
    label: 'Work',
    href: '#work',
    columns: [
      {
        title: 'Selected',
        links: [
          { label: 'Campaign Gallery', href: '#gallery' },
          { label: 'Case Studies', href: '#work' },
          { label: 'Client Brands', href: '#clients' },
        ],
      },
    ],
    blurb: 'Reels, campaigns and brand builds for local businesses.',
    cta: { label: 'View work', href: '#work' },
  },
  {
    id: 'company',
    label: 'Company',
    href: '#founder',
    columns: [
      {
        title: 'Digitz',
        links: [
          { label: 'About / Founder', href: '#founder' },
          { label: 'Why Digitz', href: '#why' },
          { label: 'Packages', href: '#packages' },
          { label: 'Contact', href: '#contact' },
        ],
      },
    ],
    blurb: 'Trichy-based creative marketing for brands that want growth.',
    cta: { label: 'Contact us', href: '#contact' },
  },
  {
    id: 'solutions',
    label: 'Solutions',
    href: '#process',
    columns: [
      {
        title: 'How we work',
        links: [
          { label: 'Our Process', href: '#process' },
          { label: 'Retainers', href: '#packages' },
          { label: 'Start a Project', href: '#contact' },
        ],
      },
    ],
    blurb: 'On time. On budget. Built for measurable business impact.',
    cta: { label: 'Start a project', href: '#contact' },
  },
] as const

export const hero = {
  eyebrow: 'Creative Marketing Agency',
  headlineBefore: 'Building',
  headlineAccent: 'Campaigns',
  /**
   * Brush SVG cycle (Never Settle stroke assets) — Digitz marketing words.
   * Full service titles stay in the Services section.
   */
  handwriteWords: [
    { label: 'Campaigns', file: 'campaigns' },
    { label: 'Brands', file: 'brands' },
    { label: 'Products', file: 'products' },
    { label: 'Ads', file: 'ads' },
    { label: 'Apps', file: 'apps' },
    { label: 'Websites', file: 'websites' },
  ] as const,
  headlineAfter: 'That Grow Business',
  support:
    'We help brands tell better stories, reach the right audience and turn ideas into real business growth.',
  annotation: 'Creative Ideas → Real Results',
  rotating: ['On Time', 'On Budget', 'Digitz Creative'] as const,
  trustedLabel: 'Trusted by',
  primaryCta: "Let's Talk",
  secondaryCta: 'See our work',
} as const

/** Hero quotes — replace with verified testimonials when available */
export const heroQuotes = [
  {
    quote:
      'We were impressed with their willingness to support us within our growth structure.',
    attribution: 'Local Partner',
    company: 'Trichy Brand',
    image: 'https://i.pravatar.cc/96?img=12',
    note: 'Placeholder tone — swap for verified quote',
  },
  {
    quote:
      "They're super communicative and easy to work with. Digitz hit the ground running with the work.",
    attribution: 'Business Owner',
    company: 'Client Brand',
    image: 'https://i.pravatar.cc/96?img=32',
    note: 'Placeholder tone — swap for verified quote',
  },
  {
    quote:
      "The brand messaging doesn't just read — you feel it. Content that actually moves the business.",
    attribution: 'Founder',
    company: 'Growth Client',
    image: 'https://i.pravatar.cc/96?img=47',
    note: 'Placeholder tone — swap for verified quote',
  },
] as const

/** Satellite cards for the hero collage (demo layout only) */
export const heroCollage = [
  {
    id: 'left',
    quote: 'Clear strategy and creatives that actually convert for local brands.',
    attribution: 'Sarah J.',
    company: 'CEO, Bloom Co.',
    image: 'https://i.pravatar.cc/96?img=5',
  },
  {
    id: 'right',
    quote: 'A partner that understands Trichy businesses and still feels premium.',
    attribution: 'Sarah J.',
    company: 'CEO, Bloom Co.',
    image: 'https://i.pravatar.cc/96?img=9',
  },
  {
    id: 'bottom',
    quote: 'Unbeatable strategic approach to the optimal strategy campaign.',
    attribution: 'Modernize Tech',
    company: 'Web Brand',
    image: '',
    logo: 'M',
  },
] as const

export const heroRating = {
  score: '9.8',
  label: '/ 10 Client Rating',
} as const

export const numbersNote =
  'Figures are based on selected client engagements and reported project outcomes.'

export const impactSection = {
  eyebrow: '02 — Our Impact',
  titleLine1: 'Results built through',
  titleLine2: 'strategy + creativity.',
  support: 'Every project is measured by the impact it creates for the business.',
  note: numbersNote,
} as const

export const impactMetrics = [
  {
    index: '01',
    label: 'Clients',
    target: 180,
    description: 'Clients Served',
    detail: 'Brands across food, lifestyle, and local services.',
  },
  {
    index: '02',
    label: 'Pipeline',
    target: 10000,
    description: 'Lead Conversations',
    detail: 'Qualified conversations driven by content + paid.',
  },
  {
    index: '03',
    label: 'Revenue',
    target: 1,
    description: 'Client Revenue Generated',
    detail: 'Attributed growth from selected retained engagements.',
  },
] as const

/** @deprecated Prefer impactMetrics — kept for compatibility */
export const stats = [
  {
    id: '01',
    metric: 'METRIC 01',
    value: '180+',
    description: 'Clients served',
    accent: false,
  },
  {
    id: '02',
    metric: 'METRIC 02',
    value: '10,000+',
    description: 'Lead conversations',
    accent: true,
  },
  {
    id: '03',
    metric: 'METRIC 03',
    value: '₹1 Cr+',
    description: 'Client revenue generated',
    accent: false,
  },
] as const

export const servicesIntro = {
  eyebrow: 'Our Services',
  titleBefore: 'Creative Solutions for Real Business',
  titleAccent: 'Growth.',
  body: 'We blend strategy, creative, and digital expertise to help brands grow with clarity, consistency, and measurable results.',
  stat: '+320% Organic Traffic Growth',
  note: 'Creative Marketing Real Results',
  watchLabel: 'Watch Our Work',
} as const

export const services = [
  {
    index: '01',
    title: 'Influencer Marketing',
    body: 'Strategic influencer campaigns that connect brands with the right creators — brief, produce, publish, and track performance.',
    features: [
      { title: 'Creator Selection', body: 'Right fit voices for your audience', tone: 'violet', icon: 'users' },
      { title: 'Campaign Briefing', body: 'Clear goals, tone, and deliverables', tone: 'mint', icon: 'pen' },
      { title: 'Content Production', body: 'Shoot and edit with the creator', tone: 'orange', icon: 'megaphone' },
      { title: 'Performance Tracking', body: 'Reach, engagement, and leads', tone: 'coral', icon: 'chart' },
    ],
    works: [
      {
        image:
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
        caption: 'Creator-led product stories',
      },
      {
        image:
          'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
        caption: 'Social-first campaign kits',
      },
      {
        image:
          'https://images.unsplash.com/photo-1512941937669-90a1b58b7fec?auto=format&fit=crop&w=800&q=80',
        caption: 'Mobile-ready influencer cuts',
      },
    ],
  },
  {
    index: '02',
    title: 'Reel Production',
    body: 'Concept → Script → Shoot → Edit → Publish. Short-form content made to stop the scroll and move the business.',
    features: [
      { title: 'Concept & Script', body: 'Hooks built for retention', tone: 'violet', icon: 'pen' },
      { title: 'On-set Direction', body: 'Shoot days that stay on brand', tone: 'mint', icon: 'users' },
      { title: 'Edit & Motion', body: 'Pacing, captions, sound design', tone: 'orange', icon: 'megaphone' },
      { title: 'Publish Ready', body: 'Formats for every platform', tone: 'coral', icon: 'chart' },
    ],
    works: [
      {
        image:
          'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
        caption: 'Event & lifestyle reels',
      },
      {
        image:
          'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
        caption: 'Brand story edits',
      },
      {
        image:
          'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
        caption: 'Product demo cuts',
      },
    ],
  },
  {
    index: '03',
    title: 'Social Media Management',
    body: 'We help brands build strong social presence through content, engagement, and performance-driven campaigns.',
    features: [
      { title: 'Content Creation', body: 'Scroll-stopping visuals and videos', tone: 'violet', icon: 'pen' },
      { title: 'Community Management', body: 'Engage and grow your audience', tone: 'mint', icon: 'users' },
      { title: 'Paid Social Campaigns', body: 'Targeted ads that convert', tone: 'orange', icon: 'megaphone' },
      { title: 'Analytics & Reporting', body: 'Data-backed growth insights', tone: 'coral', icon: 'chart' },
    ],
    works: [
      {
        image:
          'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
        caption: 'Better Choices Brighter Days',
      },
      {
        image:
          'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
        caption: 'The Kind Cafe — Big Ideas',
      },
      {
        image:
          'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80',
        caption: 'Explore More — app UI',
      },
    ],
  },
  {
    index: '04',
    title: 'Personal Branding',
    body: 'Content-led authority building for doctors, entrepreneurs, and business owners who need to be trusted, not just seen.',
    features: [
      { title: 'Positioning', body: 'Clear voice and category claim', tone: 'violet', icon: 'pen' },
      { title: 'Content System', body: 'Weekly posts that compound', tone: 'mint', icon: 'users' },
      { title: 'Shoot Days', body: 'On-brand photo and video kits', tone: 'orange', icon: 'megaphone' },
      { title: 'Growth Loops', body: 'Authority that drives enquiries', tone: 'coral', icon: 'chart' },
    ],
    works: [
      {
        image:
          'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
        caption: 'Founder portrait systems',
      },
      {
        image:
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
        caption: 'Thought-leadership carousels',
      },
      {
        image:
          'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
        caption: 'LinkedIn-first brand kits',
      },
    ],
  },
  {
    index: '05',
    title: 'Performance Marketing',
    body: 'Meta and Google ads focused on reach, leads, and conversions — connecting content with paid growth and reporting.',
    features: [
      { title: 'Campaign Setup', body: 'Structure built for learning', tone: 'violet', icon: 'pen' },
      { title: 'Creative Testing', body: 'Ads that earn attention', tone: 'mint', icon: 'megaphone' },
      { title: 'Retargeting', body: 'Bring warm audiences back', tone: 'orange', icon: 'users' },
      { title: 'Reporting', body: 'Clear CPA and ROAS views', tone: 'coral', icon: 'chart' },
    ],
    works: [
      {
        image:
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        caption: 'Dashboard-led growth',
      },
      {
        image:
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        caption: 'Funnel creative systems',
      },
      {
        image:
          'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80',
        caption: 'Lead-gen landing stacks',
      },
    ],
  },
  {
    index: '06',
    title: 'Digital Solutions',
    body: 'Websites, apps, WhatsApp API, Google Business Profile, and listings that complete the growth stack.',
    features: [
      { title: 'Websites', body: 'Fast, clear conversion sites', tone: 'violet', icon: 'pen' },
      { title: 'Apps & Tools', body: 'Product UI that ships', tone: 'mint', icon: 'users' },
      { title: 'WhatsApp API', body: 'Conversations that convert', tone: 'orange', icon: 'megaphone' },
      { title: 'Local Listings', body: 'GBP and discovery setup', tone: 'coral', icon: 'chart' },
    ],
    works: [
      {
        image:
          'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80',
        caption: 'Brand website builds',
      },
      {
        image:
          'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=800&q=80',
        caption: 'Product landing systems',
      },
      {
        image:
          'https://images.unsplash.com/photo-1512941937669-90a1b58b7fec?auto=format&fit=crop&w=800&q=80',
        caption: 'Mobile-first experiences',
      },
    ],
  },
] as const

export const process = [
  {
    index: '01',
    title: 'Discover',
    headline: 'Understand the business, audience, and goals.',
    body: "We deep-dive into your brand's core mission, analyze your target demographic, and establish core performance metrics to align our creative trajectory perfectly.",
    image: '/process/01-discover.png',
    imageAlt: 'Brutalist concrete stairs and granite columns in crisp studio light',
  },
  {
    index: '02',
    title: 'Strategize',
    headline: 'Build the right content and marketing strategy.',
    body: 'Our team maps out architectural blueprints, plans tactical positioning, and outlines an editorial roadmap designed to cut through the digital noise.',
    image: '/process/02-strategize.png',
    imageAlt: 'Obsidian notebook and silver pen on a premium desk',
  },
  {
    index: '03',
    title: 'Create',
    headline: 'Bring concepts to life with high-impact production.',
    body: 'We produce tailored visual assets, crisp copywriting, and premium multimedia content optimized explicitly for maximum engagement and brand recall.',
    image: '/process/03-create.png',
    imageAlt: 'Hands typing on a matte black mechanical keyboard',
  },
  {
    index: '04',
    title: 'Promote',
    headline: 'Launch across targeted digital channels.',
    body: 'Deploy campaigns using precise audience targeting, paid media, and distribution strategies to reach users exactly where they are.',
    image: '/process/04-promote.png',
    imageAlt: 'Long-exposure neon light trails on a modern highway',
  },
  {
    index: '05',
    title: 'Optimize',
    headline: 'Refine performance through live analytics.',
    body: 'We monitor real-time user behavior, run A/B testing variations, and tweak funnels to maximize conversion rates continuously.',
    image: '/process/05-optimize.png',
    imageAlt: 'Frosted glass panels and crystal prisms refracting light',
  },
  {
    index: '06',
    title: 'Grow',
    headline: 'Scale your digital presence and revenue.',
    body: 'Turn proven formulas into repeatable frameworks, expanding your market footprint and driving predictable, compounding brand value.',
    image: '/process/06-grow.png',
    imageAlt: 'Aerial view of a coastal highway extending into the distance',
  },
] as const

export const clientCategories = [
  {
    title: 'Food & Hospitality',
    clients: [
      'Benne Bhavan',
      'Femina Food Court',
      'Chai Sutta Bar',
      'DCB Chats',
      'Arabs Tea & Snacks',
      'Madurai Pandi Villas',
      'Dfruits',
    ],
  },
  {
    title: 'Retail & Business',
    clients: [
      'A1 Mobiles',
      'Nafees Furniture',
      'Emmar Furniture',
      'Star Kitchen Equipment',
      'ARR Maligai',
      'Classic Whites',
      'Essar Steels',
      'Star Sports Health & Fitness',
    ],
  },
  {
    title: 'Other industries',
    clients: [
      'Alsafa Hospital',
      'GTVA Electricals',
      'Vairam Interiors',
      'Balarathna Civil & Interiors',
      'Plyspace Interiors',
      'Al-Prince Home Care',
      'Heaven Automation',
    ],
  },
] as const

/** Floating glass client constellation (section 05) */
export const clientConstellation = [
  {
    id: '01',
    brand: 'Benne Bhavan',
    category: 'HOSPITALITY',
    size: 'primary',
    x: 2,
    y: 2,
    opacity: 0.56,
    rotate: -0.4,
    depth: 1.02,
  },
  {
    id: '02',
    brand: 'Chai Sutta Bar',
    category: 'BEVERAGES',
    size: 'secondary',
    x: 58,
    y: 4,
    opacity: 0.5,
    rotate: 0.45,
    depth: 0.98,
  },
  {
    id: '03',
    brand: 'Alsafa Hospital',
    category: 'HEALTHCARE',
    size: 'secondary',
    x: 30,
    y: 22,
    opacity: 0.52,
    rotate: -0.2,
    depth: 1.03,
  },
  {
    id: '04',
    brand: 'Essar Steels',
    category: 'INDUSTRIAL',
    size: 'tertiary',
    x: 74,
    y: 22,
    opacity: 0.48,
    rotate: 0.4,
    depth: 0.96,
  },
  {
    id: '05',
    brand: 'Vairam Interiors',
    category: 'ARCHITECTURE',
    size: 'primary',
    x: 2,
    y: 44,
    opacity: 0.54,
    rotate: 0.25,
    depth: 1.01,
  },
  {
    id: '06',
    brand: 'A1 Mobiles',
    category: 'RETAIL TECH',
    size: 'tertiary',
    x: 70,
    y: 40,
    opacity: 0.48,
    rotate: -0.35,
    depth: 0.97,
  },
  {
    id: '07',
    brand: 'Star Kitchens',
    category: 'EQUIPMENT',
    size: 'secondary',
    x: 40,
    y: 48,
    opacity: 0.5,
    rotate: 0.15,
    depth: 1.0,
  },
  {
    id: '08',
    brand: 'Heaven Auto',
    category: 'AUTOMOTIVE',
    size: 'tertiary',
    x: 78,
    y: 58,
    opacity: 0.46,
    rotate: -0.25,
    depth: 0.95,
  },
  {
    id: '09',
    brand: 'Druits',
    category: 'E-COMMERCE',
    size: 'secondary',
    x: 48,
    y: 68,
    opacity: 0.5,
    rotate: 0.3,
    depth: 0.99,
  },
  {
    id: '10',
    brand: 'Femina Court',
    category: 'FOOD & BEVERAGE',
    size: 'tertiary',
    x: 6,
    y: 74,
    opacity: 0.48,
    rotate: -0.4,
    depth: 0.96,
  },
  {
    id: '11',
    brand: 'GTVA Electrics',
    category: 'INFRASTRUCTURE',
    size: 'secondary',
    x: 64,
    y: 76,
    opacity: 0.5,
    rotate: 0.2,
    depth: 1.0,
  },
  {
    id: '12',
    brand: 'Plyspace',
    category: 'DESIGN STUDIO',
    size: 'tertiary',
    x: 28,
    y: 84,
    opacity: 0.48,
    rotate: -0.15,
    depth: 0.98,
  },
] as const

export const clientsSection = {
  tag: '05 / SELECTED CLIENTS',
  title: 'Proud to partner.',
  titleAccent: 'Grateful to grow together.',
  support:
    "An evolving network of businesses, brands, and teams we've helped move forward through thoughtful digital experiences.",
} as const

export const caseStudiesSection = {
  tag: '06 / Selected Work',
  title: 'Digital work built to move businesses forward.',
  support:
    'Content, campaigns, and digital systems designed around real goals — combining thoughtful creative, reliable delivery, and a clear path to growth.',
  exploreLabel: 'Explore all projects',
  exploreHref: '#gallery',
} as const

/** Featured selected work — Digitz clients (editorial portfolio format) */
export const caseStudies = [
  {
    client: 'Benne Bhavan',
    category: 'Food & Hospitality',
    title: 'A destination food brand people remember.',
    description:
      'A distinctive digital presence built around signature dishes, kitchen craft, and local culture — so awareness turns into enquiries.',
    services: 'Content · Reels · Social Media',
    technology: 'Instagram · Meta Ads',
    image: '/process/01-discover.png',
    imageAlt: 'Editorial still for Benne Bhavan brand work',
    href: '#contact',
  },
  {
    client: 'Chai Sutta Bar',
    category: 'Food & Hospitality',
    title: 'Short-form content that feels local and alive.',
    description:
      'High-frequency reels and social management that keep franchise energy fresh — product, people, and place in every frame.',
    services: 'Reel Production · Social Management',
    technology: 'Instagram · Reels',
    image: '/process/03-create.png',
    imageAlt: 'Creative production still for Chai Sutta Bar',
    href: '#contact',
  },
  {
    client: 'Femina Food Court',
    category: 'Food & Hospitality',
    title: 'One destination, many reasons to visit.',
    description:
      'A multi-stall food destination told as a single story — variety, atmosphere, and weekly reasons to return.',
    services: 'Content · Listings · Social',
    technology: 'Instagram · Google Business',
    image: '/process/02-strategize.png',
    imageAlt: 'Brand strategy still for Femina Food Court',
    href: '#contact',
  },
  {
    client: 'Alsafa Hospital',
    category: 'Healthcare',
    title: 'Calm, credible care online.',
    description:
      'Patient-first digital communication that builds trust — specialists, facilities, and clear service messaging.',
    services: 'Content Strategy · Social · Branding',
    technology: 'Instagram · Meta',
    image: '/process/05-optimize.png',
    imageAlt: 'Clarity-focused visual for Alsafa Hospital',
    href: '#contact',
  },
  {
    client: 'Classic Whites',
    category: 'Retail & Lifestyle',
    title: 'Product stories that create desire.',
    description:
      'Editorial product and lifestyle content for a premium apparel brand — fabric, fit, and occasion, made for the feed.',
    services: 'Product Content · Reels · Paid Social',
    technology: 'Instagram · Meta Ads',
    image: '/process/04-promote.png',
    imageAlt: 'Campaign visual for Classic Whites',
    href: '#contact',
  },
] as const

export const highlightsSection = {
  eyebrow: 'What we build',
  title: 'Brands designed to be remembered.',
  support:
    'Strategy, content, and digital experiences built for brands that want to move beyond ordinary.',
} as const

export const personalBranding = {
  eyebrow: '07 — Personal branding',
  headline: 'Personal branding that builds authority',
  body: 'Selected work for doctors, entrepreneurs, professionals, and business owners. We don’t just teach brands how to create content. We create content ourselves.',
  image: '/process/05-optimize.png',
  imageAlt: 'Personal branding content and authority-building visuals',
  flow: [
    'Positioning',
    'Content strategy',
    'Shoot',
    'Edit',
    'Distribution',
    'Growth',
  ],
} as const

export const influencer = {
  eyebrow: '08 — Influencer marketing',
  headline: 'Creator × Brand × Audience',
  body: 'Influencer campaigns built as an operating workflow — not a one-off shoutout. Brief, select, produce, publish, then measure.',
  image: '/process/04-promote.png',
  imageAlt: 'Influencer campaign and creator collaboration visuals',
  flow: [
    'Campaign brief',
    'Creator selection',
    'Content concept',
    'Production',
    'Publishing',
    'Performance tracking',
  ],
} as const

export const founder = {
  name: 'Foodiee Faizall',
  firstName: 'Faizal',
  lastName: 'Ahamed',
  legal: 'Faizal Ahamed',
  badge: 'Founder',
  meetLabel: 'Meet our founder',
  meetIntro: 'Visionary leader building brands, products and digital experiences.',
  role: 'Founder · Food & lifestyle creator',
  roleShort: 'Food & lifestyle creator',
  brandLine: 'Digitz Creative',
  place: 'Trichy, Tamil Nadu',
  quote:
    "We don't just create content. We create business impact - from the creator's chair.",
  body: "Digitz Creative is led from the creator's chair. Faizal Ahamed (Foodiee Faizall) builds content for his own audience and for client brands, which is why the work is judged on stop-scroll craft and on business outcomes, not vanity metrics alone.",
  image: '/founder/faizal.png',
  imageAlt: 'Faizal Ahamed (Foodiee Faizall), founder of Digitz Creative',
  points: [
    'Creator + agency in one practice',
    'Based in Trichy, working with Tamil Nadu businesses',
    'Food, lifestyle, and local-market fluency',
    'Audience and collaboration proof available on request',
  ],
} as const

export const why = [
  {
    title: 'Content-first',
    body: 'We understand what makes people stop scrolling — and we build from that instinct, not from a template calendar.',
  },
  {
    title: 'Business-minded',
    body: 'Content is created with business objectives in mind, not only views.',
  },
  {
    title: 'End-to-end',
    body: 'Strategy → Production → Marketing → Reporting. One team, one thread, fewer handoffs.',
  },
  {
    title: 'Local market understanding',
    body: 'Strong understanding of Trichy and Tamil Nadu audiences — language, culture, and how people actually decide.',
  },
  {
    title: 'Creator + agency',
    body: 'First-hand content creation experience brings a creator perspective to campaigns.',
  },
] as const

export const packages = [
  {
    name: 'Start',
    audience: 'For businesses beginning their digital journey.',
    points: [
      'Foundation positioning and content direction',
      'Core social presence and creative system',
      'Production support to get the first signal right',
    ],
    featured: false,
  },
  {
    name: 'Grow',
    audience: 'For consistent content and marketing.',
    points: [
      'Ongoing reel and creative production',
      'Social management, engagement, and reporting',
      'Influencer or ads support where it serves the goal',
    ],
    featured: true,
  },
  {
    name: 'Scale',
    audience: 'For broader digital growth programs.',
    points: [
      'Multi-channel content + performance programs',
      'Personal branding and creator-led campaigns',
      'Digital solutions: web, listings, WhatsApp, apps',
    ],
    featured: false,
  },
] as const

export const gallery = [
  {
    id: 'reels',
    title: 'Reels',
    note: 'Short-form production — concept to launch.',
    cta: 'View Project',
    href: '#contact',
  },
  {
    id: 'branding',
    title: 'Branding',
    note: 'Identity systems, creatives, and brand language.',
    cta: 'View Project',
    href: '#contact',
  },
  {
    id: 'campaigns',
    title: 'Campaigns',
    note: 'Logo systems and campaign marks built to travel.',
    cta: 'View Project',
    href: '#contact',
  },
  {
    id: 'ads',
    title: 'Ads',
    note: 'Meta and Google creatives built for response.',
    cta: 'Case Study',
    href: '#work',
  },
  {
    id: 'social',
    title: 'Social',
    note: 'Always-on presence, captions, and community.',
    cta: 'Case Study',
    href: '#contact',
  },
] as const

export const galleryFilters = [
  { id: 'all', label: 'All' },
  { id: 'reels', label: 'Reels' },
  { id: 'branding', label: 'Branding' },
  { id: 'ads', label: 'Ads' },
  { id: 'campaigns', label: 'Campaigns' },
  { id: 'social', label: 'Social' },
] as const

export const testimonials = {
  intro:
    'We publish client voice only with permission. Until verified testimonials are supplied, this section holds the brief quote structure as a placeholder, and we will share references on request.',
  /** Demo cards for layout only - swap for verified quotes + real portraits with permission */
  items: [
    {
      quote:
        'We were impressed with their willingness to support us within our growth structure.',
      name: 'Guy Hawkins',
      handle: '@guyhawkins',
      image: 'https://i.pravatar.cc/120?img=12',
    },
    {
      quote:
        "They're super communicative and easy to work with. Digitz hit the ground running with the work.",
      name: 'Kaylynn Botosh',
      handle: '@kaylynnbotosh',
      image: 'https://i.pravatar.cc/120?img=32',
    },
    {
      quote:
        "The brand messaging doesn't just read - you feel it. Content that actually moves the business.",
      name: 'Robert Fox',
      handle: '@robertfox',
      image: 'https://i.pravatar.cc/120?img=33',
    },
    {
      quote:
        'Clear strategy, strong creatives, and steady follow-through from kickoff to publish.',
      name: 'Leslie Alexander',
      handle: '@lesliealexander',
      image: 'https://i.pravatar.cc/120?img=47',
    },
    {
      quote:
        'A partner that understands local brands and still delivers work that feels premium.',
      name: 'Darlene Robertson',
      handle: '@darlener',
      image: 'https://i.pravatar.cc/120?img=5',
    },
    {
      quote:
        'From reels to ads, everything stayed on-brand and on schedule. Easy process end to end.',
      name: 'Jerome Bell',
      handle: '@jeromebell',
      image: 'https://i.pravatar.cc/120?img=68',
    },
  ],
} as const

export const finalCta = {
  headline: 'Your business has a story.',
  headline2: 'Let’s make people notice it.',
  body: 'Tell us what you sell, who you serve, and what growth looks like this quarter. We’ll come back with a clear next step.',
} as const

export const footerServices = [
  'Influencer Marketing',
  'Reel Production',
  'Social Media Management',
  'Personal Branding',
  'Performance Marketing',
  'Digital Solutions',
] as const
