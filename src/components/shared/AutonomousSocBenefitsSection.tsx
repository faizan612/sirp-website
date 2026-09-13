'use client'

import type { CSSProperties, ReactNode } from 'react'
import { motion } from 'framer-motion'
import {
  BellOff,
  ChartNoAxesColumnIncreasing,
  Hand,
  PieChart,
  RefreshCcw,
  Sparkles,
} from 'lucide-react'
import Image from 'next/image'
import './AutonomousSocBenefitsSection.css'

type BenefitCard = {
  icon: 'chart' | 'mute' | 'hand' | 'refresh' | 'sparkle' | 'pie'
  title: string
  paragraphs: readonly string[]
}

type AutonomousSocBenefitsSectionProps = {
  badgeText?: string
  heading: ReactNode
  intro?: ReactNode
  cards: readonly BenefitCard[]
  footerLines?: readonly string[]
  /** SOAR migration page: no badge, left-aligned header, shorter cards, optional footer. */
  variant?: 'default' | 'soarMigration'
  /** Grid column count for the card row — e.g. 3 for a three-track layout. Defaults to 4. */
  columns?: 3 | 4
}

const iconMap = {
  chart: ChartNoAxesColumnIncreasing,
  mute: BellOff,
  hand: Hand,
  refresh: RefreshCcw,
  sparkle: Sparkles,
  pie: PieChart,
} as const

export function AutonomousSocBenefitsSection({
  badgeText,
  heading,
  intro,
  cards,
  footerLines,
  variant = 'default',
  columns = 4,
}: AutonomousSocBenefitsSectionProps) {
  const sectionClass =
    variant === 'soarMigration'
      ? 'autonomous-benefits autonomous-benefits--soar-migration'
      : 'autonomous-benefits'

  return (
    <section className={sectionClass}>
      <div className="container-sirp autonomous-benefits-inner">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="autonomous-benefits-top"
        >
          {badgeText ? (
            <span className="autonomous-benefits-badge">
              <Image
                src="/images/benefitsOfSOC/star.svg"
                alt=""
                width={12}
                height={12}
                className="autonomous-benefits-badge-star"
                unoptimized
              />
              {badgeText}
            </span>
          ) : null}
          <h2 className="autonomous-benefits-heading">{heading}</h2>
          {intro != null ? <div className="autonomous-benefits-intro">{intro}</div> : null}
        </motion.div>

        <div className="autonomous-benefits-grid" style={{ '--benefits-columns': columns } as CSSProperties}>
          {cards.map((card, index) => {
            const Icon = iconMap[card.icon]
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="autonomous-benefit-card"
              >
                <div className="autonomous-benefit-icon-wrap" aria-hidden="true">
                  <Image
                    src="/images/global/number border purple.svg"
                    alt=""
                    width={58}
                    height={96}
                    className="autonomous-benefit-border"
                    unoptimized
                  />
                  <Icon className="autonomous-benefit-icon" size={20} strokeWidth={2.25} />
                </div>

                <h3 className="autonomous-benefit-title">{card.title}</h3>
                {card.paragraphs.length > 0 ? (
                  <div className="autonomous-benefit-body">
                    {card.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                ) : null}
              </motion.article>
            )
          })}
        </div>

        {footerLines && footerLines.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="autonomous-benefits-footer"
          >
            {footerLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </motion.div>
        ) : null}
      </div>
    </section>
  )
}
