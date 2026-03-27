import { useState } from "react"
import type { Conference } from "@/data/conferences"
import { Card, CardContent } from "@/components/ui/card"

export function ConferenceActivities({ conference }: { conference: Conference }) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  if (!conference.activities || conference.activities.length === 0) return null

  return (
    <>
      <Card className="w-full max-w-2xl shadow-lg shadow-primary/20 border-primary/10">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Активности</h2>
          <ul className="space-y-3">
            {conference.activities.map((activity, i) => (
              <li key={i}>
                {activity.url ? (
                  <a
                    href={activity.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground font-medium hover:text-primary transition-colors"
                  >
                    {activity.title}
                  </a>
                ) : (
                  <p className="text-foreground font-medium">{activity.title}</p>
                )}
                {activity.description && (
                  <p className="text-sm text-muted-foreground">
                    {activity.description.split(/(@\w+)/g).map((part, j) =>
                      part.startsWith("@") ? (
                        <a
                          key={j}
                          href={`https://t.me/${part.slice(1)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {part}
                        </a>
                      ) : (
                        part
                      )
                    )}
                  </p>
                )}
                {activity.image && (
                  <button onClick={() => setLightboxImage(activity.image!)} className="mt-2 cursor-zoom-in">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full max-w-sm rounded-lg border border-primary/10 shadow-sm"
                    />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 cursor-zoom-out p-4"
          onClick={() => setLightboxImage(null)}
        >
          <img
            src={lightboxImage}
            alt="Увеличенное изображение"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </>
  )
}
