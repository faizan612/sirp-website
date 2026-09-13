import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { findRedirect, getPublishedLandingPageBySlug, getPublishedLandingSlugs } from '@/lib/pagebuilder/publicQueries'
import { buildLandingPageMetadata, landingPageJsonLd } from '@/lib/pagebuilder/seo'
import { PageRenderer } from '@/lib/pagebuilder/BlockRenderer'
import { JsonLd } from '@/components/seo/JsonLd'

// Allow slugs created after build (new pages) to render on-demand; they are
// then cached like any other page. revalidate keeps a page that becomes
// scheduled-to-publish from staying cached as a 404 past its publish time.
export const dynamicParams = true
export const revalidate = 60

type PageProps = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const pages = await getPublishedLandingSlugs()
  if (pages.length === 0) return [{ slug: '_placeholder' }]
  return pages.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await getPublishedLandingPageBySlug(slug)
  return buildLandingPageMetadata(page)
}

export default async function LandingPageBySlug({ params }: PageProps) {
  const { slug } = await params
  const page = await getPublishedLandingPageBySlug(slug)

  if (!page) {
    const destination = await findRedirect(`/lp/${slug}`)
    if (destination) redirect(destination)
    notFound()
  }

  return (
    <article>
      <JsonLd data={landingPageJsonLd(page)} />
      <PageRenderer blocks={page.document.blocks} />
    </article>
  )
}
