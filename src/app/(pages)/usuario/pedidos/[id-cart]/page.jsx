"use client";

// React
import React, { useEffect, useState } from "react";

// Next
import { useParams, useRouter } from "next/navigation";

// Icons
import { Icon } from "@iconify/react";

// Components
import Divider from "@/app/components/home/Divider";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import Spacer from "@/app/components/home/Spacer";

// Hooks
import { useGetArticleByIdCart } from "@/app/hooks/request/articles/requestsArticles";
import Image from "next/image";
import { showDate, showOrderStatusForClient, showText } from "@/app/hooks/app/app";
import ImageA from "@/app/components/others/ImageA";

const page = () => {
    const { ["id-cart"]: idCart } = useParams();

    const router = useRouter();

    const { data: dataArticle, isLoading: isLoadingArticle } = useGetArticleByIdCart(idCart);

    useEffect(() => {
        console.log(dataArticle);
    }, [dataArticle]);

    console.log(idCart);

    const handleClickShare = () => {
        const domain = window.location.origin;
        navigator.share({
            title: dataArticle.name,
            text: dataArticle.description,
            url: `${domain}/articulos/${dataArticle.id}`,
        });
    };

    if (isLoadingArticle) return <LoadingParagraph />;
    // return null;
    return (
        <>
            <Spacer />
            <div className="m-4">
                <div className="flex gap-3 items-center">
                    <ImageA src={dataArticle.main_image} className="w-1/2 h-auto" />
                    <div className="flex flex-col gap-1 text-blue-800 text-sm" onClick={handleClickShare}>
                        <p>{showText(dataArticle.description, 30)}</p>
                        <div className="flex gap-2 items-center">
                            <Icon icon="weui:share-outlined" width="24" height="24" />
                            <p>Compartir este articulo</p>
                        </div>
                    </div>
                </div>
                <Spacer />
                <ArrowButton text="Comprar nuevamente" onClick={() => router.push(`/articulos/${dataArticle.id}`)} />
            </div>
            <Divider h={10} />
            <div className="m-4">
                <p className="font-bold text-lg">Como es tu articulo?</p>
                <ArrowButton lb={false} text="Escribir comentario" onClick={() => router.push(`/articulos/${dataArticle.id}/mi-opinion`)} />
                <ArrowButton lb={false} text="Crea una reseña con imagenes" onClick={() => router.push(`/articulos/${dataArticle.id}/mi-opinion`)} />
                <ArrowButton text="Evaluar vendedor" />
            </div>
            <Divider h={10} />
            <div className="m-4">
                <p className="font-bold text-lg">Informacion del pedido</p>
                <ArrowButton text="Ver detalles del pedido" onClick={() => router.push(`/usuario/pedidos/${idCart}/detalles`)} />
                <p className="text-gray-600">La ventana de devolucion se cerror el {showDate(dataArticle.created_at_cart)}</p>
                <p className="text-gray-600">
                    {showOrderStatusForClient(dataArticle.status_cart)} el {showDate(dataArticle.created_at_cart)}
                </p>
            </div>
            <Divider h={10} />
        </>
    );
};

export default page;

const ArrowButton = ({ text, mt, mb, lt = true, lb = true, onClick = () => {} }) => {
    return (
        <>
            {lt && <Divider />}
            <div className="flex justify-between items-center mx-4" onClick={onClick}>
                <p>{text}</p>
                <Icon icon="weui:arrow-outlined" width="12" height="24" />
            </div>
            {lb && <Divider />}
        </>
    );
};
