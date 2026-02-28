'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { DashboardTabs } from '@/components/dashboard/DashboardTabs'
import { CallCardGrid } from '@/components/dashboard/CallCardGrid'
import { CallCard } from '@/components/dashboard/CallCard'
import { mockCalls } from '@/lib/mockData'

type TabId = 'all' | 'attention' | 'mine'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabId>('all')

  const attentionCalls = mockCalls.filter(
    c => c.status === 'Attention Needed' || c.status === 'Escalated'
  )

  // TODO (Task 13): filter by 'mine' using getMyQueueCalls(agent.id) when activeTab === 'mine'
  const displayedCalls = activeTab === 'attention' ? attentionCalls : mockCalls

  return (
    <div className="min-h-screen bg-bg-default">
      <Header />

      {/* Page header */}
      <div className="px-6 pt-6 pb-0">
        <h1 className="font-headline text-2xl font-semibold text-[var(--text-primary)] mb-1">
          Operations Center
        </h1>
        <p className="font-mono text-xs text-[var(--text-muted)] tracking-wider uppercase">
          {mockCalls.length} active calls · {attentionCalls.length} need attention
        </p>
      </div>

      {/* Tabs */}
      <div className="mt-6">
        <DashboardTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          allCount={mockCalls.length}
          attentionCount={attentionCalls.length}
          myQueueCount={0}
        />
      </div>

      {/* Card grid */}
      <CallCardGrid empty={displayedCalls.length === 0}>
        {displayedCalls.map(call => (
          <CallCard key={call.id} call={call} />
        ))}
      </CallCardGrid>
    </div>
  )
}
