/**
 * Scans every src/content/blog/*.mdx for image URLs (frontmatter coverImage
 * plus inline ![]() markdown images), downloads reachable ones into
 * public/blog/<slug>/, and rewrites the MDX to the new local path.
 * Unreachable images are left as their original URL and flagged in
 * MIGRATION_LOG.md for manual follow-up. Idempotent: an already-local path
 * (starting with /blog/<slug>/) is left untouched on re-run.
 *
 * Usage:
 *   npx tsx scripts/blog-migration/rehost-images.ts [--dry-run] [--only <slug>]
 */
import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'

const SITE_URL = 'https://www.sirp.io'
const CONTENT_DIR = path.join(__dirname, '../../src/content/blog')
const PUBLIC_DIR = path.join(__dirname, '../../public/blog')
const LOG_PATH = path.join(__dirname, '../../MIGRATION_LOG.md')
const USER_AGENT = 'Mozilla/5.0 (compatible; sirp-blog-migration/1.0)'

function resolveUrl(src: string): string {
  if (src.startsWith('http://') || src.startsWith('https://')) return src
  if (src.startsWith('/')) return `${SITE_URL}${src}`
  return src
}

function filenameFor(url: string): string {
  const clean = url.split('?')[0].split('#')[0]
  return path.basename(clean) || 'image'
}

async function download(url: string, destPath: string): Promise<{ ok: boolean; status?: number }> {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } })
    if (!res.ok) return { ok: false, status: res.status }
    const buf = Buffer.from(await res.arrayBuffer())
    await writeFile(destPath, buf)
    return { ok: true }
  } catch {
    return { ok: false }
  }
}

type ImageRef = { originalMatch: string; url: string; kind: 'frontmatter-cover' | 'inline' }

function findImageRefs(frontmatterCover: string | undefined, body: string): ImageRef[] {
  const refs: ImageRef[] = []
  if (frontmatterCover && !frontmatterCover.startsWith('/blog/')) {
    refs.push({ originalMatch: frontmatterCover, url: frontmatterCover, kind: 'frontmatter-cover' })
  }
  const inlineRe = /!\[[^\]]*\]\(([^)]+)\)/g
  let m: RegExpExecArray | null
  while ((m = inlineRe.exec(body))) {
    const url = m[1]
    if (!url.startsWith('/blog/')) {
      refs.push({ originalMatch: url, url, kind: 'inline' })
    }
  }
  return refs
}

async function processFile(filePath: string, dryRun: boolean) {
  const slug = path.basename(filePath, '.mdx')
  const raw = await readFile(filePath, 'utf8')
  const parsed = matter(raw)

  const refs = findImageRefs(parsed.data.coverImage as string | undefined, parsed.content)
  if (refs.length === 0) return { slug, downloaded: 0, failed: [] as string[] }

  const seen = new Map<string, string>() // originalUrl -> localPath
  const failed: string[] = []
  let downloaded = 0
  let body = parsed.content
  const data = { ...parsed.data }

  if (!dryRun) await mkdir(path.join(PUBLIC_DIR, slug), { recursive: true })

  for (const ref of refs) {
    const absoluteUrl = resolveUrl(ref.url)
    if (seen.has(absoluteUrl)) {
      const local = seen.get(absoluteUrl)!
      if (ref.kind === 'frontmatter-cover') data.coverImage = local
      else body = body.split(ref.originalMatch).join(local)
      continue
    }

    const filename = filenameFor(absoluteUrl)
    const localPath = `/blog/${slug}/${filename}`
    const destPath = path.join(PUBLIC_DIR, slug, filename)

    if (dryRun) {
      console.log(`[dry-run] would fetch ${absoluteUrl} -> ${localPath}`)
      continue
    }

    const result = await download(absoluteUrl, destPath)
    if (result.ok) {
      downloaded++
      seen.set(absoluteUrl, localPath)
      if (ref.kind === 'frontmatter-cover') data.coverImage = localPath
      else body = body.split(ref.originalMatch).join(localPath)
      console.log(`downloaded ${absoluteUrl} -> public${localPath}`)
    } else {
      failed.push(`${absoluteUrl} (status: ${result.status ?? 'network error'})`)
      console.warn(`FAILED ${absoluteUrl}: status ${result.status ?? 'network error'}`)
    }
  }

  if (!dryRun && (downloaded > 0)) {
    const fileContents = matter.stringify(body, data)
    await writeFile(filePath, fileContents, 'utf8')
  }

  return { slug, downloaded, failed }
}

async function appendFailuresToLog(allFailed: { slug: string; failed: string[] }[]) {
  const withFailures = allFailed.filter((r) => r.failed.length > 0)
  if (withFailures.length === 0) return

  let log = await readFile(LOG_PATH, 'utf8').catch(() => '')
  const marker = '## Phase 4 — Media rehosting'
  const section = [
    marker,
    '',
    '**Manual follow-up needed — these image URLs 404\'d or failed to fetch and were left as-is:**',
    '',
    ...withFailures.flatMap((r) => r.failed.map((f) => `- \`${r.slug}\`: ${f}`)),
    '',
  ].join('\n')

  if (log.includes(marker)) {
    log = log.replace(/## Phase 4 — Media rehosting[\s\S]*?(?=\n## |$)/, `${section}\n`)
  } else {
    log += `\n${section}\n`
  }
  await writeFile(LOG_PATH, log, 'utf8')
}

async function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const onlyIdx = args.indexOf('--only')
  const only = onlyIdx !== -1 ? args[onlyIdx + 1] : undefined

  const files = (await readdir(CONTENT_DIR)).filter((f) => f.endsWith('.mdx'))
  const targets = only ? files.filter((f) => f === `${only}.mdx`) : files
  if (only && targets.length === 0) {
    throw new Error(`--only ${only} did not match any file in src/content/blog`)
  }

  const results: { slug: string; downloaded: number; failed: string[] }[] = []
  for (const file of targets) {
    const result = await processFile(path.join(CONTENT_DIR, file), dryRun)
    results.push(result)
  }

  const totalDownloaded = results.reduce((sum, r) => sum + r.downloaded, 0)
  const totalFailed = results.reduce((sum, r) => sum + r.failed.length, 0)
  console.log(`\n${totalDownloaded} images downloaded, ${totalFailed} failed.`)

  if (!dryRun) await appendFailuresToLog(results)
  if (totalFailed > 0) process.exitCode = 1
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
