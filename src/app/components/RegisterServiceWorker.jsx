// src/components/RegisterServiceWorker.jsx
"use client";
import { useEffect } from "react";

export default function RegisterServiceWorker() {
    useEffect(() => {
        if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
            navigator.serviceWorker.register("/sw.js").then(() => console.log("Service Worker (PWA) registrado"));
            navigator.serviceWorker.register("/push-sw.js").then(() => console.log("Service Worker (Push) registrado"));
        }
    }, []);

    return null;
}
