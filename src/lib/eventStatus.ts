import type { Conference } from "@/data/conferences"

export type EventStatus = "upcoming" | "ongoing" | "past"

export function getEventStatus(
  conference: Conference,
  now: Date = new Date(),
): EventStatus {
  const start = new Date(conference.startsAt)
  const end = new Date(conference.endsAt)
  if (now < start) return "upcoming"
  if (now <= end) return "ongoing"
  return "past"
}

export function sortByStartDesc(list: Conference[]): Conference[] {
  return [...list].sort(
    (a, b) => new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime(),
  )
}

export function sortByStartAsc(list: Conference[]): Conference[] {
  return [...list].sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
  )
}

export function getNextUpcoming(
  list: Conference[],
  now: Date = new Date(),
): Conference | undefined {
  return sortByStartAsc(list).find((c) => new Date(c.endsAt) >= now)
}

export function getPastEvents(
  list: Conference[],
  now: Date = new Date(),
): Conference[] {
  return sortByStartDesc(list).filter((c) => new Date(c.endsAt) < now)
}

export function groupByStatus(
  list: Conference[],
  now: Date = new Date(),
): { upcoming: Conference[]; past: Conference[] } {
  const upcoming = sortByStartAsc(list).filter(
    (c) => new Date(c.endsAt) >= now,
  )
  const past = sortByStartDesc(list).filter(
    (c) => new Date(c.endsAt) < now,
  )
  return { upcoming, past }
}

export function getYearOf(conference: Conference): number {
  return new Date(conference.startsAt).getFullYear()
}
