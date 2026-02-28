import { User, Wrench, MapPin, Lightning } from '@phosphor-icons/react'
import { cn } from '@/utils/cn'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { useLiveTimer } from '@/hooks/useLiveTimer'
import type { CallRecord, UrgencyLevel } from '@/lib/mockData'

const urgencyColors: Record<UrgencyLevel, string> = {
  Critical: 'text-[var(--status-error)] bg-[rgba(255,45,85,0.1)] border-[rgba(255,45,85,0.3)]',
  High:     'text-[var(--status-warning)] bg-[rgba(255,192,67,0.1)] border-[rgba(255,192,67,0.3)]',
  Medium:   'text-[var(--status-info)] bg-[rgba(46,147,250,0.1)] border-[rgba(46,147,250,0.3)]',
  Low:      'text-[var(--text-muted)] bg-bg-input border-border-subtle',
}

interface QuerySummaryBannerProps {
  call: CallRecord
}

export function QuerySummaryBanner({ call }: QuerySummaryBannerProps) {
  const duration = useLiveTimer(call.startTime)

  return (
    <div className="bg-bg-surface border-b border-border-subtle px-6 py-5">
      {/* Top row: user + status + timer */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <User size={16} className="text-[var(--text-muted)]" weight="regular" />
            <h2 className="font-headline text-xl font-semibold text-[var(--text-primary)]">
              {call.userName}
            </h2>
          </div>
          <p className="font-mono text-xs text-[var(--text-muted)] tracking-wider uppercase pl-6">
            {call.userPhone}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-right">
            <p className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Duration</p>
            <p className="font-mono text-lg font-semibold text-[var(--text-primary)] tabular-nums">
              {duration}
            </p>
          </div>
          <StatusBadge status={call.status} />
        </div>
      </div>

      {/* Service description */}
      <div className="mb-4 pl-6">
        <p className="text-sm text-[var(--text-body)] leading-relaxed">
          {call.serviceDescription}
        </p>
      </div>

      {/* Meta grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Service type */}
        <div className="flex items-center gap-2">
          <Wrench size={14} className="text-[var(--text-muted)] flex-shrink-0" />
          <div>
            <p className="font-mono text-[9px] text-[var(--text-muted)] uppercase tracking-wider">Service</p>
            <p className="font-mono text-xs text-[var(--text-primary)] font-medium">{call.serviceType}</p>
          </div>
        </div>

        {/* Vendor */}
        <div className="flex items-center gap-2">
          <User size={14} className="text-[var(--text-muted)] flex-shrink-0" />
          <div>
            <p className="font-mono text-[9px] text-[var(--text-muted)] uppercase tracking-wider">Vendor</p>
            <p className="font-mono text-xs text-[var(--text-primary)] font-medium">{call.vendorName}</p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 col-span-2 md:col-span-1">
          <MapPin size={14} className="text-[var(--text-muted)] flex-shrink-0" />
          <div>
            <p className="font-mono text-[9px] text-[var(--text-muted)] uppercase tracking-wider">Location</p>
            <p className="font-mono text-xs text-[var(--text-primary)] font-medium leading-tight">{call.location}</p>
          </div>
        </div>

        {/* Urgency */}
        <div className="flex items-center gap-2">
          <Lightning size={14} className="text-[var(--text-muted)] flex-shrink-0" weight="fill" />
          <div>
            <p className="font-mono text-[9px] text-[var(--text-muted)] uppercase tracking-wider">Urgency</p>
            <span className={cn(
              'inline-flex items-center px-1.5 py-0.5 rounded-xs border',
              'font-mono text-[10px] font-medium',
              urgencyColors[call.urgencyLevel]
            )}>
              {call.urgencyLevel}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
