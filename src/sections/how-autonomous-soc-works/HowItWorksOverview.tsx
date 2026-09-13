'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface OverviewData {
  heading:    string
  subheading: string
  subtext:    string
  subtext2:   string
  image:      string
  imageAlt:   string
}

interface HowItWorksOverviewProps {
  data?: OverviewData
}

export function HowItWorksOverview({ data }: HowItWorksOverviewProps) {
  if (!data) return null
  const { heading, subheading, subtext, subtext2, image, imageAlt } = data

  return (
    <section className="bg-[#121218] py-10 md:py-20 lg:py-24">
      <div className="container-sirp">
        <div className="grid grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 font-sans text-[1.85rem] font-bold leading-[1.1] tracking-[-0.03em] text-white sm:text-[2.1rem] md:mb-6 md:text-[2.5rem] lg:text-[3rem]">
              {heading}
            </h2>

            <h3 className="mb-4 font-sans text-[1.45rem] font-bold leading-[1.15] tracking-[-0.02em] text-white sm:text-[1.6rem] md:mb-6 md:text-[1.85rem] lg:text-[2.25rem]">
              {subheading}
            </h3>

            <p
              className="font-sans text-white/60 mb-6"
              style={{ fontSize: '16px', lineHeight: '1.75' }}
            >
              {subtext}
            </p>

            <p
              className="font-sans text-white/60"
              style={{ fontSize: '16px', lineHeight: '1.75' }}
            >
              {subtext2}
            </p>
          </motion.div>

          {/* Right — architecture image */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Image
              src={image}
              alt={imageAlt}
              width={2621}
              height={1548}
              className="w-full h-auto"
              unoptimized
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
