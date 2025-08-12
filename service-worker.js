const CACHE = "pepper-slayer-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./sprites/chef_placeholder_spritesheet.png",
  "./audio/music.ogg",
  "./audio/slash.wav",
  "./audio/jump.wav",
  "./audio/collect.wav"
  // add any other js/css/images you use
];
<script>
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const base = `/${location.pathname.split('/')[1]}/`; // "/<repo>/"
    navigator.serviceWorker.register(`${base}service-worker.js`, { scope: base });
  });
}
</script>
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
