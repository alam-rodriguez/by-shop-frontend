"use client";

import ItemDiv from "@/app/components/others/ItemDiv";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import { showPriceWithCurrency, timeAgo } from "@/app/hooks/app/app";
import {
    useCreateDeliveryOrderPreference,
    useDeliveryCanGetOrder,
    useGetDeliveriesOrders,
    useGetDeliveryOrderPreference,
    useUpdateDeliveryOrderPreference,
} from "@/app/hooks/request/deliveries/requestsDeliveries";
import { zusUser } from "@/app/zustand/user/zusUser";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect } from "react";
import { toast } from "sonner";

import { io } from "socket.io-client";
const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL_SOCKET);

const page = () => {
    const router = useRouter();
    const { data, isLoading, refetch } = useGetDeliveriesOrders();

    const { id: idUser } = zusUser();

    useEffect(() => {
        console.log(data);
    }, [data]);

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
        router.push(`/deliveries/${deliveryId}`);
    };

    useEffect(() => {
        const handleNewDeliveryOrder = (data) => {
            console.log("Nuevo delivery order recibido:", data);
            refetch();
        };
        socket.on("newDeliveryOrder", handleNewDeliveryOrder);

        return () => {
            socket.off("newDeliveryOrder", handleNewDeliveryOrder);
        };
    }, []);

    if (isLoading) return <LoadingParagraph text="Buscando Deliveries" />;
    return (
        <div className="m-4 flex flex-col gap-4">
            <p className="text-center font-bold text-xl">Ordenes activas</p>
            {data.map((delivery) => (
                <React.Fragment key={delivery.id}>
                    <ItemDiv
                        data={[
                            { key: "Precio", value: delivery.delivery_cost },
                            { key: "Nombre de cliente", value: delivery.nombre_cliente },
                            { key: "Tienda de recoleccion", value: delivery.shop_name },
                            { key: "Tiempo de pedido", value: timeAgo(delivery.created_at) },
                            { key: "Articulos a entregar", value: delivery.count_articles },
                            delivery.must_pay == 1 ? { key: "Moneda de pago", value: delivery.currency.name } : null,
                            delivery.must_pay == 1
                                ? {
                                      key: "El cliente debe de pagar",
                                      value: showPriceWithCurrency(delivery.currency, parseFloat(delivery.total_price), false),
                                  }
                                : null,
                            { key: "Distancia", value: delivery.delivery_distance + " KM" },
                            {
                                key: "Estado De Orden",
                                value:
                                    delivery.delivery_order_preference_status == null
                                        ? "En espera"
                                        : delivery.delivery_order_preference_status == 0
                                        ? "Rechazada"
                                        : delivery.delivery_order_preference_status == 1
                                        ? "Aceptada"
                                        : delivery.delivery_order_preference_status == 2
                                        ? "Realizado"
                                        : "",
                            },
                        ].filter(Boolean)}
                        onClick={() => handleClickDelivery(delivery.id)}
                    />

                    <div className="flex justify-between my-1">
                        <button className="px-4 py-2 rounded bg-gray-200 self-end" onClick={() => handleClickChangeEstatusOrder(delivery.id, 0)}>
                            Rechazar
                        </button>
                        <button className="px-4 py-2 rounded bg-gray-200 self-end" onClick={() => handleClickChangeEstatusOrder(delivery.id, 1)}>
                            Acceptar
                        </button>
                    </div>
                </React.Fragment>
            ))}

            {/* {data.map((delivery) => (
                <div key={delivery.id}>
                    <div>
                        <div className="flex justify-between">
                            <p>Precio</p>
                            <p>{delivery.price}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Nombre de cliente</p>
                            <p>{delivery.nombre_cliente}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Tienda de recoleccion</p>
                            <p>{delivery.price}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Tiempo de pedido</p>
                            <p>{delivery.price}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Articulos a entregar</p>
                            <p>{delivery.count_articles}</p>
                        </div>
                    </div>
                    <button onClick={() => handleClickChangeEstatusOrder(delivery.id, 1)}>Tomar Pedido</button>
                    <button onClick={() => handleClickChangeEstatusOrder(delivery.id, 0)}>Descartar</button>
                </div>
            ))} */}
        </div>
    );
};

export default page;
