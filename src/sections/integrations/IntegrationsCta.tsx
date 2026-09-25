import Link from 'next/link'
import Image from 'next/image'
import { INTEGRATIONS_PAGE_DATA } from '@/lib/constants'
import styles from './integrations-page.module.css'

export function IntegrationsCta() {
  const { cta } = INTEGRATIONS_PAGE_DATA

  return (
    <section className={styles.ctaSection} aria-labelledby="integrations-cta-title">
      <Image
        className={styles.ctaArtwork}
        src="/integrations/figma/cta-background.png"
        alt=""
        fill
        sizes="100vw"
        aria-hidden="true"
      />
      <div className={styles.ctaInner}>
        <span className={styles.ctaEyebrow}>See it Work</span>
        <h2 id="integrations-cta-title" className={styles.ctaTitle}>
          {cta.heading} {cta.headingItalic} {cta.headingSuffix}
        </h2>
        <p className={styles.ctaBody}>{cta.body}</p>
        <div className={styles.ctaActions}>
          <Link href={cta.primaryBtn.href} className={styles.ctaPrimary}>
            {cta.primaryBtn.label} <span aria-hidden="true">↗</span>
          </Link>
          <Link href={cta.secondaryBtn.href} className={styles.ctaSecondary}>
            {cta.secondaryBtn.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
