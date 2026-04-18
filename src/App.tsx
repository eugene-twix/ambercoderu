import "@fontsource/press-start-2p"
import { useLocation } from "react-router-dom"
import { Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "@/components/theme/ThemeProvider"
import { Header } from "@/components/layout/Header"
import { BackgroundText } from "@/components/landing/BackgroundText"
import { HomePage } from "@/pages/HomePage"
import { ArchivePage } from "@/pages/ArchivePage"
import { FavoritesPage } from "@/pages/FavoritesPage"
import { ConferencePage } from "@/components/conference/ConferencePage"
import { ScrollToTop } from "@/components/ui/ScrollToTop"
import { ToastProvider } from "@/components/ui/Toast"
import { AchievementsProvider } from "@/lib/useAchievements"
import { EasterEggsContainer } from "@/components/easter-eggs/EasterEggsContainer"

function RoutedApp() {
  const location = useLocation()
  return (
    <div key={location.pathname} className="animate-fade-in">
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/:slug" element={<ConferencePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AchievementsProvider>
        <ToastProvider>
          <div className="relative min-h-screen bg-background transition-colors duration-300">
            <BackgroundText />
            <Header />
            <RoutedApp />
            <ScrollToTop />
            <EasterEggsContainer />
          </div>
        </ToastProvider>
      </AchievementsProvider>
    </ThemeProvider>
  )
}

export default App
