'use client'

import { useId, useState } from 'react'
import './FaqAccordionSection.css'

export type FaqAccordionItem = {
  question: string
  answer: string
}

export type FaqAccordionSectionData = {
  heading: string
  items: readonly FaqAccordionItem[]
}

type FaqAccordionSectionProps = {
  data: FaqAccordionSectionData
  /** Index of the item open on first render, or `null` for all closed. Omitted defaults to all closed. */
  defaultOpenIndex?: number | null
}

export function FaqAccordionSection({ data, defaultOpenIndex = null }: FaqAccordionSectionProps) {
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex)

  return (
    <section className="faq-accordion-section">
      <div className="container-sirp">
        <h2 className="faq-accordion-heading">{data.heading}</h2>

        <div className="faq-accordion-list">
          {data.items.map((item, index) => {
            const isOpen = openIndex === index
            const headerId = `${baseId}-h-${index}`
            const panelId = `${baseId}-p-${index}`

            return (
              <div key={item.question} className={`faq-accordion-pill${isOpen ? ' is-open' : ''}`}>
                <button
                  type="button"
                  id={headerId}
                  className="faq-accordion-trigger"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="faq-accordion-question">{item.question}</span>
                  <span className="faq-accordion-toggle" aria-hidden>
                    <span className="faq-accordion-toggle-char faq-accordion-toggle-char--plus">+</span>
                    <span className="faq-accordion-toggle-char faq-accordion-toggle-char--minus">−</span>
                  </span>
                </button>

                <div
                  className={`faq-accordion-collapse${isOpen ? ' is-open' : ''}`}
                  aria-hidden={!isOpen}
                >
                  <div className="faq-accordion-collapse-inner">
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={headerId}
                      className="faq-accordion-panel"
                    >
                      <p className="faq-accordion-answer">{item.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
