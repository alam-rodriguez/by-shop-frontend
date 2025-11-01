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
import locationCountrySchema from "@/app/schemas/locations.country.schema";

// Hooks
import { useCreateLocationCountry, useGetLocationCountryById, useUpdateLocationCountry } from "@/app/hooks/request/locations/requestsLocations";

// Components
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import { ButtonGrayDown } from "@/app/components/others/Buttons";

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
        resolver: zodResolver(locationCountrySchema),
    });

    const { data, isLoading } = useGetLocationCountryById(id);

    useEffect(() => {
        if (wantCreate) return;
        if (isLoading) return;
        reset(data);
    }, [data]);

    const create = async (data) => {
        const loadingToast = toast.loading("creando pais...");

        const res = await useCreateLocationCountry(data);
        console.log(res);

        if (res)
            toast.success("Pais creado correctamente", {
                id: loadingToast,
            });
        else
            toast.error("Error al crear el Pais", {
                id: loadingToast,
            });
    };
    const edit = async (data) => {
        const loadingToast = toast.loading("Editando pais...");

        const res = await useUpdateLocationCountry(data);
        console.log(res);
        if (res)
            toast.success("pais editado correctamente", {
                id: loadingToast,
            });
        else
            toast.error("Error al editar el pais", {
                id: loadingToast,
            });
    };

    const onSubmit = async (data) => {
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
                    label="Nombre del pais"
                />
                <Input
                    register={register}
                    errors={errors}
                    type="textarea"
                    name="description"
                    inputClassName="border-2 border-gray-300 rounded-md p-2 h-20 min-h-20 max-h-20"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Descripción del pais"
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
                />
                <Input
                    register={register}
                    errors={errors}
                    type="number"
                    name="latitude"
                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Latitude del pais"
                />
                <Input
                    register={register}
                    errors={errors}
                    type="number"
                    name="longitude"
                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Longitude del pais"
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
                <ButtonGrayDown>{wantCreate ? "Crear" : "Editar"} Pais</ButtonGrayDown>
            </form>
        </div>
    );
};

export default page;
