import { describe, it, expect, vi, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import { HeroSignal } from '../HeroSignal'
import { mockMatchMedia } from './testUtils'

describe('HeroSignal', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders a static line with no gate marker or animation under reduced motion', () => {
    mockMatchMedia(true)
    const { container } = render(<HeroSignal />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    // The gate marker <line> only renders when motion is allowed.
    expect(container.querySelector('line')).not.toBeInTheDocument()
    // The path itself is still present and legible, just unanimated.
    expect(container.querySelector('path')).toBeInTheDocument()
  })
})
