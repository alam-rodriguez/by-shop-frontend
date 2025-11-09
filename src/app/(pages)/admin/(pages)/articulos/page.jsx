"use client";

import ItemDiv from "@/app/components/others/ItemDiv";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import { getDateInSpanish, isUUID, showText } from "@/app/hooks/app/app";
import { useGetArticles, useGetArticlesFromShop } from "@/app/hooks/request/articles/requestsArticles";
import useRequestsArticles from "@/app/hooks/request/articles/useRequestsArticles";
import { zusAdminArticles } from "@/app/zustand/admin/articles/zusAdminArticles";
import { zusUser } from "@/app/zustand/user/zusUser";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
    const { id_shop, name_shop, userTypeName, hasData } = zusUser();

    const router = useRouter();

    // const { useGetArticles } = useRequestsArticles();

    const { data: allArticles, isLoading: isLoadingAllArticles } = useGetArticles();

    useEffect(() => {
        console.log(allArticles);
    }, [allArticles]);

    const { data: articlesFromShop, isLoading: isLoadingArticlesFromShop } = useGetArticlesFromShop(id_shop);

    // useEffect(() => {
    //     console.log(id_shop);
    // }, [id_shop]);

    useEffect(() => {
        console.log(articlesFromShop);
    }, [articlesFromShop]);

    const { articles, setArticleSelected, setArticles } = zusAdminArticles();

    useEffect(() => {
        if (!hasData) return;
        const canSeeAllArticles = userTypeName == "DEV" || userTypeName == "SUPPORT";
        if (!allArticles || (!articlesFromShop && !canSeeAllArticles)) return;
        setArticles(isUUID(id_shop) ? articlesFromShop : allArticles, 1);
    }, [articlesFromShop, id_shop, allArticles, userTypeName]);

    // useEffect(() => {
    //     console.log(articles);
    // }, [articles]);

    const handleClickArticle = (idArticle = 0) => router.push(`/admin/articulos/${idArticle}`);

    if (isLoadingArticlesFromShop && !articlesFromShop && isLoadingAllArticles && !allArticles) return <LoadingParagraph text="Cargando articulos" />;
    return (
        <div className="m-4">
            <p className="text-center font-bold text-xl">Lista de articulos</p>
            {/* {data &&
                data.map((article) => (
                    <div key={article.id} className="bg-green-500" onClick={() => handleClickArticle(article.id)}>
                        <img src={article.main_image} />
                        <p>id: {article.id}</p>
                        <p>Nombre: {article.name}</p>
                        <p>descripcion: {article.description}</p>
                        <p>categoria directa: {article.id_direct_category}</p>
                        <p>Categoria indirecta: {article.id_indirect_category}</p>
                        <p>modelo: {article.id_model}</p>
                        <p>Metodo de pago: {article.id_payment_method}</p>
                        <p>tienda: {article.id_shop}</p>
                        <p>Precio: {article.price}</p>
                        <p>Cantidad: {article.quantity}</p>
                        <p>estado: {article.status}</p>
                        <p>Vista: {article.view}</p>
                        <p>Fecha creacacion: {article.created_date}</p>
                    </div>
                ))} */}
            <div className="flex flex-col gap-4">
                {articles.map((article) => (
                    <ItemDiv
                        key={article.id}
                        title={article.name}
                        data={[
                            { key: "descripcion", value: showText(article.description, 25) },
                            { key: "Precio", value: article.price },
                            { key: "Cantidad disponible", value: article.quantity },
                            { key: "estado", value: article.status == 1 ? "Activo" : "Inactivo" },
                            { key: "Fecha creacion", value: getDateInSpanish(article.created_date) },
                        ]}
                        img={article.main_image}
                        onClick={() => handleClickArticle(article.id)}
                    />
                ))}
            </div>

            {/* // <div key={article.id} className="bg-green-500" onClick={() => handleClickArticle(article.id)}>
                //     <img src={article.main_image} />
                //     <p>id: {article.id}</p>
                //     <p>Nombre: {article.name}</p>
                //     <p>descripcion: {article.description}</p>
                //     <p>categoria directa: {article.id_direct_category}</p>
                //     <p>Categoria indirecta: {article.id_indirect_category}</p>
                //     <p>modelo: {article.id_model}</p>
                //     <p>Metodo de pago: {article.id_payment_method}</p>
                //     <p>tienda: {article.id_shop}</p>
                //     <p>Precio: {article.price}</p>
                //     <p>Cantidad: {article.quantity}</p>
                //     <p>estado: {article.status}</p>
                //     <p>Vista: {article.view}</p>
                //     <p>Fecha creacacion: {article.created_date}</p>
                // </div> */}
            <button className="px-4 py-2 rounded bg-gray-200 fixed bottom-4 left-1/2 -translate-x-1/2" onClick={() => handleClickArticle()}>
                Crear Nuevo Articulo
            </button>
            {/* <button onClick={() => handleClickArticle()}>Crear articulo</button> */}
        </div>
    );
};

export default page;
