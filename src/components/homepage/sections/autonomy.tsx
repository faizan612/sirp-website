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
    <Container className="py-[80px]">
      <div className="grid items-center gap-[64px] lg:grid-cols-2 2xl:grid-cols-[870px_minmax(0,1fr)]">
        <Image
          src="/homepage/figma/autonomy/policy-card.png"
          alt="GET HASH INFO — assess. Author a policy: build rules as WHEN … THEN …. Rule 1 — WHEN proposed action is one of GET_HASH_INFO, THEN require approval at L2."
          width={870}
          height={740}
          quality={90}
          className="w-full"
        />

        <div className="max-w-[520px]">
          <Badge variant="light">Governed autonomy</Badge>

          <h2 className="mt-[24px] font-serif text-[44px] font-normal leading-[52px] text-[#0f0f0f]">
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
