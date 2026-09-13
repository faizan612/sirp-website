import { Badge } from "@/components/homepage/ui/badge";
import { PrimaryButton } from "@/components/homepage/ui/primary-button";
import { Container } from "@/components/homepage/ui/container";

/**
 * "The SOC that drives itself." — closing CTA, last block of the second light
 * panel. Light background fading to a purple glow at the bottom
 * (Figma "Frame 2147224817"). All text is live.
 */
export function SocCta() {
  return (
    <div className="relative overflow-hidden rounded-b-[64px] bg-[#f6f5f8]">
      {/* Purple gradient glow anchored to the bottom edge */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px] bg-[url('/homepage/figma/soc-cta/gradient-bg.png')] bg-[length:100%_100%] bg-bottom bg-no-repeat"
        aria-hidden
      />

      <Container className="relative pt-[100px] pb-[140px]">
        <div className="flex flex-col items-center">
          <Badge variant="light">Governed autonomy</Badge>

          <h2 className="mt-[24px] max-w-[520px] text-center font-serif text-[44px] font-normal leading-[52px] text-[#0a0a0a]">
            The SOC that drives itself.
          </h2>

          <p className="mt-[16px] max-w-[420px] text-center text-[16px] leading-[24px] text-[#5f5f5f]">
            Autonomous, governed security operations powered by OmniSense&trade;.
          </p>

          <div className="mt-[32px] flex flex-wrap items-center justify-center gap-[16px]">
            <PrimaryButton href="/omnisense">Experience OmniSense&trade;</PrimaryButton>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-[12px] bg-black px-[24px] py-[12px] text-[16px] font-medium leading-[24px] text-white"
            >
              Request Live Demo
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
