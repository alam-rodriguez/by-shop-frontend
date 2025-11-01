"use client";

// React
import React, { useEffect } from "react";

// Next
import { useRouter } from "next/navigation";

// Hooks
import { useGetLocationsCountries } from "@/app/hooks/request/locations/requestsLocations";

// Components
import { ButtonGrayDown } from "@/app/components/others/Buttons";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import ItemDiv from "@/app/components/others/ItemDiv";

const page = () => {
    const router = useRouter();

    const { data, isLoading } = useGetLocationsCountries();

    useEffect(() => {
        console.log(data);
    }, [data]);

    const handleClickCountry = (idCountry = 0) => router.push(`/admin/ubicaciones/paises/${idCountry}`);

    if (isLoading) return <LoadingParagraph />;

    return (
        <div className="m-4">
            <p className="text-center mb-3 font-bold text-xl">Paises</p>
            <div className="flex flex-col gap-4">
                {data.map((country) => (
                    <ItemDiv
                        key={country.id}
                        data={[
                            { key: "Nombre", value: country.name },
                            { key: "Descripcion", value: country.description },
                            { key: "Abrebiatura", value: country.iso_code },
                            { key: "Latitude", value: country.latitude },
                            { key: "Longitude", value: country.longitude },
                            { key: "Estado", value: country.status == 1 ? "Activa" : "Inactiva" },
                        ]}
                        onClick={() => handleClickCountry(currency.id)}
                    />
                ))}
            </div>

            <ButtonGrayDown fn={() => handleClickCountry(0)}>Crear nuevo pais</ButtonGrayDown>
        </div>
    );
};

export default page;
