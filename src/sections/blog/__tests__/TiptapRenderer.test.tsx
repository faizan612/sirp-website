import { describe, it, expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import type { JSONContent } from '@tiptap/react'
import { TiptapRenderer } from '../TiptapRenderer'

function render(doc: JSONContent): string {
  return renderToStaticMarkup(<TiptapRenderer doc={doc} />)
}

const para = (content: JSONContent[]): JSONContent => ({ type: 'paragraph', content })
const text = (t: string, marks?: JSONContent['marks']): JSONContent => ({ type: 'text', text: t, marks })

describe('TiptapRenderer', () => {
  it('renders text marks as real elements', () => {
    const html = render({
      type: 'doc',
      content: [para([text('bold', [{ type: 'bold' }]), text(' and '), text('italic', [{ type: 'italic' }])])],
    })
    expect(html).toContain('<strong>bold</strong>')
    expect(html).toContain('<em>italic</em>')
  })

  it('renders a safe https link with hardened rel/target', () => {
    const html = render({
      type: 'doc',
      content: [para([text('click', [{ type: 'link', attrs: { href: 'https://sirp.io' } }])])],
    })
    expect(html).toContain('href="https://sirp.io"')
    expect(html).toContain('rel="noopener noreferrer nofollow"')
    expect(html).toContain('target="_blank"')
  })

  // The core security guarantee: unsafe link schemes are dropped, not rendered.
  it('drops a javascript: link, keeping only its text', () => {
    const html = render({
      type: 'doc',
      content: [para([text('gotcha', [{ type: 'link', attrs: { href: 'javascript:alert(1)' } }])])],
    })
    expect(html).toContain('gotcha') // text survives
    expect(html).not.toContain('javascript:') // scheme never emitted
    expect(html).not.toContain('<a') // no anchor produced at all
  })

  it('drops data: and other non-whitelisted link schemes', () => {
    const html = render({
      type: 'doc',
      content: [para([text('x', [{ type: 'link', attrs: { href: 'data:text/html,<script>1</script>' } }])])],
    })
    expect(html).not.toContain('<a')
    expect(html).not.toContain('data:')
  })

  it('ignores unknown/injected node types instead of emitting them', () => {
    const html = render({
      type: 'doc',
      // A node type outside the whitelist must not reach the output.
      content: [{ type: 'script', attrs: { src: 'evil.js' } } as JSONContent, para([text('safe')])],
    })
    expect(html).not.toContain('<script')
    expect(html).not.toContain('evil.js')
    expect(html).toContain('safe')
  })

  it('clamps heading levels into the h2–h4 range', () => {
    const html = render({
      type: 'doc',
      content: [
        { type: 'heading', attrs: { level: 1 }, content: [text('top')] },
        { type: 'heading', attrs: { level: 5 }, content: [text('deep')] },
      ],
    })
    expect(html).toContain('<h2>top</h2>') // level 1 clamped up to 2
    expect(html).toContain('<h4>deep</h4>') // level 5 clamped down to 4
  })

  it('renders lists and blockquotes structurally', () => {
    const html = render({
      type: 'doc',
      content: [
        {
          type: 'bulletList',
          content: [{ type: 'listItem', content: [para([text('one')])] }],
        },
        { type: 'blockquote', content: [para([text('quote')])] },
      ],
    })
    expect(html).toContain('<ul>')
    expect(html).toContain('<li>')
    expect(html).toContain('<blockquote>')
  })
})
