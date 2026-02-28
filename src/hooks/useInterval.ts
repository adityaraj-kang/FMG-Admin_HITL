import { useEffect, useRef } from 'react'

/**
 * A reliable setInterval hook that avoids stale closures.
 * Based on Dan Abramov's pattern.
 *
 * @param callback - Function to call on each interval tick
 * @param delay - Interval delay in ms. Pass null to pause.
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>(callback)

  // Always keep the ref up to date with the latest callback
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval
  useEffect(() => {
    if (delay === null) return

    const id = setInterval(() => {
      savedCallback.current()
    }, delay)

    return () => clearInterval(id)
  }, [delay])
}
