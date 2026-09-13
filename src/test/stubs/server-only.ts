// Vitest stub for the `server-only` package.
//
// The real package unconditionally throws — Next.js's bundler swaps in a
// no-op version of this exact file when building the actual server bundle,
// and the throwing version only when a server-only module gets accidentally
// pulled into a client bundle. Vitest has no such dual-bundle distinction, so
// without this alias every test that imports a `server-only`-marked module
// (e.g. BlockRenderer.tsx) would hit that throw regardless of context. See
// the `resolve.alias` entry in vitest.config.ts.
export {}
