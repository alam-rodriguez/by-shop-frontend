"use client";

export const dynamic = "force-dynamic";

import React, { use, useEffect } from "react";

// Icons
import { Icon } from "@iconify/react";

// Components
import ArticlesType3 from "@/app/components/app/articles/ArticlesType3";
import Stars from "@/app/components/app/articles/Stars";
import Divider from "@/app/components/home/Divider";

import { useSearchParams } from "next/navigation";
import useRequestsArticles from "@/app/hooks/request/articles/useRequestsArticles";
import { useGetArticles2, useGetArticlesFromDirectCategory } from "@/app/hooks/request/articles/requestsArticles";
import ImageA from "@/app/components/others/ImageA";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import { showText } from "@/app/hooks/app/app";
import Link from "next/link";
import { useGetCategoryById } from "@/app/hooks/request/categories/requestsCategories";
import ArticleForCategory from "@/app/components/articles/ArticleForCategory";
import Skeleton from "@/app/components/skeleton/Skeleton";
import Spacer from "@/app/components/home/Spacer";
import Articles from "@/app/components/skeleton/Articles";

const Client = () => {
    const { useGetArticlesOfGroupCategory } = useRequestsArticles();

    const searchParams = useSearchParams();

    // Obtener un parámetro específico
    const categoryGroup = searchParams.get("grupo-categorias");
    const idCategoriaDirecta = searchParams.get("categoria-directa");
    const idCategoriaGeneral = searchParams.get("categoria-general");
    const homeCategoryId = searchParams.get("categoria-inicio");

    console.log(categoryGroup);

    const type = categoryGroup
        ? "category-group"
        : idCategoriaDirecta
        ? "direct-category"
        : idCategoriaGeneral
        ? "general-category"
        : homeCategoryId
        ? "home-category"
        : "";
    const id = categoryGroup
        ? categoryGroup
        : idCategoriaDirecta
        ? idCategoriaDirecta
        : idCategoriaGeneral
        ? idCategoriaGeneral
        : homeCategoryId
        ? homeCategoryId
        : "";

    // console.log(type);

    // useEffect(() => {
    //     console.log(idCategoriaDirecta);
    //     console.log(categoryGroup);
    // }, [categoryGroup, idCategoriaDirecta]);

    // const { data, isLoading } = useGetArticlesOfGroupCategory(categoryGroup);

    const { data, isLoading } = useGetArticles2(type, id);

    const { data: categoryData, isLoading: isLoadingCategory } = useGetCategoryById(id);

    useEffect(() => {
        console.log(data);
    }, [data]);

    // const { data: articlesFromDirectCategory, isLoading: isLoadingArticlesFromDirectCategory } = useGetArticlesFromDirectCategory(idCategoriaDirecta);

    // useEffect(() => {
    //     console.log(articlesFromDirectCategory);
    // }, [articlesFromDirectCategory]);

    if (isLoading) return <Articles />;
    return (
        <div className="m-4 flex justify-between flex-wrap gap-5">
            {!isLoadingCategory && (
                <p className="text-sm text-gray-600">
                    Explora nuestra selección de artículos de la categoría: <span className="font-bold text-black">{categoryData.name}</span>
                </p>
            )}

            {data.map((article) => (
                <ArticleForCategory
                    key={article.id}
                    id={article.id}
                    image={article.main_image}
                    price={article.price}
                    name={article.name}
                    articleCurrency={article.currency}
                />
            ))}
            {/* {data.map((article) => (
                <Link key={article.id} href={`/articulos/${article.id}`} className="h-72" style={{ width: "calc(50% - 10px)" }}>
                    <div className="h-4/5 relative">
                        <p className="bg-black py-2 px-3 text-white absolute top-0 left-0 m-3 rounded-lg text-xs">Best price</p>
                        <p className="bg-red-500 py-2 px-3 absolute top-0 right-0 m-3 rounded-lg text-xs">15%</p>
                        <ImageA className="h-full w-full object-cover rounded-2xl" src={article.main_image} />
                    </div>
                    <div className="h-1/5">
                        <div className="flex gap-2">
                            <p className="text-lg font-bold">${article.price.toString().split(".")[0]}.00</p>
                            <p className="text-lg font-bold line-through text-gray-500">$100.00</p>
                        </div>
                        <p className="text-gray-500">{showText(article.name, 18)}</p>
                    </div>
                </Link>
            ))} */}
            {/* <div className="h-72" style={{ width: "calc(50% - 10px)" }}>
                <div className="h-4/5 relative">
                    <p className="bg-black py-2 px-3 text-white absolute top-0 left-0 m-3 rounded-lg text-xs">Best price</p>
                    <p className="bg-red-500 py-2 px-3 absolute top-0 right-0 m-3 rounded-lg text-xs">15%</p>
                    <ImageA
                        className="h-full w-full object-cover rounded-2xl"
                        src="https://8cfbi9foz7.ufs.sh/f/0DUeKQjxChl7lBHUB6y7D4zVcm0fFoU6uJhKXLwTOIMGkjN3"
                    />
                </div>
                <div className="h-1/5">
                    <div className="flex gap-2">
                        <p className="text-lg font-bold">$82.00</p>
                        <p className="text-lg font-bold line-through text-gray-500">$100.00</p>
                    </div>
                    <p className="text-gray-500">Kombucha Brewer</p>
                </div>
            </div> */}
            {/* <div className="h-72" style={{ width: "calc(50% - 10px)" }}>
                <div className="h-4/5 relative">
                    <p className="bg-black py-2 px-3 text-white absolute top-0 left-0 m-3 rounded-lg text-xs">Best price</p>
                    <p className="bg-red-500 py-2 px-3 absolute top-0 right-0 m-3 rounded-lg text-xs">15%</p>
                    <ImageA
                        className="h-full w-full object-cover rounded-2xl"
                        src="https://8cfbi9foz7.ufs.sh/f/0DUeKQjxChl7lBHUB6y7D4zVcm0fFoU6uJhKXLwTOIMGkjN3"
                    />
                </div>
                <div className="h-1/5">
                    <div className="flex gap-2">
                        <p className="text-lg font-bold">$82.00</p>
                        <p className="text-lg font-bold line-through text-gray-500">$100.00</p>
                    </div>
                    <p className="text-gray-500">Kombucha Brewer</p>
                </div>
            </div> */}
            {/* <div className="h-72" style={{ width: "calc(50% - 10px)" }}>
                <div className="h-4/5 relative">
                    <p className="bg-black py-2 px-3 text-white absolute top-0 left-0 m-3 rounded-lg text-xs">Best price</p>
                    <p className="bg-red-500 py-2 px-3 absolute top-0 right-0 m-3 rounded-lg text-xs">15%</p>
                    <ImageA
                        className="h-full w-full object-cover rounded-2xl"
                        src="https://8cfbi9foz7.ufs.sh/f/0DUeKQjxChl7lBHUB6y7D4zVcm0fFoU6uJhKXLwTOIMGkjN3"
                    />
                </div>
                <div className="h-1/5">
                    <div className="flex gap-2">
                        <p className="text-lg font-bold">$82.00</p>
                        <p className="text-lg font-bold line-through text-gray-500">$100.00</p>
                    </div>
                    <p className="text-gray-500">Kombucha Brewer</p>
                </div>
            </div> */}
        </div>
    );

    if (isLoading || isLoadingArticlesFromDirectCategory) return <>Cargando</>;
    return (
        <>
            <div className="my-3 mx-4">
                <div className="border inline-block border-gray-400 py-2 px-6 rounded-2xl shadow-md">
                    <p className="text-blue-900 font-extrabold">Filtros</p>
                </div>
            </div>
            <Divider mt={0} />
            <div className="m-4">
                {/* <p>Consulta cada pagina del producto para ver otras opciones de compra. El precio y otros detalles pueden variar segun el tamano y el color del produtco.</p> */}
                <p className="text-xs">Consulta cada página del producto para ver otras opciones de compra.</p>
                <div className="flex flex-col gap-2">
                    {data?.map((article) => (
                        <ArticlesType3
                            key={article.id}
                            id={article.id}
                            img={article.main_image}
                            description={article.description}
                            stars={article.average_stars}
                            votes={article.total_reviews}
                            BoughtLastMonth={0}
                            hasOffer={false}
                            priceWithOffer={0}
                            price={article.price}
                            colors={article.colors ? article.colors.split(",") : []}
                            canAddToCart={article.quantity > 0 ? true : false}
                            averageStars={article.average_stars}
                            totalReviews={article.total_reviews}
                        />
                    ))}
                    {/* {articlesFromDirectCategory?.map((article) => (
                        <ArticlesType3
                            key={article.id}
                            id={article.id}
                            img={article.main_image}
                            description={article.description}
                            stars={4.1}
                            votes={251}
                            BoughtLastMonth={0}
                            hasOffer={false}
                            priceWithOffer={0}
                            price={article.price}
                            colors={article.colors ? article.colors.split(",") : []}
                            canAddToCart={article.quantity > 0 ? true : false}
                        />
                    ))} */}

                    {/* <ArticlesType3
                        id={1}
                        img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                        description="Moto G 5G | 2024 | Desbloqueado | hecho para US 4/128GB | Camarade ..."
                        stars={4.1}
                        votes={251}
                        BoughtLastMonth={100}
                        hasOffer={true}
                        priceWithOffer={109}
                        price={149}
                        colors=""
                    />
                    <ArticlesType3
                        id={2}
                        img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                        description="Moto G 5G | 2024 | Desbloqueado | hecho para US 4/128GB | Camarade ..."
                        stars={4.0}
                        votes={251}
                        BoughtLastMonth={100}
                        hasOffer={true}
                        priceWithOffer={109}
                        price={149}
                        colors=""
                    />
                    <ArticlesType3
                        id={3}
                        img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                        description="Moto G 5G | 2024 | Desbloqueado | hecho para US 4/128GB | Camarade ..."
                        stars={4.0}
                        votes={251}
                        BoughtLastMonth={100}
                        hasOffer={true}
                        priceWithOffer={109}
                        price={149}
                        colors=""
                    /> */}
                    {/* <div className="flex h-72">
                    <div className="w-2/5 bg-gray-500">
                        <img
                            className="w-full h-full object-contain"
                            src="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                            alt=""
                        />
                    </div>
                    <div className="w-3/5 p-3">
                        <div>
                            <p>Moto G 5G | 2024 | Desbloqueado | hecho para US 4/128GB | Camarade ...</p>
                            <div className="flex items-center gap-2">
                                <p>4.0</p>
                                <div className="flex">
                                    <Icon icon="material-symbols:star" className="text-orange-400" />
                                    <Icon icon="material-symbols:star" className="text-orange-400" />
                                    <Icon icon="material-symbols:star" className="text-orange-400" />
                                    <Icon icon="material-symbols:star" className="text-orange-400" />
                                    <Icon icon="material-symbols:star" className="text-orange-400" />
                                </div>
                                <p>(251)</p>
                            </div>
                        </div>
                        <p>100+ comprados el mes pasado</p>
                        <p>
                            <span>US$</span>
                            <span>109</span>
                            <span>99</span>
                            <span>PVPR</span>
                            <span>US$149.00</span>
                        </p>
                        <div>
                            <div>
                                <div className="w-3 h-3 bg-red-500"></div>
                                <div className="w-3 h-3 bg-red-500"></div>
                                <div className="w-3 h-3 bg-red-500"></div>
                            </div>
                        </div>
                        <button className="bg-yellow-400 p-3 rounded-3xl w-full">Agregar al carrito</button>
                    </div>
                </div> */}
                </div>
            </div>
            {/* <div className="m-4">
                <p>En tendencia</p>
                <div className="flex overflow-scroll gap-4">
                    <Article
                        id={4}
                        img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                        description="Moto G 5G | 2024 | Desbloqueado | hecho para US 4/128GB | Camarade ..."
                        stars={4.0}
                        votes={251}
                        BoughtLastMonth={100}
                        hasOffer={true}
                        priceWithOffer={109}
                        price={149}
                        colors=""
                    />
                    <Article
                        id={5}
                        img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                        description="Moto G 5G | 2024 | Desbloqueado | hecho para US 4/128GB | Camarade ..."
                        stars={4.0}
                        votes={251}
                        BoughtLastMonth={100}
                        hasOffer={true}
                        priceWithOffer={109}
                        price={149}
                        colors=""
                    />
                </div>
            </div> */}

            {/* <div className="m-4">
                <p>Consulta cada página del producto para ver otras opciones de compra.</p>
                <div className="flex flex-col gap-2">
                    <ArticlesType3
                        id={6}
                        img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                        description="Moto G 5G | 2024 | Desbloqueado | hecho para US 4/128GB | Camarade ..."
                        stars={4.1}
                        votes={251}
                        BoughtLastMonth={100}
                        hasOffer={true}
                        priceWithOffer={109}
                        price={149}
                        colors=""
                    />
                    <ArticlesType3
                        id={7}
                        img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                        description="Moto G 5G | 2024 | Desbloqueado | hecho para US 4/128GB | Camarade ..."
                        stars={4.0}
                        votes={251}
                        BoughtLastMonth={100}
                        hasOffer={true}
                        priceWithOffer={109}
                        price={149}
                        colors=""
                    />
                    <ArticlesType3
                        id={8}
                        img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                        description="Moto G 5G | 2024 | Desbloqueado | hecho para US 4/128GB | Camarade ..."
                        stars={4.0}
                        votes={251}
                        BoughtLastMonth={100}
                        hasOffer={true}
                        priceWithOffer={109}
                        price={149}
                        colors=""
                    />
                </div>
            </div> */}
        </>
    );
};

export default Client;

const Article = ({ id, img, description, stars, votes, BoughtLastMonth, hasOffer, priceWithOffer, price, colors }) => {
    return (
        <div className="flex flex-col h-96 border border-slate-100 rounded-lg overflow-hidden" style={{ minWidth: "240px", height: "500px" }}>
            <div className="w-full bg-gray-500- bg-slate-100 relative h-3/5">
                <img className="w-full h-full object-contain" src={img} alt="" />
                <div className="bg-white rounded-full p-2 absolute bottom-2 left-2 shadow-black shadow">
                    <Icon icon="tdesign:image-add" className="text-xl" />
                </div>
            </div>
            <div className="w-full p-3 relative h-2/5">
                <div>
                    <p>{description}</p>
                    <Stars totalPunctuation={2} reviews={1} />
                </div>
                <p>{BoughtLastMonth}+ comprados el mes pasado</p>
                <p>
                    <span>US$</span>
                    <span>{priceWithOffer}</span>
                    <span>99</span>
                    <span>PVPR</span>
                    <span>US${price}.00</span>
                </p>
                {/* <Colors colors={["bg-slate-700", "bg-blue-700", "bg-green-700", "bg-violet-700"]} /> */}
                {/* <div className="absolute bottom-0 left-0 w-full p-3">
                    <button className="bg-yellow-400 p-3 rounded-3xl w-full ">Agregar al carrito</button>
                </div> */}
            </div>
        </div>
    );
};
