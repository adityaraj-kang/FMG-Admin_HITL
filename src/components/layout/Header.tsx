'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { AgentAvatar } from '@/components/auth/AgentAvatar'
import { useAuth } from '@/context/AuthContext'

export function Header() {
  const { agent, logout } = useAuth()

  return (
    <header
      className="
        sticky top-0 z-[500]
        h-16
        flex items-center justify-between
        px-6
        bg-bg-surface
        border-b border-border-subtle
      "
    >
      {/* Logo + brand */}
      <Link
        href="/"
        className="flex items-center gap-2 no-underline group"
      >
        <div className="flex items-center gap-1">
          <Image
            src="/fmg-logo.png"
            alt="Find My Genie"
            width={0}
            height={32}
            sizes="auto"
            style={{ width: 'auto', height: '32px' }}
            className="logo-img logo-pulse"
            priority
          />
        </div>
        <span className="hidden sm:block text-border-strong text-sm select-none">
          /
        </span>
        <span className="hidden sm:block font-mono text-xs text-text-muted tracking-widest uppercase">
          HITL Admin
        </span>
      </Link>

      {/* Center label (desktop only) */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
        <span className="font-mono text-xs text-text-muted tracking-[0.2em] uppercase">
          Human-in-the-Loop Portal
        </span>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* Live indicator */}
        <div className="hidden sm:flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
          <span className="font-mono text-xs text-text-muted">LIVE</span>
        </div>

        <div className="w-px h-4 bg-border-subtle" aria-hidden="true" />

        <ThemeToggle />

        {/* Agent user badge + Logout button */}
        {agent !== null && (
          <>
            <div className="hidden md:flex items-center gap-2">
              <AgentAvatar agent={agent} size="sm" />
              <div className="flex flex-col">
                <span style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-primary)',
                }}>
                  {agent.name}
                </span>
                <span style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: 9,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-muted)',
                }}>
                  {agent.role}
                </span>
              </div>
            </div>
            <button
              onClick={logout}
              title="Sign out"
              aria-label="Sign out"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '4px',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--status-error)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
                <path d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z" />
              </svg>
            </button>
          </>
        )}
      </div>
    </header>
  )
}
