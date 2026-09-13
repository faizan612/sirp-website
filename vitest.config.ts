import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Resolve the `@/*` alias from tsconfig natively (Vite ≥ the version
    // bundled with Vitest 4) — no extra plugin needed.
    tsconfigPaths: true,
    alias: {
      // The real `server-only` package unconditionally throws; Next's bundler
      // swaps in a no-op version when building the server bundle. Vitest has
      // no such distinction, so alias it the same way. See the stub file for
      // the full explanation.
      'server-only': path.resolve(dirname, './src/test/stubs/server-only.ts'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}', 'scripts/**/*.{test,spec}.{ts,tsx}'],
  },
})
