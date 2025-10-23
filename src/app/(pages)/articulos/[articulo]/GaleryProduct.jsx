import React from "react";

const GaleryProduct = ({ images }) => {
    if (images.length === 0) return <></>;
    return (
        <div className="m-4">
            <p className="text-xl font-semibold mb-2">Galera de imagenes del producto</p>
            <div className="flex flex-col gap-3">
                {images.map((image, i) => (
                    <img key={i} className="w-full h-80 object-cover" src={image} alt="" />
                ))}
            </div>
        </div>
    );
};

export default GaleryProduct;
