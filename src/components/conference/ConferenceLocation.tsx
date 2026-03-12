import type { Conference } from "@/data/conferences"
import { Card, CardContent } from "@/components/ui/card"

export function ConferenceLocation({ conference }: { conference: Conference }) {
  return (
    <Card className="w-full max-w-xl shadow-lg shadow-primary/20 border-primary/10">
      <CardContent className="p-6 text-center">
        <h2 className="text-lg font-semibold text-foreground mb-2">Локация</h2>
        <p className="text-muted-foreground">
          {conference.location || "Место проведения будет объявлено"}
        </p>
      </CardContent>
    </Card>
  )
}
