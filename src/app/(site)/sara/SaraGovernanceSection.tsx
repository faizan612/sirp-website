import Image from 'next/image'
import styles from './sara-governance.module.css'

export function SaraGovernanceSection() {
  return (
    <section className={styles.section} aria-label="Your security context stays governed">
      <Image
        src="/images/sara/sara-governed-context.png"
        alt="Sara governance controls showing role-aware access, controlled context, reviewable design, and governed data"
        width={3836}
        height={2160}
        sizes="100vw"
        unoptimized
        className={styles.image}
      />
    </section>
  )
}
