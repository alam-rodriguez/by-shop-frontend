// "use client";

// import React, { use, useEffect, useState } from "react";

// // zustand
// import { zusArticles } from "@/app/zustand/articles/zusArticles";

// // hooks
// import useCarruselIMages from "@/app/hooks/products/carrusel-images/useCarruselIMages";

// // Components
// import Stars from "@/app/components/app/articles/Stars";
// import ProductsImagesCarrusel from "./ProductsImagesCarrusel";
// import Divider from "@/app/components/home/Divider";
// import ProductPrice from "./ProductPrice";
// import Note from "./Note";
// import ProductsBoughtTogether from "./ProductsBoughtTogether";
// import InterestingProducts from "./InterestingProducts";
// import ProductDetails from "./ProductDetails";
// import ProductDescription from "./ProductDescription";
// import GaleryProduct from "./GaleryProduct";
// import BoxContain from "./BoxContain";
// import FeaturedReviews from "./FeaturedReviews";
// import HowWorksReviews from "./HowWorksReviews";
// import useApp from "@/app/hooks/app/useApp";
// import ProductOptions from "./ProductOptions";
// import {
//     useArticleIsInList,
//     useCreateUserArticleView,
//     useGetArticle,
//     useGetArticleOffer,
//     useGetArticleOptions,
//     useGetArticlesCanBeInterested,
//     useGetArticlesFromGeneralCategoryWithoutArticle,
//     useGetArticlesSimilar,
// } from "@/app/hooks/request/articles/requestsArticles";
// import { useParams, useRouter, useSearchParams } from "next/navigation";
// import {
//     useAddArticleToList,
//     useCreateCartItem,
//     useCreateCartItemOption,
//     useUpdateArticleInListStatus,
// } from "@/app/hooks/request/carts/requestsCarts";
// import { zusUser } from "@/app/zustand/user/zusUser";
// import { useGetArticleReviews } from "@/app/hooks/request/articles/requestsArticlesReviews";
// import { toast } from "sonner";
// import Spacer from "@/app/components/home/Spacer";
// import SimilarProducts from "./SimilarProducts";

// const page = ({ params }) => {
//     const { articulo: id } = useParams();

//     const { id: id_user } = zusUser();

//     const { showPrice, showText } = useApp();

//     useEffect(() => {
//         console.log(id);
//     }, [id]);

//     // useEffect(() => {
//     //     console.log(id);
//     // }, [id]);

//     // useEffect(() => {
//     //     console.log(params);
//     // }, [params]);

//     const searchParams = useSearchParams();

//     // Obtener un parámetro específico
//     // const id = searchParams.get("id");
//     // const { id } = useParams();
//     const router = useRouter();
//     // const { id } = router.query;

//     const [idArticulo, setIdArticulo] = useState(null);

//     useEffect(() => {
//         // console.log(id);
//         console.log(router);
//     }, [router]);

//     const { isLoading, data } = useGetArticle(id);

//     useEffect(() => {
//         console.log(data);
//     }, [data]);

//     const { data: offerArticle, isLoading: isLoadingOfferArticle } = useGetArticleOffer(id);

//     useEffect(() => {
//         console.log(offerArticle);
//     }, [offerArticle]);

//     const { isLoading: isLoadingOptions, data: dataOptions } = useGetArticleOptions(id);

//     useEffect(() => {
//         console.log(dataOptions);
//     }, [dataOptions]);

//     useEffect(() => {
//         console.log(data);
//     }, [data]);

//     const { getParamValue } = useApp();

//     const { articleSelected, setArticleSelected } = zusArticles();
//     const { optionsSelected, quantity } = zusArticles();

//     const { imageInView, carruselRef } = useCarruselIMages();

//     // const { idg } = getParamValue(params, "articulo");

//     useEffect(() => {
//         getParamValue(params, "articulo").then((data) => {
//             setIdArticulo(data);
//             setArticleSelected("123458867");
//         });
//     }, []);

//     useEffect(() => {
//         console.log(articleSelected);
//     }, [articleSelected]);

//     // const [colorSelected, setColorSelected] = useState(1);

//     // const carruselRef = useRef();

//     const createUserArticleViewFn = async () => {
//         console.log("hola");
//         const res = await useCreateUserArticleView(id_user, data.id, data.id_direct_category);
//         console.log(res);
//     };

//     useEffect(() => {
//         if (!data) return;
//         createUserArticleViewFn();
//     }, [data]);

//     // CREATE TABLE users_articles_views(
//     //     id CHAR(36) NOT NULL PRIMARY KEY,
//     //     id_user CHAR(36) NOT NULL,
//     //     id_article CHAR(36) NOT NULL,
//     //     id_article_direct_category CHAR(36) NOT NULL,
//     //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     // );

//     const { data: articlesIsInList, refetch: refetchArticlesIsInList } = useArticleIsInList(id_user, data?.id);

//     useEffect(() => {
//         console.log(articlesIsInList);
//     }, [articlesIsInList]);

//     const { data: articleReviews, isLoading: isLoadingArticleReviews } = useGetArticleReviews(id);

//     useEffect(() => {
//         console.log(articleReviews);
//     }, [articleReviews]);

//     const { data: articlesCanBeInterested, isLoading: isLoadingArticlesCanBeInterested } = useGetArticlesCanBeInterested(id);

//     useEffect(() => {
//         console.warn(articlesCanBeInterested);
//     }, [articlesCanBeInterested]);

//     const { data: articlesSimilar, isLoading: isLoadingArticlesSimilar } = useGetArticlesSimilar(id);

//     useEffect(() => {
//         console.warn(articlesSimilar);
//     }, [articlesSimilar]);

//     if (isLoading) return <></>;

//     if ((idArticulo == null && articleSelected == null) || isLoadingArticlesCanBeInterested) return <div>Cargando...</div>;

//     // CREATE TABLE carts(
//     //     id char(36) NOT NULL PRIMARY KEY,
//     //     id_article char(36) NOT NULL,
//     //     id_user char(36) NOT NULL,
//     //     status TINYINT NOT NULL,
//     //     quantity INT UNSIGNED NOT NULL,
//     //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     // );

//     // CREATE TABLE cart_item_options(
//     //     id char(36) NOT NULL PRIMARY KEY,
//     //     id_article char(36) NOT NULL,
//     //     id_user char(36) NOT NULL,
//     //     id_cart char(36) NOT NULL,
//     //     status TINYINT NOT NULL,
//     //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     // );

//     const handleClickAddToCart = async () => {
//         const loadingToast = toast.loading("Actualizando oferta...");

//         const res = await useCreateCartItem(data.id, quantity, id_user);
//         console.log(res);
//         const resOPtions = await useCreateCartItemOption(res, optionsSelected, id_user);
//         console.log(resOPtions);
//         // if (resOPtions) alert("Agregado a carrito");
//         if (res.id && resOPtions)
//             toast.success("Articulo agregado al carrito", {
//                 id: loadingToast,
//             });
//         else
//             toast.error("Error al agregar al carrito", {
//                 id: loadingToast,
//             });
//     };

//     // CREATE TABLE articles_list_users(
//     //     id char(36) NOT NULL PRIMARY KEY,
//     //     id_article char(36) NOT NULL,
//     //     status TINYINT NOT NULL,
//     //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     // );

//     const handleClickAddToList = async () => {
//         let res = true;

//         if (articlesIsInList.id == null) res = await useAddArticleToList(id_user, data.id);
//         else if (articlesIsInList.status == 0) res = await useUpdateArticleInListStatus(articlesIsInList.id, 1); // poner estado en 1
//         else if (articlesIsInList.status == 1) res = await useUpdateArticleInListStatus(articlesIsInList.id, 0); // poner estado en 2
//         refetchArticlesIsInList();
//         console.log(res);
//     };

//     return (
//         <div className="">
//             <div className="m-4 flex_flex-col_gap-1">
//                 <div>
//                     <div className="flex justify-between items-end">
//                         <p className="text-blue-700- text-blue-900 text-sm tracking-tight">visita la tienda de {data?.shop_name}</p>
//                         {data.total_reviews > 0 && <Stars average={data.average_stars} reviews={data.total_reviews} />}
//                         {/* <div className="flex items-center gap-1">
//                             <p className="text-xs text-blue-900">3.3</p>
//                             <p className="text-xs">({articleSelected.votes})</p>
//                         </div> */}
//                     </div>
//                     <p className="text-sm tracking-tight text-gray-800 ">{data.description}</p>
//                     {/* <p className="text-sm tracking-tight text-gray-800 ">Boost Mobile | Apple iphone 16(128 GB) - Ultramarine[bloqueado]. Requiere un plan limitado de Apple.</p> */}
//                 </div>
//                 {/* <div className="flex items-center gap-1">
//                     <p className="text-blue-700">4.3</p>
//                     <div className="flex">
//                         <Icon icon="material-symbols:star" className="text-orange-400" />
//                         <Icon icon="material-symbols:star" className="text-orange-400" />
//                         <Icon icon="material-symbols:star" className="text-orange-400" />
//                         <Icon icon="material-symbols:star" className="text-orange-400" />
//                         <Icon icon="material-symbols:star" className="text-orange-400" />
//                     </div>
//                     <p>(11)</p>
//                 </div> */}
//                 {/* <p className="text-sm tracking-tight mt-1">
//                     <span className="font-semibold">50+ comprados</span> el mes pasado
//                 </p> */}
//             </div>

//             <Divider h={2.5} />

//             <ProductsImagesCarrusel
//                 articleId={data.id}
//                 articleName={data.name}
//                 articlesDescription={data.description}
//                 carruselRef={carruselRef}
//                 imageInView={imageInView}
//                 mainImage={data.main_image}
//                 images={data.images ? data.images.split(",") : []}
//                 handleClickAddToList={handleClickAddToList}
//                 articlesIsInList={articlesIsInList && articlesIsInList.id != null && articlesIsInList.status == 1 ? true : false}
//             />

//             <Divider h={2.5} />

//             <ProductOptions
//                 priceArticle={data.price}
//                 carruselRef={carruselRef}
//                 idArticle={id}
//                 colors={articleSelected.colors}
//                 options={[{ type: 1 }]}
//                 sizes={articleSelected.sizes}
//                 providers={articleSelected.providers}
//                 conditions={articleSelected.conditions}
//             />

//             <ProductPrice
//                 hasOffer={false}
//                 priceWithOffer={articleSelected.priceWithOffer}
//                 price={data.price}
//                 availableQuantities={data.quantity}
//                 offerName={data.offer_name}
//                 discountPercent={data.discount_percent}
//                 handleClickAddToCart={handleClickAddToCart}
//                 offerArticle={offerArticle && offerArticle}
//             />

//             <Divider h={2.5} />

//             <Note note={articleSelected.note} />

//             <Divider h={2.5} />

//             <ProductsBoughtTogether idsArticles={["1234567", "123467", "134567"]} />

//             <InterestingProducts articlesCanBeInterested={articlesCanBeInterested && articlesCanBeInterested} />

//             <Divider h={2.5} />

//             <ProductDetails idArticulo={id} additional_details={data.additional_details} />

//             <Divider h={2.5} />

//             {/* <ProductDescription /> */}

//             {/* <Divider h={2.5} /> */}

//             <GaleryProduct images={[data.main_image, ...(data.images ? data.images.split(",") : [])].filter(Boolean)} />

//             <Divider h={2.5} />

//             <BoxContain idArticle={id} boxContents={articleSelected.boxContents} />

//             <SimilarProducts isLoading={isLoadingArticlesSimilar} similarProducts={articlesSimilar} />

//             <Divider h={2.5} />

//             <FeaturedReviews reviews={articleReviews} idArticle={id} />

//             <Divider h={2.5} />

//             <HowWorksReviews />

//             {/* <Divider h={2.5} /> */}

//             {/* <div className="h-96"></div> */}

//             {/* <hr />
//             <div>
//                 <div>
//                     <p>ver mas videos</p>
//                     <i></i>
//                 </div>
//             </div>
//             <hr />
//             <div>
//                 <button>Crear una resena d video</button>
//                 <button>Crear una resena d video</button>
//             </div>

//             <hr />

//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />
//             <hr />

//             <div>
//                 <i></i>
//             </div>
//             <p>paga</p>
//             <p>
//                 aplican terminos y consiciones <i></i>
//             </p>
//             <p>
//                 si cargos <span>Detalles</span>
//             </p>
//             <hr />
//             <div>
//                 <div>
//                     <div></div>
//                     <p>Ultramarino</p>
//                 </div>
//             </div>
//             <hr />
//             <div>
//                 <p>
//                     Entrega <span>Viernse</span> <span></span>{" "}
//                 </p>
//                 <p></p>
//             </div>
//             <div>
//                 <div>
//                     <p>128 GB</p>
//                 </div>
//                 <div>
//                     <p></p>
//                     <p></p>
//                     <p></p>
//                     <p></p>
//                 </div>
//             </div>
//             <hr />
//             <div>
//                 <p>
//                     Entrega <span>Viernse</span> <span></span>{" "}
//                 </p>
//                 <div>
//                     <i></i>
//                     <p>Enviar a </p>
//                 </div>
//                 <p>sols quedan(7)</p>
//             </div>
//             <button>Agregar al carrito</button>

//             <div>
//                 <div>
//                     <p>enviado por amazon</p>
//                     <p>Amazon.com</p>
//                 </div>
//                 <div>
//                     <p>enviado por amazon</p>
//                     <p>Amazon.com</p>
//                 </div>
//                 <div>
//                     <p>enviado por amazon</p>
//                     <p>Amazon.com</p>
//                 </div>
//                 <p>agregar a la lista</p>
//             </div>
//             <hr />
//             <div>
//                 <p>detalles</p>
//                 <div>
//                     <p>marca</p>
//                     <p>Boots Mobile</p>
//                 </div>
//                 <div>
//                     <p>marca</p>
//                     <p>Boots Mobile</p>
//                 </div>
//                 <div>
//                     <p>marca</p>
//                     <p>Boots Mobile</p>
//                 </div>
//                 <div>
//                     <p>marca</p>
//                     <p>Boots Mobile</p>
//                 </div>
//                 <div>
//                     <p>marca</p>
//                     <p>Boots Mobile</p>
//                 </div>
//                 <div>
//                     <p>marca</p>
//                     <p>Boots Mobile</p>
//                 </div>
//                 <div>
//                     <p>marca</p>
//                     <p>Boots Mobile</p>
//                 </div>
//                 <div>
//                     <i></i>
//                     <p>ver mas</p>
//                 </div>
//                 <div>
//                     <i></i>
//                     <p>informar</p>
//                 </div>
//             </div>
//             <hr />
//             <div>
//                 <p>comprados habitualmente</p>
//                 <div>
//                     <img src="" alt="" />
//                 </div>
//                 <div>
//                     <img src="" alt="" />
//                 </div>
//                 <div>
//                     <img src="" alt="" />
//                 </div>
//                 <button>Comprar los 3</button>
//             </div>
//             <hr />
//             <div>
//                 <p>Contenido de la tabla</p>
//                 <ul>
//                     <li>cable</li>
//                     <li>cable</li>
//                     <li>cable</li>
//                 </ul>
//             </div>
//             <hr />
//             <div>
//                 <p>mas info</p>
//                 <img src="" alt="" />
//                 <img src="" alt="" />
//                 <img src="" alt="" />
//                 <img src="" alt="" />
//                 <img src="" alt="" />
//                 <img src="" alt="" />
//                 <img src="" alt="" />
//                 <img src="" alt="" />
//                 <img src="" alt="" />
//                 <img src="" alt="" />
//             </div>
//             <hr />
//             <div>
//                 <p>descripcion</p>
//                 <p>iphoe 13.</p>
//             </div>
//             <hr />
//             <div>
//                 <p>funciones y detalles</p>
//                 <ul>
//                     <i>
//                         Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione itaque ipsa placeat quo, dignissimos repellendus eius fuga. At, laborum sapiente ipsa incidunt blanditiis id
//                         veritatis quisquam ipsum minus quis maxime.
//                     </i>
//                     <i>
//                         Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione itaque ipsa placeat quo, dignissimos repellendus eius fuga. At, laborum sapiente ipsa incidunt blanditiis id
//                         veritatis quisquam ipsum minus quis maxime.
//                         <i>
//                             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione itaque ipsa placeat quo, dignissimos repellendus eius fuga. At, laborum sapiente ipsa incidunt blanditiis
//                             id veritatis quisquam ipsum minus quis maxime.
//                         </i>
//                         <i>
//                             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione itaque ipsa placeat quo, dignissimos repellendus eius fuga. At, laborum sapiente ipsa incidunt blanditiis
//                             id veritatis quisquam ipsum minus quis maxime.
//                         </i>
//                     </i>
//                 </ul>
//             </div>
//             <div>
//                 <p>info de producto</p>
//                 <div>
//                     <p>Pantalla</p>
//                     <div>
//                         <p>tipor</p>
//                         <p>pantalla</p>
//                     </div>
//                 </div>
//             </div>
//             <div>
//                 <p>informacion adicional</p>
//                 <div></div>
//             </div>
//             <hr />
//             <div>
//                 <div>
//                     <i></i>
//                     caracteristica de sostenibilidad
//                 </div>
//             </div>
//             <hr />
//             <div>
//                 <p>los cliente tambien</p>
//                 <div></div>
//                 <div></div>
//             </div>
//             <hr />
//             <div>
//                 <p>resenas</p>
//                 <div>
//                     <i></i>
//                     <i></i>
//                     <i></i>
//                     <i></i>
//                 </div>
//                 <p>4.3 de 5</p>
//                 <p>11 calificaciones</p>
//             </div>
//             <hr />
//             <div>
//                 <p>opiniones destacadas</p>
//                 <div></div>
//             </div>
//             <hr />
//             <div>
//                 <p>Ver mas opiniones</p>
//                 <i></i>
//             </div>
//             <hr />
//             <div>
//                 <button>Crea una resena en video</button>
//                 <button>Escribe una opinion</button>
//             </div>
//             <hr />
//             <div>
//                 <p>como fnciona</p>
//                 <p>
//                     las opiniones <span>Mas informacion</span>
//                 </p>
//             </div>
//             <hr />
//             <div>
//                 <div>
//                     <p>Comprar por uso</p>
//                     <div>
//                         <div>Uso diario</div>
//                         <div>Uso diario</div>
//                         <div>Uso diario</div>
//                         <div>Uso diario</div>
//                         <div>Uso diario</div>
//                         <div>Uso diario</div>
//                     </div>
//                     <div>
//                         <div>
//                             <img src="" alt="" />
//                         </div>
//                         <div>
//                             <p></p>
//                             <p></p>
//                             <p></p>
//                             <p></p>
//                         </div>
//                     </div>
//                 </div>

//             </div> */}
//         </div>
//     );
// };

// export default page;
