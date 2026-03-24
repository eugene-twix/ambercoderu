import type { Conference } from "@/data/conferences"
import { Card, CardContent } from "@/components/ui/card"

export function ConferenceActivities({ conference }: { conference: Conference }) {
  if (!conference.activities || conference.activities.length === 0) return null

  return (
    <Card className="w-full max-w-2xl shadow-lg shadow-primary/20 border-primary/10">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Активности</h2>
        <ul className="space-y-3">
          {conference.activities.map((activity, i) => (
            <li key={i}>
              <p className="text-foreground font-medium">{activity.title}</p>
              {activity.description && (
                <p className="text-sm text-muted-foreground">{activity.description}</p>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
