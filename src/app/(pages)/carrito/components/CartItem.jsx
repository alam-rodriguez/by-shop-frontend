import React, { useEffect, useState } from "react";

// Icons
import { Icon } from "@iconify/react";

// Hooks
import useApp from "@/app/hooks/app/useApp";
import { useUpdateCartItemQuantity, useUpdateCartItemStatus } from "@/app/hooks/request/carts/requestsCarts";
import { useGetArticleOffer } from "@/app/hooks/request/articles/requestsArticles";
import { calcPriceWithOffer } from "@/app/hooks/app/app";

const CartItem = ({ id, id_article, image, price, description, options, values, quantity, status, refetch }) => {
    const { showPrice } = useApp();

    const { data: offerArticle, isLoading: isLoadingOfferArticle } = useGetArticleOffer(id_article);

    const [offerName, setOfferName] = useState(null);
    const [offerPercentDiscount, setOfferPercentDiscount] = useState(0);

    useEffect(() => {
        if (isLoadingOfferArticle) return;
        console.log(offerArticle);
        if (!offerArticle.id) return;
        console.log(offerArticle);
        setOfferName(offerArticle.name);
        setOfferPercentDiscount(offerArticle.percent_discount);
    }, [offerArticle]);

    useEffect(() => {
        console.log(status);
    }, []);

    const [isChecked, setisChecked] = useState(status == 1);
    // const [quantity, setQuantity] = useState(1);

    const handleClick = async () => {
        const newStatus = !isChecked ? 1 : 2;
        console.log(newStatus);
        const res = await useUpdateCartItemStatus(id, newStatus);
        console.log(res);
        setisChecked((prev) => !prev);
        refetch();
    };

    const handleClickSetStatusStatus = async (status) => {
        const res = await useUpdateCartItemStatus(id, status);
        console.log(res);
        refetch();
    };

    // set-item-quantity

    const handleClickChangeCount = async (type = 1) => {
        const newQuantity = type == 1 ? quantity + 1 : quantity - 1;
        const res = await useUpdateCartItemQuantity(id, newQuantity);
        refetch();
    };

    return (
        <div className="w-full bg-gray-200/50 font-sans">
            <div className="w-full flex">
                <div className="w-5/12 p-2 h-60 relative">
                    <img className="w-full h-full object-contain" src={image} alt="" />
                    {/* <input type="checkbox" className="absolute top-0 left-0 m-6 w-6 h-6" checked={isChecked} onClick={handleClick} /> */}
                    <input type="checkbox" className="absolute top-0 left-0 m-6 w-6 h-6" checked={isChecked} onChange={handleClick} />
                </div>
                <div className="w-7/12 p-2">
                    <div>
                        <p className="text-sm">{description}</p>
                    </div>
                    {offerName && <p className="text-red-700 text-sm font-semibold">{offerName}</p>}

                    <div className="flex gap-2">
                        {offerPercentDiscount > 0 && (
                            <p className="bg-red-700 py-1 px-2 text-white rounded text-sm- inline-block mb-2 text-lg">
                                -{offerPercentDiscount.split(".")[0]}%
                            </p>
                        )}
                        <p className="flex justify-start font-semibold">
                            <span>us$</span>
                            <span className="text-2xl">{showPrice(offerName ? price : calcPriceWithOffer(price, offerPercentDiscount), true)}</span>
                            <span>{showPrice(price, false)}</span>
                        </p>
                    </div>
                    {offerName && (
                        <p className="text-gray-500 text-sm">
                            precio recomendado{" "}
                            <span className="line-through font-semibold">
                                {showPrice(offerName ? price : calcPriceWithOffer(price, offerPercentDiscount))}
                            </span>
                        </p>
                    )}
                    <p className="text-sm">
                        Entrega GRATIS el <span>mie, 26 de mar</span> en US$35 de articulo enviados por Amazon
                    </p>
                    <p className="text-sm text-blue-900">Devoluciones GRATUITAS</p>
                    <p className="text-sm text-green-900">DISPONIBLES</p>
                    {options != "" && values != "" && (
                        <>
                            <p className="text-sm font-semibold">Detalles:</p>
                            <p className="text-sm text-gray-500">
                                {options}: {values}
                            </p>
                        </>
                    )}
                </div>
            </div>
            <div className="w-full flex gap-y-3 gap-x-4 flex-wrap p-2">
                <div className="border-4 border-orange-300 rounded-2xl py-1 px-2 w-40 flex justify-between items-center">
                    {quantity == 1 ? (
                        <Icon icon="iconoir:trash" width="24" height="24" onClick={() => handleClickSetStatusStatus(0)} />
                    ) : (
                        // <Icon icon="fluent:subtract-12-filled" width="24" height="24" onClick={() => handleClickChangeCount(0)} />
                        // <Icon icon="fluent:subtract-12-regular" className="text-xl" onClick={() => handleClickChangeCount(0)} />
                        <Icon icon="fluent:subtract-12-filled" className="text-xl" onClick={() => handleClickChangeCount(0)} />
                    )}
                    <span>{quantity}</span>
                    <Icon icon="material-symbols:add-rounded" width="24" height="24" onClick={() => handleClickChangeCount(1)} />
                </div>
                {/* <div> */}
                <Button text="Eliminar" fn={() => handleClickSetStatusStatus(0)} />
                <Button text="Guardar para mas tarde" fn={() => handleClickSetStatusStatus(3)} />
                <Button text="Comparar con articulos similares" />
                {/* </div> */}
            </div>
        </div>
    );
};

export default CartItem;

const Button = ({ text, fn = () => {} }) => {
    return (
        <span className="py-2 px-3 border bg-white border-gray-700 rounded-2xl text-sm" onClick={fn}>
            {text}
        </span>
    );
};
