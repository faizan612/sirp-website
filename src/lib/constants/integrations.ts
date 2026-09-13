/* ──────────────────────────────────────────────────────────
 * /integrations page content.
 *
 * COPY PENDING APPROVAL. Every headline, subhead, and value-prop line
 * below is recommended placeholder for a customer-facing page and must
 * be reviewed by the owner before merge. The third value prop makes a
 * connector-maintenance claim that is NOT verified — see its note.
 *
 * Voice: OmniSense / "the platform" (never "the AI"), agents lowercase,
 * sentence case headings and labels, no em dashes, Oxford comma. The
 * page argues breadth-feeds-reasoning, not "automate everything".
 * ────────────────────────────────────────────────────────── */

export const INTEGRATIONS_PAGE_DATA = {
  hero: {
    eyebrow: 'INTEGRATIONS',
    heading: 'Every tool you run.',
    // Serif italic treatment, matching the site's <em> styling.
    headingItalic: 'One reasoning layer.',
    subhead:
      'OmniSense connects across your security and IT stack and reasons over all of it, so verdicts use every signal, not a sample.',
    primaryCta: { label: 'Get a demo', href: '/demo' },
    secondaryCta: { label: 'See integrations', href: '#integrations-grid' },
  },

  valueProps: [
    {
      title: 'Two-way by design',
      body: 'Enrichment flows in, response actions flow back out. Connections are read and write, not just collection.',
    },
    {
      title: 'Context, not silos',
      body: 'Every connected source feeds one living graph, so agents reason across tools instead of pivoting between tabs.',
    },
    {
      // CLAIM PENDING VERIFICATION: this asserts connectors are actively
      // maintained as upstream APIs change. Confirm this is a real
      // commitment before shipping; if not, replace this prop entirely.
      title: 'Built to stay connected',
      body: 'Maintained connectors so automations keep running as upstream APIs change.',
    },
  ],

  cta: {
    heading: 'See OmniSense reason across',
    headingItalic: 'your',
    headingSuffix: 'stack.',
    body: 'Thirty minutes, your tools, no slideware.',
    primaryBtn: { label: 'Get a demo', href: '/demo' },
    secondaryBtn: { label: 'Read the technical whitepaper', href: '/technical-white-paper' },
  },
} as const
