import Image from "next/image";
import { Container } from "@/components/homepage/ui/container";

/**
 * "The platform running governed autonomous security." — dark section.
 * Layout follows sirp.io: 1280 container, 100px vertical padding.
 * Centered: eyebrow + serif heading + paragraph + OmniBoard dashboard framed in
 * a glowing purple border + closing caption. Dashboard = user export
 * "Component 383" (omniboard.png).
 */
export function Platform() {
  return (
    <section className="w-full bg-home-ink-900 py-[100px]">
      <Container>
        <div className="flex flex-col items-center">
          <span className="text-[13px] font-medium uppercase tracking-[0.14em] text-[#8a8a8a]">
            OmniSense&trade;
          </span>

          <h2 className="mt-[16px] max-w-[760px] text-center font-serif text-[44px] font-normal leading-[52px] text-[#f7f7f7]">
            The platform running governed autonomous security.
          </h2>

          <p className="mt-[20px] max-w-[720px] text-center text-[16px] leading-[24px] text-[#8a8a8a]">
            One system from detection through to closure. Investigation, response,
            reporting, and threat intel on shared context, not four tools you
            integrate.
          </p>

          {/* Dashboard framed in a glowing purple border */}
          <div className="mt-[48px] w-full rounded-[24px] bg-[linear-gradient(135deg,#a557ff,#8e2dff_45%,#c08bff)] p-[2px] shadow-[0_0_120px_-24px_rgba(142,45,255,0.55)]">
            <div className="rounded-[22px] bg-home-ink-900 p-[8px]">
              <Image
                src="/homepage/figma/platform/omniboard.png"
                alt="OmniBoard — live security operations overview across all detection sources: 6,145 tickets, severity breakdown, MTTR 0s, MTTD 5m, MTTA 9m"
                width={1744}
                height={861}
                quality={90}
                className="w-full rounded-[16px]"
              />
            </div>
          </div>

          <p className="mt-[32px] text-center text-[15px] leading-[22px] text-[#8a8a8a]">
            The reasoning is a model. The enforcement is code.
          </p>
        </div>
      </Container>
    </section>
  );
}
