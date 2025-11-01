"use client";

// React
import React, { useEffect } from "react";

// Next
import { useRouter } from "next/navigation";

// Hooks
import {
    useGetLocationsCountries,
    useGetLocationsMunicipalities,
    useGetLocationsNeighborhoods,
    useGetLocationsProvinces,
} from "@/app/hooks/request/locations/requestsLocations";

// Components
import { ButtonGrayDown } from "@/app/components/others/Buttons";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import ItemDiv from "@/app/components/others/ItemDiv";

const page = () => {
    const router = useRouter();

    const { data, isLoading } = useGetLocationsNeighborhoods();

    useEffect(() => {
        console.log(data);
    }, [data]);

    const handleClickProvince = (idProvince = 0) => router.push(`/admin/ubicaciones/vecindarios/${idProvince}`);

    if (isLoading) return <LoadingParagraph />;

    return (
        <div className="m-4">
            <p className="text-center mb-3 font-bold text-xl">Vecindarios</p>
            <div className="flex flex-col gap-4">
                {data.map((province) => (
                    <ItemDiv
                        key={province.id}
                        data={[
                            { key: "Nombre", value: province.name },
                            { key: "Municipio", value: province.municipality },
                            { key: "Descripcion", value: province.description },
                            { key: "Latitude", value: province.latitude },
                            { key: "Longitude", value: province.longitude },
                            { key: "Estado", value: province.status == 1 ? "Activa" : "Inactiva" },
                        ]}
                        onClick={() => handleClickProvince(province.id)}
                    />
                ))}
            </div>

            <ButtonGrayDown fn={() => handleClickProvince(0)}>Crear nuevo vecindario</ButtonGrayDown>
        </div>
    );
};

export default page;
