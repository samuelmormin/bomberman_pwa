const cacheAssets =[
    "index.html",
    "about.html",
    "/styles/style.css",
    "/scripts/main.js",
    "/scripts/config.js",
    "/scripts/comportement.js",
    "/scripts/jquery-3.4.1.min.js",
    "/images/logo.png",
    "/images/avatar.svg",
    "/images/background.jpg",
    "/images/background.png",
    "/images/background.svg",
    "/images/Bloc-01.svg",
    "/images/bomb_sheet.png",
    "/images/bomb_sheet.svg",
    "/images/bomb.png",
    "/images/bomb.svg",
    "/images/boom.png",
    "/images/boom.svg",
    "/images/boom2.png",
    "/images/boom2.svg",
    "/images/boom3.png",
    "/images/boom3.svg",
    "/images/boom4.png",
    "/images/boom4.svg",
    "/images/breakable.svg",
    "/images/brick.svg",
    "/images/life.png",
    "/images/lives.svg",
    "/images/logo.png",
    "/images/logo.svg",
    "/images/rules.png",
    "/images/rules.svg",
    "/images/snnopPxlArt.svg",
    "/images/snoop_sheet.svg",
    "/images/tupac_sheet.svg",
    "/images/tupac.svg",
    "/images/tupacPxlArt.svg",
    "/images/icon-128x128.png",
    "/images/icon-192x192.png",
    "/images/icon-256x256.png",
    "/images/icon-384X384.png",
    "/images/icon-512x512.png"
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