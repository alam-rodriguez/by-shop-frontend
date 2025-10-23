// React
import React, { useEffect, useState } from "react";

// Request Hooks
import { useGetArticleOffer } from "../request/articles/requestsArticles";

const useArticleOffer = ({ id, price, quantity = 1 }) => {
    const [hasOffer, setHasOffer] = useState(false);
    const [finalPrice, setFinalPrice] = useState(price);

    const { data: offerArticle, isLoading } = useGetArticleOffer(id);

    useEffect(() => {
        console.log(offerArticle);

        const percentDiscount = offerArticle && Object.keys(offerArticle).length > 0 ? offerArticle.percent_discount : 0;
        console.log(percentDiscount);
        // if (isLoading || Object.keys(offerArticle).length === 0) return;
        setFinalPrice(price * quantity * (1 - percentDiscount / 100));
        if (percentDiscount > 0) setHasOffer(true);
    }, [isLoading, price, quantity, offerArticle]);

    return { hasOffer, finalPrice, isLoading };
};

export default useArticleOffer;
