import Image from "next/image";
import { Badge } from "@/components/homepage/ui/badge";
import { PrimaryButton } from "@/components/homepage/ui/primary-button";
import { Container } from "@/components/homepage/ui/container";

/**
 * "Autonomy stops where you say it stops." — light section inside the panel.
 * Layout follows sirp.io: 1280 container, 80px vertical padding, two columns
 * (policy card / text). Heading + paragraph are live text; the policy card is
 * cropped from the user export "Group 1707486968" (policy-card.png).
 */
export function Autonomy() {
  return (
    <Container className="py-14 sm:py-16 lg:py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2 xl:gap-16 2xl:grid-cols-[min(45.3125vw,870px)_minmax(0,1fr)]">
        <Image
          src="/homepage/figma/autonomy/policy-card.png"
          alt="GET HASH INFO — assess. Author a policy: build rules as WHEN … THEN …. Rule 1 — WHEN proposed action is one of GET_HASH_INFO, THEN require approval at L2."
          width={870}
          height={740}
          quality={90}
          className="w-full 2xl:w-[45.3125vw] 2xl:max-w-[870px]"
        />

        <div className="max-w-[650px]">
          <Badge variant="light">Governed autonomy</Badge>

          <h2 className="mt-6 font-serif text-[clamp(40px,2.92vw,56px)] font-normal leading-[1.05] text-[#0f0f0f]">
            Autonomy stops where you say it stops.
          </h2>

          <p className="mt-[24px] text-[16px] leading-[24px] text-[#5f5f5f]">
            Set the level per action, not per platform. OmniSense acts on its own
            inside those limits and waits for a named human outside them — every
            time, with the decision recorded.
          </p>

          <div className="mt-[32px]">
            <PrimaryButton>Get a demo</PrimaryButton>
          </div>
        </div>
      </div>
    </Container>
  );
}
