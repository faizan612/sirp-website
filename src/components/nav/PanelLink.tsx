'use client'

import { useId } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { NavLink } from './nav.types'

const isDev = process.env.NODE_ENV !== 'production'

const railVariants = {
  rest: { scaleY: 0 },
  hover: { scaleY: 1 },
}

export function PanelLink({ link, onNavigate }: { link: NavLink; onNavigate?: () => void }) {
  const descriptionId = useId()

  return (
    <motion.div initial="rest" whileHover="hover" whileFocus="hover" animate="rest">
      <Link
        href={link.href}
        onClick={onNavigate}
        aria-describedby={link.description ? descriptionId : undefined}
        className="relative flex items-start gap-2 rounded-[10px] px-3 py-[10px] no-underline outline-none transition-colors duration-150 hover:bg-[var(--nav-accent-soft)] focus-visible:ring-1 focus-visible:ring-[var(--nav-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--nav-panel)]"
      >
        <motion.span
          aria-hidden
          className="absolute left-0 top-0 h-full w-[2px] rounded-full bg-[var(--nav-accent)]"
          style={{ transformOrigin: 'center' }}
          variants={railVariants}
          transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
        />
        <span className="min-w-0">
          <span className="flex items-center gap-1.5">
            <span className="font-sans text-[15px] font-medium leading-tight tracking-[-0.01em] text-[var(--nav-text)]">
              {link.label}
            </span>
            {link.badge && (
              <span className="rounded-full border border-[var(--nav-accent-wash)] bg-[var(--nav-accent-soft)] px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-[var(--nav-accent)]">
                {link.badge}
              </span>
            )}
            {isDev && link.status === 'planned' && (
              <span
                aria-hidden
                className="h-[3px] w-[3px] shrink-0 rounded-full bg-[var(--nav-text-muted)]"
                title="Planned route"
              />
            )}
          </span>
          {link.description && (
            <span id={descriptionId} className="mt-0.5 block font-sans text-[13px] leading-snug text-[var(--nav-text-muted)]">
              {link.description}
            </span>
          )}
        </span>
      </Link>
    </motion.div>
  )
}
