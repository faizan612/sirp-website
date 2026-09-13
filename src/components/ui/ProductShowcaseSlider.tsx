'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import './ProductShowcaseSlider.css'

export interface ProductShowcaseItem {
  image: string
  label: string
  alt?: string
  /** Native image width/height, used to size the frame without cropping or letterboxing. */
  width: number
  height: number
}

interface ProductShowcaseSliderProps {
  items: ProductShowcaseItem[]
  autoplay?: boolean
  autoplayDelay?: number
  radius?: number
  chromeLabel?: string
  className?: string
}

export default function ProductShowcaseSlider({
  items,
  autoplay = true,
  autoplayDelay = 5,
  radius = 16,
  chromeLabel = 'app.sirp.io',
  className = '',
}: ProductShowcaseSliderProps) {
  const [index, setIndex] = useState(0)
  const [hovering, setHovering] = useState(false)
  const [dir, setDir] = useState(1)
  const reduceMotion = useReducedMotion()
  const restartKeyRef = useRef(0)

  const goTo = useCallback(
    (next: number) => {
      setDir(next > index || (index === items.length - 1 && next === 0) ? 1 : -1)
      setIndex(((next % items.length) + items.length) % items.length)
      restartKeyRef.current += 1
    },
    [index, items.length]
  )

  useEffect(() => {
    if (!autoplay || hovering || reduceMotion || items.length < 2) return undefined
    const id = setTimeout(() => goTo(index + 1), Math.max(autoplayDelay, 1) * 1000)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, autoplayDelay, hovering, reduceMotion, index, items.length])

  const active = items[index]
  const playing = autoplay && !hovering && !reduceMotion && items.length > 1

  return (
    <div
      className={`product-slider ${className}`.trim()}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="product-slider-tabs" role="tablist" aria-label="Product features">
        {items.map((item, i) => (
          <button
            key={item.label}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={`product-slider-tab ${i === index ? 'is-active' : ''}`}
            onClick={() => goTo(i)}
          >
            <span>{item.label}</span>
            {i === index && (
              <span className="product-slider-tab-progress">
                <span
                  key={restartKeyRef.current}
                  className="product-slider-tab-progress-fill"
                  style={playing ? { animationDuration: `${autoplayDelay}s` } : undefined}
                  data-playing={playing || undefined}
                />
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="product-slider-frame" style={{ borderRadius: `${radius}px` }}>
        <div className="product-slider-chrome">
          <span className="product-slider-dot product-slider-dot-red" />
          <span className="product-slider-dot product-slider-dot-yellow" />
          <span className="product-slider-dot product-slider-dot-green" />
          <span className="product-slider-chrome-url">{chromeLabel}</span>
        </div>

        <div className="product-slider-viewport" style={{ aspectRatio: `${active.width} / ${active.height}` }}>
          <AnimatePresence initial={false} custom={dir} mode="sync">
            <motion.div
              key={index}
              className="product-slider-slide"
              custom={dir}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02, x: dir * 16 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.99, x: dir * -16 }}
              transition={{ duration: reduceMotion ? 0.2 : 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={active.image}
                alt={active.alt ?? active.label}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="product-slider-image"
                priority={index === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {items.length > 1 && (
          <div className="product-slider-nav">
            <button type="button" className="product-slider-nav-btn" aria-label="Previous" onClick={() => goTo(index - 1)}>
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button type="button" className="product-slider-nav-btn" aria-label="Next" onClick={() => goTo(index + 1)}>
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
