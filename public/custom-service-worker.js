/* eslint-disable no-undef */
/* eslint-env serviceworker */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.routing.registerRoute(
  'http://localhost:30001',
  workbox.strategies.staleWhileRevalidate()
)

workbox.routing.registerRoute(
  /\.(?:js|css|html)$/,
  workbox.strategies.networkFirst(),
)
workbox.routing.registerRoute(
  'http://localhost:30001',
  workbox.strategies.networkFirst()
)

workbox.routing.registerRoute(
  new RegExp('https://randomuser.me/api'),
  workbox.strategies.staleWhileRevalidate()
)

/*
workbox.routing.registerRoute(
  new RegExp('https://randomuser.me/api'),
  workbox.strategies.cacheFirst()
)
*/