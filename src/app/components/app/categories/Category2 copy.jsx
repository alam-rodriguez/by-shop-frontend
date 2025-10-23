"use client";

import React, { useEffect } from "react";

// Router
import { useRouter } from "next/navigation";

// tanStack Query
import useRequestsGeneralCategoriesGroups from "@/app/hooks/request/categories/useRequestsGeneralCategoriesGroups";

const Category2 = ({ id, text }) => {
    const { useGetCategoriesOfGeneralCategoryGroupForApp } = useRequestsGeneralCategoriesGroups();

    const router = useRouter();

    const { data, isLoading } = useGetCategoriesOfGeneralCategoryGroupForApp(id);

    useEffect(() => {
        console.log(data);
    }, [data]);

    if (isLoading) return <>Cargando</>;

    return (
        <div className="mx-4">
            <p className="my-2 font-bold text-xl">{text}</p>
            <div className="flex justify-between flex-wrap gap-y-3">
                {data.slice(0, 4).map((article) => (
                    <div key={article.id} className="" style={{ width: "calc(50% - 10px)" }} onClick={() => router.push(`/articulos/${article.id}`)}>
                        <img className="h-56 rounded-lg object-cover" src={article.main_image} alt="" />
                        <p className="font-semibold tracking-wide">{article.description}</p>
                    </div>
                ))}
            </div>
            <p className="text-green-900 tracking-wider mt-4" onClick={() => router.push(`/articulos?grupo-categorias=${id}`)}>
                Ver mas
            </p>
        </div>
    );
};

export default Category2;
