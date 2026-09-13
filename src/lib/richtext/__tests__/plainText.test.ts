import { describe, it, expect } from 'vitest'
import { docToPlainText, plainTextToDoc } from '../plainText'

describe('docToPlainText', () => {
  it('returns an empty string for null/undefined', () => {
    expect(docToPlainText(null)).toBe('')
    expect(docToPlainText(undefined)).toBe('')
  })

  it('concatenates text nodes across paragraphs', () => {
    const doc = {
      type: 'doc',
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'Hello' }] },
        { type: 'paragraph', content: [{ type: 'text', text: ' world' }] },
      ],
    }
    expect(docToPlainText(doc)).toBe('Hello world')
  })
})

describe('plainTextToDoc', () => {
  it('wraps text in a single paragraph', () => {
    expect(plainTextToDoc('hi')).toEqual({
      type: 'doc',
      content: [{ type: 'paragraph', content: [{ type: 'text', text: 'hi' }] }],
    })
  })

  it('produces an empty paragraph for empty text, not a missing text node', () => {
    expect(plainTextToDoc('')).toEqual({ type: 'doc', content: [{ type: 'paragraph', content: [] }] })
  })

  it('round-trips through docToPlainText', () => {
    expect(docToPlainText(plainTextToDoc('round trip'))).toBe('round trip')
  })
})
