"use client";

import Spacer from "@/app/components/home/Spacer";
import ItemDiv from "@/app/components/others/ItemDiv";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import { showPriceWithCurrency, timeAgo } from "@/app/hooks/app/app";
import {
    useCreateDeliveryOrderPreference,
    useDeliveryCanGetOrder,
    useGetDeliveriesOrders,
    useGetDeliveryOrderById,
    useGetDeliveryOrderPreference,
    useUpdateDeliveryOrderPreference,
    useUpdateDeliveryOrderStatus,
} from "@/app/hooks/request/deliveries/requestsDeliveries";
import { useGetShopsForUserCart, useGetShopsForUserCartBought } from "@/app/hooks/request/shops/requestsShops";
import { zusUser } from "@/app/zustand/user/zusUser";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect } from "react";
import { toast } from "sonner";

const page = () => {
    const { id } = useParams();
    // alert(id);

    const router = useRouter();
    const { data, isLoading } = useGetDeliveryOrderById(id);

    const { data: orderShops, isLoading: isLoadingOrderShops } = useGetShopsForUserCartBought(data?.cart_bought_id);

    const { id: idUser } = zusUser();

    useEffect(() => {
        console.log(data);
    }, [data]);

    useEffect(() => {
        console.log(orderShops);
    }, [orderShops]);

    const handleClickChangeEstatusOrder = async (deliveryOrderId, statusSelected) => {
        const loadingToast = toast.loading("Actualizando preferencia...");
        const canGetOrder = await useDeliveryCanGetOrder(deliveryOrderId, idUser);
        if (!canGetOrder) {
            // if (statusSelected == 1)  alert("No puedes tomar esta orden");
            // else alert("Ya esta orden fue tomada por otro delivery");
            toast.warning("Ya esta orden fue tomada por otro delivery", {
                id: loadingToast,
            });
            return;
        }
        const { hasPreference, data } = await useGetDeliveryOrderPreference(idUser, deliveryOrderId);
        let res = true;
        if (!hasPreference) {
            res = await useCreateDeliveryOrderPreference(idUser, deliveryOrderId, statusSelected);
        } else {
            const idDeliveryOrderPreference = data.id;
            res = await useUpdateDeliveryOrderPreference(idDeliveryOrderPreference, statusSelected, deliveryOrderId, idUser);
        }
        if (res)
            toast.success("Preferencia de delivery Actualizando", {
                id: loadingToast,
            });
        else
            toast.error("Error al actualizar preferencia de delivery", {
                id: loadingToast,
            });

        // console.log(idUser, deliveryOrderId, statusSelected);
    };

    const handleClickDelivery = (deliveryId) => {
        router.push(`/delivery/${deliveryId}`);
    };

    const handleClickGoToLocation = (lat, lon) => {
        // const googleMapsLink = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&travelmode=driving`;
        // console.log(googleMapsLink);
        window.location.href = `https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${lat},${lon}&travelmode=driving`;
        // const link = `https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${lat},${lon}&travelmode=driving`;
        // window.open(link, "_blank", "noopener,noreferrer");
    };

    const handleClickDeliveryWasDone = async () => {
        const res = await useUpdateDeliveryOrderStatus(data.id, 2);
        console.log(res);
    };

    if (isLoading || isLoadingOrderShops) return <LoadingParagraph text="Cargando Delivery" />;
    return (
        <div className="m-4 flex flex-col gap-4">
            <p className="text-center font-bold text-xl">Ordenes activas</p>
            {/* {data.map((delivery) => ( */}
            <React.Fragment key={data.id}>
                <ItemDiv
                    data={[
                        { key: "Precio", value: data.delivery_cost },
                        { key: "Nombre de cliente", value: data.nombre_cliente },
                        { key: "Tienda de recoleccion", value: data.shop_name },
                        { key: "Tiempo de pedido", value: timeAgo(data.created_at) },
                        { key: "Articulos a entregar", value: data.count_articles },
                        data.must_pay == 1 ? { key: "Moneda de pago", value: data.currency.name } : null,
                        data.must_pay == 1
                            ? {
                                  key: "El cliente debe de pagar",
                                  value: showPriceWithCurrency(data.currency, parseFloat(data.total_price), false),
                              }
                            : null,
                        { key: "Distancia", value: data.delivery_distance + " KM" },
                        {
                            key: "Estado De Orden",
                            value:
                                data.delivery_order_preference_status == null
                                    ? "En espera"
                                    : data.delivery_order_preference_status == 0
                                    ? "Rechazada"
                                    : data.delivery_order_preference_status == 1
                                    ? "Aceptada"
                                    : data.delivery_order_preference_status == 2
                                    ? "Realizado"
                                    : "",
                        },
                    ].filter(Boolean)}
                    // onClick={() => handleClickDelivery(delivery.id)}
                />

                <div className="flex justify-between my-1">
                    <button className="px-4 py-2 rounded bg-gray-200 self-end" onClick={() => handleClickChangeEstatusOrder(data.id, 0)}>
                        Rechazar
                    </button>
                    <button className="px-4 py-2 rounded bg-gray-200 self-end" onClick={() => handleClickChangeEstatusOrder(data.id, 1)}>
                        Acceptar
                    </button>
                </div>
            </React.Fragment>
            <p className="text-xl font-bold text-center">Pasos a seguir</p>
            <div className="flex flex-col gap-4">
                {orderShops.map((shop, i) => (
                    <div key={shop.id}>
                        <p className="text-xs">
                            Paso {++i}: Recoger articulo en {shop.name}
                        </p>
                        <button
                            className="px-4 py-2 rounded bg-gray-200 self-end"
                            onClick={() => handleClickGoToLocation(shop.latitude, shop.longitude)}
                        >
                            Ir a {shop.name}
                        </button>
                    </div>
                ))}
                <div>
                    <p className="text-xs">
                        Paso {++orderShops.length}: Entregar articulo a {data.nombre_cliente}
                    </p>
                    <button
                        className="px-4 py-2 rounded bg-gray-200 self-end"
                        onClick={() => handleClickGoToLocation(data.user_address.latitude, data.user_address.longitude)}
                    >
                        Ir a direccion usuario
                    </button>
                </div>
                {data.must_pay == 1 && (
                    <div>
                        <p className="text-xs">
                            Paso {orderShops.length + 1}: Entregar dinero a {orderShops.find((shop) => shop.id == data.shop_id).name}
                        </p>
                        <button
                            className="px-4 py-2 rounded bg-gray-200 self-end"
                            onClick={() => handleClickGoToLocation(data.user_address.latitude, data.user_address.longitude)}
                        >
                            Ir a {orderShops.find((shop) => shop.id == data.shop_id).name}
                        </button>
                    </div>
                )}
                <Spacer />
                <button className="px-4 py-2 rounded bg-gray-200 self-end" onClick={handleClickDeliveryWasDone}>
                    Marcar delivery como terminado
                </button>
            </div>
        </div>
    );
};

export default page;
