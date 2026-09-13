import type { Metadata } from 'next'
import { DefinitionHero } from '@/sections/what-is-autonomous-soc/DefinitionHero'
import { ProblemSection } from '@/sections/what-is-autonomous-soc/ProblemSection'
import { HowItWorksSection } from '@/sections/what-is-autonomous-soc/HowItWorksSection'
import { BenefitsSection } from '@/sections/what-is-autonomous-soc/BenefitsSection'
import { HumanMachineSection } from '@/sections/what-is-autonomous-soc/HumanMachineSection'
import { SafetySection } from '@/sections/what-is-autonomous-soc/SafetySection'
import { ComparisonTableSection } from '@/sections/what-is-autonomous-soc/ComparisonTableSection'
import { AssistiveVsAutonomousDivider } from '@/sections/what-is-autonomous-soc/AssistiveVsAutonomousDivider'
import { ClosingCtaSection } from '@/sections/what-is-autonomous-soc/ClosingCtaSection'
import { JsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'What Is an Autonomous SOC?',
  description: 'An Autonomous SOC uses AI to independently detect, investigate, and respond to incidents within governance boundaries: no playbooks, no manual routing, no analyst bottleneck.',
  alternates: { canonical: '/what-is-autonomous-soc' },
  openGraph: {
    url: '/what-is-autonomous-soc',
    type: 'article',
    title: 'What Is an Autonomous SOC? | SIRP',
    description: 'The definitive guide to autonomous security operations: architecture, decision flows, governance, and why traditional SOC models no longer scale.',
  },
}

import {
  SITE_URL,
  WHAT_IS_AUTONOMOUS_SOC_BENEFITS,
  WHAT_IS_AUTONOMOUS_SOC_CLOSING_CTA,
  WHAT_IS_AUTONOMOUS_SOC_COMPARISON,
  WHAT_IS_AUTONOMOUS_SOC_DIVIDER,
  WHAT_IS_AUTONOMOUS_SOC_FAQ,
  WHAT_IS_AUTONOMOUS_SOC_HEADER,
  WHAT_IS_AUTONOMOUS_SOC_HERO,
  WHAT_IS_AUTONOMOUS_SOC_HOW_IT_WORKS,
  WHAT_IS_AUTONOMOUS_SOC_LOOP,
  WHAT_IS_AUTONOMOUS_SOC_PROBLEM,
  WHAT_IS_AUTONOMOUS_SOC_RIGHT_BALANCE,
  WHAT_IS_AUTONOMOUS_SOC_SAFETY,
} from '@/lib/constants'

export default function Page() {
  const { heading, subtext } = WHAT_IS_AUTONOMOUS_SOC_HEADER
  const howItWorks = WHAT_IS_AUTONOMOUS_SOC_HOW_IT_WORKS
  const benefits = WHAT_IS_AUTONOMOUS_SOC_BENEFITS
  const rightBalance = WHAT_IS_AUTONOMOUS_SOC_RIGHT_BALANCE
  const safety = WHAT_IS_AUTONOMOUS_SOC_SAFETY
  const comparison = WHAT_IS_AUTONOMOUS_SOC_COMPARISON

  return (
    <div className="what-is-autonomous-soc-page">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: WHAT_IS_AUTONOMOUS_SOC_FAQ.items.map((item) => ({
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
          '@type': 'DefinedTerm',
          name: 'Autonomous SOC',
          description: subtext.paragraph1,
          inDefinedTermSet: `${SITE_URL}/glossary`,
        }}
      />
      <DefinitionHero
        heading={heading}
        definition={subtext.paragraph1}
        supporting={[subtext.paragraph2, subtext.paragraph3]}
        data={WHAT_IS_AUTONOMOUS_SOC_HERO}
      />

      <ProblemSection data={WHAT_IS_AUTONOMOUS_SOC_PROBLEM} />

      <HowItWorksSection
        heading={howItWorks.heading}
        intro={howItWorks.intro}
        data={WHAT_IS_AUTONOMOUS_SOC_LOOP}
      />

      <AssistiveVsAutonomousDivider data={WHAT_IS_AUTONOMOUS_SOC_DIVIDER} />

      <BenefitsSection data={benefits} />

      <HumanMachineSection data={rightBalance} />
      <SafetySection data={safety} />
      <ComparisonTableSection data={comparison} />
      <ClosingCtaSection data={WHAT_IS_AUTONOMOUS_SOC_CLOSING_CTA} />
    </div>
  )
}
