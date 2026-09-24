import { PrimaryButton } from "@/components/homepage/ui/primary-button";
import { Container } from "@/components/homepage/ui/container";

/**
 * Hero — Figma node 1:2849. The desktop artwork is 598px wide and aligns to
 * the right edge of the 1680px content area.
 */
export function Hero() {
  return (
    <section className="relative w-full bg-home-ink-900">
      <Container className="pb-20 pt-12 sm:pb-24 lg:pb-[152px] lg:pt-10">
        <div className="grid items-center gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(360px,598px)] xl:gap-16">
          {/* Text column */}
          <div className="max-w-[800px]">
            <span className="box-border inline-flex h-[36px] items-center rounded-[50px] border border-home-hairline-strong bg-home-ink-850 px-[16px] text-[14px] leading-[24px] text-white">
              Autonomous SOC Platform
            </span>

            <h1 className="mt-6 font-serif text-[clamp(44px,3.34vw,64px)] font-normal leading-[1.18] text-[#f7f7f7]">
              Your SOC doesn&apos;t need another verdict.
              <br />
              It needs the case closed.
            </h1>

            <p className="mt-6 max-w-[760px] text-[16px] leading-[24px] text-[#c2c2c2]">
              OmniSense investigates every alert end to end, then closes it. Every
              action passes a governance gate you define, and every step is on the
              record.
            </p>

            <div className="mt-[32px] flex flex-wrap items-center gap-[16px]">
              <PrimaryButton href="https://sara-open.sirp.io/">Try Sara, free</PrimaryButton>

              <a
                href="#omnisense-motion"
                className="inline-flex items-center justify-center rounded-[16px] border border-home-hairline-strong bg-black px-[24px] py-[12px] text-[16px] font-medium leading-[24px] text-white"
              >
                See the autonomous SOC in motion
              </a>
            </div>
          </div>

          {/* Animated incident-workflow panel */}
          <div className="relative mx-auto aspect-[598/818] w-full max-w-[598px] overflow-hidden rounded-[24px] border border-home-hairline">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/homepage/figma/hero/panel.png"
              aria-hidden="true"
            >
              <source src="/homepage/figma/hero/header-video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </Container>
    </section>
  );
}
