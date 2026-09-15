import type { NavMenu } from './nav.types'

// Layout, typography and column arrangement come from the Figma navigation
// variants (file PhhQqMYiW0bQ5O4a6leHV3, nodes 124:1217–124:1223), and so does
// the copy for every entry below.
//
// Contents, however, are filtered to destinations that are actually live on
// https://www.sirp.io. Figma lists 56 entries; 43 of them have no page, so they
// are not rendered at all — the menu never shows a label that leads nowhere.
// Two consequences of that filter:
//
//   • "Solutions" is gone. Not one of its 16 entries has a page.
//   • "Partners" is a plain link to its live landing page rather than a
//     dropdown, since none of its children have pages either.
//
// Two live pages that Figma has no slot for are surfaced here so they're
// reachable: /enterprise-soc and /autonomous-security. /saads-home-page is
// deliberately left out.
//
// See MENU-STRUCTURE.md for the full design-vs-live breakdown.
export const NAV_MENUS: NavMenu[] = [
  {
    id: 'platform',
    label: 'Platform',
    columns: [
      {
        eyebrow: 'Overview',
        links: [
          {
            label: 'OmniSense™ Platform',
            description: 'The core AI-native Autonomous SOC platform, detects, learns, and responds at machine speed.',
            href: '/omnisense',
          },
          {
            label: 'How it works',
            description: 'See how OmniSense runs the full detection-to-response loop autonomously.',
            href: '/how-autonomous-soc-works',
          },
          {
            // Not in the Figma nav; added so the live page is reachable.
            label: 'Enterprise SOC',
            description: 'Run your SOC as a machine, not a call center.',
            href: '/enterprise-soc',
          },
        ],
      },
      {
        eyebrow: 'Products',
        links: [
          {
            label: 'Sara, the Co-Analyst',
            description: 'Your AI Co-Analyst for triage, investigation, and response.',
            href: 'https://sara-open.sirp.io/',
            external: true,
          },
        ],
      },
      {
        eyebrow: 'Capabilities',
        links: [
          { label: 'Integrations', description: 'Connect your security, IT, and cloud tools.', href: '/integrations' },
        ],
      },
    ],
  },
  {
    id: 'why',
    label: 'Why SIRP',
    columns: [
      {
        eyebrow: 'The difference',
        links: [
          {
            label: 'Outcomes and metrics',
            description: 'Measurable MTTD/MTTR and autonomy gains.',
            href: '/security-outcomes-and-metrics',
          },
          { label: 'The manifesto', description: 'Our vision for the Autonomous SOC.', href: '/manifesto' },
          {
            label: 'Technical whitepaper',
            description: 'A technical look at the platform, agents, and deployment.',
            href: '/technical-white-paper',
          },
          { label: 'Trust Center', description: 'Our security, privacy, and compliance posture.', href: '/trust-center' },
        ],
      },
      {
        eyebrow: 'Compare',
        links: [
          {
            label: 'SIRP vs SOAR',
            description: 'Autonomy that goes beyond scripted playbooks.',
            href: '/soar-vs-autonomous-soc',
          },
          {
            label: "Autonomous SOC buyer's guide",
            description: 'What to look for before you buy.',
            href: '/buyers-guide',
          },
        ],
      },
      // Figma's third column, "Proof", is dropped: its only live entry was a
      // second "Trust center" already listed under The difference.
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    columns: [
      {
        eyebrow: 'Learn',
        links: [
          {
            label: 'What is an autonomous SOC',
            description: 'The core idea, explained simply.',
            href: '/what-is-autonomous-soc',
          },
          {
            label: 'How an autonomous SOC works',
            description: 'The full detection-to-response loop.',
            href: '/how-autonomous-soc-works',
          },
          {
            // Not in the Figma nav; added so the live page is reachable.
            label: 'Autonomous security operations',
            description: 'From playbooks to AI-native decision systems.',
            href: '/autonomous-security',
          },
        ],
      },
      {
        eyebrow: 'Library',
        links: [{ label: 'Blog', description: 'Insights, trends, and product news.', href: '/blog' }],
      },
      {
        eyebrow: 'Build',
        links: [
          { label: 'Integration catalog', description: 'Browse supported tools and connectors.', href: '/integrations' },
        ],
      },
    ],
  },
  {
    id: 'partners',
    label: 'Partners',
    href: '/partners',
  },
  {
    id: 'company',
    label: 'Company',
    columns: [
      {
        eyebrow: 'About',
        links: [
          { label: 'Our story', description: "Why we're building the Autonomous SOC.", href: '/our-story' },
          { label: 'Contact', description: 'Get in touch with our team.', href: '/contact' },
        ],
      },
      {
        eyebrow: 'Trust',
        links: [
          { label: 'Trust center', description: 'Our security, privacy, and compliance posture.', href: '/trust-center' },
        ],
      },
    ],
  },
]

export const DEMO_HREF = '/contact'
