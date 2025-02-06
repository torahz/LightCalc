self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('calc-ilum-v1').then((cache) => {
      return cache.addAll([
        'index.html',
        'manifest.json',
        'icon-192.png',  // Atualize o nome do arquivo conforme seus ícones
        'icon-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});