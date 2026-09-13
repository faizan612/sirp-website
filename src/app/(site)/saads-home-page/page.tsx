import { HeroSection } from '@/sections/saads-home/HeroSection'
import { ProblemSection } from '@/sections/saads-home/ProblemSection'
import { HowItWorksSection } from '@/sections/saads-home/HowItWorksSection'
import { GovernedAutonomySection } from '@/sections/saads-home/GovernedAutonomySection'
import { ProofSection } from '@/sections/saads-home/ProofSection'
import { PlatformDepthSection } from '@/sections/saads-home/PlatformDepthSection'
import { IntegrationsSection } from '@/sections/saads-home/IntegrationsSection'
import { FinalCtaSection } from '@/sections/saads-home/FinalCtaSection'
import {
  HERO_DATA,
  PROBLEM_DATA,
  HOW_IT_WORKS_DATA,
  GOVERNED_DATA,
  PROOF_DATA,
  PLATFORM_DEPTH_DATA,
  INTEGRATIONS_DATA,
  FINAL_CTA_DATA,
} from '@/lib/constants/saads-home'
import { OmniSenseHome } from './OmniSenseHome'
import { ViewToggle } from './ViewToggle'

/* The homepage ships two views of the same content. The classic view is the
 * default; ?view=omnisense renders the product-aligned OmniSense redesign.
 * In Next 16 searchParams is a promise, so the page is async. */
export default async function SaadsHomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { view } = await searchParams
  const isOmni = view === 'omnisense'

  if (isOmni) {
    return (
      <>
        <OmniSenseHome />
        <ViewToggle active />
      </>
    )
  }

  return (
    <>
      <HeroSection data={HERO_DATA} />
      <ProblemSection data={PROBLEM_DATA} />
      <HowItWorksSection data={HOW_IT_WORKS_DATA} />
      <GovernedAutonomySection data={GOVERNED_DATA} />
      <ProofSection data={PROOF_DATA} />
      <PlatformDepthSection data={PLATFORM_DEPTH_DATA} />
      <IntegrationsSection data={INTEGRATIONS_DATA} />
      <FinalCtaSection data={FINAL_CTA_DATA} />
      <ViewToggle active={false} />
    </>
  )
}
