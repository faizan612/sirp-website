export const OMNISENSE_PAGE_DATA = {
  particleHero: {
    eyebrow: 'OMNISENSE PLATFORM',
    headline: 'The engine that runs the autonomous SOC.',
    body: 'Planner, Governor, Executor, and a mesh of specialist agents. OmniSense investigates every alert end to end and closes it, with every action checked against your policy by code that sits outside the model.',
    primaryCta: { label: 'Watch it close a case', href: '#case-walkthrough' },
    secondaryCta: { label: 'Read the architecture', href: '/how-autonomous-soc-works' },
  },
  platform: {
    badge:         'The 5 pillars of OmniSense',
    heading:       'Five pillars.',
    headingItalic: 'One',
    headingSuffix: 'engine.',
    tabs: [
      {
        id:          'omnisense-core',
        label:       'Adaptive Orchestrator',
        title:       'Adaptive Orchestrator',
        description: 'The coordination layer. It plans the response to what\'s actually in front of it, runs it through what you already have, and decides what needs a human before anything closes. Every other pillar plugs into this loop.',
        handoff:     'Here\'s how it decides →',
        image:       '/images/omnisense/omnisense-core.png',
      },
      {
        id:          'omnisec-llm',
        label:       'OmniSec LLM',
        title:       'OmniSec LLM',
        description: 'The reasoning engine behind every judgment call. It reads the case the way a senior analyst would, and every other pillar routes through it before a decision gets made.',
        image:       '/images/omnisense/omnisec-llm.png',
      },
      {
        id:          'omnimap-rag',
        label:       'OmniMap + RAG',
        title:       'OmniMap + RAG',
        description: 'The knowledge graph. It holds your assets, your history, and your environment, so every plan is built on what\'s actually true of your network, not a generic playbook.',
        image:       '/images/omnisense/omnimap-rag.png',
      },
      {
        id:          'omniflex',
        label:       'OmniFlex',
        title:       'OmniFlex',
        description: 'Learns from your analysts, not someone else\'s. Every outcome your team confirms sharpens the next recommendation, tuned to your environment alone.',
        image:       '/images/omnisense/omniflex.png',
      },
      {
        id:          'omnicollective',
        label:       'OmniCollective',
        title:       'OmniCollective',
        description: 'Privacy-preserving learning across every tenant on OmniSense. What one SOC discovers strengthens the pattern for all of them, without your data ever leaving your environment.',
        image:       '/images/omnisense/omnicollective.png',
      },
    ],
  },
  agents: {
    heading:     'Agents in the mesh',
    description: "OmniSense's autonomous SOC agents in the mesh accelerate alert containment, optimizing security operations with faster incident analysis, remediation, and response.",
    // Order matches the eight mesh slots in the Figma frame, read top-to-bottom,
    // left-to-right. OmnisenseAgents pins each item to its slot by index.
    items: [
      {
        title:       'Analysis Agent',
        description: 'The Analysis Agent analyzes alerts to identify patterns, behaviors, and trends. It examines alert data and context, highlighting anomalous activities and key indicators, aiding the analyst in setting to quicker threat detection.',
      },
      {
        title:       'Classification Agent',
        description: 'The Classification Agent categorizes incoming alerts based on type (e.g., phishing, malware, insider threat). This helps in efficient triaging and routing of the alerts for appropriate action.',
      },
      {
        title:       'Header Analyst Agent',
        description: 'Analysis email headers to detect spoofing, relay abuse, sender mismatches and anomalous routing, enhancing phishing detection, sender trust scoring and automated triage.',
      },
      {
        title:       'Enrichment Agent',
        description: 'The Enrichment Agent gathers external threat intelligence, asset data, and historical context to add depth to incoming alerts. It ensures that each alert is enriched with relevant details for better analysis and decision-making.',
      },
      {
        title:       'Pre Processor Agent',
        description: 'Processes and normalizes raw alerts by extracting key entities and context for downstream triage and enrichment.',
      },
      {
        title:       'Suggest Playbook Agent',
        description: 'The Suggest Playbook Agent proposes relevant playbooks to follow based on the nature of the incident. It helps in ensuring that the right procedures are applied, aligning actions with pre-configured, best-practice response procedures.',
      },
      {
        title:       'Assign Analyst Agent',
        description: 'The Assign Analyst Agent automatically assigns alerts to available analysts based on their expertise and workload. This optimizes resource allocation, ensuring that the right person handles the right incident.',
      },
      {
        title:       'Suggest Actions Agent',
        description: 'The Suggested Actions Agent proposes targeted response steps based on alert context and severity, providing analysts with timely and appropriate responses to threats.',
      },
    ],
  },
  sara: {
    badge:       'Sara Assistant',
    heading:     'Meet Sara, your always evolving security analyst',
    // Figma repeats the agents lede verbatim here; kept as designed.
    description: "OmniSense's autonomous SOC agents in the mesh accelerate alert containment, optimizing security operations with faster incident analysis, remediation, and response.",
    media: { src: '/video/sara-assistant.mp4' },
  },
  action: {
    heading: 'See Autonomous SOC in Action',
    description: 'Watch how SIRP ingests a live alert, constructs relational context, computes risk, enforces policy boundaries, and executes containment actions autonomously — without manual routing or workflow delays.',
    note1: 'This is not playbook automation.',
    note2: 'This is governed decision execution.',
    videoId: 'VIeVs8nbM6U',
  },
} as const
