const CACHE_NAME = "gunluk-takip-v1";

const STATIC_ASSETS = [
  "/gunluk-takip/",
  "/gunluk-takip/index.html",
  "/gunluk-takip/manifest.json",

  // ikonlar
  "/gunluk-takip/icons/icon-192.png",
  "/gunluk-takip/icons/icon-512.png"
];

// INSTALL
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// ACTIVATE
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// FETCH
self.addEventListener("fetch", event => {
  const request = event.request;

  // Manifest ve ikonlar her zaman networkten gelsin
  if (
    request.url.includes("manifest.json") ||
    request.url.includes("/icons/")
  ) {
    return;
  }

  event.respondWith(
    caches.match(request).then(response => {
      return response || fetch(request);
    })
  );
});
