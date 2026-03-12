import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { Sparkles, ChevronDown } from "lucide-react"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { conferences } from "@/data/conferences"

export function Header() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <header className="sticky top-0 z-20 backdrop-blur-sm bg-background/80 border-b border-border">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <Sparkles className="h-5 w-5 text-primary" />
            <span
              className="text-sm text-primary tracking-wider"
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            >
              Amber Code
            </span>
          </Link>
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Конференции
              <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
              <div className="absolute top-full left-0 mt-2 min-w-48 rounded-md border border-border bg-card shadow-lg py-1">
                {conferences.map((conf) => (
                  <Link
                    key={conf.slug}
                    to={`/${conf.slug}`}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    <span>{conf.title}</span>
                    <span className="block text-xs text-muted-foreground">{conf.date}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
