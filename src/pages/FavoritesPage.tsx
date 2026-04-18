import { useMemo } from "react"
import { Link } from "react-router-dom"
import { Star, Trash2, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { useFavorites, parseFavoriteKey } from "@/lib/useFavorites"
import { conferences } from "@/data/conferences"

interface ResolvedFav {
  key: string
  conferenceSlug: string
  conferenceTitle: string
  trackName?: string
  time: string
  title: string
  speaker?: string
  role?: string
}

function resolveFavorites(keys: string[]): ResolvedFav[] {
  const out: ResolvedFav[] = []
  for (const raw of keys) {
    const parsed = parseFavoriteKey(raw)
    if (!parsed) continue
    const conf = conferences.find((c) => c.slug === parsed.conferenceSlug)
    if (!conf) continue
    let item:
      | { time: string; title: string; speaker?: string; role?: string }
      | undefined
    let trackName: string | undefined
    if (parsed.trackIndex === -1) {
      item = conf.schedule[parsed.scheduleIndex]
    } else {
      const track = conf.tracks?.[parsed.trackIndex]
      if (track) {
        trackName = track.name
        item = track.schedule[parsed.scheduleIndex]
      }
    }
    if (!item) continue
    out.push({
      key: raw,
      conferenceSlug: conf.slug,
      conferenceTitle: conf.title,
      trackName,
      time: item.time,
      title: item.title,
      speaker: item.speaker,
      role: item.role,
    })
  }
  return out
}

export function FavoritesPage() {
  const { favorites, toggle, clear } = useFavorites()
  const resolved = useMemo(() => resolveFavorites([...favorites]), [favorites])

  const byConference = useMemo(() => {
    const map = new Map<string, { title: string; items: ResolvedFav[] }>()
    for (const f of resolved) {
      const existing = map.get(f.conferenceSlug)
      if (existing) existing.items.push(f)
      else map.set(f.conferenceSlug, { title: f.conferenceTitle, items: [f] })
    }
    return [...map.entries()]
  }, [resolved])

  return (
    <main className="relative z-10 px-4 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <ScrollReveal>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="h-3 w-3" /> На главную
              </Link>
              <h1
                className="text-primary leading-relaxed mt-4"
                style={{
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: "clamp(1rem, 3vw, 1.5rem)",
                }}
              >
                Моя программа
              </h1>
              <p className="text-muted-foreground mt-2 text-sm">
                Сохранённые доклады и активности — хранятся локально в этом браузере.
              </p>
            </div>
            {resolved.length > 0 && (
              <button
                onClick={clear}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive px-2.5 py-1.5 rounded-md border border-border hover:border-destructive/40 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" /> Очистить всё
              </button>
            )}
          </div>
        </ScrollReveal>

        {resolved.length === 0 ? (
          <ScrollReveal delayMs={100}>
            <Card className="border-primary/10">
              <CardContent className="p-10 text-center flex flex-col items-center gap-3">
                <Star className="h-10 w-10 text-muted-foreground/50" />
                <p className="text-foreground font-medium">
                  Ничего не сохранено
                </p>
                <p className="text-sm text-muted-foreground max-w-md">
                  Откройте страницу конференции и нажмите на звёздочку у доклада,
                  чтобы добавить его в программу.
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>
        ) : (
          byConference.map(([slug, { title, items }], i) => (
            <ScrollReveal key={slug} delayMs={i * 80}>
              <Card className="border-primary/10">
                <CardContent className="p-6">
                  <Link
                    to={`/${slug}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {title} →
                  </Link>
                  <ul className="mt-4 space-y-3">
                    {items.map((it) => (
                      <li
                        key={it.key}
                        className="flex gap-4 items-start group"
                      >
                        <span className="text-sm text-primary font-mono whitespace-nowrap pt-0.5">
                          {it.time}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-foreground">{it.title}</p>
                          {it.speaker && (
                            <p className="text-sm text-muted-foreground">
                              {it.speaker}
                              {it.role && <span className="text-xs"> — {it.role}</span>}
                            </p>
                          )}
                          {it.trackName && (
                            <p className="mt-1 inline-block text-[10px] uppercase tracking-widest text-muted-foreground">
                              {it.trackName}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            const parsed = parseFavoriteKey(it.key)
                            if (parsed) toggle(parsed)
                          }}
                          aria-label="Убрать"
                          className="opacity-60 hover:opacity-100 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))
        )}
      </div>
    </main>
  )
}
