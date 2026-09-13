import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LedgerList } from '../LedgerList'
import { mockMatchMedia, mockIntersectionObserver } from './testUtils'

const ROWS = [
  { label: '3 enterprise SOCs', value: 'Fintech, SaaS, and healthcare.' },
  { label: '90-day window', value: 'Post-stabilization (excludes tuning and pilots).' },
]

describe('LedgerList', () => {
  beforeEach(() => {
    mockIntersectionObserver()
  })
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders every row label and value, in order, plus the excluded line and methodology link', () => {
    mockMatchMedia(true)
    render(
      <LedgerList
        rows={ROWS}
        excluded="Test incidents, training data, simulations."
        methodologyHref="/trust-center#methodology"
      />,
    )
    ROWS.forEach((row) => {
      expect(screen.getByText(row.label)).toBeInTheDocument()
      expect(screen.getByText(row.value)).toBeInTheDocument()
    })
    expect(screen.getByText('Excluded:')).toBeInTheDocument()
    expect(screen.getByText(/Test incidents, training data, simulations\./)).toBeInTheDocument()

    const link = screen.getByRole('link', { name: /Read the full methodology in the Trust Center/ })
    expect(link).toHaveAttribute('href', '/trust-center#methodology')
  })
})
