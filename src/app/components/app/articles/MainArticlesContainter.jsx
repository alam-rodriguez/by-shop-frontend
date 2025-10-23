"use client";
import React, { use, useEffect } from "react";

// zustand
import { zusArticles } from "@/app/zustand/articles/zusArticles";

// Articles
import MainArticles from "./MainArticles";

const MainArticlesContainter = ({ directsCategories }) => {
    const { articles } = zusArticles();

    useEffect(() => {
        console.log(articles);
    }, []);

    useEffect(() => {
        console.log(directsCategories);
    }, [directsCategories]);

    return (
        <div className="flex gap-3 overflow-x-scroll mx-3 relative bottom-7">
            {directsCategories.slice(0, 6).map((category) => (
                <MainArticles
                    key={category.id}
                    id={category.id}
                    text={category.description}
                    img={category.image}
                    link={`/articulos?categoria-directa=${category.id}`}
                />
            ))}
            {/* {articles.slice(0, 6).map((article) => (
                <MainArticles key={article.id} id={article.id} text={article.description} img={article.mainImage} link={`/articulos/${article.id}`} />
            ))} */}
            {/* <MainArticles
                text="seguir comprado autos y adutos seguir comprado autos y adutos seguir comprado autos y adutos seguir comprado autos y adutos"
                img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                link="/"
            />
            <MainArticles
                text="seguir comprado autos y adutos seguir comprado autos y adutos seguir comprado autos y adutos seguir comprado autos y adutos"
                img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                link="/"
            />
            <MainArticles
                text="seguir comprado autos y adutos seguir comprado autos y adutos seguir comprado autos y adutos seguir comprado autos y adutos"
                img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                link="/"
            />
            <MainArticles
                text="seguir comprado autos y adutos seguir comprado autos y adutos seguir comprado autos y adutos seguir comprado autos y adutos"
                img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                link="/"
            />
            <MainArticles
                text="seguir comprado autos y adutos seguir comprado autos y adutos seguir comprado autos y adutos seguir comprado autos y adutos"
                img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                link="/"
            /> */}
        </div>
    );
};

export default MainArticlesContainter;
