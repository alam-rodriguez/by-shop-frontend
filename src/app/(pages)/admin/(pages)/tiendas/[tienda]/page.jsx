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
import {
    useGetLocationMunicipalitiesByprovince,
    useGetLocationNeighborhoodsByMunicipality,
    useGetLocationProvincesByCountry,
    useGetLocationsCountries,
} from "@/app/hooks/request/locations/requestsLocations";
import dynamic from "next/dynamic";
// const useCoords = dynamic(() => import("@/app/hooks/app/useCoords"), { ssr: false });

// import useCoords from "@/app/hooks/app/useCoords";

import Spacer from "@/app/components/home/Spacer";
import { zusUser } from "@/app/zustand/user/zusUser";
import useCoords from "@/app/hooks/app/useCoords";
import { useGetShopsPlans } from "@/app/hooks/request/shops/requestsShopsPlans";
import { useGetShopCodeData, useSetUsedShopCode } from "@/app/hooks/request/shops/requestsShopsCodes";
import { useRouter } from "next/navigation";
import { useSetShopAdmin, useSetShopSubAdmin, useSetUserShop } from "@/app/hooks/request/users/requestsUsers";

const page = () => {
    const { tienda: idShop } = useParams();

    const wantCreate = !isUUID(idShop);

    const { uploadImage, uploadImages, deleteImages, deleteImage } = useMyUploadThing();
    const { useCreateShop, useUpdateShop } = useRequestsShops();

    const { shopSelected } = zusAdminShops();

    const { userTypeName, id: userId, email: userEmail } = zusUser();

    const wanCreate = Object.keys(shopSelected).length == 0 ? true : false;

    const [schemaIsRequired, setSchemaIsRequired] = useState(wanCreate);

    const { coords, error, loading, accuracy, handleGetLocation } = useCoords();

    const router = useRouter();

    useEffect(() => {
        console.log(shopSelected);
        // console.log(schemaIsRequired);
    }, []);

    const shopSchema = createShopSchema(schemaIsRequired);

    const defaultValues = {
        ...shopSelected,
    };
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        control,
        reset,
        setValue,
    } = useForm({
        defaultValues,
        resolver: zodResolver(shopSchema),
    });

    const { data: countries, isLoading: isLoadingCountries } = useGetLocationsCountries();
    const { data: provincesByCountry } = useGetLocationProvincesByCountry(watch("country_id"));
    const { data: municipalitiesByProvince } = useGetLocationMunicipalitiesByprovince(watch("province_id"));
    const { data: neighborhoodsByMunicipality } = useGetLocationNeighborhoodsByMunicipality(watch("municipality_id"));
    const { data: shopsPlans } = useGetShopsPlans();

    useEffect(() => {
        console.log(provincesByCountry);
    }, [provincesByCountry]);

    const countryId = watch("country_id");

    useEffect(() => {
        console.log(countryId);
    }, [countryId]);

    useEffect(() => {
        console.log(watch("country_id"));
    }, [watch("country_id")]);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "country_id") {
                console.log(value.country_id);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    // useEffect(() => {
    //     if (!isUUID(watch("neighborhood_id")) || !neighborhoodsByMunicipality) return;
    //     const neighborhoodSelected = neighborhoodsByMunicipality.find((neighborhood) => neighborhood.id == watch("neighborhood_id"));
    //     setValue("latitude", neighborhoodSelected.latitude);
    //     setValue("longitude", neighborhoodSelected.longitude);
    // }, [watch("neighborhood_id")]);

    const handleChangeNeighborhood = (neighborhoodIdSelected) => {
        // console.log(neighborhoodIdSelected);
        if (!isUUID(neighborhoodIdSelected) || !neighborhoodsByMunicipality) return;
        const neighborhoodSelected = neighborhoodsByMunicipality.find((neighborhood) => neighborhood.id == neighborhoodIdSelected);
        setValue("latitude", neighborhoodSelected.latitude);
        setValue("longitude", neighborhoodSelected.longitude);
    };

    const { data: shop, isLoading } = useGetShopById(idShop);
    useEffect(() => {
        if (wantCreate || !shop) return;
        reset(shop);
    }, [shop]);

    // useEffect(() => {
    //     // console.log(shop);
    // }, []);

    // TODO: ARREGLAR ESTO PORQUE ESTA DANDO PROBLEMAS AL CREAR TIENDA

    const isAdmin = userTypeName === "DEV" || userTypeName === "SUPPORT";

    const create = async (data) => {
        const loadingToast = toast.loading("Creando tienda...");

        let resSetUsedCode = true;
        let resUserShop = true;

        if (!isAdmin) {
            if (!data.access_code || data.access_code.length === 0)
                return toast.error("Debes ingresar un codio para registrar una tienda", {
                    id: loadingToast,
                });

            console.log(data.access_code);
            const { exists, data: shopCodeData, status, message } = await useGetShopCodeData(data.access_code);
            if (!exists)
                return toast.error("Este codigo no es valido", {
                    id: loadingToast,
                });
            data.plan_id = shopCodeData.id;
            resSetUsedCode = await useSetUsedShopCode(shopCodeData.shop_code_id, data.id);
            // useSetUserShop;
            resUserShop = useSetUserShop(userId, data.id);
            // else useSetShopSubAdmin();
            // if (userTypeName == "ADMIN-SHOP") useSetShopAdmin(userId, userEmail, data.id);
            // else useSetShopSubAdmin();
            // TODO: ESTABLECER EL ADMINISTRADR DE TIENDA
            // useSetShopAdmin;
            // useSetShopSubAdmin;
        }

        // if (userTypeName == "ADMIN-SHOP" || userTypeName == "SUB-ADMIN-SHOP") {
        //     if (!data.access_code || data.access_code.length === 0)
        //         return toast.error("Debes ingresar un codio para registrar una tienda", {
        //             id: loadingToast,
        //         });

        //     console.log(data.access_code);
        //     const { exists, data: shopCodeData, status, message } = await useGetShopCodeData(data.access_code);
        //     if (!exists)
        //         return toast.error("Este codigo no es valido", {
        //             id: loadingToast,
        //         });
        //     data.plan_id = shopCodeData.id;
        //     resSetUsedCode = await useSetUsedShopCode(shopCodeData.shop_code_id, data.id);
        //     // useSetUserShop;
        //     resUserShop = useSetUserShop(userId, data.id);
        //     // else useSetShopSubAdmin();
        //     // if (userTypeName == "ADMIN-SHOP") useSetShopAdmin(userId, userEmail, data.id);
        //     // else useSetShopSubAdmin();
        //     // TODO: ESTABLECER EL ADMINISTRADR DE TIENDA
        //     // useSetShopAdmin;
        //     // useSetShopSubAdmin;
        // }

        console.log(data);

        const resImage = await uploadImages([{ imageFile: data.logo, folder: "shops", fileName: data.name }]);
        data.logo = resImage[0].ufsUrl;

        const res = await useCreateShop(data);

        if (res && resSetUsedCode && resUserShop) {
            toast.success("Tienda creado correctamente", {
                id: loadingToast,
            });
            router.replace(`/admin/tiendas/${data.id}`);
        } else
            toast.error("Error al crear tienda", {
                id: loadingToast,
            });
    };
    const edit = async (data) => {
        const loadingToast = toast.loading("Actualizando tienda...");

        let resDeleteIMages = true;
        if (typeof data.logo == "object") {
            resDeleteIMages = await deleteImages([shop.logo]);
            const resImage = await uploadImage(data.logo, "shops", data.name);
            data.logo = resImage[0].ufsUrl;
        }
        const res = await useUpdateShop(data);

        if (resDeleteIMages && res)
            toast.success("Tienda actualizada correctamente", {
                id: loadingToast,
            });
        else
            toast.error("Error al actualizar tienda", {
                id: loadingToast,
            });
    };

    useEffect(() => {
        if (error || !coords) return;
        setValue("latitude", coords.lat);
        setValue("longitude", coords.lng);
        console.log(coords);
    }, [coords]);

    // id, name, description, logo, type, status;

    const onSubmit = async (data) => {
        console.log(data);
        if (wantCreate) create(data);
        else edit(data);
    };

    useEffect(() => {
        console.warn(errors);
    }, [errors]);

    if (isLoading) return <LoadingParagraph />;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="m-4">
            <p className="text-center font-bold text-lg">Datos de la tienda</p>
            <Input
                register={register}
                errors={errors}
                type="text"
                name="name"
                inputClassName="border-2 border-gray-300 rounded-md p-2"
                errorClassName="text-red-700"
                placeholder=""
                label="Nombre de la tienda"
            />
            <Input
                register={register}
                errors={errors}
                type="textarea"
                name="description"
                inputClassName="border-2 border-gray-300 rounded-md p-2"
                errorClassName="text-red-700"
                placeholder=""
                label="Descripcion de la tienda"
            />
            <InputFile
                imgLink={shop?.logo}
                control={control}
                errors={errors}
                name="logo"
                inputClassName="border-2 border-gray-300 rounded-md p-2"
                errorClassName="text-red-700"
                placeholder=""
                label="Logo de la tienda"
            />
            {(userTypeName == "DEV" || userTypeName == "SUPPORT") && (
                <Select
                    register={register}
                    errors={errors}
                    type="number"
                    name="type"
                    items={[
                        { id: 1, name: "Normal" },
                        { id: 2, name: "Especia" },
                    ]}
                    selectClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                    label="Tipo"
                />
            )}
            <Select
                register={register}
                errors={errors}
                type="number"
                name="estatus"
                items={[
                    { id: 1, name: "Activa" },
                    { id: 0, name: "Inactiva" },
                ]}
                selectClassName="border-2 border-gray-300 rounded-md p-2"
                errorClassName="text-red-700"
                optionNameForShow="name"
                label="Estado"
            />
            {/* if (!userTypeName == "DEV" || userTypeName == "SUPPORT") {  */}
            {!isAdmin ? (
                <>
                    <Spacer />
                    <p className="text-center font-bold text-lg">Codigo de acceso</p>

                    <Input
                        register={register}
                        errors={errors}
                        type="text"
                        name="access_code"
                        inputClassName="border-2 border-gray-300 rounded-md p-2"
                        errorClassName="text-red-700"
                        placeholder=""
                        label="Codigo de acceso para registrar tienda"
                    />
                </>
            ) : (
                <Select
                    register={register}
                    errors={errors}
                    type="text"
                    name="plan_id"
                    items={shopsPlans ?? []}
                    selectClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                    label="Plan"
                />
            )}

            <Spacer />
            <p className="text-center font-bold text-lg">Direccion Tienda</p>
            <Select
                register={register}
                errors={errors}
                type="text"
                name="country_id"
                items={countries ?? []}
                selectClassName="border-2 border-gray-300 rounded-md p-2"
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
                selectClassName="border-2 border-gray-300 rounded-md p-2"
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
                selectClassName="border-2 border-gray-300 rounded-md p-2"
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
                selectClassName="border-2 border-gray-300 rounded-md p-2"
                errorClassName="text-red-700"
                optionNameForShow="name"
                label="Vecindario"
                onChange={handleChangeNeighborhood}
            />
            <Input
                register={register}
                errors={errors}
                type="text"
                name="street"
                inputClassName="border-2 border-gray-300 rounded-md p-2"
                errorClassName="text-red-700"
                placeholder=""
                label="Calle de la tienda"
            />
            <Input
                register={register}
                errors={errors}
                type="text"
                name="local_number"
                inputClassName="border-2 border-gray-300 rounded-md p-2"
                errorClassName="text-red-700"
                placeholder=""
                label="Numero de Local"
            />
            <Input
                register={register}
                errors={errors}
                type="textarea"
                name="address_details"
                inputClassName="border-2 border-gray-300 rounded-md p-2"
                errorClassName="text-red-700"
                placeholder=""
                label="Detalles direccion"
            />
            <Input
                register={register}
                errors={errors}
                type="text"
                name="postal_code"
                inputClassName="border-2 border-gray-300 rounded-md p-2"
                errorClassName="text-red-700"
                placeholder=""
                label="Codigo Postal"
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
            <div className="flex justify-between">
                <Input
                    register={register}
                    errors={errors}
                    type="number"
                    name="latitude"
                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Latitud de tienda"
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
                    label="Longitud de tienda"
                    width="48%"
                />
            </div>
            <Spacer />
            <button
                onClick={handleGetLocation}
                disabled={loading}
                type="button"
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
            >
                {loading ? "Obteniendo ubicación precisa..." : "📍 Obtener ubicación exacta"}
            </button>
            {/* {coords && (
                <div className="text-center">
                    <p>Latitud: {coords.lat.toFixed(6)}</p>
                    <p>Longitud: {coords.lng.toFixed(6)}</p>
                    <p className="text-sm text-gray-500">Precisión: ±{Math.round(accuracy)} metros</p>
                    <a
                        href={`https://www.google.com/maps?q=${coords.lat},${coords.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                    >
                        Ver en Google Maps
                    </a>
                </div>
            )} */}
            {error && <p className="text-red-500">{error}</p>}
            <ButtonGrayDown>{wantCreate ? "Crear" : "Editar"} Tienda</ButtonGrayDown>
        </form>
    );
};

export default page;
