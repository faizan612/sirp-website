'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Eyebrow } from './Eyebrow'
import './ComparisonTableSection.css'

type ComparisonCard = {
  title: string
  points: readonly string[]
}

export type ComparisonTableData = {
  heading: string
  cards: readonly ComparisonCard[]
  redesign?: {
    heading: string
    paragraphs: readonly string[]
  }
}

type ComparisonTableSectionProps = {
  data: ComparisonTableData
}

/**
 * S9 — the page's most linkable/snippet-able asset, promoted from stacked
 * text to a real two-column table. Reads the existing comparison copy and
 * zips the two cards' points into paired rows (single source of truth).
 * Autonomous column carries the accent. Stacks to paired rows on mobile.
 */
export function ComparisonTableSection({ data }: ComparisonTableSectionProps) {
  const reduce = useReducedMotion()
  const [automated, autonomous] = data.cards
  const rowCount = Math.max(automated?.points.length ?? 0, autonomous?.points.length ?? 0)
  const rows = Array.from({ length: rowCount }, (_, i) => ({
    automated: automated?.points[i] ?? '',
    autonomous: autonomous?.points[i] ?? '',
  }))

  const reveal = reduce
    ? {}
    : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } }

  return (
    <section className="bg-[#121218] py-24 wsoc-compare">
      <div className="container-sirp">
        <motion.div {...reveal} className="wsoc-compare-head">
          <Eyebrow id="wsoc-compare-eyebrow">Comparison</Eyebrow>
          <h2 className="wsoc-compare-heading">{data.heading}</h2>
        </motion.div>

        <motion.div {...reveal} className="wsoc-compare-table-wrap">
          <table className="wsoc-compare-table">
            <caption className="sr-only">{data.heading}</caption>
            <thead>
              <tr>
                <th scope="col" className="wsoc-compare-th wsoc-compare-th--automated">
                  {automated?.title}
                </th>
                <th scope="col" className="wsoc-compare-th wsoc-compare-th--autonomous">
                  {autonomous?.title}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={`${row.automated}|${row.autonomous}`}>
                  <td className="wsoc-compare-td wsoc-compare-td--automated" data-label={automated?.title}>
                    {row.automated}
                  </td>
                  <td className="wsoc-compare-td wsoc-compare-td--autonomous" data-label={autonomous?.title}>
                    {row.autonomous}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {data.redesign ? (
          <motion.div {...reveal} className="wsoc-compare-redesign">
            <h3 className="wsoc-compare-redesign-heading">{data.redesign.heading}</h3>
            <div className="wsoc-compare-redesign-body">
              {data.redesign.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        ) : null}
      </div>
    </section>
  )
}
