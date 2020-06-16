const cacheAssets =[
    "index.html",
    "about.html",
    "/styles/style.css",
    "/scripts/main.js",
    "/scripts/config.js",
    "/scripts/comportement.js",
    "/scripts/jquery-3.4.1.min.js"
    ];

const cacheName='bmcache';

self.addEventListener('install',(e) => {
    console.log('service worker: installed');
    e.waitUntil (
    caches
    .open(cacheName)
    .then(cache => {
    console.log('service worker: caching files');
    cache.addAll(cacheAssets);
    })
    .then(()=> self.skipWaiting())
    )
    });

// lors de l'activation du service worker nettoyage des caches
self.addEventListener('activate',(e) => {
console.log('service worker: activated');
e.waitUntil(
caches.keys().then(cacheNames => {
return Promise.all(
cacheNames.map(cache => {
if (cache !== cacheName) {
// si on change le nom du chaque permet de supprimer les anciens
console.log('Service Worker : clearing old cache');
return caches.delete(cache)
}
})
);
})
);
});

// call Fetch event
self.addEventListener('fetch',e => {
    console.log('Service Worker: fetching');
    e.respondWith (
    // on va repondre avec les elements du cache
    fetch(e.request).catch(() => caches.match(e.request))
    )
    });