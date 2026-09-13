import { Hero } from "@/components/homepage/sections/hero";
import { TrustedBy } from "@/components/homepage/sections/trusted-by";
import { Alerts } from "@/components/homepage/sections/alerts";
import { Autonomy } from "@/components/homepage/sections/autonomy";
import { Platform } from "@/components/homepage/sections/platform";
import { Motion } from "@/components/homepage/sections/motion";
import { Integrations } from "@/components/homepage/sections/integrations";
import { SocCta } from "@/components/homepage/sections/soc-cta";
import { Footer } from "@/components/homepage/sections/footer";

export default function Home() {
  return (
    <div className="homepage-design w-full overflow-x-hidden bg-home-ink-900">
      <Hero />

      {/* Light panel — rounded rectangle floating on the dark page.
          Wraps Trusted By + Alerts + Autonomy (Figma rects 1:2972 …). */}
      <div className="relative bg-home-ink-900">
        <div className="overflow-hidden rounded-[40px] bg-[#f6f5f8]">
          <TrustedBy />
          <Alerts />
          <Autonomy />
        </div>
      </div>

      <Platform />
      <Motion />

      {/* Second light panel — Integrations + closing CTA */}
      <div className="relative bg-home-ink-900">
        <div className="overflow-hidden rounded-t-[40px] rounded-b-[64px] bg-[#f6f5f8]">
          <Integrations />
          <SocCta />
        </div>
      </div>

      <Footer />
    </div>
  );
}
