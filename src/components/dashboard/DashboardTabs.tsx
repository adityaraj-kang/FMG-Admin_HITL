'use client'

import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

type TabId = 'all' | 'attention' | 'mine'

interface DashboardTabsProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
  allCount: number
  attentionCount: number
  myQueueCount: number
}

export function DashboardTabs({
  activeTab,
  onTabChange,
  allCount,
  attentionCount,
  myQueueCount,
}: DashboardTabsProps) {
  const tabs: { id: TabId; label: string; count: number; urgent?: boolean }[] = [
    { id: 'all', label: 'All Active Calls', count: allCount },
    { id: 'attention', label: 'Needs Attention', count: attentionCount, urgent: true },
    { id: 'mine', label: 'My Queue', count: myQueueCount },
  ]

  return (
    <div className="flex items-center gap-0 border-b border-[var(--border-subtle)] px-6 bg-bg-surface">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'relative flex items-center gap-2 px-4 py-4',
            'font-body text-sm font-medium',
            'transition-colors duration-fast',
            'focus-visible:outline-none',
            activeTab === tab.id
              ? 'text-[var(--text-primary)]'
              : 'text-[var(--text-muted)] hover:text-[var(--text-body)]'
          )}
        >
          {tab.label}

          {/* Count badge */}
          <span className={cn(
            'inline-flex items-center justify-center',
            'min-w-[20px] h-5 px-1.5 rounded-full',
            'font-mono text-[10px] font-medium',
            activeTab === tab.id && tab.urgent
              ? 'bg-status-error text-white'
              : activeTab === tab.id
              ? 'bg-bg-input text-[var(--text-body)]'
              : tab.urgent && tab.count > 0
              ? 'bg-[rgba(255,77,0,0.12)] text-[var(--primary-main)]'
              : 'bg-bg-input text-[var(--text-muted)]'
          )}>
            {tab.count}
          </span>

          {/* Active underline indicator */}
          {activeTab === tab.id && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary-main)]"
              transition={{ duration: 0.2, ease: [0.2, 0, 0.38, 0.9] }}
            />
          )}
        </button>
      ))}
    </div>
  )
}
