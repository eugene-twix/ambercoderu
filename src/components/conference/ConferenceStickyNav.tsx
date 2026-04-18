import { useEffect, useRef, useState } from "react"

interface Section {
  id: string
  label: string
}

export function ConferenceStickyNav({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? "")
  const suppressUntil = useRef<number>(0)

  useEffect(() => {
    const elements = sections
      .map((s) => ({ id: s.id, el: document.getElementById(s.id) }))
      .filter((x): x is { id: string; el: HTMLElement } => x.el !== null)
    if (elements.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        if (Date.now() < suppressUntil.current) return
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length === 0) return
        // Pick the topmost visible section (smallest top)
        visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        const topEntry = visible[0]
        const match = elements.find((x) => x.el === topEntry.target)
        if (match) setActive(match.id)
      },
      { rootMargin: "-110px 0px -55% 0px", threshold: 0 },
    )

    elements.forEach(({ el }) => io.observe(el))
    return () => io.disconnect()
  }, [sections])

  function go(id: string) {
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 110
      suppressUntil.current = Date.now() + 1500
      setActive(id)
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  return (
    <nav className="sticky top-14 z-20 py-2 bg-background/85 backdrop-blur-md border-b border-border/60">
      <div className="max-w-5xl mx-auto px-4 flex gap-1 overflow-x-auto scrollbar-thin">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={(e) => {
              go(s.id)
              e.currentTarget.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
              })
            }}
            className={`relative whitespace-nowrap px-3 py-1.5 text-xs font-medium rounded-md transition-colors shrink-0 ${
              active === s.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {s.label}
            {active === s.id && (
              <span
                aria-hidden="true"
                className="absolute inset-x-2 bottom-0.5 h-0.5 rounded-full bg-primary"
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  )
}
