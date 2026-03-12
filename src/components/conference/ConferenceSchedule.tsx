import type { Conference } from "@/data/conferences"
import { Card, CardContent } from "@/components/ui/card"

export function ConferenceSchedule({ conference }: { conference: Conference }) {
  if (conference.schedule.length === 0) {
    return (
      <Card className="w-full max-w-xl shadow-lg shadow-primary/20 border-primary/10">
        <CardContent className="p-6 text-center">
          <h2 className="text-lg font-semibold text-foreground mb-2">Программа</h2>
          <p className="text-muted-foreground">Программа скоро будет объявлена</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-xl shadow-lg shadow-primary/20 border-primary/10">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Программа</h2>
        <ul className="space-y-3">
          {conference.schedule.map((item, i) => (
            <li key={i} className="flex gap-4">
              <span className="text-sm text-primary font-mono whitespace-nowrap">{item.time}</span>
              <div>
                <p className="text-foreground">{item.title}</p>
                {item.speaker && (
                  <p className="text-sm text-muted-foreground">{item.speaker}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
