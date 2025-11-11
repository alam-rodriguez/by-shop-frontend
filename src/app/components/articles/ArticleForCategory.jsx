// React
import React, { useEffect, useState } from "react";

// Next
import Link from "next/link";

// Hooks
import { showText } from "@/app/hooks/app/app";
import { useGetArticleOffer } from "@/app/hooks/request/articles/requestsArticles";

// Components
import ImageA from "../others/ImageA";

const ArticleForCategory = ({ id, image, price, name }) => {
    const [hasOffer, setHasOffer] = useState(false);
    const [finalPrice, setFinalPrice] = useState(price);

    const { data: offerArticle, isLoading: isLoadingOfferArticle } = useGetArticleOffer(id);

    useEffect(() => {
        if (isLoadingOfferArticle || Object.keys(offerArticle).length === 0) return;
        setFinalPrice(price * (1 - offerArticle.percent_discount / 100));
        setHasOffer(true);
    }, [isLoadingOfferArticle, price, offerArticle]);

    // return (
    //     <Link key={id} href={`/articulos/${id}`} className="h-72" style={{ width: "calc(50% - 10px)" }}>
    //         <div className="h-4/5 relative">
    //             {hasOffer && <p className="bg-black py-2 px-3 text-white absolute top-0 left-0 m-3 rounded-lg text-xs">Best price</p>}
    //             {hasOffer && (
    //                 <p className="bg-red-500 py-2 px-3 absolute top-0 right-0 m-3 rounded-lg text-xs">{offerArticle.percent_discount.slice(0, 2)}%</p>
    //             )}
    //             <ImageA className="h-full w-full object-cover rounded-2xl" src={image} />
    //         </div>
    //         <div className="h-1/5">
    //             <div className="flex gap-2">
    //                 <p className="text-lg font-bold">${finalPrice.toString().split(".")[0]}.00</p>
    //                 {hasOffer && <p className="text-lg font-bold line-through text-gray-500">${price.toString().split(".")[0]}.00</p>}
    //             </div>
    //             <p className="text-gray-500">{showText(name, 18)}</p>
    //         </div>
    //     </Link>
    // );
    return (
        <Link key={id} href={`/articulos/${id}`} className="h-52" style={{ width: "calc(50% - 10px)" }}>
            <div className="h-4/5 relative">
                {hasOffer && (
                    <p className="bg-black py-1 px-2 text-white absolute top-0 left-0 m-2 rounded-lg" style={{ fontSize: 9 }}>
                        Best price
                    </p>
                )}
                {hasOffer && (
                    <p className="bg-red-500 py-1 px-2 absolute top-0 right-0 m-2 rounded-lg" style={{ fontSize: 9 }}>
                        {offerArticle.percent_discount.slice(0, 2)}%
                    </p>
                )}
                <ImageA className="h-full w-full object-cover rounded-2xl" src={image} />
            </div>
            <div className="h-1/5">
                <div className="flex gap-2">
                    <p className="text-sm font-bold">${finalPrice.toString().split(".")[0]}.00</p>
                    {hasOffer && <p className="text-sm font-bold line-through text-gray-500">${price.toString().split(".")[0]}.00</p>}
                </div>
                <p className="text-gray-500 text-xs">{showText(name, 18)}</p>
            </div>
        </Link>
    );
};

export default ArticleForCategory;
