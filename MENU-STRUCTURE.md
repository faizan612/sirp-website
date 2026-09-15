# Site menu structure

Source of truth for menu content: [`src/components/nav/nav-data.ts`](src/components/nav/nav-data.ts).
Rendered by [`SiteNav.tsx`](src/components/nav/SiteNav.tsx) — desktop mega panel via `NavBar`/`MegaPanel`,
mobile accordion drawer via `MobileNav.tsx`. Both consume the same `NAV_MENUS` array.

**Rule: the menu only ever links to a page that is live on https://www.sirp.io.** No placeholders, no
labels that lead nowhere. Layout, typography and column arrangement follow the Figma navigation
variants (file `PhhQqMYiW0bQ5O4a6leHV3`, nodes `124:1217`–`124:1223`); the *contents* are filtered to
live destinations.

## The menu

### Platform
| Column | Entry | Destination |
|---|---|---|
| Overview | OmniSense™ Platform | `/omnisense` |
| Overview | How it works | `/how-autonomous-soc-works` |
| Overview | Enterprise SOC | `/enterprise-soc` † |
| Products | Sara, the Co-Analyst | `https://sara-open.sirp.io/` (external) |
| Capabilities | Integrations | `/integrations` |

### Why SIRP
| Column | Entry | Destination |
|---|---|---|
| The difference | Outcomes and metrics | `/security-outcomes-and-metrics` |
| The difference | The manifesto | `/manifesto` |
| The difference | Technical whitepaper | `/technical-white-paper` |
| The difference | Trust Center | `/trust-center` |
| Compare | SIRP vs SOAR | `/soar-vs-autonomous-soc` |
| Compare | Autonomous SOC buyer's guide | `/buyers-guide` |

### Resources
| Column | Entry | Destination |
|---|---|---|
| Learn | What is an autonomous SOC | `/what-is-autonomous-soc` |
| Learn | How an autonomous SOC works | `/how-autonomous-soc-works` |
| Learn | Autonomous security operations | `/autonomous-security` † |
| Library | Blog | `/blog` |
| Build | Integration catalog | `/integrations` |

### Partners
Not a dropdown — a plain top-level link to `/partners`. None of the design's Partners children
(Channel, Alliances, MSSP/MDR, Distributors, Portal, Deal registration, Enablement, Resources) has a
page, so the panel would have been empty.

### Company
| Column | Entry | Destination |
|---|---|---|
| About | Our story | `/our-story` |
| About | Contact | `/contact` |
| Trust | Trust center | `/trust-center` |

**Get a Demo** → `/contact`. **Logo** → `/`.

† Not present in the Figma navigation. Added so the live page is reachable from the menu.

## Coverage

Every live sirp.io page is reachable from the nav except `/saads-home-page`, which is deliberately
excluded, and individual blog posts, which are reached through `/blog`. No nav link points anywhere
that isn't live.

## What the Figma design has that this doesn't

Figma lists 56 entries across six menus. 43 have no page and are not rendered:

- **Solutions** — the entire menu is gone. None of its 16 entries (Alert triage, Phishing, Identity,
  Endpoint, Vulnerability, Cloud, Air gapped, Government, Regulated, Data residency, Multi tenant,
  Build your own integration, SOC teams, Security leadership, MSSP/MDR, Lean teams) has a page.
- **Platform** — Governed autonomy, Architecture and deployment, OmniCollective, OmniFlex,
  OmniStream, Autonomous triage, Investigation and case management, Response and containment,
  Reporting and analytics, Build your own integration.
- **Why SIRP** — Governed autonomy, SIRP vs AI SOC point tools, Customer stories, ROI calculator,
  Certifications and compliance. The design's third column, *Proof*, is dropped entirely: its only
  live entry was a second "Trust center" already listed under *The difference*.
- **Resources** — Autonomous SOC maturity model, Glossary, Whitepapers and reports,
  Webinars and events, Release notes, Documentation, API reference.
- **Partners** — all eight children (see above).
- **Company** — Leadership, Careers, News and press, Security and compliance, AI governance,
  Data residency and sovereignty, Legal.

As each page ships, add the entry back to `nav-data.ts` with its `href`. The Figma copy for every one
of them is preserved in this file's git history.
