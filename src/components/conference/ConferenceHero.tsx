import type { Conference } from "@/data/conferences"

export function ConferenceHero({ conference }: { conference: Conference }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
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
    </div>
  )
}
