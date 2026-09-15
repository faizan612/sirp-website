'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NavLink, NavMenu } from './nav.types'
import { NavChevron } from './NavIcons'
import { DemoButton } from './DemoButton'

const FOCUSABLE = 'a[href], button:not([disabled])'

function MobileLink({ link, onNavigate }: { link: NavLink; onNavigate: () => void }) {
  const body = (
    <>
      <span className="block font-sans text-[17px] font-medium leading-6 text-[var(--nav-label)]">{link.label}</span>
      {link.description && (
        <span className="mt-1 block font-sans text-[14px] leading-[18px] text-[var(--nav-desc)]">
          {link.description}
        </span>
      )}
    </>
  )

  const className =
    'block rounded-[6px] py-2 no-underline outline-none focus-visible:ring-2 focus-visible:ring-[var(--nav-accent)]'

  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" onClick={onNavigate} className={className}>
        {body}
      </a>
    )
  }

  return (
    <Link href={link.href} onClick={onNavigate} className={className}>
      {body}
    </Link>
  )
}

export function MobileNav({
  open,
  onClose,
  menus,
  reduceMotion,
}: {
  open: boolean
  onClose: () => void
  menus: NavMenu[]
  reduceMotion: boolean
}) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) {
      setExpanded(null)
      return
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      // Keep Tab inside the drawer while it covers the page.
      const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)
      if (!nodes || nodes.length === 0) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            aria-hidden
            className="fixed inset-0 z-50 bg-black/60 xl:hidden"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[420px] flex-col overflow-y-auto [background:var(--nav-surface)] xl:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-end px-6 py-[10px]">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[12px] border-none bg-transparent text-[var(--nav-label)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--nav-accent)]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 px-6 pb-6">
              {menus.map((menu) => {
                const isExpanded = expanded === menu.id
                const columns = menu.columns ?? []

                // Link-only top-level item (see nav-data.ts) — no accordion.
                if (columns.length === 0) {
                  return (
                    <div key={menu.id} className="border-b border-[#2a2a2a]">
                      <Link
                        href={menu.href ?? '/'}
                        onClick={onClose}
                        className="block py-4 font-sans text-[16px] font-medium leading-[19px] text-[var(--nav-label)] no-underline outline-none focus-visible:ring-2 focus-visible:ring-[var(--nav-accent)]"
                      >
                        {menu.label}
                      </Link>
                    </div>
                  )
                }

                return (
                  <div key={menu.id} className="border-b border-[#2a2a2a]">
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      aria-controls={`mobile-panel-${menu.id}`}
                      onClick={() => setExpanded(isExpanded ? null : menu.id)}
                      className="flex w-full cursor-pointer items-center justify-between gap-1.5 border-none bg-transparent px-0 py-4 text-left font-sans text-[16px] font-medium leading-[19px] text-[var(--nav-label)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--nav-accent)]"
                    >
                      {menu.label}
                      <NavChevron
                        className={cn(
                          'shrink-0 text-[var(--nav-label-dim)] transition-transform duration-200',
                          isExpanded && 'rotate-180',
                        )}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          id={`mobile-panel-${menu.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={reduceMotion ? { duration: 0 } : { duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-6 pb-5">
                            {columns.map((column) => (
                              <div key={column.eyebrow}>
                                <p className="m-0 mb-2 font-sans text-[13px] font-medium uppercase leading-5 text-[var(--nav-eyebrow)]">
                                  {column.eyebrow}
                                </p>
                                <ul className="m-0 flex list-none flex-col p-0">
                                  {column.links.map((link) => (
                                    <li key={link.label}>
                                      <MobileLink link={link} onNavigate={onClose} />
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

            <div className="sticky bottom-0 px-6 pb-6 pt-2 [background:var(--nav-surface)]">
              <DemoButton className="w-full" onClick={onClose} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
