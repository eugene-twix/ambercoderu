import { createContext, useCallback, useContext, useRef, useState } from "react"
import type { ReactNode } from "react"
import { Check, X } from "lucide-react"

interface ToastItem {
  id: number
  message: string
  tone: "default" | "success" | "error"
}

interface ToastCtx {
  show: (message: string, tone?: ToastItem["tone"]) => void
}

const Ctx = createContext<ToastCtx | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])
  const counter = useRef(0)

  const show = useCallback<ToastCtx["show"]>((message, tone = "default") => {
    counter.current += 1
    const id = counter.current
    setItems((prev) => [...prev, { id, message, tone }])
    window.setTimeout(() => {
      setItems((prev) => prev.filter((i) => i.id !== id))
    }, 2500)
  }, [])

  return (
    <Ctx.Provider value={{ show }}>
      {children}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none">
        {items.map((i) => (
          <Toast key={i.id} item={i} />
        ))}
      </div>
    </Ctx.Provider>
  )
}

function Toast({ item }: { item: ToastItem }) {
  const toneCls =
    item.tone === "success"
      ? "border-emerald-500/40 text-emerald-400"
      : item.tone === "error"
        ? "border-red-500/40 text-red-400"
        : "border-primary/30 text-foreground"
  const Icon = item.tone === "error" ? X : Check
  return (
    <div
      className={`animate-scale-in pointer-events-auto flex items-center gap-2 rounded-full border ${toneCls} bg-card/95 backdrop-blur px-4 py-2 text-sm shadow-lg`}
    >
      <Icon className="h-4 w-4" />
      <span>{item.message}</span>
    </div>
  )
}

export function useToast() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useToast must be used within ToastProvider")
  return ctx
}

export function useToastOptional() {
  return useContext(Ctx)
}
