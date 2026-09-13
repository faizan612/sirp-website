'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useInViewOnce } from '@/components/shared/motion/useInViewOnce'
import { SOM_SYSTEM } from '@/lib/constants/security-outcomes-and-metrics'
import './SomEscalation.css'

const RING_R = 15
const RING_C = 2 * Math.PI * RING_R

/**
 * A live recreation of the ticket in system.png's top card, so it can
 * visibly resolve — progress ring completes, status chip goes from
 * Critical/High/Open to a muted "Escalated to analyst" — instead of
 * sitting static. Reinforces "escalate is rare and visible" without
 * introducing a new page-level component (SomEscalation owns this).
 */
function IncidentTicketMock() {
  const reduce = useReducedMotion()
  const { ref, inView } = useInViewOnce<HTMLDivElement>()
  const [resolved, setResolved] = useState(reduce)

  useEffect(() => {
    if (!inView || reduce) return
    const t = setTimeout(() => setResolved(true), 1400)
    return () => clearTimeout(t)
  }, [inView, reduce])

  const progress = resolved ? 100 : 23
  const offset = RING_C * (1 - progress / 100)

  return (
    <div
      ref={ref}
      className="rounded-[16px] border border-white/10 p-6"
      style={{ background: 'linear-gradient(180deg, #232228 0%, #17161b 100%)' }}
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-sm text-white/70">#6707</span>
        <div className="flex items-center gap-2">
          {!resolved ? (
            <>
              <span className="rounded-md border border-[#e4574c]/50 bg-[#e4574c]/15 px-2 py-1 font-sans text-[11px] font-medium text-[#ff8a80]">
                Critical
              </span>
              <span className="rounded-md border border-[#e4574c]/50 bg-[#e4574c]/15 px-2 py-1 font-sans text-[11px] font-medium text-[#ff8a80]">
                High
              </span>
              <span className="rounded-md bg-[#e4574c] px-2 py-1 font-sans text-[11px] font-medium text-white">Open</span>
            </>
          ) : (
            <motion.span
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="rounded-md border border-white/15 bg-white/[0.06] px-2.5 py-1 font-sans text-[11px] font-medium text-white/60"
            >
              Escalated to analyst
            </motion.span>
          )}
        </div>
      </div>

      <p className="mt-4 font-mono text-[13px] text-white/40">2025-06-26 09:32 AM</p>
      <p className="mt-1 font-sans text-[15px] font-semibold leading-snug text-white">
        Rewterz — IPS Traffic Accepted from Malicious source.
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-md border border-[#e4a13c]/40 px-2.5 py-1 font-sans text-[11px] text-[#e4a13c]">
          Malware
        </span>

        <svg width={40} height={40} viewBox="0 0 40 40" className="-rotate-90">
          <circle cx={20} cy={20} r={RING_R} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={3} />
          <circle
            cx={20}
            cy={20}
            r={RING_R}
            fill="none"
            stroke={resolved ? '#3ddc84' : '#13a3ad'}
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray={RING_C}
            strokeDashoffset={offset}
            style={{ transition: reduce ? 'none' : 'stroke-dashoffset 0.6s ease, stroke 0.3s ease' }}
          />
        </svg>
      </div>
    </div>
  )
}

export function SomEscalation() {
  const { heading, intro, escalationLabel, escalations, stats, summary } = SOM_SYSTEM
  const reduce = useReducedMotion()

  return (
    <section className="bg-[#f6f5f8] py-16 md:py-[100px]">
      <div className="container-sirp">
        <div className="som-esc-grid">

          {/* Left — text */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -24 }}
            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="som-esc-text"
          >
            <h2 className="som-esc-heading esoc-section-heading">{heading}</h2>
            <p className="som-esc-intro">{intro}</p>

            {/* Escalation block */}
            <div className="som-esc-escalation">
              <p className="som-esc-label">{escalationLabel}</p>
              <ul className="som-esc-list">
                {escalations.map((item, i) => (
                  <li key={i} className="som-esc-item">
                    <span className="som-esc-check">
                      <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats + summary block */}
            <div className="som-esc-bottom">
              <div className="som-esc-stats">
                {stats.map((s, i) => (
                  <p key={i} className="som-esc-stat">
                    {s.label}: {s.value}{s.sub ? ` ${s.sub}` : ''}
                  </p>
                ))}
              </div>
              <p className="som-esc-summary">{summary}</p>
            </div>
          </motion.div>

          {/* Right — live ticket mock + blurred stream */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: reduce ? 0 : 0.1 }}
            className="som-esc-image-wrap"
          >
            <IncidentTicketMock />

            <div className="relative mt-4 h-[180px] overflow-hidden rounded-[16px]">
              <Image
                src="/images/security-outcomes-and-metrics/system.png"
                alt="Stream of autonomously triaged alerts"
                fill
                unoptimized
                style={{ objectFit: 'cover', objectPosition: 'bottom' }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
