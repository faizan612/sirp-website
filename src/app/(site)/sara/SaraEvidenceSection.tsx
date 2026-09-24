import Image from 'next/image'
import styles from './sara-evidence.module.css'

export function SaraEvidenceSection() {
  return (
    <section className={styles.section} aria-labelledby="sara-evidence-title">
      <div className={styles.headingWrap}>
        <span className={styles.eyebrow}>How Sara Answers</span>
        <h2 id="sara-evidence-title">A Co-Analyst that shows its<br />work.</h2>
        <p>
          Sara does not treat every source as equal. It starts with the context closest to your security
          <br className={styles.desktopBreak} /> operation and reaches outward only when it needs to.
        </p>
      </div>

      <div className={styles.diagram} role="img" aria-label="Sara draws on five evidence sources in priority order">
        <Image
          className={styles.diagramImage}
          src="/images/sara/answer-engine-diagram.png"
          alt=""
          width={3360}
          height={1480}
          sizes="(max-width: 1760px) calc(100vw - 64px), 1680px"
          unoptimized
          aria-hidden="true"
        />
      </div>

      <p className={styles.note}>When the evidence is not strong enough, Sara says so instead of filling the gap.</p>
    </section>
  )
}
