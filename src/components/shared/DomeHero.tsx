'use client'

import { Button } from '@/components/shared/Button'
import '@/components/shared/DomeHero.css'

interface DomeHeroBtn {
  label: string
  href: string
  variant?: 'primary' | 'secondary'
  target?: string
  rel?: string
}

interface DomeHeroProps {
  heading:   React.ReactNode
  paragraph: React.ReactNode
  buttons:   DomeHeroBtn[]
}

export function DomeHero({ heading, paragraph, buttons }: DomeHeroProps) {
  return (
    <section className="dome-hero" aria-label="Dome hero">
      {/* Dome shape */}
      <div className="dome-hero__dome" aria-hidden="true" />

      {/* Content */}
      <div className="dome-hero__content">
        <h2 className="dome-hero__heading">{heading}</h2>
        <p className="dome-hero__paragraph">{paragraph}</p>
        <div className="dome-hero__buttons">
          {buttons.map((btn, i) => (
            <Button
              key={i}
              href={btn.href}
              variant={btn.variant === 'secondary' ? 'secondary' : undefined}
              target={btn.target}
              rel={btn.rel}
            >
              {btn.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}
