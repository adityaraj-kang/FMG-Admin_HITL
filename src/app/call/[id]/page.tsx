'use client'

import { useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from '@phosphor-icons/react'
import { Header } from '@/components/layout/Header'
import { QuerySummaryBanner } from '@/components/call-detail/QuerySummaryBanner'
import { EscalationBanner } from '@/components/call-detail/EscalationBanner'
import { TranscriptPanel } from '@/components/call-detail/TranscriptPanel'
import { TakeOverButton } from '@/components/call-detail/TakeOverButton'
import { PricingForm } from '@/components/call-detail/PricingForm'
import { getCallById } from '@/lib/mockData'

export default function CallDetailPage() {
  const params = useParams()
  const callId = typeof params.id === 'string' ? params.id : (params.id?.[0] ?? '')
  const call = getCallById(callId)

  const [hasTakenOver, setHasTakenOver] = useState(false)

  if (!call) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-bg-default">
      <Header />

      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb nav */}
        <div className="px-6 py-3 flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-body)] transition-colors"
          >
            <ArrowLeft size={12} />
            Operations Center
          </Link>
          <span className="font-mono text-xs text-[var(--border-strong)]">/</span>
          <span className="font-mono text-xs text-[var(--text-body)]">
            {call.userName}
          </span>
        </div>

        {/* Pinned query summary */}
        <QuerySummaryBanner call={call} />

        {/* Escalation banner */}
        {call.escalationReason && (
          <EscalationBanner reason={call.escalationReason} />
        )}

        {/* Main content: transcript + action panel */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-0">
          {/* Left: Transcript */}
          <div className="border-r border-border-subtle bg-bg-surface">
            <TranscriptPanel transcript={call.transcript} />
          </div>

          {/* Right: Take over + Pricing */}
          <div className="bg-bg-surface">
            {/* Take over section */}
            <div className="border-b border-border-subtle">
              <TakeOverButton
                onTakeOver={() => setHasTakenOver(true)}
                isActive={hasTakenOver}
              />
            </div>

            {/* Pricing form — always visible, highlighted after takeover */}
            <div className={hasTakenOver ? 'ring-1 ring-[var(--primary-main)] ring-inset' : ''}>
              <PricingForm callId={call.id} />
            </div>
          </div>
        </div>

        {/* Call meta footer */}
        <div className="px-6 py-4 border-t border-border-subtle flex flex-wrap gap-6">
          <div>
            <p className="font-mono text-[9px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Call ID</p>
            <p className="font-mono text-xs text-[var(--text-body)]">{call.id}</p>
          </div>
          <div>
            <p className="font-mono text-[9px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Vendor Phone</p>
            <p className="font-mono text-xs text-[var(--text-body)]">{call.vendorPhone}</p>
          </div>
          <div>
            <p className="font-mono text-[9px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5">User Phone</p>
            <p className="font-mono text-xs text-[var(--text-body)]">{call.userPhone}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
