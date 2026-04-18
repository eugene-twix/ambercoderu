import { HeroDescription } from "@/components/landing/HeroDescription"
import { UpcomingEvent } from "@/components/landing/UpcomingEvent"
import { QRSection } from "@/components/landing/QRSection"
import { CommunityActivities } from "@/components/landing/CommunityActivities"
import { PastEventsArchive } from "@/components/events/PastEventsArchive"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { EulerBridges } from "@/components/easter-eggs/EulerBridges"

export function HomePage() {
  return (
    <main className="relative z-10 flex flex-col items-center justify-center gap-10 px-4 py-16 sm:py-24">
      <HeroDescription />
      <ScrollReveal delayMs={100}>
        <UpcomingEvent />
      </ScrollReveal>
      <ScrollReveal delayMs={200}>
        <CommunityActivities />
      </ScrollReveal>
      <ScrollReveal delayMs={300}>
        <PastEventsArchive />
      </ScrollReveal>
      <ScrollReveal delayMs={400}>
        <QRSection />
      </ScrollReveal>
      <EulerBridges />
    </main>
  )
}
