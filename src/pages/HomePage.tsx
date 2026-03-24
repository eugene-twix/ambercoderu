import { BackgroundText } from "@/components/landing/BackgroundText"
import { HeroDescription } from "@/components/landing/HeroDescription"
import { UpcomingEvent } from "@/components/landing/UpcomingEvent"
import { QRSection } from "@/components/landing/QRSection"

export function HomePage() {
  return (
    <>
      <BackgroundText />
      <main className="relative z-10 flex flex-col items-center justify-center gap-6 px-4 py-16 sm:py-24">
        <HeroDescription />
        <UpcomingEvent />
        <QRSection />
      </main>
    </>
  )
}
