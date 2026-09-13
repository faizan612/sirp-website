import type { Metadata } from 'next'
import { Hero } from '@/sections/buyers-guide/Hero'
import { ClassifyCards } from '@/sections/buyers-guide/ClassifyCards'
import { Scorecard } from '@/sections/buyers-guide/Scorecard'
import { ScoreGrid } from '@/sections/buyers-guide/ScoreGrid'
import { DownloadSection } from '@/sections/buyers-guide/DownloadSection'
import { FaqAccordionSection } from '@/components/shared/FaqAccordionSection'
import { JsonLd } from '@/components/seo/JsonLd'
import { SITE_URL } from '@/lib/constants'
import { buyersGuideContent } from './content'
import './page.css'

export const metadata: Metadata = {
  title: buyersGuideContent.meta.title,
  description: buyersGuideContent.meta.description,
  alternates: { canonical: '/buyers-guide' },
  openGraph: {
    url: '/buyers-guide',
    type: 'article',
    title: buyersGuideContent.meta.title,
    description: buyersGuideContent.meta.description,
  },
}

export default function BuyersGuidePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: buyersGuideContent.faq.items.map((item) => ({
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
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: "Buyer's Guide", item: `${SITE_URL}/buyers-guide` },
          ],
        }}
      />

      <div className="buyers-guide-page">
        <Hero data={buyersGuideContent.hero} />
        <ClassifyCards data={buyersGuideContent.classify} />
        <Scorecard data={buyersGuideContent.scorecard} />
        <ScoreGrid data={buyersGuideContent.omniSenseScores} />
        <DownloadSection data={buyersGuideContent.download} />
        <FaqAccordionSection data={buyersGuideContent.faq} />
      </div>
    </>
  )
}
