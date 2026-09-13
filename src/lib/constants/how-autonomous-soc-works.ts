export const HOW_AUTONOMOUS_SOC_WORKS_DATA = {
  hero: {
    badge: 'HOW IT WORKS',
    heading: 'How an autonomous SOC',
    headingItalic: 'works',
    description: 'SIRP doesn\'t add automation to a broken process. It replaces the process entirely with a continuous decision system that ingests, reasons, governs, acts, and learns. In real time.',
  },
  overview: {
    heading: 'Architecture overview',
    subheading: 'Six layers. One continuous loop.',
    subtext: 'SIRP functions as a closed-loop Autonomous SOC built around six core layers. Every layer runs continuously as your environment changes.',
    subtext2: 'Not per ticket. Not per alert. Evaluated as an evolving system state.',
    image: '/images/autonomous-soc/learning.png',
    imageAlt: 'Six layers architecture overview',
  },
  steps: [
    {
      number: '01',
      label: 'Step one',
      title: 'Signal Ingestion',
      description: 'SIRP ingests telemetry from your entire stack: Identity providers, endpoints, cloud, network, SaaS, threat intel, and your existing SIEM/EDR/XDR. Every signal is normalized into structured entities. No blind spots. No filtered snapshots.',
      images: [
        '/images/autonomous-soc/reasoning.png',
      ],
    },
    {
      number: '02',
      label: 'Step two',
      title: 'Relational Context',
      description: 'Most tools treat alerts as isolated events. Three signals, three tickets, zero connected thinking.\n\nOmniMap maps the relationships between identities, devices, workloads, access paths, and historical incidents so SIRP can estimate blast radius and detect exposure paths before a human would even think to connect them.',
      images: [
        '/images/autonomous-soc/context.png',
      ],
    },
    {
      number: '03',
      label: 'Step three',
      title: 'Risk Evaluation & Reasoning',
      description: 'OmniSense continuously evaluates system state against behavioral baselines, threat intel, privilege levels, asset sensitivity, and OmniMap\'s relational context. For every event: a risk score, a confidence level, eligible actions, and a clear execution authorization.\n\nIt doesn\'t just flag what\'s bad. It decides what to do about it.',
      images: [
        '/images/autonomous-soc/mesh.png',
      ],
    },
    {
      number: '04',
      label: 'Step four',
      title: 'Policy Validation',
      description: 'Autonomy without governance is just chaos with better tooling. Every decision is validated against your policies permitted actions, risk thresholds, asset constraints, escalation rules.\n\nConditions met? It acts.\n\nConditions not met? It escalates.\n\nNo ambiguity.',
      images: [
        '/images/autonomous-soc/ingestion.png',
      ],
    },
    {
      number: '05',
      label: 'Step five',
      title: 'Autonomous Execution',
      description: 'This is where most platforms stop and send you a Slack message. SIRP\'s Agentic Mesh executes: endpoint isolation, identity restriction, session termination, network containment, cloud workload isolation, the moment governance and confidence conditions are met.',
      images: [
        '/images/autonomous-soc/ingestion-2.png',
      ],
    },
    {
      number: '06',
      label: 'Step six',
      title: 'Decision Memory & Learning',
      description: 'Every decision is recorded: context, actors, actions, outcomes, analyst feedback. This memory feeds back into OmniSense, refining future risk evaluation continuously.\n\nStatic systems degrade. Learning systems compound.',
      images: [
        '/images/autonomous-soc/execution.png',
      ],
    },
  ],
} as const
