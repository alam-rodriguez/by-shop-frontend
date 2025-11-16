// React
import React from "react";

// Axios
import api from "@/app/api/api";

const useSetServiceWorker = () => {
    const setServiceWorker = () => {
        if ("serviceWorker" in navigator && "PushManager" in window) {
            navigator.serviceWorker.register("/sw-custom.js").then(async (reg) => {
                console.log("Service Worker registrado ✅");

                const permission = await Notification.requestPermission();
                if (permission !== "granted") return;

                // const res = await fetch("http://localhost:3001/api/web-push-notification/public-key");
                // const { publicKey } = await res.json();

                const subscription = await reg.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(process.env.VAPID_PUBLIC_KEY),
                    // dataUser: {
                    //     user_id: id,
                    //     status: 1,
                    // },
                });

                // Envía la suscripción al backend
                // await fetch("http://localhost:3001/api/web-push-notification/subscribe", {
                //     method: "POST",
                //     body: JSON.stringify(subscription),
                //     headers: {
                //         "Content-Type": "application/json",
                //     },
                // });
                await api.post(
                    "/web-push-notification/subscribe",
                    subscription, // 👈 Axios convierte el objeto automáticamente a JSON
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
            });
        }
    };

    function urlBase64ToUint8Array(base64String) {
        const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
        const rawData = window.atob(base64);
        return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
    }

    return { setServiceWorker };
};

export default useSetServiceWorker;
