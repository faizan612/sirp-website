import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { OurStoryHero } from '@/sections/our-story/OurStoryHero'
import { OurStoryNarrative } from '@/sections/our-story/OurStoryNarrative'
import { OurStoryValues } from '@/sections/our-story/OurStoryValues'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'Why SIRP built OmniSense: an autonomous SOC platform that investigates and closes cases the way a senior analyst would, with governance built in.',
  alternates: { canonical: '/our-story' },
  openGraph: {
    url: '/our-story',
    type: 'website',
    title: 'Our Story | SIRP',
    description:
      'Why SIRP built OmniSense: an autonomous SOC platform that investigates and closes cases the way a senior analyst would, with governance built in.',
  },
}

export default function OurStoryPage() {
  return (
    <div className="our-story-page">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${SITE_URL}/our-story`,
          name: 'Our Story',
          url: `${SITE_URL}/our-story`,
          isPartOf: { '@id': `${SITE_URL}/#website` },
        }}
      />

      <OurStoryHero />
      <OurStoryNarrative />
      <OurStoryValues />
    </div>
  )
}
