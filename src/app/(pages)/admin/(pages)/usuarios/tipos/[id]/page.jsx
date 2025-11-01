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
import typeUserSchema from "@/app/schemas/typeUser.schema";

// Hooks
import { useCanBeMainCurrency, useCreateCurrency, useGetCurrencyById, useUpdateCurrency } from "@/app/hooks/request/currencies/requestsCurrencies";

// Components
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import { ButtonGrayDown } from "@/app/components/others/Buttons";
import { useCreateUserType } from "@/app/hooks/request/users/requestsUsersTypes";

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
        resolver: zodResolver(typeUserSchema),
    });

    const { data, isLoading } = useGetCurrencyById(id);

    // useEffect(() => {
    //     if (wantCreate) return;
    //     if (isLoading) return;
    //     reset(data);
    // }, [data]);

    const create = async (data) => {
        const loadingToast = toast.loading("Creando tipo de usuario...");

        const res = await useCreateUserType(data);
        console.log(res);

        if (res)
            toast.success("Tipo de usuario creado correctamente", {
                id: loadingToast,
            });
        else
            toast.error("Error al crear el tipo de usuario", {
                id: loadingToast,
            });
    };
    const edit = async (data) => {
        toast.info("No se pueden actualizar los tipos de clientes");
        return;
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
        if (wantCreate) create(data);
        else edit(data);
    };

    useEffect(() => {
        console.log(errors);
    }, [errors]);

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
                    label="Nombre de la moneda"
                />
                <Input
                    register={register}
                    errors={errors}
                    type="textarea"
                    name="description"
                    inputClassName="border-2 border-gray-300 rounded-md p-2 h-20 min-h-20 max-h-20"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Descripción de la moneda"
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
                <ButtonGrayDown>{wantCreate ? "Crear" : "Editar"} Moneda</ButtonGrayDown>
            </form>
        </div>
    );
};

export default page;
