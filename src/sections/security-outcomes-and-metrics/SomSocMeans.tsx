'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { SOM_VENN } from '@/lib/constants/security-outcomes-and-metrics'
import './SomSocMeans.css'

export function SomSocMeans() {
  const { heading, paragraphs } = SOM_VENN

  return (
    <section className="bg-[#f6f5f8] py-16 md:py-[100px]">
      <div className="container-sirp">
        <div className="som-soc-grid">

          {/* Left — venn diagram image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="som-soc-image-wrap"
          >
            <Image
              src="/images/security-outcomes-and-metrics/soc.png"
              alt=""
              width={1258}
              height={1077}
              sizes="746px"
              loading="lazy"
              unoptimized
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                borderRadius: 'inherit',
                objectFit: 'cover',
                objectPosition: 'center center',
              }}
            />
          </motion.div>

          {/* Right — text */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="som-soc-heading esoc-section-heading">{heading}</h2>
            <div className="som-soc-paras">
              {paragraphs.map((p, i) => (
                <p key={i} className="som-soc-para">{p}</p>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
