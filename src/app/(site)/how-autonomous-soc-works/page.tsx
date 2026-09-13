import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/PageHeader'
import { HowItWorksOverview } from '@/sections/how-autonomous-soc-works/HowItWorksOverview'
import { HowItWorksSteps } from '@/sections/how-autonomous-soc-works/HowItWorksSteps'
import { HowItWorksVideo } from '@/sections/how-autonomous-soc-works/HowItWorksVideo'
import { CtaSection } from '@/sections/home/CtaSection'
import { HOW_AUTONOMOUS_SOC_WORKS_DATA, CTA_DATA } from '@/lib/constants'
import './page.css'

export const metadata: Metadata = {
  title: 'How Autonomous SOC Works | AI-Driven Security Decision Flow',
  description: 'SIRP replaces the broken SOC process with a continuous decision system that ingests, reasons, governs, acts, and learns in real time.',
  alternates: { canonical: '/how-autonomous-soc-works' },
  openGraph: {
    url: '/how-autonomous-soc-works',
    type: 'article',
    title: 'How Autonomous SOC Works | SIRP',
    description: 'Five-stage AI decision loop: ingest, reason, govern, act, learn. How SIRP OmniSense operates end-to-end.',
  },
}

export default function HowAutonomousSocWorksPage() {
  const { badge, heading, headingItalic, description } = HOW_AUTONOMOUS_SOC_WORKS_DATA.hero

  return (
    <div className="how-autonomous-soc-works-page">
      <PageHeader
        showBottomBorder={false}
        badgeText={badge}
        heading={
          headingItalic ? (
            <>
              {heading}{' '}
              <em>{headingItalic}</em>
            </>
          ) : (
            heading
          )
        }
        subtext={description}
      />
      <HowItWorksOverview data={HOW_AUTONOMOUS_SOC_WORKS_DATA.overview} />
      <HowItWorksSteps data={HOW_AUTONOMOUS_SOC_WORKS_DATA.steps.slice(0, 5)} />
      <HowItWorksVideo videoId="VIeVs8nbM6U" />
      <HowItWorksSteps
        data={HOW_AUTONOMOUS_SOC_WORKS_DATA.steps.slice(5)}
        sectionClassName="!pb-20 md:!pb-28 lg:!pb-36"
      />
      <CtaSection data={CTA_DATA} />
    </div>
  )
}
