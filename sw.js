
const CACHE_NAME = 'master-sahab-v3';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/index.tsx',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      const fetchPromise = fetch(e.request).then((networkRes) => {
        caches.open(CACHE_NAME).then((cache) => cache.put(e.request, networkRes.clone()));
        return networkRes;
      });
      return res || fetchPromise;
    }).catch(() => caches.match('/index.html'))
  );
});
