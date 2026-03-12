import "@fontsource/press-start-2p"
import { Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "@/components/theme/ThemeProvider"
import { Header } from "@/components/layout/Header"
import { BackgroundText } from "@/components/landing/BackgroundText"
import { HomePage } from "@/pages/HomePage"
import { ConferencePage } from "@/components/conference/ConferencePage"

function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-background transition-colors duration-300">
        <BackgroundText />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:slug" element={<ConferencePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App
