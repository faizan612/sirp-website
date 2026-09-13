'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PrimaryButton } from '@/components/homepage/ui/primary-button'
import Image from 'next/image'
import { Menu } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/shared/Button'
import type { NavMenu } from './nav.types'

const UNDERLINE_TRANSITION = { type: 'spring' as const, stiffness: 500, damping: 38 }

export function NavBar({
  menus,
  enabledMenus,
  activeId,
  scrolled,
  panelOpen,
  reduceMotion,
  registerTriggerRef,
  onTriggerEnter,
  onTriggerLeave,
  onTriggerClick,
  onTriggerKeyDown,
  onMobileOpen,
  panelSlot,
}: {
  menus: NavMenu[]
  enabledMenus: Record<string, boolean>
  activeId: string | null
  scrolled: boolean
  panelOpen: boolean
  reduceMotion: boolean
  registerTriggerRef: (id: string, el: HTMLButtonElement | HTMLAnchorElement | null) => void
  onTriggerEnter: (id: string) => void
  onTriggerLeave: () => void
  onTriggerClick: (id: string) => void
  onTriggerKeyDown: (e: React.KeyboardEvent, id: string) => void
  onMobileOpen: () => void
  panelSlot?: React.ReactNode
}) {
  const isHomepage = usePathname() === '/'
  return (
    <header
      data-chrome="global"
      className="sticky top-0 z-40 w-full"
      style={isHomepage ? { backgroundColor: '#0e0e0e' } : undefined}
    >
      {/* Hidden defs for the header's clipped silhouette: flat across the
          middle, curving sharply inward starting ~10% before each edge. */}
      <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
        <defs>
          <clipPath id="nav-shape" clipPathUnits="objectBoundingBox">
            <path d="M0,0 L1,0 L1,0.3 Q1,1 0.9,1 L0.1,1 Q0,1 0,0.3 Z" />
          </clipPath>
        </defs>
      </svg>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={isHomepage ? {
          filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.25))',
        } : undefined}
      >
      <div
        className={cn(
          'absolute inset-0 transition-[background-color,height] duration-300',
          panelOpen
            ? 'bg-[var(--nav-base)]'
            : scrolled
              ? 'bg-[var(--nav-base)]/72 backdrop-blur-xl'
              : 'bg-[var(--nav-base)]/72 backdrop-blur-xl',
        )}
        style={{
          clipPath: 'url(#nav-shape)',
          filter: isHomepage ? undefined : `drop-shadow(0 1px 0 var(${panelOpen || scrolled ? '--nav-hairline-lit' : '--nav-hairline'}))`,
        }}
      />
      </div>

      <nav
        className={cn(
          'container-sirp relative flex items-center justify-between transition-[height] duration-300',
          scrolled ? 'h-[60px]' : 'h-[72px]',
        )}
      >
        <Link href="/" aria-label="SIRP home" className="shrink-0">
          <Image
            src="/images/logos/SIRP-Logo.svg"
            alt="SIRP"
            width={100}
            height={36}
            priority
            className="h-9 w-auto object-contain"
          />
        </Link>

        <ul className="m-0 hidden list-none items-center gap-1 p-0 lg:flex">
          {menus.map((menu) => {
            const enabled = enabledMenus[menu.id] ?? true
            const isActive = activeId === menu.id
            const label = (
              <>
                {menu.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-4 bottom-0 h-[2px] rounded-full bg-[var(--nav-accent)]"
                    transition={reduceMotion ? { duration: 0 } : UNDERLINE_TRANSITION}
                  />
                )}
              </>
            )

            return (
              <li
                key={menu.id}
                className="relative"
                onMouseEnter={() => enabled && onTriggerEnter(menu.id)}
                onMouseLeave={() => enabled && onTriggerLeave()}
              >
                {enabled ? (
                  <button
                    ref={(el) => registerTriggerRef(menu.id, el)}
                    type="button"
                    aria-expanded={isActive}
                    aria-controls={`nav-panel-${menu.id}`}
                    id={`nav-trigger-${menu.id}`}
                    onClick={() => onTriggerClick(menu.id)}
                    onKeyDown={(e) => onTriggerKeyDown(e, menu.id)}
                    className={cn(
                      'relative rounded-[10px] px-4 py-2 font-sans text-[15px] font-medium tracking-[-0.01em] outline-none transition-colors duration-150 focus-visible:ring-1 focus-visible:ring-[var(--nav-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--nav-base)]',
                      isActive ? 'text-[var(--nav-text)]' : 'text-[var(--nav-text-muted)] hover:text-[var(--nav-text)]',
                    )}
                  >
                    {label}
                  </button>
                ) : (
                  <Link
                    ref={(el) => registerTriggerRef(menu.id, el)}
                    href={menu.href ?? menu.columns[0]?.links[0]?.href ?? '/'}
                    id={`nav-trigger-${menu.id}`}
                    className="relative flex items-center rounded-[10px] px-4 py-2 font-sans text-[15px] font-medium tracking-[-0.01em] text-[var(--nav-text-muted)] no-underline outline-none transition-colors duration-150 hover:text-[var(--nav-text)] focus-visible:ring-1 focus-visible:ring-[var(--nav-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--nav-base)]"
                  >
                    {label}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          {isHomepage ? (
            <PrimaryButton href="/contact">Get a Demo</PrimaryButton>
          ) : (
            <Button href="/contact" variant="primary" className="!bg-[var(--nav-accent)]">
              Get a demo
            </Button>
          )}
        </div>

        <button
          type="button"
          onClick={onMobileOpen}
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center rounded-[50px] border-none bg-[var(--nav-accent)] text-white outline-none focus-visible:ring-1 focus-visible:ring-[var(--nav-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--nav-base)] lg:hidden"
        >
          <Menu size={18} />
        </button>
      </nav>

      {panelSlot && (
        <div className="pointer-events-none absolute inset-x-0 top-full z-40">
          <div className="pointer-events-auto">{panelSlot}</div>
        </div>
      )}
    </header>
  )
}
