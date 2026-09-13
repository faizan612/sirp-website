/* ─── Homepage governed-autonomy section — copy + config ────
 * Product truth confirmed 2026-08-20: autonomy is configured per action
 * type (not per playbook/integration/case class), and approval routes to
 * a specific named user, not a role — so gated rows read "approval
 * required," not a role title like "Tier 2" or "SOC Lead." */

export const governedAutonomy = {
  eyebrow: 'Governed autonomy',
  headline: 'Autonomy stops where you say it stops.',
  body: 'Set the level per action, not per platform. OmniSense acts on its own inside those limits and waits for a named human outside them — every time, with the decision recorded.',
  legendLit: 'Runs on its own',
  legendDim: 'Waits for a named human',
  tableCaption: 'Five representative actions and the autonomy policy configured for each, ordered from lowest to highest blast radius.',
} as const

export type LadderLevel = {
  label: string
  active?: boolean
}

/* The fourth level is the one shown selected in the mock — this is a
 * static display of a configured setting, not a live control. */
export const LADDER_LEVELS: readonly LadderLevel[] = [
  { label: 'Observe' },
  { label: 'Recommend' },
  { label: 'Act with approval' },
  { label: 'Act within policy', active: true },
] as const

export type AutonomyRowLevel = 'automatic' | 'gated'

export type AutonomyRow = {
  action: string
  label: string
  level: AutonomyRowLevel
  /** Decorative only — the label text must stand alone without it. */
  icon?: 'lock'
}

/* Ordered lowest to highest blast radius on purpose — do not reorder so
 * automatic and gated rows interleave, and do not add a sixth row. */
export const AUTONOMY_ROWS: readonly AutonomyRow[] = [
  { action: 'Enrich and correlate alert', label: 'Automatic', level: 'automatic' },
  { action: 'Close benign duplicate case', label: 'Automatic', level: 'automatic' },
  { action: 'Quarantine endpoint', label: 'Approval required', level: 'gated' },
  { action: 'Disable user account', label: 'Approval required', level: 'gated' },
  { action: 'Isolate production server', label: 'Never automatic', level: 'gated', icon: 'lock' },
] as const
