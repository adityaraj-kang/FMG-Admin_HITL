'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Car, Wrench, Wind, Lightning, Key,
  MapPin, Clock
} from '@phosphor-icons/react'
import { cn } from '@/utils/cn'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { useLiveTimer } from '@/hooks/useLiveTimer'
import type { CallRecord, ServiceType, UrgencyLevel } from '@/lib/mockData'
import { AgentAvatar } from '@/components/auth/AgentAvatar'
import { useAuth } from '@/context/AuthContext'
import { MOCK_AGENTS } from '@/lib/mockAgents'

const serviceIconMap: Record<ServiceType, React.ElementType> = {
  Towing: Car,
  Plumbing: Wrench,
  HVAC: Wind,
  Electrical: Lightning,
  Locksmith: Key,
}

const urgencyDot: Record<UrgencyLevel, string> = {
  Critical: 'bg-status-error',
  High: 'bg-status-warning',
  Medium: 'bg-status-info',
  Low: 'bg-[var(--text-muted)]',
}

interface CallCardProps {
  call: CallRecord
}

export function CallCard({ call }: CallCardProps) {
  const router = useRouter()
  const duration = useLiveTimer(call.startTime)
  const ServiceIcon = serviceIconMap[call.serviceType]
  const isUrgent = call.status === 'Attention Needed' || call.status === 'Escalated'
  const { agent: currentAgent } = useAuth()
  const assignedAgent = call.assignedAgentId
    ? (MOCK_AGENTS.find(a => a.id === call.assignedAgentId) ?? null)
    : null

  return (
    <motion.div
      onClick={() => router.push(`/call/${call.id}`)}
      whileHover={{ y: -2, transition: { duration: 0.15, ease: [0.2, 0, 0.38, 0.9] } }}
      whileTap={{ scale: 0.98, transition: { duration: 0.1, ease: [0.2, 0, 0.38, 0.9] } }}
      className={cn(
        'relative cursor-pointer rounded-md p-5',
        'bg-bg-surface border',
        'transition-all duration-fast',
        'card-glow-hover',
        isUrgent
          ? 'border-[var(--status-warning)] border-l-4 border-l-[var(--status-warning)]'
          : 'border-border-subtle hover:border-border-strong'
      )}
    >
      {/* Top row: service icon + status badge */}
      <div className="flex items-start justify-between mb-3">
        <div className={cn(
          'flex items-center justify-center w-9 h-9 rounded-sm',
          isUrgent ? 'bg-[rgba(255,77,0,0.1)]' : 'bg-bg-input',
        )}>
          <ServiceIcon
            size={20}
            weight="regular"
            className={isUrgent ? 'text-[var(--primary-main)]' : 'text-[var(--text-body)]'}
          />
        </div>
        <StatusBadge status={call.status} />
      </div>

      {/* User name + service type */}
      <div className="mb-1">
        <h3 className="font-headline text-base font-semibold text-[var(--text-primary)] leading-tight">
          {call.userName}
        </h3>
        <p className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider mt-0.5">
          {call.serviceType}
        </p>
      </div>

      {/* Vendor name */}
      <p className="text-sm text-[var(--text-body)] mb-3 truncate">
        {call.vendorName}
      </p>

      {/* Location */}
      <div className="flex items-start gap-1.5 mb-3">
        <MapPin size={12} className="text-[var(--text-muted)] mt-0.5 flex-shrink-0" />
        <p className="font-mono text-xs text-[var(--text-muted)] leading-tight line-clamp-1">
          {call.location}
        </p>
      </div>

      {/* Urgency + Timer row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className={cn('w-1.5 h-1.5 rounded-full', urgencyDot[call.urgencyLevel])} />
          <span className="font-mono text-xs text-[var(--text-muted)]">
            {call.urgencyLevel}
          </span>
        </div>

        <div className={cn(
          'flex items-center gap-1.5',
          isUrgent ? 'text-[var(--status-warning)]' : 'text-[var(--text-muted)]'
        )}>
          <Clock size={12} />
          <span className={cn(
            'font-mono text-xs tabular-nums',
            isUrgent && 'font-semibold animate-timer-tick'
          )}>
            {duration}
          </span>
        </div>
      </div>

      {/* Escalation reason chip (if flagged) */}
      {call.escalationReason && (
        <div className="mt-3 pt-3 border-t border-[var(--border-subtle)]">
          <span className={cn(
            'inline-flex items-center gap-1 px-2 py-1 rounded-xs',
            'font-mono text-[10px] uppercase tracking-wider',
            'bg-[rgba(255,77,0,0.08)] text-[var(--primary-main)] border border-[rgba(255,77,0,0.2)]'
          )}>
            ⚑ {call.escalationReason}
          </span>
        </div>
      )}

      {/* Assignee Row */}
      {currentAgent && (
        <div className="border-t border-[var(--border-subtle)] pt-2 mt-2">
          {call.assignedAgentId === currentAgent.id ? (
            // State 1: MY CALL
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--primary-main)]">
              ★ MY CALL
            </span>
          ) : assignedAgent ? (
            // State 2: Assigned to another agent
            <div className="flex items-center gap-1.5">
              <AgentAvatar agent={assignedAgent} size="sm" />
              <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-[var(--text-muted)] truncate">
                {assignedAgent.name}
              </span>
            </div>
          ) : (
            // State 3: Unassigned
            <span className={cn(
              'inline-flex items-center gap-1 px-1.5 py-0.5 rounded',
              'font-mono text-[10px] uppercase tracking-[0.06em] font-semibold',
              'bg-[rgba(255,77,0,0.1)] text-[var(--primary-main)] border border-[rgba(255,77,0,0.3)]'
            )}>
              ⚡ Unassigned
            </span>
          )}
        </div>
      )}
    </motion.div>
  )
}
