"use client";

// React
import React, { useEffect } from "react";

// Next
import { useParams } from "next/navigation";

// Hooks
import { useGetShopById } from "@/app/hooks/request/shops/requestsShops";
import { useGetArticlesByIdShop } from "@/app/hooks/request/articles/requestsArticles";

// Components
import ArticleForCategory from "@/app/components/articles/ArticleForCategory";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import ImageA from "@/app/components/others/ImageA";

const page = () => {
    const { id: idShop } = useParams();

    const { isLoading, data } = useGetArticlesByIdShop(idShop);
    const { data: shopData, isLoading: isLoadingShop } = useGetShopById(idShop);

    if (isLoading || isLoadingShop) return <LoadingParagraph />;

    return (
        <>
            <ImageA src={shopData.logo} className="w-full h-48 object-cover mt-1" />
            <div className="m-4 flex justify-between flex-wrap gap-5">
                <p className="text-sm text-gray-600">
                    Explora nuestra selección de artículos de la categoría: <span className="font-bold text-black">{shopData.name}</span>
                </p>
                {data.map((article) => (
                    <ArticleForCategory key={article.id} id={article.id} image={article.main_image} price={article.price} name={article.name} />
                ))}
                {data.length === 0 && <p className="font-bold text-base">Esta tienda no tiene ningun articulo activo</p>}
            </div>
        </>
    );
};

export default page;
