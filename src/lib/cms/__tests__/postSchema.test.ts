import { describe, it, expect } from 'vitest'
import {
  postSchema,
  validateImageFile,
  MAX_IMAGE_BYTES,
} from '../postSchema'

const validDoc = JSON.stringify({
  type: 'doc',
  content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Hello' }] }],
})

const base = {
  title: 'A Post',
  slug: 'a-post',
  excerpt: 'Short',
  type: 'blog',
  contentJson: validDoc,
  publish: false,
}

describe('postSchema', () => {
  it('accepts and normalises a valid submission', async () => {
    const out = await postSchema.validate({ ...base, slug: 'A-Post', publish: 'true' })
    // slug is lower-cased, publish coerced to boolean.
    expect(out.slug).toBe('a-post')
    expect(out.publish).toBe(true)
    expect(out.type).toBe('blog')
  })

  it('defaults type to "blog" and publish to false when omitted', async () => {
    const { type, ...noType } = base
    const out = await postSchema.validate({ ...noType, publish: undefined })
    expect(out.type).toBe('blog')
    expect(out.publish).toBe(false)
  })

  it('requires a title', async () => {
    await expect(postSchema.validate({ ...base, title: '' })).rejects.toThrow(/title is required/i)
  })

  // Mirrors the DB check constraint blog_posts_slug_no_slash — a slash in the
  // slug once made a post unreachable, so reject it before it reaches Postgres.
  it('rejects a slug containing a slash', async () => {
    await expect(postSchema.validate({ ...base, slug: 'foo/bar' })).rejects.toThrow(/lowercase/i)
  })

  it('rejects slugs with spaces or uppercase-only patterns', async () => {
    await expect(postSchema.validate({ ...base, slug: 'my post' })).rejects.toThrow()
    await expect(postSchema.validate({ ...base, slug: '-leading' })).rejects.toThrow()
    await expect(postSchema.validate({ ...base, slug: 'trailing-' })).rejects.toThrow()
  })

  it('rejects an over-long excerpt', async () => {
    await expect(postSchema.validate({ ...base, excerpt: 'x'.repeat(401) })).rejects.toThrow(/too long/i)
  })

  it('rejects an unknown post type', async () => {
    await expect(postSchema.validate({ ...base, type: 'newsletter' })).rejects.toThrow(/unknown post type/i)
  })

  describe('contentJson', () => {
    it('rejects non-JSON content', async () => {
      await expect(postSchema.validate({ ...base, contentJson: 'not json' })).rejects.toThrow(/valid document/i)
    })

    it('rejects JSON that is not a ProseMirror doc', async () => {
      await expect(
        postSchema.validate({ ...base, contentJson: JSON.stringify({ type: 'paragraph' }) }),
      ).rejects.toThrow(/valid document/i)
    })

    it('rejects an empty content field', async () => {
      await expect(postSchema.validate({ ...base, contentJson: '' })).rejects.toThrow(/content is required/i)
    })

    it('accepts a well-formed doc', async () => {
      const out = await postSchema.validate(base)
      expect(out.contentJson).toBe(validDoc)
    })
  })
})

describe('validateImageFile', () => {
  const png = { size: 1024, type: 'image/png' } as File

  it('requires a file when required=true', () => {
    expect(validateImageFile(null, { required: true })).toMatch(/required/i)
    expect(validateImageFile({ size: 0, type: 'image/png' } as File, { required: true })).toMatch(/required/i)
  })

  it('allows a missing file when required=false (edit keeps existing cover)', () => {
    expect(validateImageFile(null, { required: false })).toBeNull()
  })

  it('rejects a disallowed mime type', () => {
    expect(validateImageFile({ size: 1024, type: 'image/gif' } as File, { required: true })).toMatch(/PNG|JPEG|WebP|AVIF/i)
    expect(validateImageFile({ size: 1024, type: 'application/pdf' } as File, { required: true })).toMatch(/PNG|JPEG|WebP|AVIF/i)
  })

  it('rejects a file over the size limit', () => {
    const tooBig = { size: MAX_IMAGE_BYTES + 1, type: 'image/png' } as File
    expect(validateImageFile(tooBig, { required: true })).toMatch(/4 MB or smaller/i)
  })

  it('accepts a valid image', () => {
    expect(validateImageFile(png, { required: true })).toBeNull()
    expect(validateImageFile({ size: MAX_IMAGE_BYTES, type: 'image/webp' } as File, { required: true })).toBeNull()
  })
})
