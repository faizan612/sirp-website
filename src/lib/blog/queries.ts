import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import { isChangelogType, rowToCard, sortBlogGridPosts } from './format'
import type { BlogPostCard, BlogPostRow } from './types'

const CONTENT_DIR = path.join(process.cwd(), 'src/content/blog')

function isPublished(publishedAt: string | null, draft: boolean): boolean {
  if (draft) return false
  if (!publishedAt) return false
  return new Date(publishedAt).getTime() <= Date.now()
}

async function readPost(slug: string): Promise<BlogPostRow | null> {
  try {
    const raw = await readFile(path.join(CONTENT_DIR, `${slug}.mdx`), 'utf8')
    const { data, content } = matter(raw)
    return {
      id: slug,
      title: data.title,
      slug: data.slug ?? slug,
      content,
      excerpt: data.excerpt ?? null,
      cover_image: data.coverImage ?? null,
      published_at: data.publishedAt ?? null,
      type: data.type ?? null,
      draft: Boolean(data.draft),
    }
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return null
    throw err
  }
}

async function readAllPosts(): Promise<BlogPostRow[]> {
  const files = await readdir(CONTENT_DIR).catch(() => [] as string[])
  const slugs = files.filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, ''))
  const posts = await Promise.all(slugs.map(readPost))
  return posts.filter((p): p is BlogPostRow => p !== null)
}

export async function getPublishedBlogPosts(): Promise<BlogPostCard[]> {
  const posts = await readAllPosts()
  return posts
    .filter((row) => isPublished(row.published_at, row.draft))
    .map(rowToCard)
}

export async function getPublishedChangelogPosts(): Promise<BlogPostCard[]> {
  const posts = await getPublishedBlogPosts()
  return posts.filter((post) => isChangelogType(post.type))
}

export async function getPublishedBlogGridPosts(): Promise<BlogPostCard[]> {
  const posts = await getPublishedBlogPosts()
  const gridPosts = posts.filter((post) => !isChangelogType(post.type))
  return sortBlogGridPosts(gridPosts)
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostRow | null> {
  const post = await readPost(slug)
  if (!post || !isPublished(post.published_at, post.draft)) return null
  return post
}

export async function getPublishedBlogSlugs(): Promise<string[]> {
  const posts = await getPublishedBlogPosts()
  return posts.map((p) => p.slug)
}
