import type { EventStatus } from "@/lib/eventStatus"
import { cn } from "@/lib/utils"

const MAP: Record<
  EventStatus,
  { label: string; cls: string; withDot?: boolean }
> = {
  upcoming: {
    label: "Скоро",
    cls: "bg-primary/15 text-primary ring-1 ring-primary/30",
  },
  ongoing: {
    label: "В эфире",
    cls: "bg-red-500/15 text-red-400 ring-1 ring-red-400/40",
    withDot: true,
  },
  past: {
    label: "Завершено",
    cls: "bg-muted text-muted-foreground ring-1 ring-border",
  },
}

export function StatusBadge({
  status,
  className,
}: {
  status: EventStatus
  className?: string
}) {
  const { label, cls, withDot } = MAP[status]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest",
        cls,
        className,
      )}
    >
      {withDot && (
        <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-live-dot" />
      )}
      {label}
    </span>
  )
}
