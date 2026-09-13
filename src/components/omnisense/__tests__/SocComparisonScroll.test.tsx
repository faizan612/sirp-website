import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SocComparisonScroll } from '../SocComparisonScroll'
import { mockMatchMedia } from './testUtils'

const HUMAN = {
  label: 'Human SOC',
  steps: [
    { label: 'Detection', phase: 0 as const, duration: 5, durationLabel: '~5 min' },
    { label: 'Ticket', phase: 1 as const, duration: 15, durationLabel: '~15 min' },
    { label: 'Assignment', phase: 1 as const, duration: 20, durationLabel: '~20 min' },
    { label: 'Investigation', phase: 1 as const, duration: 95, durationLabel: '~95 min' },
    { label: 'Approval', phase: 1 as const, duration: 40, durationLabel: '~40 min' },
    { label: 'Action', phase: 2 as const, duration: 10, durationLabel: '~10 min' },
  ],
}

const AUTONOMOUS = {
  label: 'Autonomous SOC',
  steps: [
    {
      label: 'Detection',
      phase: 0 as const,
      duration: 5,
      durationLabel: '~5 sec',
      note: 'Covers ticket, assignment, investigation, approval',
    },
    { label: 'Evaluation', phase: 1 as const, duration: 55, durationLabel: '~55 sec' },
    { label: 'Action', phase: 2 as const, duration: 15, durationLabel: '~15 sec' },
  ],
}

describe('SocComparisonScroll', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders every step label from both columns in the DOM regardless of scroll state', () => {
    mockMatchMedia(false)
    render(<SocComparisonScroll human={HUMAN} autonomous={AUTONOMOUS} />)
    ;[...HUMAN.steps, ...AUTONOMOUS.steps].forEach((step) => {
      expect(screen.getAllByText(step.label).length).toBeGreaterThan(0)
    })
  })

  it('renders the phase-mapping note under the autonomous Detection step', () => {
    mockMatchMedia(false)
    render(<SocComparisonScroll human={HUMAN} autonomous={AUTONOMOUS} />)
    expect(screen.getByText('Covers ticket, assignment, investigation, approval')).toBeInTheDocument()
  })

  it('computes the speed-delta multiple from total human minutes vs total autonomous seconds', () => {
    mockMatchMedia(false)
    render(<SocComparisonScroll human={HUMAN} autonomous={AUTONOMOUS} />)
    // 185 min * 60 = 11100s human total; 75s autonomous total; 11100 / 75 = 148
    expect(screen.getByText('148x')).toBeInTheDocument()
  })

  it('exposes final totals and the delta in an sr-only summary regardless of scroll position', () => {
    mockMatchMedia(false)
    render(<SocComparisonScroll human={HUMAN} autonomous={AUTONOMOUS} />)
    expect(screen.getByText(/Same incident, resolved 148x faster/)).toBeInTheDocument()
  })
})
