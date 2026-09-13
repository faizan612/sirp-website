import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/PageHeader'
import { InfoCtaBlock } from '@/components/shared/InfoCtaBlock'
import { AutonomousSocBenefitsSection } from '@/components/shared/AutonomousSocBenefitsSection'
import { IntegrationsSection } from '@/sections/home/IntegrationsSection'
import { CtaSection } from '@/sections/home/CtaSection'
import { INTEGRATIONS_DATA } from '@/lib/constants'

// Placeholder pending confirmation of the real partner portal domain.
const PARTNER_PORTAL_URL = 'https://partners.sirp.io/'

export const metadata: Metadata = {
  title: 'Partner Program | Autonomous SOC',
  description: 'Build, resell, and deliver Autonomous SOC outcomes with SIRP. Partner with OmniSense™ to bring AI-native security operations to your customers.',
  alternates: { canonical: '/partners' },
  openGraph: {
    url: '/partners',
    type: 'website',
    title: 'Partner Program | SIRP',
    description: 'Sell outcomes, not overhead. Partner with the first genuinely Autonomous SOC.',
  },
}

export default function PartnersPage() {
  return (
    <>
      <PageHeader
        badgeText="Partners"
        heading={<>Sell outcomes, not <em>overhead</em></>}
        subtext="The SOC market is rebuilding around decision systems. Partner with SIRP to put the first genuinely Autonomous SOC in front of your customers, and grow with a platform that does the heavy lifting for you."
        buttons={[
          { label: 'Become a partner', href: '/contact' },
          { label: 'Partner login', href: PARTNER_PORTAL_URL, variant: 'secondary' },
        ]}
      />

      <InfoCtaBlock
        heading="The market moved. Your offering should too."
        body={
          <>
            <p>Your customers are not asking for another tool.</p>
            <p>They are asking why their SOC still scales with headcount.</p>
            <p>
              Traditional security partnerships were built on reselling controls and stitching integrations
              together. That model rewarded complexity. The more tools, the more services, the more billable
              hours.
            </p>
            <p>Autonomous changes the equation.</p>
            <p>
              When the platform detects, investigates, and responds on its own, your value moves up the stack,
              from keeping the lights on to designing governance, tuning autonomy boundaries, and owning the
              customer outcome.
            </p>
            <p>Partners who make that shift early will define the category.</p>
          </>
        }
      />

      <AutonomousSocBenefitsSection
        badgeText="Partner Program"
        heading={<>One platform. <em>Three</em> ways to grow.</>}
        columns={3}
        cards={[
          {
            icon: 'chart',
            title: 'Resell',
            paragraphs: [
              'Bring OmniSense™ to your customers as an AI-native alternative to legacy SOAR. Predictable margins, co-branded enablement, and a product that sells on results rather than promises.',
            ],
          },
          {
            icon: 'refresh',
            title: 'Deliver (MSSP / MDR)',
            paragraphs: [
              'Run an Autonomous SOC across your entire client base from a single intelligence layer. Serve more customers without adding analysts linearly. Sara becomes the Co-Analyst behind every service tier you offer.',
            ],
          },
          {
            icon: 'sparkle',
            title: 'Build',
            paragraphs: [
              "Extend the ecosystem. With SIRP's AI-assisted integration builder, technology and integration partners can connect their tools into the OmniSense brain in hours, not quarters.",
            ],
          },
        ]}
      />

      <AutonomousSocBenefitsSection
        heading={<>Built for partners who <em>win on outcomes</em></>}
        columns={4}
        cards={[
          {
            icon: 'pie',
            title: 'Margins that reward expertise, not effort.',
            paragraphs: [
              'You are paid for judgment and governance design, not for firefighting alerts.',
            ],
          },
          {
            icon: 'chart',
            title: 'A product that demos itself.',
            paragraphs: [
              '80% reduction in MTTD. 70% faster MTTR. 90% autonomous actions. The results carry the conversation.',
            ],
          },
          {
            icon: 'hand',
            title: 'Governed autonomy your customers can trust.',
            paragraphs: [
              'Explicit policies, risk-tiered approval gates, and full auditability. You sell control, not a black box.',
            ],
          },
          {
            icon: 'refresh',
            title: 'Enablement from day one.',
            paragraphs: [
              'Technical training, sales playbooks, joint demo environments, and deal support from a team that has done the migration before.',
            ],
          },
        ]}
      />

      <IntegrationsSection
        data={{
          ...INTEGRATIONS_DATA,
          pill: 'Autonomous SOC Ecosystem',
          heading: 'Every tool.',
          headingItalic: 'One',
          headingSuffix: 'intelligence.',
          description:
            "OmniSense already connects 200+ tools into a single Autonomous SOC brain. Integration partners extend that reach, and with our AI-assisted code builder, building a new connector no longer means a roadmap request.",
        }}
      />

      <InfoCtaBlock
        heading="Already a partner?"
        body={<p>Access deal registration, enablement resources, and your customer dashboards in one place.</p>}
        button={{ label: 'Enter the Partner Portal', href: PARTNER_PORTAL_URL }}
      />

      <CtaSection
        heading={<>Let&apos;s build the <span className="cta-heading-serif">autonomous</span> future together</>}
        description="The SOC is being rebuilt around decision systems. The partners who move now will own the next decade of security operations."
        data={{
          primaryBtn: { label: 'Become a partner', href: '/contact' },
        }}
      />
    </>
  )
}
