'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { SOM_DEPLOYMENTS, SOM_WHY } from '@/lib/constants/security-outcomes-and-metrics'
import s from './OutcomeEvidence.module.css'

export function DeploymentEvidence() {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  return <div className={s.evidence}>
    <div className={s.tabs} role="tablist" aria-label="Deployment examples">
      {SOM_DEPLOYMENTS.items.map((item, index) => <button key={item.id} ref={node => { refs.current[index] = node }} type="button" role="tab" aria-label={item.company} id={`case-tab-${item.id}`} aria-controls={`case-panel-${item.id}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => {
        if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return
        event.preventDefault()
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? 1 : 1 - active
        setActive(next); refs.current[next]?.focus()
      }}>{item.company}</button>)}
    </div>
    {SOM_DEPLOYMENTS.items.map((item, index) => <div key={item.id} role="tabpanel" id={`case-panel-${item.id}`} aria-labelledby={`case-tab-${item.id}`} hidden={active !== index} tabIndex={0}>
      <article className={s.caseStory}>
        <div className={s.caseIntro}>
        <h3 className={s.result}><strong>{index === 0 ? '7×' : '92%'}</strong><span>{index === 0 ? 'cost reduction' : 'autonomous actions'}</span></h3>
        <div className={s.tags}>{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <p className={s.outcomeLine}>{item.results}</p>
        </div>
        <div className={s.transformation}>
          <div><span className={s.kicker}>Before SIRP</span><p>{item.before}</p></div>
          <div className={s.operatingNow}><span className={s.kicker}>With SIRP</span><p>{item.after}</p></div>
        </div>
        <blockquote className={s.quote}><p>{item.quote}</p><cite>{item.company} · {item.quoteLabel}</cite></blockquote>
      </article>
    </div>)}
  </div>
}

const impact = ['Reason before acting.', 'Policy before execution.', 'No analyst queue.', 'Close. Escalate. Re-plan.']

export function OutcomeMechanism() {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  return <div className={s.mechanism}>
    <div className={s.steps} role="tablist" aria-label="Governed loop stages">
      {SOM_WHY.stages.map((stage, index) => <button key={stage.id} ref={node => { refs.current[index] = node }} type="button" role="tab" id={`loop-tab-${stage.id}`} aria-controls={`loop-panel-${stage.id}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => {
        if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return
        event.preventDefault()
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? 3 : (active + (event.key === 'ArrowRight' ? 1 : 3)) % 4
        setActive(next); refs.current[next]?.focus()
      }}><Image src={`/images/omnisense/architecture-${stage.id}.svg`} alt="" width={402} height={280} sizes="(max-width: 700px) 42vw, 23vw" />{stage.label}</button>)}
    </div>
    {SOM_WHY.stages.map((stage, index) => <div key={stage.id} role="tabpanel" id={`loop-panel-${stage.id}`} aria-labelledby={`loop-tab-${stage.id}`} hidden={active !== index} tabIndex={0}>
      <div className={s.stageContent}>
        <h3>{impact[index]}</h3><div><p>{stage.body}</p><a href="/omnisense">Explore OmniSense <ArrowRight size={16} /></a></div>
      </div>
    </div>)}
  </div>
}
