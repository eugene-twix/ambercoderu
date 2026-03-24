import { Link } from "react-router-dom"
import { MapPin, Calendar, Users, Layers } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import { conferences } from "@/data/conferences"
import { cn } from "@/lib/utils"

export function UpcomingEvent() {
  const conference = conferences[conferences.length - 1]
  if (!conference) return null

  const speakerCount = conference.tracks
    ? conference.tracks.reduce((sum, t) => sum + t.schedule.length, 0)
    : conference.schedule.length
  const trackCount = conference.tracks?.length ?? 0

  return (
    <Card className="w-full max-w-lg shadow-lg shadow-primary/20 border-primary/10">
      <CardContent className="p-6 flex flex-col gap-4">
        <div>
          <p className="text-xs text-primary font-medium uppercase tracking-wider mb-1">Ближайшее событие</p>
          <h2 className="text-xl font-semibold text-foreground">{conference.title}</h2>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 shrink-0 text-primary/70" />
            {conference.date}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 shrink-0 text-primary/70" />
            {conference.location}
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
              {trackCount} трека
            </span>
          )}
        </div>

        <Link
          to={`/${conference.slug}`}
          className={cn(buttonVariants({ variant: "default", size: "sm" }), "self-start")}
        >
          Подробнее →
        </Link>
      </CardContent>
    </Card>
  )
}
