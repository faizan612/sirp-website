'use client'

import ProductShowcaseSlider from '@/components/ui/ProductShowcaseSlider'
import { FEATURES_DATA } from '@/lib/constants'

export function FeaturesMorphSection() {
  const { features } = FEATURES_DATA
  const imageSizes: Record<string, { width: number; height: number }> = {
    '/images/image 581.png': { width: 1830, height: 898 },
    '/images/image 582.png': { width: 1834, height: 897 },
    '/images/image 583.png': { width: 1831, height: 900 },
    '/images/Dashboardwstats.png': { width: 1672, height: 941 },
  }
  const featureById = Object.fromEntries(features.map(feature => [feature.id, feature]))
  const slideOrder = [
    { id: 'omnimap', label: "OmniSense Workbench" },
    { id: 'enrichment', label: "Your SOC's alert queue" },
  ]
  const items = [
    ...slideOrder.map(({ id, label }) => {
      const feature = featureById[id]
      return {
        image: feature.image,
        label,
        ...(imageSizes[feature.image] ?? { width: 16, height: 9 }),
      }
    }),
    { image: '/images/Dashboardwstats.png', label: 'OmniBoard', ...imageSizes['/images/Dashboardwstats.png'] },
  ]

  return (
    <section className="bg-[#f6f5f8] py-[50px] md:py-[100px]">
      <div className="container-sirp">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,0.32fr)_minmax(0,0.68fr)] lg:gap-14">

          {/* Left column — heading + body */}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-wide text-black/60">
              OmniSense™
            </h2>
            <h3
              className="mt-3 font-sans font-medium text-black"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                lineHeight: '1.15',
                letterSpacing: '-0.02em',
              }}
            >
              The platform running governed autonomous security.
            </h3>
            <p
              className="mt-8 max-w-[520px] font-sans text-base leading-[1.65]"
              style={{ color: 'rgba(0, 0, 0, 0.7)' }}
            >
              One system from detection through to closure. Investigation, response, reporting,
              and threat intel on shared context, not four tools you integrate.
            </p>
            <p className="mt-4 max-w-[520px] font-sans text-base font-medium leading-[1.65]" style={{ color: '#8e2dff' }}>
              The reasoning is a model. The enforcement is code.
            </p>
          </div>

          {/* Right column — product showcase slider */}
          <div>
            <ProductShowcaseSlider items={items} autoplay autoplayDelay={5} radius={14} />
          </div>

        </div>
      </div>
    </section>
  )
}
