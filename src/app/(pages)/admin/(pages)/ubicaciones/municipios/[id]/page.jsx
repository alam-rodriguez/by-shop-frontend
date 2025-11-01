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
import {
    useCreateLocationCountry,
    useCreateLocationMunicipality,
    useCreateLocationProvince,
    useGetLocationCountryById,
    useGetLocationMunicipalityById,
    useGetLocationProvinceById,
    useGetLocationsCountries,
    useGetLocationsProvinces,
    useUpdateLocationCountry,
    useUpdateLocationMunicipality,
    useUpdateLocationProvinces,
} from "@/app/hooks/request/locations/requestsLocations";

// Components
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import { ButtonGrayDown } from "@/app/components/others/Buttons";
import locationProvinceSchema from "@/app/schemas/location.province.schema";
import locationMunicipalitySchema from "@/app/schemas/location.municipality.schema";

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
        resolver: zodResolver(locationMunicipalitySchema),
    });

    const { data, isLoading } = useGetLocationMunicipalityById(id);
    const { data: provinces, isLoading: isLoadingProvinces } = useGetLocationsProvinces();

    useEffect(() => {
        if (wantCreate) return;
        if (isLoading) return;
        reset(data);
    }, [data]);

    const create = async (data) => {
        const loadingToast = toast.loading("creando provincia...");

        const res = await useCreateLocationMunicipality(data);
        console.log(res);

        if (res)
            toast.success("provincia creado correctamente", {
                id: loadingToast,
            });
        else
            toast.error("Error al crear el provincia", {
                id: loadingToast,
            });
    };
    const edit = async (data) => {
        const loadingToast = toast.loading("Editando provincia...");

        const res = await useUpdateLocationMunicipality(data);
        console.log(res);
        if (res)
            toast.success("provincia editado correctamente", {
                id: loadingToast,
            });
        else
            toast.error("Error al editar el provincia", {
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
                    label="Nombre de municipio"
                />
                <Input
                    register={register}
                    errors={errors}
                    type="textarea"
                    name="description"
                    inputClassName="border-2 border-gray-300 rounded-md p-2 h-20 min-h-20 max-h-20"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Descripción de municipio"
                />
                <Select
                    register={register}
                    errors={errors}
                    type="text"
                    name="province_id"
                    items={provinces ?? []}
                    selectClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                    label="Provincia de municipio"
                />

                <Input
                    register={register}
                    errors={errors}
                    type="number"
                    name="latitude"
                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Latitude de municipio"
                />
                <Input
                    register={register}
                    errors={errors}
                    type="number"
                    name="longitude"
                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Longitude de municipio"
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
                <ButtonGrayDown>{wantCreate ? "Crear" : "Editar"} Municipio</ButtonGrayDown>
            </form>
        </div>
    );
};

export default page;
