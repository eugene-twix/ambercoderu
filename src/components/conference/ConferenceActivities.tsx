import { useEffect, useState } from "react"
import { ExternalLink, ZoomIn, X } from "lucide-react"
import type { Conference, Activity } from "@/data/conferences"
import { Card, CardContent } from "@/components/ui/card"

function renderDescription(description: string) {
  return description.split(/(@\w+)/g).map((part, j) =>
    part.startsWith("@") ? (
      <a
        key={j}
        href={`https://t.me/${part.slice(1)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline"
        onClick={(e) => e.stopPropagation()}
      >
        {part}
      </a>
    ) : (
      <span key={j}>{part}</span>
    ),
  )
}

function ActivityCard({
  activity,
  onImageClick,
}: {
  activity: Activity
  onImageClick: (src: string) => void
}) {
  const clickable = !!activity.url

  function openUrl() {
    if (activity.url) window.open(activity.url, "_blank", "noopener,noreferrer")
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!clickable) return
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      openUrl()
    }
  }

  return (
    <div
      role={clickable ? "link" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={clickable ? openUrl : undefined}
      onKeyDown={clickable ? onKeyDown : undefined}
      className={`group block h-full ${
        clickable
          ? "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-xl"
          : ""
      }`}
    >
      <Card className="h-full border-border/60 bg-card/90 transition-all duration-300 group-hover:border-primary/40 group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:shadow-primary/10">
        <CardContent className="p-4 flex flex-col gap-2 h-full">
          <div className="flex items-start justify-between gap-2">
            {activity.url ? (
              <a
                href={activity.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-foreground font-medium group-hover:text-primary transition-colors hover:underline"
              >
                {activity.title}
              </a>
            ) : (
              <p className="text-foreground font-medium">{activity.title}</p>
            )}
            {activity.url && (
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-1 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            )}
          </div>
          {activity.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {renderDescription(activity.description)}
            </p>
          )}
          {activity.image && (
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onImageClick(activity.image!)
              }}
              className="mt-2 relative overflow-hidden rounded-lg border border-border/60 group/image"
            >
              <img
                src={activity.image}
                alt={activity.title}
                loading="lazy"
                className="w-full object-cover transition-transform duration-500 group-hover/image:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity">
                <ZoomIn className="h-6 w-6 text-white" />
              </span>
            </button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export function ConferenceActivities({ conference }: { conference: Conference }) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  useEffect(() => {
    if (!lightboxImage) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxImage(null)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [lightboxImage])

  if (!conference.activities || conference.activities.length === 0) return null

  return (
    <>
      <Card
        id="activities"
        className="w-full max-w-2xl border-primary/10 shadow-lg shadow-primary/15 scroll-mt-20"
      >
        <CardContent className="p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Активности</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {conference.activities.map((activity, i) => (
              <ActivityCard
                key={i}
                activity={activity}
                onImageClick={setLightboxImage}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-zoom-out p-4 animate-fade-in"
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightboxImage(null)
            }}
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Закрыть"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={lightboxImage}
            alt="Увеличенное изображение"
            className="max-w-full max-h-full object-contain animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
