import { MapPin } from "lucide-react"
import type { Conference } from "@/data/conferences"
import { Card, CardContent } from "@/components/ui/card"

export function ConferenceLocation({ conference }: { conference: Conference }) {
  return (
    <Card className="w-full max-w-xl shadow-lg shadow-primary/20 border-primary/10">
      <CardContent className="p-6 text-center">
        <h2 className="text-lg font-semibold text-foreground mb-2">Локация</h2>
        {conference.location ? (
          conference.locationUrl ? (
            <a
              href={conference.locationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-primary hover:underline"
            >
              <MapPin className="h-4 w-4" />
              {conference.location}
            </a>
          ) : (
            <p className="text-muted-foreground">{conference.location}</p>
          )
        ) : (
          <p className="text-muted-foreground">Место проведения будет объявлено</p>
        )}
      </CardContent>
    </Card>
  )
}
