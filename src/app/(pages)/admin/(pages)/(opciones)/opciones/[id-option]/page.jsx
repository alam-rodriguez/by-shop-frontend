"use client";

import React, { use, useEffect, useRef, useState } from "react";

// react-hook-form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import createShopSchema from "@/app/schemas/shop.schema";

// hooks
import useUploadThing from "@/app/hooks/upload-thing/useUploadThing.js";
import useRequestsShops from "@/app/hooks/request/shops/useRequestsShops";
import { zusAdminShops } from "@/app/zustand/admin/shops/zusAdminShops";
import useRequestsBrands from "@/app/hooks/request/brands/useRequestsBrands";
import { zusAdminBrands } from "@/app/zustand/admin/brands/zusAdminbrands";
import createBrandSchema from "@/app/schemas/brand.schema";
import Input from "@/app/components/inputs/Input";
import { zusAdminModels } from "@/app/zustand/admin/models/zusAdminModels";
import useRequestsModels from "@/app/hooks/request/models/useRequetsModels";
import Select from "@/app/components/inputs/Select";
import createModelSchema from "@/app/schemas/model.schema";
import { zusAdminOptions } from "@/app/zustand/admin/options/zusAdminOptions";
import optionSchema from "@/app/schemas/option.schema";
import useRequestsOptions from "@/app/hooks/request/options/useRequestsOptions";
import { useGetOptionById, useGetOptionCategories } from "@/app/hooks/request/options/requestsOptions";
import { useParams, useRouter } from "next/navigation";
import { isUUID } from "@/app/hooks/app/app";
import { ButtonGrayDown } from "@/app/components/others/Buttons";
import { toast } from "sonner";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";

const page = () => {
    const router = useRouter();

    const { ["id-option"]: idOption } = useParams();

    const wantCreate = !isUUID(idOption);

    // const { uploadImage, deleteImages, deleteImage } = useUploadThing();
    // const { useCreateShop, useUpdateShop } = useRequestsShops();

    const { data: optionCategories, isLoading: isLoadingOptionCategories } = useGetOptionCategories();

    // useEffect(() => {
    //     console.log();
    // }, [optionCategories]);

    // const { shopSelected } = zusAdminShops();

    // const { brandSelected } = zusAdminBrands();
    const { modelSelected } = zusAdminModels();
    const { optionSelected } = zusAdminOptions();
    const wanCreate = Object.keys(optionSelected).length == 0 ? true : false;

    const [schemaIsRequired, setSchemaIsRequired] = useState(wanCreate);

    const { useGetModels, useCreateModel, useUpdateModel } = useRequestsModels();

    const { useGetBrands, useCreateBrand, useUpdateBrand } = useRequestsBrands();

    const { useGetOptions, useCreateOption, useUpdateOption } = useRequestsOptions();

    // useEffect(() => {
    // console.log(shopSelected);
    // console.log(schemaIsRequired);
    // }, []);

    // TODO: traer la opcionpor su id

    // const shopSchema = createModelSchema(schemaIsRequired);

    const defaultValues = {
        ...optionSelected,
    };
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues,
        resolver: zodResolver(optionSchema),
    });

    const { data, isLoading } = useGetOptionById(idOption);

    useEffect(() => {
        if (isLoading || !data) return;
        reset(data);
    }, [data]);

    const create = async (data) => {
        // const resImage = await uploadImage(data.image[0], "folder", "nombre.png");
        // const imageUrl = resImage[0].url;
        // data.image = imageUrl;
        const loadingToast = toast.loading("Creando opcion...");

        const res = await useCreateOption(data);
        // console.log(res);
        // console.log("modelo creado");
        if (res) {
            toast.success("Opcion creada correctamente", {
                id: loadingToast,
            });
            router.replace(`/admin/opciones/${data.id}`);
        } else
            toast.error("Error al crear la opcion", {
                id: loadingToast,
            });
    };
    const edit = async (data) => {
        // if (typeof data.image[0] == "object") {
        //     const resDeleteIMages = await deleteImages([modelSelected.image]);
        //     const resImage = await uploadImage(data.image[0], "folder", "nombre.png");
        //     data.image = resImage[0].url;
        // }
        const loadingToast = toast.loading("Actualizando opcion...");

        const res = await useUpdateOption(data);
        // console.log(res);
        // console.log("modelo actualizado ");
        if (res) {
            toast.success("Opcion actualizada correctamente", {
                id: loadingToast,
            });
            router.replace(`/admin/opciones/${data.id}`);
        } else
            toast.error("Error al actualizar la opcion", {
                id: loadingToast,
            });
    };

    const onSubmit = async (data) => {
        console.log(data);
        if (wantCreate) create(data);
        else edit(data);
    };

    // const { brands } = zusAdminBrands();

    // useEffect(() => {
    //     useGetBrands();
    // }, []);
    // useEffect(() => {
    //     console.log(brands);
    // }, [brands]);

    // CREATE TABLE options (
    //     id CHAR(36) NOT NULL PRIMARY KEY,
    //     name VARCHAR(55) NOT NULL,
    //     require_image TINYINT NOT NULL DEFAULT 0,
    //     require_color TINYINT NOT NULL DEFAULT 0,
    //     require_quantity TINYINT NOT NULL DEFAULT 0,
    //     require_price TINYINT NOT NULL DEFAULT 0,
    //     type TINYINT NOT NULL,
    //     id_option_category CHAR(36) NOT NULL,
    //     status TINYINT NOT NULL
    // );

    if (isLoading) return <LoadingParagraph />;
    return (
        <div className="m-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    register={register}
                    errors={errors}
                    type="text"
                    name="name"
                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Nombre de la opcion"
                />
                <Select
                    register={register}
                    errors={errors}
                    type="number"
                    name="require_image"
                    items={[
                        { id: 0, name: "No" },
                        { id: 1, name: "Si" },
                    ]}
                    selectClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                    label="La opcion requiere imagen?"
                />
                <Select
                    register={register}
                    errors={errors}
                    type="number"
                    name="require_color"
                    items={[
                        { id: 0, name: "No" },
                        { id: 1, name: "Si" },
                    ]}
                    selectClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                    label="La opcion requiere color?"
                />
                <Select
                    register={register}
                    errors={errors}
                    type="number"
                    name="require_quantity"
                    items={[
                        { id: 0, name: "No" },
                        { id: 1, name: "Si" },
                    ]}
                    selectClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                    label="La opcion requiere cantidad?"
                />
                <Select
                    register={register}
                    errors={errors}
                    type="number"
                    name="require_price"
                    items={[
                        { id: 0, name: "No" },
                        { id: 1, name: "Si" },
                    ]}
                    selectClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                    label="La opcion requiere precio?"
                />
                {/* <Input
                    register={register}
                    errors={errors}
                    type="text"
                    name="name"
                    inputClassName="Descripcion..."
                    errorClassName="text-red-700"
                    placeholder="nombre..."
                /> */}
                <Select
                    register={register}
                    errors={errors}
                    type="text"
                    name="id_option_category"
                    items={[{ id: "", name: "Seleccione una categoria" }, ...(Array.isArray(optionCategories) ? optionCategories : [])]}
                    selectClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                    label="Categoria de opcion"
                />
                {/* <Select
                    register={register}
                    errors={errors}
                    name="id_option_category"
                    items={optionCategories ? optionCategories : []}
                    type="text"
                    selectClassName=""
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                /> */}
                {/* <Select
                    register={register}
                    errors={errors}
                    type="number"
                    name="type"
                    items={[
                        { id: 1, name: "Normal" },
                        { id: 2, name: "Especia" },
                        { id: 3, name: "Unico" },
                    ]}
                    selectClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                    label="Tipo de opcion"
                /> */}

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
                    label="Estado de la opcion"
                />
                {/* <Select
                    register={register}
                    errors={errors}
                    name="type"
                    items={[
                        { id: 1, name: "Normal" },
                        { id: 2, name: "Especia" },
                        { id: 3, name: "Unico" },
                    ]}
                    type="number"
                    selectClassName=""
                    errorClassName="text-red-700"
                /> */}
                {/* <br /> */}
                {/* <button type="submit">Crear Opcion</button> */}
                <ButtonGrayDown>{wantCreate ? "Crear" : "Actualizar"} Opcion</ButtonGrayDown>
            </form>
        </div>
    );
};

export default page;
