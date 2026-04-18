import { useEffect, useRef } from "react"

interface Ball {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  hue: number
  rot: number
  vrot: number
  alpha: number
}

const BALL_COUNT = 100
const GRAVITY = 0.22
const DURATION_MS = 6500

interface PingPongConfettiProps {
  trigger: unknown
}

export function PingPongConfetti({ trigger }: PingPongConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!trigger) return
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener("resize", resize)

    const balls: Ball[] = Array.from({ length: BALL_COUNT }, () => ({
      x: window.innerWidth / 2 + (Math.random() - 0.5) * window.innerWidth * 0.4,
      y: window.innerHeight * 0.25 + Math.random() * 60,
      vx: (Math.random() - 0.5) * 8,
      vy: -Math.random() * 6 - 2,
      r: 7 + Math.random() * 4,
      hue: 340 + Math.random() * 20, // pinks
      rot: Math.random() * Math.PI * 2,
      vrot: (Math.random() - 0.5) * 0.1,
      alpha: 1,
    }))

    const started = performance.now()
    let raf = 0

    function frame(now: number) {
      const elapsed = now - started
      const fadeStart = DURATION_MS - 1500
      const fade = elapsed > fadeStart ? Math.max(0, 1 - (elapsed - fadeStart) / 1500) : 1

      ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight)

      for (const b of balls) {
        b.vy += GRAVITY
        b.x += b.vx
        b.y += b.vy
        b.rot += b.vrot
        b.alpha = fade

        // Shiny pink ping-pong ball with highlight
        ctx!.save()
        ctx!.globalAlpha = b.alpha
        const grad = ctx!.createRadialGradient(
          b.x - b.r * 0.3,
          b.y - b.r * 0.3,
          b.r * 0.1,
          b.x,
          b.y,
          b.r,
        )
        grad.addColorStop(0, `hsl(${b.hue}, 100%, 92%)`)
        grad.addColorStop(0.5, `hsl(${b.hue}, 85%, 75%)`)
        grad.addColorStop(1, `hsl(${b.hue}, 70%, 55%)`)
        ctx!.beginPath()
        ctx!.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx!.fillStyle = grad
        ctx!.fill()
        ctx!.restore()
      }

      if (elapsed < DURATION_MS) {
        raf = window.requestAnimationFrame(frame)
      } else {
        ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight)
      }
    }
    raf = window.requestAnimationFrame(frame)

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    }
  }, [trigger])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70]"
    />
  )
}
