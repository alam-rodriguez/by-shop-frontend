"use client";

import React, { useEffect } from "react";

// Articles
import ArticlesType1 from "./ArticlesType1";

// zustand
import { zusArticles } from "@/app/zustand/articles/zusArticles";
import useRequestsGeneralCategoriesGroups from "@/app/hooks/request/categories/useRequestsGeneralCategoriesGroups";

const ArticlesTypeContainer1 = ({ id, title }) => {
    const { useGetCategoriesOfGeneralCategoryGroupForApp } = useRequestsGeneralCategoriesGroups();

    const { data, isLoading } = useGetCategoriesOfGeneralCategoryGroupForApp(id);

    useEffect(() => {
        console.log(data);
    }, [data]);

    const { articles } = zusArticles();

    if (isLoading) return <>Cargando</>;

    return (
        <div className="mx-4">
            <p className="my-2 font-bold text-xl">{title}</p>
            <div className="flex flex-wrap justify-between gap-5">
                {data.slice(0, 4).map((article) => (
                    <ArticlesType1 key={article.id} img={article.image} title={article.description} price={0} link="/" />
                ))}
            </div>
        </div>
    );
};

export default ArticlesTypeContainer1;
