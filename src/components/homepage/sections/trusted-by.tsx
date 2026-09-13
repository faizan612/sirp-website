import Image from "next/image";
import { Container } from "@/components/homepage/ui/container";
import styles from "./trusted-by.module.css";

/**
 * "Trusted by Security Teams Worldwide" — first block inside the light panel.
 * Heading text + logo strip ("Frame 2147224814").
 */
export function TrustedBy() {
  return (
    <Container className="py-[64px]">
      <div className="flex flex-col items-center gap-[32px]">
        <h2 className="text-[15px] font-medium leading-[1.2] tracking-[0.01em] text-[#555555]">
          Trusted by Security Teams Worldwide
        </h2>
        <div
          className={styles.marquee}
          role="img"
          aria-label="Security teams including Al Ghurair Group, Navaio, Raqami, Purdue Federal Credit Union, OQ, Qatar Red Crescent, and Al Rayyan"
        >
          <div className={styles.track}>
            {[0, 1].map((copy) => (
              <Image
                key={copy}
                src="/homepage/figma/trusted/logos.png"
                alt=""
                aria-hidden="true"
                width={1680}
                height={60}
                className={styles.logoStrip}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
