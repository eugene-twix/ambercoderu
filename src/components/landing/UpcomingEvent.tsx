import { Link } from "react-router-dom"
import { MapPin, Calendar, Users, Layers } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import { StatusBadge } from "@/components/events/StatusBadge"
import { CountdownStrip } from "@/components/events/CountdownStrip"
import { conferences } from "@/data/conferences"
import { getEventStatus, getNextUpcoming } from "@/lib/eventStatus"
import { cn } from "@/lib/utils"

function EmptyState() {
  return (
    <Card className="w-full max-w-lg shadow-lg shadow-primary/10 border-primary/10 bg-card/70">
      <CardContent className="p-6 text-center">
        <p className="text-xs text-primary font-medium uppercase tracking-wider mb-1">
          Ближайшее событие
        </p>
        <p className="text-muted-foreground">
          Пока не объявлено — скоро анонсируем следующую встречу.
        </p>
      </CardContent>
    </Card>
  )
}

export function UpcomingEvent() {
  const conference = getNextUpcoming(conferences)
  if (!conference) return <EmptyState />

  const status = getEventStatus(conference)
  const speakerCount = conference.tracks
    ? conference.tracks.reduce((sum, t) => sum + t.schedule.length, 0)
    : conference.schedule.length
  const trackCount = conference.tracks?.length ?? 0
  const heading =
    status === "ongoing" ? "Идёт прямо сейчас" : "Ближайшее событие"

  return (
    <Link
      to={`/${conference.slug}`}
      className="group block w-full max-w-lg"
    >
      <Card
        className={cn(
          "relative overflow-hidden border-primary/20 shadow-xl shadow-primary/15 transition-all duration-500",
          "group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-primary/30 group-hover:border-primary/50",
        )}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-52 w-52 rounded-full blur-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-60"
          style={{ background: "radial-gradient(closest-side, var(--primary), transparent)" }}
        />
        <CardContent className="relative p-4 sm:p-6 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs text-primary font-medium uppercase tracking-wider mb-1">
                {heading}
              </p>
              <h2 className="text-xl font-semibold text-foreground">
                {conference.title}
              </h2>
            </div>
            <StatusBadge status={status} className="shrink-0 mt-1" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 shrink-0 text-primary/70" />
              {conference.date}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 shrink-0 text-primary/70" />
              <span className="truncate">{conference.location}</span>
            </span>
            {speakerCount > 0 && (
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4 shrink-0 text-primary/70" />
                {speakerCount} докладов
              </span>
            )}
            {trackCount > 0 && (
              <span className="flex items-center gap-1.5">
                <Layers className="h-4 w-4 shrink-0 text-primary/70" />
                {trackCount} {pluralizeTracks(trackCount)}
              </span>
            )}
          </div>

          {status === "upcoming" && (
            <div className="-mx-1">
              <CountdownStrip targetIso={conference.startsAt} />
            </div>
          )}

          <span
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "self-start transition-transform group-hover:translate-x-0.5",
            )}
          >
            Подробнее
            <span className="inline-block transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}

function pluralizeTracks(n: number): string {
  const mod100 = n % 100
  const mod10 = n % 10
  if (mod100 >= 11 && mod100 <= 14) return "треков"
  if (mod10 === 1) return "трек"
  if (mod10 >= 2 && mod10 <= 4) return "трека"
  return "треков"
}
