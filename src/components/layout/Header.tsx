import { Link } from "react-router-dom"
import { Sparkles } from "lucide-react"
import { ThemeToggle } from "@/components/theme/ThemeToggle"

export function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-sm bg-background/80 border-b border-border">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <Sparkles className="h-5 w-5 text-primary" />
          <span
            className="text-sm text-primary tracking-wider"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            Amber Code
          </span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}
