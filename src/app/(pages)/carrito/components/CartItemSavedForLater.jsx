import React, { useEffect, useState } from "react";

// Icons
import { Icon } from "@iconify/react";

// Hooks
import useApp from "@/app/hooks/app/useApp";
import { useUpdateCartItemQuantity, useUpdateCartItemStatus } from "@/app/hooks/request/carts/requestsCarts";

const CartItemSavedForLater = ({ id, image, price, description, options, values, quantity, status, refetch }) => {
    const { showPrice } = useApp();

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
                </div>
                <div className="w-7/12 p-2">
                    <div>
                        <p className="text-sm">{description}</p>
                    </div>
                    <p className="flex justify-start font-semibold">
                        <span>us$</span>
                        <span className="text-2xl">{showPrice(price, true)}</span>
                        <span>{showPrice(price, false)}</span>
                    </p>
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
                {/* <div className="border-4 border-orange-300 rounded-2xl py-1 px-2 w-40 flex justify-between items-center">
                    {quantity == 1 ? (
                        <Icon icon="iconoir:trash" width="24" height="24" onClick={() => handleClickSetStatusStatus(0)} />
                    ) : (
                        // <Icon icon="fluent:subtract-12-filled" width="24" height="24" onClick={() => handleClickChangeCount(0)} />
                        // <Icon icon="fluent:subtract-12-regular" className="text-xl" onClick={() => handleClickChangeCount(0)} />
                        <Icon icon="fluent:subtract-12-filled" className="text-xl" onClick={() => handleClickChangeCount(0)} />
                    )}
                    <span>{quantity}</span>
                    <Icon icon="material-symbols:add-rounded" width="24" height="24" onClick={() => handleClickChangeCount(1)} />
                </div> */}
                {/* <div> */}
                <Button text="Eliminar" fn={() => handleClickSetStatusStatus(0)} />
                <Button text="Compara" fn={() => handleClickSetStatusStatus(3)} />
                <Button text="Mover al carrito" fn={() => handleClickSetStatusStatus(1)} />
                {/* </div> */}
            </div>
        </div>
    );
};

export default CartItemSavedForLater;

const Button = ({ text, fn = () => {} }) => {
    return (
        <span className="py-2 px-3 border bg-white border-gray-700 rounded-2xl text-sm" onClick={fn}>
            {text}
        </span>
    );
};
