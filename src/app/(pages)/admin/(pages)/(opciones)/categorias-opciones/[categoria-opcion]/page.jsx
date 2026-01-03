"use client";

// React
import React, { useEffect } from "react";

// react-hook-form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import createShopSchema from "@/app/schemas/shop.schema";

// hooks
// import useUploadThing from "@/app/hooks/upload-thing/useUploadThing.js";
// import useRequestsShops from "@/app/hooks/request/shops/useRequestsShops";
// import { zusAdminShops } from "@/app/zustand/admin/shops/zusAdminShops";
// import useRequestsBrands from "@/app/hooks/request/brands/useRequestsBrands";
// import { zusAdminBrands } from "@/app/zustand/admin/brands/zusAdminbrands";
// import createBrandSchema from "@/app/schemas/brand.schema";
// import { zusAdminModels } from "@/app/zustand/admin/models/zusAdminModels";
// import useRequestsModels from "@/app/hooks/request/models/useRequetsModels";
// import createModelSchema from "@/app/schemas/model.schema";
// import { zusAdminOptions } from "@/app/zustand/admin/options/zusAdminOptions";
// import optionSchema from "@/app/schemas/option.schema";
// import useRequestsOptions from "@/app/hooks/request/options/useRequestsOptions";
// import optionValueSchema from "@/app/schemas/optionValue.schema";
// import { useSearchParams } from "next/navigation";

// Schemas
import optionCategorySchema from "@/app/schemas/optionCategory.schema";

// Next
// import { useRouter } from "next/router";
import { useParams, useSearchParams, useRouter } from "next/navigation";

// Hooks
import { isUUID } from "@/app/hooks/app/app";
import { useCreateOptionCategory, useGetOptionCategoryById, useUpdateOptionCatgory } from "@/app/hooks/request/options/requestsOptions";

// Components
import Select from "@/app/components/inputs/Select";
import Input from "@/app/components/inputs/Input";
// import { ButtonGray } from "@/app/components/others/Buttons";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import { ButtonGrayDown } from "@/app/components/others/Buttons";

// Alerts
import { toast } from "sonner";

const page = ({ params }) => {
    const router = useRouter();

    // const resolvedParams = use(params);
    // const id = resolvedParams["categoria-opcion"];
    // const wanCreate = id == 0 ? true : false;

    const { ["categoria-opcion"]: idCategoryOption } = useParams();

    const wantCreate = !isUUID(idCategoryOption);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(optionCategorySchema),
    });

    const { data, isLoading } = useGetOptionCategoryById(idCategoryOption);

    useEffect(() => {
        if (isLoading || !data) return;
        reset(data);
    }, [data]);

    const create = async (data) => {
        const loadingToast = toast.loading("Creando categorias de opciones...");
        const res = await useCreateOptionCategory(data);
        if (res) {
            toast.success("Categoria de opcion creada correctamente", {
                id: loadingToast,
            });
            router.replace(`/admin/categorias-opciones/${data.id}`);
        } else
            toast.error("Error al registrar la categoria de opcion", {
                id: loadingToast,
            });
    };
    const edit = async (data) => {
        const loadingToast = toast.loading("Actualizando categorias de opciones...");

        const res = await useUpdateOptionCatgory(data);
        if (res)
            toast.success("Categoria de opcion actualizada correctamente", {
                id: loadingToast,
            });
        else
            toast.error("Error al actualizar la categoria de opcion", {
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
                    label="Nombre de la categoria"
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
                <br />
                <ButtonGrayDown>{wantCreate ? "Crear" : "Actualizar"} Categoria de Opciones</ButtonGrayDown>
            </form>
        </div>
    );
};

export default page;
