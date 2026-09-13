'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { GOVERNED_DATA } from '@/lib/constants/saads-home'
import { glueLastWords } from '@/lib/utils'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

/* ─── Types ──────────────────────────────────────────────── */
interface GovernedData {
  eyebrow: string
  heading: string
  headingItalic: string
  body: string
  modes: Record<'Assist mode' | 'Autonomous mode', string>
  cta: { label: string; href: string }
}

interface GovernedAutonomySectionProps {
  data?: GovernedData
}

const tabs = ['Assist mode', 'Autonomous mode'] as const

/* Split a string into [first N words, remaining words] for inserting a
 * desktop line break between them. Trailing fragment keeps its spacing. */
function splitAfterWord(text: string, n: number): [string, string] {
  const words = text.trim().split(/\s+/)
  return [words.slice(0, n).join(' '), words.slice(n).join(' ')]
}

/* ─── Component ──────────────────────────────────────────── *
 * Two-column split: left-anchored copy, right-hand mode widget.
 * The widget's own tabs are the single mode control — there is no
 * separate external toggle. Tab state drives both the per-mode
 * description and the Lottie visual. */
export function GovernedAutonomySection({ data = GOVERNED_DATA }: GovernedAutonomySectionProps) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('Assist mode')
  const { eyebrow, heading, headingItalic, body, modes, cta } = data

  // Desktop three-line headline. The visual breaks fall after the third
  // word of each fragment, straddling the standard/italic boundary:
  //   line 1: heading words 1–3   ("Autonomy without governance")
  //   line 2: heading rest + italic words 1–3
  //   line 3: italic rest          ("to be wrong.")
  // Derived from the data strings so the copy stays the single source.
  const [headingBefore, headingAfter] = splitAfterWord(heading, 3)
  const [italicBefore, italicAfter] = splitAfterWord(headingItalic, 3)

  return (
    <section
      className="border-y border-border py-16 md:py-25 overflow-hidden"
      style={{ background: 'linear-gradient(#161620 0%, #121218 30%)' }}
    >
      <div className="container-sirp">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-start">

          {/* ── Left column: copy, left-aligned ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <span className="font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-white/45">
              {eyebrow}
            </span>
            <h2
              className="font-sans font-bold text-white mt-4 mb-5 text-balance"
              style={{
                fontSize: 'clamp(1.875rem, 3.4vw, 3rem)',
                lineHeight: '1.1',
                letterSpacing: '-0.03em',
              }}
            >
              {/* Strings come from data; only <br>s are injected for the
                  desktop three-line set (line 1: "Autonomy without
                  governance", line 2: "is just a faster way", line 3:
                  "to be wrong."). The breaks straddle the standard/italic
                  boundary, so each fragment is split at the right word.
                  Below lg the <br>s collapse and the column rewraps. */}
              {headingBefore}{' '}
              <br className="hidden lg:inline" />
              {headingAfter} <em>{italicBefore}{' '}<br className="hidden lg:inline" />{glueLastWords(italicAfter)}</em>
            </h2>
            <p className="font-sans text-white/60 leading-[1.75] text-base md:text-lg max-w-[520px]">
              {body}
            </p>

            {/* CTA */}
            <div className="mt-8">
              <Link
                href={cta.href}
                className="inline-flex items-center gap-2 font-sans font-medium text-white text-base no-underline hover:gap-3 transition-all duration-200"
              >
                {cta.label}
                <ArrowRight className="w-4 h-4 text-[#8e2dff]" />
              </Link>
            </div>
          </motion.div>

          {/* ── Right column: mode widget ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7"
          >
            {/* Widget tabs — the single mode control, anchored to the
                right edge to mirror the left-anchored eyebrow. */}
            <div role="tablist" aria-label="Autonomy mode" className="flex w-full max-w-[380px] lg:ml-auto">
              {tabs.map((tab, i) => {
                const isActive = activeTab === tab
                const isFirst = i === 0
                return (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      height: '38px',
                      padding: '8px 20px',
                      fontSize: '12px',
                      fontWeight: 600,
                      fontFamily: 'Inter, sans-serif',
                      color: '#ffffff',
                      cursor: 'pointer',
                      border: 'none',
                      outline: 'none',
                      transition: 'background-color 0.2s ease',
                      borderRadius: isFirst ? '4px 0 0 4px' : '0 4px 4px 0',
                      backgroundColor: isActive ? 'rgb(142, 45, 255)' : 'rgb(24, 24, 33)',
                      boxShadow: !isFirst
                        ? 'inset 1px 0 0 rgb(89,89,104), inset 0 1px 0 rgb(89,89,104), inset 0 -1px 0 rgb(89,89,104), 1px 0 0 rgb(89,89,104)'
                        : 'none',
                      flex: 1,
                      minWidth: '151px',
                    }}
                  >
                    {tab}
                  </button>
                )
              })}
            </div>

            {/* Mode visual. The body copy carries the explanation; the
                per-mode description lives here as the accessible label so
                screen readers still get a mode-specific description. */}
            <div
              role="img"
              aria-label={modes[activeTab]}
              className="relative mt-6 aspect-video md:aspect-auto overflow-hidden rounded-xl md:rounded-none"
            >
              <div
                className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none z-0"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(142,45,255,0.35) 0%, transparent 70%)',
                }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-[1]"
                >
                  {activeTab === 'Assist mode' ? (
                    <Lottie
                      animationData={require('../../../public/animations/assist-mode/home-01A.json')}
                      loop
                      className="w-full h-auto"
                    />
                  ) : (
                    <Lottie
                      animationData={require('../../../public/animations/autonomous/home-01B.json')}
                      loop
                      className="w-full h-auto"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
