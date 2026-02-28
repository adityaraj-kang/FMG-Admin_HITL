import { useState, useEffect } from 'react'
import { useInterval } from './useInterval'

/**
 * Returns a live-updating duration string (MM:SS or HH:MM:SS)
 * computed from startTime (ISO string) to now, updating every second.
 * Initializes to '' on the server to avoid SSR/CSR hydration mismatch.
 */
export function useLiveTimer(startTime: string): string {
  const [duration, setDuration] = useState('')

  // Set initial value after mount (client-only) to match hydration
  useEffect(() => {
    setDuration(formatDuration(startTime))
  }, [startTime])

  useInterval(() => {
    setDuration(formatDuration(startTime))
  }, 1000)

  return duration
}

function formatDuration(startTime: string): string {
  const diff = Math.floor((Date.now() - new Date(startTime).getTime()) / 1000)
  const hours = Math.floor(diff / 3600)
  const minutes = Math.floor((diff % 3600) / 60)
  const seconds = diff % 60

  const mm = String(minutes).padStart(2, '0')
  const ss = String(seconds).padStart(2, '0')

  if (hours > 0) {
    const hh = String(hours).padStart(2, '0')
    return `${hh}:${mm}:${ss}`
  }
  return `${mm}:${ss}`
}
