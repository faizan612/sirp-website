import Image from 'next/image'
import styles from './sara-context.module.css'

const modes = [
  {
    title: 'Global Knowledge',
    description: 'Security knowledge from SIRP curated doctrine and recognized security references.',
    prompt: 'What does APT38 typically target?',
    artwork: '/images/sara/context-cards/global-knowledge.png',
  },
  {
    title: 'Tenant Assist',
    description: 'Questions about your own environment in plain language, using approved and auditable data paths.',
    prompt: 'Show me my P1 incidents.',
    artwork: '/images/sara/context-cards/tenant-assist.png',
  },
  {
    title: 'Case Co-Analyst',
    description: 'Investigation help with the active case, evidence, analyst activity, and relevant history already in context.',
    prompt: 'Why is isolation recommended here?',
    artwork: '/images/sara/context-cards/case-co-analyst.png',
  },
  {
    title: 'Threat Research and Hunt',
    description: 'Threat intelligence turned into a structured HuntPlan with hypotheses, data sources, time windows, and MITRE ATT&CK techniques.',
    prompt: 'Can we hunt for Lazarus Group in our environment?',
    artwork: '/images/sara/context-cards/threat-research.png',
  },
] as const

export function SaraContextSection() {
  return (
    <section className={styles.scrollSection} aria-labelledby="sara-context-title">
      <div className={styles.stickyStage}>
        <div className={styles.lightPanel} aria-hidden="true" />
        <div className={styles.stageInner}>
          <div className={styles.copy}>
            <span className={styles.eyebrow}>One Co-Analyst. Four Modes</span>
            <h2 id="sara-context-title">The right context for the question in front of you.</h2>
            <p>
              A general security question and a live investigation are not the same problem. Sara knows the difference.
              It shifts the context it uses based on what your analyst is trying to understand, investigate, or hunt.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.cardsPlane}>
        <div className={styles.cardsRail} aria-label="Sara operating modes">
          {modes.map((mode) => (
            <article key={mode.title} className={styles.card}>
              <Image
                className={styles.cardArtwork}
                src={mode.artwork}
                alt=""
                width={1372}
                height={978}
                sizes="(max-width: 1024px) calc(100vw - 56px), 686px"
                unoptimized
                aria-hidden="true"
              />
              <div className={styles.cardA11y}>
                <h3>{mode.title}</h3>
                <p>{mode.description}</p>
                <p><strong>Ask:</strong> {mode.prompt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
