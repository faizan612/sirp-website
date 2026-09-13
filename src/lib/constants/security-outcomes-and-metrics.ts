/**
 * Typography on /security-outcomes-and-metrics follows the soar-vs-autonomous-soc mobile scale
 * (see app/(site)/soar-vs-autonomous-soc/page.css @media max-width 480px).
 * Implemented via app/(site)/security-outcomes-and-metrics/page.css (.esoc-* classes).
 *
 * The headline three stats on this page (SomHeadlineStats) are pulled directly from
 * STATS_DATA in @/lib/constants/home — do not hardcode 80/70/90 a second time here.
 */

export const SOM_HERO = {
  eyebrow: 'Security outcomes',
  heading: 'Production data from a governed loop.',
  subtext:
    "Automation speeds up work. It doesn't remove the decision burden. A system where the Governor, not a ticket queue, decides when a case closes does.",
  cta: { label: 'See the architecture', href: '/omnisense' },
  secondaryCta: { label: 'Get a demo', href: '/contact' },
} as const

export const SOM_HEADLINE_STATS = {
  heading: "These aren't isolated improvements",
  subtext: 'The same three numbers from the homepage. This page goes deeper on where they come from.',
} as const

export const SOM_METRICS = {
  heading: 'The deeper numbers',
  subtext: 'What sits underneath the headline three.',
  items: [
    {
      id: 'hours',
      value: '~150 hrs',
      sub: 'per day from investigation and triage',
      badge: 'Analyst Hours Removed',
    },
    {
      id: 'roi',
      value: '~7X',
      sub: 'return on autonomous SOC operations',
      badge: 'Security ROI',
    },
    {
      id: 'escalation',
      value: '5–10%',
      sub: 'of investigations reach a human',
      badge: 'Escalation Rate',
    },
    {
      id: 'false-positive',
      value: '<2%',
      sub: 'verified against analyst-confirmed incidents',
      badge: 'False Positive Rate',
    },
  ],
} as const

export const SOM_AUDIENCE = {
  badge: 'Why this matters',
  items: [
    {
      id: 'cisos',
      role: 'CISOs',
      icon: 'bargraph' as const,
      title: 'Risk posture becomes predictable',
      description:
        'Response speed stops depending on shift schedules and approval chains.',
    },
    {
      id: 'cfos',
      role: 'CFOs',
      icon: 'shine' as const,
      title: 'Security costs flatten',
      description: 'Volume no longer drives headcount.',
    },
    {
      id: 'soc-directors',
      role: 'SOC Directors',
      icon: 'quater' as const,
      title: 'Team focuses on strategy',
      description: 'The system handles volume. Analyst burnout drops.',
    },
  ],
} as const

/* Rendered as a Magic Bento grid (see SomOutcomes.tsx) — response-speed leads
 * as the larger tile since it already has an image asset to anchor it; the
 * other three are even tiles, matching the shape a bento grid wants. */
export const SOM_OUTCOMES = {
  heading: 'The four outcomes of switching to Sirp',
  items: [
    {
      id: 'response-speed',
      span: 'lg' as const,
      title: 'Response speed becomes structural',
      label: 'Gate-to-execution, not queue-to-pickup',
      description:
        "The Autonomy Gate fires per action, before execution, not after a human picks up a ticket. Decision and execution happen in the same step. Containment windows for ransomware and lateral movement are measured in minutes. When your gate-to-execution time is seconds, you're inside that window.",
      image: '/images/security-outcomes-and-metrics/Responsespeed.png',
      imageAlt: 'Response speed: Human SOC vs Autonomous SOC, gated at the Executor',
    },
    {
      id: 'volume',
      span: 'sm' as const,
      title: 'Volume stops scaling with headcount',
      label: '~1,500 investigations/day resolved autonomously',
      description:
        "The Executor runs whatever the Gate allows, without waiting on analyst availability. Alert volume can grow without a matching hiring plan, because nothing in the loop is rate-limited by a person's calendar.",
    },
    {
      id: 'analyst-work',
      span: 'sm' as const,
      title: 'Analyst work changes completely',
      label: '150 analyst hours/day → <1 hour/day',
      description:
        "The Decision Governor issues one of three verdicts per case: close it, escalate it, or send it back to the Planner with a delta. Only the escalate verdict reaches a person, and Sara is what surfaces it with the reasoning attached, not a bare alert.",
    },
    {
      id: 'cost-curve',
      span: 'sm' as const,
      title: 'The cost curve flattens',
      label: '$800K–$1M → ~$100K annually',
      description:
        'Planner reasoning runs on compute, not on shift coverage. Cost tracks alert volume the way infrastructure cost tracks usage, not the way payroll tracks headcount.',
    },
  ],
} as const

/* Steps mirror Responsespeed.png's Human-SOC vs Autonomous-SOC swimlane —
 * source of truth for SomOutcomes' SocComparisonScroll. Human's 6 steps and
 * Autonomous's 3 steps sync into 3 shared `phase`s (0/1/2) so both columns
 * always have an active row at the same scroll position; `duration` is
 * minutes for the human column, seconds for the autonomous one — the values
 * below are placeholders pending verified telemetry, not shipped numbers
 * (see SOM_MEASURED's methodology note). */
export const SOM_SOC_COMPARISON = {
  human: {
    label: 'Human SOC',
    steps: [
      { label: 'Detection', phase: 0, duration: 5, durationLabel: '~5 min' },
      { label: 'Ticket', phase: 1, duration: 15, durationLabel: '~15 min' },
      { label: 'Assignment', phase: 1, duration: 20, durationLabel: '~20 min' },
      { label: 'Investigation', phase: 1, duration: 95, durationLabel: '~95 min' },
      { label: 'Approval', phase: 1, duration: 40, durationLabel: '~40 min' },
      { label: 'Action', phase: 2, duration: 10, durationLabel: '~10 min' },
    ],
  },
  autonomous: {
    label: 'Autonomous SOC',
    steps: [
      {
        label: 'Detection',
        phase: 0,
        duration: 5,
        durationLabel: '~5 sec',
        note: 'Covers ticket, assignment, investigation, approval',
      },
      { label: 'Evaluation', phase: 1, duration: 55, durationLabel: '~55 sec' },
      { label: 'Action', phase: 2, duration: 15, durationLabel: '~15 sec' },
    ],
  },
} as const

export const SOM_DEPLOYMENTS = {
  badge: 'Real Deployments',
  heading: 'Real deployments',
  items: [
    {
      id: 'fintech',
      caseId: 'FIN-04',
      company: 'Global fintech SOC',
      glow: 'purple' as const,
      tags: ['120K alerts/day', '4 regions', 'Highly regulated'],
      before: '11 analysts, approval gates, 4–6 hour case age',
      after: '2 analysts on oversight, under 30 second case age, under 5% human review',
      results: '7x cost reduction, zero audit findings, more thorough compliance documentation',
      quoteLabel: 'The unexpected',
      quote: 'Audit trail improved. Automated logging turned out more complete than manual documentation ever was.',
    },
    {
      id: 'saas',
      caseId: 'SAAS-01',
      company: 'SaaS infrastructure company',
      glow: 'teal' as const,
      tags: ['Cloud-native', 'High analyst turnover', 'Alert fatigue'],
      before: 'Tiered L1 to L2 to L3 escalation model',
      after: 'System-first resolution, single oversight team',
      results: '92% autonomous actions, zero routine escalations, team stayed intact',
      quoteLabel: 'The moment',
      quote: 'Running in parallel for 30 days, the autonomous system caught three incidents the human team missed to queue backlog. That ended the internal debate.',
    },
  ],
} as const

/* Rewritten to use the actual Planner → Gate → Executor → Governor loop from
 * /omnisense (see @/content/omnisense/theLoop) instead of a generic
 * traditional-vs-autonomous comparison, so a reader coming from that page
 * recognizes the mechanism. */
export const SOM_WHY = {
  heading: 'Why these metrics move together',
  subtext: "This isn't five separate improvements. It's one architectural change, measured five ways.",
  keyDifferenceTitle: 'The key difference: decision placement.',
  keyDifferenceBody:
    'Workflow automation makes humans faster at the same job. This loop removes humans from the execution path and gives them the judgment calls instead. That\'s why MTTD, MTTR, cost, and analyst hours all move together — they\'re all downstream of where the decision gets made, not five separate product features.',
  stages: [
    {
      id: 'planner',
      label: 'Planner',
      icon: 'search' as const,
      body: 'Reasons about what an alert needs and proposes every action. It approves none of them, so speed here doesn\'t trade off against control.',
    },
    {
      id: 'gate',
      label: 'Autonomy Gate',
      icon: 'shine' as const,
      body: 'Checks each proposed action against policy before it runs, per action type, not per platform. This is where response-speed and false-positive numbers both originate: the same check that keeps latency low is the check that keeps error rate low.',
    },
    {
      id: 'executor',
      label: 'Executor',
      icon: 'current' as const,
      body: 'Runs only what the Gate allowed. This is where the headcount-decoupling comes from. Nothing here waits on an analyst\'s queue position.',
    },
    {
      id: 'governor',
      label: 'Decision Governor',
      icon: 'bargraph' as const,
      body: 'Fires once, after the run, and issues one of three verdicts. The 90% autonomous-actions figure and the 5–10% escalation rate are the same number, seen from opposite sides: cases the Governor closed vs. cases it sent to a human.',
    },
  ],
} as const

export const SOM_SYSTEM = {
  heading: "What the system doesn't handle",
  intro: "This is the Governor's second verdict: escalate.",
  escalationLabel: 'It fires when:',
  escalations: [
    'Confidence falls below policy threshold',
    'The attack pattern is novel or outside training data',
    'Context requires business knowledge the system doesn\'t have',
    'Multiple conflicting signals produce ambiguous risk',
  ],
  stats: [
    { label: 'Escalation rate', value: '5–10%', sub: 'of investigations' },
    { label: 'False positive rate', value: '<2%', sub: '' },
  ],
  summary:
    'Humans handle ambiguity and strategy. The system handles volume and routine execution.',
} as const

export const SOM_MEASURED = {
  label: 'How we measured this:',
  excluded: 'Excluded: Test incidents, training data, simulations, deployment phase, cases requiring human judgment',
  trustCenterCta: { label: 'Read the full methodology in the Trust Center', href: '/trust-center' },
  items: [
    {
      id: 'scope',
      value: '3 enterprise SOCs',
      label: 'Fintech, SaaS, and healthcare. Case studies below cover the fintech and SaaS deployments.',
      icon: 'bargraph' as const,
    },
    {
      id: 'window',
      value: '90-day window',
      label: '90-day window post-stabilization (excludes tuning and pilots).',
      icon: 'shine' as const,
    },
    {
      id: 'alerts',
      value: 'Millions of alerts',
      label: 'Millions of alerts across EDR, cloud, identity, SaaS, endpoint.',
      icon: 'current' as const,
    },
    {
      id: 'chain',
      value: 'Full chain measured',
      label: 'Detection → triage → decision → containment',
      icon: 'current' as const,
    },
  ],
} as const

export const SOM_VENN = {
  heading: 'What this means for your SOC',
  paragraphs: [
    'If your SOC depends on human availability, tickets, and shift coverage, your performance is capped by how fast analysts work and how many you can hire.',
    'When decisions are policy-bound and system-executed, response speed becomes predictable, cost becomes flat, quality becomes consistent, and scale becomes an infrastructure question.',
    'The operating model changes. The outcomes follow.',
  ],
} as const

export const SOM_CTA = {
  headingItalic: "Autonomous security isn't theoretical.",
  subtext:
    "The question isn't whether autonomous SOCs work. It's whether your current model can keep up.",
  btn: { label: 'Get a demo', href: '/contact' },
  secondaryBtn: { label: 'Read the architecture', href: '/omnisense' },
} as const
