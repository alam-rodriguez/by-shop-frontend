"use client";
import React, { useEffect } from "react";

// Next
import { useRouter } from "next/navigation";

// Zustand
import { zusAdminCategories } from "@/app/zustand/admin/categories/zusAdminCategories";

// Hooks
import useRequestCategories from "@/app/hooks/request/categories/useRequestCategories";
import useRequestsGeneralCategoriesGroups from "@/app/hooks/request/categories/useRequestsGeneralCategoriesGroups";
import Spacer from "@/app/components/home/Spacer";
import ButtonGray from "@/app/components/others/ButtonGray";
import { ButtonGrayDown } from "@/app/components/others/Buttons";

const page = () => {
    const router = useRouter();

    // grupo-categoria-generales

    // const { useGetIndirectsCategories } = useRequestCategories();
    const { useGetGeneralCategoriesGroups } = useRequestsGeneralCategoriesGroups();

    const { setGeneralCategoryGroupSelected, generalCategoriesGroups } = zusAdminCategories();

    useEffect(() => {
        // setUsingCategory(2);
        useGetGeneralCategoriesGroups();
    }, []);

    useEffect(() => {
        console.log(generalCategoriesGroups);
    }, [generalCategoriesGroups]);

    const handleClickGroupGeneralCategory = (idGeneralCategoryGroup = 0) => {
        // console.log(idGeneralCategoryGroup);
        // setGeneralCategoryGroupSelected(generalCategoryGroup);
        router.push(`/admin/grupos-categorias-generales/${idGeneralCategoryGroup}`);
    };

    return (
        <div className="m-4">
            <p className="text-center mb-3 font-bold text-xl">Categorias Indirectas</p>
            <div className="flex flex-col gap-4">
                {generalCategoriesGroups.map((generalCategoryGroup) => (
                    <div
                        key={generalCategoryGroup.id}
                        className="bg-gray-300 p-4 rounded-md"
                        onClick={() => handleClickGroupGeneralCategory(generalCategoryGroup.id)}
                    >
                        <div className="flex justify-between">
                            <p>Nombre:</p>
                            <p>{generalCategoryGroup.name}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Descripcion:</p>
                            <p>{generalCategoryGroup.description}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>slug:</p>
                            <p>{generalCategoryGroup.slug}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Estado:</p>
                            <p>{generalCategoryGroup.status == 1 ? "Activo" : "Inactivo"}</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* <button className="bg-green-700 text-white w-full rounded-3xl py-3" onClick={() => handleClickGroupGeneralCategory()}>
                Crear Nueva Tienda
            </button> */}
            {/* <button className="px-4 py-2 rounded bg-gray-200 fixed bottom-4 left-1/2 -translate-x-1/2" onClick={() => handleClickArticle()}>
                Crear Nuevo Articulo
            </button> */}
            <ButtonGrayDown fn={() => handleClickGroupGeneralCategory(0)}>ggg</ButtonGrayDown>
            {/* ButtonGray = ({(children, (fn = () => {}), (disabled = false))}) */}
        </div>
    );
};

export default page;
