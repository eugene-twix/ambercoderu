import { useEffect, useRef, useState } from "react"
import { useAchievements } from "@/lib/useAchievements"
import { useKonamiCode } from "@/lib/useKonamiCode"
import { printConsoleArt } from "@/lib/consoleArt"
import { AnecdoteModal } from "./AnecdoteModal"
import { AmberRain } from "./AmberRain"

export function EasterEggsContainer() {
  const {
    bridges,
    bridgesCount,
    totalBridges,
    anecdoteUnlocked,
    konamiTriggered,
    unlockAnecdote,
    markKonami,
    resetAll,
  } = useAchievements()

  const [anecdoteOpen, setAnecdoteOpen] = useState(false)
  const [rainToken, setRainToken] = useState(0)
  const printedRef = useRef(false)
  const prevCountRef = useRef(bridgesCount)

  // Console art on first mount only
  useEffect(() => {
    if (printedRef.current) return
    printedRef.current = true
    printConsoleArt()
  }, [])

  // Open anecdote modal when all bridges found for the first time
  useEffect(() => {
    const prev = prevCountRef.current
    prevCountRef.current = bridgesCount
    if (bridgesCount === totalBridges && prev < totalBridges) {
      unlockAnecdote()
      setAnecdoteOpen(true)
    }
  }, [bridgesCount, totalBridges, unlockAnecdote])

  // Allow any bridge click after discovery to reopen the modal
  useEffect(() => {
    function onOpen() {
      setAnecdoteOpen(true)
    }
    window.addEventListener("amber:open-anecdote", onOpen)
    return () => window.removeEventListener("amber:open-anecdote", onOpen)
  }, [])

  // Expose a global trigger on window so fans can call amber.tell() in console
  useEffect(() => {
    const api = {
      tell() {
        setAnecdoteOpen(true)
        return "🎈".repeat(10)
      },
      rain() {
        setRainToken((t) => t + 1)
        return "☄️ amber rain ☄️"
      },
      status() {
        return {
          bridges: [...bridges],
          bridgesCount,
          totalBridges,
          anecdoteUnlocked,
          konamiTriggered,
        }
      },
      reset() {
        resetAll()
        return "🧹 cleared"
      },
    }
    ;(window as unknown as { amber: typeof api }).amber = api
    return () => {
      delete (window as unknown as { amber?: typeof api }).amber
    }
  }, [bridges, bridgesCount, totalBridges, anecdoteUnlocked, konamiTriggered, resetAll])

  useKonamiCode(() => {
    markKonami()
    setRainToken((t) => t + 1)
  })

  return (
    <>
      <AnecdoteModal open={anecdoteOpen} onClose={() => setAnecdoteOpen(false)} />
      {rainToken > 0 && <AmberRain key={rainToken} trigger={rainToken} />}
      {/* Hint when user unlocked once: let them reopen via keyboard `?` */}
      {anecdoteUnlocked && !anecdoteOpen && (
        <HiddenReplayTrigger onActivate={() => setAnecdoteOpen(true)} />
      )}
    </>
  )
}

function HiddenReplayTrigger({ onActivate }: { onActivate: () => void }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // Shift + ? opens the anecdote again
      if (e.shiftKey && e.key === "?") onActivate()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onActivate])
  return null
}
