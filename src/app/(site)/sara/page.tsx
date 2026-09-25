import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import styles from './sara-hero.module.css'
import { SaraContextSection } from './SaraContextSection'
import { SaraEvidenceSection } from './SaraEvidenceSection'
import { SaraWorkflowSection } from './SaraWorkflowSection'
import { SaraShiftSection } from './SaraShiftSection'
import { SaraGovernanceSection } from './SaraGovernanceSection'
import { SaraOpenSection } from './SaraOpenSection'

export const metadata: Metadata = {
  title: 'Sara — The Co-Analyst inside OmniSense',
  description:
    'Sara brings together the security context that matters, explains what it found, and shows where every answer came from.',
  alternates: { canonical: '/sara' },
}

function ArrowUpRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={styles.arrow}>
      <path d="M5.75 14.25 14.25 5.75M7.25 5.75h7v7" />
    </svg>
  )
}

export default function SaraPage() {
  return (
    <>
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>Your Co-Analyst,<br />grounded in your SOC.</h1>
        <p>
          Sara is the Co-Analyst inside OmniSense. Ask about an alert, an active case, your environment, or a threat.
          Sara brings together the security context that matters, explains what it found, and shows where the answer came from.
        </p>

      </div>

      <div className={styles.productVisual}>
        <Image
          src="/images/sara/sara-co-analyst-hero.png"
          alt="Sara Co-Analyst investigating a group of open ransomware incidents in OmniSense"
          width={2888}
          height={1576}
          sizes="(max-width: 768px) 1120px, (max-width: 1536px) 92vw, 1444px"
          priority
          unoptimized
          className={styles.productImage}
        />
      </div>

      <div className={styles.actions}>
        <a className={styles.primaryButton} href="https://sara-open.sirp.io/">
          See Sara work a case
          <ArrowUpRight />
        </a>
        <Link className={styles.secondaryButton} href="/contact">
          Get a demo
        </Link>
      </div>
    </section>
    <SaraContextSection />
    <SaraEvidenceSection />
    <SaraWorkflowSection />
    <SaraShiftSection />
    <SaraGovernanceSection />
    <SaraOpenSection />
    </>
  )
}
