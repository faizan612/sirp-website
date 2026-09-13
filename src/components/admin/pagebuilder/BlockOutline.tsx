'use client'

import '@/lib/pagebuilder/blocks'
import { getBlockEntry, listBlockEntries } from '@/lib/pagebuilder/registry'
import type { BlockInstance } from '@/lib/pagebuilder/types'

export function BlockOutline({
  blocks,
  selectedId,
  onSelect,
  onAdd,
  onMove,
  onDuplicate,
  onDelete,
}: {
  blocks: BlockInstance[]
  selectedId: string | null
  onSelect: (id: string) => void
  onAdd: (type: string) => void
  onMove: (id: string, direction: 'up' | 'down') => void
  onDuplicate: (id: string) => void
  onDelete: (id: string) => void
}) {
  const entries = listBlockEntries()

  return (
    <div className="cms-card">
      <div className="cms-card-head">
        <div className="cms-card-title">Blocks</div>
      </div>
      <ul className="cms-list">
        {blocks.length === 0 && (
          <li>
            <span className="cms-list-meta">No blocks yet — add one below.</span>
          </li>
        )}
        {blocks.map((block, i) => {
          const entry = getBlockEntry(block.type)
          const isSelected = block.id === selectedId
          return (
            <li
              key={block.id}
              style={{ cursor: 'pointer', background: isSelected ? 'var(--cms-elevated)' : undefined }}
              onClick={() => onSelect(block.id)}
            >
              <span>{entry?.displayName ?? `Unknown block (${block.type})`}</span>
              <span style={{ display: 'flex', gap: '0.6rem' }} onClick={(e) => e.stopPropagation()}>
                <button type="button" className="cms-linkbtn" disabled={i === 0} onClick={() => onMove(block.id, 'up')}>
                  Up
                </button>
                <button
                  type="button"
                  className="cms-linkbtn"
                  disabled={i === blocks.length - 1}
                  onClick={() => onMove(block.id, 'down')}
                >
                  Down
                </button>
                <button type="button" className="cms-linkbtn" onClick={() => onDuplicate(block.id)}>
                  Duplicate
                </button>
                <button type="button" className="cms-linkbtn" onClick={() => onDelete(block.id)}>
                  Delete
                </button>
              </span>
            </li>
          )
        })}
      </ul>
      <div className="cms-card-body" style={{ borderTop: '1px solid var(--cms-line)' }}>
        <select
          className="cms-select"
          value=""
          onChange={(e) => {
            if (e.target.value) {
              onAdd(e.target.value)
              e.target.value = ''
            }
          }}
        >
          <option value="">+ Add a block…</option>
          {entries.map((entry) => (
            <option key={entry.type} value={entry.type}>
              {entry.displayName}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
