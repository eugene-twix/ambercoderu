const rows = [
  { duration: "60s", offset: "-10%" },
  { duration: "80s", offset: "-30%" },
  { duration: "100s", offset: "-50%" },
  { duration: "70s", offset: "-20%" },
]

const text = "AMBER CODE \u00a0\u00a0\u00a0 "

export function BackgroundText() {
  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
      style={{
        maskImage:
          "radial-gradient(ellipse at center, black 30%, transparent 85%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at center, black 30%, transparent 85%)",
      }}
    >
      <div className="absolute inset-0 flex flex-col justify-around">
        {rows.map((row, i) => (
          <div
            key={i}
            className="relative whitespace-nowrap opacity-[0.07] dark:opacity-[0.07]"
          >
            <div
              className="inline-block animate-marquee"
              style={{
                fontFamily: "'Press Start 2P', cursive",
                fontSize: "clamp(3rem, 8vw, 6rem)",
                color: "var(--primary)",
                animationDuration: row.duration,
                transform: `translateX(${row.offset})`,
              }}
            >
              {text.repeat(10)}
              {text.repeat(10)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
