# Site menu structure

Source of truth for menu content: [`src/components/nav/nav-data.ts`](src/components/nav/nav-data.ts).
Rendered by [`SiteNav.tsx`](src/components/nav/SiteNav.tsx) (desktop mega panel via `NavBar`/`MegaPanel`,
mobile drawer via `MobileNav.tsx`) — both consume the same `NAV_MENUS` array, so there is one
structure to maintain, not two.

Each link in `nav-data.ts` carries a `status: 'live' | 'planned'` field. This document is a snapshot
of that data as of 2026-08-26, split into what's live (has a real `page.tsx`) vs. what's still
planned (no page yet — would 404 if linked). ✅ = page exists, ❌ = no page yet.

## Platform

- **Overview**
  - OmniSense platform → `/omnisense` ✅
  - How it works → `/how-autonomous-soc-works` ✅
  - Governed autonomy → `/governed-autonomy` ❌
  - Architecture and deployment → `/architecture` ❌
- **Products**
  - Sara, the Co-Analyst → `/sara` ❌
  - OmniScan → `/omniscan` ❌
  - OmniFlex → `/omniflex` ❌
  - OmniStream → `/omnistream` ❌
  - OmniIntel → `/omniintel` ❌
  - OmniCollective → `/omnicollective` ❌
  - OmniUpdate → `/omniupdate` ❌
- **Capabilities**
  - Autonomous triage → `/capabilities/triage` ❌
  - Investigation and case management → `/capabilities/investigation` ❌
  - Response and containment → `/capabilities/response` ❌
  - Reporting and analytics → `/capabilities/reporting` ❌
  - Integrations → `/integrations` ✅
  - Build your own integration → `/integrations/build` ❌
- Featured: "Try Sara" → `https://sara-open.sirp.io/` (external, live)
- Footer: "See the catalog" → `/integrations` ✅ (was mismarked `planned` in the data — the page exists)

## Solutions

- **By use case**: alert triage, phishing, identity, endpoint, vulnerability, cloud — all under
  `/solutions/*` ❌ (none built)
- **By team**: SOC teams, security leadership, MSSP/MDR, lean teams — all under `/solutions/*` ❌
- **By environment**: air gapped, government, regulated, data residency, multi tenant — all under
  `/solutions/*` ❌
- Featured card: placeholder, no content

**No page in this menu is built.**

## Why SIRP

- **The difference**
  - Governed autonomy → `/governed-autonomy` ❌
  - Outcomes and metrics → `/security-outcomes-and-metrics` ✅
  - The manifesto → `/manifesto` ✅
  - Technical whitepaper → `/technical-white-paper` ✅
  - Trust Center → `/trust-center` ✅
- **Compare**
  - SIRP vs SOAR → `/soar-vs-autonomous-soc` ✅
  - SIRP vs AI SOC point tools → `/compare/ai-soc-tools` ❌
  - Autonomous SOC buyer's guide → `/buyers-guide` ✅ (was mismarked `planned` in the data — the page exists)
- **Proof**
  - Customer stories → `/customers` ❌
  - ROI calculator → `/roi-calculator` ❌
  - Trust center → `/trust-center` ✅ (duplicate of "The difference" column)
  - Certifications and compliance → `/compliance` ❌

## Resources

- **Learn**
  - What is an autonomous SOC → `/what-is-autonomous-soc` ✅
  - How an autonomous SOC works → `/how-autonomous-soc-works` ✅
  - Autonomous SOC maturity model → `/maturity-model` ❌
  - Glossary → `/glossary` ❌
- **Library**
  - Blog → `/blog` ✅
  - Whitepapers and reports → `/resources` ❌
  - Webinars and events → `/events` ❌
  - Release notes → `/release-notes` ❌
- **Build**
  - Documentation → `/docs` ❌
  - Integration catalog → `/integrations` ✅
  - API reference → `/docs/api` ❌
- Featured: "Whitepaper" — placeholder, no content ❌

## Partners

- Top-level label itself → `/partners` ❌ (no landing page)
- **Programs**: channel, alliances, MSSP/MDR, distributors — all under `/partners/*` ❌
- **For partners**: portal, deal registration, enablement, resources — all under `/partners/*` ❌
- Featured: "NetWitness" partnership card — placeholder ❌

**No page in this menu is built, including the top-level landing page.**

## Company

- **About**
  - Our story → `/our-story` ✅
  - Leadership → `/company/leadership` ❌
  - Careers → `/careers` ❌
  - News and press → `/news` ❌
  - Contact → `/contact` ✅
- **Trust**
  - Trust center → `/trust-center` ✅
  - Security and compliance → `/compliance` ❌
  - AI governance → `/ai-governance` ❌
  - Data residency and sovereignty → `/data-residency` ❌
  - Legal → `/legal` ❌
- Featured: "Bethesda & London" — static offices card, live

---

## Pages yet to be built

Grouped by area, deduped:

**Platform / products**
`/governed-autonomy`, `/architecture`, `/sara`, `/omniscan`, `/omniflex`, `/omnistream`,
`/omniintel`, `/omnicollective`, `/omniupdate`, `/capabilities/triage`,
`/capabilities/investigation`, `/capabilities/response`, `/capabilities/reporting`,
`/integrations/build`

**Solutions**
`/solutions/alert-triage`, `/solutions/phishing`, `/solutions/identity`, `/solutions/endpoint`,
`/solutions/vulnerability`, `/solutions/cloud`, `/solutions/soc-teams`,
`/solutions/security-leadership`, `/solutions/mssp`, `/solutions/lean-teams`,
`/solutions/air-gapped`, `/solutions/government`, `/solutions/regulated`,
`/solutions/data-residency`, `/solutions/multi-tenant`

**Why SIRP**
`/compare/ai-soc-tools`, `/customers`, `/roi-calculator`, `/compliance`

**Resources**
`/maturity-model`, `/glossary`, `/resources`, `/events`, `/release-notes`, `/docs`, `/docs/api`

**Partners**
`/partners` (landing page), `/partners/channel`, `/partners/alliances`, `/partners/mssp`,
`/partners/distributors`, `/partners/portal`, `/partners/deal-registration`,
`/partners/enablement`, `/partners/resources`

**Company**
`/company/leadership`, `/careers`, `/news`, `/ai-governance`, `/data-residency`, `/legal`

**Total: ~55 unique unbuilt routes.**

## Built pages currently in the menu

`/omnisense`, `/how-autonomous-soc-works`, `/integrations`, `/security-outcomes-and-metrics`,
`/manifesto`, `/technical-white-paper`, `/trust-center`, `/soar-vs-autonomous-soc`,
`/buyers-guide`, `/what-is-autonomous-soc`, `/blog`, `/our-story`, `/contact`

## Change made alongside this doc

The **Solutions** and **Partners** top-level menus had zero built pages (Partners' own landing
page doesn't exist either), so both were removed from the live menu rather than left pointing at
404s. Every remaining `planned`-status link was also removed. See the nav-data.ts diff for the
resulting (smaller) menu — restore entries here as their pages ship.
