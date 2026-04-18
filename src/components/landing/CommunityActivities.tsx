import { Gamepad2, Dices, Users } from "lucide-react"
import type { ComponentType } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface CommunityItem {
  title: string
  description: string
  hint: string
  Icon: ComponentType<{ className?: string }>
  accent: string
}

const items: CommunityItem[] = [
  {
    title: "Minecraft-сервер",
    description: "Строим и выживаем вместе с участниками Amber Code.",
    hint: "Как присоединиться — спрашивайте в чате сообщества",
    Icon: Gamepad2,
    accent: "from-emerald-500/20 to-emerald-500/0",
  },
  {
    title: "D&D сессии",
    description: "Партии Dungeons & Dragons для участников сообщества.",
    hint: "Подробности — в чате Amber Code",
    Icon: Dices,
    accent: "from-primary/25 to-primary/0",
  },
]

export function CommunityActivities() {
  return (
    <section className="w-full max-w-3xl">
      <div className="flex items-center gap-2 mb-4 px-1">
        <Users className="h-4 w-4 text-primary" />
        <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
          Жизнь сообщества
        </h3>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map(({ title, description, hint, Icon, accent }) => (
          <Card
            key={title}
            className="group relative overflow-hidden border-primary/10 bg-card/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br ${accent}`}
            />
            <CardContent className="relative p-5 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20 transition-transform group-hover:scale-110">
                  <Icon className="h-4 w-4" />
                </span>
                <p className="text-sm font-semibold text-foreground">{title}</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
              <p className="mt-1 text-xs text-muted-foreground/80 italic">
                {hint}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="mt-3 px-1 text-xs text-muted-foreground">
        Задавайте вопросы о клубных активностях в{" "}
        <a
          href="https://t.me/ambercode"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          чате Amber Code
        </a>
        .
      </p>
    </section>
  )
}
