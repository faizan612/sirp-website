'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NavMenu } from './nav.types'
import { MegaPanel } from './MegaPanel'
import { NavChevron } from './NavIcons'
import { DemoButton } from './DemoButton'
import { NAV_INSET, NAV_ITEM_GAP, NAV_LOGO_GAP, NAV_PANEL_TOP_PAD } from './nav-style'

export function NavBar({
  menus,
  activeId,
  panelMenu,
  reduceMotion,
  surfaceRef,
  mobileToggleRef,
  registerTriggerRef,
  onTriggerEnter,
  onSurfaceLeave,
  onTriggerClick,
  onTriggerKeyDown,
  onMobileOpen,
  onNavigate,
}: {
  menus: NavMenu[]
  activeId: string | null
  /** Stays populated while the panel closes so it doesn't blank mid-animation. */
  panelMenu: NavMenu
  reduceMotion: boolean
  surfaceRef: React.RefObject<HTMLDivElement | null>
  mobileToggleRef: React.RefObject<HTMLButtonElement | null>
  registerTriggerRef: (id: string, el: HTMLButtonElement | HTMLAnchorElement | null) => void
  onTriggerEnter: (id: string) => void
  onSurfaceLeave: () => void
  onTriggerClick: (id: string) => void
  onTriggerKeyDown: (e: React.KeyboardEvent, id: string) => void
  onMobileOpen: () => void
  onNavigate: () => void
}) {
  const isOpen = activeId !== null

  // The panel grows the shared surface downward, so its height has to be a real
  // number for the open/close and menu-to-menu transitions to interpolate.
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)

  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    const measure = () => setContentHeight(el.offsetHeight)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  // Below xl the panel is display:none, so the observer above can only have
  // seen a height of 0. Re-measure whenever we're about to open or swap menus.
  useEffect(() => {
    if (isOpen && contentRef.current) setContentHeight(contentRef.current.offsetHeight)
  }, [isOpen, panelMenu])

  return (
    // The header only reserves the closed bar's height; the surface below is
    // absolutely positioned so an open panel overlays the page instead of
    // pushing it down.
    <header data-chrome="global" className="sticky top-0 z-50 h-[69px]">
      <div
        ref={surfaceRef}
        onMouseLeave={onSurfaceLeave}
        className="absolute inset-x-0 top-0 [background:var(--nav-surface)] backdrop-blur-[40px]"
      >
        <div className={cn(NAV_INSET, 'pb-[11px] pt-[10px]')}>
          <div className="flex h-12 items-center justify-between">
            <div className={cn('flex min-w-0 items-center', NAV_LOGO_GAP)}>
              <Link href="/" aria-label="SIRP home" onClick={onNavigate} className="shrink-0">
                {/* Figma logo lockup: 74 x 32. */}
                <Image
                  src="/images/logos/SIRP-Logo.svg"
                  alt="SIRP"
                  width={74}
                  height={32}
                  priority
                  className="block object-contain"
                  style={{ height: 32, width: 'auto' }}
                />
              </Link>

              <ul className={cn('m-0 hidden list-none items-center p-0 xl:flex', NAV_ITEM_GAP)}>
                {menus.map((menu) => {
                  const isActive = activeId === menu.id
                  const hasPanel = Boolean(menu.columns?.length)
                  // Figma dims the siblings of the open menu; with nothing open
                  // every label is white.
                  const labelClass = cn(
                    'flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[6px] border-none bg-transparent p-0 no-underline',
                    'font-sans text-[16px] font-medium leading-[19px] outline-none transition-colors duration-150',
                    'focus-visible:ring-2 focus-visible:ring-[var(--nav-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[#161718]',
                    !isOpen || isActive
                      ? 'text-[var(--nav-label)]'
                      : 'text-[var(--nav-label-dim)] hover:text-[var(--nav-label)]',
                  )

                  return (
                    <li key={menu.id}>
                      {hasPanel ? (
                        <button
                          ref={(el) => registerTriggerRef(menu.id, el)}
                          type="button"
                          id={`nav-trigger-${menu.id}`}
                          aria-expanded={isActive}
                          aria-controls="nav-mega-panel"
                          onMouseEnter={() => onTriggerEnter(menu.id)}
                          onClick={() => onTriggerClick(menu.id)}
                          onKeyDown={(e) => onTriggerKeyDown(e, menu.id)}
                          className={labelClass}
                        >
                          {menu.label}
                          <NavChevron className="shrink-0 text-[var(--nav-label-dim)]" />
                        </button>
                      ) : (
                        // A top-level item whose children all lack pages becomes
                        // a plain link: no chevron, and hovering it closes
                        // whatever panel is open rather than leaving it hanging.
                        <Link
                          ref={(el) => registerTriggerRef(menu.id, el)}
                          href={menu.href ?? '/'}
                          id={`nav-trigger-${menu.id}`}
                          onMouseEnter={onSurfaceLeave}
                          onClick={onNavigate}
                          className={labelClass}
                        >
                          {menu.label}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <DemoButton className="hidden xl:inline-flex" onClick={onNavigate} />
              <button
                ref={mobileToggleRef}
                type="button"
                onClick={onMobileOpen}
                aria-label="Open menu"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[12px] border-none bg-[var(--nav-cta)] text-white outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414] xl:hidden"
              >
                <Menu size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Plain CSS height transition rather than a motion value: the panel
            drives the height of the shared surface, so it needs to land on an
            exact pixel value on every render, including menu-to-menu swaps. */}
        <div
          id="nav-mega-panel"
          role="group"
          aria-label={`${panelMenu.label} menu`}
          aria-hidden={!isOpen}
          inert={!isOpen}
          className="hidden overflow-hidden xl:block"
          style={{
            height: isOpen ? contentHeight : 0,
            pointerEvents: isOpen ? 'auto' : 'none',
            transition: reduceMotion ? 'none' : `height ${isOpen ? 260 : 200}ms cubic-bezier(0.16, 1, 0.3, 1)`,
          }}
        >
          <div ref={contentRef} className={cn(NAV_INSET, 'pb-10')} style={{ paddingTop: NAV_PANEL_TOP_PAD }}>
            <MegaPanel menu={panelMenu} reduceMotion={reduceMotion} onNavigate={onNavigate} />
          </div>
        </div>

        {/* Figma: 1px inside bottom stroke, #474747 fading to transparent at both ends. */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-px [background:var(--nav-rule)]" />
      </div>
    </header>
  )
}
