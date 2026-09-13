# Blog Supabase → MDX Migration Log

## Phase 0 — Repo reconnaissance (done)

- Framework: Next.js 16 App Router. Blog routes: `src/app/(site)/blog/page.tsx`, `src/app/(site)/blog/[slug]/page.tsx`.
- Data source: Supabase table `blog_posts`, queried via `src/lib/blog/queries.ts`.
- Row shape (`src/lib/blog/types.ts`): `id, title, slug, content, content_json (Tiptap JSON), excerpt, cover_image, published_at, type`.
- Rendering (`src/sections/blog/BlogPostContent.tsx`): Tiptap JSON renderer (preferred) → raw HTML fallback → `react-markdown` fallback. No MDX usage anywhere yet.
- No MDX content layer installed (`@next/mdx`, `contentlayer`, `velite`, `next-mdx-remote`, `cheerio`, `turndown`, `playwright` all absent). Needs to be added in a later phase.
- No `saads-home-page` branch exists; continuing work on `claude/security-outcomes-metrics-revamp-8vm5uv` per explicit user instruction, keeping migration commits separate from the pre-existing unrelated uncommitted reskin changes on that branch.
- Checked `khurram/custom-cms-blog` (source of the current Supabase/Tiptap CMS, already merged into `main`) — no prior MDX migration work found there.

## Phase 1 — Discover every post (done)

- Fetched `https://www.sirp.io/sitemap.xml` — single file, not sharded (no `/sitemap-0.xml` or `/sitemap_index.xml`).
- 15 blog post URLs found, all written to `scripts/blog-migration/posts.json`.
- Cross-checked against `/blog` index page: only 10 of 15 render in the initial server HTML because the index uses a client-side "Load More" button — this is expected pagination behavior, not a sign of drafts/staleness. The sitemap's 15 is the authoritative full list.
- No slugs look like drafts/test/unpublished posts (no "test", "draft", "untitled", numeric-only slugs, etc.) — none flagged for manual review.
- Confirmed post pages are server-rendered (article body text present in raw HTML) — `cheerio` is sufficient for Phase 3, Playwright is not needed.

## Phase 2 — Frontmatter schema (confirmed)

```yaml
---
title: string
slug: string
type: 'PILLAR' | 'BLOG' | 'CHANGELOG'   # default 'BLOG'
publishedAt: ISO 8601 date
excerpt: string
coverImage: string        # rewritten to /blog/<slug>/<file> by Phase 4
author: string             # optional; captured if the source has one
tags: string[]              # optional; captured if the source has any
draft: boolean               # default false
---
```

`author`/`updatedDate`/`tags`/`seoTitle`/`seoDescription`/`ogImage` from the spec's
generic default were dropped except `author`/`tags`, which the user asked to keep
as optional forward-looking fields even though nothing in the current data model
populates them.

Discovery during Phase 0/2 recon: the `/blog` index page's Next.js RSC payload
(embedded in its server HTML, inside `self.__next_f.push(...)` script tags)
contains structured JSON for every post's `id, slug, title, image, date,
publishedAt, type, excerpt` — including the 5 posts hidden behind the
client-side "Load More" button. This is a more reliable metadata source than
scraping each post page, so Phase 3 reads metadata from there and only scrapes
individual post pages for the article body HTML (`.blog-post-prose`) and for
per-post JSON-LD as a fallback. No `author`/`tags` data exists anywhere on the
live site for any post — those fields are omitted from every generated file's
frontmatter for this migration (schema supports them for future posts).

## Phase 3 — Extraction script (done)

- `scripts/blog-migration/scrape-and-convert.ts`, run without `--dry-run`.
- 15/15 posts converted successfully into `src/content/blog/<slug>.mdx`.
- One bug found and fixed during validation: the first regex-based RSC
  metadata parser matched title/excerpt fields too greedily and let one
  post's title swallow the next post's JSON object. Replaced with
  bracket-depth matching + `JSON.parse`; all 15 files regenerated and
  spot-checked (title/type/coverImage) — all correct, types match the
  known distribution (10 BLOG, 3 PILLAR, 2 CHANGELOG).

## Phase 4 — Media rehosting (done)

- `scripts/blog-migration/rehost-images.ts`, run without `--dry-run`.
- 21/21 images downloaded (15 cover images + 6 inline images across the 2
  posts that had them) — 0 failures. All Supabase/site image URLs were
  still publicly reachable.
- Images live under `public/blog/<slug>/`; MDX frontmatter `coverImage`
  and inline `![]()` paths rewritten to the new local `/blog/<slug>/...`
  paths in place.
- No manual follow-up needed — nothing 404'd, so no entries were added to
  a "Phase 4" failures section.

## Phase 5 — Validation (done)

- Confirmed all 15 slugs in `posts.json` produced a corresponding `.mdx` file — no gaps.
- Diffed 5 posts (including the longest, `why-soar-cannot-achieve-true-security-autonomy`, and the two posts with inline images/lists/blockquotes) against the live rendered page: word counts, heading counts (h2/h3), list/blockquote/link counts all match within the expected 2-8% markdown-formatting overhead (bullet markers, link syntax, etc. count as "words" in the naive split). No dropped content, no mangled links, no broken nesting found.
- One apparent mismatch turned out to be correct behavior, not a bug: `the-economics-of-an-ai-native-soc` has a live `<blockquote><h3>...</h3><h5>...</h5></blockquote>` pull-quote pattern; turndown correctly emitted it as `> ### Economic Shift in One Sentence` / `> ##### ...` (nested heading inside blockquote), which a naive `^### ` line check doesn't match but is valid, faithful Markdown.
- No embeds/iframes/callout/CTA components found in any of the 15 posts on the live site, so the `<Embed>` MDX-tag fallback rule in the script is untested against real content (defensive-only for now).
- Added a vitest regression fixture: `scripts/blog-migration/scrape-and-convert.test.ts` asserts the metadata-array parser and per-file frontmatter (via `gray-matter`) stay valid — non-empty title/slug/body — for a checked-in fixture of one known post, so a future change to the parser can't silently break re-runs.

## Phase 6 — Cutover (done, pending PR review)

- `src/lib/blog/queries.ts` rewritten to read `src/content/blog/*.mdx` via
  `gray-matter` instead of querying the Supabase `blog_posts` table. All 5
  exported function names/signatures kept identical
  (`getPublishedBlogPosts`, `getPublishedChangelogPosts`,
  `getPublishedBlogGridPosts`, `getBlogPostBySlug`, `getPublishedBlogSlugs`),
  so `src/app/sitemap.ts`, `src/app/(site)/blog/page.tsx`,
  `src/app/(site)/blog/[slug]/page.tsx`, and `src/lib/seo/actions.ts` needed
  no changes beyond the two below.
- `src/lib/blog/types.ts`: `BlogPostRow` no longer has `content_json`
  (Tiptap JSON) — content is now the raw MDX body string.
- `src/sections/blog/BlogPostContent.tsx` rewritten to render via
  `next-mdx-remote/rsc`'s `<MDXRemote>` (added as a dependency) instead of
  its old three-way Tiptap-JSON / raw-HTML / react-markdown branching.
- `src/app/(site)/blog/[slug]/page.tsx` updated to stop passing the now
  removed `contentJson` prop.
- No slugs changed during migration, so no `next.config.js` redirects were
  needed.
- Verified with `npm run build`: all 15 posts statically generate
  (`generateStaticParams`), correct titles/metadata/cover images/inline
  images render in the output HTML.  Browser-pane verification was
  intentionally skipped per standing instruction not to drive the Browser
  pane against sirp.io — build output was inspected directly instead.

**Scope boundary — what was intentionally NOT touched:**
- **Admin CMS** (`src/lib/cms/*`, `src/components/admin/PostForm.tsx`,
  `src/app/(admin)/admin/posts/*`) still reads/writes `blog_posts` in
  Supabase. That's a separate write path from what the spec calls "the
  Supabase blog-fetch code path" (the public site's read path, now fully
  removed). The admin editor will still work but any post it creates or
  edits will **not** appear on the public site anymore — it's now writing
  to a data source nothing reads. Needs a follow-up decision (repoint the
  editor at the MDX files, or retire it) that's out of scope for this PR.
- **`src/sections/blog/TiptapRenderer.tsx`** is now dead code (only
  referenced by its own test) since `BlogPostContent` no longer renders
  Tiptap JSON. Left in place rather than deleted, per the ground rule to
  ask before deleting existing blog code — flagging for a follow-up
  cleanup PR instead of bundling a deletion into this migration.
- `react-markdown`/`remark-gfm` (legacy markdown rendering) are now
  unused in `src/` but were left in `package.json` — same reasoning.
