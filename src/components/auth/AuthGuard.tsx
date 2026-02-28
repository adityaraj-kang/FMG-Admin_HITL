'use client'

import React, { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export function AuthGuard({ children }: { children: React.ReactNode }): React.ReactElement | null {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isAuthenticated && pathname !== '/login') {
      router.push('/login')
    } else if (isAuthenticated && pathname === '/login') {
      router.push('/')
    }
  }, [isAuthenticated, pathname, router])

  const isRedirecting =
    (!isAuthenticated && pathname !== '/login') ||
    (isAuthenticated && pathname === '/login')

  if (isRedirecting) return null
  return <>{children}</>
}
