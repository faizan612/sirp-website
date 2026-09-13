'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/shared/Button'
import type { NavMenu } from './nav.types'

const isDev = process.env.NODE_ENV !== 'production'

export function MobileNav({
  open,
  onClose,
  menus,
}: {
  open: boolean
  onClose: () => void
  menus: NavMenu[]
}) {
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    if (!open) {
      setExpanded(null)
      return
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-50 border-none bg-black/60 lg:hidden"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[360px] flex-col overflow-y-auto bg-[var(--nav-base)] lg:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-end p-4">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-[10px] text-[var(--nav-text-muted)] outline-none focus-visible:ring-1 focus-visible:ring-[var(--nav-accent)]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 px-4 pb-6">
              {menus.map((menu) => {
                const isExpanded = expanded === menu.id
                return (
                  <div key={menu.id} className="border-b border-[var(--nav-hairline)]">
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      onClick={() => setExpanded(isExpanded ? null : menu.id)}
                      className="flex w-full items-center justify-between py-4 text-left font-sans text-base font-medium text-[var(--nav-text)] outline-none"
                    >
                      {menu.label}
                      <span aria-hidden className={isExpanded ? 'rotate-180 transition-transform' : 'transition-transform'}>
                        &#8964;
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-5 pb-4">
                            {menu.columns.map((column) => (
                              <div key={column.eyebrow}>
                                <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--nav-text-eyebrow)]">
                                  {column.eyebrow}
                                </p>
                                <ul className="m-0 flex list-none flex-col gap-1 p-0">
                                  {column.links.map((link) => (
                                    <li key={link.href}>
                                      <Link
                                        href={link.href}
                                        onClick={onClose}
                                        className="flex items-center gap-1.5 py-1.5 font-sans text-[15px] text-[var(--nav-text)] no-underline"
                                      >
                                        {link.label}
                                        {isDev && link.status === 'planned' && (
                                          <span
                                            aria-hidden
                                            className="h-[3px] w-[3px] shrink-0 rounded-full bg-[var(--nav-text-muted)]"
                                          />
                                        )}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            <div className="flex flex-col gap-3 border-t border-[var(--nav-hairline)] px-4 py-4">
              <Button href="/contact" variant="secondary" className="mt-2 w-full justify-center">
                Get a demo
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
