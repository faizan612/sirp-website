import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { findRedirect, getPublishedLandingPageByRootAlias, getPublishedLandingSlugs } from '@/lib/pagebuilder/publicQueries'
import { buildLandingPageMetadata, landingPageJsonLd } from '@/lib/pagebuilder/seo'
import { PageRenderer } from '@/lib/pagebuilder/BlockRenderer'
import { JsonLd } from '@/components/seo/JsonLd'

// Root-level fallback for a landing page's optional root alias (e.g.
// /black-friday). Every existing hand-coded marketing page (/omnisense,
// /enterprise-soc, ...) is a literal static route at this same directory
// level, and Next.js always resolves a static segment before a dynamic one —
// so this route is only ever reached for a slug that doesn't match any of
// them. dynamicParams/revalidate mirror /lp/[slug]/page.tsx.
export const dynamicParams = true
export const revalidate = 60

type PageProps = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const pages = await getPublishedLandingSlugs()
  const aliased = pages.filter((p): p is { slug: string; rootAlias: string } => Boolean(p.rootAlias))
  return aliased.map((p) => ({ slug: p.rootAlias }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await getPublishedLandingPageByRootAlias(slug)
  return buildLandingPageMetadata(page)
}

export default async function LandingPageByRootAlias({ params }: PageProps) {
  const { slug } = await params
  const page = await getPublishedLandingPageByRootAlias(slug)

  if (!page) {
    const destination = await findRedirect(`/${slug}`)
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
