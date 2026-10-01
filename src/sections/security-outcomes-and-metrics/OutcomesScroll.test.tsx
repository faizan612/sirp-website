import { act, cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { OutcomesScroll } from './OutcomesScroll'
import { SOM_OUTCOMES } from '@/lib/constants/security-outcomes-and-metrics'

afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals() })

describe('Outcomes scroll presentation', () => {
  it('keeps every story available without animation support', () => {
    const { container } = render(<OutcomesScroll />)
    SOM_OUTCOMES.items.forEach(item => {
      expect(screen.getByRole('heading', { name: item.title })).toBeVisible()
      expect(screen.getByText(item.description)).toBeInTheDocument()
      expect(screen.getByText(item.description).closest('details')).not.toHaveAttribute('open')
    })
    expect(container.querySelector('[data-motion]')).toBeNull()
  })

  it('updates the active outcome with scroll and releases listeners on unmount', () => {
    const query = { matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }
    vi.stubGlobal('matchMedia', vi.fn(() => query))
    let nextFrame: FrameRequestCallback | undefined
    vi.stubGlobal('requestAnimationFrame', vi.fn(callback => { nextFrame = callback; return 1 }))
    vi.stubGlobal('cancelAnimationFrame', vi.fn())
    const remove = vi.spyOn(window, 'removeEventListener')
    const { container, unmount } = render(<OutcomesScroll />)
    expect(window.matchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: no-preference)')
    const cards = Array.from(container.querySelectorAll<HTMLElement>('[data-outcome]'))
    cards.forEach((card, index) => {
      vi.spyOn(card, 'getBoundingClientRect').mockReturnValue({ top: window.innerHeight * .55 - 260 + (index - 2) * 700, height: 520 } as DOMRect)
    })
    act(() => nextFrame?.(0))
    expect(screen.getByRole('link', { name: /Refocus the team/ })).toHaveAttribute('aria-current', 'step')
    expect(container.querySelector('[data-motion]')).not.toBeNull()
    unmount()
    expect(remove).toHaveBeenCalledWith('scroll', expect.any(Function))
    expect(query.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function))
  })

  it('disables scroll transforms for reduced motion', () => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })))
    const { container } = render(<OutcomesScroll />)
    expect(container.querySelector('[data-motion]')).toBeNull()
    expect(screen.getAllByRole('article')).toHaveLength(4)
  })
})
