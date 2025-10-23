"use client";

import React, { useEffect, useState } from "react";

// Icons
import { Icon } from "@iconify/react";

// Requests
import { useGetArticleFeaturesSpecs, useGetArticleMeasurements, useGetArticleSpecs } from "@/app/hooks/request/articles/requestsArticles";
import { useGetArticleHighlightedParagraphs } from "@/app/hooks/request/articles/requestsArticlesHighlightedParagraphs";

const ProductDetails = ({ idArticulo, additional_details }) => {
    const { data, isLoading, isError } = useGetArticleSpecs(idArticulo);
    const { data: featuresSpecs, isLoading: isLoadingFeaturesSpecs } = useGetArticleFeaturesSpecs(idArticulo);
    const { data: measurements, isLoading: isLoadingMeasurements } = useGetArticleMeasurements(idArticulo);
    const { data: highlightedParagraphs } = useGetArticleHighlightedParagraphs(idArticulo);

    useEffect(() => {
        console.warn(highlightedParagraphs);
    }, [highlightedParagraphs]);

    // TODO: TENGO QUE TRAER LOS ARTICULOS DESTACADOS DE LA APP
    // useEffect(() => {
    //     console.log(additional_details);
    //     if (data) console.log(data.length);
    //     console.warn(data);
    // }, [data]);

    // useEffect(() => {
    //     console.warn(measurements);
    // }, [measurements]);

    // useEffect(() => {
    //     if (featuresSpecs) console.log(featuresSpecs.length);
    //     console.warn(featuresSpecs);
    // }, [featuresSpecs]);

    const [view, setview] = useState(false);
    const handleClickView = () => setview(!view);

    return (
        <div className="m-4">
            <p className="text-xl font-semibold mb-2">Detalles del producto</p>
            {!isLoadingMeasurements && measurements.length > 0 && <Item title="Medidas" content={measurements} />}
            {!isLoadingFeaturesSpecs && featuresSpecs.length > 0 && <Item title="Los mas destacados" content={featuresSpecs} />}
            <Item title="Epecificaciones del producto" content={data} />
            {/* <Item title="Los mas destacados" /> */}
            <Item title="Detalles adicionales" paragraphsList={highlightedParagraphs} paragraph={additional_details} />
            {/* <div className="flex justify-between py-5" onClick={handleClickView}>
                <p className="text-base font-semibold ">Los mas baratos</p>
                <Icon icon="bitcoin-icons:caret-down-filled" className="text-xl" />
            </div>
            <div className={`${!view ? "h-0" : ""} overflow-hidden`}>
                <div className="flex flex-col gap-4">
                    <div className="flex">
                        <p className="w-2/5 font-semibold text-sm">Marca</p>
                        <p className="w-3/5 text-sm">TIANZITY</p>
                    </div>
                    <div className="flex ">
                        <p className="w-2/5 font-semibold text-sm">Marca</p>
                        <p className="w-3/5 text-sm">TIANZITY</p>
                    </div>
                    <div className="flex ">
                        <p className="w-2/5 font-semibold text-sm">Marca</p>
                        <p className="w-3/5 text-sm">TIANZITY</p>
                    </div>
                    <div className="flex ">
                        <p className="w-2/5 font-semibold text-sm">Marca</p>
                        <p className="w-3/5 text-sm">TIANZITY</p>
                    </div>
                    <div className="flex ">
                        <p className="w-2/5 font-semibold text-sm">Marca</p>
                        <p className="w-3/5 text-sm">TIANZITY</p>
                    </div>
                    <div className="flex ">
                        <p className="w-2/5 font-semibold text-sm">Marca</p>
                        <p className="w-3/5 text-sm">TIANZITY</p>
                    </div>
                </div>
            </div> */}
            {/* <hr />
            <div className="flex justify-between py-5">
                <p className="text-base font-semibold ">Los mas baratos</p>
                <Icon icon="bitcoin-icons:caret-down-filled" className="text-xl" />
            </div>
            <hr />
            <div className="flex justify-between py-5">
                <p className="text-base font-semibold ">Los mas baratos</p>
                <Icon icon="bitcoin-icons:caret-down-filled" className="text-xl" />
            </div> */}
        </div>
    );
};

export default ProductDetails;

const Item = ({ title, content = [], paragraphsList = [], paragraph }) => {
    const [view, setview] = useState(null);

    const handleClickView = () => setview(!view);

    return (
        <>
            <hr />
            <div className="flex justify-between py-5" onClick={handleClickView}>
                <p className="text-base font-semibold ">{title}</p>
                <Icon
                    icon="bitcoin-icons:caret-down-filled"
                    className="text-xl"
                    style={{ transform: `rotate(${!view ? 0 : 180}deg)`, transition: "all .3s" }}
                />
            </div>
            <div
                className={`${view ? "h-0- " : ""} overflow-hidden article-view-content`}
                style={{ animationName: view != null ? (view ? "article-view-content-animation" : "article-view-content-animation-reverse") : null }}
            >
                <div className="flex flex-col gap-4">
                    {content.map((item) => (
                        <div className="flex h-6" key={item.id}>
                            <p className="w-2/5 font-bold text-base">{item.option}</p>
                            <p className="w-3/5 text-base font-thin">{item.value}</p>
                        </div>
                    ))}

                    {paragraphsList.map((paragraph, i) => (
                        <p key={paragraph.id} className="font-bold">
                            {i + 1} - {paragraph.paragraph}
                        </p>
                    ))}

                    {paragraph && <p>{paragraph}</p>}

                    {/* <div className="flex">
                        <p className="w-2/5 font-semibold text-sm">Marca</p>
                        <p className="w-3/5 text-sm">TIANZITY</p>
                    </div>
                    <div className="flex ">
                        <p className="w-2/5 font-semibold text-sm">Marca</p>
                        <p className="w-3/5 text-sm">TIANZITY</p>
                    </div>
                    <div className="flex ">
                        <p className="w-2/5 font-semibold text-sm">Marca</p>
                        <p className="w-3/5 text-sm">TIANZITY</p>
                    </div>
                    <div className="flex ">
                        <p className="w-2/5 font-semibold text-sm">Marca</p>
                        <p className="w-3/5 text-sm">TIANZITY</p>
                    </div>
                    <div className="flex ">
                        <p className="w-2/5 font-semibold text-sm">Marca</p>
                        <p className="w-3/5 text-sm">TIANZITY</p>
                    </div>
                    <div className="flex ">
                        <p className="w-2/5 font-semibold text-sm">Marca</p>
                        <p className="w-3/5 text-sm">TIANZITY</p>
                    </div> */}
                </div>
            </div>
        </>
    );
};
