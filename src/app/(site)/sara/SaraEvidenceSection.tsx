import Image from 'next/image'
import styles from './sara-evidence.module.css'

export function SaraEvidenceSection() {
  return (
    <section className={styles.section} aria-labelledby="sara-evidence-title">
      <div className={styles.headingWrap}>
        <span className={styles.eyebrow}>How Sara Answers</span>
        <h2 data-text-motion="scroll" id="sara-evidence-title">A Co-Analyst that shows its<br />work.</h2>
        <p>
          Sara does not treat every source as equal. It starts with the context closest to your security
          <br className={styles.desktopBreak} /> operation and reaches outward only when it needs to.
        </p>
      </div>

      <div className={styles.diagram} role="region" tabIndex={0} aria-label="Sara's five evidence sources; scroll horizontally on smaller screens to explore">
        <Image
          className={styles.diagramImage}
          src="/images/sara/answer-engine-diagram.png"
          alt="Sara draws on SIRP security doctrine, your policies, tenant knowledge, your active case, then external intelligence. These sources converge into the Sara answer engine."
          width={3360}
          height={1480}
          sizes="(max-width: 1760px) calc(100vw - 64px), 1680px"
          unoptimized
        />
      </div>

      <p className={styles.diagramHint}>Swipe to explore the diagram</p>

      <p className={styles.note}>When the evidence is not strong enough, Sara says so instead of filling the gap.</p>
    </section>
  )
}
