'use client'

import { motion, type Variants } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { FOOTER_LINKS, SITE_NAME } from '@/lib/constants'

const FOOTER_SOCIAL_X_HREF = 'https://twitter.com/sirp_io'
const FOOTER_SOCIAL_LINKEDIN_HREF = 'https://linkedin.com/company/sirp-io'

const EASE_OUT = [0.16, 1, 0.3, 1] as const

const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: EASE_OUT } },
}

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const riseUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
}

export function Footer({ showHero = true }: { showHero?: boolean }) {
  const year = new Date().getFullYear()

  return (
    <footer data-chrome="global" className="relative overflow-hidden bg-[#121218]">
      {/* Hero image */}
      {showHero && <div className="relative w-full">
        <motion.div
          variants={imageReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative h-[280px] w-full sm:h-[340px] md:h-[400px] lg:h-[460px]"
        >
          <Image
            src="/images/footer.png"
            alt=""
            fill
            className="object-cover object-center"
          />
        </motion.div>

        {/* Gradient: transparent → solid dark, pulls the image into the footer */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, transparent 35%, rgba(18,18,24,0.7) 70%, #121218 100%)',
          }}
        />

        {/* Overlay copy */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="absolute inset-0 flex flex-col justify-end px-6 pb-10 sm:px-8 sm:pb-12 md:px-12 lg:px-16"
        >
          <motion.h2
            variants={riseUp}
            className="max-w-sm font-sans text-2xl font-semibold leading-[1.15] tracking-[-0.02em] text-balance text-white sm:max-w-md sm:text-3xl md:text-4xl"
          >
            The SOC that drives itself.
          </motion.h2>
          <motion.p
            variants={riseUp}
            className="mt-3 max-w-[320px] font-sans text-sm leading-relaxed text-pretty text-white/60 sm:text-base"
          >
            Autonomous, governed security operations — powered by OmniSense™.
          </motion.p>
        </motion.div>
      </div>

      }
      {/* Main content */}
      <div className="container-sirp relative py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-5">
          {/* Brand: logo + socials, taglines, compliance badges */}
          <div className="col-span-2 max-w-[min(100%,320px)] md:col-span-3 lg:col-span-1">
            <div className="mb-5 flex items-start justify-between gap-4">
              <Link href="/" className="inline-block shrink-0">
                <Image
                  src="/images/logos/SIRP-Logo.svg"
                  alt={SITE_NAME}
                  width={100}
                  height={32}
                  className="h-8 w-auto object-contain"
                />
              </Link>
              <div className="flex shrink-0 items-center gap-2.5 pt-0.5">
                <a
                  href={FOOTER_SOCIAL_X_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/50 text-white transition-opacity hover:opacity-90"
                  aria-label="SIRP on X"
                >
                  <Image
                    src="/images/logos/twitter.svg"
                    alt=""
                    width={14}
                    height={13}
                    className="h-[13px] w-[14px] object-contain"
                  />
                </a>
                <a
                  href={FOOTER_SOCIAL_LINKEDIN_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/50 text-white transition-opacity hover:opacity-90"
                  aria-label="SIRP on LinkedIn"
                >
                  <Image
                    src="/images/logos/linkedin.svg"
                    alt=""
                    width={14}
                    height={15}
                    className="h-[15px] w-[14px] object-contain"
                  />
                </a>
              </div>
            </div>
            <div className="mb-5 space-y-1">
              <p className="font-sans text-sm italic leading-snug text-white">
                Self-driving SOC — governed, AI-native security operations.
              </p>
              <p className="font-sans text-sm italic leading-snug text-white">
                Powered by OmniSense™
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
              <Image
                src="/images/logos/iso.png"
                alt="ISO 27001"
                width={80}
                height={80}
                className="h-11 w-auto max-w-[80px] object-contain sm:h-12 sm:max-w-[88px]"
              />
              <Image
                src="/images/logos/soc2.png"
                alt="SOC 2 Type II"
                width={112}
                height={72}
                className="h-11 w-auto max-w-[112px] object-contain sm:h-12 sm:max-w-[128px]"
              />
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.heading} className="text-center">
              <h3 className="mb-2 font-sans text-base font-medium leading-5 text-white">
                {col.heading}
              </h3>
              <ul className="m-0 list-none space-y-1.5 p-0">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 font-sans text-sm text-white/55 no-underline transition-colors hover:text-white"
                      >
                        {link.label}
                        <ExternalLink className="h-3 w-3 opacity-50" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="inline-block font-sans text-sm text-white/55 no-underline transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Office addresses — right */}
        <div className="mb-0 mt-16 flex w-full justify-end pr-8 md:pr-16 lg:pr-24 xl:pr-28">
          <div className="flex flex-col gap-4 text-right sm:flex-row sm:justify-end sm:gap-8">
            <address className="not-italic font-sans text-[11px] leading-snug text-white/50">
              <p className="mb-1 text-sm font-semibold text-white/75 sm:text-base">United States</p>
              <p>
                7735 Old Georgetown Rd, Suite 510
                <br />
                Bethesda, MD 20814
                <br />
                <a
                  href="tel:+18887019252"
                  className="text-white/50 underline-offset-2 hover:text-white/70 hover:underline"
                >
                  +1 888 701 9252
                </a>
              </p>
            </address>
            <address className="not-italic font-sans text-[11px] leading-snug text-white/50">
              <p className="mb-1 text-sm font-semibold text-white/75 sm:text-base">United Kingdom</p>
              <p>
                167-169 Great Portland Street,
                <br />
                5th Floor, London, W1W 5PF
              </p>
            </address>
          </div>
        </div>

        {/* Copyright — centered, below addresses */}
        <div className="mb-6 flex justify-center pt-8 text-center md:pt-10">
          <p className="font-mono text-xs text-white/40">
            © {year} SIRP Labs Inc. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
