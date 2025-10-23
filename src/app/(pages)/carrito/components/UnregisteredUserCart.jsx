"use client";

import React from "react";

// Icons
import { Icon } from "@iconify/react";

// Zustand
import appSettings from "@/app/zustand/app/zusApp";
import { zusUser } from "@/app/zustand/user/zusUser";

const UnregisteredUserCart = () => {
    const { appName } = appSettings();

    const { id, type, firstName } = zusUser();

    return (
        <div>
            <div className="m-4">
                <Icon icon="twemoji:shopping-cart" className="text-9xl mx-auto" />
                <div>
                    <div className="flex flex-col gap-3-">
                        <p className="text-2xl font-bold text-center">Tu carrito de {appName} esta vacio</p>
                        <p className="text-xl font-medium text-center text-gray-600">Nada de nada, ni mucho ni poco</p>
                        <p className="text-blue-700 font-semibold text-center mt-2">Compra las ofertas del dia</p>
                    </div>
                    {type == 0 && (
                        <div className="flex flex-col gap-5 mt-10">
                            <button className="bg-yellow-400 border border-black p-3 text-xl rounded-full border-none">
                                Inicia sesion en tu cuenta
                            </button>
                            <button className="bg-gray-200- border border-black p-3 text-xl rounded-full">Registrate gratis</button>
                        </div>
                    )}
                </div>
            </div>
            <div className="bg-slate-200 p-4">
                <div className="bg-white p-4">
                    {/* <p className="text-xl font-bold">Los nuevos clientes de distintos paises han comprado</p> */}
                    <p className="text-xl font-bold">Articulos mas comprados</p>
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
            </div>
            {/* //! TODO: agregar seccion productos mas vendidos */}
            <div className="bg-slate-200 p-4">
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
            </div>

            <div className="p-4">
                <button className="bg-yellow-400 p-3 rounded-3xl w-full">Seguir comprando</button>
            </div>
        </div>
    );
};

export default UnregisteredUserCart;

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
