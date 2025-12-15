"use client";

export const dynamic = "force-dynamic";

import React, { useEffect } from "react";

// Next
import { useRouter, useSearchParams } from "next/navigation";

// Hooks
import { useGetOrders, useGetOrdersFromShop } from "@/app/hooks/request/carts/requestsCarts";
import { showOrderStatusForClient, showPriceWithCurrency } from "@/app/hooks/app/app";

// Zustand
import { zusUser } from "@/app/zustand/user/zusUser";

// Components
import Spacer from "@/app/components/home/Spacer";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import { useGetActivePeriod } from "@/app/hooks/request/periods/requestsPeriods";
// import ResponsibleOrders from "./[id-periodo]/ResponsibleOrders";

const Client = () => {
    const searchParams = useSearchParams();

    const statusOrders = searchParams.get("estado");
    const responsabilidad = searchParams.get("responsabilidad");

    const isResponsible = responsabilidad == "true";

    console.log(statusOrders);

    const status = statusOrders == "pendiente" ? "1, 2, 3" : statusOrders == "realizado" ? "3" : statusOrders == "archivado" ? "5" : "";

    console.log(status);

    const router = useRouter();

    const { id_shop, name_shop, type, userTypeName } = zusUser();

    useEffect(() => {
        console.warn(type);
    }, [type]);

    const { data, isLoading } = useGetOrders(status);

    useEffect(() => {
        console.log(type);
    }, [type]);

    useEffect(() => {
        console.log(data);
    }, [data]);

    const { data: dataFromShop, isLoading: isLoadingFromShop } = useGetOrdersFromShop(id_shop, status);

    useEffect(() => {
        console.log(id_shop);
        console.log(dataFromShop);
    }, [dataFromShop, id_shop]);

    // useEffect(() => {
    //     console.log(id_shop);
    //     console.log(data);
    // }, [data, id_shop]);

    const handleClickOrder = (idOffer = 0) => router.push(`/admin/pedidos/${idOffer}`);

    const { data: activePeriod } = useGetActivePeriod();

    useEffect(() => {
        console.warn(activePeriod);
    }, [activePeriod]);

    if (isLoading) return <LoadingParagraph text="Buscando Pedidos..." />;

    // if (isResponsible) return <ResponsibleOrders />;

    // if ((type == 4 || type == 5) && data.length == 0) return <div className="font-bold m-4 text-xl">Noy hay pedidos {statusOrders}s</div>;
    // else if (data.length == 0) return <div className="font-bold m-4 text-xl">Noy hay pedidos {statusOrders}s</div>;

    if (userTypeName == "DEV" || userTypeName == "SUPPORT")
        return (
            <div className="m-4">
                <p className="text-center mb-3 font-bold text-xl">Periodo de pago actual</p>

                {activePeriod && (
                    <div className="bg-gray-300 p-4 rounded-md">
                        <div className="flex justify-between">
                            <p>Inicio:</p>
                            <p>{activePeriod.start_date.split("T")[0]}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Fin:</p>
                            <p>{activePeriod.end_date.split("T")[0]}</p>
                        </div>

                        <div className="flex justify-between">
                            <p>Cantidad de ordenes:</p>
                            <p>{activePeriod.orders_count}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Total de articulos vendidos:</p>
                            <p>{activePeriod.articles_total_quantity}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Total dinero generado:</p>
                            <p>{showPriceWithCurrency({ iso_code: activePeriod.main_currency }, activePeriod.total_amount, false)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Total dinero descuento:</p>
                            <p>{showPriceWithCurrency({ iso_code: activePeriod.main_currency }, activePeriod.discount_amount, false)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Total dinero delivery:</p>
                            <p>{showPriceWithCurrency({ iso_code: activePeriod.main_currency }, activePeriod.delivery_amount, false)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Total dinero comision paypal:</p>
                            <p>{showPriceWithCurrency({ iso_code: activePeriod.main_currency }, activePeriod.paypal_fee_amount, false)}</p>
                        </div>

                        <div className="flex justify-between">
                            <p>Total dinero restante:</p>
                            <p>
                                {Number(activePeriod.total_amount) +
                                    Number(activePeriod.delivery_amount) -
                                    Number(activePeriod.discount_amount) -
                                    Number(activePeriod.paypal_fee_amount)}
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p>Moneda:</p>
                            <p>{activePeriod.main_currency}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Ver ordenas periodo:</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Estado periodo:</p>
                            <p>{activePeriod.status == 1 ? "Activo" : "Inactivo"}</p>
                        </div>
                    </div>
                )}

                {/* <div className="bg-gray-300 p-4 rounded-md">
                    <div className="flex justify-between">
                        <p>Inicio:</p>
                        <p>lunes 15 de julio</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Fin:</p>
                        <p>lunes 25 de julio</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Total de articulos vendidos:</p>
                        <p>15</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Total de dinero articulo vendidos:</p>
                        <p>15,000 pesos</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Comision:</p>
                        <p>10%</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Comision en dinero:</p>
                        <p>1,000 pesos</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Ver ordenas periodo:</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Estado periodo:</p>
                        <p>Activo</p>
                    </div>
                </div> */}

                <button className="bg-green-700 text-white w-full rounded-3xl py-3" onClick={() => router.push("/admin/pagos/0")}>
                    Crear Periodo de pago
                </button>
            </div>
        );

    return (
        <div className="m-4">
            <p className="text-center mb-3 font-bold text-xl">Periodo de pago actual</p>

            <div className="bg-gray-300 p-4 rounded-md">
                {/* <p className="text-center">{order.user_name}</p> */}
                {/* <Spacer space={25} /> */}
                {/* <div className="flex justify-between">
                    <p>metodo de pago:</p>
                    <p>{order.pay_method_name}</p>
                </div> */}
                <div className="flex justify-between">
                    <p>Inicio:</p>
                    <p>lunes 15 de julio</p>
                </div>
                <div className="flex justify-between">
                    <p>Fin:</p>
                    <p>lunes 25 de julio</p>
                </div>
                <div className="flex justify-between">
                    <p>Total de articulos vendidos:</p>
                    <p>15</p>
                </div>
                <div className="flex justify-between">
                    <p>Total de dinero articulo vendidos:</p>
                    <p>15,000 pesos</p>
                </div>
                <div className="flex justify-between">
                    <p>Comision:</p>
                    <p>10%</p>
                </div>
                <div className="flex justify-between">
                    <p>Comision en dinero:</p>
                    <p>1,000 pesos</p>
                </div>
                <div className="flex justify-between">
                    <p>Ver ordenas periodo:</p>
                    {/* <p>1,000 pesos</p> */}
                </div>
                <div className="flex justify-between">
                    <p>Estado periodo:</p>
                    <p>Activo</p>
                </div>
            </div>

            {/* <button className="bg-green-700 text-white w-full rounded-3xl py-3" onClick={() => handleClickOffer()}>
                Crear Oferta
            </button> */}
        </div>
    );
};

export default Client;
