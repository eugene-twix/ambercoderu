/* Amber Code service worker — static-only site. */
const VERSION = "v1"
const RUNTIME = `amber-runtime-${VERSION}`
const PRECACHE = `amber-precache-${VERSION}`
const PRECACHE_URLS = ["/", "/index.html", "/favicon.svg", "/manifest.webmanifest"]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== RUNTIME && k !== PRECACHE)
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  )
})

function isNavigation(request) {
  return request.mode === "navigate"
}

function isStaticAsset(url) {
  return /\.(?:js|css|svg|png|jpg|jpeg|webp|gif|woff2?|ttf)$/.test(url.pathname)
}

self.addEventListener("fetch", (event) => {
  const { request } = event
  if (request.method !== "GET") return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  if (isNavigation(request)) {
    // network-first for HTML to get fresh content
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone()
          caches.open(RUNTIME).then((cache) => cache.put(request, copy))
          return response
        })
        .catch(() =>
          caches
            .match(request)
            .then((cached) => cached || caches.match("/index.html")),
        ),
    )
    return
  }

  if (isStaticAsset(url)) {
    // cache-first for static assets
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached
        return fetch(request).then((response) => {
          if (response.status === 200 && response.type === "basic") {
            const copy = response.clone()
            caches.open(RUNTIME).then((cache) => cache.put(request, copy))
          }
          return response
        })
      }),
    )
  }
})
