import { Sun, Moon } from "lucide-react"
import { useTheme } from "./ThemeProvider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Переключить на светлую тему" : "Переключить на тёмную тему"}
      className="relative flex items-center w-14 h-7 rounded-full bg-muted border border-border transition-colors duration-300 cursor-pointer overflow-hidden"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-between px-1.5 text-muted-foreground/60"
      >
        <Sun className="h-3 w-3" />
        <Moon className="h-3 w-3" />
      </span>
      <span
        className="absolute top-0.5 left-0.5 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground shadow transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
        style={{ transform: isDark ? "translateX(0)" : "translateX(1.75rem)" }}
      >
        {isDark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
      </span>
    </button>
  )
}
