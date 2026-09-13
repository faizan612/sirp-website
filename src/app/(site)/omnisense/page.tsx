import type { Metadata } from 'next'
import { OmnisenseParticleHero } from '@/sections/omnisense/OmnisenseParticleHero'
import { TheLoopSection } from '@/sections/omnisense/TheLoopSection'
import { OmnisensePlatform } from '@/sections/omnisense/OmnisensePlatform'
import { OmnisenseAgents } from '@/sections/omnisense/OmnisenseAgents'
import { OmnisenseAction } from '@/sections/omnisense/OmnisenseAction'
import { IntegrationsSection } from '@/sections/home/IntegrationsSection'
import { OMNISENSE_PAGE_DATA, INTEGRATIONS_DATA } from '@/lib/constants'

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
      <OmnisenseAction data={OMNISENSE_PAGE_DATA.action} />
      <div className="relative overflow-visible isolate">
        <IntegrationsSection data={INTEGRATIONS_DATA} variant="dark" />
      </div>
    </>
  )
}
