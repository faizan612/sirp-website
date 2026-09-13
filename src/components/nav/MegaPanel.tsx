'use client'

import { AnimatePresence, motion } from 'framer-motion'
import type { NavMenu } from './nav.types'
import { PanelColumn } from './PanelColumn'
import { FeaturedCard } from './FeaturedCard'
import { PanelFooterStrip } from './PanelFooterStrip'

const MORPH_TRANSITION = { type: 'spring' as const, stiffness: 400, damping: 40, mass: 1 }
const OPEN_TRANSITION = { duration: 0.24, ease: [0.16, 1, 0.3, 1] as const }

export function MegaPanel({
  menu,
  panelId,
  labelledBy,
  isFirstOpen,
  triggerCenterX,
  reduceMotion,
  onMouseEnter,
  onMouseLeave,
  onNavigate,
}: {
  menu: NavMenu
  panelId: string
  labelledBy: string
  isFirstOpen: boolean
  triggerCenterX: number | null
  reduceMotion: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onNavigate: () => void
}) {
  return (
    <motion.div
      role="group"
      id={panelId}
      aria-label={menu.label}
      aria-labelledby={labelledBy}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      layout={!reduceMotion}
      transition={reduceMotion ? { duration: 0 } : isFirstOpen ? OPEN_TRANSITION : MORPH_TRANSITION}
      className="relative overflow-hidden rounded-[20px] border border-[var(--nav-hairline)] bg-[var(--nav-panel)] shadow-[0_24px_64px_-16px_rgba(0,0,0,0.72)]"
    >
      {!reduceMotion && triggerCenterX !== null && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-0 h-40 w-[560px] -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(142,45,255,1) 0%, rgba(142,45,255,0) 70%)',
            opacity: 0.08,
            filter: 'blur(20px)',
          }}
          animate={{ left: triggerCenterX, x: '-50%' }}
          transition={MORPH_TRANSITION}
        />
      )}

      <div className="relative p-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={menu.id}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.14, ease: 'linear', delay: 0.04 } }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, transition: { duration: 0.14, ease: 'linear' } }}
            className="flex items-start gap-10"
          >
            <div
              className="grid flex-1 gap-10"
              style={{ gridTemplateColumns: `repeat(${menu.columns.length}, minmax(0, 1fr))` }}
            >
              {menu.columns.map((column, index) => (
                <motion.div
                  key={column.eyebrow}
                  initial={reduceMotion || !isFirstOpen ? false : { opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { ...OPEN_TRANSITION, delay: isFirstOpen ? index * 0.024 : 0 }
                  }
                >
                  <PanelColumn column={column} onNavigate={onNavigate} />
                </motion.div>
              ))}
            </div>

            {menu.featured && <FeaturedCard card={menu.featured} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {menu.footer && (
        <div className="relative px-8 pb-6">
          <PanelFooterStrip footer={menu.footer} />
        </div>
      )}
    </motion.div>
  )
}
