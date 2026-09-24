import Image from 'next/image'
import styles from './sara-shift.module.css'

export function SaraShiftSection() {
  return (
    <section className={styles.section} aria-labelledby="sara-shift-title">
      <div className={styles.visual} aria-hidden="true">
        <Image
          className={styles.visualImage}
          src="/images/sara/sara-shift-context-complete.png"
          alt=""
          width={3354}
          height={1804}
          sizes="(max-width: 1677px) 100vw, 1677px"
          unoptimized
        />
      </div>

      <div className={styles.headingWrap}>
        <span className={styles.eyebrow}>On Every Shift</span>
        <h2 id="sara-shift-title">
          Your SOC should not forget when
          <br className={styles.desktopBreak} /> the shift changes.
        </h2>
        <p>
          Security operations accumulate knowledge constantly. Why an alert was closed. What an
          <br className={styles.desktopBreak} /> analyst tried. Which evidence changed the verdict. How your organization handles a
          <br className={styles.desktopBreak} /> particular incident type. Sara makes that context available where analysts actually work.
        </p>
      </div>
    </section>
  )
}
