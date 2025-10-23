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
import { useParams, useRouter } from "next/navigation";
import { isUUID } from "@/app/hooks/app/app";
import InputFile from "@/app/components/inputs/InputFile";
import { ButtonGrayDown } from "@/app/components/others/Buttons";
import { toast } from "sonner";
import { useGetModelById } from "@/app/hooks/request/models/requestsModels";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
// import { Router } from "next/router";

const page = () => {
    const router = useRouter();

    const { modelo: idModel } = useParams();

    const wantCreate = !isUUID(idModel);

    const { uploadImage, deleteImages, deleteImage } = useUploadThing();
    const { useCreateShop, useUpdateShop } = useRequestsShops();

    // const { shopSelected } = zusAdminShops();

    // const { brandSelected } = zusAdminBrands();
    const { modelSelected } = zusAdminModels();
    const wanCreate = Object.keys(modelSelected).length == 0 ? true : false;

    const [schemaIsRequired, setSchemaIsRequired] = useState(wanCreate);

    const { useGetModels, useCreateModel, useUpdateModel } = useRequestsModels();

    const { useGetBrands } = useRequestsBrands();

    // useEffect(() => {
    // console.log(shopSelected);
    // console.log(schemaIsRequired);
    // }, []);

    const shopSchema = createModelSchema(schemaIsRequired);

    const defaultValues = {
        ...modelSelected,
    };
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        control,
        reset,
    } = useForm({
        defaultValues,
        resolver: zodResolver(shopSchema),
    });

    const { data, isLoading } = useGetModelById(idModel);

    useEffect(() => {
        if (isLoading) return;
        reset(data);
        console.log(data);
    }, [data]);

    const create = async (data) => {
        const loadingToast = toast.loading("Registrando modelo...");

        if (typeof data.image == "object" && data.image) {
            const resImage = await uploadImage(data.image, "models", data.name);
            data.image = resImage[0].ufsUrl;
        } else data.image = null;

        const res = await useCreateModel(data);
        console.log(res);
        console.log("modelo creado");
        if (res) {
            toast.success("Modelo registrado correctamente", {
                id: loadingToast,
            });
            router.replace(`/admin/modelos/${data.id}`);
        } else
            toast.error("Error al registrar el modelo", {
                id: loadingToast,
            });
    };
    const edit = async (data) => {
        if (typeof data.image == "object") {
            const resDeleteIMages = await deleteImages([modelSelected.image]);
            const resImage = await uploadImage(data.image, "models", data.name);
            data.image = resImage[0].ufsUrl;
        }
        const res = await useUpdateModel(data);
        console.log(res);
        console.log("modelo actualizado ");
    };

    const onSubmit = async (data) => {
        console.log(data);
        // return;
        if (wantCreate) create(data);
        else edit(data);
    };

    const { brands } = zusAdminBrands();

    useEffect(() => {
        useGetBrands();
    }, []);
    // useEffect(() => {
    //     console.log(brands);
    // }, [brands]);

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
                    label="Nombre del modelo"
                />
                <Input
                    register={register}
                    errors={errors}
                    type="textarea"
                    name="description"
                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Descripcion del modelo"
                />
                <Select
                    register={register}
                    errors={errors}
                    type="text"
                    name="id_brand"
                    items={[{ id: "", name: "Seleccione una marca" }, ...brands]}
                    selectClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                    label="Tipo"
                />

                <InputFile
                    imgLink={data?.image}
                    control={control}
                    errors={errors}
                    name="image"
                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Imagen del modelo"
                />

                <ButtonGrayDown>Crear Model</ButtonGrayDown>
            </form>
        </div>
    );
};

export default page;
