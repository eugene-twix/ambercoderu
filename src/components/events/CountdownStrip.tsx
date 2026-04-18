import { useCountdown } from "@/lib/useCountdown"

function pad(n: number): string {
  return n.toString().padStart(2, "0")
}

function Cell({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center rounded-lg bg-background/60 backdrop-blur px-3 py-2 ring-1 ring-primary/15 min-w-14">
      <span className="font-mono text-lg leading-none text-primary tabular-nums">
        {pad(value)}
      </span>
      <span className="mt-1 text-[9px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  )
}

export function CountdownStrip({ targetIso }: { targetIso: string }) {
  const { days, hours, minutes, seconds, ended } = useCountdown(targetIso)
  if (ended) return null
  return (
    <div className="flex items-center gap-2">
      <Cell value={days} label="дней" />
      <Cell value={hours} label="часов" />
      <Cell value={minutes} label="минут" />
      <Cell value={seconds} label="секунд" />
    </div>
  )
}
