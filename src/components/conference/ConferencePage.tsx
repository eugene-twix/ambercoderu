import { useState } from "react"
import { useParams, Navigate } from "react-router-dom"
import { getConferenceBySlug } from "@/data/conferences"
import { ConferenceHero } from "./ConferenceHero"
import { ConferenceSchedule } from "./ConferenceSchedule"
import { ConferenceLocation } from "./ConferenceLocation"
import { ConferenceQR } from "./ConferenceQR"
import { ConferenceActivities } from "./ConferenceActivities"

export function ConferencePage() {
  const { slug } = useParams<{ slug: string }>()
  const decoded = slug ? decodeURIComponent(slug) : ""
  const conference = getConferenceBySlug(decoded)
  const [lightbox, setLightbox] = useState(false)

  if (!conference) {
    return <Navigate to="/" replace />
  }

  return (
    <main className="relative z-10 flex flex-col items-center justify-center gap-8 px-4 py-16 sm:py-24">
      <ConferenceHero conference={conference} />
      {conference.scheduleImage && (
        <>
          <button onClick={() => setLightbox(true)} className="w-full max-w-4xl cursor-zoom-in">
            <img
              src={conference.scheduleImage}
              alt="Расписание конференции"
              className="w-full rounded-xl shadow-lg shadow-primary/20 border border-primary/10"
            />
          </button>
          {lightbox && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 cursor-zoom-out p-4"
              onClick={() => setLightbox(false)}
            >
              <img
                src={conference.scheduleImage}
                alt="Расписание конференции"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          )}
        </>
      )}
      <ConferenceSchedule conference={conference} />
      <ConferenceActivities conference={conference} />
      <ConferenceLocation conference={conference} />
      <ConferenceQR conference={conference} />
    </main>
  )
}
