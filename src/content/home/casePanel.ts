/* ─── Hero case panel — copy and case data ──────────────────
 * Every string here is a claim rendered in the homepage hero.
 * CASE_DURATION_S / STEP_COUNT were dropped (spec §9.1-2): no
 * sourced real-case numbers exist yet, so the receipt line stays
 * qualitative instead of inventing a duration or step count.
 * PROVENANCE_NOTE and the governance auto-approve copy are both
 * confirmed accurate — see spec §9.3-4. */

export const PROVENANCE_NOTE = 'Recorded from a live case. Environment details changed.'

export const POLICY_NAME = 'Identity · High severity'

export const CASE = {
  id: 'INC-10482',
  title: 'Suspicious sign-in from unrecognised ASN, followed by endpoint process spawn',
  severity: 'High',
  meta: ['SIEM', '2 artifacts', 'Unassigned'],
  evidence: [
    'Pulled 90 days of sign-in history',
    'Built endpoint process tree',
    'Checked ASN against 3 reputation sources',
    'Compared to 11 similar closed cases',
  ],
  proposed: 'Revoke session, isolate host',
  actions: ['Session revoked', 'Host isolated', 'Case documented and signed off'],
  verdict: 'Confirmed compromise, contained.',
} as const

export const IDLE_LABEL =
  'One alert, received and unassigned. Watch it close, including the approval step.'
export const RUN_LABEL = 'Close this case'
export const RUNNING_LABEL = 'Working…'
export const RECEIPT_LABEL = 'Closed in minutes, not hours.'
export const REPLAY_LABEL = 'Watch it again'
export const COMPRESSED_LABEL = 'compressed'

export const AUDIT_CTA = { label: 'See the audit trail', href: '/how-autonomous-soc-works' }
export const SARA_CTA = { label: 'Try Sara, free', href: 'https://sara-open.sirp.io/' }

export const RAIL_STAGES = [
  { key: 'idle', label: 'Received' },
  { key: 'investigating', label: 'Investigating' },
  { key: 'gate', label: 'Governance' },
  { key: 'acting', label: 'Acting' },
  { key: 'closed', label: 'Closed' },
] as const

/* Timeline markers, ms from run start. Gate holds 2.0s — longer than
 * every other stage — because it's the beat that demonstrates
 * governance. Do not even these out. */
export const T = {
  evidence: [250, 850, 1450, 2050],
  gate: 2650,
  acting: 4650,
  actions: [4700, 5000, 5300],
  closed: 5900,
} as const

export const RUN_END = T.closed
export const IDLE_AUTORUN_MS = 2500
