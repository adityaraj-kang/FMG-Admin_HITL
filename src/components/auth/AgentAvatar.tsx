'use client'

import type { Agent } from '@/lib/mockAgents'

interface AgentAvatarProps {
  agent: Agent
  size?: 'sm' | 'md'
}

export function AgentAvatar({ agent, size = 'sm' }: AgentAvatarProps) {
  const dimension = size === 'md' ? 36 : 28
  const fontSize = size === 'md' ? 12 : 10

  return (
    <div
      style={{
        width: dimension,
        height: dimension,
        backgroundColor: agent.avatarColor,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,           // prevents squishing in flex containers
      }}
      title={agent.name}         // tooltip shows full name on hover
      aria-label={`${agent.name} avatar`}
    >
      <span
        style={{
          fontSize,
          fontFamily: 'var(--font-jetbrains)',   // JetBrains Mono from layout.tsx
          fontWeight: 700,
          color: '#FFFFFF',
          lineHeight: 1,
          letterSpacing: '0.02em',
          userSelect: 'none',
        }}
      >
        {agent.initials}
      </span>
    </div>
  )
}
