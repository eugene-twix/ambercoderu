import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Archive, Calendar, MapPin, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { conferences } from "@/data/conferences"
import { getPastEvents, getYearOf } from "@/lib/eventStatus"

export function ArchivePage() {
  const past = useMemo(() => getPastEvents(conferences), [])
  const years = useMemo(() => {
    const set = new Set<number>()
    past.forEach((c) => set.add(getYearOf(c)))
    return [...set].sort((a, b) => b - a)
  }, [past])

  const [yearFilter, setYearFilter] = useState<number | "all">("all")
  const filtered = yearFilter === "all" ? past : past.filter((c) => getYearOf(c) === yearFilter)

  return (
    <main className="relative z-10 px-4 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <ScrollReveal>
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <Archive className="h-3 w-3" />
              Архив событий
            </div>
            <h1
              className="text-primary leading-relaxed mt-4"
              style={{
                fontFamily: "'Press Start 2P', cursive",
                fontSize: "clamp(1rem, 3vw, 1.5rem)",
              }}
            >
              Все прошедшие
            </h1>
            <p className="text-muted-foreground">
              Программы, спикеры и активности прошедших встреч сообщества.
            </p>
          </div>
        </ScrollReveal>

        {past.length === 0 ? (
          <ScrollReveal>
            <Card className="border-primary/10">
              <CardContent className="p-10 text-center text-muted-foreground">
                Пока архив пуст — все наши события ещё впереди.
              </CardContent>
            </Card>
          </ScrollReveal>
        ) : (
          <>
            {years.length > 1 && (
              <ScrollReveal delayMs={100}>
                <div className="flex flex-wrap gap-2 justify-center">
                  <YearChip
                    active={yearFilter === "all"}
                    onClick={() => setYearFilter("all")}
                  >
                    Все ({past.length})
                  </YearChip>
                  {years.map((y) => (
                    <YearChip
                      key={y}
                      active={yearFilter === y}
                      onClick={() => setYearFilter(y)}
                    >
                      {y}
                    </YearChip>
                  ))}
                </div>
              </ScrollReveal>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              {filtered.map((c, i) => (
                <ScrollReveal key={c.slug} delayMs={i * 80}>
                  <Link to={`/${c.slug}`} className="group block h-full">
                    <Card className="h-full border-border/60 bg-card/80 transition-all duration-300 group-hover:border-primary/40 group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:shadow-primary/10">
                      <CardContent className="p-5 flex flex-col gap-2 h-full">
                        <div className="flex items-start justify-between gap-2">
                          <h2 className="text-base font-semibold text-foreground">
                            {c.title}
                          </h2>
                          <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-primary/70" />
                          {c.date}
                        </p>
                        {c.location && (
                          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-primary/70" />
                            <span className="truncate">{c.location}</span>
                          </p>
                        )}
                        <p className="mt-auto text-xs text-muted-foreground line-clamp-2">
                          {c.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  )
}

function YearChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
        active
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
      }`}
    >
      {children}
    </button>
  )
}
