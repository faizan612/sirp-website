/* ─── Site ───────────────────────────────────────────────── */
export const SITE_URL = 'https://www.sirp.io'
export const SITE_NAME = 'SIRP'
export const SITE_DESCRIPTION = 'OmniSense — the first Autonomous SOC Platform that detects, learns, and responds autonomously.'

/* ─── Routes ─────────────────────────────────────────────── */
export const ROUTES = {
  home: '/',
  autonomousSecurity: '/autonomous-security',
  whatIsAutonomousSoc: '/what-is-autonomous-soc',
  howAutonomousSocWorks: '/how-autonomous-soc-works',
  soarVsAutonomousSoc: '/soar-vs-autonomous-soc',
  omnisense: '/omnisense',
  enterpriseSoc: '/enterprise-soc',
  securityOutcomes: '/security-outcomes-and-metrics',
  technicalWhitePaper: '/technical-white-paper',
  blog: '/blog',
  manifesto: '/manifesto',
  contact: '/contact',
  trustCenter: '/trust-center',
  buyersGuide: '/buyers-guide',
} as const

/* ─── Footer ─────────────────────────────────────────────── */
export const FOOTER_LINKS = [
  {
    heading: 'Autonomous Security',
    links: [
      { label: 'Pillar', href: '/autonomous-security' },
      { label: 'What is an Autonomous SOC', href: '/what-is-autonomous-soc' },
      { label: 'How it works', href: '/how-autonomous-soc-works' },
      { label: 'SOAR vs Autonomous', href: '/soar-vs-autonomous-soc' },
    ],
  },
  {
    heading: 'Platform',
    links: [
      { label: 'OmniSense™', href: '/omnisense' },
      { label: 'Enterprise Autonomous SOC', href: '/enterprise-soc' },
      { label: 'Outcomes & Metrics', href: '/security-outcomes-and-metrics' },
      { label: 'Technical Whitepaper', href: '/technical-white-paper' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Technical Whitepaper', href: '/technical-white-paper' },
      { label: 'Manifesto', href: '/manifesto' },
      { label: "Buyer's Guide", href: '/buyers-guide' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'Trust Center', href: '/trust-center' },
    ],
  },
] as const
