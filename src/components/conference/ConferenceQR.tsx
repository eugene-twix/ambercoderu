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
      <Card className="shadow-lg shadow-primary/20 border-primary/10">
        <CardContent className="p-6 flex flex-col items-center gap-4">
          <QRCodeSVG
            value={conference.telegramPostUrl}
            size={256}
            bgColor={qrBg}
            fgColor={qrFg}
            level="M"
            className="w-[200px] h-[200px] sm:w-[256px] sm:h-[256px]"
          />
          <p className="text-sm text-muted-foreground">Подробности в Telegram</p>
        </CardContent>
      </Card>

      <a
        href={conference.telegramPostUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonVariants({ size: "lg" }), "gap-2")}
      >
        Открыть в Telegram
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  )
}
