// React
import React, { useEffect, useState } from "react";

// Request Hooks
import { useGetArticleOffer, useGetArticleOfferByIdCartAndIdOffer } from "../request/articles/requestsArticles";

const useArticleOfferByIdCarttemAndIdOffer = ({ idCartItem, idOffer }) => {
    const [hasOffer, setHasOffer] = useState(false);
    const [finalPrice, setFinalPrice] = useState(price);

    const { data: offerArticle, isLoading } = useGetArticleOfferByIdCartAndIdOffer(idCartItem, idOffer);

    useEffect(() => {
        console.log(offerArticle);
        if (isLoading || Object.keys(offerArticle).length === 0) return;
        setFinalPrice(price * quantity * (1 - offerArticle.percent_discount / 100));
        setHasOffer(true);
    }, [isLoading, price, quantity, offerArticle]);

    return { hasOffer, finalPrice, isLoading };
};

export default useArticleOfferByIdCarttemAndIdOffer;
