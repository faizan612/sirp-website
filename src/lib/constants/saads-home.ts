/* ──────────────────────────────────────────────────────────
 * Homepage content. Voice: confident, evidence-led. Sentence case
 * headings, no em dashes, no emojis, Oxford comma. "Sara" is a proper
 * name. One metaphor ("self-driving") owned by the hero + final CTA only.
 * The bolder the claim, the closer the receipt.
 * ────────────────────────────────────────────────────────── */

import { INTEGRATIONS } from '@/lib/data/integrations'

/* ─── 2. Hero ────────────────────────────────────────────── */
export const HERO_DATA = {
  // Heading is rendered structurally in HeroSection (serif italic on
  // "drives itself"); kept here for reference/SEO.
  heading: 'The SOC that drives itself.',
  subheading:
    'OmniSense is the AI-native Autonomous SOC. An agentic mesh that detects, investigates, and executes response at machine speed, inside policies you write. Everyone says autonomous. We mean it.',
  primaryBtn: { label: 'Get a demo', href: '/demo' },
  secondaryBtn: { label: 'See how it works', href: '/how-autonomous-soc-works' },
  // Proof strip under the CTAs. TODO: replace with customer logos when
  // available. Shown only because it is true; confirm before publishing.
  proofLine: 'Running in production across enterprise SOCs in the GCC and North America.',
  videoSrc: 'https://framerusercontent.com/assets/Y7AXz4zHC2BiXgrFSoKP52cRE.webm',
} as const

/* ─── 3. The problem ─────────────────────────────────────── */
export const PROBLEM_DATA = {
  eyebrow: 'The math problem',
  stat: '4,330 alerts a day. 37% ever get looked at.',
  body: 'The average enterprise SOC investigates barely a third of what it sees. The rest gets sampled, snoozed, or silently aged out. More dashboards did not fix this. More hiring cannot. The equation only closes when triage stops being a human job.',
  citation: 'Ponemon Institute, The State of SecOps: AI in the SOC, 2026. n = 649.',
} as const

/* ─── 4. How it works ────────────────────────────────────── */
export const HOW_IT_WORKS_DATA = {
  eyebrow: 'From flood to closed case',
  heading: 'Alert in. Verdict out.',
  headingItalic: 'Inside your policy.',
  steps: [
    {
      number: '01',
      title: 'Triage',
      description:
        'Every alert classified, scored, and prioritized in seconds, before a human would have opened the tab.',
      tags: ['classify', 'score', 'prioritize'],
    },
    {
      number: '02',
      title: 'Investigate',
      description:
        'Intelligence pulled from every connected source, while OmniMap stitches assets, IOCs, vulnerabilities, and user activity into a living graph. Context, not tab-hopping.',
      tags: ['enrich', 'correlate', 'OmniMap'],
    },
    {
      number: '03',
      title: 'Respond',
      description:
        'Suggested actions become executed actions: contain, eradicate, recover. Every step inside policy, every step on the audit trail.',
      tags: ['contain', 'eradicate', 'recover'],
    },
  ],
  cta: { label: 'See the full pipeline', href: '/how-autonomous-soc-works' },
  // Optional video embed (retired "See intelligence come alive" asset).
  videoSrc: '/video/Home-Feature.mp4',
} as const

/* ─── 5. Governed autonomy ───────────────────────────────── */
export const GOVERNED_DATA = {
  eyebrow: 'Governed autonomy',
  heading: 'Autonomy without governance is just',
  headingItalic: 'a faster way to be wrong.',
  body: 'OmniSense runs in two modes. In Assist mode it investigates and recommends; your analysts execute. In Autonomous mode it executes inside policy boundaries you define, with approval gates where you want them and an audit trail everywhere. You decide what it may touch. It never decides that for itself.',
  // Per-mode descriptions shown inside the widget, beneath its tabs.
  // Sentence case throughout, no em dashes (style guide).
  modes: {
    'Assist mode':
      'Assist mode recommends stage-aware next steps, simulates impact, and drafts changes. Nothing executes until you say go.',
    'Autonomous mode':
      'Autonomous mode executes inside the policy boundaries you set, with approval gates where you want them and an audit trail on every action.',
  },
  cta: { label: 'How governance works', href: '/trust' },
} as const

/* ─── 6. Proof ───────────────────────────────────────────── */
export const PROOF_DATA = {
  eyebrow: 'Results you can audit',
  heading: '20 seconds is a big claim.',
  // NBSP glues "our math." so the fragment never strands its last word.
  headingItalic: 'Check our math.',
  // Methodology footnote target.
  methodologyHref: '/security-outcomes-and-metrics',
  methodologyNote:
    'Median across 3 enterprise deployments, 90-day window post-stabilization.',
  stats: [
    {
      value: '18x',
      label: 'faster MTTR',
      proof: '6 min → 20 sec',
    },
    {
      value: '~150',
      label: 'analyst hours removed per day',
      proof: 'about 19 full shifts, daily',
    },
    {
      value: '90%',
      label: 'actions executed autonomously',
      proof: '5 to 10% escalated by policy, under 2% false positives',
    },
  ],
  // TODO: secure one referenceable quote or anonymized case vignette
  // ("Gulf energy enterprise, 40-person SOC"). This single element
  // outsells everything above it. Rendered as a marked placeholder.
  quote: null as null | { text: string; attribution: string },
} as const

/* ─── 7. Platform depth ──────────────────────────────────── */
export const PLATFORM_DEPTH_DATA = {
  eyebrow: 'Under the hood',
  heading: 'An agentic mesh, not a',
  headingItalic: 'chatbot with opinions.',
  cards: [
    {
      id: 'omnimap',
      title: 'Every incident, mapped.',
      description:
        'OmniMap connects assets, IOCs, vulnerabilities, and user activity into one living graph. Your agents act on context, not fragments.',
      image: '/images/features/features3.png',
    },
    {
      id: 'sara',
      title: 'Ask your SOC anything.',
      description:
        'Sara is the Co-Analyst riding shotgun in every screen. Instant answers on cases, entities, and posture, in plain language.',
      image: '/images/features/features4.png',
      // Bridge line under the Sara card.
      bridge: {
        text: 'Sara is free to try. We told you, too good to gatekeep.',
        link: { label: 'Try Sara', href: 'https://sara-open.sirp.io' },
      },
    },
  ],
  cta: { label: 'Explore the platform', href: '/platform' },
} as const

/* ─── 8. Integrations ────────────────────────────────────── *
 * The logo list is sourced from the shared data module so the homepage
 * marquee and the /integrations grid stay in sync. The marquee expects
 * { name, src }, so the shared { name, logo } entries are mapped here. */
export const INTEGRATIONS_DATA = {
  pill: 'Autonomous SOC ecosystem',
  heading: '200+ integrations.',
  headingItalic: 'Zero',
  headingSuffix: 'rip and replace.',
  description:
    'OmniSense sits on top of the stack you already run: SIEM, EDR, firewalls, identity, ticketing, and threat intelligence. If it has an API, it is probably already on the list.',
  ctaHref: '/integrations',
  logos: INTEGRATIONS.map((i) => ({ name: i.name, src: i.logo })),
} as const

/* ─── 9. Final CTA (homepage) ────────────────────────────── */
export const FINAL_CTA_DATA = {
  heading: 'See OmniSense drive on',
  headingItalic: 'your',
  headingSuffix: 'alerts.',
  body: 'Thirty minutes, your use cases, no slideware.',
  primaryBtn: { label: 'Get a demo', href: '/demo' },
  secondaryBtn: { label: 'Read the technical whitepaper', href: '/technical-white-paper' },
} as const

/* ─── Shared CTA dome (used by interior pages) ───────────── *
 * Left intact so the six pages importing CtaSection are undisturbed
 * by the homepage revamp. */
export const CTA_DATA = {
  heading: 'Watch your Autonomous SOC drive',
  headingItalic: 'itself',
  primaryBtn: { label: 'What is Autonomous SOC?', href: '/what-is-autonomous-soc' },
  secondaryBtn: { label: 'Learn More', href: '/how-autonomous-soc-works' },
} as const
