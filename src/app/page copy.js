"use client";

import { Icon } from "@iconify/react";

// Components
import Promociones from "./components/home/Promociones";
import FirtsArticles from "./components/home/FirtsArticles";
import ArticlesSection from "./components/home/ArticlesSection";
import SpecialArticle from "./components/app/articles/SpecialArticle";
import SpecialArticle2 from "./components/app/articles/SpecialArticle2";
import ArticlesSection2 from "./components/home/ArticlesSection2";
import SpecialCategory from "./components/app/categories/SpecialCategory";
import Category from "./components/app/categories/Category";
import Category2 from "./components/app/categories/Category2";
// import Category3 from "./components/app/categories/";
import Divider from "./components/home/Divider";
import MainArticlesContainter from "./components/app/articles/MainArticlesContainter";
import ArticlesTypeContainer1 from "./components/app/articles/ArticlesTypeContainer1";
import ArticlesTypeContainer2 from "./components/app/articles/ArticlesTypeContainer2";
import Departments from "./components/app/categories/Departments";
import { useRouter } from "next/navigation";
import useRequestsGeneralCategoriesGroups from "./hooks/request/categories/useRequestsGeneralCategoriesGroups";
import { useEffect } from "react";
import { getGeneralCategoriesGroupsForApp } from "./request/categories/requestsGeneralCategoriesGroups";
import { zusGeneralCategoriesGroups } from "./zustand/app/general-categories-groups/zusGeneralCategoriesGroups";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
    const { useGetGeneralCategoriesGroupsForApp } = useRequestsGeneralCategoriesGroups();

    const { generalCategoriesGroups, setGeneralCategoriesGroups } = zusGeneralCategoriesGroups();

    const { data } = useQuery({
        queryKey: ["genralCategoriesGroups", generalCategoriesGroups],
        queryFn: async () => {
            const { res, data } = await getGeneralCategoriesGroupsForApp();
            console.log(data);
            setGeneralCategoriesGroups(data.data, 1);
            return data.data;
        },
    });

    useEffect(() => {
        console.log(generalCategoriesGroups);
    }, [generalCategoriesGroups]);

    // useEffect(() => {
    //     useGetGeneralCategoriesGroupsForApp();
    // }, []);

    const router = useRouter();

    return (
        <div className="mb-96-">
            <div className="">
                <Promociones />
                <MainArticlesContainter />
                <Divider mt={0} />
                <ArticlesTypeContainer1 />
                <Divider />
                <SpecialArticle
                    imgBrand="https://static-data2.manualslib.com/brand/d8a/2912/samsung-logo.png"
                    imgArticle="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                    descriptionArticle="SAMSUNG Monitor de computadora curvo FHD 1800R..."
                    stars={4}
                    votes={56}
                    hasOffer={true}
                    nameOffer="oferta relampago"
                    discountOffer={40}
                    priceArticle={149}
                    priceWithOffer={89}
                    store=""
                />
                <Divider mb={0} />
                <SpecialArticle2
                    img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                    articleDescrition="TOYFID Cartera desplegable para hombres, A, negro., soporte delgado y..."
                    stars={4.4}
                    votes={1.985}
                    price={17}
                    brand=""
                    link=""
                />
                <Divider mt={0} />
                <ArticlesTypeContainer2 />
                <Divider />
                <SpecialCategory
                    text="Ofertas imprecindibles para todos"
                    img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                />
                <Divider />
                <Category
                    text="Regalos Populares para bebes"
                    img1="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                    // img2, img3, img4, img5, img6, img7, img8, img9
                />
                <Divider />
                <Category2 text="Luce como nunca antes esta temporada" />
                <Divider h={15} />
                <Departments text="Compra mas ofertas en regakis" />
                {/* <div className="mb-96"></div> */}
            </div>

            <div className="m-4 flex gap-3 justify-center">
                <button className="bg-red-700 text-white py-3 px-5 text-xl text rounded-xl" onClick={() => router.push("/admin")}>
                    admin
                </button>
                <button className="bg-red-700 text-white py-3 px-5 text-xl text rounded-xl">admin</button>
                <button className="bg-red-700 text-white py-3 px-5 text-xl text rounded-xl">admin</button>
            </div>
        </div>
    );
}
