"use client";
import React, { useEffect } from "react";

// Next
import { useRouter } from "next/navigation";

// Hooks
import { useGetOffers } from "@/app/hooks/request/offers/requestsOffers";

const page = () => {
    const router = useRouter();

    const { data, isLoading } = useGetOffers();

    useEffect(() => {
        console.log(data);
    }, [data]);

    const handleClickOffer = (idOffer = 0) => router.push(`/admin/ofertas/${idOffer}`);
    
    if (isLoading) return <>Cargando</>;

    return (
        <div className="m-4">
            Offertas
            {data.map((offer) => (
                <div key={offer.id} className="bg-green-200/50" onClick={() => handleClickOffer(offer.id)}>
                    <img src={offer.image} alt="" />
                    <p>{offer.name}</p>
                    <p>{offer.description}</p>
                    <p>{offer.percent_discount}</p>
                    <p>{offer.image}</p>
                    <p>{offer.date_start}</p>
                    <p>{offer.date_end}</p>
                    <p>{offer.status}</p>
                    <p>{offer.created_at}</p>
                </div>
            ))}
            <button className="bg-green-700 text-white w-full rounded-3xl py-3" onClick={() => handleClickOffer()}>
                Crear Oferta
            </button>
        </div>
    );
};

export default page;
