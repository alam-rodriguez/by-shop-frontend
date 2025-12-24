"use client";

export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";

// Next
import { useParams, useRouter } from "next/navigation";

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
    getPeriodById,
    getShopsActivePeriod,
    getShopsPeriodsByPeriodId,
    useGetActivePeriod,
    useGetActivePeriodByShop,
} from "@/app/hooks/request/periods/requestsPeriods";
import { ButtonGrayDown } from "@/app/components/others/Buttons";
// import ResponsibleOrders from "./[id-periodo]/ResponsibleOrders";

import { toast } from "sonner";

const page = () => {
    const { id: periodId } = useParams();

    // const searchParams = useSearchParams();

    // const statusOrders = searchParams.get("estado");
    // const responsabilidad = searchParams.get("responsabilidad");

    // const isResponsible = responsabilidad == "true";

    // console.log(statusOrders);

    // const status = statusOrders == "pendiente" ? "1, 2, 3" : statusOrders == "realizado" ? "3" : statusOrders == "archivado" ? "5" : "";

    // console.log(status);

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

    const { data: activePeriod } = useGetActivePeriod();

    const { data: period } = getPeriodById(periodId);

    const { data: shopsPeriods } = getShopsPeriodsByPeriodId(periodId);

    const { data: activePeriodByShop } = useGetActivePeriodByShop(id_shop);

    const { data: activePeriodAllShops } = getActivePeriodsForAllShops();

    // useEffect(() => {
    //     console.warn(activePeriod);
    // }, [activePeriod]);

    useEffect(() => {
        console.warn(activePeriodByShop);
    }, [activePeriodByShop]);

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
            <p className="text-center mb-3 font-bold text-xl">Periodo de pago</p>

            {(userTypeName == "DEV" || userTypeName == "SUPPORT") && period && (
                <>
                    <div className="bg-gray-300 p-4 rounded-md">
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
                    <Spacer />
                    <p className="text-center mb-3 font-bold text-base">Periodo de pago actual por empresas</p>
                    {shopsPeriods &&
                        shopsPeriods.map((shopPeriod) => (
                            <div key={shopPeriod.id} className="bg-gray-300 p-4 rounded-md">
                                <div className="flex justify-between">
                                    <p>Tienda:</p>
                                    <p>{shopPeriod.shop_name}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Inicio:</p>
                                    <p>{shopPeriod.start_date.split("T")[0]}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Fin:</p>
                                    <p>{shopPeriod.end_date.split("T")[0]}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Cantidad de ordenes:</p>
                                    <p>{shopPeriod.orders_count}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Total de articulos vendidos:</p>
                                    <p>{shopPeriod.articles_total_quantity}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Total dinero generado:</p>
                                    <p>{showPriceWithCurrency({ iso_code: shopPeriod.main_currency }, shopPeriod.total_amount, false)}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Total dinero descuento:</p>
                                    <p>{showPriceWithCurrency({ iso_code: shopPeriod.main_currency }, shopPeriod.discount_amount, false)}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Total dinero restante:</p>
                                    <p>
                                        {showPriceWithCurrency(
                                            { iso_code: shopPeriod.main_currency },
                                            Number(shopPeriod.total_amount) - Number(shopPeriod.discount_amount),
                                            false
                                        )}
                                    </p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Moneda:</p>
                                    <p>{shopPeriod.main_currency}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Estado periodo:</p>
                                    <p>{shopPeriod.status == 1 ? "Activo" : "Inactivo"}</p>
                                </div>
                                {shopPeriod.payout_id && (
                                    <div className="flex justify-between">
                                        <p>Estado Pago periodo:</p>
                                        <p>Pagado</p>
                                    </div>
                                )}
                                <div className="flex justify-center">
                                    <p>Ver ordenas periodo:</p>
                                </div>
                                <Spacer />
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition
         hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
         active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                                    onClick={() =>
                                        handleCreateShopPayout(
                                            shopPeriod.shop_id,
                                            Number(shopPeriod.total_amount) - Number(shopPeriod.discount_amount),
                                            0
                                        )
                                    }
                                >
                                    Pagar tienda
                                </button>
                            </div>
                        ))}
                </>
            )}
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

            {/* {(userTypeName == "DEV" || userTypeName == "SUPPORT") && (
                <ButtonGrayDown fn={() => router.push("/admin/pagos/0")}>Crear Periodo de pago</ButtonGrayDown>
            )} */}
        </div>
    );

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

export default page;
