"use client";

import createCategorySchema from "@/app/schemas/category.schema";
import { zusAdminCategories } from "@/app/zustand/admin/categories/zusAdminCategories";
// import { useUploadThing } from "@/utils/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import useRequestCategories from "@/app/hooks/request/categories/useRequestCategories";
import useUploadThing from "@/app/hooks/upload-thing/useUploadThing";
import { useParams, useSearchParams } from "next/navigation";
import { useGetCategoryById } from "@/app/hooks/request/categories/requestsCategories";
import Input from "@/app/components/inputs/Input";
import InputFile from "@/app/components/inputs/InputFile";
import Select from "@/app/components/inputs/Select";
import { ButtonGrayDown } from "@/app/components/others/Buttons";
import { toast } from "sonner";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import {
    useCreateHomeCategory,
    useCreateHomeCategoryStore,
    useGetHomeCategoryById,
    useGetHomeCategoryStoreByHomeCategoryId,
    useUpdateHomeCategory,
} from "@/app/hooks/request/categories/requestsHomeCategories";
import homeCategorySchema from "@/app/schemas/homeCategory.schema";
import { useGetArticles } from "@/app/hooks/request/articles/requestsArticles";
import { getDefaultsValuesForSelectMulti } from "@/app/hooks/app/app";
// import { useParams } from "next/navigation";

const page = () => {
    const { id } = useParams();

    const wantCreate = id == 0 ? true : false;

    // const searchParams = useSearchParams();
    // const type = searchParams.get("tipo");
    // const typeCategories = type == "directas" ? 1 : type == "indirectas" ? 2 : type == "generales" ? 3 : 0;
    // const typeCategoriesInEnglish =
    //     typeCategories == 1 ? "directs-categories" : typeCategories == 2 ? "indirects-categories" : typeCategories == 3 ? "generals-categories" : "";

    // Obtener un parámetro específico

    // const [type, setType] = useState(tipo == "departamentos" ? 4 : 0);

    // useEffect(() => {
    //     if (tipo == "departamentos") setType(4);
    // }, []);

    // console.log();

    const { uploadImage, deleteImages, deleteImage } = useUploadThing();
    const { useCreateCategory, useUpdateCategory } = useRequestCategories();
    const { categorySelected, usingCategory } = zusAdminCategories();

    // const wanCreate = Object.keys(categorySelected).length == 0 ? true : false;

    const [schemaIsRequired, setSchemaIsRequired] = useState(wantCreate);

    const categorySchema = createCategorySchema(schemaIsRequired);
    // const defaultValues = wantCreate
    //     ? {
    //           type: type,
    //       }
    //     : {
    //           ...categorySelected,
    //       };
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
        control,
        setValue,
    } = useForm({
        // defaultValues,
        resolver: zodResolver(homeCategorySchema),
    });

    // useEffect(() => {
    //     setValue("type", typeCategories);
    // }, []);

    const { data, isLoading } = useGetHomeCategoryById(id);
    const { data: homeCategoryStore, isLoading: isLoadingHomeCategoryStore } = useGetHomeCategoryStoreByHomeCategoryId(id);

    const { data: articles, isLoading: isLoadingArticles } = useGetArticles();

    useEffect(() => {
        if (isLoading || wantCreate) return;
        reset(data);
    }, [data, isLoading]);

    useEffect(() => {
        if (isLoadingHomeCategoryStore || isLoadingArticles || wantCreate) return;
        const categoryStore = getDefaultsValuesForSelectMulti(homeCategoryStore, articles, "store_id");
        setValue("category_store", categoryStore);
    }, [homeCategoryStore, articles]);

    // useEffect(() => {
    //         if (isLoadingGeneralCategoriesArticle || isLoadingGeneralCategories || !generalCategoriesArticle || !generalCategories) return;
    //         const generalCategoriesDefaultValues = getDefaultsValuesForSelectMulti(generalCategoriesArticle, generalCategories, "id");
    //         setValue("general_categories", generalCategoriesDefaultValues);
    //     }, [generalCategoriesArticle, generalCategories]);

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    const create = async (data) => {
        const loadingToast = toast.loading("creando categoria...");

        const { status, data: homeCategory } = await useCreateHomeCategory(data);
        console.log(status);
        const resStore = await useCreateHomeCategoryStore(data.category_store, homeCategory.id);
        console.log(resStore);

        if (status && resStore)
            toast.success("Categoría creada correctamente", {
                id: loadingToast,
            });
        else
            toast.error("Error al crear la categoría", {
                id: loadingToast,
            });
    };
    const edit = async (data) => {
        const loadingToast = toast.loading("Editando categoria...");

        let resDeleteIMages = true;

        const res = await useUpdateHomeCategory(data);
        console.log(res);
        if (res && resDeleteIMages)
            toast.success("Categoría editada correctamente", {
                id: loadingToast,
            });
        else
            toast.error("Error al editar la categoría", {
                id: loadingToast,
            });
    };

    const onSubmit = async (data) => {
        console.log(data);
        console.log(wantCreate);
        if (wantCreate) create(data);
        else edit(data);
    };

    useEffect(() => {
        console.log(categorySelected);
    }, [categorySelected]);

    if (isLoading) return <LoadingParagraph />;

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="m-4">
                <Input
                    register={register}
                    errors={errors}
                    type="text"
                    name="name"
                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Nombre de la oferta"
                />

                <Input
                    register={register}
                    errors={errors}
                    type="textarea"
                    name="description"
                    inputClassName="border-2 border-gray-300 rounded-md p-2 h-20 min-h-20 max-h-20"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Descripción de la oferta"
                />
                <Input
                    register={register}
                    errors={errors}
                    type="number"
                    name="sort_order"
                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    placeholder="Orden"
                    label="Orden de la categoria"
                />

                <Select
                    register={register}
                    errors={errors}
                    control={control}
                    type="text"
                    name="category_store"
                    items={articles ?? []}
                    selectClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                    label="Articulos de la categoria"
                    isMulti={true}
                />

                <Select
                    register={register}
                    errors={errors}
                    type="number"
                    name="status"
                    items={[
                        { id: 1, name: "Activo" },
                        { id: 0, name: "Inactivo" },
                    ]}
                    selectClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                    label="Estado"
                />

                <ButtonGrayDown>{wantCreate ? "Crear" : "Editar"} Categoria</ButtonGrayDown>
            </form>
        </div>
    );
};

export default page;
