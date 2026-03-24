const features = [
  {
    title: "Конференции и митапы",
    description: "Организуем АмберКонф и регулярные встречи для обмена опытом",
  },
  {
    title: "Нетворкинг",
    description: "Объединяем разработчиков, дизайнеров, продактов и предпринимателей",
  },
  {
    title: "Развитие",
    description: "Делимся знаниями, обсуждаем технологии и растём в профессии вместе",
  },
]

export function HeroDescription() {
  return (
    <div className="text-center space-y-6 max-w-lg mx-auto">
      <h1
        className="text-2xl sm:text-3xl text-primary"
        style={{ fontFamily: "'Press Start 2P', cursive" }}
      >
        Amber Code
      </h1>
      <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
        Telegram-сообщество для разработчиков из Калининграда и не только.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-lg border border-primary/10 bg-card p-3 shadow-sm"
          >
            <p className="text-sm font-semibold text-foreground mb-1">{f.title}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
