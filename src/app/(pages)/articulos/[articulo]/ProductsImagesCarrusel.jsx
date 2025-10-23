import React, { useEffect, useState } from "react";

// Icons
import { Icon } from "@iconify/react";

const ProductsImagesCarrusel = ({
    articleId,
    articleName,
    articlesDescription,
    carruselRef,
    mainImage,
    images,
    handleClickAddToList,
    articlesIsInList,
}) => {
    const [imageInView, setImageInView] = useState(1);

    useEffect(() => {
        console.log(images);
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
    }, []);

    useEffect(() => {
        console.log(imageInView);
    }, [imageInView]);

    const handleClickShare = () => {
        const domain = window.location.origin;
        navigator.share({
            title: articleName,
            text: articlesDescription,
            url: `${domain}/articulos/${articleId}`,
        });
    };

    return (
        <>
            <div className="relative h-56- h-72 my-3">
                <div className="bg-white/70 absolute right-3 top-0 rounded-full">
                    <Icon icon="ion:share-outline" className="clear-start m-2 text-xl" onClick={handleClickShare} />
                </div>
                <div
                    className="container h-full w-full flex flex-shrink-0- shrink-   overflow-x-auto gap-4"
                    style={{ scrollSnapType: "x mandatory" }}
                    ref={carruselRef}
                >
                    <Image image={mainImage} />
                    {images.map((image, i) => (
                        <Image key={i} image={image} />
                    ))}
                </div>
                <div className="bg-white/70 absolute bottom-0 left-3 rounded-full">
                    {articlesIsInList ? (
                        <Icon icon="mdi:heart" className="clear-start m-2 text-xl" onClick={handleClickAddToList} />
                    ) : (
                        <Icon icon="mynaui:heart" className="clear-start m-2 text-xl" onClick={handleClickAddToList} />
                    )}
                </div>
            </div>
            <div className="flex justify-center gap-1">
                {[mainImage, ...images].map((icon, i) => (
                    <Icon
                        key={i}
                        icon={`${i + 1 == imageInView ? "ic:baseline-circle" : "material-symbols-light:circle-outline"}`}
                        className="text-xs"
                    />
                ))}
                {/* {images.map((icon, i) => (
                    <Icon key={i} icon={`${i + 1 == imageInView ? "ic:baseline-circle" : "material-symbols-light:circle-outline"}`} className="text-xs" />
                ))} */}
            </div>
        </>
    );
};

export default ProductsImagesCarrusel;

const Image = ({ image }) => {
    return (
        <div className="item flex-shrink-0  w-full h-full" style={{ scrollSnapAlign: "start" }}>
            <img className="object-contain h-full w-full" src={image} alt="" />
        </div>
    );
};
