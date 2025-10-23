"use client";

export const dynamic = "force-dynamic";

import React, { useEffect } from "react";

// Next
import { useRouter, useSearchParams } from "next/navigation";

// Hooks
import { useGetOrders, useGetOrdersFromShop } from "@/app/hooks/request/carts/requestsCarts";
import { showOrderStatusForClient } from "@/app/hooks/app/app";

// Zustand
import { zusUser } from "@/app/zustand/user/zusUser";

// Components
import Spacer from "@/app/components/home/Spacer";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";

const Client = () => {
    const searchParams = useSearchParams();

    const statusOrders = searchParams.get("estado");

    console.log(statusOrders);

    const status = statusOrders == "pendiente" ? "1, 2, 3" : statusOrders == "realizado" ? "3" : statusOrders == "archivado" ? "5" : "";

    console.log(status);

    const router = useRouter();

    const { id_shop, name_shop, type } = zusUser();

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

    if (isLoading) return <LoadingParagraph />;

    return (
        <div className="m-4">
            <p className="text-center mb-3 font-bold text-xl">Pedidos</p>
            <div className="flex flex-col gap-4">
                {type == 4 || type == 5
                    ? data &&
                      data.length > 0 &&
                      data.map((order) => {
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
                              total += article.article_price * article.article_quantity;
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
                      })
                    : dataFromShop &&
                      dataFromShop.length > 0 &&
                      dataFromShop.map((order) => {
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
                              total += article.article_price * article.article_quantity;
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
                                      <p>{statusMessage}</p>
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

            {/* <button className="bg-green-700 text-white w-full rounded-3xl py-3" onClick={() => handleClickOffer()}>
                Crear Oferta
            </button> */}
        </div>
    );
};

export default Client;
