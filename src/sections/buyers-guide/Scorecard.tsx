'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, Minus } from 'lucide-react'
import type { buyersGuideContent } from '@/app/(site)/buyers-guide/content'
import { Badge } from '@/components/homepage/ui/badge'
import { Container } from '@/components/homepage/ui/container'
import './Scorecard.css'

type ScorecardProps = { data: (typeof buyersGuideContent)['scorecard'] }

export function Scorecard({ data }: ScorecardProps) {
  const [active, setActive] = useState(0)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    const followLink = () => {
      const index = data.rows.findIndex(row => `#criterion-${row.num}` === window.location.hash)
      if (index >= 0) setActive(index)
    }
    followLink()
    window.addEventListener('hashchange', followLink)
    return () => window.removeEventListener('hashchange', followLink)
  }, [data.rows])

  function select(index: number, focus = false) {
    setActive(index)
    window.history.replaceState(null, '', `#criterion-${data.rows[index].num}`)
    if (focus) buttons.current[index]?.focus()
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = data.rows.length - 1
    let next: number
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = index === last ? 0 : index + 1
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = index === 0 ? last : index - 1
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = last
    else return
    event.preventDefault()
    select(next, true)
  }

  return (
    <section className="bg-scorecard" id="scorecard" aria-labelledby="guide-scorecard-title">
      <Container>
        <header className="bg-scorecard-intro">
          <Badge>{data.eyebrow}</Badge>
          <h2 id="guide-scorecard-title" className="bg-scorecard-heading">{data.heading}</h2>
          <p className="bg-scorecard-lead">{data.lead}</p>
        </header>

        <div className="bg-scorecard-frame">
          <div className="bg-scorecard-tabs" role="tablist" aria-label="Evaluation criteria">
            {data.rows.map((row, index) => (
              <button
                key={row.num}
                ref={node => { buttons.current[index] = node }}
                type="button"
                role="tab"
                id={`criterion-${row.num}`}
                aria-controls={`answer-${row.num}`}
                aria-selected={active === index}
                tabIndex={active === index ? 0 : -1}
                onClick={() => select(index)}
                onKeyDown={event => onKeyDown(event, index)}
              >
                <span>{row.num}</span><span>{row.title}</span>
              </button>
            ))}
          </div>

          <div className="bg-scorecard-content">
            {data.rows.map((row, index) => (
              <div
                key={row.num}
                id={`answer-${row.num}`}
                className="bg-question-panel"
                role="tabpanel"
                aria-labelledby={`criterion-${row.num}`}
                tabIndex={0}
                hidden={active !== index}
              >
                {/* The criterion title and its number are already shown, and
                    highlighted, in the tab list alongside — repeating them here
                    as a topline plus a 48px display numeral was chrome restating
                    state the user can already see. */}
                <span className="bg-question-label">Ask the vendor</span>
                <h3>{row.ask}</h3>
                <div className="bg-question-answers">
                  <div className="bg-question-answer bg-question-answer--weak">
                    <span className="bg-question-answer-label"><Minus size={17} aria-hidden="true" />Weak answer</span>
                    <p>{row.weak}</p>
                  </div>
                  <div className="bg-question-answer bg-question-answer--strong">
                    <span className="bg-question-answer-label"><Check size={17} aria-hidden="true" />Strong answer</span>
                    <p>{row.strong}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="bg-scorecard-controls">
              {/* Position counter only — the eight progress dashes said the
                  same thing a second time, next to a tab list that says it a
                  third. */}
              <div className="bg-scorecard-position">
                <span>Question {data.rows[active].num} <span>of 08</span></span>
              </div>
              <div className="bg-scorecard-arrows">
                <button type="button" aria-label="Previous question" disabled={active === 0} onClick={() => select(active - 1, true)}><ArrowLeft size={19} /></button>
                <button type="button" aria-label="Next question" disabled={active === data.rows.length - 1} onClick={() => select(active + 1, true)}><ArrowRight size={19} /></button>
              </div>
            </div>
          </div>
        </div>
        <p className="bg-scorecard-document"><Link href="/buyers-guide/print">Read all eight questions as one document <ArrowRight size={16} aria-hidden="true" /></Link></p>
      </Container>
    </section>
  )
}
