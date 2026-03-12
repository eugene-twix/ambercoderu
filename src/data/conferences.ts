export interface Conference {
  slug: string
  title: string
  date: string
  description: string
  telegramPostUrl: string
  location: string
  schedule: { time: string; title: string; speaker?: string }[]
}

export const conferences: Conference[] = [
  {
    slug: "амберконф-весна-2026",
    title: "АмберКонф Весна 2026",
    date: "Весна 2026",
    description: "Конференция сообщества Amber Code для разработчиков",
    telegramPostUrl: "https://t.me/ambercode/555",
    location: "",
    schedule: [],
  },
]

export function getConferenceBySlug(slug: string): Conference | undefined {
  return conferences.find((c) => c.slug === slug)
}
