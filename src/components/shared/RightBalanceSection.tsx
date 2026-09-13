'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

type RightBalanceSectionData = {
  heading: {
    line1: string
    line2: string
  }
  paragraphs: readonly string[]
  analystDefinesLead: string
  analystDefines: readonly string[]
  operationsParagraph: string
  analystFocusLead: string
  analystFocus: readonly string[]
  closingLines: readonly string[]
  differenceLink: {
    label: string
    href: string
  }
  image: {
    src: string
    alt: string
  }
}

type RightBalanceSectionProps = {
  data: RightBalanceSectionData
}

export function RightBalanceSection({ data }: RightBalanceSectionProps) {
  const [closingBeforeLink = '', closingAfterLink = ''] = data.closingLines[1].split(
    data.differenceLink.label
  )

  return (
    <section className="bg-[#121218] py-24">
      <div className="container-sirp">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-[620px]"
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

            <p className="mt-7 font-['Inter',sans-serif] text-[16px] leading-[1.5] text-white">
              {data.analystDefinesLead}
            </p>
            <ul className="mt-4 list-disc pl-7 font-['Inter',sans-serif] text-[16px] leading-[1.45] text-white">
              {data.analystDefines.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p className="mt-7 font-['Inter',sans-serif] text-[16px] leading-[1.5] text-white">
              {data.operationsParagraph}
            </p>

            <p className="mt-7 font-['Inter',sans-serif] text-[16px] leading-[1.5] text-white">
              {data.analystFocusLead}
            </p>
            <ul className="mt-4 list-disc pl-7 font-['Inter',sans-serif] text-[16px] leading-[1.45] text-white">
              {data.analystFocus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p className="mt-7 font-['Inter',sans-serif] text-[16px] leading-[1.5] text-white">
              {data.closingLines[0]}
            </p>

            <p className="mt-5 font-['Inter',sans-serif] text-[16px] leading-[1.5] text-white">
              {closingBeforeLink}
              <Link href={data.differenceLink.href} className="underline underline-offset-4">
                {data.differenceLink.label}
              </Link>{' '}
              {closingAfterLink}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative mx-auto w-full max-w-[700px]"
          >
            <Image
              src={data.image.src}
              alt={data.image.alt}
              width={700}
              height={560}
              className="h-auto w-full"
              unoptimized
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
