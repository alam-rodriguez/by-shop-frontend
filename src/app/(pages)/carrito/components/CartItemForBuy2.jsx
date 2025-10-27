// React
import React, { useEffect, useState } from "react";

// Components
import ImageA from "@/app/components/others/ImageA";
import { showPrice, showPriceWithCurrencyUser, showText } from "@/app/hooks/app/app";
import useArticleOffer from "@/app/hooks/articles/useArticleOffer";
import { zusUser } from "@/app/zustand/user/zusUser";
import { zusCart } from "@/app/zustand/user/zusCart";

const CartItemForBuy2 = ({
    idCart,
    idArticle,
    image,
    name,
    description,
    options,
    values,
    price,
    isoCode,
    exchangeRate,
    quantity,
    priceArticles,
    setTotalCart,
}) => {
    // const { currencySelected } = zusUser();
    const currencySelected = zusCart((state) => state.currencySelected);

    const { hasOffer, finalPrice, isLoading } = useArticleOffer({ id: idArticle, price, quantity });

    const [wasPriceAdded, setWasPriceAdded] = useState(false);

    const currencyArticle = { exchange_rate: exchangeRate, iso_code: isoCode };

    useEffect(() => {
        setTotalCart({
            idCart,
            priceWithoutDiscount: showPriceWithCurrencyUser(price * quantity, currencyArticle, currencySelected, false),
            priceWithDiscount: showPriceWithCurrencyUser(finalPrice, currencyArticle, currencySelected, false),
            totalDiscount: showPriceWithCurrencyUser(price * quantity - finalPrice, currencyArticle, currencySelected, false),
        });
    }, [finalPrice, hasOffer, currencySelected.id]);

    return (
        <div className="h-40 flex items-end- gap-2 bg-white p-4 rounded-3xl">
            <div className="w-2/5 h-full">
                <ImageA className="w-full h-full  object-cover rounded-2xl" src={image} />
            </div>
            <div className="w-2/3 h-full flex flex-col justify-around gap-3">
                <div className="flex flex-col gap-1">
                    <p className="text-lg font-bold">{showText(name, 19)}</p>
                    <p className="font-bold text-gray-500 text-xs">{showText(description, 57)}</p>
                </div>
                {options != "" && values != "" && (
                    <p className="text-xs text-gray-400">
                        {options} : {values}
                    </p>
                )}

                <div className="flex_items-center_gap-2">
                    <p className="text-lg font-bold">{showPriceWithCurrencyUser(finalPrice, currencyArticle, currencySelected)}</p>
                    {hasOffer && (
                        <p className="text-lg font-bold text-gray-400 line-through">
                            {showPriceWithCurrencyUser(price * quantity, currencyArticle, currencySelected)}
                        </p>
                    )}
                </div>
            </div>
            <div className="w-1/12 flex flex-col justify-end items-end">
                <div className="size-9 grid place-items-center bg-slate-200 rounded-full">
                    <span>{quantity}</span>
                </div>
            </div>
        </div>
    );
};

export default CartItemForBuy2;
