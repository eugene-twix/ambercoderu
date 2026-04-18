import { useEffect, useRef } from "react"

// Use physical key codes so the sequence works regardless of keyboard layout (RU/EN).
const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
] as const

export function useKonamiCode(onTrigger: () => void): void {
  const positionRef = useRef(0)
  const handlerRef = useRef(onTrigger)

  useEffect(() => {
    handlerRef.current = onTrigger
  }, [onTrigger])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const expected = SEQUENCE[positionRef.current]
      if (e.code === expected) {
        positionRef.current += 1
        if (positionRef.current === SEQUENCE.length) {
          positionRef.current = 0
          handlerRef.current()
        }
      } else {
        positionRef.current = e.code === SEQUENCE[0] ? 1 : 0
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])
}
