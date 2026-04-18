const ART = String.raw`
    ___                __                ______          __
   /   |  ____ ___  / /_  ___  _____   / ____/___  ____/ /__
  / /| | / __ \`__ \/ __ \/ _ \/ ___/  / /   / __ \/ __  / _ \
 / ___ |/ / / / / / /_/ /  __/ /     / /___/ /_/ / /_/ /  __/
/_/  |_/_/ /_/ /_/_.___/\___/_/      \____/\____/\__,_/\___/
`

export function printConsoleArt(): void {
  if (typeof window === "undefined") return
  // Styled amber banner
  console.log(
    `%c${ART}`,
    "color: #F59E0B; font-family: monospace; font-size: 11px; line-height: 1.1;",
  )
  console.log(
    "%c> 7 bridges. 0 solutions. 100 ping-pong balls.",
    "color: #F59E0B; font-family: monospace; font-size: 12px; font-weight: bold;",
  )
  console.log(
    "%c  Найди все 7 мостов на сайте — узнаешь правду о розовых шариках.",
    "color: #94A3B8; font-family: monospace; font-size: 11px;",
  )
  console.log(
    "%c  Telegram: https://t.me/ambercode",
    "color: #94A3B8; font-family: monospace; font-size: 11px;",
  )
}
