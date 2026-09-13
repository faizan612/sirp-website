export const buyersGuideContent = {
  meta: {
    title: "Buyer's Guide: How to Evaluate an Autonomous SOC or SOAR Platform | SIRP",
    description:
      'An eight-point scorecard for evaluating any Autonomous SOC or SOAR platform — the questions to ask, what a weak answer sounds like, and what a strong one does.',
  },
  hero: {
    eyebrow: "Buyer's guide",
    headline: "Evaluate this the way you'd evaluate anyone.",
    lead: 'A scorecard for judging any Autonomous SOC or SOAR platform, including this one. Built from the questions real buyers ask before they sign, not the ones vendors want asked.',
    primaryCta: { label: 'Download the scorecard', href: '#download' },
    secondaryCta: { label: 'Read it on this page', href: '#scorecard' },
    meta: [
      { label: 'Read time', value: '7 minutes' },
      { label: 'Format', value: '8-point scorecard' },
      { label: 'Built for', value: 'RFPs & self-serve evaluation' },
    ],
  },
  classify: {
    eyebrow: 'Step 1',
    heading: "First, know what category you're actually buying",
    lead: "Most evaluations conflate three different things. Sort your need before you score a vendor against criteria that don't apply to its category.",
    cards: [
      {
        tag: 'Orchestration',
        title: 'SOAR',
        body: 'Automates predefined workflows across your tools. Good at repeatable enrichment, bounded by the workflow you wrote in advance.',
        active: false,
      },
      {
        tag: 'Detection',
        title: 'SIEM / XDR',
        body: "Surfaces the alert. Doesn't decide what to do about it, or execute anything on its own.",
        active: false,
      },
      {
        tag: 'Decision system',
        title: 'Autonomous SOC',
        body: 'Computes risk continuously and executes response within policy boundaries. What this guide is built to evaluate.',
        active: true,
      },
    ],
  },
  scorecard: {
    eyebrow: 'Step 2 — the scorecard',
    heading: 'Eight questions worth asking any finalist',
    lead: 'Ask each vendor these directly. The gap between a weak and strong answer is usually where the architecture actually lives.',
    rows: [
      {
        num: '01',
        title: 'Decision latency',
        ask: 'Does it re-evaluate risk as new telemetry arrives mid-response, or only at trigger time?',
        weak: '"Our playbooks already cover that scenario."',
        strong: 'Risk score updates continuously; execution path can change mid-incident.',
      },
      {
        num: '02',
        title: 'Governance model',
        ask: "How does the system express confidence before acting autonomously? What's captured per decision, not just per action?",
        weak: 'An action log with timestamps.',
        strong: 'A reasoning trail: inputs, policy check, confidence threshold, outcome.',
      },
      {
        num: '03',
        title: 'Integration cost curve',
        ask: 'What does the 40th integration cost relative to the 4th?',
        weak: 'Every integration is a new set of playbook branches to maintain.',
        strong: 'Cost is bounded by the context model, not by branch count.',
      },
      {
        num: '04',
        title: 'Learning loop',
        ask: 'Does a closed incident change how the next similar alert is scored — automatically?',
        weak: 'Someone has to manually edit a playbook or detection rule.',
        strong: 'Outcome feeds back into the decision model without manual edits.',
      },
      {
        num: '05',
        title: 'Data residency & deployment',
        ask: 'Where does data actually live, and can that be constrained by region?',
        weak: '"We\'re compliant" with no region-level detail.',
        strong: 'Named in-region deployment options, stated plainly.',
      },
      {
        num: '06',
        title: 'Implementation ownership',
        ask: 'Who does the integration work — the vendor or your team? What does week one look like?',
        weak: 'A generic onboarding deck.',
        strong: 'A named plan with owners and dates for week one.',
      },
      {
        num: '07',
        title: 'Commercial model',
        ask: 'Priced per seat, per asset, per integration, or per incident? What breaks the model as you scale?',
        weak: '"We\'ll figure out pricing once we know your environment."',
        strong: 'A clear model with a stated scaling assumption.',
      },
      {
        num: '08',
        title: 'References',
        ask: 'Can I speak to a reference in a similar environment — industry, scale, region?',
        weak: 'Any reference they have on hand.',
        strong: 'A reference matched to your actual environment.',
      },
    ],
  },
  omniSenseScores: {
    eyebrow: 'Step 3',
    heading: 'Where OmniSense lands on each line',
    lead: 'Stated plainly, in the same order as the scorecard above.',
    rows: [
      {
        label: '01 Decision latency',
        answer: 'Risk is recomputed continuously by the Planner, not fixed at trigger time.',
        checked: true,
      },
      {
        label: '02 Governance',
        answer: 'Every autonomous action carries a full reasoning trail: inputs, policy check, confidence, outcome.',
        checked: true,
      },
      {
        label: '03 Integration cost',
        answer: 'Cost scales with the context model, not with playbook branches — bounded, not linear.',
        checked: true,
      },
      {
        label: '04 Learning loop',
        answer: 'Resolved incidents feed S3 risk scoring (findings → assets → org) without manual playbook edits.',
        checked: true,
      },
      {
        label: '05 Data residency',
        answer: 'In-region deployment options exist, including configurations built for KSA/SDAIA residency requirements.',
        checked: true,
      },
      {
        label: '06 Implementation',
        answer: 'A named week-one plan, owned jointly with your team — not a generic onboarding deck.',
        checked: true,
      },
      {
        label: '07 Commercial model',
        // Intentionally false — "ask us directly" rather than a claimed checkmark.
        // Do not flip to true without an actual statable pricing model.
        answer: 'Ask us directly — pricing depends on environment scope, stated plainly on a call, not hidden pending discovery.',
        checked: false,
      },
      {
        label: '08 References',
        answer: 'Matched by industry, scale, and region on request.',
        checked: true,
      },
    ],
  },
  download: {
    eyebrow: 'Take it with you',
    heading: 'Get the scorecard as a document',
    lead: 'A clean, portable version you can drop straight into an RFP or circulate to your evaluation committee.',
    title: "Buyer's guide, PDF",
    body: 'Same eight criteria, formatted for procurement. No pitch inside — just the scorecard.',
  },
  faq: {
    heading: 'Questions about this guide',
    items: [
      {
        question: "What's the difference between an RFP and this scorecard?",
        answer: 'This is a starting point — every question here can be dropped straight into an RFP document as-is.',
      },
      {
        question: 'How long does a typical evaluation take?',
        answer:
          'Most teams run a phased evaluation alongside their existing SOAR before shifting containment classes over — see the migration path in the SOAR vs Autonomous SOC guide.',
      },
      {
        question: 'Do you provide reference calls?',
        answer: 'Yes, matched to your industry, scale, and region on request.',
      },
    ],
  },
} as const
