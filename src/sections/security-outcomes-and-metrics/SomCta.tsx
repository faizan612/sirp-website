'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { SOM_CTA } from '@/lib/constants/security-outcomes-and-metrics'
import './SomCta.css'

export function SomCta() {
  const { headingItalic, subtext, btn } = SOM_CTA

  return (
    <section className="bg-[#121218] relative z-[2]">
      <div className="relative flex flex-col items-center justify-center min-h-[500px] pt-20 pb-36">

        {/* Purple glow */}
        <div className="som-cta-glow" />

        {/* Black dome */}
        <div className="som-cta-dome" />

        {/* White outline arc */}
        <div className="som-cta-dome-outline">
          <Image
            src="/images/whiteoutlinedom.svg"
            alt=""
            width={859}
            height={217}
            unoptimized
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-[3] text-center pt-24 md:pt-40 px-6"
        >
          <h2 className="esoc-section-heading text-white text-center font-sans font-medium max-w-[700px] mx-auto">
            {headingItalic}
          </h2>

          <p className="esoc-section-subtext text-center mt-6 mx-auto max-w-[520px] font-sans font-medium text-white">
            {subtext}
          </p>

          <div className="flex items-center justify-center mt-10">
            <Link
              href={btn.href}
              className="inline-flex items-center bg-[#8e2dff] text-white px-8 py-3.5 rounded-full font-sans font-semibold text-base hover:bg-[#a855f7] transition-all duration-200 no-underline shadow-[0_0_30px_rgba(142,45,255,0.5)]"
            >
              {btn.label}
            </Link>
          </div>

        </motion.div>

      </div>
    </section>
  )
}
