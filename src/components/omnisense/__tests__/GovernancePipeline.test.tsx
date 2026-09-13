import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GovernancePipeline } from '../GovernancePipeline'
import { mockMatchMedia, mockIntersectionObserver } from './testUtils'

const STATIONS = [
  { key: 'planner', label: 'Planner', copy: 'Reasons about what an alert needs.' },
  { key: 'gate', label: 'Autonomy Gate', copy: 'Checks each proposed action against policy.' },
  { key: 'executor', label: 'Executor', copy: 'Runs only what the Gate allowed.' },
  {
    key: 'governor',
    label: 'Decision Governor',
    copy: 'Fires once, after the run.',
    outcomes: ['Close', 'Escalate', 'Return to Planner'],
  },
]

describe('GovernancePipeline', () => {
  beforeEach(() => {
    mockIntersectionObserver()
  })
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('under reduced motion, renders every station label and copy immediately — the static fallback carries the page\'s core explanation', () => {
    mockMatchMedia(true)
    render(<GovernancePipeline stations={STATIONS} />)
    STATIONS.forEach((s) => {
      expect(screen.getAllByText(s.label).length).toBeGreaterThan(0)
      expect(screen.getAllByText(s.copy).length).toBeGreaterThan(0)
    })
  })

  it('renders the Decision Governor\'s three verdicts, with Escalate the only one continuing to a human', () => {
    mockMatchMedia(true)
    render(<GovernancePipeline stations={STATIONS} />)
    expect(screen.getAllByText('Close').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Return to Planner').length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Escalate/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/→ human/).length).toBeGreaterThan(0)
  })
})
