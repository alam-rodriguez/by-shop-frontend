"use client";

import React, { useEffect, useState } from "react";

// Zustand
import appSettings from "@/app/zustand/app/zusApp";

const Promociones = () => {
    const { promotions, promotionOnView, setPromotionOnView } = appSettings();

    const changeImage = (side) => {
        const indexPromocion = promotions.findIndex((promocion) => promocion.id === promotionOnView.id);
        let promotion = promotions[indexPromocion + 1] ? promotions[indexPromocion + 1] : promotions[0];
        if (side == 1) promotion = promotions[indexPromocion + 1] ? promotions[indexPromocion + 1] : promotions[0];
        if (side == 2) promotion = promotions[indexPromocion - 1] ? promotions[indexPromocion - 1] : promotions[promotions.length - 1];
        setPromotionOnView(promotion);
    };

    useEffect(() => {
        // setPromotionOnView(promotions[0]);
        // const timeOut = changerPromotion();
        const timeOut = setTimeout(changeImage, 5000);

        return () => {
            clearTimeout(timeOut);
        };
    }, [promotionOnView]);

    let startX = 0; // Coordenada inicial en X
    let startY = 0; // Coordenada inicial en Y
    const handleTouchStart = (e) => {
        startX = e.touches[0].clientX; // Guardar posición inicial en X
        startY = e.touches[0].clientY; // Guardar posición inicial en Y
    };
    const handleTouchEnd = (e) => {
        const endX = e.changedTouches[0].clientX; // Posición final en X
        const endY = e.changedTouches[0].clientY; // Posición final en Y

        const diffX = endX - startX; // Diferencia en X
        const diffY = endY - startY; // Diferencia en Y

        // Verificar si el gesto es horizontal y suficientemente grande
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) changeImage(1);
            else changeImage(2);
        }
    };

    return (
        <section className="w-full min-h-96">
            {promotionOnView && (
                <img
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    className="w-full min-h-96 object-cover flex"
                    src={promotionOnView.image}
                    onClick={() => console.log(promotionOnView.link)}
                />
            )}
        </section>
    );
};

export default Promociones;
