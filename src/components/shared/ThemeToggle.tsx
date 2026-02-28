'use client'

import { Sun, Moon } from '@phosphor-icons/react'
import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/utils/cn'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'flex items-center justify-center w-9 h-9 rounded-sm',
        'text-text-muted hover:text-primary hover:bg-primary-dim',
        'transition-all duration-fast ease-mechanical',
        'focus-visible:outline-2 focus-visible:outline-primary'
      )}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun size={20} weight="regular" />
      ) : (
        <Moon size={20} weight="regular" />
      )}
    </button>
  )
}
