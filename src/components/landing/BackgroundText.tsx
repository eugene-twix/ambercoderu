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
    >
      <div className="absolute inset-0 flex flex-col justify-around">
        {rows.map((row, i) => (
          <div key={i} className="relative whitespace-nowrap opacity-[0.04]">
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

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
      `}</style>
    </div>
  )
}
