import type { ReactNode, CSSProperties } from "react"
import { useInView } from "@/lib/useInView"
import { cn } from "@/lib/utils"

interface Props {
  children: ReactNode
  className?: string
  delayMs?: number
  as?: "div" | "section" | "article"
}

export function ScrollReveal({
  children,
  className,
  delayMs = 0,
  as = "div",
}: Props) {
  const { ref, inView } = useInView<HTMLElement>()
  const Tag = as as "div"
  const style: CSSProperties | undefined = delayMs
    ? { animationDelay: `${delayMs}ms` }
    : undefined

  return (
    <Tag
      ref={ref as never}
      style={style}
      className={cn(
        "w-full flex flex-col items-center transition-opacity",
        inView ? "animate-rise" : "opacity-0",
        className,
      )}
    >
      {children}
    </Tag>
  )
}
