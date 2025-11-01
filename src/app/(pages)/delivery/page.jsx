"use client";

import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import { useGetDeliveriesOrders } from "@/app/hooks/request/deliveries/requestsDeliveries";
import React, { useEffect } from "react";

const page = () => {
    const { data, isLoading } = useGetDeliveriesOrders();

    useEffect(() => {
        console.log(data);
    }, [data]);

    if (isLoading) return <LoadingParagraph text="Buscando Deliveries" />;
    return (
        <div>
            {data.map((delivery) => (
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
                    <button>Tomar Pedido</button>
                    <button>Descartar</button>
                </div>
            ))}
        </div>
    );
};

export default page;
