import { ReactNode } from 'react'

interface CallCardGridProps {
  children: ReactNode
  empty?: boolean
}

export function CallCardGrid({ children, empty }: CallCardGridProps) {
  if (empty) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-12 h-12 rounded-md bg-bg-input flex items-center justify-center mb-4">
          <span className="text-2xl">✓</span>
        </div>
        <p className="font-headline text-base font-medium text-[var(--text-primary)] mb-1">
          No calls need attention
        </p>
        <p className="font-mono text-xs text-[var(--text-muted)]">
          All active calls are running smoothly
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
      {children}
    </div>
  )
}
