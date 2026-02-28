'use client'

import { useAutoScroll } from '@/hooks/useAutoScroll'
import { cn } from '@/utils/cn'
import type { TranscriptEntry } from '@/lib/mockData'

function formatTime(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}

interface TranscriptPanelProps {
  transcript: TranscriptEntry[]
}

export function TranscriptPanel({ transcript }: TranscriptPanelProps) {
  const scrollRef = useAutoScroll<HTMLDivElement>(transcript.length)

  return (
    <div className="flex flex-col h-full">
      {/* Panel header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle">
        <h3 className="font-mono text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
          Live Transcript
        </h3>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse" />
          <span className="font-mono text-[10px] text-[var(--text-muted)]">
            {transcript.length} exchanges
          </span>
        </div>
      </div>

      {/* Transcript scroll area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0"
        style={{ maxHeight: '480px' }}
      >
        {transcript.length === 0 ? (
          <div className="flex items-center justify-center h-32">
            <p className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider">
              Awaiting transcript…
            </p>
          </div>
        ) : (
          transcript.map(entry => (
            <div
              key={entry.id}
              className={cn(
                'flex gap-3',
                entry.speaker === 'Agent' ? 'flex-row' : 'flex-row-reverse'
              )}
            >
              {/* Speaker indicator */}
              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                <div className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center',
                  'font-mono text-[8px] font-bold',
                  entry.speaker === 'Agent'
                    ? 'bg-[rgba(255,77,0,0.15)] text-[var(--primary-main)]'
                    : 'bg-[rgba(46,147,250,0.15)] text-[var(--status-info)]'
                )}>
                  {entry.speaker === 'Agent' ? 'AI' : 'V'}
                </div>
              </div>

              {/* Message bubble */}
              <div className={cn(
                'flex flex-col max-w-[80%]',
                entry.speaker === 'Agent' ? 'items-start' : 'items-end'
              )}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn(
                    'font-mono text-[10px] font-semibold uppercase tracking-wider',
                    entry.speaker === 'Agent'
                      ? 'text-[var(--primary-main)]'
                      : 'text-[var(--status-info)]'
                  )}>
                    {entry.speaker === 'Agent' ? 'Genie Agent' : 'Vendor'}
                  </span>
                  <span className="font-mono text-[9px] text-[var(--text-muted)]" suppressHydrationWarning>
                    {formatTime(entry.timestamp)}
                  </span>
                </div>
                <div className={cn(
                  'px-3 py-2.5 rounded-sm text-sm leading-relaxed',
                  entry.speaker === 'Agent'
                    ? 'bg-bg-input text-[var(--text-body)]'
                    : 'bg-[rgba(46,147,250,0.08)] text-[var(--text-body)] border border-[rgba(46,147,250,0.15)]'
                )}>
                  {entry.text}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
