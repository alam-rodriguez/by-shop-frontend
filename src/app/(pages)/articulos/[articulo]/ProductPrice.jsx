"use client";
import React, { useEffect, useState } from "react";

// Hooks
import useApp from "@/app/hooks/app/useApp";

// Icons
import { Icon } from "@iconify/react";

// Zustand
import { zusArticles } from "@/app/zustand/articles/zusArticles";
import { calcPriceCurrency, calcPriceWithOffer } from "@/app/hooks/app/app";
import appSettings from "@/app/zustand/app/zusApp";

const ProductPrice = ({ hasOffer, priceWithOffer, price, availableQuantities, discountPercent, offerName, handleClickAddToCart, offerArticle }) => {
    const { discountPercentage, calcAvailableQuantities, showPrice } = useApp();

    const { mainCurrency } = appSettings();

    const { setQuantity } = zusArticles();

    const [options, setOptions] = useState([]);
    useEffect(() => {
        console.log(offerArticle);
        const options1 = [];
        for (let i = 1; i <= availableQuantities; i++) {
            options1.push(
                <option key={i} value={i}>
                    {i}
                </option>
            );
        }
        setOptions(options1);
    }, []);

    const [heightInfo, setHeightInfo] = useState("110px");

    const handleChangeHeightInfo = () => setHeightInfo((state) => (state == "auto" ? "110px" : "auto"));

    return (
        <div className="m-4">
            {offerArticle.id && <p className="bg-red-700 p-2 text-white rounded text-sm inline-block mb-2">{offerArticle.name}</p>}
            <p className="flex items-start">
                {offerArticle.id && <span className="text-red-700 text-3xl me-2">-{offerArticle.percent_discount.split(".")[0]}%</span>}
                <span>
                    {mainCurrency.iso_code}
                    {mainCurrency.symbol}
                </span>
                <span className="text-3xl">
                    {!offerArticle.id
                        ? showPrice(calcPriceCurrency(mainCurrency, price), true)
                        : showPrice(calcPriceWithOffer(calcPriceCurrency(mainCurrency, price), offerArticle.percent_discount), true)}
                </span>
                <span>
                    {!offerArticle.id
                        ? showPrice(calcPriceCurrency(mainCurrency, price), false)
                        : showPrice(calcPriceWithOffer(price, offerArticle.percent_discount), false)}
                </span>
            </p>
            <div className="text-sm text-gray-500 flex items-center gap-1">
                {offerArticle.id && (
                    <p>
                        precio recomendado: <span className="line-through">US$${price}</span>
                    </p>
                )}
                <Icon icon="ic:round-info" className="text-orange-400-" />
            </div>
            {availableQuantities <= 20 && <p className="text-red-700">{calcAvailableQuantities(availableQuantities)}</p>}

            <div className="flex flex-col gap-5">
                <select className="w-full border rounded-lg p-3 bg-gray-300" onChange={(e) => setQuantity(Number(e.target.value))}>
                    {options}
                </select>
                {/* {options && options.length > 0 && options} */}
                <button className="bg-yellow-400 p-3 rounded-3xl w-full mt-2" onClick={handleClickAddToCart}>
                    Agregar al carrito
                </button>
                <button className="bg-orange-400 p-3 rounded-3xl w-full">Comprar ahora</button>
                {/* // TODO: Las empresas y tal ves los articulos deben de tener una cantidad de dias para poder devolver o reembolsar el articulo */}
                <div>
                    <div className="flex flex-col gap-3" style={{ height: heightInfo, overflow: "hidden" }}>
                        <Item keyValue="Enviado por" value="Amazon.com" textBlue={false} />
                        <Item keyValue="Devoluciones" value="Devoluciones, reembosos o reemplazo gratis por 30 dias" textBlue={true} />
                        <Item keyValue="Pago" value="Pago seguro" textBlue={true} />
                        <Item keyValue="Opciones de regalo" value="Disponible al proceder el pago" textBlue={true} />
                    </div>
                    <div className="flex items-center gap-1 mt-5" onClick={handleChangeHeightInfo}>
                        <Icon icon="bitcoin-icons:caret-down-filled" className="text-xl" />
                        <p className="text-blue-800 text-xs">Ver {heightInfo == "auto" ? "menos" : "más"}</p>
                    </div>
                    <p className="text-blue-800 mt-5">agregar a la lista</p>
                </div>
            </div>
        </div>
    );
};

export default ProductPrice;

const Item = ({ keyValue, value, textBlue }) => {
    return (
        <div className="flex text-sm">
            <p className="w-1/4">{keyValue}</p>
            <p className={`w-3/4 ${textBlue ? "text-blue-800" : ""}`}>{value}</p>
        </div>
    );
};
