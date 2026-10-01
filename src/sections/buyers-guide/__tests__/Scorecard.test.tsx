import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { buyersGuideContent } from '@/app/(site)/buyers-guide/content'
import { Scorecard } from '../Scorecard'

const data = buyersGuideContent.scorecard
beforeEach(() => window.history.replaceState(null, '', '/buyers-guide'))
afterEach(cleanup)

describe('Buyer’s Guide scorecard navigation', () => {
  it('opens every criterion with its correct answers', () => {
    render(<Scorecard data={data} />)
    const tabs = screen.getAllByRole('tab')
    expect(tabs).toHaveLength(8)
    data.rows.forEach((row, index) => {
      fireEvent.click(tabs[index])
      const panel = screen.getByRole('tabpanel')
      expect(within(panel).getByText(row.ask)).toBeVisible()
      expect(within(panel).getByText(row.weak)).toBeVisible()
      expect(within(panel).getByText(row.strong)).toBeVisible()
      expect(screen.getAllByRole('tab', { selected: true })).toEqual([tabs[index]])
      expect(tabs[index]).toHaveAttribute('tabindex', '0')
      expect(window.location.hash).toBe(`#criterion-${row.num}`)
    })
  })

  it('supports keyboard selection, wrapping, and first/last shortcuts', () => {
    render(<Scorecard data={data} />)
    const tabs = screen.getAllByRole('tab')
    tabs[0].focus()
    fireEvent.keyDown(tabs[0], { key: 'ArrowUp' })
    expect(tabs[7]).toHaveFocus()
    expect(tabs[7]).toHaveAttribute('aria-selected', 'true')
    fireEvent.keyDown(tabs[7], { key: 'ArrowRight' })
    expect(tabs[0]).toHaveFocus()
    fireEvent.keyDown(tabs[0], { key: 'End' })
    expect(tabs[7]).toHaveFocus()
    fireEvent.keyDown(tabs[7], { key: 'Home' })
    expect(tabs[0]).toHaveFocus()
    expect(screen.getAllByRole('tabpanel')).toHaveLength(1)
  })

  it('opens the question linked from the hero and follows subsequent links', () => {
    window.history.replaceState(null, '', '#criterion-04')
    render(<Scorecard data={data} />)
    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('Learning loop')
    window.history.replaceState(null, '', '#criterion-07')
    fireEvent(window, new HashChangeEvent('hashchange'))
    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('Commercial model')
    expect(within(screen.getByRole('tabpanel')).getByText(data.rows[6].ask)).toBeVisible()
  })

  it('keeps previous and next controls within the eight questions', () => {
    render(<Scorecard data={data} />)
    expect(screen.getByRole('button', { name: 'Previous question' })).toBeDisabled()
    for (let index = 1; index < 8; index++) {
      fireEvent.click(screen.getByRole('button', { name: 'Next question' }))
      expect(screen.getByRole('tab', { selected: true })).toHaveTextContent(data.rows[index].title)
    }
    expect(screen.getByRole('button', { name: 'Next question' })).toBeDisabled()
    fireEvent.click(screen.getByRole('button', { name: 'Previous question' }))
    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('Commercial model')
  })
})
