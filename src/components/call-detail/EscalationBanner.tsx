import { Warning } from '@phosphor-icons/react'
import type { EscalationReason } from '@/lib/mockData'

const reasonDescriptions: Record<EscalationReason, string> = {
  'Time exceeded':    'This call has exceeded the 5-minute threshold. Human takeover recommended.',
  'Agent escalated':  'The AI agent has flagged this call as beyond its handling capability.',
  'Vendor requested': 'The vendor has requested to speak with a human representative.',
}

interface EscalationBannerProps {
  reason: EscalationReason
}

export function EscalationBanner({ reason }: EscalationBannerProps) {
  return (
    <div className="flex items-start gap-3 px-6 py-4 bg-[rgba(255,77,0,0.06)] border-b border-[rgba(255,77,0,0.2)]">
      <Warning
        size={18}
        weight="fill"
        className="text-[var(--primary-main)] flex-shrink-0 mt-0.5"
      />
      <div>
        <p className="font-mono text-xs font-semibold text-[var(--primary-main)] uppercase tracking-wider mb-0.5">
          Escalation: {reason}
        </p>
        <p className="text-sm text-[var(--text-body)]">
          {reasonDescriptions[reason]}
        </p>
      </div>
    </div>
  )
}
