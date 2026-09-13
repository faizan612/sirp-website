'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/shared/Button'
import { SARA_DATA } from '@/lib/constants'

/* ─── Types ──────────────────────────────────────────────── */
interface SaraData {
  heading:        string
  headingItalic:  string
  headingSuffix:  string
  description:    string
  image:          string
  imageAlt:       string
  learnMoreHref:  string
  learnMoreLabel: string
}

interface SaraSectionProps {
  data?: SaraData
}

/* ─── Component ──────────────────────────────────────────── */
export function SaraSection({ data = SARA_DATA }: SaraSectionProps) {
  const {
    heading,
    headingItalic,
    headingSuffix,
    description,
    image,
    imageAlt,
    learnMoreHref,
    learnMoreLabel,
  } = data

  return (
    <section className="bg-[#121218] border-b border-[#3a3a4c] py-16 md:py-[100px] overflow-hidden">
      <div className="container-sirp">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 lg:gap-20 items-center">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="font-sans font-bold text-white mb-6"
              style={{
                fontSize: 'clamp(1.625rem, 4vw, 3rem)',
                lineHeight: '1.2',
                letterSpacing: '-0.03em',
              }}
            >
              {heading}{' '}
              <em>{headingItalic}</em>{' '}
              {headingSuffix}
            </h2>

            <p className="font-sans text-white/70 text-base leading-[1.75] mb-8 max-w-[420px]">
              {description}
            </p>

            <Button href={learnMoreHref} target="_blank" rel="noopener noreferrer">
              {learnMoreLabel}
            </Button>
          </motion.div>

          {/* Right — image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center"
          >
            <Image
              src={image}
              alt={imageAlt}
              width={600}
              height={600}
              className="w-full max-w-[420px] md:max-w-none h-auto"
              unoptimized
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
