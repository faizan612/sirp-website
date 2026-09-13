'use client'

import { trustedByLogos, type TrustedByLogo } from '@/content/home/trustedByLogos'
import { LogoLoop } from '@/components/ui/LogoLoop'

/* ─── Types ──────────────────────────────────────────────── */
interface TrustedByLogosSectionProps {
  logos?: readonly TrustedByLogo[]
}

/* ─── Component ──────────────────────────────────────────── *
 * Sits directly below the hero on the same dark surface — an infinite
 * marquee of client/partner logos. */
export function TrustedByLogosSection({ logos = trustedByLogos }: TrustedByLogosSectionProps) {
  const items = logos.map(logo => ({ src: logo.src, alt: logo.name }))

  return (
    <section className="bg-hero-surface pb-2 md:pb-4">
      <LogoLoop
        logos={items}
        speed={40}
        direction="left"
        gap={37}
        logoHeight={32}
        fadeOut
        fadeOutColor="#0E0E0E"
        ariaLabel="Trusted by"
        renderItem={item => {
          const logo = item as { src: string; alt?: string }
          return (
            <img
              src={logo.src}
              alt={logo.alt ?? ''}
              className="h-[23px] w-auto flex-shrink-0 object-contain opacity-80 transition-opacity duration-200 hover:opacity-100 md:h-8"
              onError={e => {
                const t = e.target as HTMLImageElement
                t.style.display = 'none'
              }}
            />
          )
        }}
      />
    </section>
  )
}
