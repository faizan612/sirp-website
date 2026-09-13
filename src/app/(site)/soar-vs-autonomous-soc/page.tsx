import type { Metadata } from 'next'
import Link from 'next/link'
import { InfoCtaBlock } from '@/components/shared/InfoCtaBlock'
import { Button } from '@/components/shared/Button'
import { PageHeader } from '@/components/layout/PageHeader'
import { SectionLead } from '@/components/shared/SectionLead'
import { BlackGradientCard } from '@/components/shared/BlackGradientCard'
import { SplitInfoCtaImage } from '@/components/shared/SplitInfoCtaImage'
import { AutonomousSocBenefitsSection } from '@/components/shared/AutonomousSocBenefitsSection'
import { AutonomousSocComparisonSection } from '@/components/shared/AutonomousSocComparisonSection'
import { FaqAccordionSection } from '@/components/shared/FaqAccordionSection'
import { CtaSection } from '@/sections/home/CtaSection'
import { JsonLd } from '@/components/seo/JsonLd'
import { SITE_URL } from '@/lib/constants'
import './page.css'
import {
  SOAR_VS_ARCHITECTURAL_DIFFERENCE,
  SOAR_VS_COMPARISON_TABLE,
  SOAR_VS_WHEN_SOAR_SUFFICIENT,
  SOAR_VS_WHEN_AUTONOMOUS_SOC_NEEDED,
  SOAR_VS_NEXT_GEN_SOAR,
  SOAR_VS_MIGRATION_CONSIDERATIONS,
  SOAR_VS_ARCHITECTURE_AUTHORITY,
  SOAR_VS_AUTONOMOUS_SOC_HEADER,
  SOAR_VS_AUTONOMOUS_SOC_METADATA,
  SOAR_VS_WHAT_IS_AUTONOMOUS_SOC,
  SOAR_VS_WHAT_IS_SOAR,
  SOAR_VS_MECHANISM_FAILURES,
  SOAR_VS_WHAT_OMNISENSE_DOES,
  SOAR_VS_FAQ,
  SOAR_VS_CTA,
} from '@/lib/constants'

export const metadata: Metadata = {
  title: SOAR_VS_AUTONOMOUS_SOC_METADATA.title,
  description: SOAR_VS_AUTONOMOUS_SOC_METADATA.description,
  alternates: { canonical: '/soar-vs-autonomous-soc' },
  openGraph: {
    url: '/soar-vs-autonomous-soc',
    type: 'article',
    title: SOAR_VS_AUTONOMOUS_SOC_METADATA.title,
    description: SOAR_VS_AUTONOMOUS_SOC_METADATA.description,
  },
}

export default function Page() {
  const hero = SOAR_VS_AUTONOMOUS_SOC_HEADER
  const p1 = hero.paragraph1
  const p2 = hero.paragraph2
  const p3 = hero.paragraph3
  const whatIsSoar = SOAR_VS_WHAT_IS_SOAR
  const whatIsAutonomousSoc = SOAR_VS_WHAT_IS_AUTONOMOUS_SOC
  const whenSoarSufficient = SOAR_VS_WHEN_SOAR_SUFFICIENT
  const whenAutonomousSocNeeded = SOAR_VS_WHEN_AUTONOMOUS_SOC_NEEDED
  const nextGenSoar = SOAR_VS_NEXT_GEN_SOAR
  const migration = SOAR_VS_MIGRATION_CONSIDERATIONS
  const architectureAuthority = SOAR_VS_ARCHITECTURE_AUTHORITY
  const mechanismFailures = SOAR_VS_MECHANISM_FAILURES
  const whatOmnisenseDoes = SOAR_VS_WHAT_OMNISENSE_DOES

  return (
    <>
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: SOAR_VS_FAQ.items.map((item) => ({
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
          { '@type': 'ListItem', position: 2, name: 'SOAR vs Autonomous SOC', item: `${SITE_URL}/soar-vs-autonomous-soc` },
        ],
      }}
    />
    <PageHeader
      showBottomBorder={false}
      heroLayout="soar"
      heading={hero.heading.line1}
      headingLine2={hero.heading.line2 || undefined}
      subtext={
        <>
          <span className="page-header-subtext-block">
            {p1.lines[0]}
            <br />
            {p1.lines[1]}
            <br />
            {p1.lines[2]}
          </span>
          <span className="page-header-subtext-gap">
            {p2.line1}
            <br />
            <Link href={p2.link1Href} className="text-white underline underline-offset-4">
              {p2.link1Label}
            </Link>
            {p2.betweenLinks}
            <Link href={p2.link2Href} className="text-white underline underline-offset-4">
              {p2.link2Label}
            </Link>
          </span>
          <span className="page-header-subtext-gap">
            {p3.line1}
            <br />
            {p3.line2}
          </span>
          <span className="page-header-subtext-gap">{hero.paragraph4}</span>
        </>
      }
    />

    <div className="soar-vs-autonomous-soc-page">
      <SplitInfoCtaImage
        animateOnScroll
        bodyFontSize="18"
        sectionClassName="soar-what-is-soar-section"
        heading={<span className="traditional-models-heading">{whatIsSoar.heading}</span>}
        body={
          <>
            <p className="info-cta-lead">{whatIsSoar.summary}</p>
            <p className="info-cta-lead">{whatIsSoar.listLead}</p>
            <ul className="soc-point-list">
              {whatIsSoar.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p>{whatIsSoar.closing}</p>
          </>
        }
        image={whatIsSoar.image}
        imageObjectFit="contain"
      />

      <SplitInfoCtaImage
        animateOnScroll
        bodyFontSize="18"
        imageLeft
        heading={
          <span className="traditional-models-heading">{whatIsAutonomousSoc.heading}</span>
        }
        body={
          <>
            <p>{whatIsAutonomousSoc.definition}</p>
            <p>{whatIsAutonomousSoc.listLead}</p>
            <ul className="soc-point-list">
              {whatIsAutonomousSoc.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p className="info-cta-lead">{whatIsAutonomousSoc.closing}</p>
          </>
        }
        image={whatIsAutonomousSoc.image}
        imageObjectFit="contain"
      />

      <SectionLead heading={mechanismFailures.heading} subheading={mechanismFailures.subheading}>
        {mechanismFailures.cards.map((card) => (
          <BlackGradientCard key={card.title} title={card.title} text={<p>{card.text}</p>} />
        ))}
      </SectionLead>

      <AutonomousSocComparisonSection
        data={SOAR_VS_ARCHITECTURAL_DIFFERENCE}
        variant="soarComparison"
      />

      <AutonomousSocComparisonSection data={SOAR_VS_COMPARISON_TABLE} variant="soarComparison" />

      <div className="soar-vs-tertiary-cta">
        <Button href="https://sara-open.sirp.io" variant="secondary">
          Try Sara free
        </Button>
      </div>

      <SectionLead heading={whatOmnisenseDoes.heading} subheading={whatOmnisenseDoes.intro}>
        {whatOmnisenseDoes.items.map((item) => (
          <BlackGradientCard key={item.title} title={item.title} text={<p>{item.body}</p>} />
        ))}
      </SectionLead>

      <SplitInfoCtaImage
        animateOnScroll
        heading={
          <span className="traditional-models-heading">{whenSoarSufficient.heading}</span>
        }
        body={
          <>
            <p>{whenSoarSufficient.listLead}</p>
            <ul className="split-plain-disc-list">
              {whenSoarSufficient.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p>{whenSoarSufficient.closing}</p>
          </>
        }
        image={whenSoarSufficient.image}
        imageObjectFit="contain"
      />

      <SplitInfoCtaImage
        animateOnScroll
        imageLeft
        heading={
          <span className="traditional-models-heading">{whenAutonomousSocNeeded.heading}</span>
        }
        body={
          <>
            <p>{whenAutonomousSocNeeded.listLead}</p>
            <ul className="split-plain-disc-list">
              {whenAutonomousSocNeeded.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p>{whenAutonomousSocNeeded.closing}</p>
          </>
        }
        image={whenAutonomousSocNeeded.image}
        imageObjectFit="contain"
      />

      <SplitInfoCtaImage
        animateOnScroll
        heading={<span className="traditional-models-heading">{nextGenSoar.heading}</span>}
        body={
          <div className="split-info-body-relaxed-paragraphs">
            <p className="info-cta-lead">{nextGenSoar.answer}</p>
            {nextGenSoar.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        }
        image={nextGenSoar.image}
        imageObjectFit="contain"
      />

      <AutonomousSocBenefitsSection
        heading={migration.heading}
        intro={
          <>
            <p>
              {migration.intro.line1Before}
              {migration.intro.line1After}
            </p>
            <p>{migration.intro.line2}</p>
          </>
        }
        cards={migration.cards}
        footerLines={migration.footerLines}
        variant="soarMigration"
      />

      <InfoCtaBlock
        variant="authority"
        heading={
          <span className="traditional-models-heading">{architectureAuthority.heading}</span>
        }
        body={
          <>
            {architectureAuthority.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="info-cta-lead">
              {architectureAuthority.closingLine1}
              <br />
              {architectureAuthority.closingLine2}
            </p>
          </>
        }
      />

      <FaqAccordionSection data={SOAR_VS_FAQ} />

      <div className="soar-vs-autonomous-soc-cta-wrap">
        <CtaSection data={SOAR_VS_CTA} heading={SOAR_VS_CTA.heading} />
      </div>
    </div>
    </>
  )
}
