import { useEffect, useRef, useState } from "react"

export interface UseInViewOptions extends IntersectionObserverInit {
  once?: boolean
}

export function useInView<T extends HTMLElement>(
  options: UseInViewOptions = {},
) {
  const { once = true, threshold = 0.15, rootMargin, root } = options
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        if (entry.isIntersecting) {
          setInView(true)
          if (once) io.unobserve(el)
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin, root },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [once, threshold, rootMargin, root])

  return { ref, inView }
}
