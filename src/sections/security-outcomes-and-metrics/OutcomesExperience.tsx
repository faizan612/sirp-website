import Link from 'next/link'
import { ArrowDown } from 'lucide-react'
import { Badge } from '@/components/homepage/ui/badge'
import { Container } from '@/components/homepage/ui/container'
import { PrimaryButton } from '@/components/homepage/ui/primary-button'
import { SocCta } from '@/components/homepage/sections/soc-cta'
import { STATS_DATA } from '@/lib/constants/home'
import { SOM_HERO, SOM_SOC_COMPARISON } from '@/lib/constants/security-outcomes-and-metrics'
import { ProductionOutcomes } from './ProductionOutcomes'
import { OutcomesScroll } from './OutcomesScroll'
import s from './OutcomesExperience.module.css'

export function OutcomesExperience() {
  return (
    <>
    <div className={`homepage-design ${s.page}`}>
      <section className={s.hero} aria-labelledby="outcomes-title">
        <Container>
          <div className={s.intro}>
            <Badge>{SOM_HERO.eyebrow}</Badge>
            <h1 id="outcomes-title">Production data from<br />a governed loop.</h1>
            <p>Faster response. Less routine work. Security decisions governed by policy—not by the length of a queue.</p>
            <div className={s.actions}>
              <PrimaryButton href={SOM_HERO.cta.href}>{SOM_HERO.cta.label}</PrimaryButton>
              <Link href="#measurement" className={s.secondary}>How we measured it <ArrowDown size={16} /></Link>
            </div>
          </div>
          <div className={s.heroMetrics}>
            {STATS_DATA.stats.map(stat => (
              <a key={stat.label} href="#results" className={s.heroMetric}>
                <strong>{stat.value}<span>%</span></strong>
                <span className={s.metricLabel}>{stat.label}</span>
              </a>
            ))}
          </div>
          <p className={s.heroNote}>Reported production outcomes · 3 enterprise SOCs · 90-day post-stabilization window</p>
        </Container>
      </section>

      <section id="results" className={s.light} aria-labelledby="changes-title">
        <Container className={s.section}>
          <OutcomesScroll />
          <details className={s.comparison}>
            <summary><span className={s.disclosureTitle}><small>THE RESPONSE PATH</small>Compare the incident journey</span><span>Illustrative timings <ArrowDown size={18} /></span></summary>
            <div className={s.comparisonGrid}>{[SOM_SOC_COMPARISON.human, SOM_SOC_COMPARISON.autonomous].map(column => <div key={column.label}><h3>{column.label}</h3><ol>{column.steps.map(step => <li key={step.label}><span>{step.label}</span><strong>{step.durationLabel}</strong></li>)}</ol></div>)}</div>
            <p>Illustrative workflow comparison, not verified deployment telemetry. Actual timings depend on the incident, integrations, and policy.</p>
          </details>
        </Container>
      </section>

      <ProductionOutcomes />
    </div>
    <div className="homepage-design"><SocCta /></div>
    </>
  )
}
