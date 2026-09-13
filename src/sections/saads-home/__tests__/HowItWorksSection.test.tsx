import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { HowItWorksSection } from '../HowItWorksSection'
import { HOW_IT_WORKS_DATA } from '@/lib/constants/saads-home'

// jsdom has no IntersectionObserver; the component constructs one on mount.
beforeEach(() => {
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      observe() {}
      disconnect() {}
      unobserve() {}
    },
  )
})

describe('HowItWorksSection', () => {
  it('renders the pipeline copy unchanged', () => {
    render(<HowItWorksSection />)
    // Eyebrow + each card title come straight from the data constant.
    expect(screen.getByText(HOW_IT_WORKS_DATA.eyebrow)).toBeInTheDocument()
    for (const step of HOW_IT_WORKS_DATA.steps) {
      expect(screen.getByText(step.title)).toBeInTheDocument()
      expect(screen.getByText(step.description)).toBeInTheDocument()
    }
  })

  it('keeps every tag in the accessibility tree regardless of hover/motion', () => {
    // The reduced-motion / no-hover contract: tag content must be reachable
    // without any pointer interaction (it is hidden only via CSS opacity,
    // never removed from the DOM).
    render(<HowItWorksSection />)
    for (const step of HOW_IT_WORKS_DATA.steps) {
      for (const tag of step.tags) {
        expect(screen.getByText(tag)).toBeInTheDocument()
      }
    }
  })

  it('marks the pulse rail decorative and adds no interactive semantics to cards', () => {
    const { container } = render(<HowItWorksSection />)

    // Rail is purely decorative.
    const rail = container.querySelector('.pipeline-rail')
    expect(rail).toHaveAttribute('aria-hidden', 'true')

    // Cards are non-interactive: no button/link/role/tabindex on them.
    const cards = container.querySelectorAll('.pipeline-card')
    expect(cards.length).toBe(HOW_IT_WORKS_DATA.steps.length)
    cards.forEach((card) => {
      expect(card.tagName).toBe('ARTICLE')
      expect(card).not.toHaveAttribute('role')
      expect(card).not.toHaveAttribute('tabindex')
      expect(within(card as HTMLElement).queryByRole('button')).toBeNull()
      expect(within(card as HTMLElement).queryByRole('link')).toBeNull()
    })
  })
})
