import { describe, it, expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import type { JSONContent } from '@tiptap/react'
import { renderRichText, type RichTextMode } from '../render'

function render(doc: JSONContent, mode: RichTextMode): string {
  return renderToStaticMarkup(<>{renderRichText(doc, mode)}</>)
}

const para = (content: JSONContent[]): JSONContent => ({ type: 'paragraph', content })
const text = (t: string, marks?: JSONContent['marks']): JSONContent => ({ type: 'text', text: t, marks })

describe('renderRichText — inline mode', () => {
  it('keeps bold/italic/strike/link marks', () => {
    const html = render({ type: 'doc', content: [text('bold', [{ type: 'bold' }])] }, 'inline')
    expect(html).toContain('<strong>bold</strong>')
  })

  it('drops block-level nodes but keeps their text', () => {
    const html = render(
      { type: 'doc', content: [{ type: 'heading', attrs: { level: 2 }, content: [text('Heading text')] }] },
      'inline',
    )
    expect(html).not.toContain('<h2')
    expect(html).toContain('Heading text')
  })

  it('drops paragraph wrappers but keeps their text', () => {
    const html = render({ type: 'doc', content: [para([text('para text')])] }, 'inline')
    expect(html).not.toContain('<p>')
    expect(html).toContain('para text')
  })

  it('drops code marks — not in the inline allowlist', () => {
    const html = render({ type: 'doc', content: [text('snippet', [{ type: 'code' }])] }, 'inline')
    expect(html).not.toContain('<code>')
    expect(html).toContain('snippet')
  })
})

describe('renderRichText — block mode', () => {
  it('allows paragraphs and lists', () => {
    const html = render(
      {
        type: 'doc',
        content: [para([text('p')]), { type: 'bulletList', content: [{ type: 'listItem', content: [para([text('item')])] }] }],
      },
      'block',
    )
    expect(html).toContain('<p>p</p>')
    expect(html).toContain('<ul>')
    expect(html).toContain('<li>')
  })

  it('drops headings but keeps their text', () => {
    const html = render({ type: 'doc', content: [{ type: 'heading', attrs: { level: 2 }, content: [text('H')] }] }, 'block')
    expect(html).not.toContain('<h2')
    expect(html).toContain('H')
  })
})

describe('renderRichText — full mode (today\'s blog behaviour, unchanged)', () => {
  it('allows headings, clamped to h2-h4', () => {
    const html = render({ type: 'doc', content: [{ type: 'heading', attrs: { level: 1 }, content: [text('top')] }] }, 'full')
    expect(html).toContain('<h2>top</h2>')
  })
})

describe('renderRichText — every mode', () => {
  it('drops unsafe link schemes regardless of mode', () => {
    for (const mode of ['inline', 'block', 'full'] as const) {
      const html = render(
        { type: 'doc', content: [text('gotcha', [{ type: 'link', attrs: { href: 'javascript:alert(1)' } }])] },
        mode,
      )
      expect(html).not.toContain('javascript:')
      expect(html).not.toContain('<a')
      expect(html).toContain('gotcha')
    }
  })
})
