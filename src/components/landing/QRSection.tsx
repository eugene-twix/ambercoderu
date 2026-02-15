import { QRCodeSVG } from "qrcode.react"
import { ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import { useTheme } from "@/components/theme/ThemeProvider"
import { cn } from "@/lib/utils"

const TELEGRAM_URL = "https://t.me/ambercode"

export function QRSection() {
  const { theme } = useTheme()

  const qrBg = theme === "dark" ? "#1E293B" : "#EDE7DB"
  const qrFg = theme === "dark" ? "#F59E0B" : "#C4862A"

  return (
    <div className="flex flex-col items-center gap-6">
      <Card className="shadow-lg shadow-primary/20 border-primary/10">
        <CardContent className="p-6 flex flex-col items-center gap-4">
          <QRCodeSVG
            value={TELEGRAM_URL}
            size={256}
            bgColor={qrBg}
            fgColor={qrFg}
            level="M"
            className="w-[200px] h-[200px] sm:w-[256px] sm:h-[256px]"
          />
          <p className="text-sm text-muted-foreground">Scan to join</p>
        </CardContent>
      </Card>

      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonVariants({ size: "lg" }), "gap-2")}
      >
        Open in Telegram
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  )
}
