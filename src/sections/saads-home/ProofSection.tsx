'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { PROOF_DATA } from '@/lib/constants/saads-home'

/* ─── Types ──────────────────────────────────────────────── */
interface ProofStat {
  value: string
  label: string
  proof: string
}

interface ProofData {
  eyebrow: string
  heading: string
  headingItalic: string
  methodologyHref: string
  methodologyNote: string
  stats: readonly ProofStat[]
  quote: { text: string; attribution: string } | null
}

interface ProofSectionProps {
  data?: ProofData
}

/* ─── Stat card ──────────────────────────────────────────── *
 * Pill-shaped card per the redesign (Figma node 1086:2031): value +
 * label live inside the card, the mono proof line sits underneath. */
function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex min-h-[140px] md:min-h-[185px] w-full flex-col items-center justify-center gap-1.5 rounded-full border border-[#292929] bg-[#0E0E0E] px-8 py-8 text-center">
      <span
        className="font-['Inter',sans-serif] font-normal text-[#f7f7f7] leading-none"
        style={{ fontSize: 'clamp(2.5rem, 6vw, 5.25rem)', letterSpacing: '-0.03em' }}
      >
        {value}
      </span>
      <span
        className="font-['Inter',sans-serif] font-normal text-[#ccc] text-base md:text-xl"
        style={{ letterSpacing: '-0.03em' }}
      >
        {label}
      </span>
    </div>
  )
}

/* ─── Component ──────────────────────────────────────────── *
 * Every claim sits next to its receipt. The numeral and label land
 * immediately; the mono proof line under each stat carries the math
 * and fades up, staggered left to right, on first scroll into view.
 * One footnote qualifies all three. */
export function ProofSection({ data = PROOF_DATA }: ProofSectionProps) {
  const { eyebrow, heading, headingItalic, methodologyHref, methodologyNote, stats, quote } = data
  const reduceMotion = useReducedMotion()

  return (
    <section className="bg-[#121218] border-b border-[#3a3a4c] py-16 md:py-[100px] overflow-hidden">
      <div className="container-sirp">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-[680px] mx-auto mb-12 md:mb-14"
        >
          <span className="font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-white/45">
            {eyebrow}
          </span>
          <h2
            className="font-sans font-bold text-white mt-4 text-balance"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: '1.12',
              letterSpacing: '-0.03em',
            }}
          >
            {heading} <em>{headingItalic.replace(/\s+(\S+)$/, ' $1')}</em>
          </h2>
        </motion.div>

        {/* Metrics row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-10">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <StatCard value={stat.value} label={stat.label} />
              <motion.span
                className="font-mono text-[11px] md:text-[12px] tracking-[0.08em] text-purple mt-3 max-w-60"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.12 }}
              >
                {stat.proof}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Methodology footnote */}
        <p className="text-center font-mono text-[11px] tracking-[0.04em] text-white/40 mt-12">
          {methodologyNote}{' '}
          <Link
            href={methodologyHref}
            className="text-white/40 underline underline-offset-2 hover:text-white transition-colors"
          >
            Methodology
          </Link>
        </p>

        {/* Quote slot */}
        {quote ? (
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-[720px] mx-auto text-center mt-16 border-t border-[#3a3a4c] pt-12"
          >
            <p className="font-['Noto_Serif',serif] italic text-white text-xl md:text-2xl leading-[1.5]">
              &ldquo;{quote.text}&rdquo;
            </p>
            <footer className="font-sans text-white/50 text-sm mt-5">{quote.attribution}</footer>
          </motion.blockquote>
        ) : (
          // TODO: secure one referenceable quote or anonymized case vignette
          // ("Gulf energy enterprise, 40-person SOC"). Outsells everything above.
          <div className="max-w-[720px] mx-auto text-center mt-16 border-t border-[#3a3a4c] pt-12">
            <span className="inline-block font-mono text-[10px] uppercase tracking-widest text-amber-400/70 border border-amber-400/30 rounded px-2 py-1">
              Customer quote slot, pending reference
            </span>
          </div>
        )}

      </div>
    </section>
  )
}
