"use client";

export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";

// Next
import { useRouter } from "next/navigation";

// Hooks
import { useGetOrders, useGetOrdersFromShop } from "@/app/hooks/request/carts/requestsCarts";
import { showOrderStatusForClient, showPriceWithCurrency } from "@/app/hooks/app/app";

// Zustand
import { zusUser } from "@/app/zustand/user/zusUser";

// Components
import Spacer from "@/app/components/home/Spacer";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import {
    createPeriodPayoutShop,
    getActivePeriodsForAllShops,
    getPeriods,
    getPeriodsByShop,
    getShopsActivePeriod,
    useGetActivePeriod,
    useGetActivePeriodByShop,
} from "@/app/hooks/request/periods/requestsPeriods";
import { ButtonGrayDown } from "@/app/components/others/Buttons";
// import ResponsibleOrders from "./[id-periodo]/ResponsibleOrders";

import { toast } from "sonner";

const Client = () => {
    // const searchParams = useSearchParams();

    // const statusOrders = searchParams.get("estado");
    // const responsabilidad = searchParams.get("responsabilidad");

    // const isResponsible = responsabilidad == "true";

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

    // const { data: dataFromShop, isLoading: isLoadingFromShop } = useGetOrdersFromShop(id_shop, status);

    // useEffect(() => {
    //     console.log(id_shop);
    //     console.log(dataFromShop);
    // }, [dataFromShop, id_shop]);

    // useEffect(() => {
    //     console.log(id_shop);
    //     console.log(data);
    // }, [data, id_shop]);

    const handleClickOrder = (idOffer = 0) => router.push(`/admin/pedidos/${idOffer}`);

    const { data: periods } = getPeriods();

    const { data: periodsByShops } = getPeriodsByShop(id_shop);

    const { data: activePeriod } = useGetActivePeriod();

    const { data: activePeriodByShop } = useGetActivePeriodByShop(id_shop);

    const { data: activePeriodAllShops } = getActivePeriodsForAllShops();

    // useEffect(() => {
    //     console.warn(activePeriod);
    // }, [activePeriod]);

    useEffect(() => {
        console.warn(periodsByShops);
    }, [periodsByShops]);

    const [makePay, setMakePay] = useState(false);

    const payPeriodAllShops = async () => {
        const shops = await getShopsActivePeriod();
        console.log(shops);
    };

    const handleCreateShopPayout = async (shopId, amount, commission) => {
        const loadingToast = toast.loading("Realizando pago a tienda...");

        const dateEndPeriod = new Date(activePeriod.end_date);
        const dateNow = new Date();

        if (dateEndPeriod > dateNow) {
            toast.error("Para realizar el pago de este periodo debes esperar a que culmine", {
                id: loadingToast,
            });
            return;
        }

        const resStatus = await createPeriodPayoutShop(activePeriod.id, shopId, amount, commission, activePeriod.currency_id);
        console.log(resStatus);
        if (resStatus === 201)
            toast.success("Pago registrado correctameente", {
                id: loadingToast,
            });
        else if (resStatus === 200)
            toast.success("La tienda ya tiene un pago registrado en este periodo", {
                id: loadingToast,
            });
        else
            toast.error("Error al registrar el pago", {
                id: loadingToast,
            });
    };

    if (isLoading) return <LoadingParagraph text="Buscando Pedidos..." />;

    // if (isResponsible) return <ResponsibleOrders />;

    // if ((type == 4 || type == 5) && data.length == 0) return <div className="font-bold m-4 text-xl">Noy hay pedidos {statusOrders}s</div>;
    // else if (data.length == 0) return <div className="font-bold m-4 text-xl">Noy hay pedidos {statusOrders}s</div>;

    return (
        <div className="m-4 mb-24">
            <p className="text-center mb-3 font-bold text-xl">Periodos de Pagos</p>
            <div className="flex flex-col gap-4">
                {(userTypeName == "DEV" || userTypeName == "SUPPORT") &&
                    periods &&
                    periods.map((period) => (
                        <div key={period.id} className="bg-gray-300 p-4 rounded-md">
                            <div className="flex justify-between">
                                <p>Inicio:</p>
                                <p>{period.start_date.split("T")[0]}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Fin:</p>
                                <p>{period.end_date.split("T")[0]}</p>
                            </div>

                            <div className="flex justify-between">
                                <p>Cantidad de ordenes:</p>
                                <p>{period.orders_count}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Total de articulos vendidos:</p>
                                <p>{period.articles_total_quantity}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Total dinero generado:</p>
                                <p>{showPriceWithCurrency({ iso_code: period.main_currency }, period.total_amount, false)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Total dinero descuento:</p>
                                <p>{showPriceWithCurrency({ iso_code: period.main_currency }, period.discount_amount, false)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Total dinero delivery:</p>
                                <p>{showPriceWithCurrency({ iso_code: period.main_currency }, period.delivery_amount, false)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Total dinero comision paypal:</p>
                                <p>{showPriceWithCurrency({ iso_code: period.main_currency }, period.paypal_fee_amount, false)}</p>
                            </div>

                            <div className="flex justify-between">
                                <p>Total dinero restante:</p>
                                <p>
                                    {showPriceWithCurrency(
                                        { iso_code: period.main_currency },
                                        Number(period.total_amount) +
                                            Number(period.delivery_amount) -
                                            Number(period.discount_amount) -
                                            Number(period.paypal_fee_amount),
                                        false
                                    )}
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <p>Moneda:</p>
                                <p>{period.main_currency}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Estado periodo:</p>
                                <p>{period.status == 1 ? "Activo" : "Inactivo"}</p>
                            </div>
                            <div className="flex justify-center">
                                <p>Ver ordenas periodo:</p>
                            </div>
                        </div>
                    ))}

                {periodsByShops &&
                    periodsByShops.map((period) => (
                        <div key={period.id} className="bg-gray-300 p-4 rounded-md">
                            <div className="flex justify-between">
                                <p>Inicio:</p>
                                <p>{period.start_date.split("T")[0]}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Fin:</p>
                                <p>{period.end_date.split("T")[0]}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Cantidad de ordenes:</p>
                                <p>{period.orders_count}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Total de articulos vendidos:</p>
                                <p>{period.articles_total_quantity}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Total dinero generado:</p>
                                <p>{showPriceWithCurrency({ iso_code: period.main_currency }, period.total_amount, false)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Total dinero descuento:</p>
                                <p>{showPriceWithCurrency({ iso_code: period.main_currency }, period.discount_amount, false)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Total dinero restante:</p>
                                <p>
                                    {showPriceWithCurrency(
                                        { iso_code: period.main_currency },
                                        Number(period.total_amount) - Number(period.discount_amount),
                                        false
                                    )}
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <p>Moneda:</p>
                                <p>{period.main_currency}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Estado periodo:</p>
                                <p>{period.status == 1 ? "Activo" : "Inactivo"}</p>
                            </div>
                            {period.payout_id && (
                                <div className="flex justify-between">
                                    <p>Estado Pago periodo:</p>
                                    <p>Pagado</p>
                                </div>
                            )}
                            <div className="flex justify-center">
                                <p>Ver ordenas periodo:</p>
                            </div>
                        </div>
                    ))}
            </div>

            {/* {activePeriodByShop && (
                <div className="bg-gray-300 p-4 rounded-md">
                    <div className="flex justify-between">
                        <p>Inicio:</p>
                        <p>{activePeriodByShop.start_date.split("T")[0]}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Fin:</p>
                        <p>{activePeriodByShop.end_date.split("T")[0]}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Cantidad de ordenes:</p>
                        <p>{activePeriodByShop.orders_count}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Total de articulos vendidos:</p>
                        <p>{activePeriodByShop.articles_total_quantity}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Total dinero generado:</p>
                        <p>{showPriceWithCurrency({ iso_code: activePeriodByShop.main_currency }, activePeriodByShop.total_amount, false)}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Total dinero descuento:</p>
                        <p>{showPriceWithCurrency({ iso_code: activePeriodByShop.main_currency }, activePeriodByShop.discount_amount, false)}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Total dinero restante:</p>
                        <p>
                            {showPriceWithCurrency(
                                { iso_code: activePeriodByShop.main_currency },
                                Number(activePeriodByShop.total_amount) - Number(activePeriodByShop.discount_amount),
                                false
                            )}
                        </p>
                    </div>
                    <div className="flex justify-between">
                        <p>Moneda:</p>
                        <p>{activePeriodByShop.main_currency}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Estado periodo:</p>
                        <p>{activePeriodByShop.status == 1 ? "Activo" : "Inactivo"}</p>
                    </div>
                    {activePeriodByShop.payout_id && (
                        <div className="flex justify-between">
                            <p>Estado Pago periodo:</p>
                            <p>Pagado</p>
                        </div>
                    )}
                    <div className="flex justify-center">
                        <p>Ver ordenas periodo:</p>
                    </div>
                </div>
            )} */}

            {/* {(userTypeName == "DEV" || userTypeName == "SUPPORT") && (
                <button className="bg-green-700 text-white w-full rounded-3xl py-3" onClick={() => setMakePay(!makePay)}>
                    Realizar pagos
                </button>
            )}

            {makePay && (
                <>
                    <Spacer />
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition
         hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
         active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                        onClick={payPeriodAllShops}
                    >
                        Pagar a todas las tiendas
                    </button>
                </>
            )} */}

            {(userTypeName == "DEV" || userTypeName == "SUPPORT") && (
                <ButtonGrayDown fn={() => router.push("/admin/pagos/0")}>Crear Periodo de pago</ButtonGrayDown>
            )}
        </div>
    );
};

export default Client;
