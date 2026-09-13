import type { ButtonHTMLAttributes, HTMLAttributeAnchorTarget, ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import './Button.css'

export type ButtonVariant = 'primary' | 'secondary'

type ButtonClassProps = {
  children: ReactNode
  variant?: ButtonVariant
  className?: string
  disabled?: boolean
}

type ButtonAsLink = ButtonClassProps & {
  href: string
  target?: HTMLAttributeAnchorTarget
  rel?: string
  onClick?: never
  type?: never
}

type ButtonAsButton = ButtonClassProps & {
  href?: never
  target?: never
  rel?: never
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
  type?: 'button' | 'submit'
}

export type ButtonProps = ButtonAsLink | ButtonAsButton

function buttonClasses(variant: ButtonVariant, className?: string, disabled?: boolean) {
  return cn(
    'sirp-button',
    variant === 'secondary' && 'sirp-button--secondary',
    disabled && 'sirp-button--disabled',
    className,
  )
}

function ButtonContent({ children, variant, disabled }: { children: ReactNode; variant: ButtonVariant; disabled?: boolean }) {
  return (
    <>
      <span className="sirp-button__text">{children}</span>
      {variant === 'primary' && !disabled && <span className="sirp-button__glow" aria-hidden />}
    </>
  )
}

export function Button(props: ButtonProps) {
  const { children, variant = 'primary', className, disabled } = props
  const classes = buttonClasses(variant, className, disabled)

  if ('href' in props && props.href) {
    if (disabled) {
      return (
        <span className={classes} aria-disabled="true">
          <ButtonContent variant={variant} disabled>
            {children}
          </ButtonContent>
        </span>
      )
    }

    return (
      <Link href={props.href} target={props.target} rel={props.rel} className={classes}>
        <ButtonContent variant={variant}>{children}</ButtonContent>
      </Link>
    )
  }

  return (
    <button
      type={props.type ?? 'button'}
      className={classes}
      disabled={disabled}
      onClick={props.onClick}
    >
      <ButtonContent variant={variant} disabled={disabled}>
        {children}
      </ButtonContent>
    </button>
  )
}
