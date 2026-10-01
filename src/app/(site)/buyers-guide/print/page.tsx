import type { Metadata } from 'next'
import Link from 'next/link'
import { buyersGuideContent } from '../content'
import { PrintButton } from './PrintButton'
import './print.css'

export const metadata: Metadata = {
  title: "Printable Buyer’s Scorecard | SIRP",
  description: 'Eight questions to evaluate an Autonomous SOC or SOAR platform, with weak and strong answers.',
  robots: { index: false, follow: true },
}

export default function PrintableScorecard() {
  return (
    <article className="buyers-print-page">
      <div className="buyers-print-toolbar">
        <Link href="/buyers-guide">← Back to the guide</Link>
        <PrintButton />
      </div>
      <header className="buyers-print-header">
        <span>SIRP / BUYER&apos;S GUIDE</span>
        <h1>Eight questions worth asking any finalist.</h1>
        <p>Use the same questions for every vendor. Record the answer you hear and compare it with the weak and strong examples below.</p>
      </header>
      <div className="buyers-print-list">
        {buyersGuideContent.scorecard.rows.map((row) => (
          <section className="buyers-print-question" key={row.num}>
            <div className="buyers-print-question-head"><span>{row.num} / 08</span><h2>{row.title}</h2></div>
            <dl>
              <div><dt>Ask</dt><dd>{row.ask}</dd></div>
              <div><dt>Weak</dt><dd>{row.weak}</dd></div>
              <div><dt>Strong</dt><dd>{row.strong}</dd></div>
            </dl>
            <div className="buyers-print-notes"><span>Vendor answer / notes</span></div>
          </section>
        ))}
      </div>
      <footer className="buyers-print-footer">SIRP OmniSense™ · Evaluate the architecture, governance, and operating model.</footer>
    </article>
  )
}
