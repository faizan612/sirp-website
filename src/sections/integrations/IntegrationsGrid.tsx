'use client'

import { useId, useMemo, useState } from 'react'
import {
  INTEGRATIONS,
  HAS_CATEGORIES,
  filterIntegrations,
  sortIntegrations,
  type Integration,
} from '@/lib/data/integrations'
import './IntegrationsGrid.css'

/* ─── Category chips ─────────────────────────────────────── *
 * Rendered only when the data actually carries categories. Today none
 * do, so HAS_CATEGORIES is false and the chip row is omitted entirely
 * (no empty chips). The machinery stays so flipping on categories in the
 * data module lights up the filter with no further wiring. */
const CATEGORIES: string[] = HAS_CATEGORIES
  ? Array.from(
      new Set(
        INTEGRATIONS.map((i) => i.category).filter((c): c is string => Boolean(c)),
      ),
    ).sort((a, b) => a.localeCompare(b))
  : []

const SORTED = sortIntegrations(INTEGRATIONS)

export function IntegrationsGrid() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string | null>(null)
  const searchId = useId()

  const results = useMemo(
    () => sortIntegrations(filterIntegrations(SORTED, query, category ?? undefined)),
    [query, category],
  )

  const hasFilter = query.trim() !== '' || category !== null

  function reset() {
    setQuery('')
    setCategory(null)
  }

  return (
    <section id="integrations-grid" className="bg-[#121218] py-16 md:py-24 scroll-mt-24">
      <div className="container-sirp">

        {/* Filter controls */}
        <div className="flex flex-col gap-5 mb-10 md:mb-12">
          <div className="relative max-w-[420px] w-full">
            <label htmlFor={searchId} className="sr-only">
              Search integrations by name
            </label>
            <input
              id={searchId}
              type="search"
              inputMode="search"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search integrations"
              className="w-full bg-[#1a1a26] border border-[#3a3a4d] rounded-[10px] px-4 py-3 text-white text-[15px] font-sans placeholder:text-white/40 outline-none focus:border-[#8e2dff] transition-colors duration-200"
            />
          </div>

          {/* Category chips — only when category metadata exists. */}
          {CATEGORIES.length > 0 && (
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
              {CATEGORIES.map((cat) => {
                const active = category === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setCategory(active ? null : cat)}
                    className={`integrations-chip font-sans text-[13px] px-3.5 py-1.5 rounded-full border transition-colors duration-200 ${
                      active
                        ? 'border-[#8e2dff] bg-[rgba(142,45,255,0.25)] text-white'
                        : 'border-[#3a3a4d] bg-[#1a1a26] text-white/70 hover:border-[#8e2dff]/60 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
              {hasFilter && (
                <button
                  type="button"
                  onClick={reset}
                  className="font-sans text-[13px] px-3.5 py-1.5 rounded-full border border-transparent text-white/60 hover:text-white underline-offset-2 hover:underline transition-colors duration-200"
                >
                  Reset
                </button>
              )}
            </div>
          )}
        </div>

        {/* Result count — announced to assistive tech. */}
        <p aria-live="polite" className="sr-only">
          {results.length === 0
            ? 'No integrations match that search'
            : `${results.length} integration${results.length === 1 ? '' : 's'} shown`}
        </p>

        {/* Grid or empty state */}
        {results.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-sans text-white/70 text-base md:text-lg">
              No integrations match that search.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-4 inline-flex items-center font-sans text-[15px] text-white border border-[#3a3a4d] rounded-full px-5 py-2.5 hover:border-[#8e2dff] transition-colors duration-200"
            >
              Reset search
            </button>
          </div>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 list-none p-0 m-0">
            {results.map((item) => (
              <IntegrationCard key={item.name} item={item} />
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

/* ─── Card ───────────────────────────────────────────────── *
 * Fixed-aspect logo container so mismatched logo dimensions align on a
 * common baseline. Logos render on their native treatment; the neutral
 * #1f1f2b inner tile guarantees contrast on the dark surface without
 * recoloring brand marks. */
function IntegrationCard({ item }: { item: Integration }) {
  const card = (
    <>
      <div className="aspect-square w-full flex items-center justify-center rounded-[12px] bg-[#1f1f2b] p-4 mb-3">
        <img
          src={item.logo}
          alt={`${item.name} logo`}
          loading="lazy"
          decoding="async"
          className="max-w-[56px] max-h-[56px] w-auto h-auto object-contain"
          onError={(e) => {
            const t = e.target as HTMLImageElement
            t.style.display = 'none'
          }}
        />
      </div>
      <span className="block font-sans text-white/85 text-[13px] md:text-sm text-center leading-snug">
        {item.name}
      </span>
      {item.description && (
        <span className="block font-sans text-white/50 text-[12px] text-center leading-snug mt-1">
          {item.description}
        </span>
      )}
    </>
  )

  return (
    <li>
      <div className="integrations-card h-full rounded-[16px] border border-[#3a3a4d] bg-[#1a1a26] p-3 transition-colors duration-200 hover:border-[#8e2dff]">
        {item.href ? (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8e2dff] rounded-[12px]"
          >
            {card}
          </a>
        ) : (
          card
        )}
      </div>
    </li>
  )
}
