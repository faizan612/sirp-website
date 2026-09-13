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
    <Container className="py-[80px]">
      <div className="grid items-center gap-[64px] lg:grid-cols-2 2xl:grid-cols-[minmax(0,1fr)_828px]">
        <div className="max-w-[520px]">
          <Badge variant="light">How it works</Badge>

          <h2 className="mt-[24px] font-serif text-[44px] font-normal leading-[52px] text-[#0f0f0f]">
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

        <AnimatedStatsCards />
      </div>
    </Container>
  );
}
