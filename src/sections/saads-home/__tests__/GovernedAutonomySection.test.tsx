import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { GovernedAutonomySection } from '../GovernedAutonomySection'
import { GOVERNED_DATA } from '@/lib/constants/saads-home'

// Lottie is loaded via next/dynamic with ssr:false and pulls JSON via
// require(); stub it so the widget renders without the animation payload.
vi.mock('next/dynamic', () => ({
  default: () => () => null,
}))

// framer-motion's whileInView needs IntersectionObserver, absent in jsdom.
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

describe('GovernedAutonomySection', () => {
  it('switches the screenshot and its accessible description when tabs are clicked', () => {
    render(<GovernedAutonomySection />)

    const assistTab = screen.getByRole('tab', { name: 'Assist mode' })
    const autoTab = screen.getByRole('tab', { name: 'Autonomous mode' })

    // Assist is the default; the screenshot's accessible label carries the
    // per-mode description (the on-page caption was removed).
    expect(assistTab).toHaveAttribute('aria-selected', 'true')
    expect(
      screen.getByRole('img', { name: GOVERNED_DATA.modes['Assist mode'] }),
    ).toBeInTheDocument()

    // Switching to Autonomous flips selection and the screenshot's label.
    fireEvent.click(autoTab)
    expect(autoTab).toHaveAttribute('aria-selected', 'true')
    expect(assistTab).toHaveAttribute('aria-selected', 'false')
    expect(
      screen.getByRole('img', { name: GOVERNED_DATA.modes['Autonomous mode'] }),
    ).toBeInTheDocument()

    // Switching back works in the other direction too.
    fireEvent.click(assistTab)
    expect(
      screen.getByRole('img', { name: GOVERNED_DATA.modes['Assist mode'] }),
    ).toBeInTheDocument()
  })

  it('does not render the duplicate caption paragraph', () => {
    const { container } = render(<GovernedAutonomySection />)
    // The mode description must NOT appear as visible body text — it lives
    // only in the screenshot's aria-label now.
    const paragraphs = Array.from(container.querySelectorAll('p')).map(
      (p) => p.textContent,
    )
    expect(paragraphs).not.toContain(GOVERNED_DATA.modes['Assist mode'])
    expect(paragraphs).not.toContain(GOVERNED_DATA.modes['Autonomous mode'])
  })

  it('uses sentence-case tab labels (single mode control, no duplicate toggle)', () => {
    render(<GovernedAutonomySection />)
    expect(screen.getByRole('tab', { name: 'Assist mode' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Autonomous mode' })).toBeInTheDocument()
    // Title-case variants must not exist.
    expect(screen.queryByText('Assist Mode')).toBeNull()
    expect(screen.queryByText('Autonomous Mode')).toBeNull()
    // Exactly one tablist — the widget's own tabs, no separate toggle.
    expect(screen.getAllByRole('tablist')).toHaveLength(1)
  })

  it('renders the new copy and no retired strings or em dashes', () => {
    const { container } = render(<GovernedAutonomySection />)
    // The headline is split across nodes by desktop <br>s, so match on the
    // full normalized text content rather than a single text node.
    const heading = container.querySelector('h2')
    expect(heading?.textContent?.replace(/\s+/g, ' ').trim()).toBe(
      'Autonomy without governance is just a faster way to be wrong.',
    )
    expect(screen.queryByText(/Machine speed/)).toBeNull()
    expect(screen.queryByText(/Your keys/)).toBeNull()
    // No em dash anywhere in the rendered section.
    expect(container.textContent).not.toContain('—')
  })
})
