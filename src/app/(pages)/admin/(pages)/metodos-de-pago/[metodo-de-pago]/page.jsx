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
// import createBrandSchema from "@/app/schemas/brand.schema";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import payMethodSchema from "@/app/schemas/payMethod.schema";
import { zusAdminPaymentMethods } from "@/app/zustand/admin/payment-methods/zusPaymentMethods";
import useRequestsPaymentMethods from "@/app/hooks/request/payment-methods/usePaymentMethods";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useGetPaymentMethodById } from "@/app/hooks/request/payment-methods/requestsPaymentMethods";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import { ButtonGrayDown } from "@/app/components/others/Buttons";

const page = () => {
    const { ["metodo-de-pago"]: id } = useParams();

    const wanCreate = id == 0 ? true : false;

    console.log(id);

    const { uploadImage, deleteImages, deleteImage } = useUploadThing();
    const { useCreateShop, useUpdateShop } = useRequestsShops();

    // const { shopSelected } = zusAdminShops();

    // const { brandSelected } = zusAdminBrands();
    const { paymentMethods, setPaymentMethodSelected, paymentMethodSelected } = zusAdminPaymentMethods();
    // const wanCreate = Object.keys(paymentMethodSelected).length == 0 ? true : false;

    // const [schemaIsRequired, setSchemaIsRequired] = useState(wanCreate);

    const { useGetBrands, useCreateBrand, useUpdateBrand } = useRequestsBrands();
    const { useGetPaymentMethods, useCreatePaymentMethod, useUpdatePaymentMethod } = useRequestsPaymentMethods();

    // useEffect(() => {
    // console.log(shopSelected);
    // console.log(schemaIsRequired);
    // }, []);

    // const shopSchema = createBrandSchema(schemaIsRequired);

    const defaultValues = {
        ...paymentMethodSelected,
    };
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues,
        resolver: zodResolver(payMethodSchema),
    });

    const { data, isLoading } = useGetPaymentMethodById(id);

    useEffect(() => {
        if (id == 0 || isLoading) return;
        reset(data);
    }, [data]);

    const create = async (data) => {
        const loadingToast = toast.loading("Creando metodo de pago...");

        const res = await useCreatePaymentMethod(data);
        console.log(res);
        console.log("tienda creada");

        if (res)
            toast.success("Metodo de pago creado", {
                id: loadingToast,
            });
        else
            toast.error("Error al crear el metodo de pago", {
                id: loadingToast,
            });
    };
    const edit = async (data) => {
        const loadingToast = toast.loading("Actualizando metodo de pago...");

        const res = await useUpdatePaymentMethod(data);
        if (res)
            toast.success("Metodo de pago actualizado", {
                id: loadingToast,
            });
        else
            toast.error("Error al actualizar el metodo de pago", {
                id: loadingToast,
            });
    };

    const onSubmit = async (data) => {
        // console.log(wanCreate);
        // console.log(data);
        // return;
        if (wanCreate) create(data);
        else edit(data);
    };

    // id
    // name
    // estado

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
                    label="Nombre de metodo de pago"
                />

                <Input
                    register={register}
                    errors={errors}
                    type="textarea"
                    name="description"
                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Descripcion del metodo de pago"
                />

                <Select
                    register={register}
                    errors={errors}
                    type="number"
                    name="type"
                    items={[
                        { id: 1, name: "Efectivo" },
                        { id: 2, name: "Transferencia" },
                        { id: 3, name: "Tarjeta de Credito" },
                        { id: 4, name: "Tarjeta de Credito Virtual" },
                    ]}
                    selectClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                    label="Tipo de metodo de pago"
                />
                {watch("type") == 4 && (
                    <Select
                        register={register}
                        errors={errors}
                        type="number"
                        name="is_paypal_method"
                        items={[
                            { id: 0, name: "No" },
                            { id: 1, name: "Si" },
                        ]}
                        selectClassName="border-2 border-gray-300 rounded-md p-2"
                        errorClassName="text-red-700"
                        optionNameForShow="name"
                        label="Metodo de pago es Paypal"
                    />
                )}

                {watch("type") == 2 && (
                    <>
                        <Select
                            register={register}
                            errors={errors}
                            type="number"
                            name="require_image"
                            items={[
                                { id: 1, name: "Si" },
                                { id: 0, name: "No" },
                            ]}
                            selectClassName="border-2 border-gray-300 rounded-md p-2"
                            errorClassName="text-red-700"
                            optionNameForShow="name"
                            label="Metodo de pago requiere imagen"
                        />
                        <Input
                            register={register}
                            errors={errors}
                            type="text"
                            name="bank_name"
                            inputClassName="border-2 border-gray-300 rounded-md p-2"
                            errorClassName="text-red-700"
                            placeholder=""
                            label="Nombre de banco"
                        />

                        <Input
                            register={register}
                            errors={errors}
                            type="number"
                            name="bank_account"
                            inputClassName="border-2 border-gray-300 rounded-md p-2"
                            errorClassName="text-red-700"
                            placeholder=""
                            label="Numero de cuenta bancaria"
                        />
                    </>
                )}

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

                <ButtonGrayDown>{wanCreate ? "Crear" : "Actualizar"} Metodo de Pago</ButtonGrayDown>
            </form>
        </div>
    );
};

export default page;
