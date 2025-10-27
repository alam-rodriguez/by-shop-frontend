"use client";

import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import { isUUID } from "@/app/hooks/app/app";
import { useFinder } from "@/app/hooks/request/articles/requestsArticles";
import {
    useCreateSearchHistory,
    useGetSearchHistoryByIdUser,
    useUpdateStatusSearchHistory,
} from "@/app/hooks/request/search-history/requestsSearchHistory";
import appSettings from "@/app/zustand/app/zusApp";
import { zusUser } from "@/app/zustand/user/zusUser";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { useEffect } from "react";

const page = () => {
    const { id: idUser } = zusUser();

    const { seekerPhrase, setArticlesOfFinder, articlesOfFinder } = appSettings();

    const { data, isLoading, refetch } = useFinder(seekerPhrase);

    const articles = Array.isArray(data) ? data : data?.articles || [];

    // useEffect(() => {
    //     // const { data } = useFinder(seekerPhrase);
    //     // console.log(data);
    //     if (seekerPhrase == "") return;
    //     setTimeout(async () => {
    //         console.log(seekerPhrase);
    //         const articles = await useFinder(seekerPhrase);
    //         console.log(articles);
    //     }, 1000);
    // }, [seekerPhrase]);

    useEffect(() => {
        console.log(data);
    }, [data]);

    useEffect(() => {
        // if (seekerPhrase === "") return;

        const delayDebounce = setTimeout(async () => {
            // console.log(seekerPhrase);
            // const articles = await useFinder(seekerPhrase);
            refetch();
            // console.log(articles);
            // setArticlesOfFinder(articles);
        }, 500);

        return () => clearTimeout(delayDebounce); // 👈 Limpia el timeout anterior
    }, [seekerPhrase]);

    // useEffect(() => {
    // console.log(articlesOfFinder);
    // }, [articlesOfFinder]);

    useEffect(() => {
        console.log(articles.length);
    }, [articles]);

    const { data: userSearchHistory, isLoading: isLoadingUserSearchHistoty, refetch: refetchUserSearchHistory } = useGetSearchHistoryByIdUser(idUser);

    useEffect(() => {
        console.log(userSearchHistory);
    }, [userSearchHistory]);

    if (isLoading) return <LoadingParagraph />;

    return (
        <div className="m-4 flex flex-col gap-3">
            {articles.length == 0 && seekerPhrase.length == 0 && userSearchHistory && userSearchHistory.length == 0 && (
                <p className="text-sm font-bold">Aún no has buscado nada, ¡prueba escribiendo algo arriba!</p>
            )}
            {articles.length == 0 &&
                seekerPhrase.length === 0 &&
                userSearchHistory &&
                userSearchHistory.map((articleOnHistory) => (
                    <Item2
                        key={articleOnHistory.id}
                        id={articleOnHistory.id}
                        text={articleOnHistory.name_article}
                        idArticle={articleOnHistory.id_article}
                        link={`/articulos/${articleOnHistory.id_article}`}
                        refetchUserSearchHistory={refetchUserSearchHistory}
                    />
                ))}

            {articles.length == 0 && seekerPhrase.length > 0 && <p className="text-sm font-bold">No encontramos lo que estás buscando</p>}
            {articles.map((article) => (
                <Item key={article.id} text={article.name} link={`/articulos/${article.id}`} idArticle={article.id} />
            ))}
        </div>
    );
};

const Item = ({ text, link, idArticle }) => {
    const { seekerPhrase } = appSettings();

    const { id } = zusUser();

    const handleClick = async () => {
        if (!isUUID(id)) return;
        await useCreateSearchHistory(id, idArticle, seekerPhrase);
    };

    return (
        <Link href={link} onClick={handleClick} replace>
            <div className="flex justify-between items-center border-b" style={{ padding: "2px 0" }}>
                <div className="flex items-center gap-2">
                    <Icon icon="si:search-line" />
                    <p className="font-semibold">{text}</p>
                </div>
                <Icon icon="ep:top-left" className="text-gray-500" />
            </div>
        </Link>
    );
};

const Item2 = ({ id, text, link, idArticle, refetchUserSearchHistory }) => {
    const handleClickDelete = async () => {
        const res = await useUpdateStatusSearchHistory(id, 0);
        refetchUserSearchHistory();
    };

    const { id: idUser } = zusUser();

    const handleClick = async () => {
        if (!isUUID(idUser)) return;
        await useCreateSearchHistory(idUser, idArticle, "");
    };

    return (
        <div className="flex justify-between items-center border-b" style={{ padding: "2px 0" }}>
            <Link className="flex items-center gap-2" href={link} replace onClick={handleClick}>
                <Icon icon="material-symbols:history" className="text-lg" />
                <p className="font-semibold text-blue-800">{text}</p>
            </Link>
            <Icon icon="iconoir:cancel" className="text-xl" onClick={handleClickDelete} />
        </div>
    );
};

export default page;
