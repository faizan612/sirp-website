import type { ReactNode } from 'react'
import './StatementLinesSection.css'

export type StatementLinesSectionProps = {
  heading: ReactNode
  children: ReactNode
}

export function StatementLinesSection({ heading, children }: StatementLinesSectionProps) {
  return (
    <section className="statement-lines-section">
      <div className="container-sirp statement-lines-inner">
        <h2 className="statement-lines-heading">{heading}</h2>
        <div className="statement-lines-body">{children}</div>
      </div>
    </section>
  )
}
