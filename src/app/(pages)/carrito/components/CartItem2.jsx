// React
import React, { useEffect, useState } from "react";

// Icons
import { Icon } from "@iconify/react";

// Hooks
import { showText, showPrice, showPriceWithCurrencyUser } from "@/app/hooks/app/app";
import { useGetCartUserReadyToBuy, useUpdateCartItemQuantity, useUpdateCartItemStatus } from "@/app/hooks/request/carts/requestsCarts";
import { useGetArticleOffer } from "@/app/hooks/request/articles/requestsArticles";

// alerts
import useAlert from "@/app/alerts/react-confirm-alert/useAlert";

// Components
import ImageA from "@/app/components/others/ImageA";
import { toast } from "sonner";
import useArticleOffer from "@/app/hooks/articles/useArticleOffer";
import { zusUser } from "@/app/zustand/user/zusUser";

const CartItem2 = ({
    idCart,
    idArticle,
    quantity,
    image,
    articleName,
    articleDescription,
    articlePrice,
    articleOptions,
    articleValues,
    exchangeRate,
    isoCode,
    refetch,
}) => {
    // const [hasOffer, setHasOffer] = useState(false);
    // const [finalPrice, setFinalPrice] = useState(articlePrice);

    const { data: offerArticle, isLoading: isLoadingOfferArticle } = useGetArticleOffer({ id: idArticle, price: articlePrice, quantity });

    const { hasOffer, finalPrice, isLoading } = useArticleOffer({ id: idArticle, price: articlePrice, quantity });

    const { refetch: refetchCart } = useGetCartUserReadyToBuy(idCart);

    const { currencySelected } = zusUser();

    useEffect(() => {
        console.log(offerArticle);
        console.log(finalPrice);
        console.log(hasOffer);
        if (isLoadingOfferArticle || Object.keys(offerArticle).length === 0) return;
        // setFinalPrice(articlePrice * quantity * (1 - offerArticle.percent_discount / 100));
        // setHasOffer(true);
    }, [isLoadingOfferArticle, articlePrice, quantity, offerArticle]);

    const { confirmAlertCustom } = useAlert();

    const handleClickSetStatusStatus = async (status) => {
        if (status === 0) {
            const want = await confirmAlertCustom({
                head: "Eliminar artículo del carrito",
                content: `¿Estás seguro de que deseas eliminar este artículo del carrito?`,
                confirmText: "Sí",
                cancelText: "No",
            });

            if (!want) return;
        }

        const res = await useUpdateCartItemStatus(idCart, status);
        console.log(res);
        refetch();
        refetchCart();
        toast.success("Artículo eliminado del carrito");
    };

    const handleClickChangeCount = async (type = 1) => {
        if (type === 0 && quantity <= 1) return;
        const newQuantity = type == 1 ? quantity + 1 : quantity - 1;
        const res = await useUpdateCartItemQuantity(idCart, newQuantity);
        refetch();
        refetchCart();
    };

    return (
        <div className="flex bg-white rounded-lg p-4 gap-4 shadow">
            <div className="grid place-items-center p-1 w-1/4 bg-gray-200 rounded-md">
                <ImageA className="w-full h-full object-contain" src={image} />
            </div>
            <div className="w-3/4">
                <div className="flex">
                    <div className="w-11/12">
                        <p className="font-bold text-lg line-clamp-1">{articleName}</p>
                        <p className="font-bold text-xs text-gray-500 line-clamp-2">{articleDescription}</p>
                        {articleOptions != "" && articleValues != "" && (
                            <p className="text-xs text-gray-500">
                                {articleOptions} : {articleValues}
                            </p>
                        )}
                    </div>
                    <Icon icon="stash:trash-can" className="w-1/12 text-3xl" onClick={() => handleClickSetStatusStatus(0)} />
                </div>

                <div className="flex justify-between items-center_ items-end w-full">
                    <div className="flex_gap-1_items-center">
                        {/* <p className="font-bold text-red-500 text-2xl">{showPrice(finalPrice)}</p> */}
                        <p className="font-bold text-red-500 text-lg">
                            {showPriceWithCurrencyUser(finalPrice, { exchange_rate: exchangeRate, iso_code: isoCode }, currencySelected)}
                        </p>
                        {hasOffer && <p className="font-bold text-gray-400 text-base line-through">{showPrice(articlePrice * quantity)}</p>}
                    </div>
                    <div className="flex items-center gap-1">
                        <Icon className="size-5 text-gray-500" icon="carbon:subtract-alt" onClick={() => handleClickChangeCount(0)} />
                        <p className="text-xl">{quantity}</p>
                        <Icon className="size-5 text-gray-500" icon="carbon:add-alt" onClick={() => handleClickChangeCount(1)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem2;
