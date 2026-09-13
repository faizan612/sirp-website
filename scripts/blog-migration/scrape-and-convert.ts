/**
 * Scrapes every post listed in posts.json from the live site and writes one
 * .mdx file per post into src/content/blog/. Idempotent: re-running always
 * regenerates the same output for a given slug from the live page.
 *
 * Usage:
 *   npx tsx scripts/blog-migration/scrape-and-convert.ts [--dry-run] [--only <slug>]
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import * as cheerio from 'cheerio'
import TurndownService from 'turndown'
import matter from 'gray-matter'

const SITE_URL = 'https://www.sirp.io'
const POSTS_JSON = path.join(__dirname, 'posts.json')
const CONTENT_DIR = path.join(__dirname, '../../src/content/blog')
const USER_AGENT = 'Mozilla/5.0 (compatible; sirp-blog-migration/1.0)'

type PostRef = { slug: string; url: string }

type PostMeta = {
  slug: string
  title: string
  type: string
  image: string
  publishedAt: string
  excerpt: string
}

async function fetchHtml(url: string): Promise<string> {
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } })
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`)
  return res.text()
}

/**
 * The /blog index embeds every post's structured metadata (including posts
 * hidden behind the client "Load More" button) as escaped JSON inside its
 * Next.js RSC payload (`self.__next_f.push(...)` script tags). That is a more
 * reliable source for title/type/date/excerpt/cover than re-deriving them
 * from each post page, so we parse it once and reuse it for every slug.
 */
/**
 * Extracts every `"posts":[...]` array embedded in the page (BlogGrid and
 * BlogChangelog each push one). Brackets are matched by depth rather than a
 * field-order regex, since a naive regex can bleed across object boundaries
 * when a title/excerpt happens to contain characters the pattern doesn't
 * anticipate.
 */
export function extractIndexMetadata(indexHtml: string): Map<string, PostMeta> {
  const out = new Map<string, PostMeta>()
  const marker = '\\"posts\\":['
  let searchFrom = 0

  for (;;) {
    const markerIdx = indexHtml.indexOf(marker, searchFrom)
    if (markerIdx === -1) break
    const arrayStart = markerIdx + marker.length - 1 // position of the '['
    let depth = 0
    let i = arrayStart
    for (; i < indexHtml.length; i++) {
      const c = indexHtml[i]
      if (c === '[') depth++
      else if (c === ']') {
        depth--
        if (depth === 0) {
          i++
          break
        }
      }
    }
    const raw = indexHtml.slice(arrayStart, i)
    searchFrom = i

    let posts: PostMeta[]
    try {
      const unescaped = raw.replace(/\\\\/g, '\\').replace(/\\"/g, '"')
      posts = JSON.parse(unescaped)
    } catch {
      continue
    }
    for (const post of posts) {
      out.set(post.slug, post)
    }
  }

  return out
}

function absoluteUrl(src: string | undefined | null): string | undefined {
  if (!src) return undefined
  if (src.startsWith('http://') || src.startsWith('https://')) return src
  if (src.startsWith('/')) return `${SITE_URL}${src}`
  return src
}

/** Rewrites sirp.io blog links to local routing; leaves everything else untouched. */
export function localizeInternalLinks(html: string): string {
  return html.replace(
    /(href=")https?:\/\/(www\.)?sirp\.io(\/blog\/[a-z0-9-]+)/gi,
    '$1$3'
  )
}

function buildTurndown(): TurndownService {
  const td = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    emDelimiter: '_',
  })
  // Embeds (iframes) aren't plain-Markdown-expressible; keep them as an MDX tag.
  td.addRule('iframeEmbed', {
    filter: 'iframe',
    replacement: (_content, node) => {
      const el = node as unknown as { getAttribute: (n: string) => string | null }
      const src = el.getAttribute('src') ?? ''
      return `\n\n<Embed src="${src}" />\n\n`
    },
  })
  return td
}

async function scrapePost(ref: PostRef, indexMeta: Map<string, PostMeta>) {
  const html = await fetchHtml(ref.url)
  const $ = cheerio.load(html)

  const meta = indexMeta.get(ref.slug)

  const articleLdRaw = $('script[type="application/ld+json"]')
    .toArray()
    .map((el) => $(el).contents().text())
    .find((json) => json.includes('"@type":"Article"'))
  const articleLd = articleLdRaw ? (JSON.parse(articleLdRaw) as Record<string, unknown>) : undefined

  const title = meta?.title || $('h1.blog-post-title').first().text().trim() || (articleLd?.headline as string)
  const excerpt =
    meta?.excerpt || $('p.blog-post-excerpt').first().text().trim() || (articleLd?.description as string) || ''
  const publishedAt = meta?.publishedAt || (articleLd?.datePublished as string) || ''
  const type = (meta?.type || 'BLOG').toUpperCase()
  const coverImage =
    absoluteUrl(meta?.image) ||
    (articleLd?.image as string) ||
    absoluteUrl($('.blog-post-cover img').first().attr('src'))

  const proseEl = $('.blog-post-prose').first()
  if (proseEl.length === 0) {
    throw new Error(`no .blog-post-prose found for ${ref.slug}`)
  }
  const bodyHtml = localizeInternalLinks(proseEl.html() ?? '')

  const turndown = buildTurndown()
  const bodyMarkdown = turndown.turndown(bodyHtml).trim()

  if (!title) throw new Error(`no title extracted for ${ref.slug}`)
  if (!bodyMarkdown) throw new Error(`empty body extracted for ${ref.slug}`)

  const frontmatter: Record<string, unknown> = {
    title,
    slug: ref.slug,
    type,
    publishedAt,
    excerpt,
    coverImage: coverImage ?? '',
    draft: false,
  }

  return { frontmatter, bodyMarkdown }
}

async function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const onlyIdx = args.indexOf('--only')
  const only = onlyIdx !== -1 ? args[onlyIdx + 1] : undefined

  const posts: PostRef[] = JSON.parse(await readFile(POSTS_JSON, 'utf8'))
  const targets = only ? posts.filter((p) => p.slug === only) : posts
  if (only && targets.length === 0) {
    throw new Error(`--only ${only} did not match any slug in posts.json`)
  }

  const indexHtml = await fetchHtml(`${SITE_URL}/blog`)
  const indexMeta = extractIndexMetadata(indexHtml)

  if (!dryRun) await mkdir(CONTENT_DIR, { recursive: true })

  const results: { slug: string; ok: boolean; error?: string }[] = []

  for (const ref of targets) {
    try {
      const { frontmatter, bodyMarkdown } = await scrapePost(ref, indexMeta)
      const outPath = path.join(CONTENT_DIR, `${ref.slug}.mdx`)
      const fileContents = matter.stringify(`\n${bodyMarkdown}\n`, frontmatter)

      if (dryRun) {
        console.log(`--- ${ref.slug} (dry-run, ${fileContents.length} bytes) ---`)
      } else {
        await writeFile(outPath, fileContents, 'utf8')
        console.log(`wrote ${path.relative(process.cwd(), outPath)}`)
      }
      results.push({ slug: ref.slug, ok: true })
    } catch (err) {
      const error = err instanceof Error ? err.message : String(err)
      console.error(`FAILED ${ref.slug}: ${error}`)
      results.push({ slug: ref.slug, ok: false, error })
    }
  }

  const failed = results.filter((r) => !r.ok)
  console.log(`\n${results.length - failed.length}/${results.length} posts converted successfully.`)
  if (failed.length > 0) {
    console.log('Failed:', failed.map((f) => `${f.slug} (${f.error})`).join(', '))
    process.exitCode = 1
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err)
    process.exitCode = 1
  })
}
