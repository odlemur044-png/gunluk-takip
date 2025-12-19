const CACHE_NAME = 'gunluk-takip-v1';
const FILES_TO_CACHE = [
  './',
  'index.html',
  'manifest1.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});


