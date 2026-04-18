import { useEffect, useRef } from "react"

interface Drop {
  x: number
  y: number
  vy: number
  r: number
  rot: number
  vrot: number
  hue: number
}

interface AmberRainProps {
  trigger: unknown
}

const DURATION_MS = 8000
const SPAWN_MS = 6500
const SPAWN_PER_TICK = 3

export function AmberRain({ trigger }: AmberRainProps) {
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

    const drops: Drop[] = []
    const started = performance.now()
    let raf = 0

    function spawn() {
      for (let i = 0; i < SPAWN_PER_TICK; i++) {
        drops.push({
          x: Math.random() * window.innerWidth,
          y: -20,
          vy: 3 + Math.random() * 4,
          r: 5 + Math.random() * 6,
          rot: Math.random() * Math.PI,
          vrot: (Math.random() - 0.5) * 0.04,
          hue: 38 + Math.random() * 8,
        })
      }
    }

    function drawDrop(d: Drop, alpha: number) {
      ctx!.save()
      ctx!.translate(d.x, d.y)
      ctx!.rotate(d.rot)
      ctx!.globalAlpha = alpha
      const grad = ctx!.createRadialGradient(-d.r * 0.3, -d.r * 0.3, d.r * 0.1, 0, 0, d.r)
      grad.addColorStop(0, `hsl(${d.hue}, 100%, 82%)`)
      grad.addColorStop(0.55, `hsl(${d.hue}, 95%, 55%)`)
      grad.addColorStop(1, `hsl(${d.hue - 4}, 80%, 32%)`)
      ctx!.beginPath()
      ctx!.ellipse(0, 0, d.r * 0.7, d.r * 1.1, 0, 0, Math.PI * 2)
      ctx!.fillStyle = grad
      ctx!.fill()
      // subtle amber shine
      ctx!.beginPath()
      ctx!.ellipse(-d.r * 0.25, -d.r * 0.35, d.r * 0.18, d.r * 0.35, 0, 0, Math.PI * 2)
      ctx!.fillStyle = `rgba(255, 240, 200, ${0.45 * alpha})`
      ctx!.fill()
      ctx!.restore()
    }

    function frame(now: number) {
      const elapsed = now - started
      if (elapsed < SPAWN_MS) spawn()

      ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight)

      const fadeStart = DURATION_MS - 1500
      const globalAlpha = elapsed > fadeStart ? Math.max(0, 1 - (elapsed - fadeStart) / 1500) : 1

      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i]
        d.y += d.vy
        d.rot += d.vrot
        if (d.y - d.r > window.innerHeight + 40) {
          drops.splice(i, 1)
          continue
        }
        drawDrop(d, globalAlpha)
      }

      if (elapsed < DURATION_MS && (drops.length > 0 || elapsed < SPAWN_MS)) {
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
      className="pointer-events-none fixed inset-0 z-[55]"
    />
  )
}
