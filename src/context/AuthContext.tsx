'use client'

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'
import { Agent, MOCK_AGENTS } from '@/lib/mockAgents'

interface AuthContextValue {
  agent: Agent | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [agent, setAgent] = useState<Agent | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('fmg-agent')
      if (stored) {
        const parsed = JSON.parse(stored) as Agent
        const valid = MOCK_AGENTS.find(a => a.id === parsed.id)
        if (valid) {
          // Strip password before storing in React state
          const { password: _pwd, ...safeValid } = valid
          setAgent(safeValid as Agent)
        }
      }
    } catch {
      // parse failed — leave agent as null
    }
    setMounted(true)
  }, [])

  const login = useCallback(async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    await new Promise(r => setTimeout(r, 800))

    const found = MOCK_AGENTS.find(
      a => a.email.toLowerCase() === email.toLowerCase() && a.password === password
    )

    if (found) {
      const { password: _password, ...safeAgent } = found
      localStorage.setItem('fmg-agent', JSON.stringify(safeAgent))
      setAgent(safeAgent as Agent)   // password stripped — never reaches React context
      return { success: true }
    }

    return { success: false, error: 'Invalid email or password' }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('fmg-agent')
    setAgent(null)
  }, [])

  if (!mounted) return null

  return (
    <AuthContext.Provider value={{ agent, isAuthenticated: agent !== null, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (ctx === null) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}
