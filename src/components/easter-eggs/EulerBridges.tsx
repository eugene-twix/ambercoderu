import { useEffect, useRef } from "react"
import { TOTAL_BRIDGES, useAchievements } from "@/lib/useAchievements"

interface BridgePosition {
  id: string
  top: string
  left?: string
  right?: string
}

const POSITIONS: BridgePosition[] = [
  { id: "bridge-1", top: "3%", right: "4%" },
  { id: "bridge-2", top: "16%", left: "4%" },
  { id: "bridge-3", top: "30%", right: "5%" },
  { id: "bridge-4", top: "44%", left: "5%" },
  { id: "bridge-5", top: "58%", right: "4%" },
  { id: "bridge-6", top: "72%", left: "6%" },
  { id: "bridge-7", top: "88%", right: "5%" },
]

export function EulerBridges() {
  const { bridges, findBridge } = useAchievements()
  if (POSITIONS.length !== TOTAL_BRIDGES) {
    console.warn("EulerBridges: positions count mismatch with TOTAL_BRIDGES")
  }

  function handleClick(id: string) {
    const alreadyFound = bridges.has(id)
    findBridge(id)
    if (alreadyFound && bridges.size === TOTAL_BRIDGES) {
      window.dispatchEvent(new CustomEvent("amber:open-anecdote"))
    }
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {POSITIONS.map((pos) => (
        <BridgePoint
          key={pos.id}
          position={pos}
          found={bridges.has(pos.id)}
          onClick={() => handleClick(pos.id)}
        />
      ))}
    </div>
  )
}

function BridgePoint({
  position,
  found,
  onClick,
}: {
  position: BridgePosition
  found: boolean
  onClick: () => void
}) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!found) return
    const el = buttonRef.current
    if (!el) return
    el.classList.add("amber-bridge-pulse")
    const t = window.setTimeout(() => el.classList.remove("amber-bridge-pulse"), 900)
    return () => window.clearTimeout(t)
  }, [found])

  const style: React.CSSProperties = {
    top: position.top,
    left: position.left,
    right: position.right,
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      aria-label="Мост Кёнигсберга"
      title="Мост"
      className={`pointer-events-auto absolute h-2.5 w-2.5 rounded-full bg-primary transition-all duration-200 hover:scale-[2.2] hover:opacity-100 hover:shadow-[0_0_12px_3px_rgba(245,158,11,0.8)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 ${
        found ? "opacity-[0.12]" : "opacity-[0.18]"
      }`}
      style={style}
    />
  )
}
