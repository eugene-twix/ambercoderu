import { MapPin, Copy, Check, ExternalLink } from "lucide-react"
import type { Conference } from "@/data/conferences"
import { Card, CardContent } from "@/components/ui/card"
import { useCopyToClipboard } from "@/lib/useCopyToClipboard"
import { useToastOptional } from "@/components/ui/Toast"

export function ConferenceLocation({ conference }: { conference: Conference }) {
  const { copied, copy } = useCopyToClipboard()
  const toast = useToastOptional()

  async function handleCopy() {
    const ok = await copy(conference.location)
    toast?.show(ok ? "Адрес скопирован" : "Не удалось скопировать", ok ? "success" : "error")
  }

  return (
    <Card
      id="location"
      className="w-full max-w-xl border-primary/10 shadow-lg shadow-primary/15 scroll-mt-20"
    >
      <CardContent className="p-4 sm:p-6 text-center">
        <h2 className="text-lg font-semibold text-foreground mb-3">Локация</h2>
        {conference.location ? (
          <div className="flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-1.5 text-foreground">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              <span>{conference.location}</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {conference.locationUrl && (
                <a
                  href={conference.locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-primary/30 bg-background/60 backdrop-blur px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary/60 hover:bg-primary/10 transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Открыть на карте
                </a>
              )}
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-md border border-primary/30 bg-background/60 backdrop-blur px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary/60 hover:bg-primary/10 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    Скопировано
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Копировать адрес
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">Место проведения будет объявлено</p>
        )}
      </CardContent>
    </Card>
  )
}
