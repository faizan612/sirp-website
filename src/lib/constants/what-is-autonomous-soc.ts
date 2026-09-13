export const WHAT_IS_AUTONOMOUS_SOC_HEADER = {
  badgeText: 'Pillar',
  heading: {
    prefix: 'What is an ',
    emphasized: 'Autonomous SOC',
    suffix: '?',
  },
  subtext: {
    paragraph1: 'An Autonomous SOC is a security operations model where AI systems independently detect, investigate, decide, and respond to defined classes of incidents within governance boundaries.',
    paragraph2: 'Unlike traditional SOAR platforms that automate static workflows, an Autonomous SOC evaluates live context, computes risk dynamically, selects a response, and executes actions based on policy and confidence thresholds.',
    paragraph3: 'The goal is not to replace analysts. The goal is to redesign how security decisions are made.',
  },
} as const

// S1 hero — mono eyebrow, two CTAs. The four loop verbs (detect, investigate,
// decide, respond) are emphasized from the existing definition string itself.
export const WHAT_IS_AUTONOMOUS_SOC_HERO = {
  eyebrow: 'Definition / Autonomous SOC',
  loopVerbs: ['detect', 'investigate', 'decide', 'respond'],
  primaryCta: { label: 'Get a demo', href: '/contact' },
  secondaryCta: { label: 'Try SARA free', href: 'https://sara-open.sirp.io/' },
} as const

export const WHAT_IS_AUTONOMOUS_SOC_TRADITIONAL_MODELS = {
  heading: {
    line1: 'Why Traditional SOC',
    line2: "Models Don't Scale",
  },
  intro: 'Traditional SOC models rely on sequential human routing: alert generation, analyst investigation, supervisory review, and manual remediation. This process breaks down under modern conditions of high alert volume, tool sprawl, and AI-driven attack velocity.',
  lead: "Today's challenges include:",
  points: [
    'AI-driven attacks operating 24/7',
    'Growing alert fatigue and analyst burnout',
    'Talent shortages across cybersecurity teams',
    'Increasing pressure to reduce response time',
  ],
  outro: 'Simply adding automation is no longer enough. Security teams need systems that can independently resolve routine incidents safely.',
  image: {
    src: '/images/traditional soc models/soc model.png',
    alt: 'Human SOC and Autonomous SOC comparison diagram',
  },
} as const

export const WHAT_IS_AUTONOMOUS_SOC_HOW_IT_WORKS = {
  heading: 'How an Autonomous SOC Works',
  intro: 'An Autonomous SOC is not a feature set. It is an architectural shift from task automation to decision ownership. To function safely, it must maintain a complete reasoning and execution loop.',
  lead: 'At SIRP, that includes:',
  steps: [
    { number: '1', title: 'Continuous Signal Ingestion', description: 'Collecting and correlating alerts across SIEM, EDR, identity, cloud, and SaaS tools.', borderIcon: '/images/global/number border purple.svg' },
    { number: '2', title: 'Real-Time Context Construction', description: 'Using OmniMap to maintain persistent relationships between users, endpoints, incidents, and historical actions.', borderIcon: '/images/global/number border purple.svg' },
    { number: '3', title: 'Intelligent Reasoning', description: 'Applying OmniSense, powered by the OmniSec LLM and tenant-grounded retrieval, to interpret and evaluate the situation.', borderIcon: '/images/global/number border purple.svg' },
    { number: '4', title: 'Adaptive Response Optimization', description: 'Leveraging OmniFlex, the reinforcement learning layer, to determine the most effective containment strategy based on prior outcomes and analyst feedback.', borderIcon: '/images/global/number border purple.svg' },
    { number: '5', title: 'Policy-Bound Execution', description: 'Executing remediation actions only when confidence thresholds and governance constraints are satisfied.', borderIcon: '/images/global/number border purple.svg' },
    { number: '6', title: 'Native Traceability', description: 'Recording the reasoning path, evidence, and actions for every autonomous decision.', borderIcon: '/images/global/number border purple.svg' },
  ],
  notes: [
    'If a system only recommends actions and waits for approval, it is assistive.',
    'If it can resolve defined incident classes independently within policy boundaries, it is autonomous.',
  ],
} as const

// S4 — two-layer how-it-works. Layer 1 is the vendor-neutral category loop
// (generic verb + plain one-liner, no product names — earns credibility on an
// educational query). Layer 2 maps each generic stage to the SIRP step that
// performs it, reusing the existing step title + description verbatim.
export const WHAT_IS_AUTONOMOUS_SOC_LOOP = {
  eyebrow: 'How it works',
  layer1Label: 'The autonomous loop',
  layer2Label: WHAT_IS_AUTONOMOUS_SOC_HOW_IT_WORKS.lead, // 'At SIRP, that includes:'
  stages: [
    { token: '01', verb: 'Ingest', generic: 'Collect and correlate signals from every connected tool.', sirp: WHAT_IS_AUTONOMOUS_SOC_HOW_IT_WORKS.steps[0] },
    { token: '02', verb: 'Context', generic: 'Build a live picture of how users, assets, and incidents relate.', sirp: WHAT_IS_AUTONOMOUS_SOC_HOW_IT_WORKS.steps[1] },
    { token: '03', verb: 'Reason', generic: 'Interpret the situation and weigh the risk.', sirp: WHAT_IS_AUTONOMOUS_SOC_HOW_IT_WORKS.steps[2] },
    { token: '04', verb: 'Decide', generic: 'Choose the response most likely to contain the threat.', sirp: WHAT_IS_AUTONOMOUS_SOC_HOW_IT_WORKS.steps[3] },
    { token: '05', verb: 'Execute', generic: 'Act only within policy and confidence limits.', sirp: WHAT_IS_AUTONOMOUS_SOC_HOW_IT_WORKS.steps[4] },
    { token: '06', verb: 'Record', generic: 'Log the full reasoning path, evidence, and actions.', sirp: WHAT_IS_AUTONOMOUS_SOC_HOW_IT_WORKS.steps[5] },
  ],
} as const

// S5 — the sharpest idea on the page, promoted from the How-it-works notes
// into a full-width signature divider. Statements reuse the notes copy verbatim.
export const WHAT_IS_AUTONOMOUS_SOC_DIVIDER = {
  eyebrow: 'The Dividing Line',
  assistive: {
    label: 'Assistive',
    statement: WHAT_IS_AUTONOMOUS_SOC_HOW_IT_WORKS.notes[0],
  },
  autonomous: {
    label: 'Autonomous',
    statement: WHAT_IS_AUTONOMOUS_SOC_HOW_IT_WORKS.notes[1],
  },
} as const

// S2/S3 — the four pain points become a 2x2 grid with mono category labels;
// the cost-curve framing line (moved here from the Benefits intro so it sits
// next to the curve diagram and is not duplicated later) reuses existing copy.
export const WHAT_IS_AUTONOMOUS_SOC_PROBLEM = {
  eyebrow: 'The Problem',
  heading: WHAT_IS_AUTONOMOUS_SOC_TRADITIONAL_MODELS.heading,
  intro: WHAT_IS_AUTONOMOUS_SOC_TRADITIONAL_MODELS.intro,
  lead: WHAT_IS_AUTONOMOUS_SOC_TRADITIONAL_MODELS.lead,
  outro: WHAT_IS_AUTONOMOUS_SOC_TRADITIONAL_MODELS.outro,
  pains: [
    { label: '24/7 Attacks', text: WHAT_IS_AUTONOMOUS_SOC_TRADITIONAL_MODELS.points[0] },
    { label: 'Alert Fatigue', text: WHAT_IS_AUTONOMOUS_SOC_TRADITIONAL_MODELS.points[1] },
    { label: 'Talent Gap', text: WHAT_IS_AUTONOMOUS_SOC_TRADITIONAL_MODELS.points[2] },
    { label: 'Response Time', text: WHAT_IS_AUTONOMOUS_SOC_TRADITIONAL_MODELS.points[3] },
  ],
  curve: {
    caption: 'SIRP changes the shape of your cost curve. Instead of growth increasing operational drag, growth increases leverage.',
    linearLabel: 'Traditional SOC',
    leverageLabel: 'Autonomous SOC',
    xAxis: 'Scale',
    yAxis: 'Cost',
  },
} as const

// S6 — outcome-led benefit cards. `mechanism` is a short mono "signal" line
// shown under each outcome; `glosses` define OmniFlex / OmniCollective for a
// cold search visitor. The cost-curve intro line now lives in PROBLEM.curve.
export const WHAT_IS_AUTONOMOUS_SOC_BENEFITS = {
  badgeText: 'The Business Outcome',
  heading: 'Benefits of an Autonomous SOC',
  glosses: [
    { term: 'OmniFlex', definition: 'the reinforcement-learning layer that improves containment over time' },
    { term: 'OmniCollective', definition: 'cross-environment learning without sharing raw data' },
  ],
  cards: [
    {
      icon: 'chart',
      title: 'Faster Incident Response',
      mechanism: 'Continuous decision pipeline',
      paragraphs: [
        'By eliminating routing delays for low-risk incidents, response time decreases significantly. This is possible because of the continuous decision pipeline that governs how Autonomous SOC works in real time.',
        'Routine phishing, known IOC matches, and predefined account abuse patterns can be resolved automatically — within policy.',
      ],
    },
    {
      icon: 'mute',
      title: 'Reduced Alert Fatigue',
      mechanism: 'Noise cleared before analysts',
      paragraphs: [
        'Noise and false positives are cleared before reaching analysts.',
        'Only cases that require judgment or exception handling are escalated.',
      ],
    },
    {
      icon: 'hand',
      title: 'Consistent Decision-Making',
      mechanism: 'Uniform policy enforcement',
      paragraphs: [
        'Autonomous systems do not vary by shift, fatigue level, or experience.',
        'Policy is enforced uniformly.',
      ],
    },
    {
      icon: 'refresh',
      title: 'Continuous Improvement',
      mechanism: 'Reinforcement learning + shared insight',
      paragraphs: [
        'Through OmniFlex, containment strategies improve over time.',
        'Through OmniCollective, learning can strengthen across environments without sharing raw data.',
        'Autonomy compounds.',
      ],
    },
  ],
} as const

export const WHAT_IS_AUTONOMOUS_SOC_RIGHT_BALANCE = {
  eyebrow: 'Human + Machine',
  heading: {
    line1: 'The Right Balance of Human',
    line2: 'and Machine',
  },
  paragraphs: ['An Autonomous SOC does not remove humans from security operations.', 'It repositions them.'],
  analystDefinesLead: 'Analysts define:',
  analystDefines: ['Execution boundaries', 'Confidence thresholds', 'Escalation conditions', 'Irreversible action restrictions'],
  operationsParagraph: 'The system operates inside those guardrails.',
  analystFocusLead: 'Analysts focus on:',
  analystFocus: ['Complex investigations', 'Emerging threat hunting', 'Governance and oversight', 'Strategic security improvements'],
  closingLines: [
    'Human-in-the-loop for every alert does not scale.',
    'Human-on-the-loop governance does. This architectural shift reflects the fundamental difference between SOAR and Autonomous SOC operating models.',
  ],
  differenceLink: { label: 'difference between SOAR and Autonomous SOC', href: '/soar-vs-autonomous-soc' },
  image: {
    src: '/images/benefitsOfSOC/right balance.png',
    alt: 'OmniSense autonomous mode interface with human and machine balance visual',
  },
} as const

export const WHAT_IS_AUTONOMOUS_SOC_SAFETY = {
  eyebrow: 'Trust & Governance',
  heading: {
    line1: 'Is an Autonomous SOC',
    line2: 'Safe?',
  },
  paragraphs: ['Safety depends on architecture.', 'SIRP enforces:'],
  points: ['Confidence-gated execution', 'Structured escalation policies', 'Shadow validation before live autonomy', 'Full audit trails for every action'],
  closingLines: ['Autonomy without governance is risky.', 'Governed autonomy is safer than manual response under fatigue.'],
  image: {
    src: '/images/benefitsOfSOC/machine decision making.png',
    alt: 'Machine decision-making and human authority governance diagram',
  },
} as const

export const WHAT_IS_AUTONOMOUS_SOC_COMPARISON = {
  heading: 'Automated SOC vs Autonomous SOC',
  cards: [
    {
      title: 'Automated SOC',
      points: ['Executes predefined playbooks', 'Relies on static logic', 'Requires frequent manual oversight', 'Focused on task automation'],
      glow: 'red',
    },
    {
      title: 'Autonomous SOC',
      points: ['Computes decisions dynamically', 'Adapts based on context and outcomes', 'Operates independently within policy guardrails', 'Focused on decision ownership'],
      glow: 'yellow',
    },
  ],
  redesign: {
    heading: 'The Structural Redesign of the Modern SOC',
    paragraphs: [
      'Security automation was the first evolution in modern SOC design. Autonomous SOC represents the next phase — governed, AI-driven decision systems capable of operating at machine speed while preserving human oversight.',
      'SIRP delivers a governed Autonomous SOC platform designed for the AI era.',
    ],
  },
} as const

// FAQPage JSON-LD — every question is answered in-body on the page.
export const WHAT_IS_AUTONOMOUS_SOC_FAQ = {
  items: [
    {
      question: 'What is an Autonomous SOC?',
      answer:
        'An Autonomous SOC is a security operations model where AI systems independently detect, investigate, decide, and respond to defined classes of incidents within governance boundaries — evaluating live context, computing risk, selecting a response, and executing within policy and confidence thresholds.',
    },
    {
      question: 'Is an Autonomous SOC safe?',
      answer:
        'Safety depends on architecture. SIRP enforces confidence-gated execution, structured escalation policies, shadow validation before live autonomy, and full audit trails for every action. Governed autonomy is safer than manual response under fatigue.',
    },
    {
      question: 'Automated SOC vs Autonomous SOC — what is the difference?',
      answer:
        'An automated SOC executes predefined playbooks with static logic and requires frequent manual oversight — task automation. An Autonomous SOC computes decisions dynamically, adapts based on context and outcomes, and operates independently within policy guardrails — decision ownership.',
    },
    {
      question: 'Does an Autonomous SOC replace analysts?',
      answer:
        'No. The goal is not to replace analysts but to redesign how security decisions are made. Analysts define the execution boundaries, confidence thresholds, and escalation conditions, then focus on complex investigations, threat hunting, and governance while the system operates inside those guardrails.',
    },
  ],
} as const

// S10 — real conversion band. Replaces the old footer CTA whose primary
// button linked back to this same page.
export const WHAT_IS_AUTONOMOUS_SOC_CLOSING_CTA = {
  eyebrow: 'Get started',
  heading: 'See a governed Autonomous SOC in action',
  primary: { label: 'Get a demo', href: '/contact' },
  secondary: { label: 'See how it works', href: '/how-autonomous-soc-works' },
  tertiary: { label: 'Try SARA free', href: 'https://sara-open.sirp.io/' },
} as const
