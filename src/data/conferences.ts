export interface Conference {
  slug: string
  title: string
  date: string
  description: string
  telegramPostUrl: string
  location: string
  locationUrl?: string
  schedule: { time: string; title: string; speaker?: string }[]
}

export const conferences: Conference[] = [
  {
    slug: "амберконф-весна-2026",
    title: "АмберКонф Весна 2026",
    date: "Весна 2026",
    description: "Для программистов, разработчиков игр и всех, у кого с информационными технологиями по любви",
    telegramPostUrl: "https://t.me/ambercode/555",
    location: "ДС «Янтарный», ул. Согласия, 39",
    locationUrl: "https://yandex.com/maps/22/kaliningrad/?ll=20.485415%2C54.749315&mode=poi&poi%5Bpoint%5D=20.485519%2C54.749184&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D16684439021&z=17",
    schedule: [],
  },
]

export function getConferenceBySlug(slug: string): Conference | undefined {
  return conferences.find((c) => c.slug === slug)
}
