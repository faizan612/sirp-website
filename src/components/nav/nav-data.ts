import type { NavMenu } from './nav.types'

// Only menus/links with a real built page are listed here. See
// MENU-STRUCTURE.md for the full intended structure, including everything
// that's been trimmed pending its page being built — restore entries as
// they ship rather than re-deriving the structure from scratch.
export const NAV_MENUS: NavMenu[] = [
  {
    id: 'platform',
    label: 'Platform',
    columns: [
      {
        eyebrow: 'Overview',
        links: [
          { label: 'OmniSense platform', href: '/omnisense', description: 'The autonomous SOC, end to end.', status: 'live' },
          { label: 'How it works', href: '/how-autonomous-soc-works', description: 'Planner, Governor, Executor.', status: 'live' },
        ],
      },
      {
        eyebrow: 'Capabilities',
        links: [
          { label: 'Integrations', href: '/integrations', status: 'live' },
        ],
      },
    ],
    featured: {
      eyebrow: 'Free',
      title: 'Sara',
      body: 'Try the Co-Analyst with no signup.',
      href: 'https://sara-open.sirp.io/',
      cta: 'Try Sara',
      visual: 'sara',
      status: 'live',
      badge: 'Free',
    },
    footer: {
      text: '200+ integrations. Build your own against the open framework.',
      cta: 'See the catalog',
      href: '/integrations',
      status: 'live',
    },
  },
  {
    id: 'why',
    label: 'Why SIRP',
    columns: [
      {
        eyebrow: 'The difference',
        links: [
          { label: 'Outcomes and metrics', href: '/security-outcomes-and-metrics', status: 'live' },
          { label: 'The manifesto', href: '/manifesto', status: 'live' },
          { label: 'Technical whitepaper', href: '/technical-white-paper', status: 'live' },
          { label: 'Trust Center', href: '/trust-center', status: 'live' },
        ],
      },
      {
        eyebrow: 'Compare',
        links: [
          { label: 'SIRP vs SOAR', href: '/soar-vs-autonomous-soc', status: 'live' },
          { label: "Autonomous SOC buyer's guide", href: '/buyers-guide', status: 'live' },
        ],
      },
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    columns: [
      {
        eyebrow: 'Learn',
        links: [
          { label: 'What is an autonomous SOC', href: '/what-is-autonomous-soc', status: 'live' },
          { label: 'How an autonomous SOC works', href: '/how-autonomous-soc-works', status: 'live' },
        ],
      },
      {
        eyebrow: 'Library',
        links: [
          { label: 'Blog', href: '/blog', status: 'live' },
        ],
      },
      {
        eyebrow: 'Build',
        links: [
          { label: 'Integration catalog', href: '/integrations', status: 'live' },
        ],
      },
    ],
  },
  {
    id: 'company',
    label: 'Company',
    columns: [
      {
        eyebrow: 'About',
        links: [
          { label: 'Our story', href: '/our-story', status: 'live' },
          { label: 'Contact', href: '/contact', status: 'live' },
        ],
      },
      {
        eyebrow: 'Trust',
        links: [
          { label: 'Trust center', href: '/trust-center', status: 'live' },
        ],
      },
    ],
    featured: {
      eyebrow: 'Offices',
      title: 'Bethesda & London',
      visual: 'static',
      status: 'live',
    },
  },
]

// One line, per spec §5: flip a menu to `false` to fall back to a plain
// top-level link (its `href`, or its first column's first link) instead of a
// mega panel — no component changes required.
export const ENABLED_MENUS: Record<string, boolean> = {
  platform: true,
  why: true,
  resources: true,
  company: true,
}
