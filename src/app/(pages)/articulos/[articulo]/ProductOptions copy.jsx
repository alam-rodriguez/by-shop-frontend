"use client";

import React, { useEffect, useState } from "react";

// Icons
import { Icon } from "@iconify/react";

// Zustand
import { zusArticles } from "@/app/zustand/articles/zusArticles";

// Components
import Divider from "@/app/components/home/Divider";
import useApp from "@/app/hooks/app/useApp";
import { useGetArticleOptions } from "@/app/hooks/request/articles/requestsArticles";

const ProductOptions = ({ carruselRef, idArticle, colors, sizes, providers, conditions, options }) => {
    const { calcAvailableQuantities, showText } = useApp();

    const { isLoading, data } = useGetArticleOptions(idArticle);

    // useState(() => {
    //     console.log(data);
    // }, [data]);

    const {
        colorSelected,
        setColorSelected,
        sizeSelected,
        setSizeSelected,
        providerSelected,
        setProviderSelected,
        conditionSelected,
        setConditionSelected,
    } = zusArticles();

    useEffect(() => {
        setColorSelected(colors[0]);
        setSizeSelected(sizes[0]);
        setProviderSelected(providers[0]);
        setConditionSelected(conditions[0]);
    }, []);

    const scrollToSnap = (index) => {
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

    if (isLoading) return <></>;

    return (
        <div className="">
            {/* <button onClick={() => scrollToSnap(0)} className="bg-blue-500 text-white p-2 rounded-lg">
                1
            </button>
            <button onClick={() => scrollToSnap(1)} className="bg-blue-500 text-white p-2 rounded-lg">
                2
            </button>
            <button onClick={() => scrollToSnap(2)} className="bg-blue-500 text-white p-2 rounded-lg">
                3
            </button>
            <button onClick={() => scrollToSnap(3)} className="bg-blue-500 text-white p-2 rounded-lg">
                4
            </button>
            <button onClick={() => scrollToSnap(4)} className="bg-blue-500 text-white p-2 rounded-lg">
                5
            </button>
            <button onClick={() => scrollToSnap(5)} className="bg-blue-500 text-white p-2 rounded-lg">
                6
            </button>
            <button onClick={() => scrollToSnap(6)} className="bg-blue-500 text-white p-2 rounded-lg">
                7
            </button> */}

            {colors.length > 0 && (
                <Option title="Color" defaultValue={colorSelected.name}>
                    <div className="m-4 flex overflow-scroll gap-5">
                        {colors.map((color) => (
                            <div
                                key={color.id}
                                className={`h-80 w-44 min-w-44 ${
                                    colorSelected.id == color.id ? "border-4 border-blue-700" : "border border-gray-700"
                                } rounded-lg`}
                                onClick={() => {
                                    setColorSelected(color);
                                    scrollToSnap(color.image);
                                }}
                            >
                                <div className="h-1/2 w-full border border-b-gray-700 bg-gray-100 p-3">
                                    <img
                                        className="object-contain w-full h-full"
                                        src="https://th.bing.com/th?id=OIP.nvdM5sEm4DqG8oZb8nNStQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2"
                                        alt=""
                                    />
                                </div>
                                <div className="h-1/2 w-full p-2">
                                    <p className="text-lg font-semibold">{color.name}</p>
                                    <p className="flex items-start">
                                        <span>us$</span>
                                        <span className="text-2xl font-semibold">{color.priceWithOffer}</span>
                                        <span>99</span>
                                    </p>
                                    <p className="line-through text-gray-700">us${color.price}.99</p>
                                    <p className={`${color.availableQuantity <= 20 ? "text-red-700" : ""}`}>
                                        {showText(calcAvailableQuantities(color.availableQuantity), 37)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Option>
            )}
            <Divider h={1.5} mt={0} />
            {sizes.length > 0 && (
                <Option title="Tamano" defaultValue={`${sizeSelected.size} GB`}>
                    <div className="m-4 flex overflow-scroll gap-5">
                        {sizes.map((size) => (
                            <div
                                key={size.id}
                                className={`h-48 w-44 min-w-44 ${
                                    sizeSelected.id == size.id ? "border-4 border-blue-700" : "border border-gray-700"
                                } rounded-lg overflow-hidden`}
                                onClick={() => {
                                    setSizeSelected(size);
                                    scrollToSnap(sizeSelected.image);
                                }}
                            >
                                <div className="h-1/4 w-full border border-b-gray-700 bg-blue-100 p-3">
                                    <p>{size.size} GB</p>
                                </div>
                                <div className="h-3/4 w-full p-2">
                                    <p className="text-lg font-semibold">{size.name}</p>
                                    <p className="flex items-start">
                                        <span>us$</span>
                                        <span className="text-2xl font-semibold">{size.priceWithOffer}</span>
                                        <span>99</span>
                                    </p>
                                    <p className="line-through text-gray-700">us${size.price}.99</p>
                                    <p className={`${size.availableQuantity <= 20 ? "text-red-700" : ""}`}>
                                        {showText(calcAvailableQuantities(size.availableQuantity), 37)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Option>
            )}
            <Divider h={1.5} mt={0} />
            {providers.length > 0 && (
                <Option title="Proveedor" defaultValue={providerSelected.name}>
                    <div className="m-4 flex overflow-scroll gap-5">
                        {providers.map((provider) => (
                            <div
                                key={provider.id}
                                className={`h-48 w-44 min-w-44 ${
                                    providerSelected.id == provider.id ? "border-4 border-blue-700" : "border border-gray-700"
                                } rounded-lg overflow-hidden`}
                                onClick={() => {
                                    setProviderSelected(provider);
                                    scrollToSnap(providerSelected.image);
                                }}
                            >
                                <div className="h-1/4 w-full border border-b-gray-700 bg-blue-100 p-3">
                                    <p>{provider.name}</p>
                                </div>
                                <div className="h-3/4 w-full p-2">
                                    <p className="text-lg font-semibold">{provider.name}</p>
                                    <p className="flex items-start">
                                        <span>us$</span>
                                        <span className="text-2xl font-semibold">{provider.priceWithOffer}</span>
                                        <span>99</span>
                                    </p>
                                    <p className="line-through text-gray-700">us${provider.price}.99</p>
                                    <p className={`${provider.availableQuantity <= 20 ? "text-red-700" : ""}`}>
                                        {showText(calcAvailableQuantities(provider.availableQuantity), 37)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Option>
            )}
            <Divider h={1.5} mt={0} />
            {conditions.length > 0 && (
                <Option title="Condiciones" defaultValue={conditionSelected.condition}>
                    <div className="m-4 flex overflow-scroll gap-5">
                        {conditions.map((condition) => (
                            <div
                                key={condition.id}
                                className={`h-48 w-44 min-w-44 ${
                                    conditionSelected.id == condition.id ? "border-4 border-blue-700" : "border border-gray-700"
                                } rounded-lg overflow-hidden`}
                                onClick={() => {
                                    setConditionSelected(condition);
                                    scrollToSnap(conditionSelected.image);
                                }}
                            >
                                <div className="h-1/4 w-full border border-b-gray-700 bg-blue-100 p-3">
                                    <p>{condition.condition}</p>
                                </div>
                                <div className="h-3/4 w-full p-2">
                                    <p className="text-lg font-semibold">{condition.condition}</p>
                                    <p className="flex items-start">
                                        <span>us$</span>
                                        <span className="text-2xl font-semibold">{condition.priceWithOffer}</span>
                                        <span>99</span>
                                    </p>
                                    <p className="line-through text-gray-700">us${condition.price}.99</p>
                                    <p className={`${condition.availableQuantity <= 20 ? "text-red-700" : ""}`}>
                                        {showText(calcAvailableQuantities(condition.availableQuantity), 37)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Option>
            )}
        </div>
    );
};

export default ProductOptions;

const Option = ({ title, defaultValue, children }) => {
    const [viewContent, setViewContent] = useState(null);

    const f = () => {
        if (viewContent == null || viewContent == false) setViewContent(true);
        else setViewContent(false);
    };

    return (
        <>
            <div className="m-4 flex justify-between items-center" onClick={f}>
                <div>
                    <p className="text-lg">{title}:</p>
                    <p className="text-xl font-semibold">{defaultValue}</p>
                </div>
                <Icon
                    icon="bitcoin-icons:caret-down-filled"
                    className="text-3xl article-option-icon"
                    style={{
                        animationName:
                            viewContent != null ? (viewContent ? "article-option-icon-animation" : "article-option-icon-animation-reverse") : "",
                    }}
                />
            </div>
            <div
                className="article-option"
                style={{ animationName: viewContent != null ? (viewContent ? "article-option-animation" : "article-option-animation-reverse") : "" }}
            >
                {children}
            </div>
        </>
    );
};
