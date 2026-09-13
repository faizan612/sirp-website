import type { ReactNode } from 'react'
import { PurplePill } from '@/components/shared/PurplePill'
import { Button, type ButtonVariant } from '@/components/shared/Button'
import './PageHeader.css'

export type PageHeaderButton = {
  label: string
  href: string
  variant?: ButtonVariant
}

export type PageHeaderProps = {
  badgeText?: string
  heading: ReactNode
  /** Optional second title line (e.g. Framer h2 at 60px) — renders as h2 below the main h1 */
  headingLine2?: ReactNode
  subtext: ReactNode
  /** Default true. Set false to remove the bottom border for a flush join with the next section. */
  showBottomBorder?: boolean
  /**
   * `/soar-vs-autonomous-soc`: match site `container-sirp` horizontal padding and widen intro
   * so the hero subtext breaks on the intended lines.
   */
  heroLayout?: 'default' | 'soar'
  /** Optional CTA row below the subtext (e.g. Partners hero's two buttons). */
  buttons?: readonly PageHeaderButton[]
}

export function PageHeader({
  badgeText,
  heading,
  headingLine2,
  subtext,
  showBottomBorder = true,
  heroLayout = 'default',
  buttons,
}: PageHeaderProps) {
  const sectionClassName = [
    showBottomBorder ? 'page-header' : 'page-header page-header--flush',
    heroLayout === 'soar' ? 'page-header--soar-hero' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section className={sectionClassName}>
      <div className="container-sirp page-header-inner">
        <div className="page-header-stack">
          {badgeText && (
            <div className="page-header-badge">
              <PurplePill>{badgeText}</PurplePill>
            </div>
          )}

          <h1 className="page-header-heading">{heading}</h1>
          {headingLine2 != null ? <h2 className="page-header-heading-line2">{headingLine2}</h2> : null}
          <div className="page-header-subtext">{subtext}</div>

          {buttons && buttons.length > 0 && (
            <div className="page-header-buttons">
              {buttons.map((btn) => (
                <Button key={btn.label} href={btn.href} variant={btn.variant}>
                  {btn.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

