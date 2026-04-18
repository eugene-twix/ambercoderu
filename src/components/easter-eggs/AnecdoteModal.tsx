import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import { PingPongConfetti } from "./PingPongConfetti"

const ANECDOTE_PARAGRAPHS: string[] = [
  "Жил-был мальчик. Ходил в детский сад. Мама у него была добрая и однажды сказала:",
  "— Сынок, если будешь себя хорошо вести, то куплю тебе, что захочешь.",
  "Мальчик не шалил, вёл себя примерно. Наконец, мама у него спрашивает, что он хочет. Сын отвечает:",
  "— Мама, купи мне сто розовых шариков для пинг-понга!",
  "Мама купила.",
  "Вот сынок пошёл в школу. Первые классы учился неплохо, потом сдал совсем. Тройки пошли. Даже двойки. Вот мама и говорит:",
  "— Сынок! Закончишь школу с золотой медалью — куплю всё, что захочешь.",
  "И он взялся за ум. На уроках не отвлекался, всегда искал дополнительный материал и закончил-таки школу с золотой медалью. Мама нарадоваться не могла, а сын ей и говорит:",
  "— Мама, ты мне обещала? Купи мне сто розовых шариков для пинг-понга!",
  "Мама удивилась. Но пришлось купить.",
  "А сын начал балду гонять. На улице весь день. А в армию мать его отдавать не хочет. Вот и говорит ему:",
  "— Сынок, если поступишь в университет, то куплю тебе всё, что захочешь!",
  "И началось. Парень стал ходить на подкурсы, штудировать учебники, ходил к преподавателю заниматься.",
  "Поступил. Не без золотой медали. Стал студентом и говорит маме:",
  "— Мама, купи мне сто розовых шариков для пинг-понга!",
  "У мамы шок. Но делать нечего — пришлось купить.",
  "А сын познал студенческую жизнь. Пиво, девки. Халява. Мать про это узнала и говорит:",
  "— Сына! Возьмись за ум! Ещё пара курсов и всё! Вот тебе моё обещание: если получишь красный диплом, то я куплю, что ты захочешь! Но ты постарайся.",
  "И сына будто подменили. Он посещал все лекции, отвечал на каждом семинаре, выступал на конференциях. Сам ректор с ним ручкался. Закончил он университет и получил красный диплом и рекомендацию в аспирантуру. Но рекомендацией не воспользовался, а просто во время речи на вручении дипломов попросил маму:",
  "— Мама, купи мне ещё сто розовых шариков для пинг-понга.",
  "Мама в обмороке. Еле привели в чувство. Но пришлось купить сыну то, что он просил.",
  "И спустя несколько лет этот молодой человек, специалист одной крупной иностранной фирмы, переходит дорогу — и его сбивает Хаммер. Хаммер разбит. Специалист — в коме. Лежит в больнице. Над ним рыдает мать:",
  "— Сынок! Очнись! Если хоть один глазик откроешь — куплю, что захочешь!",
  "И вдруг! Сын содрогнулся, сделал усилие и открыл правый глаз!",
  "— Сынок!",
  "— Мама… Я… Всё слышал… Купи… 100 розовых шариков… Для пинг-понга…",
  "Мама в истерике:",
  "— Хорошо, сынок! Куплю тебе эти шарики! Только скажи, для чего тебе всю жизнь нужны были шарики для пинг-понга?!",
  "Сын делает невероятное усилие и открывает левый глаз. Дрожит и говорит:",
  "— Мама, всю жизнь эти розовые шарики для пинг-понга мне нужны были для того, чтобы…",
  "И умирает.",
]

interface AnecdoteModalProps {
  open: boolean
  onClose: () => void
}

export function AnecdoteModal({ open, onClose }: AnecdoteModalProps) {
  const [revealPunchline, setRevealPunchline] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) {
      setRevealPunchline(false)
      return
    }
    const original = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeButtonRef.current?.focus()

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = original
      document.removeEventListener("keydown", onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <>
      <PingPongConfetti trigger={open} />
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 animate-fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="anecdote-title"
      >
        <button
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
          className="absolute inset-0 cursor-default bg-background/85 backdrop-blur-sm"
        />

        <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-xl border-2 border-primary/40 bg-card shadow-2xl shadow-primary/20 animate-scale-in flex flex-col">
          <div className="flex items-start justify-between gap-3 border-b border-border/60 px-5 py-4 bg-primary/5">
            <div className="flex-1">
              <p
                className="text-[10px] sm:text-xs text-primary tracking-wider"
                style={{ fontFamily: "'Press Start 2P', cursive" }}
              >
                Леонард Эйлер
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                передаёт тебе анекдот
              </p>
            </div>
            <BridgesGraph />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Закрыть анекдот"
              className="flex h-8 w-8 flex-none items-center justify-center rounded-md text-muted-foreground hover:text-primary hover:bg-accent transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="overflow-y-auto px-5 py-5 scrollbar-thin">
            <h2
              id="anecdote-title"
              className="mb-4 text-center text-sm text-primary"
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            >
              100 розовых шариков
            </h2>
            <div className="space-y-3 text-[15px] leading-relaxed text-foreground/90">
              {ANECDOTE_PARAGRAPHS.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
              {!revealPunchline ? (
                <button
                  type="button"
                  onClick={() => setRevealPunchline(true)}
                  className="w-full text-left text-sm font-medium text-primary hover:underline cursor-pointer"
                >
                  Так для чего они были нужны? →
                </button>
              ) : (
                <p className="text-sm italic text-foreground/85 animate-fade-in">
                  Этого никто не узнает. Как и рассказ про вагон метро или
                  последний день в спортивном лагере…
                </p>
              )}
            </div>

            <p className="mt-4 text-center text-[11px] text-muted-foreground italic">
              Курица из Мафии оценила бы эту пасхалку.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

function BridgesGraph() {
  return (
    <svg
      viewBox="0 0 120 80"
      aria-hidden="true"
      className="hidden sm:block h-14 w-20 flex-none opacity-90"
    >
      {/* 7 bridges of Königsberg — edges */}
      <g stroke="currentColor" strokeWidth="1.5" className="text-primary/70" fill="none">
        {/* A (top) — B (center) : 2 edges */}
        <path d="M30 15 Q 45 25 55 40" />
        <path d="M50 15 Q 55 28 60 40" />
        {/* A (top) — D (right) : 1 edge */}
        <path d="M55 15 Q 80 20 95 40" />
        {/* C (bottom) — B (center) : 2 edges */}
        <path d="M30 65 Q 45 55 55 40" />
        <path d="M50 65 Q 55 52 60 40" />
        {/* C (bottom) — D (right) : 1 edge */}
        <path d="M55 65 Q 80 60 95 40" />
        {/* B (center) — D (right) : 1 edge */}
        <path d="M65 40 L 90 40" />
      </g>
      {/* Vertices: A, B (center-left), D (right), C */}
      <g fill="currentColor" className="text-primary">
        <circle cx="40" cy="14" r="3.2" />
        <circle cx="60" cy="40" r="3.2" />
        <circle cx="95" cy="40" r="3.2" />
        <circle cx="40" cy="66" r="3.2" />
      </g>
    </svg>
  )
}
