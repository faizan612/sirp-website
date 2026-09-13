import Image from 'next/image'
import { PrimaryButton } from '@/components/homepage/ui/primary-button'
import styles from './omnisense-hero.module.css'

export function OmnisenseParticleHero() {
  return (
    <section className={styles.hero} aria-labelledby="omnisense-hero-title">
      <div className={styles.content}>
        <span className={styles.eyebrow}>OmniSense Platform</span>
        <h1 id="omnisense-hero-title" className={styles.title}>
          The engine that runs<br className={styles.desktopBreak} /> the autonomous SOC.
        </h1>
        <p className={styles.description}>
          Planner, Governor, Executor, and a mesh of specialist agents. OmniSense
          investigates every alert end to end and closes it, with every action checked against
          your policy by code that sits outside the model.
        </p>
        <div className={styles.actions}>
          <PrimaryButton href="https://sara-open.sirp.io/">Try Sara, free</PrimaryButton>
          <a className={styles.secondary} href="/#omnisense-motion">See the autonomous SOC in motion</a>
        </div>
      </div>
      <div className={styles.visual}>
        <picture>
          <source media="(prefers-reduced-motion: reduce)" srcSet="/images/omnisense/hero-execution-dark.svg" />
        <Image
          src="/images/omnisense/hero-execution-animated.svg?v=2"
          alt="OmniSense execution graph: an investigation completed across 11 steps and 7 levels in 78 seconds."
          width={1220}
          height={520}
          unoptimized
          className={styles.image}
          priority
        />
        </picture>
      </div>
    </section>
  )
}
