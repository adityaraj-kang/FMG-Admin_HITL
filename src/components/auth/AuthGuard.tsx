'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    if (!isAuthenticated && pathname !== '/login') {
      router.push('/login')
    } else if (isAuthenticated && pathname === '/login') {
      router.push('/')
    }
  }, [mounted, isAuthenticated, pathname, router])

  // Before mount, render nothing to avoid flash of wrong content
  if (!mounted) return null

  // While a redirect is pending, render nothing
  if (!isAuthenticated && pathname !== '/login') return null
  if (isAuthenticated && pathname === '/login') return null

  return <>{children}</>
}
