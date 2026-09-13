'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table'
import { deletePostAction } from '@/lib/cms/actions'
import type { AdminPostListItem } from '@/lib/cms/types'

const columnHelper = createColumnHelper<AdminPostListItem>()

export function PostsTable({ posts }: { posts: AdminPostListItem[] }) {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'updatedAt', desc: true }])
  const [filter, setFilter] = useState('')

  const columns = useMemo(
    () => [
      columnHelper.accessor('title', {
        header: 'Title',
        cell: (info) => (
          <Link href={`/admin/posts/${info.row.original.id}`} className="cms-table-link">
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor('type', {
        header: 'Type',
        cell: (info) => <span style={{ color: 'var(--cms-fg-dim)' }}>{info.getValue() ?? '—'}</span>,
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => <span className={`cms-badge cms-badge--${info.getValue()}`}>{info.getValue()}</span>,
      }),
      columnHelper.accessor('updatedAt', {
        header: 'Updated',
        cell: (info) => (
          <span style={{ color: 'var(--cms-fg-faint)' }}>{new Date(info.getValue()).toLocaleDateString('en-GB')}</span>
        ),
      }),
      columnHelper.display({
        id: 'actions',
        header: '',
        cell: (info) => (
          <form action={deletePostAction} style={{ textAlign: 'right' }}>
            <input type="hidden" name="id" value={info.row.original.id} />
            <button
              type="submit"
              className="cms-linkbtn"
              // Native confirm keeps this dependency-free; irreversible action.
              onClick={(e) => {
                if (!window.confirm('Delete this post? This cannot be undone.')) e.preventDefault()
              }}
            >
              Delete
            </button>
          </form>
        ),
      }),
    ],
    [],
  )

  const table = useReactTable({
    data: posts,
    columns,
    state: { sorting, globalFilter: filter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div>
      <div className="cms-toolbar">
        <div className="cms-input-icon" style={{ maxWidth: '20rem', width: '100%' }}>
          <Search size={16} />
          <input
            className="cms-input"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter posts…"
          />
        </div>
      </div>

      <div className="cms-table-wrap">
        <table className="cms-table">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <button type="button" onClick={header.column.getToggleSortingHandler()}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{ asc: '▲', desc: '▼' }[header.column.getIsSorted() as string] ?? ''}
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="cms-empty">
                  No posts yet — create your first one.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
