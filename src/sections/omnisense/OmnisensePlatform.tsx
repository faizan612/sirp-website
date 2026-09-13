'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

/* ─── Types ──────────────────────────────────────────────── */
interface Tab {
  id:          string
  label:       string
  title:       string
  description: string
  handoff?:    string
  image:       string
}

interface PlatformData {
  badge:         string
  heading:       string
  headingItalic: string
  headingSuffix: string
  tabs:          readonly Tab[]
}

interface OmnisensePlatformProps {
  data: PlatformData
}

/* ─── Component ──────────────────────────────────────────── */
export function OmnisensePlatform({ data }: OmnisensePlatformProps) {
  const { badge, heading, headingItalic, headingSuffix, tabs } = data
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const active = tabs.find(t => t.id === activeTab)!

  return (
    <section className="py-[50px] md:py-[100px] relative bg-[#f6f5f8]">
      <div className="container-sirp">

        {/* Badge + heading — centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="mb-4 md:mb-6 flex justify-center">
            <div className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-3 py-1.5">
              <span className="font-sans text-sm text-black">{badge}</span>
            </div>
          </div>
          <h2
            className="font-sans font-medium text-black"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              lineHeight: '1.15',
              letterSpacing: '-0.02em',
            }}
          >
            {heading}
          </h2>
          <p
            className="font-sans font-medium text-black mt-1"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              lineHeight: '1.15',
              letterSpacing: '-0.02em',
            }}
          >
            <em>{headingItalic}</em> {headingSuffix}
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="overflow-hidden mx-auto w-full"
          style={{
            maxWidth: '1000px',
            background: '#ffffff',
            borderRadius: '35px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Content area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-0"
            >
              {/* Left — title + description */}
              <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center order-2 md:order-1">
                <h3
                  className="font-sans font-bold text-black mb-3 md:mb-4"
                  style={{ fontSize: 'clamp(20px, 2.5vw, 32px)', lineHeight: '1.15', letterSpacing: '-0.02em' }}
                >
                  {active.title}
                </h3>
                <p className="font-sans text-black/70 leading-[1.65] text-sm">
                  {active.description}
                </p>
                {active.handoff && (
                  <p className="font-sans italic text-black/70 leading-[1.65] text-sm mt-3">
                    {active.handoff}
                  </p>
                )}
              </div>

              {/* Right — screenshot */}
              <div className="relative overflow-hidden min-h-[220px] md:min-h-[320px] lg:min-h-[380px] order-1 md:order-2">
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  className="object-cover object-left-top"
                  unoptimized
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Tab bar */}
          <div
            className="flex flex-wrap"
            style={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)' }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[50%] md:min-w-0 py-3 md:py-4 font-sans text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer border-none outline-none whitespace-nowrap px-2 md:px-3 ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-black/50 hover:text-black hover:bg-black/5'
                }`}
                style={{
                  background: activeTab === tab.id ? 'rgb(142, 45, 255)' : 'transparent',
                  opacity: activeTab === tab.id ? 1 : 0.9,
                  borderRight: '1px solid rgba(0, 0, 0, 0.1)',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  )
}
