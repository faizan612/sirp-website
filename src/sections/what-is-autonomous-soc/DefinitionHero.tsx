import { Fragment, type ReactNode } from 'react'
import { Button } from '@/components/shared/Button'
import { Eyebrow } from './Eyebrow'
import './DefinitionHero.css'

type HeadingParts = {
  prefix: string
  emphasized: string
  suffix: string
}

type CtaLink = {
  label: string
  href: string
}

export type DefinitionHeroData = {
  eyebrow: string
  loopVerbs: readonly string[]
  primaryCta: CtaLink
  secondaryCta: CtaLink
}

type DefinitionHeroProps = {
  heading: HeadingParts
  /** The one-sentence definition — rendered large with loop verbs emphasized. */
  definition: string
  /** Supporting lines beneath the definition. */
  supporting: readonly string[]
  data: DefinitionHeroData
}

/** Wrap the loop verbs in `definition` with accent spans — single source of
 *  truth (no duplicated copy). Matches each verb as a whole word. */
function emphasizeVerbs(text: string, verbs: readonly string[]): ReactNode[] {
  if (verbs.length === 0) return [text]
  const pattern = new RegExp(`(\\b(?:${verbs.join('|')})\\b)`, 'gi')
  return text.split(pattern).map((part, i) =>
    verbs.some((v) => v.toLowerCase() === part.toLowerCase()) ? (
      <span key={i} className="wsoc-hero-verb">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  )
}

/**
 * S1 — the definition is the design. Mono eyebrow, the one-sentence
 * definition as the typographic centerpiece (loop verbs in accent), two
 * CTAs, and a subtle purple radial glow. No stock imagery.
 */
export function DefinitionHero({ heading, definition, supporting, data }: DefinitionHeroProps) {
  return (
    <section className="wsoc-hero" aria-labelledby="wsoc-hero-heading">
      <div className="wsoc-hero-glow" aria-hidden="true" />
      <div className="container-sirp wsoc-hero-inner">
        <Eyebrow className="wsoc-hero-eyebrow">{data.eyebrow}</Eyebrow>

        <h1 id="wsoc-hero-heading" className="wsoc-hero-heading">
          {heading.prefix}
          <em>{heading.emphasized}</em>
          {heading.suffix}
        </h1>

        <p className="wsoc-hero-definition">{emphasizeVerbs(definition, data.loopVerbs)}</p>

        <div className="wsoc-hero-supporting">
          {supporting.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div className="wsoc-hero-ctas">
          <Button href={data.primaryCta.href}>{data.primaryCta.label}</Button>
          <Button
            href={data.secondaryCta.href}
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.secondaryCta.label}
          </Button>
        </div>
      </div>
    </section>
  )
}
