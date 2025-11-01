import Spacer from "@/app/components/home/Spacer";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import { showOrderStatusForClient } from "@/app/hooks/app/app";
import { useGetOrdersByResponsibleShop } from "@/app/hooks/request/carts/requestsCarts";
import { zusUser } from "@/app/zustand/user/zusUser";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const ResponsibleOrders = () => {
    const searchParams = useSearchParams();

    const statusOrders = searchParams.get("estado");
    const { id_shop } = zusUser();
    // const responsabilidad = searchParams.get("responsabilidad");

    // const isResponsible = responsabilidad == "true";

    console.log(statusOrders);

    const status = statusOrders == "pendiente" ? "1, 2, 3" : statusOrders == "realizado" ? "3" : statusOrders == "archivado" ? "5" : "";

    console.log(status);

    const router = useRouter();

    // const { id_shop, name_shop, type } = zusUser();

    const { data, isLoading } = useGetOrdersByResponsibleShop(id_shop, status);

    const handleClickOrder = (idOffer = 0) => router.push(`/admin/pedidos/${idOffer}?responsabilidad=true`);

    if (isLoading) return <LoadingParagraph />;

    return (
        <div>
            <p>Ordenas bajo mi responsabilidad</p>
            <div>
                {data.map((order) => {
                    let statusMessage = "";
                    if (order.status == 1 && order.wantUseAddress) statusMessage = "Comprando...";
                    else if (order.status == 2 && order.wantUseAddress) statusMessage = "Enviando...";
                    else if (order.status == 3 && order.wantUseAddress) statusMessage = "Recibido";
                    else if (order.status == 1 && !order.wantUseAddress) statusMessage = "Comprando...";
                    else if (order.status == 2 && !order.wantUseAddress) statusMessage = "Listo para retirar";
                    else if (order.status == 3 && !order.wantUseAddress) statusMessage = "Retirado";
                    else if (order.status == 0) statusMessage = "Cancelado";

                    let total = 0;
                    let articulos = 0;
                    order.articles.forEach((article) => {
                        total += Number(article.total_price_with_discount) * Number(article.article_quantity);
                        articulos += article.article_quantity;
                    });

                    return (
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
                            <div className="flex justify-between">
                                <p>Estado del pedido:</p>
                                <p>{showOrderStatusForClient(order.status, order.want_use_address > 0 ? true : false)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Fecha de compra:</p>
                                <p>{order.created_at.split("T")[0].split("-").reverse().join("-")}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ResponsibleOrders;
