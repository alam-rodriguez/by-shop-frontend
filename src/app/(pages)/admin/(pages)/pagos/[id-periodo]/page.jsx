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
import periodSchema from "@/app/schemas/period.schema";

const page = () => {
    const { ["id-periodo"]: idCurrency } = useParams();

    const wantCreate = idCurrency == 0 ? true : false;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
        control,
        setValue,
    } = useForm({
        resolver: zodResolver(periodSchema),
    });

    const { data, isLoading } = useGetCurrencyById(idCurrency);

    useEffect(() => {
        if (wantCreate) return;
        if (isLoading) return;
        reset(data);
    }, [data]);

    const create = async (data) => {
        const loadingToast = toast.loading("creando moneda...");

        const res = await useCreateCurrency(data);
        console.log(res);

        if (res)
            toast.success("Moneda creada correctamente", {
                id: loadingToast,
            });
        else
            toast.error("Error al crear la moneda", {
                id: loadingToast,
            });
    };
    const edit = async (data) => {
        const loadingToast = toast.loading("Editando moneda...");

        const res = await useUpdateCurrency(data);
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

        // const canBeMain = await useCanBeMainCurrency(data.id);
        // if (data.main_currency && !canBeMain) {
        //     toast.error("No se puede crear 2 monedas principales");
        //     return;
        // }
        // if (wantCreate) create(data);
        // else edit(data);
    };

    if (isLoading) return <LoadingParagraph />;

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="m-4">
                <div className="flex w-full overflow-hidden flex-wrap justify-between">
                    <Input
                        register={register}
                        errors={errors}
                        type="date"
                        name="start_date"
                        inputClassName="border-2 border-gray-300 rounded-md p-2"
                        errorClassName="text-red-700"
                        placeholder=""
                        label="Fecha Inicio Periodo"
                        width="48%"
                    />
                    <Input
                        register={register}
                        errors={errors}
                        type="date"
                        name="end_date"
                        inputClassName="border-2 border-gray-300 rounded-md p-2"
                        errorClassName="text-red-700"
                        placeholder=""
                        label="Fecha Inicio Periodo"
                        width="48%"
                    />
                </div>
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
                <ButtonGrayDown>{wantCreate ? "Crear" : "Editar"} Periodo</ButtonGrayDown>
            </form>
        </div>
    );
};

export default page;
