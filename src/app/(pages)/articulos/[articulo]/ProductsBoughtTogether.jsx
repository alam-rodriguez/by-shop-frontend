import React, { useEffect, useState } from "react";

// Icons
import { Icon } from "@iconify/react";

// Hooks
import useApp from "@/app/hooks/app/useApp";

// Zustand
import { zusArticles } from "@/app/zustand/articles/zusArticles";

const ProductsBoughtTogether = ({ idsArticles }) => {
    const { showPrice } = useApp();

    const { articles: articlesFromBd } = zusArticles();

    const [articlesHtml, setArticlesHtml] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setArticlesHtml([]);
        setTotalPrice(0);
        const articles = articlesFromBd.filter((article) => idsArticles.includes(article.id));
        let totalPrice = 0;
        articles.forEach((article, i) => {
            totalPrice += Number(article.price);
            setArticlesHtml((state) => [
                ...state,
                <React.Fragment key={article.id}>
                    <ProductsBought img={article.mainImage} />
                    {articles.length != i + 1 && <p>+</p>}
                </React.Fragment>,
            ]);
        });
        setTotalPrice(totalPrice);
    }, [articlesFromBd]);

    return (
        <div className="m-4 flex flex-col gap-4">
            <p className="text-xl font-semibold tracking-tighter">Compralo con</p>
            <div className="flex items-center justify-center">{articlesHtml}</div>
            <button className="flex items-center w-full justify-center p-4 rounded-full relative mt-5- border border-black">
                <p className="flex items-start">
                    <span>Comprar los {articlesHtml.length}: </span>
                    <span>dop$</span>
                    <span className="text-xl font-semibold">{showPrice(totalPrice)}</span>
                    <span>{showPrice(totalPrice, false)}</span>
                </p>
                <Icon icon="lsicon:right-filled" className="text-3xl absolute right-2 " />
            </button>
        </div>
    );
};

export default ProductsBoughtTogether;

const ProductsBought = ({ img, link }) => {
    return (
        <div className="bg-gray-100 h-24 w-24 rounded-2xl p-2">
            <img className="h-full w-full object-contain" src={img} alt="" />
        </div>
    );
};
