import { describe, it, expect } from 'vitest'
import { getLandingPageCanonicalPath, isRootAliasAvailable } from '../routing'

describe('getLandingPageCanonicalPath', () => {
  it('uses the root alias when the page has one', () => {
    expect(getLandingPageCanonicalPath({ id: '1', slug: 'foo', rootAlias: 'black-friday' })).toBe('/black-friday')
  })

  it('falls back to the stable /lp/ address otherwise', () => {
    expect(getLandingPageCanonicalPath({ id: '1', slug: 'foo', rootAlias: null })).toBe('/lp/foo')
  })
})

describe('isRootAliasAvailable', () => {
  it('rejects an alias matching an existing code-authored route', () => {
    // '/blog' is a real STATIC_ROUTES entry (the blog listing page).
    const result = isRootAliasAvailable('blog', { pages: [] })
    expect(result).toEqual({ available: false, reason: 'A code-authored page already uses this URL.' })
  })

  it('rejects an alias already used by another landing page', () => {
    const result = isRootAliasAvailable('promo', { pages: [{ id: '1', slug: 'other', rootAlias: 'promo' }] })
    expect(result.available).toBe(false)
    expect(result.reason).toMatch(/Another landing page/)
  })

  it('rejects an alias colliding with another page\'s slug, not just its root alias', () => {
    const result = isRootAliasAvailable('other-slug', { pages: [{ id: '1', slug: 'other-slug', rootAlias: null }] })
    expect(result.available).toBe(false)
  })

  it('allows a page to keep its own already-assigned alias', () => {
    const result = isRootAliasAvailable('promo', {
      pages: [{ id: '1', slug: 'other', rootAlias: 'promo' }],
      excludePageId: '1',
    })
    expect(result.available).toBe(true)
  })

  it('allows a genuinely free alias', () => {
    expect(isRootAliasAvailable('brand-new-campaign', { pages: [] })).toEqual({ available: true })
  })

  it('normalizes a leading slash before checking', () => {
    expect(isRootAliasAvailable('/blog', { pages: [] }).available).toBe(false)
  })
})
