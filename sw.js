// Service Worker for Phonebook PWA
// Enables offline functionality and caching

const CACHE_NAME = 'phonebook-v1';
const urlsToCache = [
  '/Phonebook/',
  '/Phonebook/index.html',
  '/Phonebook/manifest.json',
  '/Phonebook/sw.js'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Service Worker: Caching app shell');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - network first, then cache
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache successful responses
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        // Cache it
        if (event.request.method === 'GET') {
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }

        return response;
      })
      .catch(() => {
        // Network request failed, try to return from cache
        return caches.match(event.request).then(response => {
          if (response) {
            console.log('Service Worker: Serving from cache:', event.request.url);
            return response;
          }
          // Return offline page if available
          if (event.request.destination === 'document') {
            return caches.match('/Phonebook/index.html');
          }
        });
      })
  );
});
