/**
 * Typography on /enterprise-soc follows the soar-vs-autonomous-soc mobile scale
 * (see app/(site)/soar-vs-autonomous-soc/page.css @media max-width 480px):
 * - Section h2: clamp(1.45rem, 5.5vw, 1.85rem)
 * - Body / subtext: 0.875rem, line-height 1.65
 * - Card h3: 1rem, line-height 1.22
 * Implemented via app/(site)/enterprise-soc/page.css (.esoc-* classes).
 */

export const ENTERPRISE_SOC_SHIFT = {
  heading: {
    prefix: 'The SIRP ',
    italic: 'shift',
  },
  subtext:
    'From human-centered operations to system-centered operations. This is not about doing the same work faster. It\'s about changing who the system is built around.',
  cards: [
    {
      id: 'cognitive',
      icon: 'bargraph' as const,
      title: 'Agents handle the cognitive load',
      description:
        'Specialized agents perform triage, enrichment, classification, and summarization continuously and deterministically, without waiting for human attention.',
    },
    {
      id: 'decision-ready',
      icon: 'current' as const,
      title: 'Humans see only decision-ready cases',
      description:
        'Instead of drowning in alerts, analysts and leaders see a clean stream of fully prepared cases: complete context, clear assessment, and recommended paths.',
    },
    {
      id: 'learns',
      icon: 'quater' as const,
      title: 'The system learns from outcomes',
      description:
        'Every decision, action, and outcome feeds back into the system, improving scoring, routing, and response strategy over time.',
    },
  ],
} as const

export const ENTERPRISE_SOC_REALITY = {
  badge: 'The Enterprise Reality',
  heading: {
    line1: "Your SOC doesn't scale.",
    line2: 'Headcount does.',
  },
  subtext: 'Every SOC eventually hits the same structural limits, no matter how good the tools are.',
  cards: [
    {
      id: 'alerts',
      title: "Alerts scale. Teams don't.",
      description: 'Detection grows exponentially. Hiring grows linearly.',
      image: '/images/enterprise-soc/Alerts scale.png',
      imageAlt: 'Alert network visualization showing scaled connections',
      textTop: false,
      highlighted: false,
    },
    {
      id: 'tier-work',
      title: 'Most SOC spend goes to tier-1 and tier-2 work',
      description: 'Humans are stuck doing triage, enrichment, and basic decisions.',
      image: '/images/enterprise-soc/tier-1.png',
      imageAlt: 'SOC queue showing tier-1 and tier-2 workload',
      textTop: true,
      highlighted: true,
    },
    {
      id: 'investigations',
      title: 'Investigations are slow because context is manual',
      description: 'Analysts spend more time gathering data than reasoning about it.',
      image: '/images/enterprise-soc/Investigations.png',
      imageAlt: 'Investigation graph showing manual context gathering',
      textTop: false,
      highlighted: false,
    },
    {
      id: 'automation',
      title: 'Automation still depends on human decisions',
      description: 'Playbooks execute. Humans still interpret.',
      image: '/images/enterprise-soc/Automation.png',
      imageAlt: 'Playbook execution requiring human interpretation',
      textTop: true,
      highlighted: false,
    },
  ],
} as const

export const ENTERPRISE_SOC_DASHBOARD = {
  heading: 'Executive impact dashboard',
  subtext: 'This is what happens when you change the operating model, not the tools.',
  metrics: [
    {
      id: 'productivity',
      badge: 'Increased Productivity',
      value: '5-10x',
      label: 'more volume handled per analyst',
      color: 'teal' as const,
      icon: 'bargraph' as const,
    },
    {
      id: 'governance',
      badge: 'Governance',
      value: '100%',
      label: 'decisions traceable',
      color: 'orange' as const,
      icon: 'search' as const,
    },
    {
      id: 'mttd',
      badge: 'Faster MTTD and MTTR',
      value: 'Decrease',
      label: 'in detection and response time',
      color: 'teal' as const,
      icon: 'current' as const,
    },
    {
      id: 'economics',
      badge: 'Unit Economics',
      value: 'Decrease',
      label: 'in cost per incident',
      color: 'purple' as const,
      icon: 'dollar' as const,
    },
  ],
} as const

export const ENTERPRISE_SOC_THREAT = {
  heading: 'What happens when threat appears',
  steps: [
    { id: 'alerts',      icon: 'bargraph', label: 'Alerts are correlated' },
    { id: 'context',     icon: 'search',   label: 'Context is assembled' },
    { id: 'confidence',  icon: 'quater',   label: 'Confidence is calculated' },
    { id: 'containment', icon: 'current',  label: 'Containment is executed' },
    { id: 'response',    icon: 'download', label: 'Response happens at machine speed.' },
  ],
  cta: {
    badge: 'This is Not Assistance. This is Autonomy.',
    headingItalic: 'Enterprise SOC transformation',
    headingSuffix: ' is an operating decision.',
    subtext: 'Autonomous security delivers the speed, control, and consistency that decision requires.',
    btn: { label: 'Transform your SOC', href: '/contact' },
  },
} as const

export const ENTERPRISE_SOC_AI_NATIVE = {
  heading: 'See what an AI-native SOC feels like',
  subtext: 'Not a slide deck. Not a feature tour. An actual operating system in motion.',
  cta: { label: 'Request a demo', href: '/contact' },
  image: '/images/enterprise-soc/AI-native.png',
  imageAlt: 'OmniSense platform in autonomous mode',
} as const

export const ENTERPRISE_SOC_HERO = {
  badge: 'Enterprise SOC',
  heading: {
    prefix: 'Run your ',
    italic: 'SOC as a machine,',
    suffix: ' not a call center.',
  },
  description:
    'SIRP transforms enterprise security operations from human-driven workflows into an AI-native, self-orchestrating system.',
  cta: {
    label: 'Request a demo',
    href: '/contact',
  },
} as const
