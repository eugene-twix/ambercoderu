import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Link, useLocation } from "react-router-dom"
import { Sparkles, ChevronDown, Menu, X, Archive, CalendarDays, Star } from "lucide-react"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { conferences } from "@/data/conferences"
import { groupByStatus } from "@/lib/eventStatus"
import { useFavorites } from "@/lib/useFavorites"
import { useAchievements } from "@/lib/useAchievements"

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const menuRef = useRef<HTMLDivElement>(null)
  const { count: favoritesCount } = useFavorites()
  const { anecdoteUnlocked } = useAchievements()

  const { upcoming, past } = useMemo(() => groupByStatus(conferences), [])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!mobileOpen) return
    const original = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = original
    }
  }, [mobileOpen])

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-background/75 border-b border-border">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 no-underline group">
            <Sparkles className="h-5 w-5 text-primary transition-transform group-hover:rotate-12" />
            <span
              className="text-sm text-primary tracking-wider"
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            >
              Amber Code
            </span>
            {anecdoteUnlocked && (
              <span
                aria-hidden="true"
                title="Ты нашёл все семь мостов Кёнигсберга"
                className="inline-block h-1.5 w-1.5 rounded-full bg-primary/60"
              />
            )}
          </Link>
          <div className="relative hidden md:block" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Конференции
              <ChevronDown
                className={`h-4 w-4 transition-transform ${menuOpen ? "rotate-180" : ""}`}
              />
            </button>
            {menuOpen && (
              <div className="absolute top-full left-0 mt-2 min-w-64 rounded-lg border border-border bg-card/95 backdrop-blur shadow-xl overflow-hidden animate-scale-in origin-top-left">
                {upcoming.length > 0 && (
                  <MenuSection
                    label="Предстоящие"
                    icon={<CalendarDays className="h-3 w-3" />}
                    items={upcoming}
                    accent
                  />
                )}
                {past.length > 0 && (
                  <MenuSection
                    label="Архив"
                    icon={<Archive className="h-3 w-3" />}
                    items={past}
                    extraLink={
                      <Link
                        to="/archive"
                        className="block px-4 py-2 text-xs font-medium text-primary hover:bg-primary/10"
                      >
                        Смотреть весь архив →
                      </Link>
                    }
                  />
                )}
              </div>
            )}
          </div>
          <Link
            to="/favorites"
            className="hidden md:flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Star className={`h-4 w-4 ${favoritesCount > 0 ? "fill-primary text-primary" : ""}`} />
            <span>Моя программа</span>
            {favoritesCount > 0 && (
              <span className="ml-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-semibold px-1">
                {favoritesCount}
              </span>
            )}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden flex items-center justify-center h-9 w-9 rounded-md text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
            aria-label="Меню"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {mobileOpen && createPortal(
        <div className="md:hidden fixed inset-0 z-50 bg-background animate-fade-in">
          <div className="flex items-center justify-between h-14 px-4 border-b border-border">
            <span
              className="text-sm text-primary tracking-wider"
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            >
              Меню
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center h-9 w-9 rounded-md text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
              aria-label="Закрыть меню"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="px-4 py-6 flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-3.5rem)]">
            <Link
              to="/favorites"
              className="flex items-center gap-2 rounded-lg border border-border bg-card p-3"
            >
              <Star className={`h-4 w-4 ${favoritesCount > 0 ? "fill-primary text-primary" : "text-muted-foreground"}`} />
              <span className="text-sm font-medium text-foreground">
                Моя программа
              </span>
              {favoritesCount > 0 && (
                <span className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-semibold px-1.5">
                  {favoritesCount}
                </span>
              )}
            </Link>
            {upcoming.length > 0 && (
              <div>
                <p className="flex items-center gap-1.5 px-1 mb-2 text-[10px] font-semibold uppercase tracking-wider text-primary">
                  <CalendarDays className="h-3 w-3" /> Предстоящие
                </p>
                <div className="flex flex-col gap-2">
                  {upcoming.map((c) => (
                    <Link
                      key={c.slug}
                      to={`/${c.slug}`}
                      className="rounded-lg border border-border bg-card p-3"
                    >
                      <p className="text-sm font-medium text-foreground">{c.title}</p>
                      <p className="text-xs text-muted-foreground">{c.date}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {past.length > 0 && (
              <div>
                <p className="flex items-center gap-1.5 px-1 mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <Archive className="h-3 w-3" /> Архив
                </p>
                <div className="flex flex-col gap-2">
                  {past.slice(0, 5).map((c) => (
                    <Link
                      key={c.slug}
                      to={`/${c.slug}`}
                      className="rounded-lg border border-border bg-card p-3"
                    >
                      <p className="text-sm font-medium text-foreground">{c.title}</p>
                      <p className="text-xs text-muted-foreground">{c.date}</p>
                    </Link>
                  ))}
                  <Link
                    to="/archive"
                    className="text-xs text-primary px-1 pt-1"
                  >
                    Весь архив →
                  </Link>
                </div>
              </div>
            )}
          </nav>
        </div>,
        document.body
      )}
    </header>
  )
}

function MenuSection({
  label,
  icon,
  items,
  accent,
  extraLink,
}: {
  label: string
  icon: React.ReactNode
  items: { slug: string; title: string; date: string }[]
  accent?: boolean
  extraLink?: React.ReactNode
}) {
  return (
    <div className="py-1">
      <p
        className={`flex items-center gap-1.5 px-4 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wider ${
          accent ? "text-primary" : "text-muted-foreground"
        }`}
      >
        {icon}
        {label}
      </p>
      {items.map((c) => (
        <Link
          key={c.slug}
          to={`/${c.slug}`}
          className="block px-4 py-2 text-sm text-foreground hover:bg-primary/10 transition-colors"
        >
          <span>{c.title}</span>
          <span className="block text-xs text-muted-foreground">{c.date}</span>
        </Link>
      ))}
      {extraLink}
    </div>
  )
}
