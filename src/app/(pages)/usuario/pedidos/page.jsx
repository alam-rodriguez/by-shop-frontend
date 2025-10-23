"use client";

import React, { useEffect, useState } from "react";

// Icons
import { Icon } from "@iconify/react";

// Components
import Divider from "@/app/components/home/Divider";
import Spacer from "@/app/components/home/Spacer";

// Zustand
import { zusUser } from "@/app/zustand/user/zusUser";

// Hooks
import { useGetCartUserBought } from "@/app/hooks/request/carts/requestsCarts";

// Next
import Image from "next/image";
import { showOrderStatusForClient } from "@/app/hooks/app/app";
import { useRouter } from "next/navigation";
import ImageA from "@/app/components/others/ImageA";

const page = () => {
    const router = useRouter();

    const { id } = zusUser();

    const { isLoading, data } = useGetCartUserBought(id);

    useEffect(() => {
        console.log(data);
    }, [data]);

    function searchArticlesOrdered(e) {
        if (e.key !== "Enter") return;
        router.push(`/usuario/pedidos/buscar?t=${e.target.value}`);
    }

    // return (
    //     <div>
    //         <div>
    //             <i></i>
    //             <p className="text-2xl font-bold text-center">Transatino History</p>
    //             <i></i>
    //         </div>
    //         <Spacer />
    //         <div className="flex flex-col gap-6">
    //             <div className="flex">
    //                 <div className="w-1/5 grid place-items-center">
    //                     <ImageA
    //                         className="size-14 object-cover rounded-full"
    //                         src="https://8cfbi9foz7.ufs.sh/f/0DUeKQjxChl7lBHUB6y7D4zVcm0fFoU6uJhKXLwTOIMGkjN3"
    //                     />
    //                 </div>
    //                 <div className="flex flex-col w-3/5 justify-evenly">
    //                     <p className="text-xl font-bold">Suga Leather Shoes</p>
    //                     <p className="text-gray-500 text-xs">Dec 15. 2024 | 10:00 AM</p>
    //                 </div>
    //                 <div className="flex flex-col w-1/5 justify-evenly">
    //                     <p className="text-lg font-bold">$262.5</p>
    //                     <div className="flex items-center gap-1">
    //                         <p className="text-gray-500 text-xs">Orders</p>
    //                         <Icon icon="mdi:check-circle" className="text-green-700" />
    //                     </div>
    //                 </div>
    //             </div>
    //             <div className="flex">
    //                 <div className="w-1/5 grid place-items-center">
    //                     <ImageA
    //                         className="size-14 object-cover rounded-full"
    //                         src="https://8cfbi9foz7.ufs.sh/f/0DUeKQjxChl7lBHUB6y7D4zVcm0fFoU6uJhKXLwTOIMGkjN3"
    //                     />
    //                 </div>
    //                 <div className="flex flex-col w-3/5 justify-evenly">
    //                     <p className="text-xl font-bold">Suga Leather Shoes</p>
    //                     <p className="text-gray-500 text-xs">Dec 15. 2024 | 10:00 AM</p>
    //                 </div>
    //                 <div className="flex flex-col w-1/5 justify-evenly">
    //                     <p className="text-lg font-bold">$262.5</p>
    //                     <div className="flex items-center gap-1">
    //                         <p className="text-gray-500 text-xs">Orders</p>
    //                         <Icon icon="mdi:check-circle" className="text-green-700" />
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );

    if (isLoading) return <p>Cargando...</p>;

    return (
        <div className=" h-screen">
            <p className="m-4 font-semibold text-xl">Tus pedidos</p>
            <Divider mb={0} />
            <div className="flex justify-between items-center mx-4 my-2 h-12">
                <div className="flex gap-2">
                    <Icon icon="tabler:search" className="text-blue-800" width="24" height="24" />
                    <input type="text" placeholder="Buscar todos los pedidos" onKeyDown={searchArticlesOrdered} />
                </div>
                <div className="flex gap-4 items-center border-l-2 px-3 h-full">
                    <span>Filtro</span>
                    <Icon icon="uiw:right" width="20" height="20" />
                </div>
            </div>
            {data.length == 0 ? (
                <>
                    <div className="bg-gray-500/35 relative h-48">
                        <Icon
                            icon="game-icons:cardboard-box"
                            // icon="ix:box-open"
                            width="200"
                            height="200"
                            className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500"
                        />
                    </div>
                    <Spacer space={35} />
                    <div className="m-8">
                        <p className="mt-10 text-blue-800 text-2xl">Sus pedidos</p>
                        <Spacer space={15} />
                        <p className="text-gray-600">Parece que no has realiazo ningun pedido durante los ultimos 3 meses.</p>
                        <Spacer space={15} />
                        <p className="text-gray-600">Use la busqueda anterior para encontrar pedidos anteriores</p>
                        <div className="flex gap-4 items-end">
                            <Divider />
                            <span className="text-gray-400">o</span>
                            <Divider />
                        </div>
                        <Spacer space={10} />
                        <button className="w-full border border-gray-500 rounded-full p-3 text-gray-600">Seguir comprando</button>
                    </div>
                </>
            ) : (
                <div className="bg-gray-100 h-full pt-2">
                    {data.map((order) => (
                        <Order
                            key={order.id}
                            articles={order.articles}
                            status={order.status}
                            wantUseAddress={order.want_use_address}
                            createdAt={order.created_at}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default page;

const Order = ({ articles, status, wantUseAddress, createdAt }) => {
    const router = useRouter();

    const [statusMessage, setStatusMessage] = useState("");

    useEffect(() => {
        if (status == 1) setStatusMessage("Comprando...");
        else if (status == 2 && wantUseAddress) setStatusMessage("Preparando...");
        else if (status == 3 && !wantUseAddress) setStatusMessage("Listo para retirar");
        else if (status == 3 && wantUseAddress) setStatusMessage("Enviando...");
        else if (status == 4 && !wantUseAddress) setStatusMessage("Retirado");
        else if (status == 4 && wantUseAddress) setStatusMessage("Recibido");
        else if (status == 0) setStatusMessage("Cancelado");
        else {
            if (wantUseAddress) setStatusMessage("Recibido");
            else setStatusMessage("Retirado");
        }
    }, []);
    // useEffect(() => {
    //     if (status == 1) setStatusMessage("Comprando...");
    //     else if (status == 2 && wantUseAddress) setStatusMessage("Enviando...");
    //     else if (status == 2 && !wantUseAddress) setStatusMessage("Listo para retirar");
    //     else if (status == 3 && wantUseAddress) setStatusMessage("Recibido");
    //     else if (status == 3 && !wantUseAddress) setStatusMessage("Retirado");
    //     else if (status == 0) setStatusMessage("Cancelado");
    // }, []);

    // useEffect(() => {
    //     if (status == 1 && wantUseAddress) setStatusMessage("Comprando...");
    //     else if (status == 2 && wantUseAddress) setStatusMessage("Enviando...");
    //     else if (status == 3 && wantUseAddress) setStatusMessage("Recibido");
    //     else if (status == 1 && !wantUseAddress) setStatusMessage("Comprando...");
    //     else if (status == 2 && !wantUseAddress) setStatusMessage("Listo para retirar");
    //     else if (status == 3 && !wantUseAddress) setStatusMessage("Retirado");
    //     else if (status == 3) setStatusMessage("Cancelado");
    // }, []);

    return (
        <div className="m-4 shadow border bg-white p-2 rounded">
            {/* <p>LLega hoy</p> */}
            {/* llega fecha */}
            {/* <p>Eviado</p> */}
            <p className="mb-2 font-semibold text-base">{showOrderStatusForClient(status, wantUseAddress > 0 ? true : false)}</p>

            <div className="flex overflow-scroll gap-2 no-scrollbar">
                {articles.map((article, index) => (
                    <Image
                        key={index}
                        src={article.article_image}
                        alt=""
                        width={150}
                        height={150}
                        priority
                        onClick={() => router.push(`/usuario/pedidos/${article.id_cart}`)}
                    />
                ))}
            </div>
            {articles.length > 3 && <p className="text-gray-700 text-sm my-2">{articles.length} Articulos en este paquete</p>}
        </div>
    );
};
