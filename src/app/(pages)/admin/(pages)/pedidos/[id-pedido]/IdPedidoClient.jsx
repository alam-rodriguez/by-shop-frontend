"use client";

// React
import React, { useEffect, useState } from "react";

// Next
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

// Hooks
import {
    useGetOrderById,
    useGetOrders,
    useGetOrdersFromShop,
    useGetOrdersFromShopAndOrder,
    useUpdateCartBoughtItemStatus,
    useUpdateCartBoughtItemStatusImage,
    useUpdateCartBoughtStatus,
    useUpdateCartsBoughtItemStatus,
} from "@/app/hooks/request/carts/requestsCarts";
import { showOrderStatusForClient } from "@/app/hooks/app/app";

// Components
import Spacer from "@/app/components/home/Spacer";

// Zustand
import { zusUser } from "@/app/zustand/user/zusUser";

// Sonner
import { toast } from "sonner";

// Components
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import ButtonGray from "@/app/components/others/ButtonGray";

// Alerts
import useAlert from "@/app/alerts/react-confirm-alert/useAlert";
import { getOrderById } from "@/app/request/carts/requestsCarts";
import { useCreateDeliveryOrder, useGetDeliveryOrderExists } from "@/app/hooks/request/deliveries/requestsDeliveries";
import {
    useSendPushNotificationsToClientForOrderUpdate,
    useSendPushNotificationsToDeliveriesForNewOrder,
} from "@/app/hooks/request/web-push-notifications/webPushNotifications";

const IdPedidoClient = () => {
    const { ["id-pedido"]: idOrder } = useParams();

    const searchParams = useSearchParams();

    const responsabilidad = searchParams.get("responsabilidad");
    const isResponsible = responsabilidad == "true";

    const router = useRouter();

    const { id_shop, name_shop, type } = zusUser();

    const { confirmAlertCustom } = useAlert();

    // useEffect(() => {
    //     console.log(type);
    // }, [type]);

    const { data, isLoading } = useGetOrders();

    const { data: order, isLoading: isLoadingOrder, refetch: refetchOrder } = useGetOrderById(idOrder);

    useEffect(() => {
        console.log(order);
    }, [order]);

    const { data: orderForShop, isLoading: isLoadingOrderForShop, refetch: refetchOrderForShop } = useGetOrdersFromShopAndOrder(id_shop, idOrder);

    // useEffect(() => {
    //     console.warn(order);
    // }, [order, id_shop, idOrder]);

    // useEffect(() => {
    //     console.log(id_shop);
    //     console.log(data);
    // }, [data, id_shop]);

    const handleClickOrder = (idOffer = 0) => router.push(`/admin/pedidos/${idOffer}`);

    const [statusMessage, setStatusMessage] = useState("");
    const [total, setTotal] = useState(0);
    const [articulos, setArticulos] = useState(0);

    useEffect(() => {
        if (!order) return;
        if (order.status == 1 && order.wantUseAddress) setStatusMessage("Comprando...");
        else if (order.status == 2 && order.wantUseAddress) setStatusMessage("Enviando...");
        else if (order.status == 3 && order.wantUseAddress) setStatusMessage("Recibido");
        else if (order.status == 1 && !order.wantUseAddress) setStatusMessage("Comprando...");
        else if (order.status == 2 && !order.wantUseAddress) setStatusMessage("Listo para retirar");
        else if (order.status == 3 && !order.wantUseAddress) setStatusMessage("Retirado");
        else if (order.status == 0) setStatusMessage("Cancelado");

        let total = 0;
        let articulos = 0;
        order.articles.forEach((article) => {
            total += Number(article.total_price_with_discount) * Number(article.article_quantity);
            articulos += Number(article.article_quantity);
        });
        setTotal(total);
        setArticulos(articulos);
    }, [order]);

    useEffect(() => {
        if (!orderForShop) return;
        if (orderForShop.status == 1 && orderForShop.wantUseAddress) setStatusMessage("Comprando...");
        else if (orderForShop.status == 2 && orderForShop.wantUseAddress) setStatusMessage("Enviando...");
        else if (orderForShop.status == 3 && orderForShop.wantUseAddress) setStatusMessage("Recibido");
        else if (orderForShop.status == 1 && !orderForShop.wantUseAddress) setStatusMessage("Comprando...");
        else if (orderForShop.status == 2 && !orderForShop.wantUseAddress) setStatusMessage("Listo para retirar");
        else if (orderForShop.status == 3 && !orderForShop.wantUseAddress) setStatusMessage("Retirado");
        else if (orderForShop.status == 0) setStatusMessage("Cancelado");

        let total = 0;
        let articulos = 0;
        orderForShop.articles.forEach((article) => {
            // total += article.article_price * article.article_quantity;
            total += Number(article.total_price_with_discount) * Number(article.article_quantity);
            articulos += Number(article.article_quantity);
        });
        setTotal(total);
        setArticulos(articulos);
    }, [orderForShop]);

    const handleChangeCartBoughtItemStatus = async (idCartBoughtItem, status) => {
        const loadingToast = toast.loading("Actualizando orden...");

        console.log(idCartBoughtItem);
        console.log(status);
        const res = await useUpdateCartBoughtItemStatus(idCartBoughtItem, status);
        console.log(res);
        refetchOrderForShop();
        if (res) {
            toast.success("Orden actualizada", {
                id: loadingToast,
            });
        } else {
            toast.error("Error al actualizar la orden", {
                id: loadingToast,
            });
        }
    };

    const changeImageCartBoughtStatus = async (status) => {
        const canDoAction = type == 4 || type == 5;

        if (!canDoAction) {
            toast.info("No puedes cambiar el estado de confirmacion pedido, comunicate con alguien de soporte");
            return;
        }

        const want = await confirmAlertCustom({
            head: "Cambiar estado de imagen",
            content: status == 0 ? "¿Desea rechazar la imagen?" : "¿Desea aceptar la imagen?",
            confirmText: "Sí",
            cancelText: "No",
        });
        if (!want) return;

        const loadingToast = toast.loading("Actualizando Estado de la imagen...");

        const res = await useUpdateCartBoughtItemStatusImage(idOrder, status);
        if (res)
            toast.success("Estado de la imagen actualizado", {
                id: loadingToast,
            });
        else
            toast.error("Error al actualizar el estado de la imagen", {
                id: loadingToast,
            });
    };

    const changeCartBoughtStatus = async (status) => {
        const wantUseAddress = order.want_use_address;
        let message = "";
        if (status == 0) message = "¿Desea cancelar el pedido?";
        if (status == 2) message = "Marcar el pedido como recibido?, en verdad tienes todos los pedidos ?";
        if (status == 3 && wantUseAddress) message = "Marcar el pedido como 'enviando'?";
        if (status == 3 && !wantUseAddress) message = "Marcar el pedido como 'listo para retirar'?";
        if (status == 4 && wantUseAddress) message = "Marcar el pedido como 'entregado'?";
        if (status == 4 && !wantUseAddress) message = "Marcar el pedido como 'retirado'?";
        if (status == 5) message = "Archivar pedido";

        if (status == 2) {
            const hasAlArticles = (await getOrderById(idOrder)).articles.every((article) => Number(article.status_cart_bought_item) === 2);
            if (!hasAlArticles) {
                toast.warning("Todos los deben de estar disponibles");
                return;
            }
            if (order.require_image == 1) {
                const statusImage = (await getOrderById(idOrder)).status_image;
                if (statusImage != 1) {
                    toast.warning("Antes tienes que confirmar la foto del comprobante");
                    return;
                }
            }
        }

        const want = await confirmAlertCustom({
            head: "Cambiar estado del pedido?",
            content: message,
            confirmText: "Sí",
            cancelText: "No",
        });
        if (!want) return;

        const loadingToast = toast.loading("Actualizando Estado de pedido...");

        const res = await useUpdateCartBoughtStatus(idOrder, status);

        const payloadNotification = {
            title: "Estado de pedido actualizado",
            body:
                status == 0
                    ? "Su pedidos ha sido cancelado"
                    : status == 2
                    ? "Su pedido esta en preparacion"
                    : status == 3 && wantUseAddress
                    ? "Su pedido esta siendo enviado"
                    : status == 3 && !wantUseAddress
                    ? "Su pedido esta listo para retirar"
                    : status == 4 && wantUseAddress
                    ? "Su pedido ha sido entregado"
                    : status == 4 && !wantUseAddress == "Su pedido ha sido retirado",
        };

        if (!status == 5) {
            const resNotification = await useSendPushNotificationsToClientForOrderUpdate(order.id_user, payloadNotification);
            console.log(resNotification);
        }

        // console.log(order.id_user);
        // console.log(resNotification);
        // console.log("------------");
        if (res)
            toast.success("Estado de la imagen actualizado", {
                id: loadingToast,
            });
        else
            toast.error("Error al actualizar el estado de la imagen", {
                id: loadingToast,
            });

        refetchOrder();
    };

    // useEffect(() => {
    //     if (status == 1) setStatusMessage("Comprando...");
    //     else if (status == 2 && wantUseAddress) setStatusMessage("Enviando...");
    //     else if (status == 2 && !wantUseAddress) setStatusMessage("Listo para retirar");
    //     else if (status == 3 && wantUseAddress) setStatusMessage("Recibido");
    //     else if (status == 3 && !wantUseAddress) setStatusMessage("Retirado");
    //     else if (status == 3) setStatusMessage("Cancelado");
    // }, []);

    const hasEverything = async () => {
        const want = await confirmAlertCustom({
            head: "Tienes todos los articulos?",
            content: `¿Tienes todos los articulos de la orden?.`,
            confirmText: "Sí",
            cancelText: "No",
        });
        if (!want) return;

        const loadingToast = toast.loading("Actualizando estado de los articulos...");

        const idsCartsBoughtItem = orderForShop.articles.map((article) => article.id_cart_bought_item);
        const res = await useUpdateCartsBoughtItemStatus(idsCartsBoughtItem, 2);
        if (res)
            toast.success("Estado de los articulos actualizado", {
                id: loadingToast,
            });
        else
            toast.error("Error al actualizar el estado de los articulos", {
                id: loadingToast,
            });
    };

    const publishOrderForDelivery = async () => {
        const loadingToast = toast.loading("Publicando delivery...");
        const deliveryOrderExists = await useGetDeliveryOrderExists(order.id);
        if (deliveryOrderExists) {
            toast.info("Esta Orden ya esta publicada", {
                id: loadingToast,
            });
            return;
        }
        const res = await useCreateDeliveryOrder(order.id, 100);
        const resNotifications = await useSendPushNotificationsToDeliveriesForNewOrder();
        if (res && resNotifications)
            toast.success("Delivery publicado", {
                id: loadingToast,
            });
        else
            toast.error("Error al publicar el delivery", {
                id: loadingToast,
            });
    };

    if (type == 4 || type == 5 || isResponsible) {
        if (isLoadingOrder || !order) return <LoadingParagraph />;
        return (
            <div className="m-4">
                <p className="text-center mb-3 font-bold text-xl">Pedido</p>
                {/* {data.map((order) => { */}
                <div key={order.id} className="bg-gray-300 p-4 rounded-md" onClick={() => handleClickOrder(order.id)}>
                    <p className="text-center">{order.user_name}</p>
                    <Spacer space={25} />
                    <div className="flex justify-between">
                        <p>metodo de pago:</p>
                        <p>{order.pay_method_name}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Articulos comprados:</p>
                        <p>{articulos}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Total del pedido:</p>
                        <p>{total}</p>
                    </div>
                    {order.require_image == 1 && (
                        <div className="flex justify-between">
                            <p>Estado de la imagen:</p>
                            <p>{!order.status_image ? "Pendiente" : order.status_image == 0 ? "Rechazada" : "Aceptada"}</p>
                        </div>
                    )}
                    <div className="flex justify-between">
                        <p>Estado del pedido:</p>
                        <p>{showOrderStatusForClient(order.status, order.want_use_address > 0 ? true : false)}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Fecha de compra:</p>
                        <p>{order.created_at.split("T")[0].split("-").reverse().join("-")}</p>
                    </div>
                </div>
                <Spacer space={25} />

                <p className="text-center mb-3 font-bold text-xl">Todos los Articulos</p>
                <div className="flex flex-col gap-10">
                    {order.articles.map((article, i) => {
                        let statusArticle = "";
                        if (article.status_cart_bought_item == 1) statusArticle = "Pendiente";
                        else if (article.status_cart_bought_item == 0) statusArticle = "No disponiblbe";
                        else if (article.status_cart_bought_item == 2) statusArticle = "Disponible";

                        return (
                            <div key={i}>
                                <div className="bg-gray-300 p-4 rounded-md" onClick={() => handleClickOrder(order.id)}>
                                    <div className="flex justify-between">
                                        <p>Nombre de la tienda:</p>
                                        <p>{article.article_name_shop}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Nombre del articulo:</p>
                                        <p>{article.article_name}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Precio:</p>
                                        <p>{article.article_price}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Cantidad:</p>
                                        <p>{article.article_quantity}</p>
                                    </div>
                                    {article.article_percent_discount > 0 && (
                                        <div className="flex justify-between">
                                            <p>Descuento:</p>
                                            <p>{article.article_percent_discount} %</p>
                                        </div>
                                    )}
                                    <div className="flex justify-between">
                                        <p>Total:</p>
                                        <p>{Number(article.total_price_with_discount) * Number(article.article_quantity)}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Estado de articulo:</p>
                                        <p>{statusArticle}</p>
                                    </div>
                                </div>
                                <Spacer space={5} />
                                {/* <div className="flex justify-between">
                                    <button
                                        className="px-4 py-2 rounded bg-gray-200 self-end"
                                        onClick={() => handleChangeCartBoughtItemStatus(article.id_cart_bought_item, 0)}
                                    >
                                        No lo tengo
                                    </button>
                                    <button
                                        className="px-4 py-2 rounded bg-gray-200 self-end"
                                        onClick={() => handleChangeCartBoughtItemStatus(article.id_cart_bought_item, 2)}
                                    >
                                        Lo tengo
                                    </button>
                                </div> */}
                            </div>
                        );
                    })}
                </div>

                {/* })} */}
                {/* <button className="bg-green-700 text-white w-full rounded-3xl py-3" onClick={() => handleClickOffer()}>
            Crear Oferta
        </button> */}
                <Spacer space={25} />

                {order.image && order.image != "" && (
                    <>
                        <p className="text-center mb-3 font-bold text-xl">Imagen del pago</p>
                        <Image
                            src={order.image}
                            alt="imagen"
                            className="w-full h-auto"
                            width={1920} // se requiere para cálculo interno
                            height={1080}
                        />
                        <Spacer space={25} />

                        <div className="flex justify-between gap-2">
                            <button className="px-4 py-2 rounded bg-gray-200 self-end mx-auto w-full" onClick={() => changeImageCartBoughtStatus(0)}>
                                Rechazar imagen
                            </button>
                            <button className="px-4 py-2 rounded bg-gray-200 self-end mx-auto w-full" onClick={() => changeImageCartBoughtStatus(1)}>
                                Confirmar imagen
                            </button>
                        </div>
                    </>
                )}

                <Spacer space={25} />

                {/* // useEffect(() => {
                    //     if (status == 1) setStatusMessage("Comprando...");
                    //     else if (status == 2 && wantUseAddress) setStatusMessage("Enviando...");
                    //     else if (status == 2 && !wantUseAddress) setStatusMessage("Listo para retirar");
                    //     else if (status == 3 && wantUseAddress) setStatusMessage("Recibido");
                    //     else if (status == 3 && !wantUseAddress) setStatusMessage("Retirado");
                    //     else if (status == 3) setStatusMessage("Cancelado");
                    // }, []); */}

                <div className="flex flex-wrap justify-between gap-2">
                    {(type == 4 || type == 5) && (
                        <ButtonGray
                            fn={() => changeCartBoughtStatus(0)}
                            disabled={order.status == 1 || order.status == 5 || (order.status == 0) | (order.status == 2) ? false : true}
                        >
                            Cancelar Pedido
                        </ButtonGray>
                    )}

                    {/* <button className="px-4 py-2 rounded bg-gray-200 self-end mx-auto w-full" onClick={() => changeCartBoughtStatus(0)} disabled>
                        Cancelar Pedido
                    </button> */}
                    <ButtonGray
                        fn={() => changeCartBoughtStatus(2)}
                        disabled={order.status == 1 || order.status == 3 || order.status == 0 || order.status == 2 ? false : true}
                    >
                        Recibido
                    </ButtonGray>

                    {/* <button className="px-4 py-2 rounded bg-gray-200 self-end mx-auto w-full" onClick={() => changeCartBoughtStatus(2)} disabled>
                        Recivido
                    </button> */}
                    <ButtonGray
                        fn={() => changeCartBoughtStatus(3)}
                        disabled={order.status == 2 || order.status == 3 || order.status == 4 ? false : true}
                    >
                        {order.want_use_address == 1 ? "Enviar" : "Listo para retirar"}
                    </ButtonGray>
                    {/* <button className="px-4 py-2 rounded bg-gray-200 self-end mx-auto w-full" onClick={() => changeCartBoughtStatus(3)} disabled>
                        Enviar
                    </button> */}
                    <ButtonGray fn={() => changeCartBoughtStatus(4)} disabled={order.status == 3 || order.status == 4 ? false : true}>
                        Pedido Entregado
                    </ButtonGray>
                    {/* <button className="px-4 py-2 rounded bg-gray-200 self-end mx-auto w-full" onClick={() => changeCartBoughtStatus(4)} disabled>
                        Pedido Entregado
                    </button> */}
                    {(type == 4 || type == 5) && (
                        <ButtonGray fn={() => changeCartBoughtStatus(5)} disabled={order.status == 4 ? false : true}>
                            Archivar pedido
                        </ButtonGray>
                    )}

                    {/* <button className="px-4 py-2 rounded bg-gray-200 self-end mx-auto w-full" onClick={() => changeCartBoughtStatus(5)} disabled>
                        Archivar pedido
                    </button> */}
                </div>
                {/* <button className="px-4 py-2 rounded bg-gray-200 self-end mx-auto w-full" onClick={() => {}}>
                    Archivar pedido
                </button> */}
                {order.want_use_address == 1 && (
                    <>
                        <Spacer />
                        <ButtonGray fn={publishOrderForDelivery} disabled={order.status == 2 ? false : true}>
                            Publicar para delivery
                        </ButtonGray>
                        <p className="text-xs">Al publicar este pedido para un delivery cualquier delivery registrado en el sistema podra tomarlo</p>
                    </>
                )}
            </div>
        );
    } else {
        if (isLoadingOrderForShop || !orderForShop) return <LoadingParagraph />;
        return (
            <div className="m-4">
                <p className="text-center mb-3 font-bold text-xl">Pedido</p>
                {/* {data.map((order) => { */}
                <div key={orderForShop.id} className="bg-gray-300 p-4 rounded-md" onClick={() => handleClickOrder(orderForShop.id)}>
                    <p className="text-center">{orderForShop.user_name}</p>
                    <Spacer space={25} />
                    <div className="flex justify-between">
                        <p>metodo de pago:</p>
                        <p>{orderForShop.id_pay_method}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Articulos comprados:</p>
                        <p>{articulos}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Total del pedido:</p>
                        <p>{total}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Estado del pedido:</p>
                        <p>{statusMessage}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Fecha de compra:</p>
                        <p>{orderForShop.created_at.split("T")[0].split("-").reverse().join("-")}</p>
                    </div>
                </div>
                <Spacer space={25} />

                <p className="text-center mb-3 font-bold text-xl">Articulos de mi tienda</p>
                <div className="flex flex-col gap-10">
                    {orderForShop.articles.map((article, i) => {
                        let statusArticle = "";
                        if (article.status_cart_bought_item == 1) statusArticle = "Pendiente";
                        else if (article.status_cart_bought_item == 0) statusArticle = "No disponiblbe";
                        else if (article.status_cart_bought_item == 2) statusArticle = "Disponible";

                        return (
                            <div key={i}>
                                <div className="bg-gray-300 p-4 rounded-md" onClick={() => handleClickOrder(order.id)}>
                                    <div className="flex justify-between">
                                        <p>Nombre del articulo:</p>
                                        <p>{article.article_name}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Precio:</p>
                                        <p>{article.article_price}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Cantidad:</p>
                                        <p>{article.article_quantity}</p>
                                    </div>
                                    {article.article_percent_discount > 0 && (
                                        <div className="flex justify-between">
                                            <p>Descuento:</p>
                                            <p>{article.article_percent_discount} %</p>
                                        </div>
                                    )}
                                    <div className="flex justify-between">
                                        <p>Total:</p>
                                        <p>{Number(article.total_price_with_discount) * Number(article.article_quantity)}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Estado de orden:</p>
                                        <p>{statusArticle}</p>
                                    </div>
                                </div>
                                <Spacer space={5} />
                                {order.status == 1 && (
                                    <div className="flex justify-between">
                                        <button
                                            className="px-4 py-2 rounded bg-gray-200 self-end"
                                            onClick={() => handleChangeCartBoughtItemStatus(article.id_cart_bought_item, 0)}
                                        >
                                            No lo tengo
                                        </button>
                                        <button
                                            className="px-4 py-2 rounded bg-gray-200 self-end"
                                            onClick={() => handleChangeCartBoughtItemStatus(article.id_cart_bought_item, 2)}
                                        >
                                            Lo tengo
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <Spacer space={25} />

                {order.status == 1 && (
                    <button className="px-4 py-2 rounded bg-gray-200 self-end mx-auto w-full" onClick={hasEverything}>
                        Tengo todo listo
                    </button>
                )}

                {/* })} */}
                {/* <button className="bg-green-700 text-white w-full rounded-3xl py-3" onClick={() => handleClickOffer()}>
                Crear Oferta
            </button> */}
            </div>
        );
    }
};

export default IdPedidoClient;
