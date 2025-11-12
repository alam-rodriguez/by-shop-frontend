"use client";

// React
import React, { useEffect } from "react";

// Next
import { useParams } from "next/navigation";

// react-hook-form
import { useForm } from "react-hook-form";

// Zod
import { zodResolver } from "@hookform/resolvers/zod";

// Alerts
import { toast } from "sonner";

// Schemas
import currencySchema from "@/app/schemas/currency.schema";

// Hooks
import { useCanBeMainCurrency, useCreateCurrency, useGetCurrencyById, useUpdateCurrency } from "@/app/hooks/request/currencies/requestsCurrencies";

// Components
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import { ButtonGrayDown } from "@/app/components/others/Buttons";
import { useCreateAdvertisement, useGetAdvertisementById, useUpdateAdvertisement } from "@/app/hooks/request/advertisements/RequestsAdvertisements";
import advertisementSchema from "@/app/schemas/advertisements.schema";
import { useGetArticles } from "@/app/hooks/request/articles/requestsArticles";

const page = () => {
    const { id } = useParams();

    const wantCreate = id == 0 ? true : false;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
        control,
        setValue,
    } = useForm({
        resolver: zodResolver(advertisementSchema),
    });

    const { data, isLoading } = useGetAdvertisementById(id);

    const { data: articles } = useGetArticles();

    useEffect(() => {
        if (wantCreate) return;
        if (isLoading) return;
        reset(data);
    }, [data]);

    const handleChangeArticleSelected = (articleId) => {
        console.log(articleId);
        setValue("link", `${window.location.origin}/articulos/${articleId}`);
    };

    const create = async (data) => {
        const loadingToast = toast.loading("creando publicidad...");

        const res = await useCreateAdvertisement(data);
        console.log(res);

        if (res)
            toast.success("Publicidad creada correctamente", {
                id: loadingToast,
            });
        else
            toast.error("Error al crear la publicidad", {
                id: loadingToast,
            });
    };
    const edit = async (data) => {
        const loadingToast = toast.loading("Editando moneda...");

        const res = await useUpdateAdvertisement(data);
        console.log(res);
        if (res)
            toast.success("Moneda editada correctamente", {
                id: loadingToast,
            });
        else
            toast.error("Error al editar la moneda", {
                id: loadingToast,
            });
    };

    // TODO: No se puede crear 2 monedas principales - hacer
    const onSubmit = async (data) => {
        console.log(data);

        const canBeMain = await useCanBeMainCurrency(data.id);
        if (data.main_currency && !canBeMain) {
            toast.error("No se puede crear 2 monedas principales");
            return;
        }
        if (wantCreate) create(data);
        else edit(data);
    };

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
                    label="Nombre de la publicidad"
                />
                <Input
                    register={register}
                    errors={errors}
                    type="text"
                    name="description"
                    inputClassName="border-2 border-gray-300 rounded-md p-2 h-20 min-h-20 max-h-20"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Descripción de la publicidad"
                />
                <Select
                    register={register}
                    errors={errors}
                    type="text"
                    name="article_id"
                    items={articles ?? []}
                    selectClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                    label="Articulo a promocionar"
                    onChange={handleChangeArticleSelected}
                />
                <Input
                    register={register}
                    errors={errors}
                    type="text"
                    name="link"
                    inputClassName="border-2 border-gray-300 rounded-md p-2 h-20 min-h-20 max-h-20"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Link de la publicidad"
                />
                <Input
                    register={register}
                    errors={errors}
                    type="number"
                    name="sort_order"
                    inputClassName="border-2 border-gray-300 rounded-md p-2 h-20 min-h-20 max-h-20"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Orden de la publicidad"
                />

                {/* <div className="flex w-full overflow-hidden flex-wrap justify-between">
                    <Input
                        register={register}
                        errors={errors}
                        type="text"
                        name="symbol"
                        inputClassName="border-2 border-gray-300 rounded-md p-2"
                        errorClassName="text-red-700"
                        placeholder=""
                        label="Simbolo de la moneda"
                        width="48%"
                    />
                    <Input
                        register={register}
                        errors={errors}
                        type="number"
                        name="exchange_rate"
                        inputClassName="border-2 border-gray-300 rounded-md p-2"
                        errorClassName="text-red-700"
                        placeholder=""
                        label="Tasa de cambio"
                        width="48%"
                    />
                    <Input
                        register={register}
                        errors={errors}
                        type="text"
                        name="iso_code"
                        inputClassName="border-2 border-gray-300 rounded-md p-2"
                        errorClassName="text-red-700"
                        placeholder=""
                        label="Codigo ISO"
                        width="48%"
                    />
                    <Select
                        register={register}
                        errors={errors}
                        type="number"
                        name="main_currency"
                        items={[
                            { id: 1, name: "Si" },
                            { id: 0, name: "No" },
                        ]}
                        selectClassName="border-2 border-gray-300 rounded-md p-2"
                        errorClassName="text-red-700"
                        optionNameForShow="name"
                        label="Moneda principal"
                        width="48%"
                    />
                </div> */}

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
                <ButtonGrayDown>{wantCreate ? "Crear" : "Editar"} Moneda</ButtonGrayDown>
            </form>
        </div>
    );
};

export default page;
