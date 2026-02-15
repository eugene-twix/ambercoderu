import { Sun, Moon } from "lucide-react"
import { useTheme } from "./ThemeProvider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="relative flex items-center w-14 h-7 rounded-full bg-muted border border-border transition-colors duration-300 cursor-pointer"
    >
      <span
        className="absolute top-0.5 left-0.5 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground shadow transition-transform duration-300"
        style={{ transform: isDark ? "translateX(0)" : "translateX(1.75rem)" }}
      >
        {isDark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
      </span>
    </button>
  )
}
