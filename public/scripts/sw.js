'use strict'
const CACHE_NAME = 'cache-bonchemin';
// The files we want to cache
const resourceList = [
'/',
'index.html',
'/css/style.css',
'/scripts/comportement.js',
'/scripts/config.js',
'/meta/touch/icon-128x128.png',
'/meta/touch/icon-192x192.png',
'/meta/touch/icon-256x256.png',
'/meta/touch/icon-384x384.png',
'/meta/touch/icon-512x512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(caches.open(CACHE_NAME).then(cache => {
    return cache.addAll(resourceList);
    }));
});

function addToCache(cacheName, resourceList) {
    caches.open(cacheName).then(cache => {
    return cache.addAll(resourceList);
    });
}
self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request).then(response => {
    return response || fetch(event.request);
    }));
});