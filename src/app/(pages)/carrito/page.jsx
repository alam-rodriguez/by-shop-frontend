"use client";

import React, { useEffect } from "react";

// Icons
import { Icon } from "@iconify/react";

// Zustand
import appSettings from "@/app/zustand/app/zusApp";
import { zusUser } from "@/app/zustand/user/zusUser";

// Components
import UnregisteredUserCart from "./components/UnregisteredUserCart";
import CartItem from "./components/CartItem";
import {
    useGetCartUser,
    useGetCartUserSavedForLater,
    useUpdateCartItemQuantity,
    useUpdateCartItemStatus,
} from "@/app/hooks/request/carts/requestsCarts";
import { zusCart } from "@/app/zustand/user/zusCart";
import useApp from "@/app/hooks/app/useApp";
import CartItemSavedForLater from "./components/CartItemSavedForLater";
import Divider from "@/app/components/home/Divider";
import { useRouter } from "next/navigation";
import ImageA from "@/app/components/others/ImageA";
import Spacer from "@/app/components/home/Spacer";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import { isUUID, showPrice, showText } from "@/app/hooks/app/app";
import CartItem2 from "./components/CartItem2";
import { useGetCurrencyById } from "@/app/hooks/request/currencies/requestsCurrencies";
import useUserCartData from "./hooks/useUserCartData";
import { toast } from "sonner";

const page = () => {
    const router = useRouter();

    const { id, type, firstName, currencySelected, idCurrency: idCurrencyUser } = zusUser();
    const { price, discount, paypalFee, deliveryPrice, totalPrice, articlesCart, isLoadingArticlesCart, refetchArticlesCart } = useUserCartData(id);

    const { appName } = appSettings();
    const { totalSelectedArticles, totalSelectedPrice, setTotalSelectedArticles } = zusCart();

    // const { data, isLoading, refetch } = useGetCartUser(id);

    const { data: savedForLater, isLoading: isLoadingSavedForLater, refetch: refetchSavedForLater } = useGetCartUserSavedForLater(id);

    // const { data: currencySelectedByUser, isLoading: isLoadingCurrencySelectedByUser } = useGetCurrencyById(idCurrency);

    // useEffect(() => {
    //     console.error();
    // }, [currencySelected]);

    useEffect(() => {
        if (isLoadingArticlesCart || !isUUID(id)) return;
        console.log(articlesCart);
        console.log(currencySelected);
        if ((articlesCart, currencySelected)) setTotalSelectedArticles(articlesCart);
    }, [articlesCart]);

    const refreshCart = () => {
        refetch();
        refetchSavedForLater();
    };

    // const handleClickChangeCount = async (idCart, type = 1) => {
    //     const newQuantity = type == 1 ? quantity + 1 : quantity - 1;
    //     const res = await useUpdateCartItemQuantity(idCart, newQuantity);
    //     refetch();
    // };
    const handleClickChangeCount = async (idCart, quantity, operator = "+") => {
        const newQuantity = operator === "+" ? quantity + 1 : operator === "-" ? quantity - 1 : quantity;
        const res = await useUpdateCartItemQuantity(idCart, newQuantity);
        if (res) refetch();
        else alert("Error al cambiar la cantidad");
    };

    const handleClickSetStatusStatus = async (id, status) => {
        const res = await useUpdateCartItemStatus(id, status);
        console.log(res);
        refetch();
    };

    const handleClickGotoBuyCart = () => {
        if (articlesCart.length == 0) {
            toast.info("Tu carrito esta vacio, agrega articulos para continuar");
            return;
        }
        router.push("/carrito/comprar");
    };

    if (isLoadingArticlesCart || currencySelected == null) return <LoadingParagraph />;

    if (!isUUID(id)) return <LoadingParagraph text="Debes iniciar sesion" />;

    return (
        <div>
            <div className="m-4">
                <div className="flex gap-5 items-center">
                    <Icon className="size-6 text-red-700 text-base" icon="mdi:cart" />
                    <p className="font-bold text-base">{totalSelectedArticles} articulos en tu carrito</p>
                </div>
                <Spacer space={12} />
                <div className="flex gap-5 items-center">
                    <Icon className="size-6 text-red-700 text-base" icon="mdi:money" />
                    <p className="font-bold text-base">Total: {showPrice(price)}</p>
                </div>
                <Spacer />
                <div className="flex flex-col gap-6">
                    {articlesCart.map((articleCart) => (
                        <CartItem2
                            key={articleCart.id}
                            idCart={articleCart.id}
                            idArticle={articleCart.id_article}
                            quantity={articleCart.quantity}
                            image={articleCart.article_image}
                            articleName={articleCart.name}
                            articleDescription={articleCart.description}
                            articlePrice={parseFloat(articleCart.price) + parseFloat(articleCart.price_options)}
                            articleOptions={articleCart.options}
                            articleValues={articleCart.values}
                            exchangeRate={articleCart.exchange_rate}
                            isoCode={articleCart.iso_code}
                            refetch={refetchArticlesCart}
                        />
                        // <div key={articleCart.id} className="flex bg-white rounded-lg p-4 gap-4 shadow">
                        //     <div className="grid place-items-center p-1 w-1/4 bg-gray-200 rounded-md">
                        //         <ImageA className="w-full h-full object-contain" src={articleCart.article_image} />
                        //     </div>
                        //     <div className="w-3/4">
                        //         <div className="flex">
                        //             <div className="w-11/12">
                        //                 <p className="font-bold text-xl">{showText(articleCart.name, 21)}</p>
                        //                 <p className="font-bold text-xs text-gray-500">{showText(articleCart.description, 75)}</p>
                        //                 <p className="text-base text-gray-500">{articleCart.options}</p>
                        //             </div>
                        //             <Icon
                        //                 icon="stash:trash-can"
                        //                 className="w-1/12 text-3xl"
                        //                 onClick={() => handleClickSetStatusStatus(articleCart.id, 0)}
                        //             />
                        //         </div>

                        //         <div className="flex justify-between items-center w-full">
                        //             <p className="font-bold text-red-500 text-2xl">
                        //                 ${(articleCart.price * articleCart.quantity).toString().split(".")[0]}
                        //             </p>
                        //             <div className="flex items-center gap-1">
                        //                 <Icon
                        //                     className="size-6 text-gray-500"
                        //                     icon="carbon:subtract-alt"
                        //                     onClick={() => handleClickChangeCount(articleCart.id, articleCart.quantity, "-")}
                        //                 />
                        //                 <p className="text-2xl">{articleCart.quantity}</p>
                        //                 <Icon
                        //                     className="size-6 text-gray-500"
                        //                     icon="carbon:add-alt"
                        //                     onClick={() => handleClickChangeCount(articleCart.id, articleCart.quantity, "+")}
                        //                 />
                        //             </div>
                        //         </div>
                        //     </div>
                        // </div>
                    ))}
                    {/* <div className="flex bg-white rounded-lg p-4 gap-4 shadow">
                        <div className="grid place-items-center p-1 w-1/4 bg-gray-200 rounded-md">
                            <ImageA
                                className="w-full h-full object-contain"
                                src="https://8cfbi9foz7.ufs.sh/f/0DUeKQjxChl7lBHUB6y7D4zVcm0fFoU6uJhKXLwTOIMGkjN3"
                            />
                        </div>
                        <div className="w-3/4">
                            <p className="font-bold text-xl">Ipad Pro 12.9 inch</p>
                            <p className="text-base text-gray-500">256 GB</p>
                            <div className="flex justify-between items-center w-full">
                                <p className="font-bold text-red-500 text-2xl">$900</p>
                                <div className="flex items-center gap-1">
                                    <Icon className="size-6 text-gray-500" icon="carbon:subtract-alt" />
                                    <p className="text-2xl">1</p>
                                    <Icon className="size-6 text-gray-500" icon="carbon:add-alt" />
                                </div>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="flex bg-white rounded-lg p-4 gap-4">
                        <div className="grid place-items-center p-1 w-1/5 bg-gray-200 rounded-md">
                            <ImageA
                                className="w-full h-full object-contain"
                                src="https://8cfbi9foz7.ufs.sh/f/0DUeKQjxChl7lBHUB6y7D4zVcm0fFoU6uJhKXLwTOIMGkjN3"
                            />
                        </div>
                        <div className="w-4/5">
                            <p className="font-bold text-xl">Ipad Pro 12.9 inch</p>
                            <p className="text-base text-gray-500">256 GB</p>
                            <div className="flex justify-between items-center w-full">
                                <p className="font-bold text-red-500 text-2xl">$900</p>
                                <div className="flex items-center gap-1">
                                    <Icon className="size-6 text-gray-500" icon="carbon:subtract-alt" />
                                    <p className="text-2xl">1</p>
                                    <Icon className="size-6 text-gray-500" icon="carbon:add-alt" />
                                </div>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="flex bg-white rounded-lg p-4 gap-4">
                        <div className="grid place-items-center p-1 w-1/5 bg-gray-200 rounded-md">
                            <ImageA
                                className="w-full h-full object-contain"
                                src="https://8cfbi9foz7.ufs.sh/f/0DUeKQjxChl7lBHUB6y7D4zVcm0fFoU6uJhKXLwTOIMGkjN3"
                            />
                        </div>
                        <div className="w-4/5">
                            <p className="font-bold text-xl">Ipad Pro 12.9 inch</p>
                            <p className="text-base text-gray-500">256 GB</p>
                            <div className="flex justify-between items-center w-full">
                                <p className="font-bold text-red-500 text-2xl">$900</p>
                                <div className="flex items-center gap-1">
                                    <Icon className="size-6 text-gray-500" icon="carbon:subtract-alt" />
                                    <p className="text-2xl">1</p>
                                    <Icon className="size-6 text-gray-500" icon="carbon:add-alt" />
                                </div>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="flex bg-white rounded-lg p-4 gap-4">
                        <div className="grid place-items-center p-1 w-1/5 bg-gray-200 rounded-md">
                            <ImageA
                                className="w-full h-full object-contain"
                                src="https://8cfbi9foz7.ufs.sh/f/0DUeKQjxChl7lBHUB6y7D4zVcm0fFoU6uJhKXLwTOIMGkjN3"
                            />
                        </div>
                        <div className="w-4/5">
                            <p className="font-bold text-xl">Ipad Pro 12.9 inch</p>
                            <p className="text-base text-gray-500">256 GB</p>
                            <div className="flex justify-between items-center w-full">
                                <p className="font-bold text-red-500 text-2xl">$900</p>
                                <div className="flex items-center gap-1">
                                    <Icon className="size-6 text-gray-500" icon="carbon:subtract-alt" />
                                    <p className="text-2xl">1</p>
                                    <Icon className="size-6 text-gray-500" icon="carbon:add-alt" />
                                </div>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="flex bg-white rounded-lg p-4 gap-4">
                        <div className="grid place-items-center p-1 w-1/5 bg-gray-200 rounded-md">
                            <ImageA
                                className="w-full h-full object-contain"
                                src="https://8cfbi9foz7.ufs.sh/f/0DUeKQjxChl7lBHUB6y7D4zVcm0fFoU6uJhKXLwTOIMGkjN3"
                            />
                        </div>
                        <div className="w-4/5">
                            <p className="font-bold text-xl">Ipad Pro 12.9 inch</p>
                            <p className="text-base text-gray-500">256 GB</p>
                            <div className="flex justify-between items-center w-full">
                                <p className="font-bold text-red-500 text-2xl">$900</p>
                                <div className="flex items-center gap-1">
                                    <Icon className="size-6 text-gray-500" icon="carbon:subtract-alt" />
                                    <p className="text-2xl">1</p>
                                    <Icon className="size-6 text-gray-500" icon="carbon:add-alt" />
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>

                <Spacer />

                <button className="bg-red-500 text-white p-3 rounded-lg w-full text-base" onClick={handleClickGotoBuyCart}>
                    Comprar
                </button>
            </div>
        </div>
    );

    if (isLoading) return <>Cargando</>;

    // if (type == 0 || data.length == 0) return <UnregisteredUserCart />;
    if (type == 0) return <UnregisteredUserCart />;

    return (
        <div>
            <div className="m-4">
                <div className="m-4">
                    <Icon icon="twemoji:shopping-cart" className="text-9xl mx-auto" />
                    <div>
                        <div className="flex flex-col gap-3-">
                            <p className="text-2xl font-bold text-center">Tu carrito de {appName} esta vacio</p>
                            <p className="text-xl font-medium text-center text-gray-600">Nada de nada, ni mucho ni poco</p>
                            <p className="text-blue-700 font-semibold text-center mt-2">Compra las ofertas del dia</p>
                        </div>
                    </div>
                </div>
                {data.length > 0 && (
                    <>
                        <div>
                            <div className="flex gap-2">
                                <p className="text-lg">Subtotal</p>
                                <p className="flex items-start tracking-tight leading-tight ">
                                    <span>us$</span>
                                    <span className="text-xl font-semibold">{showPrice(totalSelectedPrice, true)}</span>
                                    <span>{showPrice(totalSelectedPrice, false)}</span>
                                </p>
                            </div>
                            {/* <div>
                        <i></i>
                        <p>
                            <span>Una parte de tu pedido califica para enbio GRATIS</span>
                            <span>seleciona esta option al tramitar el pedido</span>
                            <span>Ver mas detalles</span>
                        </p>
                    </div> */}

                            <div className="flex flex-col gap-5 mt-10">
                                <button
                                    className="bg-yellow-400 border border-black p-3 text-xl rounded-full border-none"
                                    onClick={() => router.push("/carrito/comprar")}
                                >
                                    Proceder al pago de ({totalSelectedArticles} productos)
                                </button>
                            </div>
                        </div>
                        <br />

                        <hr />
                        <p>seleccionar todos los articulos</p>

                        <br />

                        <div className="flex flex-col gap-4">
                            {data.map((cartItem) => (
                                <CartItem
                                    key={cartItem.id}
                                    id={cartItem.id}
                                    id_article={cartItem.id_article}
                                    image={cartItem.article_image}
                                    price={(cartItem.price + cartItem.price_options) * cartItem.quantity}
                                    description={cartItem.description}
                                    options={cartItem.options}
                                    values={cartItem.values}
                                    quantity={cartItem.quantity}
                                    status={cartItem.status}
                                    refetch={refreshCart}
                                />
                            ))}
                            {/* 
                    <div>
                        <div>
                            <img
                                src="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                                alt=""
                            />
                            <input type="checkbox" />
                        </div>
                        <div>
                            <p>Camiseta vintage desgastada con logotipo Nodejs Programador Desarr...</p>
                        </div>
                        <p>
                            <span>us$</span>
                            <span>18</span>
                            <span>99</span>
                        </p>
                        <p>
                            Entrega GRATIS el <span>mie, 26 de mar</span> en US$35 de articulo enviados por Amazon
                        </p>
                        <p>Devoluciones GRATUITAS</p>
                        <p>DISPONIBLES</p>
                        <p>Detalles:</p>
                        <p>Talle/Tamano/Color: Hombre/XL/Gris jaspeado</p>
                    </div>
                    <div>
                        <div>
                            <i></i>
                            <span>1</span>
                            <i></i>
                        </div>
                        <div>Eliminar</div>
                    </div> */}
                        </div>
                    </>
                )}

                <br />

                {/* <div className="w-1/5 flex justify-center">
                    <Icon icon="twemoji:shopping-cart" className="text-7xl" />
                </div> */}
                {/* <div className="w-4/5"> */}
                {/* <div className="flex flex-col gap-3-">
                        <p className="text-2xl font-bold text-start">Tu carrito de {appName} esta vacio</p>
                        <p className="text-xl font-medium text-start text-gray-600">Aqui van cosas buenas</p>
                        <p className="text-blue-700 font-semibold text-start mt-2">Continuar desde donde te quedaste</p>
                    </div> */}
                {/* <div className="flex flex-col gap-5 mt-10">
                        <button className="bg-yellow-400 border border-black p-3 text-xl rounded-full border-none">Inicia sesion en tu cuenta</button>
                        <button className="bg-gray-200- border border-black p-3 text-xl rounded-full">Registrate gratis</button>
                    </div> */}
                {/* </div> */}
            </div>
            {/* <div className="m-4 flex justify-between items-center gap-5 border  border-gray-500 rounded-lg">
                <Icon icon="fluent-emoji:credit-card" className="text-9xl" />
                <p className="text-center">Hi {firstName}, Get $5 when you add a debit card or credit card to your account</p>
            </div> */}
            {/* <hr /> */}
            <Divider h={25} />
            {!isLoadingSavedForLater && (
                <div className="bg-slate-200_ p-4">
                    <p className="font-bold text-xl">Guardado para despues ({savedForLater.length} Productos)</p>
                    <div className="flex flex-col gap-4">
                        {savedForLater.map((cartItem) => (
                            <CartItemSavedForLater
                                key={cartItem.id}
                                id={cartItem.id}
                                image={cartItem.article_image}
                                price={(cartItem.price + cartItem.price_options) * cartItem.quantity}
                                description={cartItem.description}
                                options={cartItem.options}
                                values={cartItem.values}
                                quantity={cartItem.quantity}
                                status={cartItem.status}
                                refetch={refreshCart}
                            />
                        ))}
                    </div>
                </div>
            )}
            {/* <div className="bg-slate-200 p-4">
                <div className="bg-white p-4">
                    <p className="text-xl font-bold">Los nuevos clientes de distintos paises han comprado</p>
                    <div className="flex gap-5 overflow-scroll">
                        <Article
                            img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                            text1="RECETA LEGA: 7..."
                            text2="Lic. Pantaleon Mieses"
                            price={20}
                        />
                        <Article
                            img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                            text1="RECETA LEGA: 7..."
                            text2="Lic. Pantaleon Mieses"
                            price={20}
                        />
                        <Article
                            img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                            text1="RECETA LEGA: 7..."
                            text2="Lic. Pantaleon Mieses"
                            price={20}
                        />
                    </div>
                </div>
            </div> */}
            {/* <div className="bg-slate-200 p-4">
                <div className="bg-white p-4">
                    <p className="text-xl font-bold">Los nuevos clientes de distintos paises han comprado</p>
                    <div className="flex gap-5 overflow-scroll">
                        <Article
                            img="https://media.ldlc.com/ld/products/00/04/65/15/LD0004651580_2.jpg"
                            text1="RECETA LEGA: 7..."
                            text2="Lic. Pantaleon Mieses"
                            price={20}
                        />
                        <Article
                            img="https://media.ldlc.com/ld/products/00/04/65/15/LD0004651580_2.jpg"
                            text1="RECETA LEGA: 7..."
                            text2="Lic. Pantaleon Mieses"
                            price={20}
                        />
                        <Article
                            img="https://media.ldlc.com/ld/products/00/04/65/15/LD0004651580_2.jpg"
                            text1="RECETA LEGA: 7..."
                            text2="Lic. Pantaleon Mieses"
                            price={20}
                        />
                        <Article
                            img="https://media.ldlc.com/ld/products/00/04/65/15/LD0004651580_2.jpg"
                            text1="RECETA LEGA: 7..."
                            text2="Lic. Pantaleon Mieses"
                            price={20}
                        />
                        <Article
                            img="https://media.ldlc.com/ld/products/00/04/65/15/LD0004651580_2.jpg"
                            text1="RECETA LEGA: 7..."
                            text2="Lic. Pantaleon Mieses"
                            price={20}
                        />
                        <Article
                            img="https://media.ldlc.com/ld/products/00/04/65/15/LD0004651580_2.jpg"
                            text1="RECETA LEGA: 7..."
                            text2="Lic. Pantaleon Mieses"
                            price={20}
                        />
                    </div>
                </div>
            </div> */}
            <div className="p-4">
                <button className="bg-yellow-400 p-3 rounded-3xl w-full">Seguir comprando</button>
            </div>
        </div>
    );
};

export default page;

const Article = ({ id, img, text1, text2, price }) => {
    return (
        <div className="w-48- min-w-36" /*style={{ width: "calc(50% - 10px)" }} */>
            <div className="h-56- h-36 overflow-hidden">
                <img className="object-contain h-full w-full" src={img} alt="" />
            </div>
            <div>
                <p>{text1}</p>
                <p>{text2}</p>
                <div className="flex items-center">
                    <Icon icon="material-symbols:star" className="text-orange-400" />
                    <Icon icon="material-symbols:star" className="text-orange-400" />
                    <Icon icon="material-symbols:star" className="text-orange-400" />
                    <Icon icon="material-symbols:star" className="text-orange-400" />
                    <Icon icon="material-symbols:star" className="text-orange-400" />
                    <p>5</p>
                </div>
                <p>US${price}.00</p>
                <button className="bg-yellow-400 p-3 rounded-3xl w-full text-nowrap">Agregar al carrito</button>
            </div>
        </div>
    );
};
