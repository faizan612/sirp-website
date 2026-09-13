'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { BODY, EYEBROW, HEADLINE, PRIMARY_CTA, SECONDARY_CTA } from '@/content/omnisense/worstAlert'
import './worst-alert-section.css'

const GLYPHS = ['▓', '░', '▒', '#', '%', '&', '$', '0', '1', '¤', '§', '†', '■', '◆']

/** Deterministic — same scrambled glyph on server and client, so there's
 * no hydration mismatch and no need to defer to a client-only effect. */
function scramble(char: string, seed: number): string {
  if (!/[a-zA-Z]/.test(char)) return char
  return GLYPHS[(char.charCodeAt(0) + seed) % GLYPHS.length]
}

interface CorruptHeadlineProps {
  text: string
  className?: string
  style?: React.CSSProperties
}

/** The headline is the interactive surface: renders corrupted (jittery,
 * red-tinted look-alike glyphs) until the section scrolls into view, then
 * settles word-by-word into the clean, confident headline. The accessible
 * name is always the real text via aria-label — the fragmented visual
 * markup is aria-hidden. Reduced motion skips the corrupted state
 * entirely and renders clean from the first paint. */
function CorruptHeadline({ text, className, style }: CorruptHeadlineProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const prefersReducedMotion = useReducedMotion()
  const [resolved, setResolved] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion) {
      setResolved(true)
      return
    }
    if (inView) setResolved(true)
  }, [inView, prefersReducedMotion])

  const words = text.split(' ')
  const showClean = resolved || !!prefersReducedMotion

  return (
    <h2 ref={ref} aria-label={text} className={className} style={style}>
      <span
        className="wa-corrupt-headline"
        data-resolved={showClean}
        aria-hidden="true"
      >
        {words.map((word, wi) => (
          <span
            key={wi}
            className="wa-corrupt-word"
            style={{ '--wa-settle-delay': `${wi * 70}ms` } as React.CSSProperties}
          >
            {word.split('').map((ch, ci) => (
              <span key={ci} className="wa-corrupt-char">
                {showClean ? ch : scramble(ch, wi * 10 + ci)}
              </span>
            ))}
            {wi < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
    </h2>
  )
}

export function BringYourWorstAlert() {
  return (
    <section className="worst-alert-section py-16 md:py-20 lg:py-24">
      <div className="container-sirp">
        <div className="mx-auto flex max-w-[720px] flex-col items-center gap-5 text-center md:gap-6">

          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25 }}
            className="font-sans text-sm"
            style={{ color: 'var(--wa-text-muted)' }}
          >
            {EYEBROW}
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: 0.07 }}
          >
            <CorruptHeadline
              text={HEADLINE}
              className="font-sans font-medium text-balance"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                lineHeight: '1.15',
                letterSpacing: '-0.02em',
                color: 'var(--wa-text-primary)',
              }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: 0.14 }}
            className="font-sans text-base md:text-lg leading-[1.65] max-w-[560px]"
            style={{ color: 'var(--wa-text-secondary)' }}
          >
            {BODY}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: 0.21 }}
            className="mt-2 flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
          >
            <Link
              href={PRIMARY_CTA.href}
              className="inline-flex items-center justify-center rounded-full bg-[#8e2dff] px-8 py-4 font-sans text-base font-semibold text-white shadow-[0_0_28px_rgba(142,45,255,0.4)] transition-all duration-200 hover:bg-[#a855f7] hover:shadow-[0_0_36px_rgba(142,45,255,0.55)]"
            >
              {PRIMARY_CTA.label}
            </Link>
            <a
              href={SECONDARY_CTA.href}
              className="font-sans text-base font-medium underline decoration-black/25 underline-offset-4 transition-colors duration-200 hover:decoration-black/60"
              style={{ color: 'var(--wa-text-secondary)' }}
            >
              {SECONDARY_CTA.label}
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
