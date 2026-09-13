import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { extractIndexMetadata, localizeInternalLinks } from './scrape-and-convert'

// Minimal reproduction of the escaped-JSON shape the /blog index page embeds
// in its Next.js RSC payload (`self.__next_f.push([1,"...\"posts\":[...]..."])`).
// Regression fixture for a real bug: the first parser was a field-order regex
// that let one post's title/excerpt swallow the next post's JSON object when
// a title happened to contain characters it didn't anticipate.
const RSC_FIXTURE = String.raw`<script>self.__next_f.push([1,"1d:[\"$\",\"$L1e\",null,{\"posts\":[{\"id\":\"aaa\",\"slug\":\"post-one\",\"title\":\"Post One: A \\\"Quoted\\\" Title\",\"image\":\"/images/blogs/cover-one.jpg\",\"date\":\"Jan 1, 2026\",\"publishedAt\":\"2026-01-01T00:00:00+00:00\",\"type\":\"BLOG\",\"excerpt\":\"First excerpt.\"},{\"id\":\"bbb\",\"slug\":\"post-two\",\"title\":\"Post Two\",\"image\":\"/images/blogs/cover-two.jpg\",\"date\":\"Jan 2, 2026\",\"publishedAt\":\"2026-01-02T00:00:00+00:00\",\"type\":\"PILLAR\",\"excerpt\":\"Second excerpt.\"}]}]\n"])</script>`

describe('extractIndexMetadata', () => {
  it('parses every post in the RSC payload without one bleeding into the next', () => {
    const meta = extractIndexMetadata(RSC_FIXTURE)

    expect(meta.size).toBe(2)
    expect(meta.get('post-one')).toMatchObject({
      slug: 'post-one',
      title: 'Post One: A "Quoted" Title',
      type: 'BLOG',
      image: '/images/blogs/cover-one.jpg',
    })
    expect(meta.get('post-two')).toMatchObject({
      slug: 'post-two',
      title: 'Post Two',
      type: 'PILLAR',
      image: '/images/blogs/cover-two.jpg',
    })
  })

  it('returns an empty map when no posts array is present', () => {
    expect(extractIndexMetadata('<html></html>').size).toBe(0)
  })
})

describe('localizeInternalLinks', () => {
  it('rewrites absolute sirp.io blog links to local routes', () => {
    const html = '<a href="https://www.sirp.io/blog/some-other-post">link</a>'
    expect(localizeInternalLinks(html)).toBe('<a href="/blog/some-other-post">link</a>')
  })

  it('leaves non-blog and external links untouched', () => {
    const html =
      '<a href="https://www.sirp.io/autonomous-security">a</a><a href="https://example.com/blog/x">b</a>'
    expect(localizeInternalLinks(html)).toBe(html)
  })
})

describe('generated MDX output', () => {
  it('produces valid frontmatter and a non-empty body for a known sample post', () => {
    const fixturePath = path.join(__dirname, '../../src/content/blog/how-autonomous-systems-learn.mdx')
    const raw = readFileSync(fixturePath, 'utf8')
    const { data, content } = matter(raw)

    expect(data.title).toBeTruthy()
    expect(data.slug).toBe('how-autonomous-systems-learn')
    expect(['BLOG', 'PILLAR', 'CHANGELOG']).toContain(data.type)
    expect(data.publishedAt).toBeTruthy()
    expect(data.draft).toBe(false)
    expect(content.trim().length).toBeGreaterThan(0)
  })
})
