import { Badge } from "@/components/homepage/ui/badge";
import { PrimaryButton } from "@/components/homepage/ui/primary-button";
import { AnimatedStatsCards } from "@/components/homepage/ui/animated-stats-cards";
import { Container } from "@/components/homepage/ui/container";

/**
 * "Thousands of alerts a day" — light section inside the rounded panel.
 * Layout follows sirp.io: 1280 container, 80px vertical padding, two columns
 * (text / stat cards). Heading + paragraph are live text; the stat cards remain
 * the user export "Group 1707486977" (stat-cards.png).
 */
export function Alerts() {
  return (
    <Container className="py-14 sm:py-16 lg:py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2 xl:gap-16 2xl:grid-cols-[minmax(0,1fr)_min(43.125vw,828px)]">
        <div className="max-w-[650px]">
          <Badge variant="light">How it works</Badge>

          <h2 className="mt-6 font-serif text-[clamp(40px,2.92vw,56px)] font-normal leading-[1.05] text-[#0f0f0f]">
            Thousands of alerts a day. Your team only touches what matters.
          </h2>

          <p className="mt-[24px] text-[16px] leading-[24px] text-[#5f5f5f]">
            OmniSense triages, investigates, and closes the routine alerts on its
            own. Every autonomous action passes through the governance gate you
            define, and analysts step in only when a case needs a human call.
          </p>

          <div className="mt-[32px]">
            <PrimaryButton>Get a demo</PrimaryButton>
          </div>
        </div>

        <div className="w-full justify-self-end 2xl:w-[43.125vw] 2xl:max-w-[828px]">
          <AnimatedStatsCards />
        </div>
      </div>
    </Container>
  );
}
