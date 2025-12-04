"use client";

import React, { use, useEffect, useRef, useState } from "react";

// react-hook-form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import createShopSchema from "@/app/schemas/shop.schema";

// hooks
// import useUploadThing from "@/app/hooks/upload-thing/useUploadThing.js";
import useRequestsShops from "@/app/hooks/request/shops/useRequestsShops";
import { zusAdminShops } from "@/app/zustand/admin/shops/zusAdminShops";
import Input from "@/app/components/inputs/Input";
import InputFile from "@/app/components/inputs/InputFile";
import Select from "@/app/components/inputs/Select";
import ButtonGray from "@/app/components/others/ButtonGray";
import { ButtonGrayDown } from "@/app/components/others/Buttons";
import useMyUploadThing from "@/app/hooks/upload-thing/useUploadThing.js";
import { UploadButton } from "@/utils/uploadthing";
import { useParams } from "next/navigation";
import { isUUID } from "@/app/hooks/app/app";
import { useGetShopById } from "@/app/hooks/request/shops/requestsShops";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import { toast } from "sonner";

import shopPlanSchema from "@/app/schemas/shopPlan.schema";
import { useCreateShopPlan, useGetShopPlanById, useGetShopsPlans, useUpdateShopPlan } from "@/app/hooks/request/shops/requestsShopsPlans";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { useCreateShopCode, useGetShopCodeById } from "@/app/hooks/request/shops/requestsShopsCodes";
import shopCodeSchema from "@/app/schemas/shopCode.schema";

const page = () => {
    const router = useRouter();

    const { id } = useParams();

    const wantCreate = !isUUID(id);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        control,
        reset,
        setValue,
    } = useForm({
        resolver: zodResolver(shopCodeSchema),
    });

    const { data } = useGetShopCodeById(id);

    const { data: plans } = useGetShopsPlans();

    useEffect(() => {
        if (wantCreate || !data) return;
        reset(data);
    }, [data]);

    const create = async (data) => {
        const loadingToast = toast.loading("Creando plan tienda...");

        const res = await useCreateShopCode(data);

        if (res)
            toast.success("Plan tienda creado correctamente", {
                id: loadingToast,
            });
        else
            toast.error("Error al crear plan tienda", {
                id: loadingToast,
            });
        router.replace(`/admin/tiendas/codigos/${data.id}`);
    };
    const edit = async (data) => {
        // const loadingToast = toast.loading("Actualizando plan tienda...");
        // const res = await useUpdateShopCode(data);
        // if (res)
        //     toast.success("Plan tienda actualizada correctamente", {
        //         id: loadingToast,
        //     });
        // else
        //     toast.error("Error al actualizar plan tienda", {
        //         id: loadingToast,
        //     });
    };

    const onSubmit = async (data) => {
        console.log(data);
        if (wantCreate) create(data);
        else edit(data);
    };

    // if (isLoading) return <LoadingParagraph />;

    // CREATE TABLE shops_codes (
    //             id CHAR(36) NOT NULL PRIMARY KEY,
    //             shops_plans_id CHAR(36) NOT NULL,
    //             status TINYINT DEFAULT 1,
    //             code VARCHAR(100) NOT NULL UNIQUE,
    //             used_at TIMESTAMP NULL DEFAULT NULL,
    //             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    //             updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    //         );

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="m-4">
            <p className="text-center font-bold text-lg">Lista de Planes de Tiendas</p>
            <Input
                register={register}
                errors={errors}
                type="text"
                name="code"
                inputClassName="border-2 border-gray-300 rounded-md p-2"
                errorClassName="text-red-700"
                placeholder=""
                label="Código"
            />
            <Select
                register={register}
                errors={errors}
                type="text"
                name="shops_plans_id"
                items={plans || []}
                selectClassName="border-2 border-gray-300 rounded-md p-2"
                errorClassName="text-red-700"
                optionNameForShow="name"
                label="Plan de tienda"
            />
            <Select
                register={register}
                errors={errors}
                type="number"
                name="status"
                items={[
                    { id: 1, name: "Activa" },
                    { id: 0, name: "Inactiva" },
                ]}
                selectClassName="border-2 border-gray-300 rounded-md p-2"
                errorClassName="text-red-700"
                optionNameForShow="name"
                label="Estado"
            />
            <ButtonGrayDown>{wantCreate ? "Crear" : "Editar"} Codigo</ButtonGrayDown>
        </form>
    );
};

export default page;
