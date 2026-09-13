'use client'

import { forwardRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

/* ─── Button ─────────────────────────────────────────────── */
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
type ButtonSize    = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  ButtonVariant
  size?:     ButtonSize
  href?:     string
  external?: boolean
  children:  React.ReactNode
}

const buttonStyles: Record<ButtonVariant, string> = {
  primary:   'bg-purple text-white hover:bg-purple-light glow-purple',
  secondary: 'bg-bg-elevated text-text-primary hover:bg-bg-surface border border-border-med',
  ghost:     'text-text-secondary hover:text-text-primary hover:bg-bg-elevated',
  outline:   'border border-purple text-purple-light hover:bg-purple-dim',
}

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-base',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', href, external, className, children, ...props }, ref) => {
    const cls = cn(
      'inline-flex items-center justify-center gap-2 font-medium rounded-sirp-md',
      'transition-all duration-200 active:scale-[0.98] disabled:opacity-50',
      buttonStyles[variant],
      buttonSizes[size],
      className,
    )

    if (href) {
      return external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      ) : (
        <Link href={href} className={cls}>{children}</Link>
      )
    }

    return (
      <button ref={ref} className={cls} {...props}>
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

/* ─── Section Wrapper ────────────────────────────────────── */
interface SectionWrapperProps {
  children:     React.ReactNode
  className?:   string
  id?:          string
  noContainer?: boolean
}

export function SectionWrapper({ children, className, id, noContainer }: SectionWrapperProps) {
  return (
    <section id={id} className={cn('py-24', className)}>
      {noContainer ? children : (
        <div className="container-sirp">{children}</div>
      )}
    </section>
  )
}

/* ─── Pill ───────────────────────────────────────────────── */
export function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('pill', className)}>{children}</span>
  )
}

/* ─── Section Heading ────────────────────────────────────── */
interface SectionHeadingProps {
  pill?:       string
  heading:     string
  subheading?: string
  center?:     boolean
  className?:  string
}

export function SectionHeading({ pill, heading, subheading, center, className }: SectionHeadingProps) {
  return (
    <div className={cn(center && 'text-center', 'mb-12', className)}>
      {pill && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className={cn('mb-4', center && 'flex justify-center')}
        >
          <Pill>{pill}</Pill>
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="text-display-md font-medium text-text-primary"
      >
        {heading}
      </motion.h2>
      {subheading && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={cn(
            'mt-4 text-lg text-text-secondary leading-relaxed max-w-2xl',
            center && 'mx-auto',
          )}
        >
          {subheading}
        </motion.p>
      )}
    </div>
  )
}

/* ─── Card ───────────────────────────────────────────────── */
interface CardProps {
  children:  React.ReactNode
  className?: string
  hover?:     boolean
  glow?:      boolean
}

export function Card({ children, className, hover, glow }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-sirp-lg border border-border bg-bg-elevated p-6',
        hover && 'hover:border-border-med hover:bg-bg-surface transition-all duration-300',
        glow  && 'hover:shadow-[0_0_32px_rgba(142,45,255,0.2)] transition-shadow duration-300',
        className,
      )}
    >
      {children}
    </div>
  )
}

/* ─── Divider ────────────────────────────────────────────── */
export function Divider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('section-divider', className)}
    />
  )
}
