'use client'

import { motion, useReducedMotion } from 'framer-motion'

export interface DossierCardProps {
  index: number
  role: string
  copy: string
  isActive: boolean
  onSelect: () => void
}

/**
 * ID-badge / dossier styling for the three personas this page addresses.
 * A thin left-edge accent bar replaces the old pill-icon; selecting a card
 * is a real tab interaction now, not a static purple border on one card
 * with no interaction behind it.
 */
export function DossierCard({ index, role, copy, isActive, onSelect }: DossierCardProps) {
  const reduce = useReducedMotion()

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isActive}
      className="dossier-card group relative grid w-full items-start overflow-hidden rounded-[16px] border border-[#3a3a4d] px-7 py-4 text-left transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8e2dff]"
      style={{
        borderColor: isActive ? 'transparent' : undefined,
        background: 'linear-gradient(160deg, #17171f 0%, #101014 100%)',
        gridTemplateColumns: 'clamp(110px, 30vw, 160px) 1fr',
        gridTemplateRows: 'auto auto',
        columnGap: '2rem',
        rowGap: '0.25rem',
      }}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1"
        style={{ background: '#8e2dff' }}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0.45 }}
        transition={{ duration: 0.3 }}
      />

      <span className="col-start-1 row-start-1 block font-mono text-[11px] uppercase tracking-[0.1em] text-[#8e2dff]">
        {`Role // 0${index}`}
      </span>
      <span
        className="col-start-1 row-start-2 block font-sans font-semibold text-white"
        style={{ fontSize: 'clamp(1.35rem, 2.2vw, 1.75rem)' }}
      >
        {role}
      </span>

      <motion.p
        className="col-start-2 row-start-2 self-start font-sans text-[15px] leading-[1.6] text-white/70"
        animate={{ opacity: isActive ? 1 : 0.6 }}
        transition={{ duration: 0.3 }}
      >
        {copy}
      </motion.p>
    </button>
  )
}
