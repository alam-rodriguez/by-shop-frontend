"use client";

import { useFinder } from "@/app/hooks/request/articles/requestsArticles";
import appSettings from "@/app/zustand/app/zusApp";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { useEffect } from "react";

const page = () => {
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
        if (seekerPhrase === "") return;

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

    if (isLoading) return <p>cargando...</p>;
    return (
        <div className="m-4 flex flex-col gap-3">
            {/* <Item2 text="iphone" link="" /> */}
            {articles.map((article) => {
                // console.log(article.name);
                return <Item key={article.id} text={article.name} link={`/articulos/${article.id}`} />;
            })}
            {/* <Item2 text="iphone 16 pro max case" link="" />
            <Item text="iphone 16 pro max case" link="" />
            <Item text="iphone 16 pro max case" link="" />
            <Item text="iphone 16 pro max case" link="" />
            <Item text="iphone 16 pro max case" link="" />
            <Item text="iphone 16 pro max case" link="" />
            <Item text="iphone 16 pro max case" link="" /> */}
        </div>
    );
};

const Item = ({ text, link }) => {
    return (
        <Link href={link}>
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

const Item2 = ({ text, link }) => {
    return (
        <div className="flex justify-between items-center border-b" style={{ padding: "2px 0" }}>
            <div className="flex items-center gap-2">
                <Icon icon="material-symbols:history" className="text-lg" />
                <p className="font-semibold text-blue-800">{text}</p>
            </div>
            <Icon icon="iconoir:cancel" className="text-xl" />
        </div>
    );
};

export default page;
