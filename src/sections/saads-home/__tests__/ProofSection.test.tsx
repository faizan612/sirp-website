import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProofSection } from '../ProofSection'
import { PROOF_DATA } from '@/lib/constants/saads-home'

// jsdom has no IntersectionObserver; framer-motion's whileInView needs one.
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

describe('ProofSection', () => {
  it('renders the canonical figures reconciled with the methodology page', () => {
    render(<ProofSection />)
    // Each stat numeral, label, and mono proof line comes straight from
    // the data constant and must reach the DOM without interaction.
    for (const stat of PROOF_DATA.stats) {
      expect(screen.getByText(stat.value)).toBeInTheDocument()
      expect(screen.getByText(stat.label)).toBeInTheDocument()
      expect(screen.getByText(stat.proof)).toBeInTheDocument()
    }
  })

  it('points Methodology at the outcomes-and-metrics route', () => {
    render(<ProofSection />)
    const link = screen.getByRole('link', { name: 'Methodology' })
    expect(link).toHaveAttribute('href', '/security-outcomes-and-metrics')
  })

  it('does not render the retired claims or per-stat footnote markers', () => {
    // Regression guard: the section once claimed 80% MTTD reduction and
    // 70% faster MTTR, and carried an asterisk on each stat. The footnote
    // now carries the single qualification for all three.
    const { container } = render(<ProofSection />)
    const text = container.textContent ?? ''
    expect(text).not.toContain('80%')
    expect(text).not.toContain('MTTD')
    expect(text).not.toContain('70%')
    expect(text).not.toContain('*')
  })
})
