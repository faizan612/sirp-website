'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '@/components/shared/Button'
import './InfoCtaBlock.css'
import './SplitInfoCtaImage.css'

export type SplitInfoCtaImageProps = {
  heading: ReactNode
  body: ReactNode
  topShade?: boolean
  /** When `left`, image column renders first (desktop: image left, copy right). */
  imagePosition?: 'left' | 'right'
  /** Extra classes on the root `<section>` (e.g. page-specific layout hooks). */
  sectionClassName?: string
  button?: {
    label: string
    href: string
  }
  image?: {
    src: string
    alt: string
  }
  /** Use `contain` for diagrams so nothing is cropped (default `cover`). */
  imageObjectFit?: 'cover' | 'contain'
  /** Image column on the left, text on the right (default: text left, image right). */
  imageLeft?: boolean
  /** Body copy size in the text column (default matches ~1.02rem elsewhere). */
  bodyFontSize?: 'default' | '18'
  /** Enables reveal-on-scroll animation for text and image columns. */
  animateOnScroll?: boolean
}

export function SplitInfoCtaImage({
  heading,
  body,
  topShade = false,
  imagePosition = 'right',
  sectionClassName,
  button,
  image = { src: '/images/omnisense_architecture.png', alt: 'OmniSense architecture' },
  imageObjectFit = 'cover',
  imageLeft = false,
  bodyFontSize = 'default',
  animateOnScroll = false,
}: SplitInfoCtaImageProps) {
  const imageOnLeft = imageLeft || imagePosition === 'left'

  const composedSectionClassName = cn(
    topShade ? 'split-info-cta-image split-info-cta-image--top-shade' : 'split-info-cta-image',
    bodyFontSize === '18' && 'split-info-cta-image--body-18',
    sectionClassName,
  )

  const innerClassName = imageOnLeft
    ? 'split-info-cta-inner split-info-cta-inner--image-left'
    : 'split-info-cta-inner'

  return (
    <section className={composedSectionClassName}>
      <div className={`container-sirp ${innerClassName}`}>
        {animateOnScroll ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45 }}
            className="split-left"
          >
            <h2 className="info-cta-heading">{heading}</h2>
            <div className="info-cta-body split-left-body">{body}</div>
            {button && (
              <div className="info-cta-button-row">
                <Button href={button.href}>{button.label}</Button>
              </div>
            )}
          </motion.div>
        ) : (
          <div className="split-left">
            <h2 className="info-cta-heading">{heading}</h2>
            <div className="info-cta-body split-left-body">{body}</div>
            {button && (
              <div className="info-cta-button-row">
                <Button href={button.href}>{button.label}</Button>
              </div>
            )}
          </div>
        )}

        {animateOnScroll ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="split-right"
            aria-hidden="true"
          >
            <div className="split-image-wrap">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={
                  imageObjectFit === 'contain' ? 'split-image split-image--contain' : 'split-image'
                }
                unoptimized
              />
            </div>
          </motion.div>
        ) : (
          <div className="split-right" aria-hidden="true">
            <div className="split-image-wrap">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={
                  imageObjectFit === 'contain' ? 'split-image split-image--contain' : 'split-image'
                }
                unoptimized
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

