// import { zusCarruselImages } from "@/app/zustand/carrusel-images/zusCarruselImages";
import React, { useEffect, useRef, useState } from "react";

const useCarruselIMages = () => {
    const carruselRef = useRef();

    const [imageInView, setImageInView] = useState(1);

    // const carruselRef2 = useRef();

    // const { carruselImagesRef } = zusCarruselImages();

    const scrollToSnap = (index) => {
        // if (!carruselRef.current) return;
        const container = carruselRef.current;
        const items = container.children;

        if (index >= 0 && index < items.length) {
            const item = items[index];
            container.scrollTo({
                left: item.offsetLeft,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        console.log(carruselRef.current);
        const container = carruselRef.current;
        if (!container) return;
        const handleScroll = () => {
            const containerRect = container.getBoundingClientRect();
            Array.from(container.children).forEach((item, i) => {
                const rect = item.getBoundingClientRect();
                if (rect.left >= containerRect.left && rect.right <= containerRect.right) setImageInView(i + 1);
            });
        };
        container.addEventListener("scroll", handleScroll);
        return () => {
            container.removeEventListener("scroll", handleScroll);
        };
    }, [carruselRef.current]);

    // useEffect(() => {
    //     console.log(imageInView);
    // }, [imageInView]);

    return { carruselRef, imageInView, scrollToSnap };
};

export default useCarruselIMages;
