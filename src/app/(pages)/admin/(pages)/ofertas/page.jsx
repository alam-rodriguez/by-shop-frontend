"use client";
import React, { useEffect } from "react";

// Next
import { useRouter } from "next/navigation";

// Hooks
import { useGetOffers, useGetOffersByShopId } from "@/app/hooks/request/offers/requestsOffers";
import { zusUser } from "@/app/zustand/user/zusUser";
import ItemDiv from "@/app/components/others/ItemDiv";
import { getDateInSpanish } from "@/app/hooks/app/app";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";

const page = () => {
    const router = useRouter();

    const { userTypeName, id_shop: shopId, hasData } = zusUser();
    const { data, isLoading } = useGetOffers();
    const { data: offersShop, isLoading: isLoadingOffersShop } = useGetOffersByShopId(shopId);

    useEffect(() => {
        console.log(data);
    }, [data]);

    const handleClickOffer = (idOffer = 0) => router.push(`/admin/ofertas/${idOffer}`);

    if (!hasData) return <LoadingParagraph />;
    if (userTypeName == "DEV" || userTypeName == "SUPPORT") {
        if (isLoading || !data) return <LoadingParagraph />;
    } else {
        if (isLoadingOffersShop || !offersShop) return <LoadingParagraph />;
    }

    return (
        <div className="m-4 flex flex-col gap-4">
            <p className="text-center font-bold text-lg">Offertas</p>
            {userTypeName === "DEV" || userTypeName === "SUPPORT"
                ? data.map((offer) => (
                      <ItemDiv
                          key={offer.id}
                          data={[
                              { key: "Nombre", value: offer.name },
                              { key: "Descripcion", value: offer.description },
                              { key: "Porcentaje de descuento", value: `${offer.percent_discount} %` },
                              { key: "Fecha de inicio", value: getDateInSpanish(offer.date_start) },
                              { key: "Fecha de fin", value: getDateInSpanish(offer.date_end) },
                              { key: "Estado", value: offer.status == 1 ? "Activa" : "Inactiva" },
                              { key: "Fecha creacion", value: getDateInSpanish(offer.created_at) },
                          ]}
                          img={offer.image}
                          onClick={() => handleClickOffer(offer.id)}
                      />
                  ))
                : offersShop.map((offer) => (
                      <ItemDiv
                          key={offer.id}
                          data={[
                              { key: "Nombre", value: offer.name },
                              { key: "Descripcion", value: offer.description },
                              { key: "Porcentaje de descuento", value: `${offer.percent_discount} %` },
                              { key: "Fecha de inicio", value: getDateInSpanish(offer.date_start) },
                              { key: "Fecha de fin", value: getDateInSpanish(offer.date_end) },
                              { key: "Estado", value: offer.status == 1 ? "Activa" : "Inactiva" },
                              { key: "Fecha creacion", value: getDateInSpanish(offer.created_at) },
                          ]}
                          img={offer.image}
                          onClick={() => handleClickOffer(offer.id)}
                      />
                  ))}

            {/* {data.map((offer) => (
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
            ))} */}
            <button className="bg-green-700 text-white w-full rounded-3xl py-3" onClick={() => handleClickOffer()}>
                Crear Oferta
            </button>
        </div>
    );
};

export default page;
