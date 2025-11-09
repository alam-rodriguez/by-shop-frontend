import React, { useState } from "react";

const useCoords = () => {
    const [coords, setCoords] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [accuracy, setAccuracy] = useState(null);

    const handleGetLocation = () => {
        // if (!navigator.geolocation) {
        //     setError("Tu navegador no soporta geolocalización");
        //     return;
        // }
        if (typeof window === "undefined" || !navigator.geolocation) {
            setError("Tu navegador no soporta geolocalización");
            return;
        }

        setLoading(true);
        setError(null);
        setAccuracy(null);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude, accuracy } = position.coords;
                setCoords({ lat: latitude, lng: longitude });
                setAccuracy(accuracy); // metros de precisión
                setLoading(false);
            },
            (err) => {
                console.error(err);
                setError("No se pudo obtener tu ubicación exacta");
                setLoading(false);
            },
            {
                enableHighAccuracy: true, // fuerza uso del GPS si está disponible
                timeout: 20000, // espera hasta 20s si el GPS tarda
                maximumAge: 0, // no usar caché, siempre nueva ubicación
            }
        );
    };

    return { coords, error, loading, accuracy, handleGetLocation };
};

export default useCoords;
