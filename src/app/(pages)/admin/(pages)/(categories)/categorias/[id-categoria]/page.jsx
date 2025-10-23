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
// import { useParams } from "next/navigation";

const page = () => {
    const { ["id-categoria"]: idCategory } = useParams();

    const wantCreate = idCategory == 0 ? true : false;

    const searchParams = useSearchParams();
    const type = searchParams.get("tipo");
    const typeCategories = type == "directas" ? 1 : type == "indirectas" ? 2 : type == "generales" ? 3 : 0;
    const typeCategoriesInEnglish =
        typeCategories == 1 ? "directs-categories" : typeCategories == 2 ? "indirects-categories" : typeCategories == 3 ? "generals-categories" : "";

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
    const defaultValues = wantCreate
        ? {
              type: type,
          }
        : {
              ...categorySelected,
          };
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
        control,
        setValue,
    } = useForm({
        defaultValues,
        resolver: zodResolver(categorySchema),
    });

    useEffect(() => {
        setValue("type", typeCategories);
    }, []);

    const { data: category, isLoading } = useGetCategoryById(idCategory);

    useEffect(() => {
        console.log(isLoading);

        if (isLoading || wantCreate) return;
        console.log(category);
        reset(category);
    }, [category, isLoading]);

    // idCategory;

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    const create = async (data) => {
        const loadingToast = toast.loading("creando categoria...");

        if (typeof data.image == "object" && data.image) {
            // const resImage = await uploadImage(data.image[0], "folder", "nombre.png");
            const resImage = await uploadImage(data.image, `categories/${typeCategoriesInEnglish}`, data.name);
            const imageUrl = resImage[0].url;
            data.image = imageUrl;
        }

        const res = await useCreateCategory(data);
        console.log(res);

        if (res)
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
        if (typeof data.image == "object" && data.image) {
            alert("entro");
            if (category.image) resDeleteIMages = await deleteImages([category.image]);
            const resImage = await uploadImage(data.image, `categories/${typeCategoriesInEnglish}`, data.name);

            // const resImage = await uploadImage(data.image[0], "folder", "nombre.png");
            data.image = resImage[0].url;
        }
        const res = await useUpdateCategory(data);
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
        console.log(typeCategories);
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
                    type="color"
                    name="color"
                    inputClassName="border-2 border-gray-300 rounded-md p-2 w-full"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Descripción de la oferta"
                />

                <InputFile
                    imgLink={category?.image}
                    control={control}
                    errors={errors}
                    name="image"
                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Imagen de la oferta"
                />

                <Select
                    register={register}
                    errors={errors}
                    type="number"
                    name="view"
                    items={[
                        { id: 1, name: "Mostrar" },
                        { id: 0, name: "No mostrar" },
                    ]}
                    selectClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                    label="Vista"
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

                {/* <input type="text" {...register("name")} placeholder="Nombre categoria..." />
                {errors.name?.message && <p className="text-red-700">{errors.name?.message}</p>}
                {errors.slug?.message && <p className="text-red-700">{errors.slug?.message}</p>} */}

                {/* <textarea name="" id="" {...register("description")} placeholder="Descripcion categoria..."></textarea>
                {errors.description?.message && <p className="text-red-700">{errors.description?.message}</p>}
                <input type="color" {...register("color")} />
                {errors.color?.message && <p className="text-red-700">{errors.color?.message}</p>}
                <input type="file" {...register("image")} onChange={() => setSchemaIsRequired(true)} />
                {errors.image?.message && <p className="text-red-700">{errors.image?.message}</p>}
                <select
                    name=""
                    id=""
                    {...register("view", { type: "number", setValueAs: (value) => (value === "" ? undefined : parseFloat(value)) })}
                >
                    <option value={1}>Mostrar</option>
                    <option value={0}>No mostrar</option>
                </select>
                {errors.view?.message && <p className="text-red-700">{errors.view?.message}</p>}

                <br /> */}
                {/* <button>Crear categoria directa</button> */}
                <ButtonGrayDown>{wantCreate ? "Crear" : "Editar"} Categoria</ButtonGrayDown>
            </form>
        </div>
    );
};

export default page;
