'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface Step {
  number:      string
  label:       string
  title:       string
  description: string
  images:      readonly string[]
}

interface HowItWorksStepsProps {
  data?: readonly Step[]
  sectionClassName?: string
}

export function HowItWorksSteps({ data = [], sectionClassName }: HowItWorksStepsProps) {
  return (
    <section className={['bg-[#121218] py-10 md:py-20 lg:py-24', sectionClassName].filter(Boolean).join(' ')}>
      <div className="container-sirp">
        <div className="space-y-12 md:space-y-24 lg:space-y-32">
          {data.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="grid grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16"
            >
              {/* Image first on odd steps (image left, content right) */}
              {i % 2 === 1 && (
                step.images.length > 0 ? (
                  <div className={step.images.length > 1 ? 'grid grid-cols-2 gap-4' : ''}>
                    {step.images.map((img, j) => (
                      <div key={j} className="rounded-2xl overflow-hidden">
                        <Image
                          src={img}
                          alt={`${step.title} screenshot ${j + 1}`}
                          width={800}
                          height={600}
                          className="w-full h-auto"
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-[#3a3a4c] h-64 flex items-center justify-center">
                    <span className="text-white/20 text-sm font-mono">Image coming soon</span>
                  </div>
                )
              )}

              {/* Content */}
              <div>
                {/* Step pill */}
                <div className="mb-6">
                  <span
                    className="inline-flex items-center gap-2"
                    style={{
                      backgroundColor: 'rgba(142, 45, 255, 0.25)',
                      border: '0.75px solid rgb(142, 45, 255)',
                      borderRadius: '5px',
                      padding: '5px 10px 6px',
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <defs>
                        <linearGradient id={`spark-${step.number}`} x1="0" x2="1" y1="0.5" y2="0.5">
                          <stop offset="0" stopColor="rgb(142, 45, 255)" />
                          <stop offset="1" stopColor="rgb(185, 138, 255)" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 12 0 C 12 0 7.443 3.058 7.443 6 C 7.443 6.361 7.511 6.723 7.631 7.081 C 6.857 6.569 6.225 6.523 6 7.443 C 5.25 10.5 0 12 0 12 C 0 12 4.558 8.942 4.558 6 C 4.558 5.773 4.53 5.545 4.48 5.318 C 5.203 5.74 5.785 5.647 6 4.558 C 6.75 0.75 12 0 12 0 Z"
                        fill={`url(#spark-${step.number})`}
                      />
                    </svg>
                    <span
                      className="font-sans"
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#ffffff',
                      }}
                    >
                      {step.label}
                    </span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="mb-4 font-sans text-[1.85rem] font-bold leading-[1.1] tracking-[-0.03em] text-white sm:text-[2.1rem] md:mb-6 md:text-[2.5rem] lg:text-[3rem]">
                  {step.title}
                </h3>

                {/* Description */}
                <div style={{ maxWidth: '480px' }}>
                  {step.description.split('\n\n').map((para, k) => (
                    <p
                      key={k}
                      className="font-sans text-white"
                      style={{ fontSize: '16px', lineHeight: '1.75', marginBottom: k < step.description.split('\n\n').length - 1 ? '1rem' : 0 }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* Right — images (even steps only) */}
              {i % 2 === 0 && (
                step.images.length > 0 ? (
                  <div className={step.images.length > 1 ? 'grid grid-cols-2 gap-4' : ''}>
                    {step.images.map((img, j) => (
                      <div key={j} className="rounded-2xl overflow-hidden">
                        <Image
                          src={img}
                          alt={`${step.title} screenshot ${j + 1}`}
                          width={800}
                          height={600}
                          className="w-full h-auto"
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-[#3a3a4c] h-64 flex items-center justify-center">
                    <span className="text-white/20 text-sm font-mono">Image coming soon</span>
                  </div>
                )
              )}

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
