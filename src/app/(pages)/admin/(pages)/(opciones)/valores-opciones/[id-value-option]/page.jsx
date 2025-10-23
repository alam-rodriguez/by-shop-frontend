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
import optionValueSchema from "@/app/schemas/optionValue.schema";
import { useParams, useRouter } from "next/navigation";
import { isUUID } from "@/app/hooks/app/app";
import { toast } from "sonner";
import { ButtonGrayDown } from "@/app/components/others/Buttons";
import { useGetOptionValueById } from "@/app/hooks/request/options/requestsOptions";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";

const page = () => {
    const router = useRouter();

    const { ["id-value-option"]: idValueOption } = useParams();
    const wantCreate = !isUUID(idValueOption);

    // const { uploadImage, deleteImages, deleteImage } = useUploadThing();
    // const { useCreateShop, useUpdateShop } = useRequestsShops();

    // const { shopSelected } = zusAdminShops();

    // const { brandSelected } = zusAdminBrands();
    const { modelSelected } = zusAdminModels();
    const { options, valuesOptions, optionSelected, valueOptionSelected } = zusAdminOptions();
    const wanCreate = Object.keys(valueOptionSelected).length == 0 ? true : false;

    const [schemaIsRequired, setSchemaIsRequired] = useState(wanCreate);

    const { useGetModels, useCreateModel, useUpdateModel } = useRequestsModels();

    const { useGetBrands, useCreateBrand, useUpdateBrand } = useRequestsBrands();

    const { useGetOptions, useCreateOption, useUpdateOption, useCreateOptionValue, useUpdateOptionValue } = useRequestsOptions();

    // useEffect(() => {
    // console.log(shopSelected);
    // console.log(schemaIsRequired);
    // }, []);

    // const shopSchema = createModelSchema(schemaIsRequired);

    useEffect(() => {
        console.log(valueOptionSelected);
    }, [valueOptionSelected]);

    const defaultValues = {
        ...valueOptionSelected,
    };
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues,
        resolver: zodResolver(optionValueSchema),
    });

    const { data, isLoading } = useGetOptionValueById(idValueOption);

    useEffect(() => {
        if (isLoading || !data) return;
        reset(data);
    }, [data]);

    const create = async (data) => {
        const loadingToast = toast.loading("Creando valor de opcion...");

        const res = await useCreateOptionValue(data);
        if (res) {
            toast.success("Valor de opcion creado correctamente", {
                id: loadingToast,
            });
            router.replace(`/admin/valores-opciones/${data.id}`);
        } else
            toast.error("Error al crear valor de opcion", {
                id: loadingToast,
            });
    };
    const edit = async (data) => {
        const loadingToast = toast.loading("Actualizando valor de opcion...");

        const res = await useUpdateOptionValue(data);
        if (res)
            toast.success("Valor de opcion actualizada correctamente", {
                id: loadingToast,
            });
        else
            toast.error("Error al actualizar valor de opcion", {
                id: loadingToast,
            });
    };

    const onSubmit = async (data) => {
        console.log(data);
        if (wantCreate) create(data);
        else edit(data);
    };

    // const { brands } = zusAdminBrands();

    useEffect(() => {
        // useGetBrands();
        useGetOptions();
    }, []);

    // id: z
    //     .string()
    //     .uuid()
    //     .default(() => uuidv4()),
    // id_option: z.string().uuid(),
    // value: z.string().min(4).max(255),

    // CREATE TABLE options_values (
    //     id CHAR(36) NOT NULL PRIMARY KEY,
    //     name VARCHAR(55) NOT NULL,
    //     value VARCHAR(55) NOT NULL,
    //     id_option CHAR(36) NOT NULL,
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
                    placeholder="nombre..."
                    label="Nombre del valor de Opcion"
                />
                <Select
                    register={register}
                    errors={errors}
                    type="text"
                    name="id_option"
                    items={options}
                    selectClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                    label="Opcion asociada"
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
                <ButtonGrayDown>{wantCreate ? "Crear" : "Actualizar"} Valor de Opcion</ButtonGrayDown>
            </form>
        </div>
    );
};

export default page;
