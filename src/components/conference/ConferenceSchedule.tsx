import { useState } from "react"
import type { Conference } from "@/data/conferences"
import { Card, CardContent } from "@/components/ui/card"

function ScheduleList({ schedule }: { schedule: { time: string; title: string; speaker?: string; role?: string }[] }) {
  return (
    <ul className="space-y-3">
      {schedule.map((item, i) => (
        <li key={i} className="flex gap-4">
          <span className="text-sm text-primary font-mono whitespace-nowrap">{item.time}</span>
          <div>
            <p className="text-foreground">{item.title}</p>
            {item.speaker && (
              <p className="text-sm text-muted-foreground">
                {item.speaker}
                {item.role && <span className="text-xs"> — {item.role}</span>}
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}

export function ConferenceSchedule({ conference }: { conference: Conference }) {
  const [activeTab, setActiveTab] = useState(0)

  if (conference.tracks && conference.tracks.length > 0) {
    const track = conference.tracks[activeTab]
    return (
      <Card className="w-full max-w-2xl shadow-lg shadow-primary/20 border-primary/10">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Программа</h2>
          <div className="flex gap-2 mb-6 flex-wrap">
            {conference.tracks.map((t, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                  activeTab === i
                    ? "bg-primary text-primary-foreground"
                    : "border border-primary/30 text-muted-foreground hover:text-foreground hover:border-primary/60"
                }`}
              >
                {t.name}
                {t.capacity != null && (
                  <span className="ml-1.5 text-xs opacity-70">{t.capacity} мест</span>
                )}
              </button>
            ))}
          </div>
          <ScheduleList schedule={track.schedule} />
        </CardContent>
      </Card>
    )
  }

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
        <ScheduleList schedule={conference.schedule} />
      </CardContent>
    </Card>
  )
}
