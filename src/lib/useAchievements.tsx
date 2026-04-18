import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import type { ReactNode } from "react"

const BRIDGES_KEY = "amber:bridges-found"
const ANECDOTE_KEY = "amber:anecdote-unlocked"
const KONAMI_KEY = "amber:konami-triggered"

export const TOTAL_BRIDGES = 7

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeJSON(key: string, value: unknown): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* ignore quota errors */
  }
}

interface AchievementsApi {
  bridges: Set<string>
  bridgesCount: number
  totalBridges: number
  anecdoteUnlocked: boolean
  konamiTriggered: boolean
  findBridge: (id: string) => void
  unlockAnecdote: () => void
  markKonami: () => void
  resetAll: () => void
}

const Ctx = createContext<AchievementsApi | null>(null)

export function AchievementsProvider({ children }: { children: ReactNode }) {
  const [bridges, setBridges] = useState<Set<string>>(
    () => new Set(readJSON<string[]>(BRIDGES_KEY, [])),
  )
  const [anecdoteUnlocked, setAnecdoteUnlocked] = useState<boolean>(() =>
    readJSON<boolean>(ANECDOTE_KEY, false),
  )
  const [konamiTriggered, setKonamiTriggered] = useState<boolean>(() =>
    readJSON<boolean>(KONAMI_KEY, false),
  )

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === BRIDGES_KEY) {
        setBridges(new Set(readJSON<string[]>(BRIDGES_KEY, [])))
      } else if (e.key === ANECDOTE_KEY) {
        setAnecdoteUnlocked(readJSON<boolean>(ANECDOTE_KEY, false))
      } else if (e.key === KONAMI_KEY) {
        setKonamiTriggered(readJSON<boolean>(KONAMI_KEY, false))
      }
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const findBridge = useCallback((id: string) => {
    setBridges((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      writeJSON(BRIDGES_KEY, [...next])
      return next
    })
  }, [])

  const unlockAnecdote = useCallback(() => {
    setAnecdoteUnlocked(true)
    writeJSON(ANECDOTE_KEY, true)
  }, [])

  const markKonami = useCallback(() => {
    setKonamiTriggered(true)
    writeJSON(KONAMI_KEY, true)
  }, [])

  const resetAll = useCallback(() => {
    writeJSON(BRIDGES_KEY, [])
    writeJSON(ANECDOTE_KEY, false)
    writeJSON(KONAMI_KEY, false)
    setBridges(new Set())
    setAnecdoteUnlocked(false)
    setKonamiTriggered(false)
  }, [])

  const value = useMemo<AchievementsApi>(
    () => ({
      bridges,
      bridgesCount: bridges.size,
      totalBridges: TOTAL_BRIDGES,
      anecdoteUnlocked,
      konamiTriggered,
      findBridge,
      unlockAnecdote,
      markKonami,
      resetAll,
    }),
    [bridges, anecdoteUnlocked, konamiTriggered, findBridge, unlockAnecdote, markKonami, resetAll],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useAchievements(): AchievementsApi {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useAchievements must be used within AchievementsProvider")
  return ctx
}
