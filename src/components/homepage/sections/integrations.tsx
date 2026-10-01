import { Badge } from "@/components/homepage/ui/badge";
import { Container } from "@/components/homepage/ui/container";
import { IntegrationLogoSlider } from "@/components/homepage/ui/integration-logo-slider";

/**
 * "Every connection is something OmniSense can act on." — light section, first
 * block of the second light panel. Heading + paragraph remain server-rendered;
 * only the looping logo rail crosses the client boundary.
 */
export function Integrations() {
  return (
    <Container className="pb-20 pt-16 sm:pt-20 lg:pb-[clamp(128px,10vw,192px)] lg:pt-[clamp(96px,7.0833vw,136px)]">
      <div className="flex flex-col items-center">
        <Badge variant="light">Integrations</Badge>

        <h2 className="mt-6 max-w-[1040px] text-center font-serif text-[clamp(32px,8.5vw,40px)] font-normal leading-[1.08] text-[#0f0f0f] sm:text-[clamp(40px,3.34vw,64px)] lg:w-[54.1667vw]">
          Every connection is something OmniSense can act on.
        </h2>

        <p className="mt-6 max-w-[1100px] text-center text-[16px] leading-[26px] text-[#5f5f5f] sm:text-[18px] lg:w-[57.2917vw]">
          OmniSense connects to the SIEM, endpoint, identity, and ticketing tools
          your SOC already runs. Each connection becomes an action agents can
          take, governed by the same policy you set for everything else. When
          something in your environment is not in the catalog, you build the
          integration yourself against the open integration framework, and it
          arrives under the same policy model as the rest. Air-gapped deployments
          included.
        </p>

        <IntegrationLogoSlider />
      </div>
    </Container>
  );
}
