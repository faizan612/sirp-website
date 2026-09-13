import { describe, it, expect } from 'vitest'
import { stageFor, evidenceCount, actionCount, fmt } from '../useCaseRun'
import { T, RUN_END } from '@/content/home/casePanel'

describe('useCaseRun timeline helpers', () => {
  it('resolves the correct stage at and around every T boundary', () => {
    expect(stageFor(0)).toBe('investigating')
    expect(stageFor(T.gate - 1)).toBe('investigating')
    expect(stageFor(T.gate)).toBe('gate')
    expect(stageFor(T.acting - 1)).toBe('gate')
    expect(stageFor(T.acting)).toBe('acting')
    expect(stageFor(T.closed - 1)).toBe('acting')
    expect(stageFor(T.closed)).toBe('closed')
    expect(stageFor(RUN_END + 1000)).toBe('closed')
  })

  it('reveals one more evidence line each time an evidence marker is crossed', () => {
    expect(evidenceCount(0)).toBe(0)
    T.evidence.forEach((marker, i) => {
      expect(evidenceCount(marker - 1)).toBe(i)
      expect(evidenceCount(marker)).toBe(i + 1)
    })
  })

  it('reveals one more action line each time an action marker is crossed', () => {
    expect(actionCount(0)).toBe(0)
    T.actions.forEach((marker, i) => {
      expect(actionCount(marker - 1)).toBe(i)
      expect(actionCount(marker)).toBe(i + 1)
    })
  })

  it('formats elapsed ms as mm:ss', () => {
    expect(fmt(0)).toBe('00:00')
    expect(fmt(5900)).toBe('00:05')
    expect(fmt(65000)).toBe('01:05')
  })
})
