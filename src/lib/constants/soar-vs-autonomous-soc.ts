export const SOAR_VS_AUTONOMOUS_SOC_HEADER = {
  heading: {
    line1: 'SOAR vs Autonomous SOC',
    line2: '',
  },
  paragraph1: {
    lines: [
      'Every SOAR platform, regardless of vendor, is built on the same core assumption: a workflow',
      'defined in advance is still the right response by the time it finishes executing. That',
      "assumption is the architecture's ceiling, not a tuning problem.",
    ],
  },
  paragraph2: {
    line1:
      'To understand the core concept behind the alternative, see what',
    link1Label: 'an autonomous SOC is',
    link1Href: '/what-is-autonomous-soc',
    betweenLinks: ' and ',
    link2Label: 'how it changes security operations.',
    link2Href: '/how-autonomous-soc-works',
  },
  paragraph3: {
    line1:
      'Instead of focusing primarily on workflow orchestration, an Autonomous SOC embeds decision logic,',
    line2:
      'risk computation, and policy enforcement directly into the operating system of security operations.',
  },
  paragraph4:
    'This page explains exactly where SOAR breaks, and what a decision-centric Autonomous SOC does instead.',
} as const

export const SOAR_VS_AUTONOMOUS_SOC_METADATA = {
  title: 'SOAR vs Autonomous SOC: Why Workflow Automation Hits a Ceiling | SIRP',
  description:
    "Every SOAR platform runs on the same architecture: static playbooks triggered once, evaluated once. Here's exactly where that breaks, and what a decision-centric Autonomous SOC does instead.",
} as const

export const SOAR_VS_MECHANISM_FAILURES = {
  heading: 'What SOAR Gets Wrong, Architecturally',
  subheading:
    'Both claims below are true of every SOAR deployment, not because vendors failed to fix them, but because they follow directly from the trigger-then-execute model itself.',
  cards: [
    {
      title: 'Playbooks are evaluated once, at trigger time',
      text: "A SOAR playbook is a DAG walked from a single starting condition. The risk assessment that decided which branch to take happens at step one — the system doesn't re-run that assessment as new telemetry arrives mid-execution. If the incident's actual severity changes at step four, the playbook doesn't know; it just keeps walking the path it started on.",
    },
    {
      title: 'Every branch point is a place a human either gates or gets bypassed',
      text: "To keep false-positive rates tolerable, most consequential actions get a human-approval node in the graph. That's not a process failure, it's a necessary safety valve given the architecture — the system has no way to express confidence, so a human has to supply it manually at every high-stakes step. The latency isn't from slow analysts. It's from the system having no native way to say \"I'm confident enough to act here.\"",
    },
    {
      title: 'Integration count is a linear cost, not a one-time investment',
      text: "Each new tool in the stack is a new set of playbook branches, new field mappings, new failure modes to handle when that tool's API changes. Coverage doesn't compound — it accumulates maintenance. This is why SOAR deployments plateau: each additional integration costs roughly the same as the last one to build and to keep working.",
    },
    {
      title: 'Nothing carries forward between incidents',
      text: "A closed incident's outcome doesn't change how the next similar alert is scored, unless a person manually edits a playbook or a detection rule in response. The system has no feedback loop from outcome back to decision logic. Judgment doesn't accumulate; only the playbook library does.",
    },
  ],
} as const

export const SOAR_VS_WHAT_OMNISENSE_DOES = {
  heading: 'What OmniSense Does Instead',
  intro:
    'OmniSense answers each gap above with a native architectural counterpart rather than a bolted-on approval step.',
  items: [
    {
      title: 'Planner, Executor, Governor',
      body: "OmniSense splits decision-making into three layers instead of one monolithic workflow engine: the Planner continuously reassesses what an incident needs, the Executor carries out approved actions, and the Governor enforces policy on every step in between. Splitting them apart is what lets confidence and policy sit natively in the system instead of being bolted on as approval gates.",
    },
    {
      title: 'Sara, the Co-Analyst',
      body: 'Sara hands a decision back to a human only when policy requires it or confidence falls below the governed threshold — with the reasoning that led there, not just a raw alert.',
    },
    {
      title: 'S3 risk scoring',
      body: 'Risk is computed continuously from findings up through assets to the organization, so the same incident is re-scored as new context arrives instead of being scored once at trigger time. This is how confidence gets expressed natively rather than supplied manually at an approval gate.',
    },
    {
      title: 'Reasoning trail',
      body: 'Every decision captures the inputs it weighed, the policy check it passed, and the outcome it produced — a trail built for audit, not a log of which actions fired.',
    },
  ],
} as const

export const SOAR_VS_CTA = {
  heading: 'Ready to see it in action?',
  primaryBtn: { label: 'Get a demo', href: '/contact' },
  secondaryBtn: { label: 'Talk to an architect', href: '/contact' },
} as const

export const SOAR_VS_FAQ = {
  heading: 'Frequently Asked Questions',
  items: [
    {
      question: "What's the actual architectural difference between SOAR and an Autonomous SOC?",
      answer:
        'SOAR walks a predefined playbook once, from a single trigger condition, and does not re-evaluate risk as the incident evolves. An Autonomous SOC continuously re-scores risk and re-evaluates its response as new telemetry arrives, with policy thresholds — not manual approval gates — deciding when it can act on its own.',
    },
    {
      question: 'Does moving to Autonomous SOC mean removing analysts from the loop?',
      answer:
        'No. Analysts move from operators who execute or approve every step to governors who set the policy thresholds the system executes within. The system asks for a human when it should; it does not remove the human.',
    },
    {
      question: 'Can Autonomous SOC run alongside SOAR I already have?',
      answer:
        'Yes. Most organizations run Autonomous SOC alongside their existing SOAR, moving specific containment classes over as confidence builds rather than replacing everything at once.',
    },
    {
      question: 'When does SOAR stop being enough?',
      answer:
        'When incident velocity exceeds human routing capacity, when response latency itself increases business risk, or when the environment spans enough domains that a static playbook goes stale before it finishes executing.',
    },
  ],
} as const

export const SOAR_VS_WHAT_IS_SOAR = {
  heading: 'What Is SOAR?',
  summary:
    'SOAR platforms are designed to orchestrate tools and automate predefined workflows.',
  listLead: 'They typically:',
  points: [
    'Trigger playbooks when alerts are received',
    'Execute branching logic based on rules',
    'Integrate across SIEM, EDR, and ticketing systems',
    'Require human validation for critical actions',
  ],
  closing:
    'SOAR reduces repetitive work by automating steps. However, it does not fundamentally change where decision authority resides. Analysts still review, validate, and execute most meaningful response actions.',
  image: {
    src: '/images/soar vs autonomous/what-is-soar.png',
    alt: 'SOAR diagram: human availability, incoming tickets, swift coverage',
  },
} as const

export const SOAR_VS_WHAT_IS_AUTONOMOUS_SOC = {
  heading: 'What Is an Autonomous SOC?',
  definition:
    'An Autonomous SOC is a security operations model in which AI systems independently analyze incidents, compute risk dynamically, and execute response actions within governance boundaries.',
  listLead: 'Rather than following static playbooks, an Autonomous SOC:',
  points: [
    'Continuously evaluates contextual state',
    'Computes risk in real time',
    'Selects response actions based on policy and \nconfidence thresholds',
    'Executes without routing every decision through human queues',
    'Learns from outcomes to improve future decisions',
  ],
  closing: 'The shift is from task automation to decision ownership.',
  image: {
    src: '/images/soar vs autonomous/autonomous-SOC.png',
    alt: 'Autonomous SOC funnel from high alert volume to governed human review',
  },
} as const

export const SOAR_VS_ARCHITECTURAL_DIFFERENCE = {
  heading: 'Architectural Difference',
  introLines: ['SOAR is workflow-centric.', 'Autonomous SOC is decision-centric.'],
  cards: [
    {
      title: 'SOAR architecture:',
      glow: 'yellow' as const,
      points: [
        'Event → Trigger → Playbook → Action',
        'Static branching logic',
        'Human approval checkpoints',
      ],
    },
    {
      title: 'Autonomous SOC architecture:',
      glow: 'blue' as const,
      points: [
        'Continuous signal ingestion',
        'Context construction across identities, endpoints, and behavior',
        'Real-time risk computation',
        'Policy-bound execution',
        'Embedded learning loop',
      ],
    },
  ],
  footerWithLink: {
    beforeLink: 'This decision pipeline is explained in detail in ',
    linkLabel: 'how autonomous SOC works',
    linkHref: '/what-is-autonomous-soc',
    afterLink: ' at the system level.',
    taglines: ['One coordinates actions.', 'The other governs decisions.'],
  },
} as const

export const SOAR_VS_COMPARISON_TABLE = {
  heading: 'SOAR vs Autonomous SOC Comparison',
  cards: [
    {
      title: 'Capability',
      glow: 'red' as const,
      points: [
        'Core Model',
        'Logic Type',
        'Human Dependency',
        'Learning',
        'Context Awareness',
        'Execution',
        'Governance',
      ],
    },
    {
      title: 'SOAR',
      glow: 'yellow' as const,
      points: [
        'Workflow orchestration',
        'Rule-based branching',
        'High for validation',
        'Manual tuning',
        'Playbook-scoped',
        'Playbook-driven',
        'External controls',
      ],
    },
    {
      title: 'Autonomous SOC',
      glow: 'blue' as const,
      points: [
        'Decision system',
        'Dynamic risk computation',
        'Policy-bound autonomy',
        'Embedded reinforcement learning',
        'State-aware across domains',
        'Confidence-gated enforcement',
        'Embedded policy model',
      ],
    },
  ],
  footerLines: [
    'SOAR automates steps.',
    'Autonomous SOC computes and enforces outcomes.',
  ],
} as const

export const SOAR_VS_WHEN_SOAR_SUFFICIENT = {
  heading: 'Where SOAR Is Still the Right Call',
  listLead: 'SOAR may be appropriate when:',
  points: [
    'Automation is limited to enrichment workflows',
    'Incident volume is manageable',
    'Human triage remains primary',
    'Risk tolerance requires strict manual approval',
  ],
  closing:
    'In stable, low-complexity environments, workflow automation can provide efficiency gains.',
  image: {
    src: '/images/soar vs autonomous/sufficient.png',
    alt: 'Execute Playbook UI: playbook search and selection',
  },
} as const

export const SOAR_VS_WHEN_AUTONOMOUS_SOC_NEEDED = {
  heading: 'When Autonomous SOC Is Needed',
  listLead: 'An Autonomous SOC becomes necessary when:',
  points: [
    'Incident velocity exceeds human routing capacity',
    'Cross-domain attacks require dynamic context interpretation',
    'Response latency directly increases business risk',
    'Security outcomes vary by analyst experience',
    'Continuous learning is required to improve containment effectiveness',
  ],
  closing: 'In these environments, workflow orchestration becomes a bottleneck.',
  image: {
    src: '/images/soar vs autonomous/autonomous SOC needed.png',
    alt: 'Cost over time: Human SOC rising vs flat Autonomous SOC',
  },
} as const

export const SOAR_VS_NEXT_GEN_SOAR = {
  heading: 'Is Autonomous SOC Just "Next-Generation SOAR"?',
  answer: 'No.',
  paragraphs: [
    'Enhancing workflows with AI assistance does not change the underlying architecture.',
    'Autonomous SOC replaces workflow-centric orchestration with a governed decision model in which risk computation, policy enforcement, and execution are embedded within the system.',
    'It is not deeper automation.',
    'It is a different operating model.',
  ],
  image: {
    src: '/images/soar vs autonomous/next-gen-SOAR.png',
    alt: 'Autonomous SOC flow: Detection, Evaluation, and Action',
  },
} as const

export const SOAR_VS_MIGRATION_CONSIDERATIONS = {
  heading: 'Migration Considerations',
  intro: {
    line1Before:
      'Transitioning from SOAR to Autonomous SOC does not require immediate replacement. Most organizations run Autonomous SOC alongside their existing SOAR',
    linkLabel: '',
    linkHref: '',
    line1After: ' and move specific containment classes over as confidence builds.',
    line2: 'A phased approach may include:',
  },
  cards: [
    {
      icon: 'chart' as const,
      title: 'Deploying Autonomous SOC alongside existing SOAR',
      paragraphs: [],
    },
    {
      icon: 'sparkle' as const,
      title: 'Defining execution boundaries and policy thresholds',
      paragraphs: [],
    },
    {
      icon: 'pie' as const,
      title: 'Moving repetitive containment classes into autonomous execution',
      paragraphs: [],
    },
    {
      icon: 'pie' as const,
      title: 'Gradually reducing human gating as confidence matures',
      paragraphs: [],
    },
  ],
  footerLines: [
    'The objective is not eliminating analysts.',
    'It is relocating human effort from routing work to defining governance.',
  ],
} as const

export const SOAR_VS_ARCHITECTURE_AUTHORITY = {
  heading: 'Architecture Determines Authority',
  paragraphs: [
    'If your security operations still rely on inbox routing, workflow tuning, and manual validation for meaningful response, the limitation may not be automation\ndepth — but architectural design.',
  ],
  closingLine1: 'SOAR automates tasks.',
  closingLine2: 'Autonomous SOC governs outcomes.',
} as const
