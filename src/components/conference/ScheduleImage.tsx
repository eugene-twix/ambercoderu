import { useEffect, useState } from "react"
import { X, ZoomIn } from "lucide-react"

export function ScheduleImage({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false)
  const [lightbox, setLightbox] = useState(false)

  useEffect(() => {
    if (!lightbox) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightbox(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [lightbox])

  return (
    <>
      <button
        onClick={() => setLightbox(true)}
        className="group relative w-full max-w-4xl cursor-zoom-in"
      >
        {!loaded && (
          <div className="absolute inset-0 rounded-xl shimmer" aria-hidden="true" />
        )}
        <img
          src={src}
          alt="Расписание конференции"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`w-full rounded-xl shadow-lg shadow-primary/15 border border-primary/10 transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
        <span className="absolute top-3 right-3 h-9 w-9 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur">
          <ZoomIn className="h-4 w-4" />
        </span>
      </button>
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-zoom-out p-4 animate-fade-in"
          onClick={() => setLightbox(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightbox(false)
            }}
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Закрыть"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={src}
            alt="Расписание конференции"
            className="max-w-full max-h-full object-contain animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
