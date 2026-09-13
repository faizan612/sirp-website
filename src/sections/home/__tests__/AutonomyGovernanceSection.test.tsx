import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { AutonomyGovernanceSection } from '../AutonomyGovernanceSection'
import { AUTONOMY_ROWS, LADDER_LEVELS, governedAutonomy } from '@/content/home/governedAutonomy'

/** Table body rows, in DOM order, scoped so duplicate pill labels
 * ("Automatic" appears twice) never trip up a query. */
function bodyRows() {
  return screen.getAllByRole('row').slice(1) // drop the header row
}

describe('AutonomyGovernanceSection', () => {
  it('renders all five rows, in configured order, from the content module', () => {
    render(<AutonomyGovernanceSection />)
    const rows = bodyRows()
    expect(rows).toHaveLength(AUTONOMY_ROWS.length)
    rows.forEach((row, i) => {
      expect(within(row).getByText(AUTONOMY_ROWS[i].action)).toBeInTheDocument()
      expect(within(row).getByText(AUTONOMY_ROWS[i].label)).toBeInTheDocument()
    })
  })

  it('marks exactly one ladder level as active', () => {
    render(<AutonomyGovernanceSection />)
    const items = LADDER_LEVELS.map((level) => screen.getByText(level.label).closest('li')!)
    const current = items.filter((li) => li.getAttribute('aria-current') === 'true')
    expect(current).toHaveLength(1)
    expect(current[0]).toBe(items[LADDER_LEVELS.findIndex((l) => l.active)])
  })

  it('renders the ladder with no interactive elements', () => {
    render(<AutonomyGovernanceSection />)
    const ladder = screen.getByText(LADDER_LEVELS[0].label).closest('ul')!
    expect(ladder.querySelectorAll('button, a, select')).toHaveLength(0)
    expect(ladder.querySelectorAll('[role="button"]')).toHaveLength(0)
  })

  it('exposes each gated row\'s policy as accessible text', () => {
    render(<AutonomyGovernanceSection />)
    const rows = bodyRows()
    AUTONOMY_ROWS.forEach((expected, i) => {
      if (expected.level !== 'gated') return
      expect(within(rows[i]).getByText(expected.label)).toBeInTheDocument()
    })
  })

  it('marks the decorative lock icon aria-hidden and keeps its row label readable without it', () => {
    render(<AutonomyGovernanceSection />)
    const rows = bodyRows()
    const lockIndex = AUTONOMY_ROWS.findIndex((r) => r.icon === 'lock')
    const lockRow = rows[lockIndex]
    const svg = lockRow.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(within(lockRow).getByText(AUTONOMY_ROWS[lockIndex].label)).toBeInTheDocument()
  })

  it('renders the headline as the section\'s only h2', () => {
    render(<AutonomyGovernanceSection />)
    const headings = screen.getAllByRole('heading', { level: 2 })
    expect(headings).toHaveLength(1)
    expect(headings[0]?.textContent).toBe(governedAutonomy.headline)
  })

  it('derives pill variant from the row level, not a hardcoded per-row style', () => {
    render(<AutonomyGovernanceSection />)
    const rows = bodyRows()
    AUTONOMY_ROWS.forEach((row, i) => {
      const pill = within(rows[i]).getByText(row.label)
      if (row.level === 'automatic') {
        expect(pill.className).toContain('bg-purple')
      } else {
        expect(pill.className).toContain('border-hairline')
      }
    })
  })
})
