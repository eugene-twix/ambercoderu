import { CalendarPlus, Share2, Link as LinkIcon } from "lucide-react"
import type { Conference } from "@/data/conferences"
import { getEventStatus } from "@/lib/eventStatus"
import { StatusBadge } from "@/components/events/StatusBadge"
import { CountdownStrip } from "@/components/events/CountdownStrip"
import { downloadIcs } from "@/lib/ics"
import { useCopyToClipboard } from "@/lib/useCopyToClipboard"
import { useToast } from "@/components/ui/Toast"

export function ConferenceHero({ conference }: { conference: Conference }) {
  const status = getEventStatus(conference)
  const { copy } = useCopyToClipboard()
  const toast = useToast()

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : ""
    const shareData: ShareData = {
      title: conference.title,
      text: conference.description,
      url,
    }
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share(shareData)
        return
      } catch {
        /* fall back to copy */
      }
    }
    const ok = await copy(url)
    toast.show(ok ? "Ссылка скопирована" : "Не удалось скопировать", ok ? "success" : "error")
  }

  async function handleCopy() {
    const url = typeof window !== "undefined" ? window.location.href : ""
    const ok = await copy(url)
    toast.show(ok ? "Ссылка скопирована" : "Не удалось скопировать", ok ? "success" : "error")
  }

  function handleCalendar() {
    downloadIcs(conference)
    toast.show("Событие добавлено в календарь", "success")
  }

  return (
    <div className="flex flex-col items-center gap-4 text-center animate-rise">
      <StatusBadge status={status} />
      <h1
        className="text-primary leading-relaxed"
        style={{
          fontFamily: "'Press Start 2P', cursive",
          fontSize: "clamp(1rem, 3vw, 1.5rem)",
        }}
      >
        {conference.title}
      </h1>
      <p className="text-lg text-muted-foreground">{conference.date}</p>
      <p className="max-w-xl text-foreground/80">{conference.description}</p>

      {status === "upcoming" && (
        <div className="mt-1">
          <CountdownStrip targetIso={conference.startsAt} />
        </div>
      )}

      <div className="flex flex-wrap gap-2 justify-center mt-2">
        <ActionButton onClick={handleCalendar} icon={<CalendarPlus className="h-4 w-4" />}>
          В календарь
        </ActionButton>
        <ActionButton onClick={handleShare} icon={<Share2 className="h-4 w-4" />}>
          Поделиться
        </ActionButton>
        <ActionButton onClick={handleCopy} icon={<LinkIcon className="h-4 w-4" />}>
          Копировать ссылку
        </ActionButton>
      </div>
    </div>
  )
}

function ActionButton({
  onClick,
  icon,
  children,
}: {
  onClick: () => void
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-md border border-primary/30 bg-background/60 backdrop-blur px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary/60 hover:bg-primary/10 hover:-translate-y-0.5 transition-all"
    >
      {icon}
      {children}
    </button>
  )
}
