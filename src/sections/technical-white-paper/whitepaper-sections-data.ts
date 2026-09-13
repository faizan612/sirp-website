/** Copy aligned with https://www.sirp.io/technical-white-paper */

export type WhitePaperBlock =
  | { kind: 'p'; text: string; variant?: 'copyright' }
  | { kind: 'ul'; items: readonly string[] }
  | { kind: 'ol'; items: readonly string[] }
  | { kind: 'em'; text: string }
  | { kind: 'strongLabel'; text: string }
  | { kind: 'image'; src: string; alt: string; width?: number; height?: number }

export type WhitePaperSectionData = {
  id: string
  heading: string
  blocks: readonly WhitePaperBlock[]
}

export const WHITE_PAPER_SECTIONS: readonly WhitePaperSectionData[] = [
  {
    id: 'founders-preface',
    heading: "Founder's Preface",
    blocks: [
      {
        kind: 'p',
        text:
          'I have spent the better part of my career designing, operating, and scaling Security Operations Centers across different regions, regulatory environments, and threat landscapes. Over time, a pattern emerged that could not be ignored: most SOC failures were not caused by a lack of tools or talent, but by the structural limitations of the operating model itself.',
      },
    ],
  },
  {
    id: 'executive-summary',
    heading: 'Executive Summary',
    blocks: [
      {
        kind: 'p',
        text:
          'Security Operations Centers were designed for a world in which threats were episodic, alerts were manageable, and human analysts could remain the primary decision-makers. That world no longer exists.',
      },
      {
        kind: 'p',
        text:
          'This paper presents an AI-native security architecture that reframes the SOC as a governed decision pipeline: one that continuously senses, reasons, acts, and learns within explicit human-defined boundaries.',
      },
      {
        kind: 'p',
        text:
          'An AI-native Autonomous SOC is a governed decision pipeline that continuously senses, reasons, acts, and learns within explicit human-defined policy boundaries.',
      },
      {
        kind: 'em',
        text:
          'This architecture enables what is often described as a self-driving SOC: supervised autonomy, not uncontrolled automation.',
      },
    ],
  },
  {
    id: 'structural-limits',
    heading: '1. The Structural Limits of the Traditional SOC',
    blocks: [
      {
        kind: 'p',
        text:
          'Traditional SOCs were designed around sequential human routing and reactive analysis. Alerts are generated, triaged, escalated, reviewed, and manually remediated.',
      },
      { kind: 'p', text: 'This model assumes:' },
      {
        kind: 'ul',
        items: ['Manageable alert volume', 'Predictable threat patterns', 'Human decision dominance'],
      },
      {
        kind: 'p',
        text:
          'In modern environments defined by identity abuse, cloud misconfiguration, and AI-assisted adversaries, this structure introduces systemic latency and decision variance.',
      },
      { kind: 'p', text: 'The limitation is not effort.' },
      { kind: 'p', text: 'It is architecture.' },
    ],
  },
  {
    id: 'automation-ceiling',
    heading: '2. Why Automation and SOAR Reach a Ceiling',
    blocks: [
      {
        kind: 'p',
        text:
          'SOAR platforms automate execution but preserve static decision logic. Playbooks encode responses for predefined conditions. When context shifts mid-incident, workflows do not reinterpret risk; they continue executing as written.',
      },
      {
        kind: 'p',
        text: 'Automation without reasoning eventually reaches a structural ceiling.',
      },
    ],
  },
  {
    id: 'principles',
    heading: '3. Principles of an AI-Native Security Architecture',
    blocks: [
      { kind: 'p', text: 'Designing an AI-native SOC requires first principles:' },
      {
        kind: 'ul',
        items: [
          'Decisions operate at machine speed',
          'Context is continuous, not event-scoped',
          'Memory is explicit and relational',
          'Learning is embedded, not external',
          'Autonomy is bounded by policy',
          'Systems degrade gracefully under uncertainty',
        ],
      },
      {
        kind: 'image',
        src: '/images/whitepaper/layers.png',
        alt:
          'Decision pipeline layers: alert and telemetry sources through reasoning, context, graph, agentic mesh, learning loops, and human oversight',
      },
      {
        kind: 'image',
        src: '/images/whitepaper/layers3D.png',
        alt:
          'Isometric architecture: RAG tenant data sources, security graph, policy control plane, and agentic mesh with triage, analysis, mitigation, and communications agents',
      },
    ],
  },
  {
    id: 'architectural-overview',
    heading: '4. Architectural Overview',
    blocks: [
      {
        kind: 'p',
        text:
          'An AI-native SOC is not a collection of tools. It is a decision pipeline composed of reasoning, context, memory, execution, and learning layers, each isolated to reduce fragility.',
      },
      {
        kind: 'image',
        src: '/images/whitepaper/sequence.png',
        alt:
          'Nine-step decision sequence from alert ingestion through hypothesis, context, risk evaluation, autonomy gate with auto-execute or human approval paths, execution, logging, and learning update',
        width: 720,
        height: 1200,
      },
    ],
  },
  {
    id: 'decision-flow',
    heading: '5. Decision Flow: A Real Operational Trace',
    blocks: [
      {
        kind: 'p',
        text:
          'Consider a suspicious OAuth consent event on a privileged identity. The system forms a hypothesis, injects context, evaluates blast radius, applies autonomy rules, executes permitted actions, and records outcomes for learning, within seconds.',
      },
      { kind: 'strongLabel', text: 'Decision Trace:' },
      {
        kind: 'ol',
        items: [
          'Suspicious OAuth consent detected',
          'Context enriched (privilege level, historical access patterns, tenant risk posture)',
          'Blast radius computed via graph relationships',
          'Policy tier evaluated',
          'OAuth token revoked automatically',
          'Account suspension escalated for approval',
          'Full rationale logged for audit and learning',
        ],
      },
    ],
  },
  {
    id: 'agents',
    heading: '6. Agents as the Execution Primitive',
    blocks: [
      {
        kind: 'p',
        text:
          'Agents execute intent rather than paths. They operate independently, fail in isolation, and scale horizontally, avoiding the orchestration fragility inherent in workflow systems.',
      },
    ],
  },
  {
    id: 'memory-graph',
    heading: '7. Memory, Relationships, and Graph Reasoning',
    blocks: [
      {
        kind: 'p',
        text:
          'Security is relational. Graph-based memory enables temporal reasoning, blast-radius estimation, and campaign detection, capabilities that flat correlation cannot provide.',
      },
    ],
  },
  {
    id: 'learning',
    heading: '8. Learning as a Compounding System Property',
    blocks: [
      {
        kind: 'p',
        text:
          'Static systems decay. Learning systems compound. By feeding outcomes back into decision logic, AI-native SOCs improve accuracy and efficiency over time.',
      },
      {
        kind: 'image',
        src: '/images/whitepaper/learning.png',
        alt:
          'Learning feedback loop: decisions, actions, outcomes, feedback signals, and updated policies and models in a continuous cycle',
        width: 1200,
        height: 640,
      },
    ],
  },
  {
    id: 'governance',
    heading: '9. Governance, Control, and Trust Boundaries',
    blocks: [
      {
        kind: 'p',
        text:
          'Autonomy without governance is irresponsible. Control is enforced through policy-bounded actions, risk-tiered approvals, blast-radius constraints, and full auditability.',
      },
      {
        kind: 'image',
        src: '/images/whitepaper/ActionsCircle.png',
        alt:
          'Concentric autonomy model: fully autonomous actions at the core, approval-gated actions, human-only decisions, with policy-bounded, risk-tiered, and auditable controls',
        width: 960,
        height: 960,
      },
    ],
  },
  {
    id: 'cannot-retrofit',
    heading: '10. Why This Architecture Cannot Be Retrofitted',
    blocks: [
      {
        kind: 'p',
        text:
          'Workflow-centric architectures cannot be transformed into decision-centric systems through incremental enhancement. When decision authority is externalized to humans and playbooks, autonomy cannot compound.',
      },
      {
        kind: 'p',
        text: 'Architectural relocation, not augmentation, is required.',
      },
    ],
  },
  {
    id: 'closing',
    heading: 'Closing Perspective',
    blocks: [
      {
        kind: 'p',
        text:
          'The future SOC will not be defined by dashboards or headcount. It will be defined by systems that reason in context, act with restraint, learn continuously, and scale without humans as the bottleneck.',
      },
      {
        kind: 'p',
        text:
          '© SIRP. This whitepaper reflects the technical perspective of the author and is published for educational and architectural discussion.',
        variant: 'copyright',
      },
    ],
  },
]
