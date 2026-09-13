import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatGauge } from '../StatGauge'
import { mockMatchMedia, mockIntersectionObserver } from './testUtils'

describe('StatGauge', () => {
  beforeEach(() => {
    mockIntersectionObserver()
  })
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders the label and, under reduced motion, the final value immediately with no count-up', () => {
    mockMatchMedia(true)
    render(<StatGauge value={80} label="MTTD ↓" caption="Reduction in mean time to detect" />)
    expect(screen.getByText('MTTD ↓')).toBeInTheDocument()
    expect(screen.getByText('Reduction in mean time to detect')).toBeInTheDocument()
    expect(screen.getByText('80%')).toBeInTheDocument()
  })

  it('marks the primary gauge with a "Primary outcome" eyebrow', () => {
    mockMatchMedia(true)
    render(<StatGauge value={90} label="Autonomous ↑" isPrimary />)
    expect(screen.getByText('Primary outcome')).toBeInTheDocument()
  })

  it('renders an unverified caption when the underlying number is not yet verified', () => {
    mockMatchMedia(true)
    render(<StatGauge value={70} label="MTTR ↓" unverified />)
    expect(screen.getByText('Directional, not measured')).toBeInTheDocument()
  })
})
