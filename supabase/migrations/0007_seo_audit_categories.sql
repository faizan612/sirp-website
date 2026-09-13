-- 0007 — extend seo_audits with category sub-scores and richer per-page
-- metrics (word count, headings, readability, structured-data types found,
-- internal/broken link counts). Additive only; 0006 already shipped the base
-- table. `issues` rows also start carrying a `category` field going forward —
-- that's a jsonb shape change, not a schema change, so no column is needed
-- for it (existing rows are simply overwritten on the next "Run audit").

alter table public.seo_audits add column if not exists categories jsonb not null default '{}'::jsonb;
alter table public.seo_audits add column if not exists metrics jsonb not null default '{}'::jsonb;
