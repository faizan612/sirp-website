import type { Metadata } from 'next'
import { EnterpriseSocHero } from '@/sections/enterprise-soc/EnterpriseSocHero'
import { EnterpriseSocReality } from '@/sections/enterprise-soc/EnterpriseSocReality'
import { EnterpriseSocShift } from '@/sections/enterprise-soc/EnterpriseSocShift'
import { EnterpriseSocDashboard } from '@/sections/enterprise-soc/EnterpriseSocDashboard'
import { EnterpriseSocAiNative } from '@/sections/enterprise-soc/EnterpriseSocAiNative'
import { EnterpriseSocThreat } from '@/sections/enterprise-soc/EnterpriseSocThreat'
import { CtaSection } from '@/sections/home/CtaSection'
import './page.css'

export const metadata: Metadata = {
  title: 'Enterprise SOC Platform',
  description: 'SIRP transforms enterprise security operations from human-driven workflows into an AI-native, self-orchestrating autonomous SOC system.',
  alternates: { canonical: '/enterprise-soc' },
  openGraph: {
    url: '/enterprise-soc',
    type: 'website',
    title: 'Enterprise SOC Platform | SIRP',
    description: 'From human-centered operations to AI-native decision systems: the enterprise SOC transformation built on OmniSense.',
  },
}

const ENTERPRISE_SOC_CTA = {
  primaryBtn: { label: 'Transform your SOC', href: '/request-demo' },
}

export default function EnterpriseSocPage() {
  return (
    <div className="enterprise-soc-page">
      <EnterpriseSocHero />
      <EnterpriseSocReality />
      <EnterpriseSocShift />
      <EnterpriseSocDashboard />
      <EnterpriseSocAiNative />
      <div className="relative overflow-x-hidden overflow-y-visible isolate">
        <div className="pb-[28px]">
          <EnterpriseSocThreat />
        </div>
        <CtaSection
          data={ENTERPRISE_SOC_CTA}
          pill="This is Not Assistance. This is Autonomy."
          pillShowSparkle={false}
          heading={
            <>
              <em className="cta-heading-serif">Enterprise SOC transformation</em>{' '}
              is an operating decision.
            </>
          }
          description="Autonomous security delivers the speed, control, and consistency that decision requires."
        />
      </div>
    </div>
  )
}
