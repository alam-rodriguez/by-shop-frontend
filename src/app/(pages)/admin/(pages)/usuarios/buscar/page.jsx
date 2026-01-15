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
import { getUserByEmail } from "@/app/hooks/request/users/requestsUsers";
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter();

    // const { moneda: idCurrency } = useParams();

    // const wantCreate = idCurrency == 0 ? true : false;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
        control,
        setValue,
    } = useForm({
        // resolver: zodResolver(currencySchema),
    });

    const { data, isLoading } = useGetCurrencyById(0);

    // useEffect(() => {
    //     if (wantCreate) return;
    //     if (isLoading) return;
    //     reset(data);
    // }, [data]);

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
        const loadingToast = toast.loading("Buscando usuario...");
        console.log(data);

        const res = await getUserByEmail(data.email);
        console.log(res);
        if (res) {
            toast.success("Usuario encontrado", {
                id: loadingToast,
            });
            router.push(`/admin/usuarios/usuarios/${res.id}`);
        } else
            toast.error("Este usuario no ha sido encontrado", {
                id: loadingToast,
            });

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
                <Input
                    register={register}
                    errors={errors}
                    type="text"
                    name="email"
                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Email del usuario"
                />
                {/* <Input
                    register={register}
                    errors={errors}
                    type="textarea"
                    name="description"
                    inputClassName="border-2 border-gray-300 rounded-md p-2 h-20 min-h-20 max-h-20"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Descripción de la moneda"
                /> */}
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

                {/* <Select
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
                /> */}
                <ButtonGrayDown>Buscar cliente</ButtonGrayDown>
            </form>
        </div>
    );
};

export default page;
