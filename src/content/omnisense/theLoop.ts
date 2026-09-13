/* ─── OmniSense page, section 2 — "The loop" ────────────────
 * Copy is final per spec (omnisense-section2-loop-spec.md +
 * omnisense-section2-loop-spec-revised-diagram.md). Do not paraphrase. */

export const EYEBROW = 'ARCHITECTURE'

export const HEADLINE = 'Three parts. One loop. Nothing skips the gate.'

export const BODY =
  "The Planner reasons about what an alert needs and produces a plan. The Executor carries out what gets approved. The Governor decides what happens next. Reasoning happens in the model. Enforcement happens outside it, in code, and the two never trade places."

export const CAPTION_LEFT = 'MODEL REASONING'
export const CAPTION_RIGHT = 'DETERMINISTIC CODE'

export const CHECKPOINTS = [
  {
    key: 'planner',
    label: 'Planner',
    description: 'Reads the alert, the environment, and prior cases. Proposes every action. Approves none of them.',
  },
  {
    key: 'gate',
    label: 'Autonomy Gate',
    description:
      'Fires per action, before execution. Checks the proposed action against your policy and either allows it, holds it for a named approver, or blocks it. Policy is set by you, per action type, not per platform.',
  },
  {
    key: 'executor',
    label: 'Executor',
    description: 'Runs what the gate allows. Nothing reaches your environment without passing through it first.',
  },
  {
    key: 'governor',
    label: 'Decision Governor',
    description: 'Fires once, after the full run. Issues one of three verdicts: close the case, escalate to a human, or issue a new plan.',
  },
] as const

export const NEW_PLAN_CALLOUT =
  "Not a restart. The Governor issues a delta, and the Planner receives the original plan, every action already taken, and the Governor's reasoning as context for the next pass."

export const NEW_PLAN_TAG = 'new plan: not a restart'

export const GATE_TAG = 'enforcement point'
