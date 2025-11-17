/* eslint-disable no-undef */

// Workbox (inyectado por next-pwa)
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

// PUSH notifications
self.addEventListener("push", (event) => {
    const data = event.data?.json() || {};

    const title = data.title || "Nueva notificación";
    const options = {
        body: data.body || "Tienes un nuevo mensaje",
        icon: "/icons/icon-192x192.png",
        badge: "/icons/icon-192x192.png",
        data: { url: data.url || "/" },
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

// Notification click
self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow(event.notification.data.url));
});
