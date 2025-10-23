// React
import React, { useEffect } from "react";

// Components
import ImageA from "../others/ImageA";

// Hooks
import useArticleOffer from "@/app/hooks/articles/useArticleOffer";
import useArticleOfferByIdCarttemAndIdOffer from "@/app/hooks/articles/useArticleOfferByIdCarttemAndIdOffer";
import { useGetArticleOfferByIdCartAndIdOffer } from "@/app/hooks/request/articles/requestsArticles";

const ArticleForCartBoughtDetail = ({ id, image, name, description, quantity, price, idOffer = null, idCartBoughtItem, addPriceArticle }) => {
    // const { hasOffer, finalPrice, isLoading } = useArticleOfferByIdCarttemAndIdOffer({ idCartItem: idCartBoughtItem, idOffer });

    //TODO: TENGO QUE MOSTRAR EL PRECIO DEL ARTICULO CON SU OFERTA SI APLICA Y MOSTRAR COMO UN RESUMEN DE LOS TOTALES

    // const { data: offerArticle, isLoading } = useGetArticleOfferByIdCartAndIdOffer(idCartBoughtItem, idOffer);

    // useEffect(() => {
    //     if (isLoading) return;
    //     console.error(price, quantity);
    //     const priceArticle = price * quantity;
    //     // const discountPercent = offerArticle ? priceArticle * (1 - offerArticle.percent_discount / 100) : priceArticle;
    //     const discountPercent = offerArticle ? offerArticle.percent_discount : 0;
    //     const priceWithDiscount = priceArticle * (1 - discountPercent / 100);
    //     const dataPrice = {
    //         priceWithoutOffer: priceArticle,
    //         priceWithOffer: priceWithDiscount,
    //         totalOfferDiscount: priceArticle - priceWithDiscount,
    //     };
    //     addPriceArticle(id, dataPrice);
    // }, [offerArticle, isLoading, price, quantity]);

    return (
        <div className="flex">
            <div className="w-1/5 grid place-items-center">
                <ImageA className="size-14 object-cover rounded-full" src={image} />
            </div>
            <div className="flex flex-col w-4/5 justify-evenly">
                <p className="text-xl font-bold">{name}</p>
                <p className="text-gray-500 text-xs">{description}</p>
            </div>
        </div>
    );
};

export default ArticleForCartBoughtDetail;
