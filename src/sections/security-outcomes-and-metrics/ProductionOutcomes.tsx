'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowDown, ArrowUpRight, Plus } from 'lucide-react'
import { Container } from '@/components/homepage/ui/container'
import { SOM_MEASURED, SOM_SYSTEM } from '@/lib/constants/security-outcomes-and-metrics'
import s from './ProductionOutcomes.module.css'

export function ProductionOutcomes() {
  const reduceMotion = useReducedMotion()
  const enter = {
    initial: false as const,
    whileInView: reduceMotion ? undefined : { y: [12, 0], opacity: [0.75, 1] },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.55 },
  }

  return <div className={s.content}>
    <section className={s.results} aria-labelledby="deployments-title">
      <Container>
        <motion.div {...enter}>
          <header className={s.heading}>
            <h2 id="deployments-title">Less queue. More oversight.</h2>
            <p>Two production deployments. A different operating model.</p>
          </header>
          <div className={s.stories}>
            <article className={s.story} aria-labelledby="fintech-title">
              <header><h3 id="fintech-title">Global fintech SOC</h3><p>120K alerts/day · Four regions</p></header>
              <p className={s.keyResult}><strong>7×</strong><span>lower operating cost</span></p>
              <dl className={s.staffing}>
                <div><dt>Before</dt><dd>11 analysts</dd></div>
                <ArrowRight aria-hidden="true" />
                <div><dt>With SIRP</dt><dd className={s.improved}>2 on oversight</dd></div>
              </dl>
              <div className={s.caseAge}><span>Case age</span><p><span>4–6 hours</span><ArrowRight aria-hidden="true" /><strong>Under 30 seconds</strong></p></div>
            </article>
            <article className={s.story} aria-labelledby="saas-title">
              <header><h3 id="saas-title">SaaS infrastructure company</h3><p>Cloud-native environment</p></header>
              <dl className={s.operatingModel}>
                <div><dt>Before</dt><dd>Tiered escalation<small>L1 → L2 → L3</small></dd></div>
                <ArrowDown aria-hidden="true" />
                <div><dt>With SIRP</dt><dd className={s.improved}>One oversight team</dd></div>
              </dl>
              <p className={s.retained}>Zero routine escalations. Team retained.</p>
            </article>
          </div>
        </motion.div>
      </Container>
    </section>

    <section className={s.mechanism} aria-labelledby="architecture-title">
      <Container>
        <div className={s.split}>
          <motion.div {...enter} className={s.explanation}>
            <h2 id="architecture-title">The system handles routine. Your team handles judgment.</h2>
            <p>Detection, investigation and response run on shared context. Policy determines what can execute and what needs a human decision.</p>
            <div className={s.principles}>
            <div><h3>Context before a decision</h3><p>The planner uses the alert, evidence and environment to propose an action. It does not approve that action.</p></div>
            <div><h3>Policy before execution</h3><p>Every proposed action passes through the Autonomy Gate. The executor runs only what your policy allows.</p></div>
            </div>
          </motion.div>
          <motion.div {...enter} className={s.product}>
            <Image src="/images/security-outcomes-and-metrics/system.png" alt="SIRP incident view with a queue of autonomously triaged alerts" width={1262} height={1050} sizes="(max-width: 800px) 90vw, (max-width: 1776px) 46vw, 780px" />
          </motion.div>
        </div>
        <div className={s.oversight}>
          <div><h3>Analysts handle exceptions</h3><p>{SOM_SYSTEM.summary}</p></div>
          <ul aria-label="When an analyst steps in">{SOM_SYSTEM.escalations.map(item => <li key={item}>{item}</li>)}</ul>
        </div>
      </Container>
    </section>

    <section id="measurement" className={s.measurement} aria-labelledby="measurement-title">
      <Container>
        <div className={s.measurementGrid}>
          <h2 id="measurement-title">What the numbers cover.</h2>
          <div className={s.scope}>
            <p className={s.scopeIntro}><strong>3 enterprise SOCs</strong><span>Fintech, SaaS and healthcare</span></p>
            <div className={s.window} role="img" aria-label="Deployment and tuning are excluded. The measured window is 90 days after stabilization.">
              <div className={s.excluded}><span>Deployment &amp; tuning</span><div className={s.ruler} aria-hidden="true" /><small>Excluded</small></div>
              <div className={s.measured}><span>90 days measured</span><div className={s.ruler} aria-hidden="true"><motion.i initial={false} whileInView={reduceMotion ? undefined : { scaleX: [0, 1] }} viewport={{ once: true }} transition={{ duration: 1.1, ease: 'easeOut' }} /></div><small>After stabilization</small></div>
            </div>
            <div className={s.chain}><p>Measured end to end</p><ol>{['Detection', 'Triage', 'Decision', 'Containment'].map(step => <li key={step}>{step}</li>)}</ol></div>
            <details className={s.exclusions}><summary>Scope and exclusions<Plus size={18} aria-hidden="true" /></summary><p>Millions of alerts across EDR, cloud, identity, SaaS and endpoint environments. Results cover detection through containment.</p><p>{SOM_MEASURED.excluded}</p></details>
            <Link className={s.methodLink} href={SOM_MEASURED.trustCenterCta.href}>Read the methodology<ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </Container>
    </section>
  </div>
}
