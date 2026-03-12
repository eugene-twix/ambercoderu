import { HeroDescription } from "@/components/landing/HeroDescription"
import { QRSection } from "@/components/landing/QRSection"

export function HomePage() {
  return (
    <main className="relative z-10 flex flex-col items-center justify-center gap-6 px-4 py-16 sm:py-24">
      <HeroDescription />
      <QRSection />
    </main>
  )
}
