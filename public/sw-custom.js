import { precacheAndRoute } from "workbox-precaching";

// Necesario para que next-pwa inyecte los assets
precacheAndRoute(self.__WB_MANIFEST || []);

// self.addEventListener("push", (event) => {
//     const data = event.data?.json() || {};

//     const options = {
//         body: data.body || "Sin cuerpo",
//         icon: data.icon || "/icons/icon-192x192.png",
//     };

//     event.waitUntil(self.registration.showNotification(data.title || "Notificación", options));
// });

self.addEventListener("push", (event) => {
    const data = event.data?.json() || {};
    const title = data.title || "Nueva notificación";
    const options = {
        body: data.body,
        icon: "/icons/icon-192x192.png",
        badge: "/icons/icon-192x192.png",
        data: { url: data.url || "/" },
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow(event.notification.data.url));
});
