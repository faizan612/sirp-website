'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ENTERPRISE_SOC_AI_NATIVE } from '@/lib/constants/enterprise-soc'
import './EnterpriseSocAiNative.css'

export function EnterpriseSocAiNative() {
  const { heading, subtext, cta, image, imageAlt } = ENTERPRISE_SOC_AI_NATIVE

  return (
    <section className="esoc-ainative-section bg-[#121218] py-16 md:py-[100px] overflow-hidden">
      <div className="container-sirp">
        <div className="grid grid-cols-1 lg:grid-cols-[42fr_58fr] gap-10 lg:gap-16 items-center">

          {/* Left — text + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-7"
          >
            <h2 className="esoc-section-heading font-sans font-bold text-white">
              {heading}
            </h2>
            <p className="esoc-section-subtext font-sans text-white/70">
              {subtext}
            </p>
            <div>
              <Link
                href={cta.href}
                className="inline-flex items-center bg-[#8e2dff] text-white px-7 py-3.5 rounded-full font-sans font-medium text-sm hover:bg-[#a855f7] transition-all duration-200 no-underline shadow-[0_0_24px_rgba(142,45,255,0.4)]"
              >
                {cta.label}
              </Link>
            </div>
          </motion.div>

          {/* Right — image + decorative loop */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="ai-native-right"
          >
            {/* UI screenshot */}
            <div className="ai-native-image">
              <Image
                src={image}
                alt={imageAlt}
                width={620}
                height={420}
                className="w-full h-auto rounded-xl"
                unoptimized
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
