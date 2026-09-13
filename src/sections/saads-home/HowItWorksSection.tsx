'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { HOW_IT_WORKS_DATA } from '@/lib/constants/saads-home'
import { glueLastWords } from '@/lib/utils'
import './HowItWorksSection.css'

/* ─── Types ──────────────────────────────────────────────── */
interface Step {
  number: string
  title: string
  description: string
  tags: readonly string[]
}

interface HowItWorksData {
  eyebrow: string
  heading: string
  headingItalic: string
  steps: readonly Step[]
  cta: { label: string; href: string }
  videoSrc?: string
}

interface HowItWorksSectionProps {
  data?: HowItWorksData
}

/* ─── Component ──────────────────────────────────────────── *
 * The pipeline reads as a pipeline: discrete cards, a pulse rail
 * with a traveling alert dot, hover-revealed tags, staggered entry.
 * Motion is CSS-only; a single IntersectionObserver fires the
 * entrance once and pauses the rail loop when off-screen. All
 * motion is gated by prefers-reduced-motion in the stylesheet. */
export function HowItWorksSection({ data = HOW_IT_WORKS_DATA }: HowItWorksSectionProps) {
  const { eyebrow, heading, headingItalic, steps, cta } = data

  const sectionRef = useRef<HTMLElement>(null)
  const [entered, setEntered] = useState(false)
  const [paused, setPaused] = useState(true)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries[0].isIntersecting
        // Pause the rail loop whenever the section is off-screen.
        setPaused(!visible)
        // Entrance fires exactly once, the first time it is seen.
        if (visible) setEntered(true)
      },
      { threshold: 0.25 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`pipeline bg-[#121218] border-t border-border py-16 md:py-25 overflow-hidden${
        entered ? ' is-entered' : ''
      }${paused ? ' is-paused' : ''}`}
    >
      <div className="container-sirp">

        {/* Heading */}
        <div className="max-w-190 mb-12 md:mb-16">
          <span className="font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-white/45">
            {eyebrow}
          </span>
          <h2
            className="font-sans font-bold text-white mt-4"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: '1.12',
              letterSpacing: '-0.03em',
            }}
          >
            {heading} <em>{glueLastWords(headingItalic)}</em>
          </h2>
        </div>

        {/* Pulse rail — spans the grid width, hidden below md. */}
        <div className="pipeline-rail" aria-hidden="true">
          <span className="pipeline-rail-track" />
          <span className="pipeline-station" style={{ left: 'calc(100% / 6 * 1)' }} />
          <span className="pipeline-station" style={{ left: 'calc(100% / 6 * 3)' }} />
          <span className="pipeline-station" style={{ left: 'calc(100% / 6 * 5)' }} />
          <span className="pipeline-pulse" />
        </div>

        {/* Three discrete cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6">
          {steps.map((step, i) => (
            <article
              key={step.number}
              className="pipeline-card"
              style={{ '--card-index': i } as CSSProperties}
            >
              <span className="pipeline-number font-['Noto_Serif',serif]">
                {step.number}
              </span>
              <h3 className="font-sans font-semibold text-white text-xl md:text-2xl">
                {step.title}
              </h3>
              <p className="font-sans text-white/60 text-[15px] leading-[1.6]">
                {step.description}
              </p>
              <ul className="pipeline-tags">
                {step.tags.map((tag) => (
                  <li key={tag} className="pipeline-tag font-mono">
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10">
          <Link
            href={cta.href}
            className="inline-flex items-center gap-2 font-sans font-medium text-white text-base no-underline hover:gap-3 transition-all duration-200"
          >
            {cta.label}
            <ArrowRight className="w-4 h-4 text-[#8e2dff]" />
          </Link>
        </div>

      </div>
    </section>
  )
}
