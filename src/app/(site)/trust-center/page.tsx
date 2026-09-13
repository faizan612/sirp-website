import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { TrustCenterHero } from '@/sections/trust-center/TrustCenterHero'
import { TrustCenterOverview } from '@/sections/trust-center/TrustCenterOverview'
import { TrustCenterAttestation } from '@/sections/trust-center/TrustCenterAttestation'
import { TrustCenterAiTrust } from '@/sections/trust-center/TrustCenterAiTrust'
import { TrustCenterGovernance } from '@/sections/trust-center/TrustCenterGovernance'
import { TrustCenterDataResidency } from '@/sections/trust-center/TrustCenterDataResidency'
import { TrustCenterControls } from '@/sections/trust-center/TrustCenterControls'
import { TrustCenterSubProcessors } from '@/sections/trust-center/TrustCenterSubProcessors'
import { TrustCenterFaq } from '@/sections/trust-center/TrustCenterFaq'
import { TrustCenterContact } from '@/sections/trust-center/TrustCenterContact'
import { CtaSection } from '@/sections/home/CtaSection'
import { SITE_URL, TRUST_CENTER_FAQ } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Trust Center',
  description: 'How OmniSense protects your data, what our AI is permitted to do, and where your data lives — SOC 2 Type II, GDPR, sovereign deployment and AI governance controls, documented.',
  alternates: { canonical: '/trust-center' },
  openGraph: {
    url: '/trust-center',
    type: 'website',
    title: 'Trust Center | SIRP',
    description: 'Security, privacy and AI governance, documented — backed by evidence, not adjectives.',
  },
}

export default function TrustCenterPage() {
  return (
    <div className="trust-center-page">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: TRUST_CENTER_FAQ.items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${SITE_URL}/trust-center`,
          name: 'Trust Center',
          url: `${SITE_URL}/trust-center`,
          isPartOf: { '@id': `${SITE_URL}/#website` },
        }}
      />

      <TrustCenterHero />
      <TrustCenterOverview />
      <TrustCenterAttestation />
      <TrustCenterAiTrust />
      <TrustCenterGovernance />
      <TrustCenterDataResidency />
      <TrustCenterControls />
      <TrustCenterSubProcessors />
      <TrustCenterFaq />
      <TrustCenterContact />

      <div className="relative overflow-x-hidden overflow-y-visible isolate">
        <CtaSection
          data={{ primaryBtn: { label: 'Talk to security', href: '/contact' } }}
          heading={
            <>
              Questions we haven&apos;t{' '}
              <em className="cta-heading-serif">answered here?</em>
            </>
          }
          description="Full SOC 2 report, DPA, sub-processor detail and pen-test cadence — available under NDA."
        />
      </div>
    </div>
  )
}
