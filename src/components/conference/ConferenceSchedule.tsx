import { useMemo, useState } from "react"
import { ChevronDown, Star, Users, Filter, X } from "lucide-react"
import type { Conference, ScheduleItem } from "@/data/conferences"
import { Card, CardContent } from "@/components/ui/card"
import { useFavorites } from "@/lib/useFavorites"

type FilterMode = "all" | "speakers" | "registration" | "favorites"

const FILTER_OPTIONS: { id: FilterMode; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "speakers", label: "С докладами" },
  { id: "registration", label: "С регистрацией" },
  { id: "favorites", label: "Избранные" },
]

function matchesFilter(
  item: ScheduleItem,
  mode: FilterMode,
  isFav: boolean,
): boolean {
  switch (mode) {
    case "speakers":
      return !!item.speaker
    case "registration":
      return !!item.registrationUrl
    case "favorites":
      return isFav
    case "all":
    default:
      return true
  }
}

function ScheduleRow({
  item,
  conferenceSlug,
  trackIndex,
  scheduleIndex,
}: {
  item: ScheduleItem
  conferenceSlug: string
  trackIndex: number
  scheduleIndex: number
}) {
  const { has, toggle } = useFavorites()
  const [expanded, setExpanded] = useState(false)
  const favKey = { conferenceSlug, trackIndex, scheduleIndex }
  const isFav = has(favKey)
  const canExpand = !!item.speaker || !!item.role || !!item.registrationUrl

  return (
    <li className="group flex gap-3 items-start">
      <span className="text-sm text-primary font-mono whitespace-nowrap pt-0.5">
        {item.time}
      </span>
      <div className="min-w-0 flex-1">
        <button
          type="button"
          onClick={() => canExpand && setExpanded((v) => !v)}
          className={`w-full text-left flex items-start gap-2 ${
            canExpand ? "cursor-pointer" : "cursor-default"
          }`}
        >
          <span className="flex-1 text-foreground">{item.title}</span>
          {canExpand && (
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform mt-0.5 ${
                expanded ? "rotate-180 text-primary" : ""
              }`}
            />
          )}
        </button>
        {item.speaker && (
          <p className="text-sm text-muted-foreground">
            {item.speaker}
            {item.role && <span className="text-xs"> — {item.role}</span>}
          </p>
        )}
        {expanded && item.registrationUrl && (
          <a
            href={item.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 px-3 py-1 text-xs font-medium rounded-md bg-primary/15 text-primary hover:bg-primary/25 animate-fade-in transition-colors"
          >
            Записаться — мест ограничено →
          </a>
        )}
      </div>
      {item.speaker && (
        <button
          onClick={() => toggle(favKey)}
          aria-label={isFav ? "Убрать из избранного" : "Добавить в избранное"}
          className={`flex items-center justify-center h-7 w-7 rounded-md transition-all ${
            isFav
              ? "text-primary"
              : "text-muted-foreground/40 opacity-0 group-hover:opacity-100 hover:text-primary"
          }`}
        >
          <Star className={`h-4 w-4 ${isFav ? "fill-primary" : ""}`} />
        </button>
      )}
    </li>
  )
}

function ScheduleList({
  schedule,
  conferenceSlug,
  trackIndex,
}: {
  schedule: ScheduleItem[]
  conferenceSlug: string
  trackIndex: number
}) {
  if (schedule.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-4">
        Нет пунктов, соответствующих фильтру.
      </p>
    )
  }
  return (
    <ul className="space-y-3">
      {schedule.map((item, i) => (
        <ScheduleRow
          key={`${trackIndex}-${i}-${item.time}`}
          item={item}
          conferenceSlug={conferenceSlug}
          trackIndex={trackIndex}
          scheduleIndex={i}
        />
      ))}
    </ul>
  )
}

export function ConferenceSchedule({ conference }: { conference: Conference }) {
  const [activeTab, setActiveTab] = useState(0)
  const [filter, setFilter] = useState<FilterMode>("all")
  const { has } = useFavorites()

  const filteredItems = useMemo(() => {
    if (conference.tracks && conference.tracks.length > 0) {
      const track = conference.tracks[activeTab]
      if (!track) return [] as ScheduleItem[]
      return track.schedule.filter((item, i) =>
        matchesFilter(item, filter, has({ conferenceSlug: conference.slug, trackIndex: activeTab, scheduleIndex: i })),
      )
    }
    return conference.schedule.filter((item, i) =>
      matchesFilter(item, filter, has({ conferenceSlug: conference.slug, trackIndex: -1, scheduleIndex: i })),
    )
  }, [conference.tracks, conference.schedule, conference.slug, activeTab, filter, has])

  if (conference.tracks && conference.tracks.length > 0) {
    const track = conference.tracks[activeTab]
    return (
      <Card
        id="schedule"
        className="w-full max-w-2xl border-primary/10 shadow-lg shadow-primary/15 scroll-mt-20"
      >
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
            <h2 className="text-lg font-semibold text-foreground">Программа</h2>
            {track?.capacity != null && (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="h-3.5 w-3.5" />
                {track.capacity} мест
              </span>
            )}
          </div>

          <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-thin snap-x snap-mandatory pb-1">
            {conference.tracks.map((t, i) => (
              <button
                key={i}
                onClick={(e) => {
                  setActiveTab(i)
                  e.currentTarget.scrollIntoView({
                    behavior: "smooth",
                    inline: "center",
                    block: "nearest",
                  })
                }}
                className={`snap-start whitespace-nowrap px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all shrink-0 ${
                  activeTab === i
                    ? "bg-primary text-primary-foreground shadow shadow-primary/30"
                    : "border border-primary/30 text-muted-foreground hover:text-foreground hover:border-primary/60 hover:bg-primary/5"
                }`}
              >
                {t.name}
                {t.capacity != null && (
                  <span className="ml-1.5 text-xs opacity-70">{t.capacity} мест</span>
                )}
              </button>
            ))}
          </div>

          <FilterBar filter={filter} setFilter={setFilter} />

          <ScheduleList
            schedule={filteredItems}
            conferenceSlug={conference.slug}
            trackIndex={activeTab}
          />
        </CardContent>
      </Card>
    )
  }

  if (conference.schedule.length === 0) {
    return (
      <Card
        id="schedule"
        className="w-full max-w-xl border-primary/10 shadow-lg shadow-primary/15 scroll-mt-20"
      >
        <CardContent className="p-4 sm:p-6 text-center">
          <h2 className="text-lg font-semibold text-foreground mb-2">Программа</h2>
          <p className="text-muted-foreground">Программа скоро будет объявлена</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      id="schedule"
      className="w-full max-w-xl border-primary/10 shadow-lg shadow-primary/15 scroll-mt-20"
    >
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Программа</h2>
        <FilterBar filter={filter} setFilter={setFilter} />
        <ScheduleList
          schedule={filteredItems}
          conferenceSlug={conference.slug}
          trackIndex={-1}
        />
      </CardContent>
    </Card>
  )
}

function FilterBar({
  filter,
  setFilter,
}: {
  filter: FilterMode
  setFilter: (f: FilterMode) => void
}) {
  return (
    <div className="flex items-center gap-2 mb-4 flex-wrap">
      <Filter className="h-3.5 w-3.5 text-muted-foreground" />
      {FILTER_OPTIONS.map((opt) => (
        <button
          key={opt.id}
          onClick={() => setFilter(opt.id)}
          className={`px-2.5 py-0.5 text-xs rounded-full border transition-colors ${
            filter === opt.id
              ? "bg-primary/15 text-primary border-primary/40"
              : "text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
          }`}
        >
          {opt.label}
        </button>
      ))}
      {filter !== "all" && (
        <button
          onClick={() => setFilter("all")}
          className="text-[10px] text-muted-foreground hover:text-foreground inline-flex items-center gap-0.5"
        >
          <X className="h-3 w-3" /> сбросить
        </button>
      )}
    </div>
  )
}
