import type { ReactNode } from 'react'
import './SectionLead.css'

export type SectionLeadProps = {
  heading: ReactNode
  subheading: ReactNode
  children?: ReactNode
}

export function SectionLead({ heading, subheading, children }: SectionLeadProps) {
  return (
    <section className="section-lead">
      <div className="container-sirp section-lead-inner">
        <h2 className="section-lead-heading">{heading}</h2>
        <div className="section-lead-subheading">{subheading}</div>
        {children ? <div className="section-lead-children">{children}</div> : null}
      </div>
    </section>
  )
}
