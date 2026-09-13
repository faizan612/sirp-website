'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import './ImpactMetricsDashboard.css'

const ICON_MAP = {
  bargraph: '/images/enterprise-soc/bargraph.svg',
  search: '/images/enterprise-soc/search.svg',
  current: '/images/enterprise-soc/current.svg',
  dollar: '/images/enterprise-soc/dollar.svg',
} as const

export type ImpactMetricColor = 'teal' | 'orange' | 'purple' | 'cyan'
export type ImpactMetricIcon = keyof typeof ICON_MAP
export type ImpactMetricPillVariant = 'decrease' | 'decrease-right'
export type ImpactMetricValueVariant = 'color' | 'decrease' | 'decrease-right' | 'none'

export type ImpactMetricsDashboardMetric = {
  id: string
  badge: string
  value: string
  subtitle: string
  color: ImpactMetricColor
  icon: ImpactMetricIcon
  pillVariant?: ImpactMetricPillVariant
  valueVariant?: ImpactMetricValueVariant
}

export type ImpactMetricsDashboardProps = {
  heading: string
  subtext: string
  metrics: ImpactMetricsDashboardMetric[]
  /** Border glow pills (enterprise) vs SVG hue filters (SOM) */
  pillStyle?: 'border' | 'filter'
}

function getPillClassName(
  metric: ImpactMetricsDashboardMetric,
  pillStyle: 'border' | 'filter',
): string {
  if (metric.pillVariant === 'decrease') return 'impact-metrics-pill impact-metrics-pill--decrease'
  if (metric.pillVariant === 'decrease-right') return 'impact-metrics-pill impact-metrics-pill--decrease-right'
  if (pillStyle === 'filter') return `impact-metrics-pill impact-metrics-pill--filter-${metric.color}`
  return `impact-metrics-pill impact-metrics-pill--${metric.color}`
}

function getValueClassName(metric: ImpactMetricsDashboardMetric): string {
  const base = 'impact-metrics-value'
  if (metric.valueVariant === 'decrease') return cn(base, `${base}--decrease`)
  if (metric.valueVariant === 'decrease-right') return cn(base, `${base}--decrease-right`)
  if (metric.valueVariant === 'none') return base
  return cn(base, `${base}--${metric.color}`)
}

export function ImpactMetricsDashboard({
  heading,
  subtext,
  metrics,
  pillStyle = 'border',
}: ImpactMetricsDashboardProps) {
  return (
    <section className="impact-metrics-section bg-[#121218] border-t border-b border-white/10">
      <div className="impact-metrics-grid container-sirp">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="impact-metrics-heading-cell"
        >
          <h2 className="impact-metrics-heading font-sans font-bold text-white">
            {heading}
          </h2>
          <p className="impact-metrics-subtext font-sans text-white/60 leading-relaxed">
            {subtext}
          </p>
        </motion.div>

        {metrics.map((metric, i) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={`impact-metrics-cell impact-metrics-cell--${metric.color}`}
          >
            <span className="impact-metrics-badge">{metric.badge}</span>

            <div className="impact-metrics-body">
              <div className={getPillClassName(metric, pillStyle)}>
                <Image
                  src={ICON_MAP[metric.icon]}
                  alt=""
                  width={18}
                  height={18}
                  unoptimized
                />
              </div>
              <div>
                <div className={getValueClassName(metric)}>{metric.value}</div>
                <p className="impact-metrics-subtitle text-white">{metric.subtitle}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
