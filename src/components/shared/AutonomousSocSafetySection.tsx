'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

type AutonomousSocSafetyData = {
  heading: {
    line1: string
    line2: string
  }
  paragraphs: readonly string[]
  points: readonly string[]
  closingLines: readonly string[]
  image: {
    src: string
    alt: string
  }
}

type AutonomousSocSafetySectionProps = {
  data: AutonomousSocSafetyData
}

export function AutonomousSocSafetySection({ data }: AutonomousSocSafetySectionProps) {
  return (
    <section className="bg-[#121218] py-24">
      <div className="container-sirp">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto w-full max-w-[680px] order-last lg:order-first"
          >
            <Image
              src={data.image.src}
              alt={data.image.alt}
              width={680}
              height={680}
              className="h-auto w-full"
              unoptimized
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="max-w-[620px] order-first lg:order-last"
          >
            <h2 className="font-['Inter',sans-serif] text-white text-[42px] leading-[1.2] font-medium tracking-tight">
              {data.heading.line1}
              <br />
              {data.heading.line2}
            </h2>

            <div className="mt-7 space-y-4 font-['Inter',sans-serif] text-[16px] leading-[1.5] text-white">
              {data.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <ul className="mt-4 list-disc pl-7 font-['Inter',sans-serif] text-[16px] leading-[1.45] text-white">
              {data.points.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p className="mt-7 font-['Inter',sans-serif] text-[16px] leading-[1.5] text-white">
              {data.closingLines[0]}
            </p>
            <p className="mt-5 font-['Inter',sans-serif] text-[16px] leading-[1.5] text-white">
              {data.closingLines[1]}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
