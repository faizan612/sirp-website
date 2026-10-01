'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/homepage/ui/badge'
import { SOM_OUTCOMES } from '@/lib/constants/security-outcomes-and-metrics'
import s from './OutcomesScroll.module.css'

const stories = [
  { value: 'Seconds.', label: 'From policy check to execution', copy: 'Act inside the containment window. Every action is checked before it runs—not after a ticket is picked up.', short: 'Respond sooner' },
  { value: '~1,500', label: 'Investigations resolved autonomously / day', copy: 'Handle more investigations without a matching hiring plan. The loop runs independently of analyst availability.', short: 'Scale the operation' },
  { value: '<1 hour', label: 'Analyst time / day, down from 150 hours', copy: 'Give analysts the judgment calls, not the queue. Sara brings escalated cases with the reasoning already attached.', short: 'Refocus the team' },
  { value: '~$100K', label: 'Annual cost, down from $800K–$1M', copy: 'Shift routine investigation from shift coverage to compute. Capacity scales as infrastructure, not headcount.', short: 'Flatten the cost curve' },
] as const

export function OutcomesScroll() {
  const root = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!window.matchMedia) return
    const query = window.matchMedia('(prefers-reduced-motion: no-preference)')
    const element = root.current
    if (!element) return
    const cards = Array.from(element.querySelectorAll<HTMLElement>('[data-outcome]'))
    let frame = 0
    const update = () => {
      frame = 0
      const center = window.innerHeight * .55
      let closest = 0
      let distance = Infinity
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect()
        const delta = Math.abs(rect.top + rect.height / 2 - center)
        if (delta < distance) { closest = index; distance = delta }
        const focus = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight * .65)))
        card.style.setProperty('--focus', String(focus))
      })
      setActive(closest)
      element.style.setProperty('--progress', String((closest + 1) / cards.length))
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    const configure = () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frame)
      frame = 0
      if (query.matches) {
        element.dataset.motion = 'true'
        window.addEventListener('scroll', schedule, { passive: true })
        window.addEventListener('resize', schedule)
        schedule()
      } else {
        delete element.dataset.motion
        cards.forEach(card => card.style.removeProperty('--focus'))
        element.style.removeProperty('--progress')
      }
    }
    configure()
    query.addEventListener('change', configure)
    return () => {
      query.removeEventListener('change', configure)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className={s.story} ref={root}>
      <div className={s.sticky}>
        <Badge variant="light">The operating model</Badge>
        <h2 id="changes-title">Less queue.<br />More control.</h2>
        <p>One governed loop changes how your SOC responds, scales, and spends.</p>
        <nav aria-label="Explore the four outcomes" className={s.navigation}>
          {stories.map((story, index) => <a key={story.short} href={`#outcome-${index + 1}`} aria-current={index === active ? 'step' : undefined}><span>0{index + 1}</span>{story.short}<ArrowUpRight size={16} aria-hidden="true" /></a>)}
        </nav>
        <div className={s.progress} aria-hidden="true"><span /></div>
        <span className={s.hint}><ArrowDown size={14} /> Scroll to explore</span>
      </div>
      <div className={s.cards}>
        {SOM_OUTCOMES.items.map((item, index) => <div key={item.id} data-outcome><article id={`outcome-${index + 1}`} className={s.card}>
          <span className={s.cardNumber} aria-hidden="true">{index + 1}</span>
          <div className={s.cardCopy}>
          <h3>{item.title}</h3>
          <p>{stories[index].copy}</p>
          </div>
          <div className={s.result}>
            <strong className={s.value}>{stories[index].value}</strong>
            <span className={s.label}>{stories[index].label}</span>
          </div>
          <details><summary>How it works <span aria-hidden="true">+</span></summary><p>{item.description}</p></details>
        </article></div>)}
      </div>
    </div>
  )
}
