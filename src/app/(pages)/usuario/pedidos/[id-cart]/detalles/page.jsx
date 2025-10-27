"use client";

// React
import React, { useEffect, useState } from "react";

// Next
import { useParams, useRouter } from "next/navigation";

// Icons
import { Icon } from "@iconify/react";

// Components
import Divider from "@/app/components/home/Divider";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import Spacer from "@/app/components/home/Spacer";

// Hooks
import { useGetArticleByIdCart } from "@/app/hooks/request/articles/requestsArticles";
import Image from "next/image";
import { calcPriceCurrency, getDateInSpanish, showDate, showOrderStatusForClient, showPrice, showText } from "@/app/hooks/app/app";
import { useGetOrderByIdCart } from "@/app/hooks/request/carts/requestsCarts";
import { useGetArticlesOrderByIdCart } from "@/app/hooks/request/articles/requestsArticlesCarts";
import ImageA from "@/app/components/others/ImageA";
import QRGenerator from "@/app/components/others/QRGenerator";
import FloatingMenuButtons from "@/app/components/home/FloatingMenuButtons";
import ArticleForCartBoughtDetail from "@/app/components/articles/ArticleForCartBoughtDetail";

const page = () => {
    const { ["id-cart"]: idCart } = useParams();

    const router = useRouter();

    // const { data: dataArticle, isLoading: isLoadingArticle } = useGetArticleByIdCart(idCart);

    const { data: dataOrder, isLoading: isLoadingOrder } = useGetOrderByIdCart(idCart);

    const { data: dataArticles, isLoading: isLoadingArticles } = useGetArticlesOrderByIdCart(idCart);

    useEffect(() => {
        console.warn(dataArticles);
    }, [dataArticles]);

    useEffect(() => {
        console.log(dataOrder);
    }, [dataOrder]);

    console.log(idCart);

    const [show, setShow] = useState(false);

    const [priceArticles, setPriceArticles] = useState({});

    const addPriceArticle = (id, dataPrice) => {
        setPriceArticles((prevPrices) => ({ ...prevPrices, [id]: dataPrice }));
    };

    useEffect(() => {
        console.log(priceArticles);
    }, [priceArticles]);

    if (isLoadingArticles || isLoadingOrder) return <LoadingParagraph />;

    return (
        <div className="m-4">
            {/* <BarcodeRedirect /> */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* <Icon icon="solar:arrow-left-outline" width="24" height="24" /> */}
                    <p className="text-2xl font-bold">Recibo de pedido</p>
                </div>
                <div className="relative">
                    <Icon className="text-black" icon="solar:menu-dots-circle-linear" width="24" height="24" onClick={() => setShow(!show)} />
                    <FloatingMenuButtons
                        show={show}
                        buttons={[
                            { text: "Compartir recibo", icon: "solar:menu-dots-circle-linear", onClick: () => {} },
                            { text: "Descargar pedido", icon: "solar:menu-dots-circle-linear", onClick: () => {} },
                            { text: "Imprimir pedido", icon: "solar:menu-dots-circle-linear", onClick: () => {} },
                            { text: "Cancelar pedido", icon: "solar:menu-dots-circle-linear", onClick: () => {} },
                            { text: "Cambiar imagen de comprobante", icon: "solar:menu-dots-circle-linear", onClick: () => {} },
                        ]}
                    />
                </div>
            </div>
            <Spacer />
            <div className="bg-white p-6 rounded-2xl flex flex-col gap-6">
                {dataArticles.map((article) => (
                    <ArticleForCartBoughtDetail
                        key={article.id}
                        id={article.id}
                        image={article.main_image}
                        name={article.name}
                        description={article.description}
                        quantity={article.quantity_order}
                        price={article.price_item}
                        idOffer={article.id_offer}
                        idCartBoughtItem={article.id_cart_bought_item}
                        addPriceArticle={addPriceArticle}
                    />
                    // <div key={article.id} className="flex">
                    //     <div className="w-1/5 grid place-items-center">
                    //         <ImageA className="size-14 object-cover rounded-full" src={article.main_image} />
                    //     </div>
                    //     <div className="flex flex-col w-4/5 justify-evenly">
                    //         <p className="text-xl font-bold">{article.name}</p>
                    //         <p className="text-gray-500 text-xs">{article.description}</p>
                    //     </div>
                    // </div>
                ))}

                {/* <div className="flex">
                    <div className="w-1/5 grid place-items-center">
                        <ImageA
                            className="size-14 object-cover rounded-full"
                            src="https://8cfbi9foz7.ufs.sh/f/0DUeKQjxChl7lBHUB6y7D4zVcm0fFoU6uJhKXLwTOIMGkjN3"
                        />
                    </div>
                    <div className="flex flex-col w-3/5 justify-evenly">
                        <p className="text-xl font-bold">Suga Leather Shoes</p>
                        <p className="text-gray-500 text-xs">Qty = 1</p>
                    </div>
                    <div className="flex flex-col w-1/5 justify-evenly items-end">
                        <p className="text-gray-500 text-xs">Color </p>
                        <p className="text-gray-500 text-xs">Size = 40</p>
                    </div>
                </div> */}
            </div>
            <Spacer />
            <div className="bg-white p-6 rounded-2xl flex flex-col gap-6">
                <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Total</p>
                    <p className="font-semibold">{showPrice(dataOrder.total)}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Descuento</p>
                    <p className="font-bold">{showPrice(dataOrder.total_discount)}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Comision</p>
                    <p className="font-bold">{showPrice(dataOrder.paypal_fee)}</p>
                </div>
                <Divider mt={0} mb={0} h={"0.5px"} />
                <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Total General</p>
                    <p className="font-bold">
                        {showPrice(Number(dataOrder.total) - Number(dataOrder.total_discount) + Number(dataOrder.paypal_fee))}
                    </p>
                </div>
            </div>
            {/* <div className="bg-white p-6 rounded-2xl flex flex-col gap-6">
                <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Total</p>
                    <p className="font-semibold">{showPrice(dataArticles.reduce((acc, cur) => acc + Number(cur.total_price), 0))}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Descuento</p>
                    <p className="font-bold">
                        {showPrice(dataArticles.reduce((acc, cur) => acc + Number(cur.total_price) - Number(cur.total_price_with_discount), 0))}
                    </p>
                </div>
                <Divider mt={0} mb={0} h={"0.5px"} />
                <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Total General</p>
                    <p className="font-bold">{showPrice(dataArticles.reduce((acc, cur) => acc + Number(cur.total_price_with_discount), 0))}</p>
                </div>
            </div> */}
            <Spacer />
            <div className="bg-white p-6 rounded-2xl flex flex-col gap-6">
                <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Codigo de orden</p>
                    <p className="font-semibold">{dataOrder.id_order.split("-")[0]}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Metodo de pago</p>
                    <p className="font-semibold">{dataOrder.name_pay_method}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Moneda</p>
                    <p className="font-semibold">{dataOrder.iso_code}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Lugar de entrega</p>
                    <p className="font-semibold">{dataOrder.want_use_address == 1 ? "Direccion seleccionada" : "Tienda seleccionada"}</p>
                </div>
                {dataOrder.want_use_address == 1 && (
                    <div className="flex justify-between">
                        <p className="text-gray-500 text-sm">Direccion</p>
                        <p className="font-semibold">
                            {dataOrder.address_1} {dataOrder.address_2}
                        </p>
                    </div>
                )}
                {dataOrder.want_use_address == 0 && (
                    <div className="flex justify-between">
                        <p className="text-gray-500 text-sm">Tienda</p>
                        <p className="font-semibold">{dataOrder.pickup_shop}</p>
                    </div>
                )}

                <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Estado de order</p>
                    <p className="font-bold">{showOrderStatusForClient(dataOrder.status_order, dataOrder.want_use_address == 1)}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Fecha de compra</p>
                    <p className="font-bold">{getDateInSpanish(dataOrder.created_at_order)}</p>
                </div>
            </div>

            {dataOrder.require_image == 1 && (
                <>
                    <Spacer />
                    <p className="text-2xl font-bold">Comprobante de tranferencia:</p>
                    <Spacer />
                    <div className="grid place-items-center">
                        <ImageA src={dataOrder.image} />
                    </div>
                    <Spacer />
                </>
            )}

            <p className="text-2xl font-bold">Codigo Qr:</p>
            <Spacer />
            <div className="grid place-items-center">
                <QRGenerator value={window.location.href} className="w-auto h-auto" />
            </div>
        </div>
    );

    if (isLoadingOrder || isLoadingArticles) return <LoadingParagraph />;
    return (
        <>
            <div className="flex gap-1 items-center bg-gray-300 p-4" onClick={() => router.back("/usuario/pedidos")}>
                <Icon icon="mingcute:left-line" width="24" height="24" />
                <p className="font-bold">Detalles del pedido</p>
            </div>
            <div className="m-4">
                <p className="font-bold text-2xl">Detalles del pedido</p>
                <div className="border-gray-600 rounded-xl p-4" style={{ borderWidth: "0.5px" }}>
                    <div className="flex">
                        <p className="w-2/5 text-gray-600">Pedido realizado</p>
                        <p className="w-3/5">{showDate(dataOrder.created_at_order)}</p>
                    </div>
                    <div className="flex">
                        <p className="w-2/5 text-gray-600">N. de pedido</p>
                        <p className="w-3/5">{dataOrder.id_order.split("-")[0]}</p>
                    </div>
                    <Divider h={"0.5px"} />
                    <div className="flex mx-4">
                        <p className="w-2/5">Ver recibo</p>
                        <div className="w-3/5 flex justify-end">
                            <Icon icon="weui:arrow-outlined" width="12" height="24" className="text-end" />
                        </div>
                    </div>
                    <Divider h={"0.5px"} mb={0} />
                </div>
            </div>
            <Spacer />
            <Divider h={3.5} />
            <Spacer />
            <div className="m-4">
                <div className="border-gray-600 rounded-xl p-4" style={{ borderWidth: "0.5px" }}>
                    <p className="font-bold text-xl">Entregado el 2 de mayo</p>
                    {dataArticles.map((article) => (
                        <div className="flex" key={article.id_cart_bought_item}>
                            <div className="w-1/3 text-gray-600 p-2">
                                {/* <img className="w-full " src={article.main_image} alt="" /> */}
                                <ImageA src={dataArticle.main_image} className="w-full" />
                            </div>
                            <div className="w-2/3 p-2 text-sm">
                                <p className="text-base font-semibold">{article.description}</p>
                                <p>
                                    Vendido por: <span className="text-blue-800">{article.name_shop}</span>
                                </p>
                                <p>La ventana de devolucion se cerro el 4 de junio de 2025</p>
                                <p>
                                    {dataOrder.iso_code}
                                    {dataOrder.symbol}
                                    {calcPriceCurrency(
                                        { main_currency: dataOrder.main_currency, exchange_rate: dataOrder.exchange_rate },
                                        Number(article.price_order) * article.quantity_order
                                    )}{" "}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* <div className="flex">
                        <p className="w-2/5 text-gray-600">N. de pedido</p>
                        <p className="w-3/5">hhh</p>
                    </div> */}
                    <Divider h={"0.5px"} />
                    <div className="flex mx-4">
                        <p className="w-2/5">Obtener soporte</p>
                        <div className="w-3/5 flex justify-end">
                            <Icon icon="weui:arrow-outlined" width="12" height="24" className="text-end" />
                        </div>
                    </div>
                    <Divider h={"0.5px"} />
                    <div className="flex mx-4">
                        <p className="w-2/5">Comprar nuevamente</p>
                        <div className="w-3/5 flex justify-end">
                            <Icon icon="weui:arrow-outlined" width="12" height="24" className="text-end" />
                        </div>
                    </div>
                    <Divider h={"0.5px"} />
                    <div className="flex mx-4">
                        <p className="w-2/5">Rastrear</p>
                        <div className="w-3/5 flex justify-end">
                            <Icon icon="weui:arrow-outlined" width="12" height="24" className="text-end" />
                        </div>
                    </div>
                    <Divider h={"0.5px"} />
                    <div className="flex mx-4">
                        <p className="w-2/5">Evaluar al vendedor</p>
                        <div className="w-3/5 flex justify-end">
                            <Icon icon="weui:arrow-outlined" width="12" height="24" className="text-end" />
                        </div>
                    </div>
                    <Divider h={"0.5px"} />
                    <div className="flex mx-4">
                        <p className="w-2/5">Escribir una opinion</p>
                        <div className="w-3/5 flex justify-end">
                            <Icon icon="weui:arrow-outlined" width="12" height="24" className="text-end" />
                        </div>
                    </div>
                    <Divider h={"0.5px"} mb={0} />
                </div>
            </div>
            <Spacer />
            <Divider h={3.5} mb={0} />
            {/* <Spacer /> */}
            <Spacer space={15} />
            <div className="m-4">
                <p className="font-bold text-xl">Metodos de pago</p>
                <Spacer space={15} />
                <div className="border-gray-600 rounded-xl p-4" style={{ borderWidth: "0.5px" }}>
                    <div className="flex">
                        <div className="w-full text-gray-600 p-2">
                            <p>{dataOrder.name_pay_method}</p>
                        </div>
                    </div>
                    <div className="w-full text-gray-600 p-2">
                        <div className="flex mx-4-">
                            <p className="w-4/5">Ver transacciones relacionadas</p>
                            <div className="w-1/5 flex justify-end">
                                <Icon icon="weui:arrow-outlined" width="12" height="24" className="text-end" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Spacer />
            <Divider h={3.5} mb={0} />
            {/* <Spacer /> */}
            {dataOrder.id_address && (
                <>
                    <Spacer space={15} />
                    <div className="m-4">
                        <p className="font-bold text-xl">Enviar a</p>
                        <Spacer space={15} />
                        <div className="border-gray-600 rounded-xl p-4" style={{ borderWidth: "0.5px" }}>
                            <div className="flex">
                                <div className="w-full text-gray-600 p-2">
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut voluptate, mollitia pariatur minima iusto
                                        laudantium sunt. Ducimus ut eum voluptates nesciunt sequi laudantium accusamus deleniti ipsam ex!
                                        Necessitatibus, nam molestiae?
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Spacer space={15} />
                    <Divider h={3.5} mb={0} />
                </>
            )}

            <Spacer space={15} />
            <div className="m-4">
                <p className="font-bold text-xl">Resumen del pedido</p>
                <Spacer space={15} />
                <div className="border-gray-600 rounded-xl p-4" style={{ borderWidth: "0.5px" }}>
                    <div className="flex">
                        <div className="w-2/3 text-gray-600 p-2">
                            <p>Productos:</p>
                        </div>
                        <div className="w-1/3 text-gray-600 p-2">
                            <p className="text-end">{dataOrder.iso_code} 6860.79</p>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-2/3 text-gray-600 p-2">
                            <p>Envio:</p>
                        </div>
                        <div className="w-1/3 text-gray-600 p-2">
                            <p className="text-end">{dataOrder.iso_code} 0.00</p>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-2/3 text-gray-600 p-2">
                            <p>Ofertas:</p>
                        </div>
                        <div className="w-1/3 text-gray-600 p-2">
                            <p className="text-end">{dataOrder.iso_code} 0.00</p>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-2/3 text-gray-600 p-2">
                            <p>Total:</p>
                        </div>
                        <div className="w-1/3 text-gray-600 p-2">
                            <p className="text-end">
                                {dataOrder.iso_code}{" "}
                                {calcPriceCurrency(
                                    { main_currency: dataOrder.main_currency, exchange_rate: dataOrder.exchange_rate },
                                    Number(dataOrder.total_price)
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Spacer />
        </>
    );
};

export default page;

const ArrowButton = ({ text, mt, mb, lt = true, lb = true }) => {
    return (
        <>
            {lt && <Divider />}
            <div className="flex justify-between items-center mx-4">
                <p>{text}</p>
                <Icon icon="weui:arrow-outlined" width="12" height="24" />
            </div>
            {lb && <Divider />}
        </>
    );
};

// const ImageA = ({ src, alt = "", width, height, className }) => {
//     const [size, setSize] = useState({ width: null, height: null });

//     useEffect(() => {
//         if (width || height) return;
//         const img = new window.Image();
//         img.src = src;
//         img.onload = () => {
//             setSize({
//                 width: img.naturalWidth,
//                 height: img.naturalHeight,
//             });
//         };
//     }, [src]);

//     return (
//         <Image
//             src={src}
//             alt={alt}
//             width={width ? width : size.width ? size.width : 0}
//             height={height ? height : size.height ? size.height : 0}
//             className={className}
//             priority
//         />
//     );
// };
