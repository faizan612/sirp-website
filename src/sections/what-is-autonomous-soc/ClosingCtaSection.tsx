import Link from 'next/link'
import { Button } from '@/components/shared/Button'
import { Eyebrow } from './Eyebrow'
import './ClosingCtaSection.css'

type CtaLink = {
  label: string
  href: string
}

export type ClosingCtaData = {
  eyebrow: string
  heading: string
  primary: CtaLink
  secondary: CtaLink
  tertiary: CtaLink
}

type ClosingCtaSectionProps = {
  data: ClosingCtaData
}

/**
 * S10 — the conversion band. Accent-bordered, with a real demo CTA (not the
 * old self-link), a "see how it works" secondary, and the Try SARA free link.
 */
export function ClosingCtaSection({ data }: ClosingCtaSectionProps) {
  return (
    <section className="wsoc-cta" aria-labelledby="wsoc-cta-eyebrow">
      <div className="container-sirp">
        <div className="wsoc-cta-band">
          <div className="wsoc-cta-glow" aria-hidden="true" />
          <Eyebrow id="wsoc-cta-eyebrow" className="wsoc-cta-eyebrow">
            {data.eyebrow}
          </Eyebrow>
          <h2 className="wsoc-cta-heading">{data.heading}</h2>

          <div className="wsoc-cta-actions">
            <Button href={data.primary.href}>{data.primary.label}</Button>
            <Button href={data.secondary.href} variant="secondary">
              {data.secondary.label}
            </Button>
          </div>

          <Link
            href={data.tertiary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="wsoc-cta-tertiary"
          >
            {data.tertiary.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
