const CACHE_NAME = "gunluk-takip-v1";

const ASSETS = [
  "/gunluk-takip/",
  "/gunluk-takip/index.html",
  "/gunluk-takip/manifest.json",
  "/gunluk-takip/icons/icon-192.png",
  "/gunluk-takip/icons/icon-512.png"
];

// install
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// activate
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// fetch (INSTALLABILITY İÇİN ZORUNLU)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
