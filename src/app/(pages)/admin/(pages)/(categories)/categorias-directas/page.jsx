"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { zusAdminCategories } from "@/app/zustand/admin/categories/zusAdminCategories";
import useRequestCategories from "@/app/hooks/request/categories/useRequestCategories";

const page = () => {
    const router = useRouter();

    const { useGetDirectsCategories } = useRequestCategories();

    const { setUsingCategory, directCategories, directCategoriesStatus, setCategorySelected } = zusAdminCategories();

    useEffect(() => {
        setUsingCategory(1);
        useGetDirectsCategories();
    }, []);

    useEffect(() => {
        console.log(directCategories);
    }, [directCategories]);

    const handleClickCategory = (category = {}) => {
        setCategorySelected(category);
        router.push("/admin/categoria");
    };

    return (
        <div className="m-4">
            categorias directas
            {directCategories.map((category) => (
                <div key={category.id} className="bg-green-200/50" onClick={() => handleClickCategory(category)}>
                    <img src={category.image} alt="" />
                    <p>{category.name}</p>
                    <p>{category.slug}</p>
                    <p>{category.description}</p>
                    <p>{category.color}</p>
                    <p>{category.status}</p>
                    <p>{category.created_date}</p>
                </div>
            ))}
            <button className="bg-green-700 text-white w-full rounded-3xl py-3" onClick={() => handleClickCategory()}>
                Crear Nueva Tienda
            </button>
        </div>
    );
};

export default page;
