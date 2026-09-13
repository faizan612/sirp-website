import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MetricRail } from '../MetricRail'
import { mockMatchMedia, mockIntersectionObserver } from './testUtils'

const POINTS = [
  { value: '~150 hrs', label: 'Analyst hours removed', detail: 'per day from investigation and triage' },
  { value: '~7X', label: 'Security ROI' },
  { value: '5–10%', label: 'Escalation rate' },
  { value: '<2%', label: 'False positive rate' },
]

describe('MetricRail', () => {
  beforeEach(() => {
    mockIntersectionObserver()
  })
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('under reduced motion, every point is revealed immediately (no pulse choreography needed to read it)', () => {
    mockMatchMedia(true)
    render(<MetricRail points={POINTS} />)
    POINTS.forEach((p) => {
      expect(screen.getAllByText(p.value).length).toBeGreaterThan(0)
      expect(screen.getAllByText(p.label).length).toBeGreaterThan(0)
    })
  })
})
