/* ─── Homepage Stats (legacy) ────────────────────────────── */
export const HOMEPAGE_STATS = [
  { value: '95%', label: 'Reduction in MTTR' },
  { value: '10x', label: 'Analyst efficiency' },
  { value: '<2min', label: 'Mean time to detect' },
  { value: '99.9%', label: 'Platform uptime' },
] as const

/* Hero copy lives in @/content/home/hero — see HeroSection.tsx. */

/* ─── How it works + Results (merged) ────────────────────────
 * Share of alerts OmniSense resolves without a human. Single source of
 * truth for the "90% autonomous actions" stat and the dot field's
 * investigatedRatio in HowItWorksResultsSection — keep the two in
 * lockstep, don't hardcode the ratio a second time. */
export const AUTONOMY_RATE = 0.9

export const STATS_DATA = {
  demoHref: '/contact',
  stats: [
    { value: '80', label: 'reduction in MTTD' },
    { value: '70', label: 'faster MTTR' },
    { value: '90', label: 'resolved autonomously' },
  ],
} as const

/* ─── Autonomous Section ─────────────────────────────────── */
export const AUTONOMOUS_DATA = {
  pill: '✦ Autonomous SOC',
  heading: 'Truly autonomous',
  headingItalic: 'autonomous',
  subheading: 'SOC that actually thinks for itself',
  description: 'From overwhelming alert floods to prioritized incidents and automated response, OmniSense streamlines the entire journey without slowing you down.',
  videoSrc: '/videos/Home-Feature.mp4',
} as const

/* ─── Features Section ───────────────────────────────────── */
export const FEATURES_DATA = {
  pill: 'AI-Driven Autonomous SOC Features',
  heading: 'The future of operations is here and it\'s',
  headingItalic: 'self-learning',
  features: [
    {
      id: 'thinks',
      title: 'Security that thinks for itself',
      description: 'Not just AI-enabled, we\'re AI-native. OmniSense doesn\'t only assist, it decides. Multi-agent orchestration + proprietary models give you a SOC that learns, adapts, and defends in real time.',
      image: '/images/image 581.png',
      textTop: false,
    },
    {
      id: 'enrichment',
      title: 'Enrichment that thinks ahead',
      description: 'No manual tab-hopping, no wasted minutes. The Enrichment Agent automatically pulls data from VirusTotal, WHOIS, AbuseIPDB, GreyNoise, and more — then explains why it matters in plain language.',
      image: '/images/image 582.png',
      textTop: true,
    },
    {
      id: 'omnimap',
      title: "Your SOC's living graph",
      description: 'OmniMap reveals the relationships behind every incident. Assets, IOCs, vulnerabilities, and user activity are stitched together into a living graph, giving you and your agents the context needed to act decisively.',
      image: '/images/image 583.png',
      textTop: false,
    },
    {
      id: 'sara',
      title: 'Security at your command',
      description: 'Chat with Sara and get instant insights on your queries seamlessly, from anywhere in the app.',
      image: '/images/features/features4.png',
      textTop: true,
    },
  ],
} as const

/* ─── Intelligence Section ───────────────────────────────── */
export const INTELLIGENCE_DATA = {
  heading: 'OmniSense™ in motion',
  description: 'Every connected source lands in one stream. OmniSense correlates, triages, and closes what it can under your policy, then hands the rest to an analyst with the investigation already done.',
  videoSrc: '/video/Home-Feature.mp4',
} as const

/* ─── Sara Section ───────────────────────────────────────── */
export const SARA_DATA = {
  heading: 'Meet Sara, your',
  headingItalic: 'always evolving',
  headingSuffix: 'security analyst',
  description: 'Sara is the voice of your SOC\'s intelligence. She connects your team to OmniSense™, translating the power of agents, LLMs, and your environment into clarity, insight, and decisive action.',
  image: '/images/sara/sara.png',
  imageAlt: 'Sara — SIRP AI Security Analyst',
  learnMoreHref: 'https://sara-open.sirp.io/',
  learnMoreLabel: 'Learn more',
} as const

/* ─── Integrations Section ───────────────────────────────── */
export const INTEGRATIONS_DATA = {
  pill: 'Integrations',
  heading: 'Every connection is something OmniSense can act on.',
  headingItalic: '',
  headingSuffix: '',
  description:
    'OmniSense connects to the SIEM, endpoint, identity, and ticketing tools your SOC already runs. Each connection becomes an action agents can take, governed by the same policy you set for everything else. When something in your environment is not in the catalog, you build the integration yourself against the open integration framework, and it arrives under the same policy model as the rest. Air-gapped deployments included.',
  logos: Array.from({ length: 16 }, (_, i) => ({
    name: `Integration ${i + 2}`,
    src: `/images/integrations/logo-${i + 2}.svg`,
  })),
} as const

/* ─── CTA Section ────────────────────────────────────────── */
export const CTA_DATA = {
  heading: 'Watch your Autonomous SOC drive',
  headingItalic: 'itself',
  primaryBtn: { label: 'What is Autonomous SOC?', href: '/what-is-autonomous-soc' },
  secondaryBtn: { label: 'Learn More', href: '/how-autonomous-soc-works' },
} as const
