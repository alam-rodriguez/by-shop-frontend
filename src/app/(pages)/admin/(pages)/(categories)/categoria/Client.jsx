"use client";

import createCategorySchema from "@/app/schemas/category.schema";
import { zusAdminCategories } from "@/app/zustand/admin/categories/zusAdminCategories";
// import { useUploadThing } from "@/utils/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import useRequestCategories from "@/app/hooks/request/categories/useRequestCategories";
import useUploadThing from "@/app/hooks/upload-thing/useUploadThing";
import { useSearchParams } from "next/navigation";
// import { useParams } from "next/navigation";

const Client = () => {
    const searchParams = useSearchParams();

    // Obtener un parámetro específico
    const tipo = searchParams.get("tipo");

    const [type, setType] = useState(tipo == "departamentos" ? 4 : 0);

    // useEffect(() => {
    //     if (tipo == "departamentos") setType(4);
    // }, []);

    console.log();

    const { uploadImage, deleteImages, deleteImage } = useUploadThing();
    const { useCreateCategory, useUpdateCategory } = useRequestCategories();
    const { categorySelected, usingCategory } = zusAdminCategories();

    const wanCreate = Object.keys(categorySelected).length == 0 ? true : false;

    const [schemaIsRequired, setSchemaIsRequired] = useState(wanCreate);

    const categorySchema = createCategorySchema(schemaIsRequired);
    const defaultValues = wanCreate
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
    } = useForm({
        defaultValues,
        resolver: zodResolver(categorySchema),
    });

    // useEffect(() => {
    //     console.log(wanCreate);
    //     console.log(errors);
    // }, [errors]);

    const create = async (data) => {
        const resImage = await uploadImage(data.image[0], "folder", "nombre.png");
        const imageUrl = resImage[0].url;
        data.image = imageUrl;

        const res = await useCreateCategory(data);
        console.log(res);
    };
    const edit = async (data) => {
        if (typeof data.image[0] == "object") {
            const resDeleteIMages = await deleteImages([categorySelected.image]);
            const resImage = await uploadImage(data.image[0], "folder", "nombre.png");
            data.image = resImage[0].url;
        }
        const res = await useUpdateCategory(data);
        console.log(res);
        console.log("tienda actualizada");
    };

    const onSubmit = async (data) => {
        // console.log(data);
        // return;
        if (wanCreate) create(data);
        else edit(data);
    };

    useEffect(() => {
        console.log(categorySelected);
    }, [categorySelected]);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("name")} placeholder="Nombre categoria..." />
                {errors.name?.message && <p className="text-red-700">{errors.name?.message}</p>}
                {errors.slug?.message && <p className="text-red-700">{errors.slug?.message}</p>}

                <textarea name="" id="" {...register("description")} placeholder="Descripcion categoria..."></textarea>
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

                <br />
                <button>Crear categoria directa</button>
            </form>
        </div>
    );
};

export default Client;
