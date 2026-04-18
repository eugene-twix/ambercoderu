import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 600)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Наверх"
      className="fixed bottom-5 right-5 z-30 h-11 w-11 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:scale-110 active:scale-95 transition-transform animate-scale-in flex items-center justify-center cursor-pointer"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  )
}
