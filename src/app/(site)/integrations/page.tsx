import type { Metadata } from 'next'
import { IntegrationsHero } from '@/sections/integrations/IntegrationsHero'
import { IntegrationsValueProps } from '@/sections/integrations/IntegrationsValueProps'
import { IntegrationsGrid } from '@/sections/integrations/IntegrationsGrid'
import { IntegrationsCta } from '@/sections/integrations/IntegrationsCta'

export const metadata: Metadata = {
  title: 'Integrations | OmniSense',
  description:
    'OmniSense connects across your security and IT stack and reasons over all of it, so verdicts use every signal, not a sample.',
}

export default function IntegrationsPage() {
  return (
    <>
      <IntegrationsHero />
      <IntegrationsValueProps />
      <IntegrationsGrid />
      <IntegrationsCta />
    </>
  )
}
