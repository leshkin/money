var urlsToCache = [
  'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
  'https://cdn.jsdelivr.net/npm/bulma@0.8.2/css/bulma.min.css',
  '/index.html',
  '/index.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('cache-v1')
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});