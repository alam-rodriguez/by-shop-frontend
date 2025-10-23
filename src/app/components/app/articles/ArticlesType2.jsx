import React from "react";

// Router
import { useRouter } from "next/navigation";

// hooks
import useApp from "@/app/hooks/app/useApp";

const ArticlesType2 = ({ articleId, img, articleDescription, price, hasOffer, priceWithOffer }) => {
    const { showText, showPrice } = useApp();

    const router = useRouter();

    return (
        <div className="flex" onClick={() => router.push(`/articulos/${articleId}`)}>
            <img className="w-1/4 object-cover rounded-md" src={img} alt="" />
            <div className="items-center w-3/4 m-3">
                <p className="text-sm">{showText(articleDescription, 76)}</p>
                <div className="flex">
                    <p className="flex items-start text-xs">
                        <span>US$</span>
                        <span className="text-base font-semibold">{showPrice(price, true)}</span>
                        <span>{showPrice(price, false)}</span>
                        {/* <span className="text-xl">
                            PVPR:
                            <span className="line-through">US${price}</span>
                        </span> */}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ArticlesType2;
