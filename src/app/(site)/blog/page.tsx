import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/layout/PageHeader'
import { PurplePill } from '@/components/shared/PurplePill'
import { BlogGrid } from '@/sections/blog/BlogGrid'
import { BlogChangelog } from '@/sections/blog/BlogChangelog'
import { getPublishedBlogGridPosts, getPublishedChangelogPosts } from '@/lib/blog/queries'
import { BLOG_HERO } from '@/lib/constants/blog'
import './page.css'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Security Operations Blog',
  description: 'Autonomous SOC insights, security operations research, and AI-native security content from the SIRP team.',
  alternates: { canonical: '/blog' },
  openGraph: {
    url: '/blog',
    type: 'website',
    title: 'Security Operations Blog | SIRP',
    description: 'Insights on autonomous SOC, AI-native security operations, and the future of enterprise security from the SIRP team.',
  },
}

export default async function BlogPage() {
  const hero = BLOG_HERO
  const [posts, changelogPosts] = await Promise.all([
    getPublishedBlogGridPosts(),
    getPublishedChangelogPosts(),
  ])

  return (
    <div className="blog-page">
      <PageHeader
        badgeText={hero.badge}
        heading={
          <>
            {hero.heading.line1}
            <br />
            {hero.heading.line2prefix}
            <em>{hero.heading.italic}</em>
          </>
        }
        subtext={
          <>
            <p>
              {hero.descLine1}
              <br />
              {hero.descLine2}
            </p>
            <p className="page-header-subtext-gap">{hero.guideText}</p>
            <p className="page-header-subtext-gap">
              <Link href={hero.guideLink.href} className="blog-page-guide-pill-link">
                <PurplePill className="blog-page-guide-purple-pill">{hero.guideLink.label}</PurplePill>
              </Link>
            </p>
          </>
        }
      />
      <BlogGrid posts={posts} />
      <BlogChangelog posts={changelogPosts} />
    </div>
  )
}
