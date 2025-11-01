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

const page = () => {
    const { tienda: idShop } = useParams();

    const wantCreate = !isUUID(idShop);

    const { uploadImage, uploadImages, deleteImages, deleteImage } = useMyUploadThing();
    const { useCreateShop, useUpdateShop } = useRequestsShops();

    const { shopSelected } = zusAdminShops();

    const wanCreate = Object.keys(shopSelected).length == 0 ? true : false;

    const [schemaIsRequired, setSchemaIsRequired] = useState(wanCreate);

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

    useEffect(() => {
        console.log(provincesByCountry);
    }, [provincesByCountry]);

    useEffect(() => {
        if (!isUUID(watch("neighborhood_id")) || !neighborhoodsByMunicipality) return;
        const neighborhoodSelected = neighborhoodsByMunicipality.find((neighborhood) => neighborhood.id == watch("neighborhood_id"));
        setValue("latitude", neighborhoodSelected.latitude);
        setValue("longitude", neighborhoodSelected.longitude);
    }, [watch("neighborhood_id")]);

    const { data: shop, isLoading } = useGetShopById(idShop);
    useEffect(() => {
        if (wantCreate || !shop) return;
        reset(shop);
    }, [shop]);

    // useEffect(() => {
    //     // console.log(shop);
    // }, []);

    // TODO: ARREGLAR ESTO PORQUE ESTA DANDO PROBLEMAS AL CREAR TIENDA

    const create = async (data) => {
        const loadingToast = toast.loading("Creando tienda...");

        const resImage = await uploadImages([{ imageFile: data.logo, folder: "shops", fileName: data.name }]);
        data.logo = resImage[0].ufsUrl;

        const res = await useCreateShop(data);

        if (res)
            toast.success("Tienda creado correctamente", {
                id: loadingToast,
            });
        else
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

    // id, name, description, logo, type, status;

    const onSubmit = async (data) => {
        console.log(data);
        if (wantCreate) create(data);
        else edit(data);
    };

    if (isLoading) return <LoadingParagraph />;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="m-4">
            <p className="text-center">Datos de la tienda</p>
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

            <p className="text-center">Direccion Tienda</p>
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

            <ButtonGrayDown>Crear Tienda</ButtonGrayDown>
        </form>
    );
};

export default page;
