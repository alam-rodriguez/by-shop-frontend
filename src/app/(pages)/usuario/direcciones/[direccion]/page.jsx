"use client";

// React
import React, { useEffect } from "react";

// Next
import { useParams, useRouter } from "next/navigation";

// React Hook Form
import { useForm } from "react-hook-form";

// Zod
import { zodResolver } from "@hookform/resolvers/zod";

// Alerts
import { toast } from "sonner";

// Zustand
import { zusUser } from "@/app/zustand/user/zusUser";

// Hooks
import { useCreateAddress, useRequestsUsers } from "@/app/hooks/request/users/requestsUsers";
import {
    useGetAddressById,
    useSetUserAddressPreferred,
    useUpdateAddress,
    useUserAddressCanBePreferred,
} from "@/app/hooks/request/users/requestsUsersAddresses";

// Schemas
import userAddressSchema from "@/app/schemas/userAddress.schema";

// Components
import Divider from "@/app/components/home/Divider";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import {
    useGetLocationMunicipalitiesByprovince,
    useGetLocationNeighborhoodsByMunicipality,
    useGetLocationProvincesByCountry,
    useGetLocationsCountries,
} from "@/app/hooks/request/locations/requestsLocations";
import { isUUID } from "@/app/hooks/app/app";
import useCoords from "@/app/hooks/app/useCoords";
import Spacer from "@/app/components/home/Spacer";

const page = () => {
    const { direccion: idAddress } = useParams();
    const wantCreate = idAddress === "0";

    const router = useRouter();

    const { id } = zusUser();

    const { useGetUserInformation } = useRequestsUsers();

    const { data: countries, isLoading: isLoadingCountries } = useGetLocationsCountries();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        control,
        setValue,
        getValues,
        reset,
    } = useForm({
        defaultValues: {},
        resolver: zodResolver(userAddressSchema),
    });

    const { data: provincesByCountry } = useGetLocationProvincesByCountry(watch("country_id"));
    const { data: municipalitiesByProvince } = useGetLocationMunicipalitiesByprovince(watch("province_id"));
    const { data: neighborhoodsByMunicipality } = useGetLocationNeighborhoodsByMunicipality(watch("municipality_id"));

    useEffect(() => {
        if (id != "") setValue("id_user", id);
    }, [id]);

    const { coords, error, loading, accuracy, handleGetLocation } = useCoords();

    // useEffect(() => {
    //     alert("neighborhood");
    //     if (!isUUID(watch("neighborhood_id")) || !neighborhoodsByMunicipality) return;
    //     const neighborhoodSelected = neighborhoodsByMunicipality.find((neighborhood) => neighborhood.id == watch("neighborhood_id"));
    //     setValue("latitude", neighborhoodSelected.latitude);
    //     setValue("longitude", neighborhoodSelected.longitude);
    // }, [watch("neighborhood_id")]);

    const handleChangeNeighborhood = (neighborhoodIdSelected) => {
        if (!isUUID(neighborhoodIdSelected) || !neighborhoodsByMunicipality) return;
        const neighborhoodSelected = neighborhoodsByMunicipality.find((neighborhood) => neighborhood.id == neighborhoodIdSelected);
        setValue("latitude", neighborhoodSelected.latitude);
        setValue("longitude", neighborhoodSelected.longitude);
    };

    const { data: address, isLoading: isLoadingAddress } = useGetAddressById(idAddress);

    useEffect(() => {
        if (isLoadingAddress || !address) return;
        reset(address);
        setValue("preferred_address", address.preferred_address === 1);
    }, [address]);

    useEffect(() => {
        if (error || !coords) return;
        setValue("latitude", coords.lat);
        setValue("longitude", coords.lng);
        console.log(coords);
    }, [coords]);

    const create = async (data) => {
        const loadingToast = toast.loading("Guardando direccion...");

        const res = await useCreateAddress(data);
        if (res) {
            toast.success("Direccion guardada", {
                id: loadingToast,
            });
            useGetUserInformation();
            router.back();
        } else {
            toast.error("Error al guardar la direccion", {
                id: loadingToast,
            });
        }
    };
    const update = async (data) => {
        const loadingToast = toast.loading("Actualizando direccion...");

        const res = await useUpdateAddress(idAddress, data);
        if (res)
            toast.success("Direccion actualizada", {
                id: loadingToast,
            });
        else
            toast.error("Error al actualizar la direccion", {
                id: loadingToast,
            });
    };

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    const onSubmit = async (data) => {
        console.log(data);
        if (data.preferred_address) {
            const can = await useUserAddressCanBePreferred(id, idAddress);
            if (!can) {
                toast.error("Ya tienes una direccion preferida");
                return;
            }
        }
        if (wantCreate) create(data);
        else update(data);
    };

    if (isLoadingAddress) return <LoadingParagraph />;
    return (
        <form className="m-4" onSubmit={handleSubmit(onSubmit)}>
            <p className="font-semibold">Ingresa una nueva direccion de envio</p>
            <Select
                register={register}
                errors={errors}
                type="text"
                name="country_id"
                items={countries ?? []}
                selectClassName="border-2 border-gray-300 rounded-md p-2 h-full_ h-11"
                errorClassName="text-red-700"
                optionNameForShow="name"
                label="Pais"
            />
            <Select
                register={register}
                errors={errors}
                type="text"
                name="province_id"
                items={provincesByCountry ?? []}
                selectClassName="border-2 border-gray-300 rounded-md p-2 h-full_ h-11"
                errorClassName="text-red-700"
                optionNameForShow="name"
                label="Provincia"
            />
            <Select
                register={register}
                errors={errors}
                type="text"
                name="municipality_id"
                items={municipalitiesByProvince ?? []}
                selectClassName="border-2 border-gray-300 rounded-md p-2 h-full_ h-11"
                errorClassName="text-red-700"
                optionNameForShow="name"
                label="Municipio"
            />
            <Select
                register={register}
                errors={errors}
                type="text"
                name="neighborhood_id"
                items={neighborhoodsByMunicipality ?? []}
                selectClassName="border-2 border-gray-300 rounded-md p-2 h-full_ h-11"
                errorClassName="text-red-700"
                optionNameForShow="name"
                label="Vecindario"
                onChange={handleChangeNeighborhood}
            />
            <Input
                register={register}
                errors={errors}
                type="text"
                name="full_name"
                inputClassName="border-2 border-gray-300 rounded-md p-2"
                errorClassName="text-red-700"
                placeholder=""
                label="Nombre completo (nombre y apellido)"
            />
            <Input
                register={register}
                errors={errors}
                type="text"
                name="phone_number"
                inputClassName="border-2 border-gray-300 rounded-md p-2"
                errorClassName="text-red-700"
                placeholder=""
                label="Numero de telefono"
            />
            <p className="text-xs mt-2">Se puede utilizar para ayudar a la entrega</p>
            <Input
                register={register}
                errors={errors}
                type="text"
                name="street"
                inputClassName="border-2 border-gray-300 rounded-md p-2"
                errorClassName="text-red-700"
                placeholder="Nombre de la calle"
                label="Calle de direccion"
            />
            <Input
                register={register}
                errors={errors}
                type="textarea"
                name="address_details"
                inputClassName="border-2 border-gray-300 rounded-md p-2"
                errorClassName="text-red-700"
                placeholder="Nombre de la calle"
                label="Detalles adionales de la ubicacion"
            />
            <div className="flex gap-2">
                <Input
                    register={register}
                    errors={errors}
                    type="text"
                    name="house_number"
                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    placeholder="Nombre de la calle"
                    label="Num. casa/apartamento"
                    width="48%"
                />
                <Input
                    register={register}
                    errors={errors}
                    type="number"
                    name="postal_code"
                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Codigo postal"
                    width="48%"
                />
            </div>
            <div className="flex gap-2">
                <Input
                    register={register}
                    errors={errors}
                    type="number"
                    name="latitude"
                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Latitud"
                    width="48%"
                />
                <Input
                    register={register}
                    errors={errors}
                    type="number"
                    name="longitude"
                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Longitud"
                    width="48%"
                />
            </div>
            <Spacer />
            <button
                onClick={handleGetLocation}
                disabled={loading}
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
            >
                {loading ? "Obteniendo ubicación precisa..." : "📍 Obtener ubicación exacta"}
            </button>
            {error && <p className="text-red-500">{error}</p>}
            <Spacer />
            <Input
                register={register}
                errors={errors}
                type="checkbox"
                name="preferred_address"
                divClassName="flex gap-2 mt-5 items-center"
                inputClassName="border-2 border-gray-300 rounded-md p-2 h-6 w-6"
                errorClassName="text-red-700"
                placeholder=""
                label="Marcar como direccion preferida"
            />
            <Divider />
            <button className="bg-yellow-400 border border-black p-3 text-base rounded-full border-none w-full">Usar esta direccion</button>
        </form>
    );
};

export default page;
