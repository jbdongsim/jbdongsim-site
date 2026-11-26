/* 재무관리 설치용 최소 서비스워커: 네트워크 그대로 사용 */
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => { e.respondWith(fetch(e.request)); });
