'use client'

import { useId, useRef } from 'react'
import {
  AUDIT_CTA,
  CASE,
  COMPRESSED_LABEL,
  IDLE_LABEL,
  POLICY_NAME,
  PROVENANCE_NOTE,
  RAIL_STAGES,
  RECEIPT_LABEL,
  REPLAY_LABEL,
  RUNNING_LABEL,
  RUN_LABEL,
  SARA_CTA,
} from '@/content/home/casePanel'
import { fmt, useCaseRun, type Stage } from './useCaseRun'

const STAGE_ORDER: Stage[] = RAIL_STAGES.map((s) => s.key)

const FOCUS_RING =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-white'

function announcementFor(stage: Stage): string {
  switch (stage) {
    case 'investigating':
      return 'Investigating'
    case 'gate':
      return 'Governance gate evaluating the proposed action'
    case 'acting':
      return 'Taking action'
    case 'closed':
      return `Case ${CASE.id} closed. ${CASE.verdict}`
    default:
      return ''
  }
}

export function CasePanel() {
  const panelRef = useRef<HTMLDivElement>(null)
  const { stage, elapsedMs, evidenceCount, actionCount, isRunning, replay, run } =
    useCaseRun(panelRef)
  const headingId = useId()

  const currentIndex = STAGE_ORDER.indexOf(stage)
  const isClosed = stage === 'closed'
  const isGate = stage === 'gate'

  return (
    <div
      ref={panelRef}
      id="case-walkthrough"
      aria-labelledby={headingId}
      className="relative w-full rounded-[var(--radius-sirp-lg)] border bg-hero-surface p-6 transition-[border-color,box-shadow] duration-300 md:p-8"
      style={{
        borderColor: isGate ? 'var(--color-purple-glow)' : 'var(--color-hairline)',
        boxShadow: isGate
          ? '0 0 0 1px var(--color-purple-glow), 0 0 32px var(--color-accent-glow)'
          : 'none',
      }}
    >
      {/* Single source of truth for screen-reader stage announcements. */}
      <div role="status" aria-live="polite" className="sr-only">
        {announcementFor(stage)}
      </div>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-text-tertiary">
            <span>{CASE.id}</span>
            <span aria-hidden>·</span>
            <span className="text-red-400">{CASE.severity}</span>
          </div>
          <h3 id={headingId} className="mt-1 font-sans text-base font-medium text-white md:text-lg">
            {CASE.title}
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {CASE.meta.map((m) => (
              <span
                key={m}
                className="rounded-full border border-hairline px-2 py-0.5 font-sans text-xs text-text-muted"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Rail + stage content — min-height keeps the panel from shifting between stages. */}
      <div className="mt-6 grid grid-cols-[auto_1fr] gap-4 md:gap-6" style={{ minHeight: 260 }}>
        <ol aria-hidden className="hidden flex-col items-center min-[520px]:flex">
          {RAIL_STAGES.map((s, i) => {
            const reached = i <= currentIndex
            const nodeIsGate = s.key === 'gate'
            return (
              <li key={s.key} className="flex flex-1 flex-col items-center">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full border transition-colors duration-300"
                  style={{
                    borderColor: reached
                      ? nodeIsGate
                        ? 'var(--color-purple)'
                        : 'var(--color-text-muted)'
                      : 'var(--color-hairline)',
                    backgroundColor: reached
                      ? nodeIsGate
                        ? 'var(--color-purple)'
                        : 'var(--color-text-muted)'
                      : 'transparent',
                  }}
                />
                {i < RAIL_STAGES.length - 1 && (
                  <span
                    className="w-px flex-1 transition-colors duration-300"
                    style={{
                      backgroundColor:
                        i < currentIndex ? 'var(--color-text-muted)' : 'var(--color-hairline)',
                    }}
                  />
                )}
              </li>
            )
          })}
        </ol>

        <div className="flex flex-col justify-center gap-3">
          {stage === 'idle' && (
            <p className="font-sans text-sm text-text-muted md:text-base">{IDLE_LABEL}</p>
          )}

          {stage === 'investigating' && (
            <ul className="flex flex-col gap-2">
              {CASE.evidence.slice(0, evidenceCount).map((line) => (
                <li key={line} className="font-mono text-sm text-text-secondary">
                  {line}
                </li>
              ))}
            </ul>
          )}

          {stage === 'gate' && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span aria-hidden className="text-lg text-purple">
                  ⛨
                </span>
                <span className="font-sans text-sm font-medium text-white">Governance gate</span>
              </div>
              <p className="font-mono text-sm text-text-secondary">Proposed: {CASE.proposed}</p>
              <p className="font-mono text-sm text-purple-light">
                Auto-approved under your policy — {POLICY_NAME}
              </p>
            </div>
          )}

          {stage === 'acting' && (
            <ul className="flex flex-col gap-2">
              {CASE.actions.slice(0, actionCount).map((line) => (
                <li key={line} className="font-mono text-sm text-text-secondary">
                  {line}
                </li>
              ))}
            </ul>
          )}

          {isClosed && (
            <div className="flex flex-col gap-2">
              <p className="font-sans text-sm font-medium text-white md:text-base">
                {CASE.verdict}
              </p>
              <p className="font-mono text-xs text-text-tertiary">{RECEIPT_LABEL}</p>
              <p className="font-mono text-[11px] text-text-quaternary">{PROVENANCE_NOTE}</p>
            </div>
          )}
        </div>
      </div>

      {/* Compressed-replay clock — only while actually running, never a real-duration claim. */}
      <p className="mt-4 h-4 font-mono text-xs text-text-tertiary" aria-hidden>
        {isRunning ? (
          <>
            {fmt(elapsedMs)} <span className="text-text-quaternary">{COMPRESSED_LABEL}</span>
          </>
        ) : (
          ' '
        )}
      </p>

      {/* Run control, or the closing CTA pair once the case is closed. */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {!isClosed && (
          <button
            type="button"
            onClick={run}
            disabled={isRunning}
            className={`inline-flex items-center justify-center rounded-xl bg-white px-5 py-2.5 font-sans text-sm font-medium text-black transition-opacity disabled:cursor-not-allowed disabled:opacity-60 ${FOCUS_RING}`}
          >
            {isRunning ? RUNNING_LABEL : RUN_LABEL}
          </button>
        )}

        {isClosed && (
          <>
            <a
              href={AUDIT_CTA.href}
              className={`inline-flex items-center justify-center rounded-xl border border-hairline px-5 py-2.5 font-sans text-sm font-medium text-white transition-colors hover:border-white/40 ${FOCUS_RING}`}
            >
              {AUDIT_CTA.label}
            </a>
            <a
              href={SARA_CTA.href}
              className={`inline-flex items-center justify-center rounded-xl bg-white px-5 py-2.5 font-sans text-sm font-medium text-black ${FOCUS_RING}`}
            >
              {SARA_CTA.label}
            </a>
            <button
              type="button"
              onClick={replay}
              className={`font-sans text-xs text-text-muted underline-offset-2 hover:text-white hover:underline ${FOCUS_RING}`}
            >
              {REPLAY_LABEL}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
