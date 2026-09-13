/** Post loaded from an .mdx file in src/content/blog/ */
export type BlogPostRow = {
  id: string
  title: string
  slug: string
  /** Raw MDX body, compiled for render via next-mdx-remote. */
  content: string
  excerpt: string | null
  cover_image: string | null
  published_at: string | null
  type: string | null
  draft: boolean
}

/** Card data used by the blog listing UI */
export type BlogPostCard = {
  id: string
  slug: string
  title: string
  image: string
  date: string
  publishedAt: string
  type?: string
  excerpt?: string
}
