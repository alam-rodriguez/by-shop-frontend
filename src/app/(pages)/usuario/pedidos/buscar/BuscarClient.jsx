"use client";

export const dynamic = "force-dynamic";

// React
import React, { useEffect, useRef, useState } from "react";

// Next
import { useRouter, useSearchParams } from "next/navigation";

// Hooks
import ImageA from "@/app/components/others/ImageA";

// Icons
import { Icon } from "@iconify/react";
import Divider from "@/app/components/home/Divider";
import Spacer from "@/app/components/home/Spacer";
import { zusUser } from "@/app/zustand/user/zusUser";
import { useSearchArticlesOrderedUserByWord } from "@/app/hooks/request/carts/requestsCarts";
import { getDateInSpanish, showText } from "@/app/hooks/app/app";

const BuscarClient = () => {
    const router = useRouter();

    const { id } = zusUser();
    const searchParams = useSearchParams();

    const word = searchParams.get("t");

    const inputRef = useRef();

    const [articlesOrdered, setarticlesOrdered] = useState([]);

    const handleOnKeyDown = async (e) => {
        if (e.key !== "Enter") return;
        if (e.target.value == "") {
            setarticlesOrdered([]);
            return;
        } else searchArticlesOrdered(e.target.value);
        router.push(`/usuario/pedidos/buscar?t=${e.target.value}`);
    };

    async function searchArticlesOrdered(word) {
        const res = await useSearchArticlesOrderedUserByWord(id, word); // Assuming 1 is the user ID for testing
        setarticlesOrdered(res);
    }

    useEffect(() => {
        if (id.length == 0 || word.length == 0) return;
        searchArticlesOrdered(word);
    }, [id]);

    const clearInput = () => {
        inputRef.current.value = "";
        setarticlesOrdered([]);
        router.push(`/usuario/pedidos/buscar?t=`);
    };

    return (
        <div className="m-4">
            <p className="font-semibold text-2xl">Resultados de la busqueda</p>
            <Spacer space={5} />
            <div className="flex justify-between items-center border border-black rounded p-3">
                <div className="flex items-center w-4/5">
                    <Icon icon="material-symbols:search-rounded" width="24" height="24" />
                    <input className="w-full" placeholder="Buscar todos los pedidos" defaultValue={word} onKeyDown={handleOnKeyDown} ref={inputRef} />
                </div>
                <div className="w-1/5 flex justify-end items-center">
                    <Icon className="text-2xl" icon="material-symbols:close" onClick={clearInput} />
                </div>
            </div>
            <Spacer space={10} />

            {articlesOrdered.length === 0 ? (
                <div className="text-base">
                    <p className="font-bold">No se encontraron resultados, intenta con otra búsqueda</p>
                    <Spacer space={10} />
                    <p className="text-gray-500">Se puede buscar por titulo de producto, numero de pedido, direccion o destinatario.</p>
                </div>
            ) : (
                <>
                    <p className="text-gray-500">
                        {articlesOrdered.length} pedido que coincide con <span className="font-semibold text-black">{word}</span>
                    </p>
                    <Spacer space={5} />
                    <div className="flex flex-col gap-0">
                        {articlesOrdered.map((articleOrder, index) => (
                            <ArticleOrdered
                                key={articleOrder.id_cart}
                                idArticle={articleOrder.id}
                                img={articleOrder.main_image}
                                description={articleOrder.description}
                                created_at_cart={articleOrder.created_at_cart}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default BuscarClient;

const ArticleOrdered = ({ idArticle, img, description, created_at_cart }) => {
    const router = useRouter();

    return (
        <>
            <div className="flex gap-5 p-5" onClick={() => router.push(`/usuario/pedidos/${idArticle}`)}>
                <div className="w-1/5 h-auto grid place-items-center">
                    <ImageA className="w-full" src={img} />
                </div>
                <div className="w-4/5 flex justify-between items-center">
                    <div className="flex flex-col gap-1 items-baseline">
                        <p className="font-semibold text-base">{showText(description, 59)}</p>
                        <p className="font-light text-gray-500 text-sm">Pedido el {getDateInSpanish(created_at_cart)}</p>
                        <button className="bg-yellow-400 rounded-full py-2 px-3 text-sm">Comprar nuevamente</button>
                    </div>
                    <Icon icon="mingcute:right-line" className="text-5xl w-auto" />
                </div>
            </div>
            <Divider mt={0} mb={0} />
        </>
    );
};
