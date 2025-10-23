"use client";

import React, { useEffect } from "react";

// Articles
import ArticlesType2 from "./ArticlesType2";

// zustand
import { zusArticles } from "@/app/zustand/articles/zusArticles";

const ArticlesTypeContainer2 = ({ nameCategory, articles }) => {
    // const { articles } = zusArticles();

    useEffect(() => {
        console.log(articles);
    }, [articles]);

    return (
        <div className="mx-4">
            <p className="my-2 font-bold text-xl">{nameCategory}</p>
            <div className="flex flex-col gap-4">
                {articles.slice(0, 3).map((article) => (
                    <ArticlesType2
                        key={article.id}
                        articleId={article.id}
                        img={article.main_image}
                        articleDescription={article.description}
                        price={article.price}
                        hasOffer={false}
                        priceWithOffer={17}
                    />
                ))}
            </div>
        </div>
    );
};

export default ArticlesTypeContainer2;
