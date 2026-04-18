import { Calendar, Users, Rocket } from "lucide-react"
import type { ComponentType } from "react"

interface Feature {
  title: string
  description: string
  Icon: ComponentType<{ className?: string }>
}

const features: Feature[] = [
  {
    title: "Конференции и митапы",
    description: "Организуем АмберКонф и регулярные встречи для обмена опытом",
    Icon: Calendar,
  },
  {
    title: "Нетворкинг",
    description: "Объединяем разработчиков, дизайнеров, продактов и предпринимателей",
    Icon: Users,
  },
  {
    title: "Развитие",
    description: "Делимся знаниями, обсуждаем технологии и растём в профессии вместе",
    Icon: Rocket,
  },
]

export function HeroDescription() {
  return (
    <div className="text-center space-y-6 max-w-lg mx-auto">
      <div className="animate-rise">
        <h1
          className="relative inline-block text-2xl sm:text-3xl text-primary"
          style={{ fontFamily: "'Press Start 2P', cursive" }}
        >
          Amber Code
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-2 -bottom-2 h-[3px] rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--primary), transparent)",
              opacity: 0.7,
            }}
          />
        </h1>
        <p className="mt-6 text-base sm:text-lg text-foreground/80 leading-relaxed">
          Telegram-сообщество для разработчиков из Калининграда и не только.
        </p>
      </div>
      <div className="stagger-rise grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
        {features.map(({ title, description, Icon }) => (
          <div
            key={title}
            className="group rounded-lg border border-primary/10 bg-card p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md hover:shadow-primary/10"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <Icon className="h-3.5 w-3.5" />
              </span>
              <p className="text-sm font-semibold text-foreground">{title}</p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
