'use client'

import { motion } from 'framer-motion'

/* ─── Types ──────────────────────────────────────────────── */
interface ActionData {
  heading:     string
  description: string
  note1:       string
  note2:       string
  videoId:     string
}

interface OmnisenseActionProps {
  data: ActionData
}

/* ─── Component ──────────────────────────────────────────── */
export function OmnisenseAction({ data }: OmnisenseActionProps) {
  const { heading, description, note1, note2, videoId } = data

  return (
    <section id="watch-demo" className="py-[50px] md:py-[100px] bg-white scroll-mt-20">
      <div className="container-sirp">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Text */}
          <div className="text-center mb-10 md:mb-14 max-w-[960px] mx-auto px-4 md:px-0 w-full">
            <h2
              className="font-sans font-medium text-black mb-6 md:mb-7 mx-auto w-full"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', lineHeight: '1.15', letterSpacing: '-0.02em', maxWidth: '960px' }}
            >
              {heading}
            </h2>
            <p
              className="font-sans text-black/80 leading-[1.65] text-base md:text-lg mb-6 md:mb-8 mx-auto w-full"
              style={{ maxWidth: '960px' }}
            >
              {description}
            </p>
            <p
              className="font-sans text-black/60 leading-[1.65] text-base md:text-lg mb-2 mx-auto w-full"
              style={{ maxWidth: '960px' }}
            >
              {note1}
            </p>
            <p
              className="font-sans text-black/60 leading-[1.65] text-base md:text-lg mx-auto w-full"
              style={{ maxWidth: '960px' }}
            >
              {note2}
            </p>
          </div>

          {/* YouTube embed — 16/9 responsive */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-xl overflow-hidden border border-black/10 mx-auto w-full"
            style={{ maxWidth: '860px', aspectRatio: '16/9', position: 'relative' }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
              title={heading}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
            />
          </motion.div>

        </motion.div>

      </div>
    </section>
  )
}
