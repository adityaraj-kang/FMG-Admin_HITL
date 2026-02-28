'use client'

import { useRef, useMemo } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import type { CallRecord } from '@/lib/mockData'
import { CallCard } from '@/components/dashboard/CallCard'

// ─── Constants ────────────────────────────────────────────────────────────────

const COLS = 4
const ESTIMATED_ROW_HEIGHT = 220 // pixels, estimate — virtualizer measures actual height

// ─── Helpers ──────────────────────────────────────────────────────────────────

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface VirtualCallGridProps {
  calls: CallRecord[]
}

// ─── Component ────────────────────────────────────────────────────────────────

export function VirtualCallGrid({ calls }: VirtualCallGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const rows = useMemo(() => chunkArray(calls, COLS), [calls])

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ESTIMATED_ROW_HEIGHT,
    overscan: 5,
  })

  // ── Empty state ─────────────────────────────────────────────────────────────

  if (calls.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-[var(--text-muted)]">
        <svg
          width="48"
          height="48"
          viewBox="0 0 256 256"
          fill="currentColor"
          style={{ opacity: 0.3 }}
        >
          <path d="M222.37,158.46l-47.11-21.11a16,16,0,0,0-15.48,1.38l-26.89,17.93a88.31,88.31,0,0,1-76.51-76.51l17.93-26.89A16,16,0,0,0,76.69,38.14L55.58,33.86a16.09,16.09,0,0,0-11.39,2.37A16.79,16.79,0,0,0,38,44.49,184.22,184.22,0,0,0,32,72,184,184,0,0,0,216,256h0a184.51,184.51,0,0,0,27.5-6A16.79,16.79,0,0,0,251,243.41,16.09,16.09,0,0,0,253.63,232L249.36,211A16.09,16.09,0,0,0,222.37,158.46Z" />
        </svg>
        <p className="font-mono text-[12px] uppercase tracking-wider">
          No calls match your filters
        </p>
      </div>
    )
  }

  // ── Virtualized grid ────────────────────────────────────────────────────────

  return (
    <div
      ref={scrollRef}
      style={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}
    >
      {/* Total virtual height container */}
      <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
        {virtualizer.getVirtualItems().map(vRow => (
          <div
            key={vRow.key}
            ref={virtualizer.measureElement}
            data-index={vRow.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${vRow.start}px)`,
            }}
          >
            {/* 4-column grid row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-6 py-2">
              {rows[vRow.index].map(call => (
                <CallCard key={call.id} call={call} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
