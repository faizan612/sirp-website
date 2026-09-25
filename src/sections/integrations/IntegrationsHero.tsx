'use client'

import Link from 'next/link'
import { FEATURED_INTEGRATIONS } from '@/lib/data/integrations'
import { INTEGRATIONS_PAGE_DATA } from '@/lib/constants/integrations'
import styles from './integrations-page.module.css'

function LogoGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className={styles.logoGroup} aria-hidden={duplicate || undefined}>
      {FEATURED_INTEGRATIONS.map((integration, index) => (
        <div
          className={styles.logoTile}
          data-light-logo={index === 0 || undefined}
          key={`${duplicate ? 'copy' : 'original'}-${integration.name}`}
        >
          <img
            src={integration.logo}
            alt={duplicate ? '' : integration.name}
            loading="eager"
            decoding="async"
          />
        </div>
      ))}
    </div>
  )
}

export function IntegrationsHero() {
  const { eyebrow, heading, headingItalic, subhead, primaryCta, secondaryCta } =
    INTEGRATIONS_PAGE_DATA.hero

  return (
    <section className={`${styles.darkSurface} ${styles.hero}`}>
      <div className={styles.heroInner}>
        <span className={styles.badge}>{eyebrow}</span>
        <h1 className={styles.heroTitle}>
          <span>{heading}</span>
          <span>{headingItalic}</span>
        </h1>
        <p className={styles.heroCopy}>{subhead}</p>
        <div className={styles.actions}>
          <Link href={primaryCta.href} className={styles.primaryButton}>
            {primaryCta.label} ↗
          </Link>
          <a href={secondaryCta.href} className={styles.secondaryButton}>
            {secondaryCta.label}
          </a>
        </div>
      </div>

      <div className={styles.logoViewport} aria-label="Supported security integrations">
        <div className={styles.logoTrack}>
          <LogoGroup />
          <LogoGroup duplicate />
        </div>
      </div>
    </section>
  )
}
