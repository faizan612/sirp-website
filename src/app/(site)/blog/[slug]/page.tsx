import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug, getPublishedBlogSlugs } from '@/lib/blog/queries'
import { formatBlogDate } from '@/lib/blog/format'
import { BlogPostContent } from '@/sections/blog/BlogPostContent'
import { JsonLd } from '@/components/seo/JsonLd'
import { SITE_NAME, SITE_URL } from '@/lib/constants'
import './page.css'

// Allow slugs created after build (new CMS posts) to render on-demand; they are
// then cached like any other post. The queries still return null for unpublished
// or missing slugs, which triggers notFound() below.
export const dynamicParams = true
// Without this, a post scheduled to auto-publish via `published_at` could get
// cached as a 404 if requested before its publish time and never re-checked
// (blog/page.tsx already revalidates; this route didn't).
export const revalidate = 60

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getPublishedBlogSlugs()
  if (slugs.length === 0) return [{ slug: '_placeholder' }]
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  const coverImage = post.cover_image?.trim()
    || '/images/blogs/imgi_19_QTvmn6YhIx2oKxvKM3IfPUvJjeQ.png'
  const absoluteCoverUrl = coverImage.startsWith('http')
    ? coverImage
    : `${SITE_URL}${coverImage}`

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      type: 'article',
      url: `/blog/${slug}`,
      title: post.title,
      description: post.excerpt ?? undefined,
      siteName: SITE_NAME,
      locale: 'en_US',
      publishedTime: post.published_at ?? undefined,
      images: [
        {
          url: absoluteCoverUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt ?? undefined,
      images: [absoluteCoverUrl],
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) notFound()

  const coverImage =
    post.cover_image?.trim() || '/images/blogs/imgi_19_QTvmn6YhIx2oKxvKM3IfPUvJjeQ.png'
  const dateLabel = formatBlogDate(post.published_at)

  const absoluteCoverUrl = coverImage.startsWith('http')
    ? coverImage
    : `${SITE_URL}${coverImage}`

  return (
    <article className="blog-post-page">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
            { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
          ],
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt ?? undefined,
          image: absoluteCoverUrl,
          datePublished: post.published_at,
          author: {
            '@type': 'Organization',
            name: SITE_NAME,
            url: SITE_URL,
          },
          publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            logo: {
              '@type': 'ImageObject',
              url: `${SITE_URL}/images/logos/sirp_favicon.svg`,
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${SITE_URL}/blog/${post.slug}`,
          },
        }}
      />
      <div className="container-sirp blog-post-page-inner">
        <Link href="/blog" className="blog-post-back">
          ← Back to blog
        </Link>

        <header className="blog-post-header">
          {dateLabel ? <time className="blog-post-date">{dateLabel}</time> : null}
          <h1 className="blog-post-title">{post.title}</h1>
          {post.excerpt ? <p className="blog-post-excerpt">{post.excerpt}</p> : null}
        </header>

        <div className="blog-post-cover">
          <Image
            src={coverImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1200px"
            style={{ objectFit: 'cover' }}
          />
        </div>

        <BlogPostContent content={post.content} />
      </div>
    </article>
  )
}
