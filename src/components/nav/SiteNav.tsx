'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { LayoutGroup, motion, useReducedMotion } from 'framer-motion'
import { NAV_MENUS, ENABLED_MENUS } from './nav-data'
import { NavBar } from './NavBar'
import { MegaPanel } from './MegaPanel'
import { MobileNav } from './MobileNav'
import { useHoverIntent } from './useHoverIntent'

export function SiteNav() {
  const { activeId, open, openImmediate, close, closeImmediate } = useHoverIntent()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [triggerCenterX, setTriggerCenterX] = useState<number | null>(null)
  const wasOpenRef = useRef(false)
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()
  const reduceMotion = Boolean(prefersReducedMotion)

  const triggerRefs = useRef<Map<string, HTMLButtonElement | HTMLAnchorElement>>(new Map())

  const registerTriggerRef = useCallback((id: string, el: HTMLButtonElement | HTMLAnchorElement | null) => {
    if (el) triggerRefs.current.set(id, el)
    else triggerRefs.current.delete(id)
  }, [])

  const measureTrigger = useCallback((id: string) => {
    const el = triggerRefs.current.get(id)
    if (!el) return
    const rect = el.getBoundingClientRect()
    setTriggerCenterX(rect.left + rect.width / 2)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    closeImmediate()
    setMobileOpen(false)
  }, [pathname, closeImmediate])

  const activeMenu = activeId ? NAV_MENUS.find((m) => m.id === activeId) ?? null : null
  const isOpen = Boolean(activeMenu)
  const isFirstOpen = isOpen && !wasOpenRef.current
  useEffect(() => {
    wasOpenRef.current = isOpen
  }, [isOpen])

  // The panel stays mounted permanently and is driven open/closed purely by
  // an animated opacity, rather than by AnimatePresence mounting/unmounting
  // it — conditionally mounting it hit a framer-motion edge case where
  // rapid hover-driven open/close cycles left the exit animation "stuck":
  // finished at opacity 0 but never actually removed (and still focusable).
  // Content is retained via this ref so the last menu keeps rendering while
  // the panel fades out instead of going blank.
  const lastMenuRef = useRef(NAV_MENUS[0])
  if (activeMenu) lastMenuRef.current = activeMenu
  const displayMenu = activeMenu ?? lastMenuRef.current

  const handleTriggerEnter = useCallback(
    (id: string) => {
      measureTrigger(id)
      open(id)
    },
    [measureTrigger, open],
  )

  const handleTriggerClick = useCallback(
    (id: string) => {
      if (activeId === id) {
        closeImmediate()
        return
      }
      measureTrigger(id)
      openImmediate(id)
    },
    [activeId, measureTrigger, openImmediate, closeImmediate],
  )

  const enabledIds = NAV_MENUS.filter((m) => ENABLED_MENUS[m.id] ?? true).map((m) => m.id)

  const handleTriggerKeyDown = useCallback(
    (e: React.KeyboardEvent, id: string) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        if (activeId === id) {
          closeImmediate()
          return
        }
        measureTrigger(id)
        openImmediate(id)
        return
      }
      if (e.key === 'Escape') {
        closeImmediate()
        triggerRefs.current.get(id)?.focus()
        return
      }
      if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && activeId) {
        e.preventDefault()
        const idx = enabledIds.indexOf(id)
        if (idx === -1) return
        const nextIdx =
          e.key === 'ArrowRight' ? (idx + 1) % enabledIds.length : (idx - 1 + enabledIds.length) % enabledIds.length
        const nextId = enabledIds[nextIdx]
        measureTrigger(nextId)
        openImmediate(nextId)
        triggerRefs.current.get(nextId)?.focus()
      }
    },
    [activeId, closeImmediate, enabledIds, measureTrigger, openImmediate],
  )

  return (
    <LayoutGroup>
      <NavBar
        menus={NAV_MENUS}
        enabledMenus={ENABLED_MENUS}
        activeId={activeId}
        scrolled={scrolled}
        panelOpen={isOpen}
        reduceMotion={reduceMotion}
        registerTriggerRef={registerTriggerRef}
        onTriggerEnter={handleTriggerEnter}
        onTriggerLeave={close}
        onTriggerClick={handleTriggerClick}
        onTriggerKeyDown={handleTriggerKeyDown}
        onMobileOpen={() => setMobileOpen(true)}
        panelSlot={
          <motion.div
            key="mega-panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: isOpen ? 1 : 0, y: 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : isFirstOpen
                  ? { duration: 0.24, ease: [0.16, 1, 0.3, 1] }
                  : { duration: isOpen ? 0.14 : 0.16, ease: isOpen ? 'linear' : 'easeOut' }
            }
            style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
            aria-hidden={!isOpen}
            inert={!isOpen}
            className="mx-auto mt-[10px] w-[calc(100%-2rem)] max-w-[1240px]"
          >
            <MegaPanel
              menu={displayMenu}
              panelId={`nav-panel-${displayMenu.id}`}
              labelledBy={`nav-trigger-${displayMenu.id}`}
              isFirstOpen={isFirstOpen}
              triggerCenterX={triggerCenterX}
              reduceMotion={reduceMotion}
              onMouseEnter={() => openImmediate(displayMenu.id)}
              onMouseLeave={close}
              onNavigate={closeImmediate}
            />
          </motion.div>
        }
      />

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} menus={NAV_MENUS} />
    </LayoutGroup>
  )
}
