'use client'

import { motion } from 'framer-motion'
import AlertDotField from '@/components/shared/AlertDotField'
import { PROBLEM_DATA } from '@/lib/constants/saads-home'
import { glueLastWords } from '@/lib/utils'

/* ─── Types ──────────────────────────────────────────────── */
interface ProblemData {
  eyebrow: string
  stat: string
  body: string
  citation?: string
}

interface ProblemSectionProps {
  data?: ProblemData
  /** Slimmer padding, heading, and dot field — for use alongside other dense sections. */
  compact?: boolean
  /** Share of dots shown lit (purple). Defaults to the "minority investigated" framing. */
  litRatio?: number
  /** Label for the lit (purple) dots in the legend. */
  legendLit?: string
  /** Label for the dim dots in the legend. */
  legendDim?: string
  /** Verb phrase for the lit share in the dot field's accessible label (e.g. "get investigated"). */
  dotAriaLitLabel?: string
  /** Light (off-white) surface with dark text, instead of the default dark surface. */
  light?: boolean
}

/* ─── Component ──────────────────────────────────────────── *
 * Sparse by design. One stark stat treatment, lots of negative space.
 * This is the setup; the punchline is the rest of the page. */
export function ProblemSection({
  data = PROBLEM_DATA,
  compact = false,
  litRatio = 0.37,
  legendLit = 'investigated',
  legendDim = 'sampled, snoozed, or aged out',
  dotAriaLitLabel = 'get investigated',
  light = false,
}: ProblemSectionProps) {
  const { eyebrow, stat, body, citation } = data

  return (
    <section className={`overflow-hidden ${light ? 'bg-[#f6f5f8]' : 'bg-[#121218]'} ${compact ? 'py-16 md:py-20' : 'py-24 md:py-[140px]'}`}>
      <div className="container-sirp">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-[820px] mx-auto text-center"
        >
          {/* Eyebrow — IBM Plex Mono uppercase */}
          <span className={`font-mono text-[11px] font-medium tracking-[0.08em] uppercase ${light ? 'text-black/60' : 'text-white/45'}`}>
            {eyebrow}
          </span>

          {/* Stark stat */}
          <h2
            className={`font-sans font-bold ${light ? 'text-black' : 'text-white'} mt-6 ${compact ? 'mb-4' : 'mb-6'}`}
            style={{
              fontSize: compact ? 'clamp(1.75rem, 4vw, 2.75rem)' : 'clamp(2.25rem, 6vw, 4.5rem)',
              lineHeight: '1.08',
              letterSpacing: '-0.03em',
            }}
          >
            {glueLastWords(stat)}
          </h2>

          {/* Proportional dot field — one dot per daily alert, the
              investigated minority lit, the rest draining away. */}
          <div
            className={compact ? 'mx-auto' : 'mx-auto min-h-105'}
            style={{ maxWidth: compact ? '380px' : '520px' }}
          >
            <AlertDotField
              dotSize={compact ? 3 : 4}
              investigatedRatio={litRatio}
              litLabel={dotAriaLitLabel}
              dimColor={light ? '#ffffff' : '#222228'}
            />
          </div>

          {/* Legend — mono caption style matching the eyebrow. */}
          <div className={`flex items-center justify-center gap-6 font-mono text-[11px] uppercase tracking-[0.08em] ${light ? 'text-black/60' : 'text-white/45'} ${compact ? 'mt-3' : 'mt-5'}`}>
            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-block h-2.5 w-2.5"
                style={{ backgroundColor: '#8e2dff' }}
              />
              {legendLit}
            </span>
            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-block h-2.5 w-2.5"
                style={{ backgroundColor: light ? '#c9c6d2' : '#222228' }}
              />
              {legendDim}
            </span>
          </div>

          <p
            className={`font-sans text-base md:text-lg leading-[1.8] max-w-[620px] mx-auto ${compact ? 'mt-6' : 'mt-12'}`}
            style={{ color: light ? 'rgba(0, 0, 0, 0.75)' : 'rgba(255, 255, 255, 0.6)' }}
          >
            {body}
          </p>

          {/* Citation footnote — small, muted. */}
          {citation && (
            <p
              className={`font-mono text-[10px] tracking-[0.04em] max-w-[620px] mx-auto ${compact ? 'mt-3' : 'mt-6'}`}
              style={{ color: light ? 'rgba(0, 0, 0, 0.45)' : 'rgba(255, 255, 255, 0.3)' }}
            >
              {citation}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
