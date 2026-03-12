import { useParams, Navigate } from "react-router-dom"
import { getConferenceBySlug } from "@/data/conferences"
import { ConferenceHero } from "./ConferenceHero"
import { ConferenceSchedule } from "./ConferenceSchedule"
import { ConferenceLocation } from "./ConferenceLocation"
import { ConferenceQR } from "./ConferenceQR"

export function ConferencePage() {
  const { slug } = useParams<{ slug: string }>()
  const decoded = slug ? decodeURIComponent(slug) : ""
  const conference = getConferenceBySlug(decoded)

  if (!conference) {
    return <Navigate to="/" replace />
  }

  return (
    <main className="relative z-10 flex flex-col items-center justify-center gap-8 px-4 py-16 sm:py-24">
      <ConferenceHero conference={conference} />
      <ConferenceSchedule conference={conference} />
      <ConferenceLocation conference={conference} />
      <ConferenceQR conference={conference} />
    </main>
  )
}
