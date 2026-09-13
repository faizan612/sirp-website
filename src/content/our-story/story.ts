/* ─── Our Story page — copy ──────────────────────────────── */
/* TODO: replace with real founding facts, dates, and figures once finalized. */

export const ourStoryHero = {
  eyebrow: 'Our Story',
  headlineSetup: 'Built with purpose.',
  headlinePayoff: 'Driven by outcomes.',
  subhead:
    'We started SIRP because security teams were drowning in alerts and tools that promised automation but still needed a human to babysit every step. OmniSense is what we built instead.',
  primaryCta: { label: 'Talk to us', href: '/contact' },
  secondaryCta: { label: 'See the platform', href: '/omnisense' },
} as const

export const ourStoryNarrative = {
  label: 'Our Story',
  paragraphs: [
    'At SIRP, we believe security operations shouldn’t depend on how many analysts you can hire. **Modern threats move faster than headcount ever will.** Every alert triaged by hand is time an attacker doesn’t have to wait for.',
    'That belief is why we built OmniSense: a platform that investigates, decides, and closes cases the way a senior analyst would — **taking the repetitive work off human shoulders**, so teams can focus on judgment calls that actually need them.',
    'With SIRP, you don’t need a large SOC to get autonomous outcomes. Our platform brings governed decision-making, transparent reasoning, and full audit trails into a single workflow. **The complexity stays under the hood,** while your team stays focused on what matters.',
  ],
} as const

export const ourStorySidebar = {
  heading: 'Why we’re building OmniSense',
  body: 'Because the industry kept shipping automation that still needed a human to watch it. We wanted to close that gap — without asking teams to trust a black box.',
  cta: { label: 'Read the manifesto', href: '/manifesto' },
} as const

export const ourStoryValues = [
  {
    title: 'Clarity over complexity',
    body: 'Every decision OmniSense makes is explainable — the evidence, the reasoning, and the action are all on the record, not buried in a model you have to trust blindly.',
  },
  {
    title: 'Governed, not unattended',
    body: 'Autonomy without oversight isn’t a feature. Every action passes a governance gate your team defines, so automation earns trust instead of assuming it.',
  },
  {
    title: 'Built by practitioners',
    body: 'Our platform is shaped by people who’ve sat on a SOC floor at 3am. We build for the workflow that actually happens, not the one in a slide deck.',
  },
] as const

export const ourStoryBadges = ['Governed autonomy', 'Full audit trail', 'Analyst-built'] as const
