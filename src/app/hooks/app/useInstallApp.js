// React
import React, { useEffect, useState } from "react";

// Alerts
import { toast } from "sonner";

const useInstallApp = () => {
    const [promptEvent, setPromptEvent] = useState(null);

    useEffect(() => {
        // Captura el evento cuando el navegador detecta que puede instalar la PWA
        const handler = (e) => {
            e.preventDefault();
            setPromptEvent(e);
        };

        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    const handleInstall = async () => {
        if (!promptEvent) {
            // alert("La app ya está instalada o no es instalable en este momento.");
            toast.info("La app ya está instalada.");
            return;
        }

        promptEvent.prompt();
        const { outcome } = await promptEvent.userChoice;
        if (outcome === "accepted") {
            toast.success("App instalada");
            console.log("✅ Usuario aceptó instalar la app");
        } else {
            console.log("❌ Usuario rechazó instalar la app");
        }
        setPromptEvent(null);
    };

    return { handleInstall };
};

export default useInstallApp;
