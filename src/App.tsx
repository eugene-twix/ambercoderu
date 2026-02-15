import "@fontsource/press-start-2p"
import { ThemeProvider } from "@/components/theme/ThemeProvider"
import { Header } from "@/components/layout/Header"
import { BackgroundText } from "@/components/landing/BackgroundText"
import { HeroDescription } from "@/components/landing/HeroDescription"
import { QRSection } from "@/components/landing/QRSection"

function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-background transition-colors duration-300">
        <BackgroundText />
        <Header />
        <main className="relative z-10 flex flex-col items-center justify-center gap-6 px-4 py-16 sm:py-24">
          <HeroDescription />
          <QRSection />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
