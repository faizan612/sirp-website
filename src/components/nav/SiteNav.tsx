'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useReducedMotion } from 'framer-motion'
import { NAV_MENUS } from './nav-data'
import { NavBar } from './NavBar'
import { MobileNav } from './MobileNav'
import { useHoverIntent } from './useHoverIntent'

// Only the menus that actually open a panel take part in arrow-key roving and
// in the panel's own state; a link-only item (Partners) is just a link.
const PANEL_MENUS = NAV_MENUS.filter((menu) => Boolean(menu.columns?.length))
const MENU_IDS = PANEL_MENUS.map((menu) => menu.id)

export function SiteNav() {
  const { activeId, open, openImmediate, close, closeImmediate } = useHoverIntent()
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const reduceMotion = Boolean(useReducedMotion())

  const surfaceRef = useRef<HTMLDivElement>(null)
  const mobileToggleRef = useRef<HTMLButtonElement>(null)
  const triggerRefs = useRef<Map<string, HTMLButtonElement | HTMLAnchorElement>>(new Map())
  const wantsPanelFocus = useRef(false)

  const registerTriggerRef = useCallback((id: string, el: HTMLButtonElement | HTMLAnchorElement | null) => {
    if (el) triggerRefs.current.set(id, el)
    else triggerRefs.current.delete(id)
  }, [])

  const focusTrigger = useCallback((id: string) => {
    triggerRefs.current.get(id)?.focus()
  }, [])

  // Close on navigation.
  useEffect(() => {
    closeImmediate()
    setMobileOpen(false)
  }, [pathname, closeImmediate])

  useEffect(() => {
    if (activeId === null) return

    const onPointerDown = (e: PointerEvent) => {
      if (!surfaceRef.current?.contains(e.target as Node)) closeImmediate()
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      const id = activeId
      closeImmediate()
      focusTrigger(id)
    }

    // Tabbing out of the header closes it, so the panel never sits open behind
    // the page while focus has moved on.
    const onFocusIn = (e: FocusEvent) => {
      if (!surfaceRef.current?.contains(e.target as Node)) closeImmediate()
    }

    document.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('keydown', onKeyDown)
    document.addEventListener('focusin', onFocusIn)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('focusin', onFocusIn)
    }
  }, [activeId, closeImmediate, focusTrigger])

  // ArrowDown on a trigger moves focus into the panel, but only once the open
  // has committed and `inert` is gone.
  useEffect(() => {
    if (!wantsPanelFocus.current) return
    wantsPanelFocus.current = false
    if (activeId === null) return
    document.getElementById('nav-mega-panel')?.querySelector<HTMLElement>('a[href]')?.focus()
  }, [activeId])

  const activeMenu = activeId ? (PANEL_MENUS.find((menu) => menu.id === activeId) ?? null) : null

  // Keep rendering the last menu while the panel collapses instead of blanking.
  const lastMenuRef = useRef(PANEL_MENUS[0])
  if (activeMenu) lastMenuRef.current = activeMenu
  const panelMenu = activeMenu ?? lastMenuRef.current

  const handleTriggerClick = useCallback(
    (id: string) => {
      if (activeId === id) closeImmediate()
      else openImmediate(id)
    },
    [activeId, closeImmediate, openImmediate],
  )

  const handleTriggerKeyDown = useCallback(
    (e: React.KeyboardEvent, id: string) => {
      // Enter/Space arrive as a click on a <button>, handled above.
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        // The panel is `inert` until this open commits, so focus has to wait
        // for the effect below rather than move here.
        wantsPanelFocus.current = true
        openImmediate(id)
        return
      }
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault()
        const index = MENU_IDS.indexOf(id)
        if (index === -1) return
        const next =
          e.key === 'ArrowRight'
            ? MENU_IDS[(index + 1) % MENU_IDS.length]
            : MENU_IDS[(index - 1 + MENU_IDS.length) % MENU_IDS.length]
        // Only carry the panel along if one is already open; otherwise this is
        // plain roving focus across the bar.
        if (activeId !== null) openImmediate(next)
        focusTrigger(next)
      }
    },
    [activeId, focusTrigger, openImmediate],
  )

  const handleMobileClose = useCallback(() => {
    setMobileOpen(false)
    mobileToggleRef.current?.focus()
  }, [])

  return (
    <>
      <NavBar
        menus={NAV_MENUS}
        activeId={activeId}
        panelMenu={panelMenu}
        reduceMotion={reduceMotion}
        surfaceRef={surfaceRef}
        mobileToggleRef={mobileToggleRef}
        registerTriggerRef={registerTriggerRef}
        onTriggerEnter={open}
        onSurfaceLeave={close}
        onTriggerClick={handleTriggerClick}
        onTriggerKeyDown={handleTriggerKeyDown}
        onMobileOpen={() => setMobileOpen(true)}
        onNavigate={closeImmediate}
      />

      <MobileNav open={mobileOpen} onClose={handleMobileClose} menus={NAV_MENUS} reduceMotion={reduceMotion} />
    </>
  )
}
