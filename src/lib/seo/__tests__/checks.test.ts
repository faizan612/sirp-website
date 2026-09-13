import { describe, it, expect } from 'vitest'
import { auditPage, extractInternalLinks, type AuditPageInput } from '../checks'

const GOOD_TITLE = 'S'.repeat(45)
const GOOD_DESCRIPTION = 'D'.repeat(140)
// Short, simple sentences repeated well past the thin-content threshold, easy to read.
const GOOD_BODY = '<h1>Heading</h1><p>' + 'The quick brown fox jumps over the lazy dog. '.repeat(60) + '</p>'

const GOOD_HEADERS = new Headers({
  'strict-transport-security': 'max-age=63072000',
  'content-security-policy': "default-src 'self'; frame-ancestors 'none'",
  'x-content-type-options': 'nosniff',
})

type HeadTags = {
  title?: string | null
  description?: string | null
  canonical?: string | null
  ogTitle?: string | null
  ogDescription?: string | null
  ogImage?: string | null
  twitterCard?: string | null
  robots?: string | null
  jsonLd?: string | null
}

function buildHead(bits: HeadTags = {}): string {
  const {
    title = GOOD_TITLE,
    description = GOOD_DESCRIPTION,
    canonical = 'https://www.sirp.io/page',
    ogTitle = 'OG title',
    ogDescription = 'OG description',
    ogImage = 'https://www.sirp.io/og.png',
    twitterCard = 'summary_large_image',
    robots = null,
    jsonLd = '{"@context":"https://schema.org","@type":"Article"}',
  } = bits

  const parts: string[] = []
  if (title !== null) parts.push(`<title>${title}</title>`)
  if (description !== null) parts.push(`<meta name="description" content="${description}">`)
  if (canonical !== null) parts.push(`<link rel="canonical" href="${canonical}">`)
  if (ogTitle !== null) parts.push(`<meta property="og:title" content="${ogTitle}">`)
  if (ogDescription !== null) parts.push(`<meta property="og:description" content="${ogDescription}">`)
  if (ogImage !== null) parts.push(`<meta property="og:image" content="${ogImage}">`)
  if (twitterCard !== null) parts.push(`<meta name="twitter:card" content="${twitterCard}">`)
  if (robots !== null) parts.push(`<meta name="robots" content="${robots}">`)
  if (jsonLd !== null) {
    const body = jsonLd === 'invalid' ? '{not valid json' : jsonLd
    parts.push(`<script type="application/ld+json">${body}</script>`)
  }
  return parts.join('\n')
}

function buildHtml(headBits: HeadTags = {}, body = GOOD_BODY): string {
  return `<html><head>${buildHead(headBits)}</head><body>${body}</body></html>`
}

function audit(overrides: Partial<AuditPageInput> & { headBits?: HeadTags; body?: string } = {}): ReturnType<typeof auditPage> {
  const { headBits, body, ...rest } = overrides
  return auditPage({
    route: '/page',
    httpStatus: 200,
    html: buildHtml(headBits, body),
    headers: GOOD_HEADERS,
    internalLinks: ['https://www.sirp.io/other'],
    brokenLinks: [],
    ...rest,
  })
}

describe('auditPage', () => {
  it('scores a fully optimised page with no issues', () => {
    const result = audit()
    expect(result.issues).toEqual([])
    expect(result.score).toBe(100)
  })

  it('short-circuits on a non-200 status without inspecting anything else', () => {
    const result = auditPage({ route: '/missing', httpStatus: 404, html: buildHtml() })
    expect(result.score).toBe(0)
    expect(result.issues).toEqual([
      { field: 'status', category: 'technical', severity: 'critical', message: 'Page returned HTTP 404' },
    ])
  })

  it('flags a missing title as critical', () => {
    const result = audit({ headBits: { title: null } })
    expect(result.issues).toContainEqual({
      field: 'title',
      category: 'technical',
      severity: 'critical',
      message: 'Missing <title>',
    })
  })

  it('flags a too-short title as a medium warning, not critical', () => {
    const result = audit({ headBits: { title: 'Too short' } })
    const issue = result.issues.find((i) => i.field === 'title')
    expect(issue?.severity).toBe('medium')
  })

  it('flags a missing meta description as critical', () => {
    const result = audit({ headBits: { description: null } })
    expect(result.issues).toContainEqual({
      field: 'description',
      category: 'technical',
      severity: 'critical',
      message: 'Missing meta description',
    })
  })

  it('flags a missing canonical link', () => {
    const result = audit({ headBits: { canonical: null } })
    expect(result.issues.some((i) => i.field === 'canonical' && i.category === 'technical')).toBe(true)
  })

  it('flags missing structured data', () => {
    const result = audit({ headBits: { jsonLd: null } })
    expect(result.issues).toContainEqual({
      field: 'jsonLd',
      category: 'schema',
      severity: 'medium',
      message: 'No structured data (JSON-LD) found',
    })
  })

  it('flags invalid JSON-LD as high severity, distinct from missing entirely', () => {
    const result = audit({ headBits: { jsonLd: 'invalid' } })
    expect(result.issues).toContainEqual({
      field: 'jsonLd',
      category: 'schema',
      severity: 'high',
      message: 'A structured data block failed to parse as JSON',
    })
  })

  it('reports the structured-data types found on the page', () => {
    const result = audit({ headBits: { jsonLd: '{"@type":"FAQPage"}' } })
    expect(result.metrics.structuredDataTypes).toEqual(['FAQPage'])
  })

  it('flags missing security headers, category "security"', () => {
    const result = audit({ headers: new Headers() })
    const fields = result.issues.filter((i) => i.category === 'security').map((i) => i.field)
    expect(fields).toEqual(expect.arrayContaining(['hsts', 'csp', 'x-content-type-options', 'clickjacking']))
  })

  it('does not flag clickjacking protection when CSP sets frame-ancestors', () => {
    const result = audit() // GOOD_HEADERS already sets frame-ancestors 'none'
    expect(result.issues.some((i) => i.field === 'clickjacking')).toBe(false)
  })

  it('flags a page with no <h1> heading', () => {
    const result = audit({ body: '<p>' + 'word '.repeat(310) + '</p>' })
    expect(result.issues.some((i) => i.field === 'h1' && i.category === 'content')).toBe(true)
  })

  it('flags a page with more than one <h1> heading', () => {
    const result = audit({ body: '<h1>One</h1><h1>Two</h1><p>' + 'word '.repeat(310) + '</p>' })
    const issue = result.issues.find((i) => i.field === 'h1')
    expect(issue?.message).toContain('2 <h1> headings')
  })

  it('flags thin content under the word-count threshold', () => {
    const result = audit({ body: '<h1>Heading</h1><p>Just a few words here.</p>' })
    expect(result.issues.some((i) => i.field === 'wordCount' && i.category === 'content')).toBe(true)
  })

  it('flags images missing alt text as an accessibility issue', () => {
    const result = audit({ body: GOOD_BODY + '<img src="/a.png"><img src="/b.png" alt="">' })
    expect(result.issues).toContainEqual({
      field: 'imageAlt',
      category: 'accessibility',
      severity: 'medium',
      message: '2 images missing alt text',
    })
  })

  it('does not flag an image that has real alt text', () => {
    const result = audit({ body: GOOD_BODY + '<img src="/a.png" alt="A descriptive caption">' })
    expect(result.issues.some((i) => i.field === 'imageAlt')).toBe(false)
  })

  it('flags a page with no internal links', () => {
    const result = audit({ internalLinks: [] })
    expect(result.issues.some((i) => i.field === 'internalLinks' && i.category === 'links')).toBe(true)
  })

  it('flags broken internal links as high severity', () => {
    const result = audit({
      internalLinks: ['https://www.sirp.io/a', 'https://www.sirp.io/b'],
      brokenLinks: ['https://www.sirp.io/b'],
    })
    const issue = result.issues.find((i) => i.field === 'brokenLinks')
    expect(issue?.severity).toBe('high')
    expect(issue?.message).toContain('https://www.sirp.io/b')
  })

  it('attaches site-wide findings only when siteWide is passed in', () => {
    const withSiteWide = audit({ siteWide: { robotsTxtOk: false, securityTxtOk: false, sitemapOk: true } })
    expect(withSiteWide.issues.some((i) => i.field === 'robots.txt')).toBe(true)
    expect(withSiteWide.issues.some((i) => i.field === 'security.txt')).toBe(true)

    const withoutSiteWide = audit()
    expect(withoutSiteWide.issues.some((i) => i.field === 'robots.txt')).toBe(false)
  })

  it('surfaces cybersecurity glossary terms found on the page, without scoring them', () => {
    const result = audit({ body: '<h1>H</h1><p>Our SOAR and SIEM integrate with your SOC. ' + 'Word '.repeat(60) + '</p>' })
    expect(result.metrics.cybersecurityTerms).toEqual(expect.arrayContaining(['SOAR', 'SIEM', 'SOC']))
    expect(result.issues.some((i) => i.field.toLowerCase().includes('cybersecurity'))).toBe(false)
  })

  it('never returns a negative overall score, even with every issue present at once', () => {
    const result = audit({
      headBits: {
        title: null,
        description: null,
        canonical: null,
        ogTitle: null,
        ogDescription: null,
        ogImage: null,
        twitterCard: null,
        jsonLd: 'invalid',
      },
      headers: new Headers(),
      body: '<img src="/a.png">',
      internalLinks: [],
    })
    expect(result.score).toBeGreaterThanOrEqual(0)
  })
})

describe('extractInternalLinks', () => {
  const BASE = 'https://www.sirp.io/blog/post'
  const ORIGIN = 'https://www.sirp.io'

  it('resolves relative links to absolute URLs', () => {
    const links = extractInternalLinks('<a href="/blog">Blog</a>', BASE, ORIGIN)
    expect(links).toEqual(['https://www.sirp.io/blog'])
  })

  it('excludes external links', () => {
    const links = extractInternalLinks('<a href="https://example.com/other">Other</a>', BASE, ORIGIN)
    expect(links).toEqual([])
  })

  it('excludes mailto, tel, javascript and hash-only links', () => {
    const html = `
      <a href="mailto:test@sirp.io">Email</a>
      <a href="tel:+1234567890">Call</a>
      <a href="javascript:void(0)">JS</a>
      <a href="#section">Anchor</a>
    `
    expect(extractInternalLinks(html, BASE, ORIGIN)).toEqual([])
  })

  it('dedupes repeated links and strips hash fragments', () => {
    const html = '<a href="/blog#top">A</a><a href="/blog">B</a>'
    expect(extractInternalLinks(html, BASE, ORIGIN)).toEqual(['https://www.sirp.io/blog'])
  })
})
