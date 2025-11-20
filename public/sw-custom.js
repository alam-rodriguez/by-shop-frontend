// self.addEventListener("push", (event) => {
//     const data = event.data?.json() || {};
//     event.waitUntil(
//         self.registration.showNotification(data.title, {
//             body: data.body,
//             icon: "/icon-192x192.png",
//         })
//     );
// });

self.addEventListener("push", (event) => {
    let data = {};

    try {
        data = event.data?.json() || {};
    } catch (e) {
        console.error("Error parsing push data", e);
    }

    const title = data.title || "Notificación";
    const body = data.body || "";
    const urlToOpen = data.url || "/"; // 👈 la URL a abrir cuando se haga click

    const options = {
        body,
        icon: "/icon-192x192.png",
        badge: "/icon-72x72.png",
        data: { url: urlToOpen }, // 👈 importante para el click
        vibrate: [100, 50, 100],
        requireInteraction: false, // la notificación se cierra sola
        actions: [
            {
                action: "open-app",
                title: "Abrir",
            },
        ],
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

// 👉 Manejo del click en la notificación
self.addEventListener("notificationclick", (event) => {
    event.notification.close();

    const url = event.notification.data?.url || "/";

    event.waitUntil(
        clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
            // Si la app ya está abierta, solo enfócala
            for (const client of clientList) {
                if (client.url.includes(self.location.origin)) {
                    client.focus();
                    client.navigate(url); // opcional: para llevarlo a la ruta de la notificación
                    return;
                }
            }

            // Si no está abierta, abre una nueva pestaña
            return clients.openWindow(url);
        })
    );
});
