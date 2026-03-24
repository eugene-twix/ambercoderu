export interface Activity {
  title: string
  description?: string
  url?: string
}

export interface ScheduleItem {
  time: string
  title: string
  speaker?: string
  role?: string
}

export interface Track {
  name: string
  capacity?: number
  schedule: ScheduleItem[]
}

export interface Conference {
  slug: string
  title: string
  date: string
  description: string
  telegramPostUrl: string
  location: string
  locationUrl?: string
  schedule: ScheduleItem[]
  tracks?: Track[]
  activities?: Activity[]
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
    tracks: [
      {
        name: "ЛЕКТОРИЙ ИТ/БИЗНЕС",
        capacity: 55,
        schedule: [
          {
            time: "11:00–11:50",
            title: "Современные угрозы информационной безопасности",
            speaker: "Алексей Ковтун",
            role: "Генеральный директор, Центр Защиты Информации",
          },
          {
            time: "12:00–12:50",
            title: "Как построить ИИ стартап, заменив 70% операционки ИИ",
            speaker: "Роман Тян",
            role: "Основатель, Wegosty.ru, NRG Ventures",
          },
          {
            time: "13:00–13:50",
            title: "Маркетинг в IT: как продукт, данные и опыт пользователя влияют на рост",
            speaker: "Борис Андреев",
            role: "Управляющий партнёр, IT-компания Сеолит",
          },
          {
            time: "14:00–14:50",
            title: "Открытый диалог",
            speaker: "Likoris",
            role: "Видеоблогер",
          },
          {
            time: "15:00–15:50",
            title: "IT в логистике: автоматизация хаоса",
            speaker: "Виталий Омельченко",
            role: "Руководитель, ООО СИ Портал",
          },
          {
            time: "16:00–16:50",
            title: "Почему в космосе (пока) нет дата-центров",
            speaker: "Александр Токарев",
            role: "Руководитель разработки, Банк 131",
          },
          {
            time: "17:00–17:50",
            title: "Есть ли жизнь на Максе",
            speaker: "Владимир Коротких",
            role: "Ведущий инженер-программист, Коверт Таун",
          },
        ],
      },
      {
        name: "ЛЕКТОРИЙ РАЗРАБОТКИ ИГР",
        capacity: 50,
        schedule: [
          {
            time: "11:00–11:50",
            title: "Как не потерять игрока за пять минут: дизайн туториалов, которые вовлекают",
            speaker: "Роман Васильев",
            role: "UI-Artist, G5 Games",
          },
          {
            time: "12:00–12:50",
            title: "Теология вымышленных миров",
            speaker: "Андрей Бабич",
            role: "Game Designer",
          },
          {
            time: "13:00–13:50",
            title: "Когда первая визуальная новелла становится последней: о пороге входа и реальности рынка",
            speaker: "Анна Емельянова",
            role: "Level Designer, G5 Games",
          },
          {
            time: "15:00–15:50",
            title: "Немой диалог: как игра разговаривает с игроком через движение",
            speaker: "Анастасия Козлова",
            role: "2D Animator, KB Production — Союзмультфильм",
          },
          {
            time: "16:00–16:50",
            title: "QA в мобильном геймдеве: от казуальных игр до мидкора",
            speaker: "Сергей Сподрин",
            role: "QA Lead/Senior QA, Rightsoft Labs",
          },
          {
            time: "17:00–17:50",
            title: "3D и печать: диалог художника с инженером",
            speaker: "Алексей Красовский (Мастер Макет) и Никита Кондрашов (3DPR)",
          },
        ],
      },
    ],
    activities: [
      { title: "Турнир по CS2", description: "Киберспортивный турнир для участников конференции", url: "https://t.me/ambercode/571" },
      { title: "Зона нетворкинга", description: "13 столов для общения + @super_meet_bot в Telegram", url: "https://t.me/ambercode/568" },
      { title: "Арт-галерея", description: "Выставка работ участников сообщества", url: "https://t.me/ambercode/573" },
      { title: "Мастер-классы по покраске миниатюр", description: "Интерактивные воркшопы для всех желающих", url: "https://t.me/ambercode/573" },
      { title: "Фудзона", description: "Еда и напитки на территории площадки" },
    ],
  },
]

export function getConferenceBySlug(slug: string): Conference | undefined {
  return conferences.find((c) => c.slug === slug)
}
