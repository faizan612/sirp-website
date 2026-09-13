import type { Metadata } from 'next'
import { SITE_NAME, SITE_URL } from '@/lib/constants'
import { getLandingPageCanonicalPath } from './routing'
import type { PublicLandingPage } from './publicQueries'

/** Shared by both public routes (/lp/[slug] and the root-alias fallback) so their metadata can never drift from each other. */
export function buildLandingPageMetadata(page: PublicLandingPage | null): Metadata {
  if (!page) return { title: 'Page Not Found' }

  const canonicalPath = getLandingPageCanonicalPath(page)
  const title = page.seo.title || page.title
  const description = page.seo.description

  return {
    title,
    description,
    alternates: { canonical: page.seo.canonical || canonicalPath },
    robots: page.seo.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: 'website',
      url: canonicalPath,
      title,
      description,
      siteName: SITE_NAME,
      images: page.seo.ogImage ? [{ url: page.seo.ogImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: page.seo.ogImage ? [page.seo.ogImage] : undefined,
    },
  }
}

export function landingPageJsonLd(page: PublicLandingPage) {
  const canonicalPath = getLandingPageCanonicalPath(page)
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    url: `${SITE_URL}${canonicalPath}`,
  }
}
