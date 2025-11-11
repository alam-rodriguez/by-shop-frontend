"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ImageZoom({ src, alt = "", width, height, className }) {
    const [isOpen, setIsOpen] = useState(false);
    const [size, setSize] = useState({ width: null, height: null });

    useEffect(() => {
        if (width || height) return;
        const img = new window.Image();
        img.src = src;
        img.onload = () => {
            setSize({
                width: img.naturalWidth,
                height: img.naturalHeight,
            });
        };
    }, [src, width, height]);

    const finalWidth = width ?? size.width ?? 0;
    const finalHeight = height ?? size.height ?? 0;

    return (
        <>
            {/* Imagen pequeña */}
            <div className="flex justify-center mt-6">
                <Image
                    src={src}
                    alt={alt}
                    width={finalWidth}
                    height={finalHeight}
                    className={`cursor-pointer transition-transform hover:scale-105 ${className || ""}`}
                    priority
                    onClick={() => setIsOpen(true)}
                />
            </div>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
                    <Image
                        src={src}
                        alt={alt}
                        width={finalWidth}
                        height={finalHeight}
                        className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-lg transition-transform hover:scale-105"
                        priority
                    />
                </div>
            )}
        </>
    );
}
