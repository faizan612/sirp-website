import { describe, it, expect } from 'vitest'
import '../index'
import { getBlockEntry } from '../../registry'
import { previewRenderBlock } from '../../previewRender'

const NEW_BLOCK_TYPES = ['hero-section', 'features-section', 'integrations-section', 'stats-section', 'final-cta-section']

describe('newly registered marketing blocks', () => {
  it.each(NEW_BLOCK_TYPES)('%s is registered', (type) => {
    expect(getBlockEntry(type)).toBeDefined()
  })

  it.each(NEW_BLOCK_TYPES)('%s renders with its own default props', (type) => {
    const entry = getBlockEntry(type)!
    expect(previewRenderBlock({ type, props: entry.defaultProps })).toEqual({ ok: true })
  })

  it.each(NEW_BLOCK_TYPES)('%s rejects props that fail its schema', (type) => {
    expect(previewRenderBlock({ type, props: {} }).ok).toBe(false)
  })
})
