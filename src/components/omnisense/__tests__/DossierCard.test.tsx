import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DossierCard } from '../DossierCard'
import { mockMatchMedia } from './testUtils'

describe('DossierCard', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders role, numbered eyebrow, and copy', () => {
    mockMatchMedia(false)
    render(<DossierCard index={1} role="CISOs" copy="Risk posture becomes predictable." isActive={false} onSelect={() => {}} />)
    expect(screen.getByText('CISOs')).toBeInTheDocument()
    expect(screen.getByText('Role // 01')).toBeInTheDocument()
    expect(screen.getByText('Risk posture becomes predictable.')).toBeInTheDocument()
  })

  it('is a real button, reflects active state via aria-pressed, and is keyboard-operable', () => {
    mockMatchMedia(false)
    const onSelect = vi.fn()
    render(<DossierCard index={2} role="CFOs" copy="Security costs flatten." isActive={false} onSelect={onSelect} />)
    const card = screen.getByRole('button', { name: /CFOs/ })
    expect(card).toHaveAttribute('aria-pressed', 'false')

    fireEvent.click(card)
    expect(onSelect).toHaveBeenCalledTimes(1)

    fireEvent.keyDown(card, { key: 'Enter' })
    // native <button> fires a click on Enter/Space via the browser — jsdom
    // simulates that for keyDown->click only through fireEvent.click, so
    // assert the element is a real, focusable button instead of re-deriving
    // browser default-action behavior here.
    expect(card.tagName).toBe('BUTTON')
    card.focus()
    expect(card).toHaveFocus()
  })

  it('reflects an active card via aria-pressed=true', () => {
    mockMatchMedia(false)
    render(<DossierCard index={3} role="SOC Directors" copy="Team focuses on strategy." isActive onSelect={() => {}} />)
    expect(screen.getByRole('button', { name: /SOC Directors/ })).toHaveAttribute('aria-pressed', 'true')
  })
})
