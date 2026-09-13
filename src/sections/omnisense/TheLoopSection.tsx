import Image from 'next/image'
import { BODY } from '@/content/omnisense/theLoop'
import styles from './architecture-section.module.css'

const cards = [
  { id: 'planner', title: 'Planner', body: 'Reads the alert, the environment, and prior cases. Proposes every action. Approves none of them.' },
  { id: 'gate', title: 'Autonomy Gate', body: 'Checks each action before execution against your policy, then allows, holds for approval, or blocks.' },
  { id: 'executor', title: 'Executor', body: 'Runs what the gate allows. Nothing reaches your environment without passing through it first.' },
  { id: 'governor', title: 'Decision Governor', body: 'Fires once, after the full run. Issues one of three verdicts: close the case, escalate to a human, a new plan.' },
]

export function TheLoopSection() {
  return (
    <section id="omnisense-architecture" className={styles.section} aria-labelledby="architecture-heading">
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.badge}>Architecture</span>
          <h2 id="architecture-heading">Three parts. One loop.<br />Nothing skips the gate.</h2>
          <p>{BODY}</p>
        </header>
        <div className={styles.cards}>
          {cards.map(card => (
            <article key={card.id} className={styles.card} aria-labelledby={`architecture-${card.id}`}>
              <Image src={`/images/omnisense/architecture-${card.id}.svg`} alt="" aria-hidden="true"
                width={402} height={280} unoptimized className={styles.artwork} />
              <div className={styles.copy}>
                <h3 id={`architecture-${card.id}`}>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
