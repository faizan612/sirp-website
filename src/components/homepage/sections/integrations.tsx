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
    <Container className="pt-[80px] pb-[64px]">
      <div className="flex flex-col items-center">
        <Badge variant="light">Integrations</Badge>

        <h2 className="mt-[24px] max-w-[760px] text-center font-serif text-[44px] font-normal leading-[52px] text-[#0f0f0f]">
          Every connection is something OmniSense can act on.
        </h2>

        <p className="mt-[24px] max-w-[760px] text-center text-[16px] leading-[24px] text-[#5f5f5f]">
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
