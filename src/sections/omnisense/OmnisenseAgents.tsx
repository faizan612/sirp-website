import Image from 'next/image'
import styles from './agents-section.module.css'

/* Figma lays the mesh out as four rows of two; the slots are fixed, so each item is
   pinned to the position its copy occupies in the design. The card treatment is not
   uniform either — the right column mirrors its fill, Enrichment and Playbook also
   mirror their border, and the four cards flanking the core take double the blur. */
const SLOTS = [
  { at: 'analysis',       fillRight: false, strokeRight: false, strongBlur: false },
  { at: 'classification', fillRight: true,  strokeRight: false, strongBlur: false },
  { at: 'headerAgent',    fillRight: false, strokeRight: false, strongBlur: true  },
  { at: 'enrichment',     fillRight: true,  strokeRight: true,  strongBlur: true  },
  { at: 'preprocessor',   fillRight: false, strokeRight: false, strongBlur: true  },
  { at: 'playbook',       fillRight: true,  strokeRight: true,  strongBlur: true  },
  { at: 'assign',         fillRight: false, strokeRight: false, strongBlur: false },
  { at: 'actions',        fillRight: true,  strokeRight: false, strongBlur: false },
] as const

interface Agent {
  title:       string
  description: string
}

interface AgentsData {
  heading:     string
  description: string
  items:       readonly Agent[]
}

interface OmnisenseAgentsProps {
  data: AgentsData
}

export function OmnisenseAgents({ data }: OmnisenseAgentsProps) {
  const { heading, description, items } = data

  return (
    <section id="omnisense-agents" className={styles.section} aria-labelledby="agents-heading">
      <Image src="/images/omnisense/agents-pattern.svg" alt="" aria-hidden="true"
        width={1920} height={1023} unoptimized priority={false} className={styles.pattern} />

      <div className={styles.stage}>
        <span className={styles.badge}>Agents</span>
        <h2 id="agents-heading" className={styles.title}>{heading}</h2>
        <p className={styles.lede}>{description}</p>

        <div className={styles.coreWrap}>
          <Image src="/images/omnisense/agents-glow.svg" alt="" aria-hidden="true"
            width={1545} height={1545} unoptimized className={styles.glow} />
          <Image src="/images/omnisense/agents-core.svg" alt="" aria-hidden="true"
            width={572} height={572} unoptimized className={styles.core} />
        </div>

        <Image src="/images/omnisense/agents-mesh.svg" alt="" aria-hidden="true"
          width={1278} height={1273} unoptimized className={styles.lines} />

        <div className={styles.cards}>
          {items.slice(0, SLOTS.length).map((agent, i) => {
            const slot = SLOTS[i]
            const className = [
              styles.card,
              styles[slot.at],
              slot.fillRight   && styles.fillRight,
              slot.strokeRight && styles.strokeRight,
              slot.strongBlur  && styles.blurStrong,
            ].filter(Boolean).join(' ')
            return (
              <article key={agent.title} className={className}>
                <h3>{agent.title}</h3>
                <p>{agent.description}</p>
              </article>
            )
          })}
        </div>

        {/* Figma draws these connectors after the cards, so they cross the card edges. */}
        <Image src="/images/omnisense/agents-mesh-front.svg" alt="" aria-hidden="true"
          width={1278} height={1273} unoptimized className={styles.linesFront} />
      </div>
    </section>
  )
}
