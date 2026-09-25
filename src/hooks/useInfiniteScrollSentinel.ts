import { useCallback, useRef } from 'react'

// Returns a ref callback to attach to the last item in a list; fires
// `onIntersect` once when that item scrolls into view, so callers can load
// the next page. Disconnects and re-observes as the list grows.
export function useInfiniteScrollSentinel(onIntersect: () => void, enabled: boolean) {
  const observerRef = useRef<IntersectionObserver | null>(null)

  return useCallback(
    (node: Element | null) => {
      if (observerRef.current) observerRef.current.disconnect()
      if (!node || !enabled) return

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting) onIntersect()
      })
      observerRef.current.observe(node)
    },
    [onIntersect, enabled],
  )
}
