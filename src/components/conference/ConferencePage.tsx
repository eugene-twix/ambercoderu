import { useMemo } from "react"
import { useParams, Navigate } from "react-router-dom"
import { getConferenceBySlug } from "@/data/conferences"
import { ConferenceHero } from "./ConferenceHero"
import { ConferenceSchedule } from "./ConferenceSchedule"
import { ConferenceLocation } from "./ConferenceLocation"
import { ConferenceQR } from "./ConferenceQR"
import { ConferenceActivities } from "./ConferenceActivities"
import { ConferenceStickyNav } from "./ConferenceStickyNav"
import { ScheduleImage } from "./ScheduleImage"
import { ScrollReveal } from "@/components/ui/ScrollReveal"

export function ConferencePage() {
  const { slug } = useParams<{ slug: string }>()
  const decoded = slug ? decodeURIComponent(slug) : ""
  const conference = getConferenceBySlug(decoded)

  const sections = useMemo(() => {
    if (!conference) return []
    const s: { id: string; label: string }[] = []
    if (conference.scheduleImage) s.push({ id: "overview", label: "Обзор" })
    s.push({ id: "schedule", label: "Программа" })
    if (conference.activities?.length) s.push({ id: "activities", label: "Активности" })
    s.push({ id: "location", label: "Локация" })
    s.push({ id: "join", label: "Присоединиться" })
    return s
  }, [conference])

  if (!conference) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <ConferenceStickyNav sections={sections} />
      <main className="relative z-10 flex flex-col items-center justify-center gap-10 px-4 py-10 sm:py-16">
        <ConferenceHero conference={conference} />

        {conference.scheduleImage && (
          <ScrollReveal>
            <div id="overview" className="w-full max-w-4xl scroll-mt-20">
              <ScheduleImage src={conference.scheduleImage} />
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal>
          <ConferenceSchedule conference={conference} />
        </ScrollReveal>

        <ScrollReveal>
          <ConferenceActivities conference={conference} />
        </ScrollReveal>

        <ScrollReveal>
          <ConferenceLocation conference={conference} />
        </ScrollReveal>

        <ScrollReveal>
          <div id="join" className="scroll-mt-20">
            <ConferenceQR conference={conference} />
          </div>
        </ScrollReveal>
      </main>
    </>
  )
}
