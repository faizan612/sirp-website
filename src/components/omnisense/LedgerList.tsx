'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

export interface LedgerRow {
  label: string
  value: string
}

export interface LedgerListProps {
  rows: LedgerRow[]
  excluded: string
  methodologyHref: string
}

/**
 * Audit-ledger treatment for the methodology section — a thin-ruled list
 * instead of four boxes, ending in a receipt-style "Excluded:" total line.
 */
export function LedgerList({ rows, excluded, methodologyHref }: LedgerListProps) {
  const reduce = useReducedMotion()

  return (
    <div className="mx-auto max-w-[720px]">
      <div className="border-t border-white/10">
        {rows.map((row, i) => (
          <motion.div
            key={row.label}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: reduce ? 0 : i * 0.06 }}
            className="flex flex-col gap-1 border-b border-white/10 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
          >
            <span className="font-mono text-sm uppercase tracking-[0.06em] text-white">{row.label}</span>
            <span className="font-sans text-[14px] leading-snug text-white/60 sm:max-w-[380px] sm:text-right">
              {row.value}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 border-t-2 border-white/20 pt-5 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.06em] text-white/50">
          <span className="underline decoration-white/30 underline-offset-4">Excluded:</span>{' '}
          {excluded}
        </p>
        <Link
          href={methodologyHref}
          className="mt-4 inline-block font-sans text-[13px] text-[#b060ff] underline underline-offset-[3px] hover:text-[#d8b3ff]"
        >
          Read the full methodology in the Trust Center
        </Link>
      </div>
    </div>
  )
}
