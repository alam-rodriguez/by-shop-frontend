// React
import React, { useEffect, useState } from "react";

// Next
import Link from "next/link";

// Icons
import { Icon } from "@iconify/react";

// Components
import ImageA from "../others/ImageA";

// Hooks
import { showText } from "@/app/hooks/app/app";
import { useGetArticleOffer } from "@/app/hooks/request/articles/requestsArticles";

const SimilarArticle = ({ id, image, name, price, averageStars, totalSales }) => {
    const [hasOffer, setHasOffer] = useState(false);
    const [finalPrice, setFinalPrice] = useState(price);

    const { data: offerArticle, isLoading: isLoadingOfferArticle } = useGetArticleOffer(id);

    useEffect(() => {
        if (isLoadingOfferArticle || Object.keys(offerArticle).length === 0) return;
        setFinalPrice(price * (1 - offerArticle.percent_discount / 100));
        setHasOffer(true);
    }, [isLoadingOfferArticle, price, offerArticle]);

    return (
        <Link key={id} href={`/articulos/${id}`} className="flex flex-col gap-3 h-72" style={{ width: "calc(50% - .5rem)" }}>
            <div className="h-2/3">
                <ImageA className="w-full h-full object-cover rounded-2xl" src={image} />
            </div>
            <div className="h-1/3 flex flex-col gap-1">
                <p className="font-bold text-lg">{showText(name, 15)}</p>
                <div className="flex items-center gap-2">
                    <Icon className="text-base text-gray-500" icon="qlementine-icons:star-half-16" />
                    <p className="text-gray-500">{averageStars.slice(0, 3)}</p>
                    <span className="text-gray-500">|</span>
                    <p className="bg-slate-300 text-gray-500 rounded px-2 py-1 text-xs font-semibold">{totalSales} vendidados</p>
                </div>
                <div className="flex gap-1 items-center">
                    <p className="font-bold text-lg">${finalPrice.toString().split(".")[0]}.00</p>
                    {hasOffer && <p className="font-bold text-lg line-through text-gray-400">${price.toString().split(".")[0]}.00</p>}
                </div>
            </div>
        </Link>
    );
};

export default SimilarArticle;
