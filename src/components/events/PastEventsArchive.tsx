import { Link } from "react-router-dom"
import { Archive, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { getPastEvents } from "@/lib/eventStatus"
import { conferences } from "@/data/conferences"

export function PastEventsArchive() {
  const past = getPastEvents(conferences)
  if (past.length === 0) return null
  return (
    <section className="w-full max-w-lg">
      <div className="flex items-center gap-2 mb-3 px-1">
        <Archive className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Архив событий
        </h3>
      </div>
      <div className="flex flex-col gap-2">
        {past.slice(0, 3).map((c) => (
          <Link
            key={c.slug}
            to={`/${c.slug}`}
            className="group block"
          >
            <Card className="border-border/50 bg-card/70 opacity-80 transition-all duration-300 hover:opacity-100 hover:border-primary/30">
              <CardContent className="p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {c.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{c.date}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </CardContent>
            </Card>
          </Link>
        ))}
        {past.length > 3 && (
          <Link
            to="/archive"
            className="text-xs text-primary hover:underline self-end mt-1"
          >
            Показать все ({past.length}) →
          </Link>
        )}
      </div>
    </section>
  )
}
