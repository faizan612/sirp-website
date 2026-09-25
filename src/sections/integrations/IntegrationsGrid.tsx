'use client'

import { useId, useMemo, useState } from 'react'
import {
  INTEGRATIONS,
  INTEGRATION_CATEGORIES,
  filterIntegrations,
  sortIntegrations,
  type Integration,
} from '@/lib/data/integrations'
import styles from './integrations-page.module.css'

const SORTED = sortIntegrations(INTEGRATIONS)
const DARK_LOGOS = new Set([
  'Aella Data Starlight',
  'Blue Coat',
  'Cybereason',
  'Cymon',
  'Devo',
  'Elastic',
  'Fidelis',
  'Forcepoint',
  'GreyNoise',
  'Have I Been Pwned',
  'Koodous',
  'Monapi.io',
  'Nivel Technologies',
  'PhishTank',
  'Proofpoint',
  'SIRP',
  'Sangfor',
  'Shodan',
  'Splunk',
  'SSH',
  'Tenable',
  'The Register',
  'Threat Intelligence Platform',
  'Trellix',
  'Trend Micro',
  'Wazuh',
  'WhatIsMyBrowser',
  'Zendesk',
])

export function IntegrationsGrid() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string | null>(null)
  const searchId = useId()

  const results = useMemo(
    () => sortIntegrations(filterIntegrations(SORTED, query, category ?? undefined)),
    [query, category],
  )

  const groupedResults = useMemo(() => {
    const groups = new Map<string, Integration[]>()
    results.forEach((item) => {
      const key = item.category ?? 'Other'
      groups.set(key, [...(groups.get(key) ?? []), item])
    })
    return [...groups.entries()].sort(([a], [b]) => {
      const aIndex = INTEGRATION_CATEGORIES.indexOf(a as (typeof INTEGRATION_CATEGORIES)[number])
      const bIndex = INTEGRATION_CATEGORIES.indexOf(b as (typeof INTEGRATION_CATEGORIES)[number])
      return (aIndex < 0 ? 999 : aIndex) - (bIndex < 0 ? 999 : bIndex)
    })
  }, [results])

  function reset() {
    setQuery('')
    setCategory(null)
  }

  return (
    <section id="integrations-grid" className={styles.catalogSection}>
      <div className={styles.catalogInner}>
        <h2 className={styles.catalogTitle}>All Integrations</h2>
        <div className={styles.catalogLayout}>
          <aside className={styles.catalogSidebar} aria-label="Integration filters">
            <div className={styles.searchWrap}>
              <svg className={styles.searchIcon} viewBox="0 0 24 24" aria-hidden="true">
                <path d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
              </svg>
              <label htmlFor={searchId} className="sr-only">Search integrations by name</label>
              <input
                id={searchId}
                className={styles.searchInput}
                type="search"
                inputMode="search"
                autoComplete="off"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search across SIRP..."
              />
            </div>

            <div className={styles.categoryList} role="group" aria-label="Filter by category">
              {INTEGRATION_CATEGORIES.map((item) => {
                const active = category === item
                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setCategory(active ? null : item)}
                    className={`${styles.categoryButton} ${active ? styles.categoryActive : ''}`}
                  >
                    {item}
                  </button>
                )
              })}
            </div>
          </aside>

          <div className={styles.catalogMain}>
            <p aria-live="polite" className="sr-only">
              {results.length === 0
                ? 'No integrations match that search'
                : `${results.length} integration${results.length === 1 ? '' : 's'} shown`}
            </p>

            {groupedResults.length === 0 ? (
              <div className={styles.emptyState}>
                <p>No integrations match that search.</p>
                <button type="button" onClick={reset} className={styles.resetButton}>Reset search</button>
              </div>
            ) : (
              groupedResults.map(([group, items]) => (
                <section className={styles.catalogGroup} key={group}>
                  <h3 className={styles.groupTitle}>{group}</h3>
                  <ul className={styles.integrationGrid}>
                    {items.map((item) => <IntegrationCard key={item.name} item={item} />)}
                  </ul>
                </section>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function IntegrationCard({ item }: { item: Integration }) {
  const needsDarkLogo = DARK_LOGOS.has(item.name)

  return (
    <li className={styles.integrationCard}>
      <div className={styles.integrationLogo} data-dark-logo={needsDarkLogo || undefined}>
        <img src={item.logo} alt={`${item.name} logo`} loading="lazy" decoding="async" />
      </div>
      <span className={styles.integrationName}>{item.name}</span>
    </li>
  )
}
