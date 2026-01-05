"use client";

// React
import React, { useEffect } from "react";

// Next
import { useRouter } from "next/navigation";

// Icons
import { Icon } from "@iconify/react";
import ImageA from "./components/others/ImageA";
import Spacer from "./components/home/Spacer";

// Hooks
import {
    useGetDirectsCategoriesForApp,
    useGetGeneralCategoriesArticles,
    useGetGeneralCategoriesGroupAndCategories,
    useGetIndirectsCategories,
    useGetIndirectsCategoriesForHome,
} from "./hooks/request/categories/requestsCategories";

// Components
import LoadingParagraph from "./components/others/LoadingParagraph";
import { isUUID, showPriceWithCurrencyUser, showText } from "./hooks/app/app";
import Departments from "./components/app/categories/Departments";
import { useGetDepartmentsForApp } from "./hooks/request/categories/requestsDepartments";

// Global State
import { zusUser } from "./zustand/user/zusUser";
import Link from "next/link";
import Divider from "./components/home/Divider";
import { useGetAdvertisementsForApp } from "./hooks/request/advertisements/RequestsAdvertisements";
import HomeAdvertisements from "./components/advertisements/HomeAdvertisements";
import { useGetHomeCategoriesForApp } from "./hooks/request/categories/requestsHomeCategories";
import Skeleton from "./components/skeleton/Skeleton";
import Home from "./components/skeleton/Home";
import ButtonForAdmins from "./components/home/ButtonForAdmins";

const page = () => {
    const router = useRouter();

    const { type, currencySelected: currencyUser, userTypeName, shop_id: shopId } = zusUser();

    const { data: directsCategories, isLoading: isLoadingDirects } = useGetDirectsCategoriesForApp();

    const { data: indirectsCategories, isLoading: isLoadingIndirects } = useGetIndirectsCategoriesForHome();

    useEffect(() => {
        console.log(indirectsCategories);
    }, [indirectsCategories]);

    // const { data: generalCategoriesGroupAndCategories, isLoading: isLoadingGeneralCategoriesGroupAndCategories } =
    //     useGetGeneralCategoriesGroupAndCategories();

    const { data: articlesFromGeneralCategories, isLoading: isLoadingArticlesFromGeneralCategories } = useGetGeneralCategoriesArticles();

    const { data: departments, isLoading: isLoadingDepartments } = useGetDepartmentsForApp();

    useEffect(() => {
        console.log(articlesFromGeneralCategories);
    }, [articlesFromGeneralCategories]);

    const { data: advertisements, isLoading: isLoadingAdvertisements } = useGetAdvertisementsForApp();

    const { data: homeCategories, isLoading: isLoadingHomeCategories } = useGetHomeCategoriesForApp();

    const handleClickSeAllHomeCategory = (homeCatergoryId) => router.push(`/articulos?categoria-inicio=${homeCatergoryId}`);

    return <Home />;

    if (
        isLoadingDirects ||
        isLoadingArticlesFromGeneralCategories ||
        isLoadingDepartments ||
        isLoadingIndirects ||
        isLoadingAdvertisements ||
        isLoadingHomeCategories ||
        !currencyUser
    )
        return <Home />;

    return (
        <div className="font-sans mb-24-">
            <div className="m-4">
                <HomeAdvertisements />

                {/* <div className="w-full h-44 rounded-2xl overflow-hidden relative">
                    <ImageA
                        className="w-full h-full object-cover absolute z-10"
                        src="https://8cfbi9foz7.ufs.sh/f/0DUeKQjxChl7lBHUB6y7D4zVcm0fFoU6uJhKXLwTOIMGkjN3"
                    />
                    <div className="z-20 relative bg-gradient-to-r from-[rgba(0,0,0,0.7)] to-transparent text-white h-full w-full flex flex-col justify-between p-4">
                        <p className="font-semibold text-xl">TAMAS LIVING</p>
                        <p className="text-sm w-3/5 font-thin">Easily book your chair anytime, enywher. Quik, simple and hassle-free reservations.</p>
                        <div className="bg-white flex justify-center gap-2 w-fit text-black rounded-full py-1 px-3">
                            <p className="">Show New</p>
                            <Icon icon="ep:right" className="size-6" />
                        </div>
                    </div>
                </div> */}
                <Spacer />
                <div className="flex gap-3 overflow-scroll no-scrollbar flex-nowrap">
                    {/* {directsCategories.map((directCategory) => (
                        <div
                            key={directCategory.id}
                            className="min-w-max h-14 flex items-center rounded-lg overflow-hidden shadow-lg bg-white py-1 px-3 gap-2 flex-shrink-0"
                            onClick={() => router.push(`/articulos?categoria-directa=${directCategory.id}`)}
                        >
                            <div className="size-8 grid place-items-center rounded-full bg-white overflow-hidden">
                                <ImageA className="w-full h-full object-cover" src={directCategory.image} />
                            </div>
                            <p className="">{directCategory.name}</p>
                        </div>
                    ))} */}
                    {directsCategories.map((directCategory) => (
                        <div
                            key={directCategory.id}
                            className="min-w-max h-10 flex items-center rounded-lg overflow-hidden shadow-lg bg-white py-1 px-3 gap-2 flex-shrink-0"
                            onClick={() => router.push(`/articulos?categoria-directa=${directCategory.id}`)}
                        >
                            <div className="size-6 grid place-items-center rounded-full bg-white overflow-hidden">
                                <ImageA className="w-full h-full object-cover" src={directCategory.image} />
                            </div>
                            <p className="text-xs">{directCategory.name}</p>
                        </div>
                    ))}
                    {/* <div className="min-w-max h-14 flex items-center rounded-lg overflow-hidden shadow-lg bg-white py-1 px-3 gap-2 flex-shrink-0">
                        <div className="size-8 grid place-items-center rounded-full bg-white overflow-hidden">
                            <ImageA
                                className="w-full h-full object-cover"
                                src="https://8cfbi9foz7.ufs.sh/f/0DUeKQjxChl7lBHUB6y7D4zVcm0fFoU6uJhKXLwTOIMGkjN3"
                            />
                        </div>
                        <p className="">Phones</p>
                    </div> */}
                </div>
                <Spacer />
                {/* {articlesFromGeneralCategories.map((articlesFronGeneralCategory) => (
                    <div key={articlesFronGeneralCategory.id_categoria_general}>
                        <div className="flex justify-between">
                            <p className="font-bold text-2xl">{articlesFronGeneralCategory.nombre_categoria_general}</p>
                            <p className="text-red-700">See All</p>
                        </div>
                        <Spacer space={10} />

                        <div className="flex justify-between flex-wrap gap-3">
                            {articlesFronGeneralCategory.articles.map((article) => (
                                <div key={article.id} className="bg-white rounded-xl overflow-hidden h-72" style={{ width: "calc(50% - 10px)" }}>
                                    <div className="" style={{ height: "70%" }}>
                                        <ImageA className="w-full h-full object-cover" src={article.main_image} />
                                    </div>
                                    <div className="h-2/6 p-2" style={{ height: "30%" }}>
                                        <p className="font-bold">{showText(article.description, 18)}</p>
                                        <Spacer space={5} />
                                        <div className="flex justify-between items-center">
                                            <p className="font-bold text-red-700 text-lg">${article.price.toString().split(".")[0]}</p>
                                            <div className="bg-red-700 text-white py-2 px-3 rounded-full">
                                                <p className="text-sm">Add to Cart</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))} */}
                {/* {indirectsCategories.map((indirectCategory) => (
                    <div key={indirectCategory.id}>
                        <div className="flex justify-between">
                            <p className="font-bold text-2xl">{indirectCategory.name}</p>
                            <p className="text-red-700">See All</p>
                        </div>
                        <Spacer space={10} />

                        <div className="flex justify-between flex-wrap gap-3">
                            {indirectCategory.articles.map((article) => (
                                <Link
                                    key={article.id}
                                    className="bg-white rounded-xl overflow-hidden h-72"
                                    style={{ width: "calc(50% - 10px)" }}
                                    href={`/articulos/${article.id}`}
                                >
                                    <div className="" style={{ height: "70%" }}>
                                        <ImageA className="w-full h-full object-cover" src={article.main_image} />
                                    </div>
                                    <div className="h-2/6 p-2" style={{ height: "30%" }}>
                                        <p className="font-bold">{showText(article.description, 17)}</p>
                                        <Spacer space={5} />
                                        <div className="flex justify-between items-center">
                                            <p className="font-bold text-red-700 text-lg">${article.price.toString().split(".")[0]}</p>
                                            <div className="bg-red-700 text-white py-2 px-3 rounded-full">
                                                <p className="text-sm">Add to Cart</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))} */}

                <div className="flex flex-col gap-8">
                    {homeCategories.map((category) => (
                        <div key={category.id}>
                            <div className="flex justify-between items-end">
                                <p className="font-bold text-lg">{category.name}</p>
                                <p className="text-red-700 text-xs" onClick={() => handleClickSeAllHomeCategory(category.id)}>
                                    Ver Todos
                                </p>
                            </div>
                            <Spacer space={10} />
                            <div className="flex justify-between flex-wrap gap-3">
                                {category.articles.map((article) => (
                                    <Link
                                        key={article.id}
                                        className="bg-white rounded-xl overflow-hidden h-72"
                                        style={{ width: "calc(50% - 10px)" }}
                                        href={`/articulos/${article.id}`}
                                    >
                                        <div className="" style={{ height: "70%" }}>
                                            <ImageA className="w-full h-full object-cover" src={article.main_image} />
                                        </div>
                                        <div className="h-2/6 p-2" style={{ height: "30%" }}>
                                            <p className="font-bold text-xs line-clamp-2">{article.description}</p>
                                            <Spacer space={5} />
                                            <div className="flex justify-between items-center">
                                                {/* <p className="font-bold text-red-700">${article.price.toString().split(".")[0]}</p> */}
                                                <p className="font-bold text-red-700">
                                                    $
                                                    {
                                                        showPriceWithCurrencyUser(article.price, article.currency, currencyUser, true, {
                                                            style: null,
                                                        })
                                                            .toString()
                                                            .split(".")[0]
                                                    }
                                                </p>

                                                <div className="bg-red-700 text-white py-2 px-3 rounded-full text-xs">
                                                    <p className="text-xs">Add to Cart</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* {indirectsCategories.map((indirectCategory) => (
                    <div key={indirectCategory.id}>
                        <div className="flex justify-between items-center">
                            <p className="font-bold text-lg">{indirectCategory.name}</p>
                            <p className="text-red-700 text-xs">See All</p>
                        </div>
                        <Spacer space={10} />
                        <div className="flex justify-between flex-wrap gap-3">
                            {indirectCategory.articles.map((article) => (
                                <Link
                                    key={article.id}
                                    className="bg-white rounded-xl overflow-hidden h-72"
                                    style={{ width: "calc(50% - 10px)" }}
                                    href={`/articulos/${article.id}`}
                                >
                                    <div className="" style={{ height: "70%" }}>
                                        <ImageA className="w-full h-full object-cover" src={article.main_image} />
                                    </div>
                                    <div className="h-2/6 p-2" style={{ height: "30%" }}>
                                        <p className="font-bold text-xs">{showText(article.description, 39)}</p>
                                        <Spacer space={5} />
                                        <div className="flex justify-between items-center">
                                            <p className="font-bold text-red-700">${article.price.toString().split(".")[0]}</p>
                                            <div className="bg-red-700 text-white py-2 px-3 rounded-full text-xs">
                                                <p className="text-xs">Add to Cart</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))} */}

                {/* <div>
                    <div className="flex justify-between">
                        <p className="font-bold text-2xl">Recommended for you</p>
                        <p className="text-red-700">See All</p>
                    </div>
                    <Spacer space={10} />

                    <div className="flex justify-between flex-wrap gap-3">
                        <div className="bg-white rounded-xl overflow-hidden h-72" style={{ width: "calc(50% - 10px)" }}>
                            <div className="" style={{ height: "70%" }}>
                                <ImageA
                                    className="w-full h-full object-cover"
                                    src="https://8cfbi9foz7.ufs.sh/f/0DUeKQjxChl7lBHUB6y7D4zVcm0fFoU6uJhKXLwTOIMGkjN3"
                                />
                            </div>
                            <div className="h-2/6 p-2" style={{ height: "30%" }}>
                                <p className="font-bold">Iphone 15 pro Max</p>
                                <Spacer space={5} />
                                <div className="flex justify-between items-center">
                                    <p className="font-bold text-red-700 text-lg">$94</p>
                                    <div className="bg-red-700 text-white py-2 px-3 rounded-full">
                                        <p className="text-sm">Add to Cart</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl overflow-hidden h-72" style={{ width: "calc(50% - 10px)" }}>
                            <div className="" style={{ height: "70%" }}>
                                <ImageA
                                    className="w-full h-full object-cover"
                                    src="https://8cfbi9foz7.ufs.sh/f/0DUeKQjxChl7lBHUB6y7D4zVcm0fFoU6uJhKXLwTOIMGkjN3"
                                />
                            </div>
                            <div className="h-2/6 p-2" style={{ height: "30%" }}>
                                <p className="font-bold">Iphone 15 pro Max</p>
                                <Spacer space={5} />
                                <div className="flex justify-between items-center">
                                    <p className="font-bold text-red-700 text-lg">$94</p>
                                    <div className="bg-red-700 text-white py-2 px-3 rounded-full">
                                        <p className="text-sm">Add to Cart</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl overflow-hidden h-72" style={{ width: "calc(50% - 10px)" }}>
                            <div className="" style={{ height: "70%" }}>
                                <ImageA
                                    className="w-full h-full object-cover"
                                    src="https://8cfbi9foz7.ufs.sh/f/0DUeKQjxChl7lBHUB6y7D4zVcm0fFoU6uJhKXLwTOIMGkjN3"
                                />
                            </div>
                            <div className="h-2/6 p-2" style={{ height: "30%" }}>
                                <p className="font-bold">Iphone 15 pro Max</p>
                                <Spacer space={5} />
                                <div className="flex justify-between items-center">
                                    <p className="font-bold text-red-700 text-lg">$94</p>
                                    <div className="bg-red-700 text-white py-2 px-3 rounded-full">
                                        <p className="text-sm">Add to Cart</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl overflow-hidden h-72" style={{ width: "calc(50% - 10px)" }}>
                            <div className="" style={{ height: "70%" }}>
                                <ImageA
                                    className="w-full h-full object-cover"
                                    src="https://8cfbi9foz7.ufs.sh/f/0DUeKQjxChl7lBHUB6y7D4zVcm0fFoU6uJhKXLwTOIMGkjN3"
                                />
                            </div>
                            <div className="h-2/6 p-2" style={{ height: "30%" }}>
                                <p className="font-bold">Iphone 15 pro Max</p>
                                <Spacer space={5} />
                                <div className="flex justify-between items-center">
                                    <p className="font-bold text-red-700 text-lg">$94</p>
                                    <div className="bg-red-700 text-white py-2 px-3 rounded-full">
                                        <p className="text-sm">Add to Cart</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
            <Departments departments={departments} text="Explorar departamentos" />
            <div className="m-4 flex gap-3 justify-center">
                {/* <button className="bg-red-700 text-white py-3 px-5 text-xl text rounded-xl" onClick={() => router.push("/admin/dev")}>
                    admin dev
                </button> */}
                {/* {(type == 2 || type == 3) && (
                    <button className="bg-red-700 text-white py-3 px-5 text-xl text rounded-xl" onClick={() => router.push("/admin")}>
                        Configuracion tienda
                    </button>
                )} */}
                {/* {(type == 4 || type == 5) && (
                    <button className="bg-red-700 text-white py-3 px-5 text-xl text rounded-xl" onClick={() => router.push("/admin/support")}>
                        admin support
                    </button>
                )}

                {type == 5 && (
                    <button className="bg-red-700 text-white py-3 px-5 text-xl text rounded-xl" onClick={() => router.push("/admin/dev")}>
                        admin dev
                    </button>
                )} */}
                {/* {(userTypeName == "ADMIN-SHOP" || userTypeName == "SUB-ADMIN-SHOP") && !isUUID(id_shop) && (
                    <button className="bg-red-700 text-white py-3 px-5 text-xl text rounded-xl" onClick={() => router.push("/admin/tiendas/0")}>
                        Registrar tienda
                    </button>
                )} */}
                <ButtonForAdmins />
                {/* <button className="bg-red-700 text-white py-3 px-5 text-xl text rounded-xl">admin</button> */}
                {/* <button className="bg-red-700 text-white py-3 px-5 text-xl text rounded-xl">admin</button> */}
            </div>
        </div>
    );
};

export default page;
