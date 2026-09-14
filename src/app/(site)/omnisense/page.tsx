import type { Metadata } from 'next'
import { OmnisenseParticleHero } from '@/sections/omnisense/OmnisenseParticleHero'
import { TheLoopSection } from '@/sections/omnisense/TheLoopSection'
import { OmnisensePlatform } from '@/sections/omnisense/OmnisensePlatform'
import { OmnisenseAgents } from '@/sections/omnisense/OmnisenseAgents'
import { OmnisenseSara } from '@/sections/omnisense/OmnisenseSara'
import { Integrations } from '@/components/homepage/sections/integrations'
import { SocCta } from '@/components/homepage/sections/soc-cta'
import { OMNISENSE_PAGE_DATA } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'OmniSense™: Security Decision Intelligence',
  description: 'SIRP OmniSense™ delivers a governed Autonomous SOC that continuously detects, decides, and executes response actions within defined policy boundaries.',
  alternates: { canonical: '/omnisense' },
  openGraph: {
    url: '/omnisense',
    type: 'website',
    title: 'OmniSense™: Security Decision Intelligence | SIRP',
    description: 'The AI-native engine powering autonomous detection, risk computation, and governed response at machine speed.',
  },
}

export default function OmnisensePage() {
  return (
    <>
      <OmnisenseParticleHero />
      <OmnisensePlatform data={OMNISENSE_PAGE_DATA.platform} />
      <TheLoopSection />
      <OmnisenseAgents data={OMNISENSE_PAGE_DATA.agents} />
      <OmnisenseSara data={OMNISENSE_PAGE_DATA.sara} />
      <div className="homepage-design relative overflow-x-hidden bg-home-ink-900">
        <div className="overflow-hidden rounded-t-[40px] rounded-b-[64px] bg-[#f6f5f8]">
          <Integrations />
          <SocCta />
        </div>
      </div>
    </>
  )
}
