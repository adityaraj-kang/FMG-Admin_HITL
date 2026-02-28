import { cn } from '@/utils/cn'
import type { CallStatus } from '@/lib/mockData'

interface StatusBadgeProps {
  status: CallStatus
  className?: string
}

const statusConfig: Record<CallStatus, { label: string; classes: string }> = {
  'Active': {
    label: 'Active',
    classes: 'bg-status-info text-white',
  },
  'Escalated': {
    label: 'Escalated',
    classes: 'bg-status-warning text-black',
  },
  'Attention Needed': {
    label: 'Attention',
    classes: 'bg-status-error text-white',
  },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full',
        'font-mono text-[10px] font-medium uppercase tracking-wider',
        config.classes,
        className
      )}
    >
      {config.label}
    </span>
  )
}
