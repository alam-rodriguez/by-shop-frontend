"use client";
import React, { useEffect } from "react";

// Next
import { useRouter } from "next/navigation";

// Zustand
import { zusAdminCategories } from "@/app/zustand/admin/categories/zusAdminCategories";

// Hooks
import useRequestCategories from "@/app/hooks/request/categories/useRequestCategories";
import { useGetDepartmentsArticles } from "@/app/hooks/request/categories/requestsCategories";

const page = () => {
    const router = useRouter();

    const { data, isLoading } = useGetDepartmentsArticles();

    useEffect(() => {
        console.log(data);
    }, [data]);

    const { useGetIndirectsCategories } = useRequestCategories();

    const { setUsingCategory, indirectCategories, setIndirectCategories } = zusAdminCategories();

    useEffect(() => {
        setUsingCategory(2);
        useGetIndirectsCategories();
    }, []);

    const handleClickDepartment = (idDepartment = 0) => {
        // setIndirectCategories(category);
        router.push(`/admin/departamentos/${idDepartment}`);
    };

    if (isLoading) return <>Cargando</>;
    return (
        <div className="m-4">
            Departamentos
            {data.map((category) => (
                <div key={category.id} className="bg-green-200/50" onClick={() => handleClickDepartment(category.id)}>
                    <img src={category.image} alt="" />
                    <p>{category.name}</p>
                    <p>{category.slug}</p>
                    <p>{category.description}</p>
                    <p>{category.color}</p>
                    <p>{category.status}</p>
                    <p>{category.created_date}</p>
                </div>
            ))}
            <button className="bg-green-700 text-white w-full rounded-3xl py-3" onClick={() => handleClickDepartment()}>
                Crear Departamento
            </button>
        </div>
    );
};

export default page;
