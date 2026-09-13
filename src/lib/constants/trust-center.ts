/* ─── Trust Center ───────────────────────────────────────── */

export const TRUST_CENTER_HERO = {
  eyebrow: 'TRUST CENTER',
  heading: 'Security, privacy and\nAI governance,',
  headingGradient: 'documented.',
  subhead: 'How we protect your data, what our AI is permitted to do, and where your data lives — backed by evidence, not adjectives.',
  badges: ['SOC 2 Type II', 'GDPR', 'Sovereign deployment', 'No external LLM'],
  meta: {
    issuedBy: 'SIRP Labs Inc.',
    version: '1.0 · 21 July 2026',
    contact: 'security@sirp.io',
  },
} as const

export type ComplianceStatus = 'evidenced' | 'in-progress' | 'not-claimed'

export type ComplianceRow = {
  name: string
  status: ComplianceStatus
  detail: string
}

export const COMPLIANCE_STATUS_LABEL: Record<ComplianceStatus, string> = {
  evidenced: 'Evidenced',
  'in-progress': 'In progress',
  'not-claimed': 'Not claimed',
}

export const TRUST_CENTER_OVERVIEW = {
  heading: 'Overview',
  body: 'OmniSense is an AI-native Security Operations platform for regulated, sovereign and critical-infrastructure environments. This page sets out our security, privacy and AI-governance posture in one place, so your security, procurement and data-protection teams can assess us without a questionnaire cycle. Where a capability is evidenced today, we say so; where it is in progress, we say that too.',
  rows: [
    {
      name: 'SOC 2 Type II',
      status: 'evidenced',
      detail: 'Security, Availability and Confidentiality. Unqualified opinion, no exceptions noted. Report available under NDA.',
    },
    {
      name: 'GDPR',
      status: 'evidenced',
      detail: 'Data Processing Agreement and Standard Contractual Clauses available; data-residency and retention controls.',
    },
    {
      name: 'Sovereign / in-country deployment',
      status: 'evidenced',
      detail: 'Regional deployment with in-boundary AI reasoning; air-gapped tier available.',
    },
    {
      name: 'ISO 27001',
      status: 'in-progress',
      detail: 'Aligned to the standard; certification engagement to be scoped.',
    },
    {
      name: 'Independent penetration testing',
      status: 'evidenced',
      detail: 'Performed quarterly by an independent third-party firm; findings remediated to defined SLA. The report itself is not released; cadence, scope and remediation practice can be discussed under NDA.',
    },
    {
      name: 'FedRAMP / IL5 / CMMC',
      status: 'not-claimed',
      detail: 'Not claimed.',
    },
  ] satisfies ComplianceRow[],
  callout: {
    label: 'On certifications',
    body: 'We do not market certifications we do not hold. Where we hold an attestation, we share the report itself under NDA — including the auditor’s test results, not just a logo.',
  },
} as const

export const TRUST_CENTER_ATTESTATION = {
  heading: 'The attestation',
  rows: [
    { field: 'Report', detail: 'System and Organization Controls (SOC 2) Type II' },
    { field: 'Auditor', detail: 'Accorp Partners CPA LLC (License PAC-FIRM-LIC-47383)' },
    { field: 'Examination period', detail: '1 March 2025 – 15 August 2025' },
    { field: 'Report issued', detail: '12 October 2025' },
    { field: 'Criteria', detail: 'Security · Availability · Confidentiality' },
    { field: 'Opinion', detail: 'Unqualified (clean): controls suitably designed and operating effectively throughout the period' },
    { field: 'Test results', detail: '“No exception noted” across the tested controls' },
    { field: 'Examined infrastructure', detail: 'Amazon Web Services and Microsoft Azure, United States regions. AWS and Azure are carved-out subservice organisations.' },
    { field: 'Availability', detail: 'Full report under NDA. A bridge letter covering the period since 16 August 2025 is available on request.' },
  ],
  callout: {
    label: 'Scope, stated precisely',
    body: 'The attestation covers the SIRP Labs control environment and the infrastructure described above. Deployments in other regions, including EU, KSA, Pakistan and air-gapped customer environments, operate under the same organisational control programme, but were not themselves inside the examined infrastructure boundary for that period. Extending audit scope to additional regions is planned for the next examination cycle. We would rather you read the report and find it matches what we told you.',
  },
} as const

export const TRUST_CENTER_AI_TRUST = {
  heading: 'AI trust',
  intro: 'Most trust centers answer SOC 2. Few answer the question that matters when the software makes decisions: what is your AI permitted to do without asking us?',
  reasoning: {
    heading: 'Where the reasoning runs',
    items: [
      {
        title: 'Sovereign and air-gapped deployments',
        body: 'All AI inference executes inside your boundary, on infrastructure you control. No external or third-party public LLM service is in the production reasoning path, and no security or customer data is transmitted to any model provider.',
      },
      {
        title: 'Cloud and hybrid deployments',
        body: 'Inference runs within your selected region. Where a third-party model provider is used, it is named in the sub-processor list with the data categories it receives.',
      },
    ],
  },
  callout: {
    label: 'Tenant-scoped learning',
    body: 'We do not train foundation models on your data. The platform adapts to your environment using your analysts’ own decisions and outcomes, and that learning never leaves your tenant. Cross-tenant intelligence, where enabled, shares derived insights only, never raw data, under privacy-preserving controls, and is disabled entirely in air-gapped deployments.',
  },
} as const

export const TRUST_CENTER_GOVERNANCE = {
  heading: 'AI governance controls',
  groups: [
    {
      heading: 'Autonomy is governed, and the limits are in code',
      items: [
        'Human oversight on consequential actions. The platform is a co-analyst, not an autopilot.',
        'Authority is enforced in application logic, not in model prompts. The reasoning cannot exceed the authority you grant it, and cannot argue its way past a control.',
        'Incident closure always requires a human decision. The system recommends; a person decides.',
        'You set the line. Configurable authority levels, from mandatory approval through to higher autonomy for defined low-risk action classes, with human override at all times.',
      ],
    },
    {
      heading: 'Every decision is reproducible',
      items: [
        'Evidence-grounded verdicts. Each verdict identifies the specific evidence and sources relied upon, and what was set aside, with a confidence score.',
        'Full decision trail from alert to action, retained and reviewable for internal audit and regulatory review.',
        'Release discipline. Changes are validated against a frozen regression set before release, so behaviour does not drift silently between versions.',
      ],
    },
  ],
  callout: {
    label: 'Regulatory alignment',
    body: 'The architecture is aligned to the principles emphasised for AI used in consequential settings (human oversight, traceability, logging, technical documentation and risk management), including the EU AI Act (obligations for general-purpose AI models with systemic risk enforceable 2 August 2026), NIS2 and DORA evidentiary needs, and sovereign frameworks such as the KSA NCA and Türkiye BDDK/KVKK regimes. We can support your own assessment with system documentation and decision-trail evidence.',
  },
} as const

export const TRUST_CENTER_DATA_RESIDENCY = {
  heading: 'Data residency and deployment',
  intro: 'You choose where your data lives and where the reasoning happens.',
  columns: ['Deployment model', 'Data residency', 'AI inference', 'External LLM'],
  rows: [
    { model: 'Cloud', residency: 'Selected sovereign region', inference: 'In-region', externalLlm: 'Named in sub-processors if used' },
    { model: 'Hybrid', residency: 'Customer environment + region', inference: 'In-region', externalLlm: 'Named in sub-processors if used' },
    { model: 'Sovereign / on-premises', residency: 'Customer data centre', inference: 'Inside customer boundary', externalLlm: 'None' },
    { model: 'Air-gapped', residency: 'Customer data centre, isolated', inference: 'Customer-hosted, isolated', externalLlm: 'None. Nothing leaves the boundary' },
  ],
  bullets: [
    'Regional deployments are available in the European Union (Microsoft Azure), Kingdom of Saudi Arabia (Oracle Cloud Infrastructure, Riyadh), United States (Amazon Web Services / Microsoft Azure / DigitalOcean) and Pakistan (Khazana). Air-gapped deployments run entirely on customer-owned infrastructure.',
    'Tenant isolation is structural. It is enforced at the data-access layer rather than by application-level filtering.',
    'Encryption in transit (TLS 1.2+) and at rest; credentials and secrets stored encrypted and segregated from application data.',
    'Per-request compliance controls govern logging verbosity, PII redaction level and data residency.',
    'Retention and deletion are configurable; data is returned or deleted on termination in accordance with the agreement.',
  ],
} as const

export const TRUST_CENTER_CONTROLS = {
  heading: 'Controls',
  intro: 'Grouped as assessed under the Trust Services Criteria. Full control-by-control detail is available under NDA.',
  groups: [
    {
      heading: 'Infrastructure security',
      items: [
        'Production environment access restricted and reviewed',
        'Unique authentication enforced for production databases',
        'Encryption key access restricted to authorised personnel',
        'Network segmentation with deny-by-default firewalls',
        'Multi-factor authentication enforced for engineering access',
        'Infrastructure time synchronisation (NTP)',
      ],
    },
    {
      heading: 'Organisational security',
      items: [
        'Employee background checks performed',
        'Security awareness training on hire and annually',
        'Policy acknowledgement on hire and annually',
        'Code of business conduct maintained and communicated',
        'Asset inventory maintained',
        'Documented disciplinary process for security violations',
      ],
    },
    {
      heading: 'Product security',
      items: [
        'Role-based access control on least privilege',
        'Tenant isolation enforced at the data-access layer',
        'Encryption in transit and at rest',
        'Secure development lifecycle with mandatory peer review',
        'Branch protection on protected repositories',
        'Dependency and secret scanning in the pipeline',
        'Quarterly external penetration testing by an independent third party',
      ],
    },
    {
      heading: 'Internal security procedures',
      items: [
        'Change management, authorised before production',
        'Documented incident response and escalation',
        'Vendor and sub-processor risk assessment',
        'Annual risk assessment and management review',
        'Business continuity and disaster recovery plans established',
        'Scheduled, encrypted backups with integrity verification',
        'Capacity and availability monitoring with alerting',
        'Logging, audit trail and periodic access reviews',
        'Vulnerability management with defined remediation service levels',
      ],
    },
    {
      heading: 'Data and privacy',
      items: [
        'Data classification policy established',
        'Data retention procedures established',
        'Customer data returned or deleted on termination',
        'Per-request PII redaction and residency controls',
      ],
    },
  ],
  callout: {
    label: 'Policy set',
    body: 'A documented information-security policy set is maintained, covering information security, access control, risk management, change management, incident management, encryption, data classification, retention, backup, business continuity, disaster recovery, vendor management, physical security, media disposal, endpoint security, password, acceptable use, vulnerability management and code of business conduct — with acknowledgement on hire and annually, managed through a continuous control-monitoring platform.',
  },
} as const

export const TRUST_CENTER_SUB_PROCESSORS = {
  heading: 'Sub-processors and data handling',
  infrastructure: {
    heading: 'Infrastructure sub-processors',
    columns: ['Sub-processor', 'Role', 'Region', 'Data'],
    rows: [
      { name: 'Amazon Web Services', role: 'Cloud infrastructure', region: 'United States', data: 'Platform and customer security data (US deployments)' },
      { name: 'Microsoft Azure', role: 'Cloud infrastructure', region: 'US / EU', data: 'Platform and customer security data (US and EU deployments)' },
      { name: 'Oracle Cloud Infrastructure', role: 'Cloud infrastructure', region: 'Saudi Arabia (Riyadh)', data: 'Platform and customer security data (KSA sovereign deployments)' },
      { name: 'Khazana', role: 'Cloud infrastructure', region: 'Pakistan', data: 'Platform and customer security data (Pakistan deployments)' },
      { name: 'DigitalOcean', role: 'Cloud infrastructure', region: 'United States', data: 'Platform workloads (US deployments)' },
    ],
  },
  corporate: {
    heading: 'Corporate sub-processors',
    columns: ['Sub-processor', 'Role', 'Region', 'Data'],
    rows: [
      { name: 'Sprinto', role: 'Continuous compliance monitoring', region: 'United States', data: 'Employee and policy-acknowledgement records; control evidence' },
      { name: 'Google Workspace', role: 'Email and collaboration', region: 'United States', data: 'SIRP Labs employee data; business correspondence' },
      { name: 'GitHub', role: 'Source code management and build', region: 'United States', data: 'Source code and build metadata; no customer security data' },
    ],
  },
  callout: {
    label: 'AI sub-processors',
    body: 'For sovereign and air-gapped deployments, no third-party model provider receives customer data, and therefore none appears as a sub-processor for AI inference. Where a model provider is used in a cloud deployment, it is named explicitly with the data categories it receives.',
  },
} as const

export const TRUST_CENTER_DATA_PROCESSED = {
  heading: 'Data we process',
  rows: [
    { category: 'Customer security telemetry', detail: 'Alerts, logs and events from the customer environment, which may contain personal data such as usernames, IP addresses and device identifiers.' },
    { category: 'Customer account data', detail: 'Names, business email addresses and role information for platform users.' },
    { category: 'Employee data', detail: 'Personal data of SIRP Labs personnel, processed for employment and access-control purposes.' },
  ],
} as const

export const TRUST_CENTER_FAQ = {
  heading: 'Frequently asked',
  items: [
    {
      question: 'Where does our data live?',
      answer: 'In the region you select. Sovereign, on-premises and air-gapped deployments keep all data inside your own boundary.',
    },
    {
      question: 'Is an external AI service ever in the reasoning path?',
      answer: 'Not in sovereign or air-gapped deployments. In cloud deployments, any model provider used is named in the sub-processor list.',
    },
    {
      question: 'Do you train on our data?',
      answer: 'We do not train foundation models on your data. Tenant-scoped learning never leaves your tenant.',
    },
    {
      question: 'What can the AI do without approval?',
      answer: 'Only what you authorise. Authority levels are configurable per action class and enforced in application logic; incident closure always requires a human.',
    },
    {
      question: 'How do we audit an autonomous decision?',
      answer: 'Every verdict cites the evidence and sources it relied upon with a confidence score, and the full decision trail from alert to action is retained.',
    },
    {
      question: 'Do you support SSO and MFA?',
      answer: 'Yes. Single sign-on with role-based access control, and multi-factor authentication.',
    },
    {
      question: 'What happens to our data at termination?',
      answer: 'Data is returned or deleted in accordance with the agreement, and retention periods are configurable during the term.',
    },
    {
      question: 'Can we run fully air-gapped?',
      answer: 'Yes. In that tier, nothing leaves your boundary and no sub-processor receives customer data.',
    },
  ],
} as const

export const TRUST_CENTER_CONTACT = {
  heading: 'Disclosure and contact',
  disclosure: {
    heading: 'Vulnerability disclosure',
    body: 'We welcome reports from security researchers and customers. We acknowledge reports on receipt, keep reporters updated through remediation, and do not pursue researchers acting in good faith. Vulnerabilities identified through our quarterly independent testing programme are remediated to defined service levels.',
  },
  contacts: [
    { purpose: 'Security and trust enquiries', email: 'security@sirp.io' },
    { purpose: 'Vulnerability disclosure', email: 'security@sirp.io' },
    { purpose: 'Data protection / privacy', email: 'privacy@sirp.io' },
    { purpose: 'Commercial', email: 'sales@sirp.io' },
  ],
  footnote: 'This page summarises SIRP Labs Inc.’s control posture at the date of issue. It is a summary and not a substitute for the SOC 2 Type II report, which is available under NDA. Posture is reviewed continuously and customers under contract are notified of material changes.',
} as const
