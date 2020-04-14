self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/money/',
        '/money/index.html',
        '/money/index.js'
      ]);
    })
  );
});