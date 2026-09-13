import type { ComponentType } from 'react'
import type { AnySchema } from 'yup'
import type { BlockPropSchema } from './propSchema'

/**
 * One entry per registered marketing component. `StoredProps` is the
 * JSON-safe shape saved in a page's `document`; `ComponentProps` is whatever
 * the real component actually needs — `adapt()` bridges the two so each
 * component's own idiosyncrasies (a nested `data` object vs. flat props,
 * `ReactNode` fields vs. plain strings) never leak into the storage format.
 */
export interface BlockRegistryEntry<StoredProps = any, ComponentProps = any> {
  /** Stable registry key — never renamed once a page has saved a block of this type. */
  type: string
  /** Shown in the block picker. */
  displayName: string
  /** Current shape version this entry's Component/propSchema/adapt expects. */
  schemaVersion: number
  /** Drives the auto-generated property panel form. */
  propSchema: BlockPropSchema
  /** Generated from propSchema via toYupSchema() — same validator used by the panel and the save action. */
  yupSchema: AnySchema
  /** Parses + validates raw stored props, throwing a Yup ValidationError on failure. */
  validate: (raw: unknown) => StoredProps
  /** Patches an older-shape props blob forward to what this entry currently expects. */
  migrate?: (props: unknown, fromVersion: number) => unknown
  /** JSON-safe stored props -> real component props. */
  adapt: (props: StoredProps) => ComponentProps
  Component: ComponentType<ComponentProps>
  /** Used when adding a new instance of this block in the editor. */
  defaultProps: StoredProps
}

const registry = new Map<string, BlockRegistryEntry>()

/** Registers a block type. Throws on a duplicate key — a silent overwrite here would be a much
 *  harder bug to track down than a loud failure at module-load time. */
export function registerBlock<S, C>(entry: BlockRegistryEntry<S, C>): void {
  if (registry.has(entry.type)) {
    throw new Error(`Block type "${entry.type}" is already registered`)
  }
  registry.set(entry.type, entry as BlockRegistryEntry)
}

export function getBlockEntry(type: string): BlockRegistryEntry | undefined {
  return registry.get(type)
}

export function listBlockEntries(): BlockRegistryEntry[] {
  return [...registry.values()]
}

/** Test-only escape hatch — clears the registry so each test file starts from a clean slate. */
export function __resetRegistryForTests(): void {
  registry.clear()
}
