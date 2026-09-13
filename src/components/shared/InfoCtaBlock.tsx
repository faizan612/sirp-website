import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/shared/Button'
import './InfoCtaBlock.css'

export type InfoCtaBlockCta = {
  label: string
  href: string
}

export type InfoCtaBlockProps = {
  heading: ReactNode
  body: ReactNode
  button?: InfoCtaBlockCta
  secondaryButton?: InfoCtaBlockCta
  /** Extra classes on the root `<section>` (e.g. page-specific layout). */
  sectionClassName?: string
  /** SOAR vs Autonomous — closing authority strip: left-aligned, looser paragraphs, soft purple floor. */
  variant?: 'default' | 'authority'
}

export function InfoCtaBlock({
  heading,
  body,
  button,
  secondaryButton,
  sectionClassName,
  variant = 'default',
}: InfoCtaBlockProps) {
  const hasButtons = Boolean(button || secondaryButton)

  const sectionClass =
    variant === 'authority' ? 'info-cta-block info-cta-block--authority' : 'info-cta-block'

  return (
    <section className={cn(sectionClass, sectionClassName)}>
      <div className="container-sirp info-cta-inner">
        <h2 className="info-cta-heading">{heading}</h2>

        <div className="info-cta-body">{body}</div>

        {hasButtons && (
          <div className="info-cta-button-row">
            {button && <Button href={button.href}>{button.label}</Button>}
            {secondaryButton && (
              <Button href={secondaryButton.href} variant="secondary">
                {secondaryButton.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

