import type { JSONContent } from '@tiptap/react'
import { verifySession } from '@/lib/auth/dal'
import { PageRenderer } from '@/lib/pagebuilder/BlockRenderer'
import type { BlockInstance } from '@/lib/pagebuilder/types'

export const dynamic = 'force-dynamic'

// Throwaway preview route — renders one instance of every registered block
// type, in a plausible landing-page order, so the blocks can be eyeballed
// together without going through the admin editor. Safe to delete.
export const metadata = { robots: { index: false, follow: false } }

const ctaPill: JSONContent = {
  type: 'doc',
  content: [{ type: 'paragraph', content: [{ type: 'text', text: 'All blocks, one page', marks: [{ type: 'bold' }] }] }],
}

const ctaHeading: JSONContent = {
  type: 'doc',
  content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Ready to build your own?' }] }],
}

const ALL_BLOCKS: BlockInstance[] = [
  {
    id: 'block-hero',
    type: 'hero-section',
    schemaVersion: 1,
    props: { heading: 'See every block in one place' },
  },
  {
    id: 'block-stats',
    type: 'stats-section',
    schemaVersion: 1,
    props: {
      pill: 'Results',
      heading: 'Results backed by',
      headingItalic: 'intelligent',
      headingSuffix: 'automation',
      subheading: 'A quick tour of every marketing block the page builder supports.',
      learnMoreHref: '/contact',
      stats: [
        { value: '95', label: 'Reduction in MTTR', gradient: 'linear-gradient(90deg, #8e2dff 0%, #ffffff 100%)', icon: { src: '/globe.svg', alt: '' } },
        { value: '10', label: 'Analyst efficiency', gradient: 'linear-gradient(90deg, #8e2dff 0%, #ffffff 100%)', icon: { src: '/globe.svg', alt: '' } },
        { value: '99.9', label: 'Platform uptime', gradient: 'linear-gradient(90deg, #8e2dff 0%, #ffffff 100%)', icon: { src: '/globe.svg', alt: '' } },
      ],
    },
  },
  {
    id: 'block-features',
    type: 'features-section',
    schemaVersion: 1,
    props: {
      pill: 'Features',
      heading: 'What makes it different',
      headingItalic: '',
      features: [
        {
          id: 'feature-1',
          title: 'Security that thinks for itself',
          description: 'Multi-agent orchestration decides, not just assists.',
          image: { src: '/globe.svg', alt: '' },
          textTop: false,
        },
        {
          id: 'feature-2',
          title: 'Enrichment that thinks ahead',
          description: 'Pulls context from VirusTotal, WHOIS, and AbuseIPDB automatically.',
          image: { src: '/globe.svg', alt: '' },
          textTop: true,
        },
      ],
    },
  },
  {
    id: 'block-integrations',
    type: 'integrations-section',
    schemaVersion: 1,
    props: {
      pill: 'Integrations',
      heading: 'Every tool.',
      headingItalic: 'One',
      headingSuffix: 'intelligence.',
      description: 'Connect 200+ tools into a single AI-native brain.',
      logos: [
        { name: 'Slack', image: { src: '/globe.svg', alt: 'Slack' } },
        { name: 'Splunk', image: { src: '/globe.svg', alt: 'Splunk' } },
        { name: 'CrowdStrike', image: { src: '/globe.svg', alt: 'CrowdStrike' } },
      ],
    },
  },
  {
    id: 'block-faq',
    type: 'faq-accordion',
    schemaVersion: 1,
    props: {
      heading: 'Frequently asked questions',
      items: [
        {
          question: 'Is this real content?',
          answer: 'No — this is sample copy used to preview every block type together on one page.',
        },
        {
          question: 'Can I edit each block?',
          answer: 'Yes, every field here maps to the same form fields available in the page editor.',
        },
      ],
      defaultOpenIndex: 0,
    },
  },
  {
    id: 'block-cta',
    type: 'cta-section',
    schemaVersion: 1,
    props: {
      pill: ctaPill,
      pillShowSparkle: true,
      heading: ctaHeading,
      description: 'Every section above is a real, editable block — this is what composing them looks like.',
      disclaimer: 'Sample page for preview purposes.',
      primaryBtn: { label: 'Open the page builder', href: '/admin/pages' },
      secondaryBtn: { label: 'Back to CMS', href: '/admin' },
    },
  },
  {
    id: 'block-final-cta',
    type: 'final-cta-section',
    schemaVersion: 1,
    props: {
      heading: 'Watch your Autonomous SOC',
      headingItalic: 'drive',
      headingSuffix: 'itself',
      body: 'Every block on this page is available in the editor — mix and match to build your own campaign.',
      primaryBtn: { label: 'Get a demo', href: '/contact' },
      secondaryBtn: { label: 'Learn more', href: '/contact' },
    },
  },
]

export default async function PageBuilderTestRoute() {
  await verifySession() // admin-only, same gate as every /admin/* page

  return (
    <div>
      <div style={{ padding: '0.75rem 1.5rem', background: '#3a1f5c', color: '#fff', fontSize: '0.85rem' }}>
        Throwaway preview route — /pagebuilder-test. One instance of every registered block, in order. Safe to delete.
      </div>
      <PageRenderer blocks={ALL_BLOCKS} />
    </div>
  )
}
