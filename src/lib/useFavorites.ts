import { useCallback, useEffect, useState } from "react"

const STORAGE_KEY = "ambercode-favorites-v1"

export interface FavoriteKey {
  conferenceSlug: string
  trackIndex: number
  scheduleIndex: number
}

function keyToString(key: FavoriteKey): string {
  return `${key.conferenceSlug}::${key.trackIndex}::${key.scheduleIndex}`
}

function readStorage(): Set<string> {
  if (typeof window === "undefined") return new Set()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return new Set()
    return new Set(parsed.filter((x): x is string => typeof x === "string"))
  } catch {
    return new Set()
  }
}

function writeStorage(set: Set<string>): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]))
  } catch {
    /* ignore quota / access errors */
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(() => readStorage())

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) setFavorites(readStorage())
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const toggle = useCallback((key: FavoriteKey) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      const k = keyToString(key)
      if (next.has(k)) next.delete(k)
      else next.add(k)
      writeStorage(next)
      return next
    })
  }, [])

  const has = useCallback(
    (key: FavoriteKey) => favorites.has(keyToString(key)),
    [favorites],
  )

  const clear = useCallback(() => {
    writeStorage(new Set())
    setFavorites(new Set())
  }, [])

  return { favorites, toggle, has, clear, count: favorites.size }
}

export function parseFavoriteKey(raw: string): FavoriteKey | null {
  const [conferenceSlug, trackIdx, schedIdx] = raw.split("::")
  if (!conferenceSlug || trackIdx == null || schedIdx == null) return null
  const trackIndex = Number(trackIdx)
  const scheduleIndex = Number(schedIdx)
  if (Number.isNaN(trackIndex) || Number.isNaN(scheduleIndex)) return null
  return { conferenceSlug, trackIndex, scheduleIndex }
}
