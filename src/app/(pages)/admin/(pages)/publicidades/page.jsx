"use client";

// React
import React from "react";

// Next
import { useRouter } from "next/navigation";

// Hooks
import { useGetCurrencies } from "@/app/hooks/request/currencies/requestsCurrencies";

// Components
import { ButtonGrayDown } from "@/app/components/others/Buttons";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import ItemDiv from "@/app/components/others/ItemDiv";
import { useGetAdvertisements } from "@/app/hooks/request/advertisements/RequestsAdvertisements";

const page = () => {
    const router = useRouter();

    const { data, isLoading } = useGetAdvertisements();

    const handleClickAdvertisement = (id = 0) => router.push(`/admin/publicidades/${id}`);

    if (isLoading) return <LoadingParagraph />;

    return (
        <div className="m-4">
            <p className="text-center mb-3 font-bold text-xl">Publicidades</p>
            <div className="flex flex-col gap-4">
                {data.map((currency) => (
                    <ItemDiv
                        key={currency.id}
                        data={[
                            { key: "Nombre", value: currency.name },
                            { key: "Descripcion", value: currency.description },
                            { key: "Simbolo", value: currency.symbol },
                            { key: "Tasa de cambio", value: currency.exchange_rate },
                            { key: "Codigo de iso", value: currency.iso_code },
                            { key: "Simbolo", value: currency.symbol },
                            { key: "Es la moneda principal", value: currency.main_currency == 1 ? "Si" : "No" },
                            { key: "Estado", value: currency.status == 1 ? "Activa" : "Inactiva" },
                        ]}
                        onClick={() => handleClickAdvertisement(currency.id)}
                    />
                ))}
            </div>

            <ButtonGrayDown fn={() => handleClickAdvertisement(0)}>Crear nueva publicidad</ButtonGrayDown>
        </div>
    );
};

export default page;
