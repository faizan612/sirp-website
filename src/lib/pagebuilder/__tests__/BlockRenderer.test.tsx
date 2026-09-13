import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { registerBlock, __resetRegistryForTests } from '../registry'
import type { BlockRegistryEntry } from '../registry'
import { BlockRenderer } from '../BlockRenderer'
import type { BlockInstance } from '../types'

function GoodComponent({ label }: { label: string }) {
  return <div>{label}</div>
}

function ThrowingComponent(): React.ReactElement {
  throw new Error('boom')
}

function makeBlock(overrides: Partial<BlockInstance> = {}): BlockInstance {
  return { id: 'b1', type: 'good', schemaVersion: 1, props: { label: 'hi' }, ...overrides }
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
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

describe('BlockRenderer', () => {
  it('renders a valid, registered block', () => {
    registerBlock(baseEntry())
    const html = renderToStaticMarkup(<BlockRenderer block={makeBlock()} />)
    expect(html).toContain('hi')
  })

  it('renders nothing for an unregistered block type — never a visible placeholder', () => {
    const html = renderToStaticMarkup(<BlockRenderer block={makeBlock({ type: 'missing' })} />)
    expect(html).toBe('')
  })

  it('renders nothing when stored props fail schema validation', () => {
    registerBlock(
      baseEntry({
        type: 'strict',
        validate: () => {
          throw new Error('invalid props')
        },
      }),
    )
    const html = renderToStaticMarkup(<BlockRenderer block={makeBlock({ type: 'strict' })} />)
    expect(html).toBe('')
  })

  it('documents a known, accepted gap: a component that throws during render is NOT caught here', () => {
    // A nested React error boundary does not reliably catch a synchronous
    // throw during React's *server* render (verified empirically — Next.js
    // also forbids the obvious `react-dom/server` preflight fix from inside
    // a Server Component, a hard build error). The real guard against this
    // lives at save time instead — see previewRender.test.tsx. This test
    // pins the current, honest behavior rather than silently assuming a
    // protection that doesn't actually exist at render time.
    registerBlock(baseEntry({ type: 'throws', Component: ThrowingComponent }))
    expect(() => renderToStaticMarkup(<BlockRenderer block={makeBlock({ type: 'throws' })} />)).toThrow('boom')
  })

  it('runs migrate() to patch a stale schemaVersion before validating', () => {
    registerBlock(
      baseEntry({
        type: 'migrated',
        schemaVersion: 2,
        migrate: (props) => ({ ...(props as object), label: 'migrated-label' }),
      }),
    )
    const html = renderToStaticMarkup(
      <BlockRenderer block={makeBlock({ type: 'migrated', schemaVersion: 1, props: {} })} />,
    )
    expect(html).toContain('migrated-label')
  })

  it('renders nothing when migrate() itself throws', () => {
    registerBlock(
      baseEntry({
        type: 'bad-migration',
        schemaVersion: 2,
        migrate: () => {
          throw new Error('migration failed')
        },
      }),
    )
    const html = renderToStaticMarkup(
      <BlockRenderer block={makeBlock({ type: 'bad-migration', schemaVersion: 1 })} />,
    )
    expect(html).toBe('')
  })
})
