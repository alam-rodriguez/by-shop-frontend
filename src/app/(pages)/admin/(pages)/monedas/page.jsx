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

const page = () => {
    const router = useRouter();

    const { data, isLoading } = useGetCurrencies();

    const handleClickCurrency = (idCurrency = 0) => router.push(`/admin/monedas/${idCurrency}`);

    if (isLoading) return <LoadingParagraph />;

    return (
        <div className="m-4">
            <p className="text-center mb-3 font-bold text-xl">Monedas</p>
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
                        onClick={() => handleClickCurrency(currency.id)}
                    />
                ))}
            </div>

            <ButtonGrayDown fn={() => handleClickCurrency(0)}>Crear nueva moneda</ButtonGrayDown>
        </div>
    );
};

export default page;
