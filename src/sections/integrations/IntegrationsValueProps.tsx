'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { INTEGRATIONS_PAGE_DATA } from '@/lib/constants/integrations'
import styles from './integrations-page.module.css'

export function IntegrationsValueProps() {
  const props = INTEGRATIONS_PAGE_DATA.valueProps
  const reduce = useReducedMotion()

  return (
    <section className={styles.valueSection}>
      <div className={styles.valueInner}>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 22 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.valueHeading}>More than connected.<br />Built to work together.</h2>
          <p className={styles.valueCopy}>
            Your integrations do more than exchange data. They give OmniSense the context to
            reason across tools, take approved action, and keep workflows running as your
            environment evolves.
          </p>
        </motion.div>

        <div className={styles.valueGrid}>
          {props.map((item, index) => (
            <motion.article
              key={item.title}
              initial={reduce ? false : { opacity: 0, y: 22 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: reduce ? 0 : index * 0.08 }}
              className={styles.valueCard}
            >
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
