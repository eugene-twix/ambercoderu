import type { Conference } from "@/data/conferences"

function formatIcsDate(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "")
}

function escapeText(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n")
}

export function buildIcs(conference: Conference, origin: string): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Amber Code//Conference//RU",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${conference.slug}@ambercode`,
    `DTSTAMP:${formatIcsDate(new Date().toISOString())}`,
    `DTSTART:${formatIcsDate(conference.startsAt)}`,
    `DTEND:${formatIcsDate(conference.endsAt)}`,
    `SUMMARY:${escapeText(conference.title)}`,
    `DESCRIPTION:${escapeText(conference.description)}`,
    `LOCATION:${escapeText(conference.location)}`,
    `URL:${origin}/${encodeURIComponent(conference.slug)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ]
  return lines.join("\r\n")
}

export function downloadIcs(conference: Conference): void {
  const origin = typeof window !== "undefined" ? window.location.origin : ""
  const ics = buildIcs(conference, origin)
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${conference.slug}.ics`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
