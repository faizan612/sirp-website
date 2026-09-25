import Image from "next/image";
import Link from "next/link";
import logo from "../assets/Layer_1.png";
import certifications from "../assets/Frame 2147224571.png";
import styles from "./footer.module.css";

const destinations: Record<string, string> = {
  "OmniSense™": "/omnisense",
  "Enterprise Autonomous SOC": "/enterprise-soc",
  "Pillar": "/autonomous-security",
  "How it Works": "/how-autonomous-soc-works",
  "Outcomes & Metrics": "/security-outcomes-and-metrics",
  "What is an Autonomous SOC": "/what-is-autonomous-soc",
  "SOAR vs Autonomous": "/soar-vs-autonomous-soc",
  "SOAR Alternatives": "/soar-alternatives",
  "Blog": "/blog",
  "Technical Whitepaper": "/technical-white-paper",
  "Whitepaper": "/buyers-guide",
  "Manifesto": "/manifesto",
  "Contact": "/contact"
};

const footerGroups = [
  {
    title: "Platform",
    links: [
      "OmniSense™",
      "Enterprise Autonomous SOC",
      "Pillar",
      "How it Works",
      "Outcomes & Metrics",
    ],
  },
  {
    title: "Solutions",
    links: [
      "What is an Autonomous SOC",
      "SOAR vs Autonomous",
      "SOAR Alternatives",
    ],
  },
  {
    title: "Resources & Company",
    links: ["Blog", "Technical Whitepaper", "Whitepaper", "Manifesto", "Contact"],
  },
] as const;

export function Footer({ variant = 'default' }: { variant?: 'default' | 'integration' }) {
  return (
    <footer className={`${styles.footer} ${variant === 'integration' ? styles.integrationFooter : ''}`}>
      <div className={`${styles.shell} ${styles.content}`}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Image
              src={logo}
              alt="SIRP"
              className={styles.logo}
              sizes="120px"
            />
            <p className={styles.description}>
              Autonomous SOC Platform, governed, AI-native security operations.
              Powered by OmniSense™.
            </p>
            <Image
              src={certifications}
              alt="ISO 27001 certified and SOC 2 Type II compliant"
              className={styles.certifications}
              sizes="116px"
            />
          </div>

          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className={styles.heading}>{group.title}</h2>
              <ul className={styles.linkList}>
                {group.links.map((label) => (
                  <li key={label}>
                    <Link href={destinations[label]} className={styles.link}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <section className={styles.locationsColumn} aria-labelledby="footer-locations">
            <h2 id="footer-locations" className={styles.heading}>
              Locations
            </h2>
            <div className={styles.locations}>
              <div>
                <h3 className={styles.locationName}>United States</h3>
                <address className={styles.address}>
                  7735 Old Georgetown Rd, Suite 510
                  <br />
                  Bethesda, MD 20814
                </address>
                <a href="tel:+18887019252" className={styles.phone}>
                  +1 888 701 9252
                </a>
              </div>

              <div>
                <h3 className={styles.locationName}>United Kingdom</h3>
                <address className={styles.address}>
                  167-169 Great Portland Street,
                  <br />
                  5th Floor, London, W1W 5PF
                </address>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={`${styles.shell} ${styles.bottomInner}`}>
          <p className={styles.copyright}>
            © 2026 SIRP Labs Inc. All Rights Reserved.
          </p>

          <div className={styles.socials} aria-label="SIRP social media">
            <a href="https://twitter.com/sirp_io" className={styles.socialLink} aria-label="SIRP on X">
              <Image src="/images/logos/twitter.svg" alt="" width={22} height={22} className={styles.socialIcon} />
            </a>
            <a
              href="https://linkedin.com/company/sirp-io"
              className={styles.socialLink}
              aria-label="SIRP on LinkedIn"
            >
              <Image src="/images/logos/linkedin.svg" alt="" width={22} height={22} className={styles.socialIcon} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
