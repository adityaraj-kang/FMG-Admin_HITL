import { useRef, useEffect } from 'react'

/**
 * Returns a ref to attach to a scrollable container.
 * Scrolls to the bottom whenever `dep` changes (e.g. transcript length).
 */
export function useAutoScroll<T extends HTMLElement>(dep: unknown): React.RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }, [dep])

  return ref
}
