'use client'

import { useState, useMemo } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Header } from '@/components/layout/Header'
import { DashboardTabs } from '@/components/dashboard/DashboardTabs'
import { FilterToolbar, CallFilters, DEFAULT_FILTERS } from '@/components/dashboard/FilterToolbar'
import { VirtualCallGrid } from '@/components/dashboard/VirtualCallGrid'
import { mockCalls, getAttentionCalls, getMyQueueCalls } from '@/lib/mockData'
import { cn } from '@/utils/cn'

type TabId = 'all' | 'attention' | 'mine'

// ─── StatPill ─────────────────────────────────────────────────────────────────

function StatPill({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className={cn(
        'font-mono text-[11px] font-bold',
        highlight ? 'text-[var(--status-warning)]' : 'text-[var(--text-primary)]'
      )}>
        {value.toLocaleString()}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
        {label}
      </span>
    </div>
  )
}

// ─── DashboardPage ────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { agent } = useAuth()
  const [activeTab, setActiveTab] = useState<TabId>('all')
  const [filters, setFilters] = useState<CallFilters>(DEFAULT_FILTERS)

  // ── Derived data ────────────────────────────────────────────────────────────

  const attentionCalls = useMemo(() => getAttentionCalls(), [])
  const myQueueCalls = useMemo(
    () => (agent ? getMyQueueCalls(agent.id) : []),
    [agent]
  )

  // True when any filter deviates from defaults (search, status, service, or urgency)
  const isFilterActive = useMemo(
    () =>
      filters.search.trim() !== '' ||
      filters.status !== 'all' ||
      filters.service !== 'all' ||
      filters.urgency !== 'all',
    [filters]
  )

  const filteredCalls = useMemo(() => {
    // 1. Start with the right base set based on tab
    let base =
      activeTab === 'attention'
        ? attentionCalls
        : activeTab === 'mine'
        ? myQueueCalls
        : mockCalls

    // 2. Apply search filter (case-insensitive, matches userName, vendorName, location)
    if (filters.search.trim()) {
      const query = filters.search.toLowerCase()
      base = base.filter(
        c =>
          c.userName?.toLowerCase().includes(query) ||
          c.vendorName?.toLowerCase().includes(query) ||
          c.location?.toLowerCase().includes(query)
      )
    }

    // 3. Apply status filter
    if (filters.status !== 'all') {
      base = base.filter(c => c.status === filters.status)
    }

    // 4. Apply service filter
    if (filters.service !== 'all') {
      base = base.filter(c => c.serviceType === filters.service)
    }

    // 5. Apply urgency filter
    if (filters.urgency !== 'all') {
      base = base.filter(c => c.urgencyLevel === filters.urgency)
    }

    return base
  }, [activeTab, filters, attentionCalls, myQueueCalls])

  // ── Layout ──────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-screen bg-bg-default overflow-hidden">
      <Header />

      {/* Flex-none section: tabs + filter toolbar + stats bar */}
      <div className="flex-none">
        {/* Terminal grid background for the whole page */}
        <div className="terminal-grid-bg" />

        {/* Tabs */}
        <DashboardTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          allCount={mockCalls.length}
          attentionCount={attentionCalls.length}
          myQueueCount={myQueueCalls.length}
        />

        {/* Filter toolbar */}
        <FilterToolbar filters={filters} onChange={setFilters} />

        {/* Stats bar */}
        <div className="flex items-center gap-6 px-6 py-2 border-b border-[var(--border-subtle)] bg-bg-surface">
          <StatPill label="Total Active" value={mockCalls.length} />
          <StatPill label="Need Attention" value={attentionCalls.length} highlight={attentionCalls.length > 0} />
          <StatPill label="My Queue" value={myQueueCalls.length} />
          {isFilterActive && (
            <StatPill label="Filtered" value={filteredCalls.length} />
          )}
        </div>
      </div>

      {/* Virtualized call grid — flex-1 so it fills remaining height */}
      <div
        role="tabpanel"
        id="tabpanel-calls"
        aria-labelledby={`tab-${activeTab}`}
        className="flex-1 min-h-0"
      >
        <VirtualCallGrid
          calls={filteredCalls}
          currentAgentId={agent?.id ?? ''}
        />
      </div>
    </div>
  )
}
