// import { precacheAndRoute } from "workbox-precaching";

// // Next PWA inyecta los assets aquí
// precacheAndRoute(self.__WB_MANIFEST || []);

// // import { precacheAndRoute } from "workbox-precaching";

// // Necesario para que next-pwa inyecte los assets
// // precacheAndRoute(self.__WB_MANIFEST || []);

// // self.addEventListener("push", (event) => {
// //     const data = event.data?.json() || {};

// //     const options = {
// //         body: data.body || "Sin cuerpo",
// //         icon: data.icon || "/icons/icon-192x192.png",
// //     };

// //     event.waitUntil(self.registration.showNotification(data.title || "Notificación", options));
// // });

// self.addEventListener("push", (event) => {
//     const data = event.data?.json() || {};
//     const title = data.title || "Nueva notificación";
//     const options = {
//         body: data.body,
//         icon: "/icons/icon-192x192.png",
//         badge: "/icons/icon-192x192.png",
//         data: { url: data.url || "/" },
//     };

//     event.waitUntil(self.registration.showNotification(title, options));
// });

// self.addEventListener("notificationclick", (event) => {
//     event.notification.close();
//     event.waitUntil(clients.openWindow(event.notification.data.url));
// });

// Cargar Workbox sin ES Modules
importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js");

// Precaching correcto
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

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

self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow(event.notification.data.url));
});
