"use client";

import React, { use, useEffect, useState } from "react";

// zustand
import { zusArticles } from "@/app/zustand/articles/zusArticles";

// hooks
import useCarruselIMages from "@/app/hooks/products/carrusel-images/useCarruselIMages";

// Components
import Stars from "@/app/components/app/articles/Stars";
import ProductsImagesCarrusel from "./ProductsImagesCarrusel";
import Divider from "@/app/components/home/Divider";
import ProductPrice from "./ProductPrice";
import Note from "./Note";
import ProductsBoughtTogether from "./ProductsBoughtTogether";
import InterestingProducts from "./InterestingProducts";
import ProductDetails from "./ProductDetails";
import ProductDescription from "./ProductDescription";
import GaleryProduct from "./GaleryProduct";
import BoxContain from "./BoxContain";
import FeaturedReviews from "./FeaturedReviews";
import HowWorksReviews from "./HowWorksReviews";
import useApp from "@/app/hooks/app/useApp";
import ProductOptions from "./ProductOptions";
import {
    useArticleIsInList,
    useCreateUserArticleView,
    useGetArticle,
    useGetArticleOffer,
    useGetArticleOptions,
    useGetArticlesCanBeInterested,
    useGetArticlesFromGeneralCategoryWithoutArticle,
    useGetArticlesSimilar,
} from "@/app/hooks/request/articles/requestsArticles";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
    useAddArticleToList,
    useCreateCartItem,
    useCreateCartItemOption,
    useUpdateArticleInListStatus,
} from "@/app/hooks/request/carts/requestsCarts";
import { zusUser } from "@/app/zustand/user/zusUser";
import { useGetArticleReviews } from "@/app/hooks/request/articles/requestsArticlesReviews";
import { toast } from "sonner";
import Spacer from "@/app/components/home/Spacer";
import SimilarProducts from "./SimilarProducts";
import ImageA from "@/app/components/others/ImageA";
import { Icon } from "@iconify/react";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import SimilarArticle from "@/app/components/articles/SimilarArticle";
import Skeleton from "@/app/components/skeleton/Skeleton";
import Article from "@/app/components/skeleton/Article";
import { showPriceWithCurrencyUser } from "@/app/hooks/app/app";

const page = ({ params }) => {
    const { articulo: id } = useParams();

    const { id: id_user, currencySelected: currencyUser, userTypeName, id_shop } = zusUser();

    const { showPrice, showText } = useApp();

    useEffect(() => {
        console.log(id);
    }, [id]);

    // useEffect(() => {
    //     console.log(id);
    // }, [id]);

    // useEffect(() => {
    //     console.log(params);
    // }, [params]);

    const searchParams = useSearchParams();

    // Obtener un parámetro específico
    // const id = searchParams.get("id");
    // const { id } = useParams();
    const router = useRouter();
    // const { id } = router.query;

    const [idArticulo, setIdArticulo] = useState(null);

    useEffect(() => {
        // console.log(id);
        console.log(router);
    }, [router]);

    const { isLoading, data } = useGetArticle(id);

    useEffect(() => {
        console.warn(data);
    }, [data]);

    const { data: offerArticle, isLoading: isLoadingOfferArticle } = useGetArticleOffer(id);

    useEffect(() => {
        setArticleSelected(data ? data : {});
    }, [offerArticle]);

    // const [priceArticleWithOffer, setpriceArticleWithOffer] = useState(0);

    // TODO: EL PRECIO DEBE DE TENER OFERTA Y EL PRODUCTO TIENE

    // useEffect(() => {
    //     console.error(offerArticle);
    //     if(isLoadingOfferArticle && isLoading) return;
    //     setpriceArticleWithOffer();
    // }, [offerArticle, data]);

    const { isLoading: isLoadingOptions, data: dataOptions } = useGetArticleOptions(id);

    useEffect(() => {
        console.log(dataOptions);
    }, [dataOptions]);

    const { getParamValue } = useApp();

    const { articleSelected, setArticleSelected, resetArticleSeleceted } = zusArticles();
    const { optionsSelected, quantity, setQuantity, setOptionsSelected } = zusArticles();
    const { price, setPrice, priceWithoutOffer } = zusArticles();
    const { offer, setOffer, hasOffer } = zusArticles();

    useEffect(() => {
        return () => {
            resetArticleSeleceted();
        };
    }, []);

    const { imageInView, carruselRef } = useCarruselIMages();

    // const { idg } = getParamValue(params, "articulo");

    useEffect(() => {
        setArticleSelected(data ? data : {});
    }, [data]);

    useEffect(() => {
        setOffer(offerArticle ? offerArticle : {});
    }, [offerArticle]);

    useEffect(() => {
        console.log(optionsSelected);
        setPrice();
    }, [articleSelected, optionsSelected, quantity, offerArticle]);

    // useEffect(() => {
    //     setPrice(data?.price);
    // }, [optionsSelected, quantity]);

    useEffect(() => {
        getParamValue(params, "articulo").then((data) => {
            setIdArticulo(data);
            // setArticleSelected("123458867");
        });
    }, []);

    useEffect(() => {
        console.log(articleSelected);
    }, [articleSelected]);

    // const [colorSelected, setColorSelected] = useState(1);

    // const carruselRef = useRef();

    const createUserArticleViewFn = async () => {
        console.log("hola");
        const res = await useCreateUserArticleView(id_user, data.id, data.id_direct_category);
        console.log(res);
    };

    useEffect(() => {
        if (!data) return;
        createUserArticleViewFn();
    }, [data]);

    // CREATE TABLE users_articles_views(
    //     id CHAR(36) NOT NULL PRIMARY KEY,
    //     id_user CHAR(36) NOT NULL,
    //     id_article CHAR(36) NOT NULL,
    //     id_article_direct_category CHAR(36) NOT NULL,
    //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    // );

    const { data: articlesIsInList, refetch: refetchArticlesIsInList } = useArticleIsInList(id_user, data?.id);

    useEffect(() => {
        console.log(articlesIsInList);
    }, [articlesIsInList]);

    const { data: articleReviews, isLoading: isLoadingArticleReviews } = useGetArticleReviews(id);

    useEffect(() => {
        console.log(articleReviews);
    }, [articleReviews]);

    const { data: articlesCanBeInterested, isLoading: isLoadingArticlesCanBeInterested } = useGetArticlesCanBeInterested(id);

    useEffect(() => {
        console.warn(articlesCanBeInterested);
    }, [articlesCanBeInterested]);

    const { data: articlesSimilar, isLoading: isLoadingArticlesSimilar } = useGetArticlesSimilar(id);

    useEffect(() => {
        console.warn(articlesSimilar);
    }, [articlesSimilar]);

    const { isLoading: articleOptionsLoading, data: articleOptions } = useGetArticleOptions(id);

    useEffect(() => {
        // console.log("--------------");

        // console.log(articleOptions);
        if (articleOptions) {
            // console.log(articleOptions);
            const options = {};
            articleOptions.forEach((option) => {
                const key = option.id_option;
                if (!options[key]) options[key] = [];
                options[key].push(option);
            });
            const optionsArray = [];
            Object.keys(options).forEach((key) => {
                optionsArray.push(options[key]);
            });
            // console.error(optionsArray);
            setOptions(optionsArray);
            // console.log(options);
        }
    }, [articleOptions]);

    const [options, setOptions] = useState([]);

    useEffect(() => {
        console.log(optionsSelected);
    }, [optionsSelected]);

    // useEffect(() => {
    //     console.log("--------------");
    //     // console.error(options);
    // }, [options]);

    // useEffect(() => {
    //     console.log(imageInView);
    // }, [imageInView]);

    // const [imageInView, setImageInView] = useState(1);

    // useEffect(() => {
    //     // console.log(images);
    //     console.log(carruselRef.current);
    //     const container = carruselRef.current;
    //     console.error(carruselRef.current);
    //     if (!container) return;
    //     const handleScroll = () => {
    //         const containerRect = container.getBoundingClientRect();
    //         Array.from(container.children).forEach((item, i) => {
    //             const rect = item.getBoundingClientRect();
    //             if (rect.left >= containerRect.left && rect.right <= containerRect.right) setImageInView(i + 1);
    //         });
    //     };
    //     container.addEventListener("scroll", handleScroll);
    //     return () => {
    //         container.removeEventListener("scroll", handleScroll);
    //     };
    // }, []);
    // useEffect(() => {
    //     const container = carruselRef.current;
    //     if (!container) return;

    //     const handleScroll = () => {
    //         const containerRect = container.getBoundingClientRect();
    //         const containerCenter = containerRect.left + containerRect.width / 2;

    //         let closestIndex = 0;
    //         let closestDistance = Infinity;

    //         Array.from(container.children).forEach((item, i) => {
    //             const rect = item.getBoundingClientRect();
    //             const itemCenter = rect.left + rect.width / 2;
    //             const distance = Math.abs(containerCenter - itemCenter);

    //             if (distance < closestDistance) {
    //                 closestDistance = distance;
    //                 closestIndex = i;
    //             }
    //         });

    //         setImageInView(closestIndex + 1); // +1 si quieres usar base 1
    //     };

    //     handleScroll(); // Llamar al inicio para detectar la primera imagen
    //     container.addEventListener("scroll", handleScroll);

    //     return () => {
    //         container.removeEventListener("scroll", handleScroll);
    //     };
    // }, []);

    // useEffect(() => {
    //     console.log(imageInView);
    // }, [imageInView]);

    // CREATE TABLE carts(
    //     id char(36) NOT NULL PRIMARY KEY,
    //     id_article char(36) NOT NULL,
    //     id_user char(36) NOT NULL,
    //     status TINYINT NOT NULL,
    //     quantity INT UNSIGNED NOT NULL,
    //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    // );

    // CREATE TABLE cart_item_options(
    //     id char(36) NOT NULL PRIMARY KEY,
    //     id_article char(36) NOT NULL,
    //     id_user char(36) NOT NULL,
    //     id_cart char(36) NOT NULL,
    //     status TINYINT NOT NULL,
    //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    // );

    const handleClickAddToCart = async () => {
        const loadingToast = toast.loading("Agregando articulo...");

        console.log(data);

        if (Number(data.quantity) == 0) {
            toast.warning("Este producto no esta disponible actualmente", {
                id: loadingToast,
            });
            return;
        }

        if (id_user == "") {
            toast.warning("Debes iniciar session para agregar este articulo al carrito", {
                id: loadingToast,
            });
            return;
        }

        const res = await useCreateCartItem(data.id, quantity, id_user);
        console.log(res);
        const resOPtions = await useCreateCartItemOption(res, optionsSelected, id_user);
        console.log(resOPtions);
        // if (resOPtions) alert("Agregado a carrito");
        if (res.id && resOPtions)
            toast.success("Articulo agregado al carrito", {
                id: loadingToast,
            });
        else
            toast.error("Error al agregar al carrito", {
                id: loadingToast,
            });
    };

    const canBuyOneMore = (fn, wantAdd = false) => {
        if (wantAdd) {
            if (quantity + 1 > articleSelected.quantity) {
                toast.warning("No hay mas articulos disponibles");
                return;
            }
        }
        fn();
    };

    // CREATE TABLE articles_list_users(
    //     id char(36) NOT NULL PRIMARY KEY,
    //     id_article char(36) NOT NULL,
    //     status TINYINT NOT NULL,
    //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    // );

    const handleClickAddToList = async () => {
        let res = true;

        if (articlesIsInList.id == null) res = await useAddArticleToList(id_user, data.id);
        else if (articlesIsInList.status == 0) res = await useUpdateArticleInListStatus(articlesIsInList.id, 1); // poner estado en 1
        else if (articlesIsInList.status == 1) res = await useUpdateArticleInListStatus(articlesIsInList.id, 0); // poner estado en 2
        refetchArticlesIsInList();
        console.log(res);
    };

    // const [imageInView, setImageInView] = useState(1);

    // useEffect(() => {
    //     console.log(images);
    //     console.log(carruselRef.current);
    //     const container = carruselRef.current;
    //     if (!container) return;
    //     const handleScroll = () => {
    //         const containerRect = container.getBoundingClientRect();
    //         Array.from(container.children).forEach((item, i) => {
    //             const rect = item.getBoundingClientRect();
    //             if (rect.left >= containerRect.left && rect.right <= containerRect.right) setImageInView(i + 1);
    //         });
    //     };
    //     container.addEventListener("scroll", handleScroll);
    //     return () => {
    //         container.removeEventListener("scroll", handleScroll);
    //     };
    // }, []);

    if (isLoading || (idArticulo == null && articleSelected == null) || isLoadingArticlesCanBeInterested || !currencyUser) return <Article />;

    return (
        <div>
            <div className="h-80 relative">
                <div
                    className="container h-full w-full flex flex-shrink-0- shrink-   overflow-x-auto gap-4 no-scrollbar"
                    style={{ scrollSnapType: "x mandatory" }}
                    ref={carruselRef}
                >
                    <div className="item flex-shrink-0  w-full h-full" style={{ scrollSnapAlign: "start" }}>
                        <ImageA className="w-full h-full object-cover" src={data.main_image} />
                    </div>
                    {data.images &&
                        data.images.split(",").length > 0 &&
                        data.images.split(",").map((image, i) => (
                            <div key={i} className="item flex-shrink-0  w-full h-full" style={{ scrollSnapAlign: "start" }}>
                                <ImageA className="w-full h-full object-cover" src={image} />
                            </div>
                        ))}
                </div>

                {/* <Icon className="absolute top-0 left-0 m-4 size-6 text-slate-200" icon="icon-park-outline:arrow-left" /> */}
                <div className="flex items-center gap-1 absolute bottom-0 left-0_ left-2/4 -translate-x-1/2 m-4">
                    {/* <div className="h-2 w-8 bg-black rounded-full"></div> */}
                    {/* {data.images.split(",").map((_, i) => (
                        <div key={i} className="h-2 w-2 bg-slate-300 rounded-full"></div>
                    ))} */}

                    {[data.main_image, ...(data.images ? data.images.split(",") : [])].map((_, i) => (
                        <div key={i} className={`h-2 rounded-full ${i + 1 == imageInView ? "w-8 bg-red-500" : "w-2 bg-slate-300"}`}></div>
                        // <Icon
                        //     key={i}
                        //     icon={`${i + 1 == imageInView ? "ic:baseline-circle" : "material-symbols-light:circle-outline"}`}
                        //     className="text-xs"
                        // />
                    ))}

                    {/* <div className="h-2 w-2 bg-slate-300 rounded-full"></div> */}
                </div>
            </div>
            <div className="m-4">
                <div className="flex items-start justify-between">
                    <p className="font-bold text-2xl">{data.name}</p>
                    {articlesIsInList && articlesIsInList.id != null && articlesIsInList.status == 1 ? (
                        <Icon className="size-6 text-red-500" icon="ph:heart-fill" onClick={handleClickAddToList} />
                    ) : (
                        <Icon className="size-6" icon="ph:heart" onClick={handleClickAddToList} />
                    )}
                </div>
                <Spacer space={12} />
                <div className="flex gap-2 items-center">
                    <p className="bg-slate-300 rounded px-2 py-1 text-xs font-semibold">{data.total_sales} Vendidas</p>
                    <div className="flex gap-1 items-center">
                        <Icon icon="fluent-color:star-20" className="text-base" />
                        <span className="text-xs">
                            {data.average_stars.slice(0, 3)} ({data.total_reviews} reviews)
                        </span>
                    </div>
                </div>
                <Divider h={1} />
                <p className="font-bold text-lg">Descripcion</p>
                <p className="text-sm tracking-tight text-gray-600">{data.description}</p>
                <Spacer space={12} />

                <div className="flex gap-4 flex-wrap">
                    {options.map((options2, i) => {
                        return (
                            <div className="flex-1" style={{ minWidth: "calc(50% - 10px)" }} key={i}>
                                <p className="font-bold text-lg">{options2[0].option}</p>
                                <div className="flex gap-3 mt-2 flex-wrap">
                                    {options2.map((option) => {
                                        if (option.image != "") {
                                            return (
                                                <div
                                                    className="border border-black rounded-full overflow-hidden size-10 size grid place-items-center relative"
                                                    key={option.id}
                                                    onClick={() => {
                                                        setOptionsSelected(option);
                                                    }}
                                                >
                                                    {optionsSelected[option.id_option] && optionsSelected[option.id_option].id == option.id && (
                                                        <Icon
                                                            className="size-6 text-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                                            icon="material-symbols:check-rounded"
                                                        />
                                                    )}
                                                    <ImageA className="h-full w-full object-cover" src={option.image} />
                                                </div>
                                            );
                                        } else if (option.color != "") {
                                            return (
                                                <div
                                                    key={option.id}
                                                    className="rounded-full size-10 relative"
                                                    style={{ backgroundColor: option.color }}
                                                    onClick={() => setOptionsSelected(option)}
                                                >
                                                    {optionsSelected[option.id_option] && optionsSelected[option.id_option].id == option.id && (
                                                        <Icon
                                                            className="size-6 text-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                                            icon="material-symbols:check-rounded"
                                                        />
                                                    )}
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <div
                                                    className={`border border-black rounded-xl py-1 px-2 ${
                                                        optionsSelected[option.id_option] &&
                                                        optionsSelected[option.id_option].id == option.id &&
                                                        "bg-black text-white text-sm"
                                                    }`}
                                                    key={option.id}
                                                    onClick={() => setOptionsSelected(option)}
                                                >
                                                    {option.value}
                                                </div>
                                            );
                                        }
                                    })}
                                </div>
                            </div>
                        );
                    })}
                    {/* <div className="flex-1">
                        <p className="font-bold text-xl">Size</p>
                        <div className="flex gap-3 mt-2">
                            <div className="border border-black rounded-full size-10 size grid place-items-center">
                                <span>S</span>
                            </div>
                            <div className="border border-black rounded-full size-10 size grid place-items-center">
                                <span>M</span>
                            </div>
                            <div className="border border-black rounded-full size-10 size grid place-items-center">
                                <span>L</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <p className="font-bold text-xl">Color</p>
                        <div className="flex gap-3 mt-2">
                            <div className="bg-red-500 rounded-full size-10"></div>
                            <div className="bg-blue-500 rounded-full size-10"></div>
                            <div className="bg-orange-500 rounded-full size-10"></div>
                        </div>
                    </div> */}
                </div>

                <Spacer space={24} />
                {/* <Divider h={1} /> */}

                <div className="flex gap-3 items-center">
                    <p className="font-bold text-lg">Cantidad</p>
                    <div className="flex items-center gap-4 bg-slate-200 rounded-3xl py-2 px-4">
                        <Icon className="text-sm" icon="proicons:subtract" onClick={() => canBuyOneMore(() => setQuantity(quantity - 1))} />
                        <p className="font-bold text-sm">{quantity}</p>
                        <Icon className="text-base" icon="ion:add-outline" onClick={() => canBuyOneMore(() => setQuantity(quantity + 1), true)} />
                    </div>
                </div>

                <Divider h={1} />

                <div className="flex items-center justify-between mt-4 gap-3">
                    <div className="flex flex-col gap-1 w-1/4 items-center">
                        <p className="text-xs text-gray-500">Precio total</p>
                        {/* <p className="text-2xl font-bold">${price.toString().split(".")[0]}</p>{" "} */}
                        <p className="text-2xl font-bold">
                            ${showPriceWithCurrencyUser(price, data.currency, currencyUser, true, { style: null }).toString().split(".")[0]}
                        </p>
                    </div>
                    {hasOffer && (
                        <div className="flex flex-col gap-1 w-1/4 items-center">
                            <p className="text-xs text-gray-500">Sin oferta</p>
                            {/* <p className="text-2xl font-bold line-through text-gray-500">${data.price.toString().split(".")[0]}</p>{" "} */}
                            <p className="text-2xl font-bold line-through text-gray-500">
                                $
                                {
                                    showPriceWithCurrencyUser(priceWithoutOffer, data.currency, currencyUser, true, { style: null })
                                        .toString()
                                        .split(".")[0]
                                }
                            </p>
                        </div>
                    )}

                    {/* <div className="w-3/4 grid place-items-center">
                        <button
                            className="text-white bg-red-500 rounded-full flex justify-between items-center p-4 w-full"
                            onClick={handleClickAddToCart}
                        >
                            <Icon icon="solar:bag-4-bold" width="24" height="24" />
                            <span>Agregar a Carrito</span>
                        </button>
                    </div> */}
                    <div className="w-3/4 grid place-items-center">
                        <button
                            className="text-white bg-red-500 rounded-full flex justify-between- justify-evenly gap-4_ items-center p-4 w-full"
                            onClick={handleClickAddToCart}
                        >
                            <Icon icon="solar:bag-4-bold" className="size-6" />
                            <span>Agregar a Carrito</span>
                        </button>
                    </div>
                </div>
            </div>
            <Divider h={2.5} />

            <ProductDetails idArticulo={id} additional_details={data.additional_details} />

            <Divider h={2.5} />

            <GaleryProduct images={[data.main_image, ...(data.images ? data.images.split(",") : [])].filter(Boolean)} />

            <Divider h={2.5} />

            <BoxContain idArticle={id} boxContents={articleSelected.boxContents} />

            <Divider h={2.5} />

            <div className="m-4">
                <p className="font-bold text-xl">Productos similares</p>
                <Spacer space={16} />
                <div className="flex justify-between flex-wrap gap-4">
                    {articlesSimilar?.map((article) => (
                        <SimilarArticle
                            key={article.id}
                            id={article.id}
                            image={article.main_image}
                            name={article.name}
                            price={article.price}
                            averageStars={article.average_stars}
                            totalSales={article.total_sales}
                        />
                    ))}
                    {/* {articlesSimilar?.map((article) => (
                        <div
                            key={article.id}
                            onClick={() => router.push(`/articulos/${article.id}`)}
                            className="flex flex-col gap-3 h-72"
                            style={{ width: "calc(50% - .5rem)" }}
                        >
                            <div className="h-2/3">
                                <ImageA className="w-full h-full object-cover rounded-2xl" src={article.main_image} />
                            </div>
                            <div className="h-1/3 flex flex-col gap-1">
                                <p className="font-bold text-lg">{showText(article.name, 15)}</p>
                                <div className="flex items-center gap-2">
                                    <Icon className="text-base text-gray-500" icon="qlementine-icons:star-half-16" />
                                    <p className="text-gray-500">4.6</p>
                                    <span className="text-gray-500">|</span>
                                    <p className="bg-slate-300 text-gray-500 rounded px-2 py-1 text-xs font-semibold">9,742 sold</p>
                                </div>
                                <p className="font-bold text-lg">${article.price.toString().split(".")[0]}.00</p>
                            </div>
                        </div>
                    ))} */}
                    {/* <div className="flex flex-col gap-3 h-72" style={{ width: "calc(50% - .5rem)" }}>
                        <div className="h-2/3">
                            <ImageA
                                className="w-full h-full object-cover rounded-2xl"
                                src="https://8cfbi9foz7.ufs.sh/f/0DUeKQjxChl7lBHUB6y7D4zVcm0fFoU6uJhKXLwTOIMGkjN3"
                            />
                        </div>
                        <div className="h-1/3 flex flex-col gap-1">
                            <p className="font-bold text-lg">Silver Watch</p>
                            <div className="flex items-center gap-2">
                                <Icon className="text-base text-gray-500" icon="qlementine-icons:star-half-16" />
                                <p className="text-gray-500">4.6</p>
                                <span className="text-gray-500">|</span>
                                <p className="bg-slate-300 text-gray-500 rounded px-2 py-1 text-xs font-semibold">9,742 sold</p>
                            </div>
                            <p className="font-bold text-lg">$550.00</p>
                        </div>
                    </div> */}
                    {/* <div className="flex flex-col gap-3 h-72" style={{ width: "calc(50% - 1rem)" }}>
                        <div className="h-2/3">
                            <ImageA
                                className="w-full h-full object-cover rounded-2xl"
                                src="https://8cfbi9foz7.ufs.sh/f/0DUeKQjxChl7lBHUB6y7D4zVcm0fFoU6uJhKXLwTOIMGkjN3"
                            />
                        </div>
                        <div className="h-1/3 flex flex-col gap-1">
                            <p className="font-bold text-lg">Silver Watch</p>
                            <div className="flex items-center gap-2">
                                <Icon className="text-base text-gray-500" icon="qlementine-icons:star-half-16" />
                                <p className="text-gray-500">4.6</p>
                                <span className="text-gray-500">|</span>
                                <p className="bg-slate-300 text-gray-500 rounded px-2 py-1 text-xs font-semibold">9,742 sold</p>
                            </div>
                            <p className="font-bold text-lg">$550.00</p>
                        </div>
                    </div> */}
                    {/* <div className="flex flex-col gap-3 h-72" style={{ width: "calc(50% - 1rem)" }}>
                        <div className="h-2/3">
                            <ImageA
                                className="w-full h-full object-cover rounded-2xl"
                                src="https://8cfbi9foz7.ufs.sh/f/0DUeKQjxChl7lBHUB6y7D4zVcm0fFoU6uJhKXLwTOIMGkjN3"
                            />
                        </div>
                        <div className="h-1/3 flex flex-col gap-1">
                            <p className="font-bold text-lg">Silver Watch</p>
                            <div className="flex items-center gap-2">
                                <Icon className="text-base text-gray-500" icon="qlementine-icons:star-half-16" />
                                <p className="text-gray-500">4.6</p>
                                <span className="text-gray-500">|</span>
                                <p className="bg-slate-300 text-gray-500 rounded px-2 py-1 text-xs font-semibold">9,742 sold</p>
                            </div>
                            <p className="font-bold text-lg">$550.00</p>
                        </div>
                    </div> */}
                </div>
            </div>

            {/* <Divider h={2.5} /> */}

            {/* <SimilarProducts isLoading={isLoadingArticlesSimilar} similarProducts={articlesSimilar} /> */}

            <Divider h={2.5} />

            <FeaturedReviews reviews={articleReviews} idArticle={id} />

            <Divider h={2.5} />

            {(userTypeName === "DEV" ||
                userTypeName === "SUPPORT" ||
                ((userTypeName === "ADMIN-SHOP" || userTypeName === "SUB-ADMIN-SHOP") && data.id_shop === id_shop)) && (
                <div className="m-4">
                    <button className="bg-red-700 text-white py-3 px-5 text-lg rounded-xl" onClick={() => router.push(`/admin/articulos/${data.id}`)}>
                        Actualizar articulo
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <div className="">
            <div className="m-4 flex_flex-col_gap-1">
                <div>
                    <div className="flex justify-between items-end">
                        <p className="text-blue-700- text-blue-900 text-sm tracking-tight">visita la tienda de {data?.shop_name}</p>
                        {data.total_reviews > 0 && <Stars average={data.average_stars} reviews={data.total_reviews} />}
                        {/* <div className="flex items-center gap-1">
                            <p className="text-xs text-blue-900">3.3</p>
                            <p className="text-xs">({articleSelected.votes})</p>
                        </div> */}
                    </div>
                    <p className="text-sm tracking-tight text-gray-800 ">{data.description}</p>
                    {/* <p className="text-sm tracking-tight text-gray-800 ">Boost Mobile | Apple iphone 16(128 GB) - Ultramarine[bloqueado]. Requiere un plan limitado de Apple.</p> */}
                </div>
                {/* <div className="flex items-center gap-1">
                    <p className="text-blue-700">4.3</p>
                    <div className="flex">
                        <Icon icon="material-symbols:star" className="text-orange-400" />
                        <Icon icon="material-symbols:star" className="text-orange-400" />
                        <Icon icon="material-symbols:star" className="text-orange-400" />
                        <Icon icon="material-symbols:star" className="text-orange-400" />
                        <Icon icon="material-symbols:star" className="text-orange-400" />
                    </div>
                    <p>(11)</p>
                </div> */}
                {/* <p className="text-sm tracking-tight mt-1">
                    <span className="font-semibold">50+ comprados</span> el mes pasado
                </p> */}
            </div>

            <Divider h={2.5} />

            <ProductsImagesCarrusel
                articleId={data.id}
                articleName={data.name}
                articlesDescription={data.description}
                carruselRef={carruselRef}
                imageInView={imageInView}
                mainImage={data.main_image}
                images={data.images ? data.images.split(",") : []}
                handleClickAddToList={handleClickAddToList}
                articlesIsInList={articlesIsInList && articlesIsInList.id != null && articlesIsInList.status == 1 ? true : false}
            />

            <Divider h={2.5} />

            <ProductOptions
                priceArticle={data.price}
                carruselRef={carruselRef}
                idArticle={id}
                colors={articleSelected.colors}
                options={[{ type: 1 }]}
                sizes={articleSelected.sizes}
                providers={articleSelected.providers}
                conditions={articleSelected.conditions}
            />

            <ProductPrice
                hasOffer={false}
                priceWithOffer={articleSelected.priceWithOffer}
                price={data.price}
                availableQuantities={data.quantity}
                offerName={data.offer_name}
                discountPercent={data.discount_percent}
                handleClickAddToCart={handleClickAddToCart}
                offerArticle={offerArticle && offerArticle}
            />

            <Divider h={2.5} />

            <Note note={articleSelected.note} />

            <Divider h={2.5} />

            <ProductsBoughtTogether idsArticles={["1234567", "123467", "134567"]} />

            <InterestingProducts articlesCanBeInterested={articlesCanBeInterested && articlesCanBeInterested} />

            <Divider h={2.5} />

            <ProductDetails idArticulo={id} additional_details={data.additional_details} />

            <Divider h={2.5} />

            {/* <ProductDescription /> */}

            {/* <Divider h={2.5} /> */}

            <GaleryProduct images={[data.main_image, ...(data.images ? data.images.split(",") : [])].filter(Boolean)} />

            <Divider h={2.5} />

            <BoxContain idArticle={id} boxContents={articleSelected.boxContents} />

            <SimilarProducts isLoading={isLoadingArticlesSimilar} similarProducts={articlesSimilar} />

            <Divider h={2.5} />

            <FeaturedReviews reviews={articleReviews} idArticle={id} />

            <Divider h={2.5} />

            <HowWorksReviews />

            {/* <Divider h={2.5} /> */}

            {/* <div className="h-96"></div> */}

            {/* <hr />
            <div>
                <div>
                    <p>ver mas videos</p>
                    <i></i>
                </div>
            </div>
            <hr />
            <div>
                <button>Crear una resena d video</button>
                <button>Crear una resena d video</button>
            </div>

            <hr />

            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />

            <div>
                <i></i>
            </div>
            <p>paga</p>
            <p>
                aplican terminos y consiciones <i></i>
            </p>
            <p>
                si cargos <span>Detalles</span>
            </p>
            <hr />
            <div>
                <div>
                    <div></div>
                    <p>Ultramarino</p>
                </div>
            </div>
            <hr />
            <div>
                <p>
                    Entrega <span>Viernse</span> <span></span>{" "}
                </p>
                <p></p>
            </div>
            <div>
                <div>
                    <p>128 GB</p>
                </div>
                <div>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
            </div>
            <hr />
            <div>
                <p>
                    Entrega <span>Viernse</span> <span></span>{" "}
                </p>
                <div>
                    <i></i>
                    <p>Enviar a </p>
                </div>
                <p>sols quedan(7)</p>
            </div>
            <button>Agregar al carrito</button>

            <div>
                <div>
                    <p>enviado por amazon</p>
                    <p>Amazon.com</p>
                </div>
                <div>
                    <p>enviado por amazon</p>
                    <p>Amazon.com</p>
                </div>
                <div>
                    <p>enviado por amazon</p>
                    <p>Amazon.com</p>
                </div>
                <p>agregar a la lista</p>
            </div>
            <hr />
            <div>
                <p>detalles</p>
                <div>
                    <p>marca</p>
                    <p>Boots Mobile</p>
                </div>
                <div>
                    <p>marca</p>
                    <p>Boots Mobile</p>
                </div>
                <div>
                    <p>marca</p>
                    <p>Boots Mobile</p>
                </div>
                <div>
                    <p>marca</p>
                    <p>Boots Mobile</p>
                </div>
                <div>
                    <p>marca</p>
                    <p>Boots Mobile</p>
                </div>
                <div>
                    <p>marca</p>
                    <p>Boots Mobile</p>
                </div>
                <div>
                    <p>marca</p>
                    <p>Boots Mobile</p>
                </div>
                <div>
                    <i></i>
                    <p>ver mas</p>
                </div>
                <div>
                    <i></i>
                    <p>informar</p>
                </div>
            </div>
            <hr />
            <div>
                <p>comprados habitualmente</p>
                <div>
                    <img src="" alt="" />
                </div>
                <div>
                    <img src="" alt="" />
                </div>
                <div>
                    <img src="" alt="" />
                </div>
                <button>Comprar los 3</button>
            </div>
            <hr />
            <div>
                <p>Contenido de la tabla</p>
                <ul>
                    <li>cable</li>
                    <li>cable</li>
                    <li>cable</li>
                </ul>
            </div>
            <hr />
            <div>
                <p>mas info</p>
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
            </div>
            <hr />
            <div>
                <p>descripcion</p>
                <p>iphoe 13.</p>
            </div>
            <hr />
            <div>
                <p>funciones y detalles</p>
                <ul>
                    <i>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione itaque ipsa placeat quo, dignissimos repellendus eius fuga. At, laborum sapiente ipsa incidunt blanditiis id
                        veritatis quisquam ipsum minus quis maxime.
                    </i>
                    <i>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione itaque ipsa placeat quo, dignissimos repellendus eius fuga. At, laborum sapiente ipsa incidunt blanditiis id
                        veritatis quisquam ipsum minus quis maxime.
                        <i>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione itaque ipsa placeat quo, dignissimos repellendus eius fuga. At, laborum sapiente ipsa incidunt blanditiis
                            id veritatis quisquam ipsum minus quis maxime.
                        </i>
                        <i>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione itaque ipsa placeat quo, dignissimos repellendus eius fuga. At, laborum sapiente ipsa incidunt blanditiis
                            id veritatis quisquam ipsum minus quis maxime.
                        </i>
                    </i>
                </ul>
            </div>
            <div>
                <p>info de producto</p>
                <div>
                    <p>Pantalla</p>
                    <div>
                        <p>tipor</p>
                        <p>pantalla</p>
                    </div>
                </div>
            </div>
            <div>
                <p>informacion adicional</p>
                <div></div>
            </div>
            <hr />
            <div>
                <div>
                    <i></i>
                    caracteristica de sostenibilidad
                </div>
            </div>
            <hr />
            <div>
                <p>los cliente tambien</p>
                <div></div>
                <div></div>
            </div>
            <hr />
            <div>
                <p>resenas</p>
                <div>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                </div>
                <p>4.3 de 5</p>
                <p>11 calificaciones</p>
            </div>
            <hr />
            <div>
                <p>opiniones destacadas</p>
                <div></div>
            </div>
            <hr />
            <div>
                <p>Ver mas opiniones</p>
                <i></i>
            </div>
            <hr />
            <div>
                <button>Crea una resena en video</button>
                <button>Escribe una opinion</button>
            </div>
            <hr />
            <div>
                <p>como fnciona</p>
                <p>
                    las opiniones <span>Mas informacion</span>
                </p>
            </div>
            <hr />
            <div>
                <div>
                    <p>Comprar por uso</p>
                    <div>
                        <div>Uso diario</div>
                        <div>Uso diario</div>
                        <div>Uso diario</div>
                        <div>Uso diario</div>
                        <div>Uso diario</div>
                        <div>Uso diario</div>
                    </div>
                    <div>
                        <div>
                            <img src="" alt="" />
                        </div>
                        <div>
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                        </div>
                    </div>
                </div>

            </div> */}
        </div>
    );
};

export default page;
