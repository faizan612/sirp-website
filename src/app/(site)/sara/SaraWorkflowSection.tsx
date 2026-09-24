import Image from 'next/image'
import styles from './sara-workflow.module.css'

export function SaraWorkflowSection() {
  return (
    <section className={styles.section} aria-labelledby="sara-workflow-title">
      <div className={styles.headingWrap}>
        <span className={styles.eyebrow}>See It Work</span>
        <h2 id="sara-workflow-title">
          From alert to decision,
          <br />
          without starting over.
        </h2>
        <p>
          An analyst opens an incident. The verdict, confidence, evidence, and recommended
          <br className={styles.desktopBreak} /> response are already available in the OmniSense workbench. The analyst wants to
          <br className={styles.desktopBreak} /> understand why.
        </p>
      </div>

      <div className={styles.productFrame}>
        <Image
          className={styles.productImage}
          src="/images/sara/sara-alert-to-decision.png"
          alt="OmniSense co-analysis showing an incident assessment, execution plan, and live investigation timeline"
          width={2888}
          height={1724}
          sizes="(max-width: 1476px) calc(100vw - 32px), 1444px"
          unoptimized
        />
      </div>

      <p className={styles.note}>The conversation carries the investigation forward.</p>
    </section>
  )
}
