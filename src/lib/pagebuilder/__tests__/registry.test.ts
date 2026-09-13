import { describe, it, expect, beforeEach } from 'vitest'
import { registerBlock, getBlockEntry, listBlockEntries, __resetRegistryForTests } from '../registry'
import type { BlockRegistryEntry } from '../registry'

function DummyComponent() {
  return null
}

function makeEntry(type: string): BlockRegistryEntry<{ label: string }, { label: string }> {
  return {
    type,
    displayName: 'Dummy',
    schemaVersion: 1,
    propSchema: {},
    // Not exercising real Yup behaviour here — that's toYupSchema.test.ts's job.
    yupSchema: {} as BlockRegistryEntry['yupSchema'],
    validate: (raw) => raw as { label: string },
    adapt: (props) => props,
    Component: DummyComponent,
    defaultProps: { label: '' },
  }
}

beforeEach(() => {
  __resetRegistryForTests()
})

describe('block registry', () => {
  it('registers and retrieves an entry by type', () => {
    registerBlock(makeEntry('dummy'))
    expect(getBlockEntry('dummy')?.displayName).toBe('Dummy')
    expect(listBlockEntries()).toHaveLength(1)
  })

  it('returns undefined for an unregistered type', () => {
    expect(getBlockEntry('nope')).toBeUndefined()
  })

  it('throws on a duplicate registration instead of silently overwriting', () => {
    registerBlock(makeEntry('dup'))
    expect(() => registerBlock(makeEntry('dup'))).toThrow(/already registered/)
    // The original entry must survive the failed duplicate attempt.
    expect(listBlockEntries()).toHaveLength(1)
  })
})
