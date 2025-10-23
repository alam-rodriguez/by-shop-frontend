// "use client";

// import React, { use, useEffect } from "react";

// // Icons
// import { Icon } from "@iconify/react";

// // Components
// import ArticlesType3 from "@/app/components/app/articles/ArticlesType3";
// import Stars from "@/app/components/app/articles/Stars";
// import Divider from "@/app/components/home/Divider";

// import { useSearchParams } from "next/navigation";
// import useRequestsArticles from "@/app/hooks/request/articles/useRequestsArticles";
// import { useGetArticles2, useGetArticlesFromDirectCategory } from "@/app/hooks/request/articles/requestsArticles";

// const page = () => {
//     const { useGetArticlesOfGroupCategory } = useRequestsArticles();

//     const searchParams = useSearchParams();

//     // Obtener un parámetro específico
//     const categoryGroup = searchParams.get("grupo-categorias");
//     const idCategoriaDirecta = searchParams.get("categoria-directa");
//     const idCategoriaGeneral = searchParams.get("categoria-general");

//     console.log(categoryGroup);

//     const type = categoryGroup ? "category-group" : idCategoriaDirecta ? "direct-category" : idCategoriaGeneral ? "general-category" : "";
//     const id = categoryGroup ? categoryGroup : idCategoriaDirecta ? idCategoriaDirecta : idCategoriaGeneral ? idCategoriaGeneral : "";

//     // console.log(type);

//     // useEffect(() => {
//     //     console.log(idCategoriaDirecta);
//     //     console.log(categoryGroup);
//     // }, [categoryGroup, idCategoriaDirecta]);

//     // const { data, isLoading } = useGetArticlesOfGroupCategory(categoryGroup);

//     const { data, isLoading } = useGetArticles2(type, id);

//     useEffect(() => {
//         console.log(data);
//     }, [data]);

//     const { data: articlesFromDirectCategory, isLoading: isLoadingArticlesFromDirectCategory } = useGetArticlesFromDirectCategory(idCategoriaDirecta);

//     useEffect(() => {
//         console.log(articlesFromDirectCategory);
//     }, [articlesFromDirectCategory]);

//     if (isLoading || isLoadingArticlesFromDirectCategory) return <>Cargando</>;
//     return (
//         <>
//             <div className="my-3 mx-4">
//                 <div className="border inline-block border-gray-400 py-2 px-6 rounded-2xl shadow-md">
//                     <p className="text-blue-900 font-extrabold">Filtros</p>
//                 </div>
//             </div>
//             <Divider mt={0} />
//             <div className="m-4">
//                 {/* <p>Consulta cada pagina del producto para ver otras opciones de compra. El precio y otros detalles pueden variar segun el tamano y el color del produtco.</p> */}
//                 <p className="text-xs">Consulta cada página del producto para ver otras opciones de compra.</p>
//                 <div className="flex flex-col gap-2">
//                     {data?.map((article) => (
//                         <ArticlesType3
//                             key={article.id}
//                             id={article.id}
//                             img={article.main_image}
//                             description={article.description}
//                             stars={article.average_stars}
//                             votes={article.total_reviews}
//                             BoughtLastMonth={0}
//                             hasOffer={false}
//                             priceWithOffer={0}
//                             price={article.price}
//                             colors={article.colors ? article.colors.split(",") : []}
//                             canAddToCart={article.quantity > 0 ? true : false}
//                             averageStars={article.average_stars}
//                             totalReviews={article.total_reviews}
//                         />
//                     ))}
//                     {/* {articlesFromDirectCategory?.map((article) => (
//                         <ArticlesType3
//                             key={article.id}
//                             id={article.id}
//                             img={article.main_image}
//                             description={article.description}
//                             stars={4.1}
//                             votes={251}
//                             BoughtLastMonth={0}
//                             hasOffer={false}
//                             priceWithOffer={0}
//                             price={article.price}
//                             colors={article.colors ? article.colors.split(",") : []}
//                             canAddToCart={article.quantity > 0 ? true : false}
//                         />
//                     ))} */}

//                     {/* <ArticlesType3
//                         id={1}
//                         img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
//                         description="Moto G 5G | 2024 | Desbloqueado | hecho para US 4/128GB | Camarade ..."
//                         stars={4.1}
//                         votes={251}
//                         BoughtLastMonth={100}
//                         hasOffer={true}
//                         priceWithOffer={109}
//                         price={149}
//                         colors=""
//                     />
//                     <ArticlesType3
//                         id={2}
//                         img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
//                         description="Moto G 5G | 2024 | Desbloqueado | hecho para US 4/128GB | Camarade ..."
//                         stars={4.0}
//                         votes={251}
//                         BoughtLastMonth={100}
//                         hasOffer={true}
//                         priceWithOffer={109}
//                         price={149}
//                         colors=""
//                     />
//                     <ArticlesType3
//                         id={3}
//                         img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
//                         description="Moto G 5G | 2024 | Desbloqueado | hecho para US 4/128GB | Camarade ..."
//                         stars={4.0}
//                         votes={251}
//                         BoughtLastMonth={100}
//                         hasOffer={true}
//                         priceWithOffer={109}
//                         price={149}
//                         colors=""
//                     /> */}
//                     {/* <div className="flex h-72">
//                     <div className="w-2/5 bg-gray-500">
//                         <img
//                             className="w-full h-full object-contain"
//                             src="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
//                             alt=""
//                         />
//                     </div>
//                     <div className="w-3/5 p-3">
//                         <div>
//                             <p>Moto G 5G | 2024 | Desbloqueado | hecho para US 4/128GB | Camarade ...</p>
//                             <div className="flex items-center gap-2">
//                                 <p>4.0</p>
//                                 <div className="flex">
//                                     <Icon icon="material-symbols:star" className="text-orange-400" />
//                                     <Icon icon="material-symbols:star" className="text-orange-400" />
//                                     <Icon icon="material-symbols:star" className="text-orange-400" />
//                                     <Icon icon="material-symbols:star" className="text-orange-400" />
//                                     <Icon icon="material-symbols:star" className="text-orange-400" />
//                                 </div>
//                                 <p>(251)</p>
//                             </div>
//                         </div>
//                         <p>100+ comprados el mes pasado</p>
//                         <p>
//                             <span>US$</span>
//                             <span>109</span>
//                             <span>99</span>
//                             <span>PVPR</span>
//                             <span>US$149.00</span>
//                         </p>
//                         <div>
//                             <div>
//                                 <div className="w-3 h-3 bg-red-500"></div>
//                                 <div className="w-3 h-3 bg-red-500"></div>
//                                 <div className="w-3 h-3 bg-red-500"></div>
//                             </div>
//                         </div>
//                         <button className="bg-yellow-400 p-3 rounded-3xl w-full">Agregar al carrito</button>
//                     </div>
//                 </div> */}
//                 </div>
//             </div>
//             {/* <div className="m-4">
//                 <p>En tendencia</p>
//                 <div className="flex overflow-scroll gap-4">
//                     <Article
//                         id={4}
//                         img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
//                         description="Moto G 5G | 2024 | Desbloqueado | hecho para US 4/128GB | Camarade ..."
//                         stars={4.0}
//                         votes={251}
//                         BoughtLastMonth={100}
//                         hasOffer={true}
//                         priceWithOffer={109}
//                         price={149}
//                         colors=""
//                     />
//                     <Article
//                         id={5}
//                         img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
//                         description="Moto G 5G | 2024 | Desbloqueado | hecho para US 4/128GB | Camarade ..."
//                         stars={4.0}
//                         votes={251}
//                         BoughtLastMonth={100}
//                         hasOffer={true}
//                         priceWithOffer={109}
//                         price={149}
//                         colors=""
//                     />
//                 </div>
//             </div> */}

//             {/* <div className="m-4">
//                 <p>Consulta cada página del producto para ver otras opciones de compra.</p>
//                 <div className="flex flex-col gap-2">
//                     <ArticlesType3
//                         id={6}
//                         img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
//                         description="Moto G 5G | 2024 | Desbloqueado | hecho para US 4/128GB | Camarade ..."
//                         stars={4.1}
//                         votes={251}
//                         BoughtLastMonth={100}
//                         hasOffer={true}
//                         priceWithOffer={109}
//                         price={149}
//                         colors=""
//                     />
//                     <ArticlesType3
//                         id={7}
//                         img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
//                         description="Moto G 5G | 2024 | Desbloqueado | hecho para US 4/128GB | Camarade ..."
//                         stars={4.0}
//                         votes={251}
//                         BoughtLastMonth={100}
//                         hasOffer={true}
//                         priceWithOffer={109}
//                         price={149}
//                         colors=""
//                     />
//                     <ArticlesType3
//                         id={8}
//                         img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
//                         description="Moto G 5G | 2024 | Desbloqueado | hecho para US 4/128GB | Camarade ..."
//                         stars={4.0}
//                         votes={251}
//                         BoughtLastMonth={100}
//                         hasOffer={true}
//                         priceWithOffer={109}
//                         price={149}
//                         colors=""
//                     />
//                 </div>
//             </div> */}
//         </>
//     );
// };

// export default page;

// const Article = ({ id, img, description, stars, votes, BoughtLastMonth, hasOffer, priceWithOffer, price, colors }) => {
//     return (
//         <div className="flex flex-col h-96 border border-slate-100 rounded-lg overflow-hidden" style={{ minWidth: "240px", height: "500px" }}>
//             <div className="w-full bg-gray-500- bg-slate-100 relative h-3/5">
//                 <img className="w-full h-full object-contain" src={img} alt="" />
//                 <div className="bg-white rounded-full p-2 absolute bottom-2 left-2 shadow-black shadow">
//                     <Icon icon="tdesign:image-add" className="text-xl" />
//                 </div>
//             </div>
//             <div className="w-full p-3 relative h-2/5">
//                 <div>
//                     <p>{description}</p>
//                     <Stars totalPunctuation={2} reviews={1} />
//                 </div>
//                 <p>{BoughtLastMonth}+ comprados el mes pasado</p>
//                 <p>
//                     <span>US$</span>
//                     <span>{priceWithOffer}</span>
//                     <span>99</span>
//                     <span>PVPR</span>
//                     <span>US${price}.00</span>
//                 </p>
//                 {/* <Colors colors={["bg-slate-700", "bg-blue-700", "bg-green-700", "bg-violet-700"]} /> */}
//                 {/* <div className="absolute bottom-0 left-0 w-full p-3">
//                     <button className="bg-yellow-400 p-3 rounded-3xl w-full ">Agregar al carrito</button>
//                 </div> */}
//             </div>
//         </div>
//     );
// };
