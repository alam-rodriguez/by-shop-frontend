"use client";

export const dynamic = "force-dynamic";

import React, { use, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zusAdminCategories } from "@/app/zustand/admin/categories/zusAdminCategories";
import useRequestCategories from "@/app/hooks/request/categories/useRequestCategories";
import { useGetCategoriesByType } from "@/app/hooks/request/categories/requestsCategories";
import Image from "next/image";
import { ButtonGrayDown } from "@/app/components/others/Buttons";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import { useGetHomeCategories } from "@/app/hooks/request/categories/requestsHomeCategories";

const page = () => {
    const router = useRouter();

    const searchParams = useSearchParams();

    // const type = searchParams.get("tipo");

    // const typeCategories = type == "directas" ? 1 : type == "indirectas" ? 2 : type == "generales" ? 3 : 0;

    // console.log(typeCategories);

    const { data, isLoading } = useGetHomeCategories();

    useEffect(() => {
        console.log(data);
    }, [data]);

    // const { useGetDirectsCategories } = useRequestCategories();

    // const { setUsingCategory, directCategories, directCategoriesStatus, setCategorySelected } = zusAdminCategories();

    // useEffect(() => {
    //     setUsingCategory(1);
    //     useGetDirectsCategories();
    // }, []);

    // useEffect(() => {
    //     console.log(directCategories);
    // }, [directCategories]);

    const handleClick = (id = 0) => router.push(`/admin/categorias-pagina-inicio/${id}`);

    if (isLoading) return <LoadingParagraph />;

    return (
        <div className="m-4">
            <p className="text-center mb-3 font-bold text-xl">Categorias Pagina de Inicio</p>
            <div className="flex flex-col gap-4">
                {data.map((category) => (
                    <div key={category.id} onClick={() => handleClick(category.id)}>
                        <div className="bg-gray-300 p-4 rounded-t-md rounded-b-none ">
                            <div className="flex justify-between">
                                <p>Nombre:</p>
                                <p>{category.name}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Descripcion:</p>
                                <p>{category.description}</p>
                            </div>
                            {/* <div className="flex justify-between">
                                <p>slug:</p>
                                <p>{category.slug}</p>
                            </div> */}
                            {/* <div className="flex justify-between">
                                <p>Color:</p>
                                <p>
                                    <span
                                        className="inline-block w-4 min-w-4 h-4 min-h-4 rounded-full"
                                        style={{ backgroundColor: category.color }}
                                    ></span>
                                </p>
                            </div> */}
                            <div className="flex justify-between">
                                <p>Estado:</p>
                                <p>{category.status == 1 ? "Activo" : "Inactivo"}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Fecha de Creacion:</p>
                                <p>{category.created_at.split("T")[0].split("-").reverse().join("/")}</p>
                            </div>
                        </div>
                        {/* {category.image && (
                            <Image
                                className="w-full h-auto object-contain rounded-b-md"
                                width={100}
                                height={100}
                                src={category.image}
                                alt={category.name || "Category image"}
                                priority
                                // placeholder="blur"
                                // blurDataURL="/placeholder.jpg" // una imagen base64 muy ligera o un fallback
                            />
                        )} */}

                        {/* <Image className="w-full h-auto object-contain" width={100} height={100} src={category.image} alt="" /> */}
                        {/* <img src={category.image} alt="" /> */}
                    </div>
                ))}
            </div>

            <ButtonGrayDown fn={() => handleClick(0)}>Crear Categoria de inicio</ButtonGrayDown>

            {/* <button className="bg-green-700 text-white w-full rounded-3xl py-3" onClick={() => handleClickCategory()}>
                Crear Nueva Tienda
            </button> */}
        </div>
    );
};

export default page;
