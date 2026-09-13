import { describe, it, expect, beforeEach } from 'vitest'
import { registerBlock, __resetRegistryForTests } from '../registry'
import type { BlockRegistryEntry } from '../registry'
import { previewRenderBlock } from '../previewRender'

function GoodComponent({ label }: { label: string }) {
  return <div>{label}</div>
}

function ThrowingComponent(): React.ReactElement {
  throw new Error('boom')
}

function baseEntry(overrides: Partial<BlockRegistryEntry> = {}): BlockRegistryEntry {
  return {
    type: 'good',
    displayName: 'Good',
    schemaVersion: 1,
    propSchema: {},
    yupSchema: {} as BlockRegistryEntry['yupSchema'],
    validate: (raw) => raw,
    adapt: (props) => props,
    Component: GoodComponent,
    defaultProps: { label: '' },
    ...overrides,
  }
}

beforeEach(() => {
  __resetRegistryForTests()
})

describe('previewRenderBlock', () => {
  it('reports ok for a block that renders successfully', () => {
    registerBlock(baseEntry())
    expect(previewRenderBlock({ type: 'good', props: { label: 'hi' } })).toEqual({ ok: true })
  })

  it('reports an error for an unregistered block type — this is what actually protects the public page, not render-time recovery', () => {
    const result = previewRenderBlock({ type: 'missing', props: {} })
    expect(result).toEqual({ ok: false, error: 'Unknown block type "missing"' })
  })

  it('reports an error when props fail schema validation', () => {
    registerBlock(
      baseEntry({
        type: 'strict',
        validate: () => {
          throw new Error('invalid props')
        },
      }),
    )
    const result = previewRenderBlock({ type: 'strict', props: {} })
    expect(result).toEqual({ ok: false, error: 'invalid props' })
  })

  it('reports an error, without throwing, when the component itself would throw', () => {
    registerBlock(baseEntry({ type: 'throws', Component: ThrowingComponent }))
    let result
    expect(() => {
      result = previewRenderBlock({ type: 'throws', props: {} })
    }).not.toThrow()
    expect(result).toEqual({ ok: false, error: 'boom' })
  })
})
