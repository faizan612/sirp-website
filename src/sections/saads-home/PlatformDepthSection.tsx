'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PLATFORM_DEPTH_DATA } from '@/lib/constants/saads-home'

/* ─── Types ──────────────────────────────────────────────── */
interface DepthCard {
  id: string
  title: string
  description: string
  image: string
  bridge?: {
    text: string
    link: { label: string; href: string }
  }
}

interface PlatformDepthData {
  eyebrow: string
  heading: string
  headingItalic: string
  cards: readonly DepthCard[]
  cta: { label: string; href: string }
}

interface PlatformDepthSectionProps {
  data?: PlatformDepthData
}

/* ─── Component ──────────────────────────────────────────── */
export function PlatformDepthSection({ data = PLATFORM_DEPTH_DATA }: PlatformDepthSectionProps) {
  const { eyebrow, heading, headingItalic, cards, cta } = data

  return (
    <section className="bg-[#121218] border-b border-[#3a3a4c] py-16 md:py-[100px] overflow-hidden">
      <div className="container-sirp">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-[760px] mb-12 md:mb-16"
        >
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
            {heading} <em>{headingItalic}</em>
          </h2>
        </motion.div>

        {/* Two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-[#3a3a4c] bg-[#161620] overflow-hidden flex flex-col"
            >
              <div className="relative w-full h-[240px] md:h-[300px] overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                  unoptimized
                />
              </div>
              <div className="px-7 py-7 flex flex-col gap-3 flex-1">
                <h3 className="font-sans font-semibold text-white text-xl md:text-2xl">
                  {card.title}
                </h3>
                <p className="font-sans text-white/60 text-[15px] leading-[1.6]">
                  {card.description}
                </p>

                {/* Bridge line (Sara card) */}
                {card.bridge && (
                  <p className="font-sans text-white/80 text-[15px] leading-[1.6] mt-auto pt-4">
                    {card.bridge.text}{' '}
                    <Link
                      href={card.bridge.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#8e2dff] font-medium no-underline hover:text-white transition-colors"
                    >
                      {card.bridge.link.label}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-10"
        >
          <Link
            href={cta.href}
            className="inline-flex items-center gap-2 font-sans font-medium text-white text-base no-underline hover:gap-3 transition-all duration-200"
          >
            {cta.label}
            <ArrowRight className="w-4 h-4 text-[#8e2dff]" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
