'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import './MagicBento.css'

const DEFAULT_GLOW_COLOR = '142, 45, 255'
const MOBILE_BREAKPOINT = 768

export interface BentoCardData {
  id: string
  label?: string
  title: string
  description?: string
  span?: 'lg' | 'sm'
  image?: { src: string; alt: string }
}

export interface MagicBentoProps {
  cards: BentoCardData[]
  className?: string
  glowColor?: string
  particleCount?: number
  spotlightRadius?: number
  enableTilt?: boolean
  enableMagnetism?: boolean
  enableStars?: boolean
  clickEffect?: boolean
  renderMedia?: (card: BentoCardData) => ReactNode
}

function useMediaQuery(query: string) {
  const ref = useRef(false)
  if (typeof window !== 'undefined') ref.current = window.matchMedia(query).matches
  return ref.current
}

function createParticle(x: number, y: number, color: string) {
  const el = document.createElement('div')
  el.className = 'mb-particle'
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `
  return el
}

export function MagicBento({
  cards,
  className = '',
  glowColor = DEFAULT_GLOW_COLOR,
  particleCount = 8,
  spotlightRadius = 260,
  enableTilt = true,
  enableMagnetism = true,
  enableStars = true,
  clickEffect = true,
  renderMedia,
}: MagicBentoProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement | null>(null)
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT}px)`)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const disableAnimations = isMobile || reducedMotion

  /* ─── Global cursor spotlight across the whole grid ──────── */
  useEffect(() => {
    if (disableAnimations || !gridRef.current) return undefined
    const grid = gridRef.current

    const spotlight = document.createElement('div')
    spotlight.className = 'mb-global-spotlight'
    document.body.appendChild(spotlight)
    spotlightRef.current = spotlight

    const cardEls = Array.from(grid.querySelectorAll<HTMLElement>('.mb-card'))

    const handleMove = (e: MouseEvent) => {
      const rect = grid.getBoundingClientRect()
      const inside =
        e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom

      if (!inside) {
        gsap.to(spotlight, { opacity: 0, duration: 0.3 })
        cardEls.forEach(card => card.style.setProperty('--glow-intensity', '0'))
        return
      }

      gsap.to(spotlight, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      })
      gsap.to(spotlight, { opacity: 1, duration: 0.2 })

      cardEls.forEach(card => {
        const cardRect = card.getBoundingClientRect()
        const cx = cardRect.left + cardRect.width / 2
        const cy = cardRect.top + cardRect.height / 2
        const distance = Math.hypot(e.clientX - cx, e.clientY - cy) - Math.max(cardRect.width, cardRect.height) / 2
        const relativeX = ((e.clientX - cardRect.left) / cardRect.width) * 100
        const relativeY = ((e.clientY - cardRect.top) / cardRect.height) * 100
        const glowIntensity = distance < spotlightRadius ? Math.max(0, 1 - distance / spotlightRadius) : 0

        card.style.setProperty('--glow-x', `${relativeX}%`)
        card.style.setProperty('--glow-y', `${relativeY}%`)
        card.style.setProperty('--glow-intensity', String(glowIntensity))
        card.style.setProperty('--glow-radius', `${spotlightRadius}px`)
      })
    }

    const handleLeave = () => {
      gsap.to(spotlight, { opacity: 0, duration: 0.3 })
      cardEls.forEach(card => card.style.setProperty('--glow-intensity', '0'))
    }

    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseleave', handleLeave)

    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
      spotlight.remove()
      spotlightRef.current = null
    }
  }, [disableAnimations, spotlightRadius, cards.length])

  /* ─── Per-card tilt, magnetism, particles, click ripple ──── */
  useEffect(() => {
    if (disableAnimations || !gridRef.current) return undefined
    const grid = gridRef.current
    const cardEls = Array.from(grid.querySelectorAll<HTMLElement>('.mb-card'))
    const cleanups: Array<() => void> = []

    cardEls.forEach(card => {
      let particles: HTMLDivElement[] = []
      let isHovered = false

      const clearParticles = () => {
        particles.forEach(p => {
          gsap.to(p, {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            onComplete: () => p.remove(),
          })
        })
        particles = []
      }

      const spawnParticles = () => {
        if (!particleCount) return
        for (let i = 0; i < particleCount; i++) {
          const x = Math.random() * card.clientWidth
          const y = Math.random() * card.clientHeight
          const particle = createParticle(x, y, glowColor)
          card.appendChild(particle)
          particles.push(particle)
          gsap.fromTo(
            particle,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.3, delay: i * 0.03 }
          )
          gsap.to(particle, {
            y: y - 40 - Math.random() * 30,
            x: x + (Math.random() - 0.5) * 40,
            duration: 2 + Math.random() * 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
        }
      }

      const onEnter = () => {
        isHovered = true
        if (enableStars) spawnParticles()
      }

      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const cx = rect.width / 2
        const cy = rect.height / 2

        if (enableTilt) {
          const rotateX = ((y - cy) / cy) * -6
          const rotateY = ((x - cx) / cx) * 6
          gsap.to(card, {
            rotateX,
            rotateY,
            duration: 0.3,
            ease: 'power2.out',
            transformPerspective: 800,
          })
        }

        if (enableMagnetism) {
          const magnetX = (x - cx) * 0.05
          const magnetY = (y - cy) * 0.05
          gsap.to(card, { x: magnetX, y: magnetY, duration: 0.3, ease: 'power2.out' })
        }
      }

      const onLeave = () => {
        isHovered = false
        clearParticles()
        gsap.to(card, { rotateX: 0, rotateY: 0, x: 0, y: 0, duration: 0.4, ease: 'power2.out' })
      }

      const onClick = (e: MouseEvent) => {
        if (!clickEffect) return
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const maxDist = Math.hypot(Math.max(x, rect.width - x), Math.max(y, rect.height - y))

        const ripple = document.createElement('div')
        ripple.className = 'mb-ripple'
        ripple.style.cssText = `
          position: absolute;
          left: ${x}px;
          top: ${y}px;
          width: ${maxDist * 2}px;
          height: ${maxDist * 2}px;
          background: radial-gradient(circle, rgba(${glowColor}, 0.35) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%) scale(0);
        `
        card.appendChild(ripple)
        gsap.to(ripple, {
          scale: 1,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          onComplete: () => ripple.remove(),
        })
      }

      card.addEventListener('mouseenter', onEnter)
      card.addEventListener('mousemove', onMove)
      card.addEventListener('mouseleave', onLeave)
      if (clickEffect) card.addEventListener('click', onClick)

      cleanups.push(() => {
        card.removeEventListener('mouseenter', onEnter)
        card.removeEventListener('mousemove', onMove)
        card.removeEventListener('mouseleave', onLeave)
        card.removeEventListener('click', onClick)
        if (isHovered) clearParticles()
      })
    })

    return () => cleanups.forEach(fn => fn())
  }, [disableAnimations, cards.length, glowColor, particleCount, spotlightRadius, enableTilt, enableMagnetism, enableStars, clickEffect])

  return (
    <div ref={gridRef} className={`mb-grid ${className}`.trim()} style={{ '--glow-color': glowColor } as React.CSSProperties}>
      {cards.map(card => (
        <div
          key={card.id}
          className={`mb-card ${card.span === 'lg' ? 'mb-card--lg' : ''}`}
          style={{ '--glow-color': glowColor } as React.CSSProperties}
        >
          <div className="mb-card-inner">
            {card.label && <span className="mb-card-label">{card.label}</span>}
            <h3 className="mb-card-title">{card.title}</h3>
            {card.description && <p className="mb-card-description">{card.description}</p>}
            {renderMedia?.(card)}
          </div>
        </div>
      ))}
    </div>
  )
}

export default MagicBento
