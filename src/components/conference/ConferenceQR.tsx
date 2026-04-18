import { QRCodeSVG } from "qrcode.react"
import { ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import { useTheme } from "@/components/theme/ThemeProvider"
import { cn } from "@/lib/utils"
import type { Conference } from "@/data/conferences"

export function ConferenceQR({ conference }: { conference: Conference }) {
  const { theme } = useTheme()

  const qrBg = theme === "dark" ? "#1E293B" : "#EDE7DB"
  const qrFg = theme === "dark" ? "#F59E0B" : "#C4862A"

  return (
    <div className="flex flex-col items-center gap-6">
      <Card className="group relative overflow-hidden border-primary/20 shadow-xl shadow-primary/15 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-primary/30 hover:border-primary/50">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -left-16 h-40 w-40 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-40"
          style={{ background: "radial-gradient(closest-side, var(--primary), transparent)" }}
        />
        <CardContent className="relative p-4 sm:p-6 flex flex-col items-center gap-4">
          <div className="rounded-lg p-2 bg-background/40 ring-1 ring-primary/10 transition-transform duration-500 group-hover:scale-[1.02]">
            <QRCodeSVG
              value={conference.telegramPostUrl}
              size={256}
              bgColor={qrBg}
              fgColor={qrFg}
              level="M"
              className="w-[200px] h-[200px] sm:w-[256px] sm:h-[256px]"
            />
          </div>
          <p className="text-sm text-muted-foreground">Подробности в Telegram</p>
        </CardContent>
      </Card>

      <a
        href={conference.telegramPostUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          buttonVariants({ size: "lg" }),
          "group gap-2 transition-transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30",
        )}
      >
        Открыть в Telegram
        <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  )
}
