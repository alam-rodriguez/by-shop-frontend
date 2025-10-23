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
import Select from "@/app/components/inputs/Select";
import { ButtonGrayDown } from "@/app/components/others/Buttons";
import InputFile from "@/app/components/inputs/InputFile";
import { useParams, useRouter } from "next/navigation";
import { isUUID } from "@/app/hooks/app/app";
import { toast } from "sonner";
import { useGetBrandById } from "@/app/hooks/request/brands/requestsBrands";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";

const page = () => {
    const router = useRouter();

    const { marca: idBrand } = useParams();

    const wantCreate = !isUUID(idBrand);

    const { uploadImage, deleteImages, deleteImage } = useUploadThing();
    const { useCreateShop, useUpdateShop } = useRequestsShops();

    // const { shopSelected } = zusAdminShops();

    const { brandSelected } = zusAdminBrands();
    const wanCreate = Object.keys(brandSelected).length == 0 ? true : false;

    const [schemaIsRequired, setSchemaIsRequired] = useState(wanCreate);

    const { useGetBrands, useCreateBrand, useUpdateBrand } = useRequestsBrands();

    // useEffect(() => {
    // console.log(shopSelected);
    // console.log(schemaIsRequired);
    // }, []);

    const shopSchema = createBrandSchema(schemaIsRequired);

    const defaultValues = {
        ...brandSelected,
    };
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues,
        resolver: zodResolver(shopSchema),
    });

    const { data, isLoading } = useGetBrandById(idBrand);

    useEffect(() => {
        if (isLoading || !data) return;
        reset(data);
        console.log(data);
    }, [data]);

    const create = async (data) => {
        const loadingToast = toast.loading("Registrando marca...");
        if (typeof data.image == "object" && data.image) {
            const resImage = await uploadImage(data.image, "brands", data.name);
            data.image = resImage[0].ufsUrl;
        } else data.image = null;

        const res = await useCreateBrand(data);
        console.log(res);
        console.log("tienda creada");
        if (res) {
            toast.success("Marca registrada correctamente", {
                id: loadingToast,
            });
            router.replace(`/admin/marcas/${data.id}`);
        } else
            toast.error("Error al registrar la marca", {
                id: loadingToast,
            });
    };
    const edit = async (data) => {
        const loadingToast = toast.loading("Actualizando marca...");

        let resDeleteIMages = true;
        if (typeof data.image == "object" && data.image) {
            alert("entro");
            resDeleteIMages = await deleteImages([brandSelected.image]);
            const resImage = await uploadImage(data.image, "brands", data.name);
            data.image = resImage[0].ufsUrl;
        }
        const res = await useUpdateBrand(data);
        // console.log(res);
        // console.log("tienda actualizada");
        if (res && resDeleteIMages)
            toast.success("Marca actualizada correctamente", {
                id: loadingToast,
            });
        else
            toast.error("Error al actualizar la marca", {
                id: loadingToast,
            });
    };

    const onSubmit = async (data) => {
        console.log(data);
        if (wantCreate) create(data);
        else edit(data);
    };

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
                    label="Nombre de la tienda"
                />
                {/* <Input
                    register={register}
                    errors={errors}
                    type="text"
                    name="name"
                    inputClassName=""
                    errorClassName="text-red-700"
                    placeholder="Nombre..."
                /> */}
                <Input
                    register={register}
                    errors={errors}
                    type="textarea"
                    name="description"
                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Descripcion de la marca"
                />
                {/* <Input
                    register={register}
                    errors={errors}
                    type="textarea"
                    name="description"
                    inputClassName="Descripcion..."
                    errorClassName="text-red-700"
                    placeholder="Descripcion..."
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
                    label="Tipo"
                />
                {/* <Select
                    register={register}
                    errors={errors}
                    name="status"
                    items={[
                        { id: 1, name: "Activo" },
                        { id: 0, name: "Inactivo" },
                    ]}
                    type="number"
                    selectClassName=""
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                /> */}
                <InputFile
                    imgLink={""}
                    control={control}
                    errors={errors}
                    name="image"
                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Imagen de la marca"
                />
                {/* <input type="file" {...register("image")} /> */}
                {/* <p></p> */}
                {/* <Input register={register} errors={errors} type="file" name="image" inputClassName="" errorClassName="text-red-700" /> */}
                <br />
                <ButtonGrayDown>Crear Marca</ButtonGrayDown>
                {/* <button type="submit">Crear Marca</button> */}
            </form>
        </div>
    );
};

export default page;
