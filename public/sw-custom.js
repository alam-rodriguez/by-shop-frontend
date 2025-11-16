// Precaching (Workbox lo inyecta automáticamente)
self.__WB_DISABLE_DEV_LOGS = true;

self.addEventListener("install", () => {
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
});

// PUSH notifications
self.addEventListener("push", (event) => {
    const data = event.data?.json() || {};

    event.waitUntil(
        self.registration.showNotification(data.title || "Nueva notificación", {
            body: data.body,
            icon: "/icons/icon-192x192.png",
            badge: "/icons/icon-192x192.png",
            data: { url: data.url || "/" },
        })
    );
});

// Click en notificación
self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow(event.notification.data.url));
});
