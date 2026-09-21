import { Container } from "@/components/homepage/ui/container";
import { MotionVisualization } from "@/components/homepage/ui/motion-visualization";

/**
 * "OmniSense™ in motion" — dark section, shares the near-black bg with Platform.
 * Layout follows sirp.io: 1280 container, 100px vertical padding.
 * Centered: eyebrow badge + serif heading + paragraph + the flow visualization
 * (user export "Frame 2147224500", trimmed).
 */
export function Motion() {
  return (
    <section id="omnisense-motion" className="w-full bg-home-ink-900 py-16 sm:py-20 lg:py-[100px]">
      <Container>
        <div className="flex flex-col items-center">
          <span className="box-border inline-flex h-[36px] items-center rounded-[50px] border border-home-hairline-strong bg-home-ink-850 px-[16px] text-[14px] leading-[24px] text-white">
            OmniSense Live
          </span>

          <h2 className="mt-6 text-center font-serif text-[clamp(36px,4vw,44px)] font-normal leading-[1.18] text-[#f7f7f7]">
            OmniSense<span className="align-super text-[0.32em]">™</span> in
            motion
          </h2>

          <p className="mt-[24px] max-w-[620px] text-center text-[16px] leading-[24px] text-[#8a8a8a]">
            Every connected source lands in one stream. OmniSense correlates,
            triages, and closes what it can under your policy, then hands the rest
            to an analyst with the investigation already done.
          </p>

          <MotionVisualization />
        </div>
      </Container>
    </section>
  );
}
