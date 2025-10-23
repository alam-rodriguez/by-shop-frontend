"use client";
import React, { useEffect, useState } from "react";

// Icons
import { Icon } from "@iconify/react";

// Components
import Stars from "./Stars";
import useApp from "@/app/hooks/app/useApp";
import { useRouter } from "next/navigation";
import { zusUser } from "@/app/zustand/user/zusUser";
import { useCreateCartItem } from "@/app/hooks/request/carts/requestsCarts";
import { toast } from "sonner";

const ArticlesType3 = ({
    id,
    img,
    description,
    stars,
    votes,
    BoughtLastMonth,
    hasOffer,
    priceWithOffer,
    price,
    colors = [],
    averageStars,
    totalReviews,
}) => {
    // useEffect(() => {
    //     if (typeof colors == "string") colors = [];
    // }, []);

    const { id: id_user } = zusUser();

    const { showPrice } = useApp();

    const router = useRouter();

    const handleClick = (navigate = true) => {
        if (!navigate) return;
        router.push(`/articulos/${id}`);
    };
    // const handleClick = () => {};

    // const handleClickAddToCart = () => {
    //     console.log(id);
    //     // console.log("Agregar al carrito");
    //     // Aquí puedes agregar la lógica para agregar el artículo al carrito
    // };

    const handleClickAddToCart = async () => {
        const loadingToast = toast.loading("Actualizando oferta...");

        const res = await useCreateCartItem(id, 1, id_user);
        console.log(res);
        if (res.id)
            toast.success("Articulo agregado al carrito", {
                id: loadingToast,
            });
        else
            toast.error("Error al agregar al carrito", {
                id: loadingToast,
            });

        // const resOPtions = await useCreateCartItemOption(res, optionsSelected, id_user);
        // console.log(resOPtions);
        // if (resOPtions) alert("Agregado a carrito");
    };

    return (
        <div className="flex h-72 border border-slate-100" onClick={handleClick}>
            <div className="w-2/5 bg-gray-500- bg-slate-100 relative">
                <img className="w-full h-full object-contain" src={img} alt="" />
                <div className="bg-white rounded-full p-2 absolute bottom-2 left-2 shadow-black shadow">
                    <Icon icon="tdesign:image-add" className="text-xl" />
                </div>
            </div>
            <div className="w-3/5 p-3 relative">
                <div>
                    <p>{description}</p>
                    {totalReviews > 0 && <Stars average={averageStars} reviews={totalReviews} />}
                    {/* <div className="flex items-center gap-2">
                        <p>{stars}</p>
                        <div className="flex">
                            <Icon icon="material-symbols:star" className="text-orange-400" />
                            <Icon icon="material-symbols:star" className="text-orange-400" />
                            <Icon icon="material-symbols:star" className="text-orange-400" />
                            <Icon icon="material-symbols:star" className="text-orange-400" />
                            <Icon icon="material-symbols:star" className="text-orange-400" />
                        </div>
                        <p>({votes})</p>
                    </div> */}
                </div>
                <p>{BoughtLastMonth}+ comprados el mes pasado</p>
                {/* <p>
                    <span>US$</span>
                    <span>{priceWithOffer}</span>
                    <span>99</span>
                    <span>PVPR</span>
                    <span>US${price}.00</span>
                </p> */}
                <p className="flex items-start text-xs font-light">
                    <span>US$</span>
                    <span className="text-2xl leading-none font-medium">{showPrice(price, true)}</span>
                    <span>{showPrice(price, false)}</span>
                </p>
                {/* <div className="flex gap-3">
                    <div className="border-blue-950 rounded-full" style={{ padding: 2, borderWidth: 1.5 }}>
                        <div className="w-4 h-4 bg-slate-700 rounded-full"></div>
                    </div>
                    <div className="border-blue-950 rounded-full" style={{ padding: 2, borderWidth: 1.5 }}>
                        <div className="w-4 h-4 bg-blue-700 rounded-full"></div>
                    </div>
                    <div className="border-blue-950 rounded-full" style={{ padding: 2, borderWidth: 1.5 }}>
                        <div className="w-4 h-4 bg-green-700 rounded-full"></div>
                    </div>
                    <div className="border-blue-950 rounded-full" style={{ padding: 2, borderWidth: 1.5 }}>
                        <div className="w-4 h-4 bg-violet-700 rounded-full"></div>
                    </div>
                </div> */}
                <Colors colors={colors} />
                <div className="absolute bottom-0 left-0 w-full p-3">
                    <button className="bg-yellow-400 p-3 rounded-3xl w-full" onClick={() => handleClickAddToCart(false)}>
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ArticlesType3;

const Colors = ({ colors }) => {
    const [colorsJSX, setColorsJSX] = useState([]);

    useEffect(() => {
        setColorsJSX([]);
        if (colors) {
            console.log(colors);
            colors.forEach((color, i) => {
                if (i == 2) return;
                setColorsJSX((state) => [...state, <Color key={i} color={color} isSelected={i == 0 ? true : false} />]);
            });
        }
    }, []);

    return (
        <div className="flex gap-3">
            {colorsJSX}
            {colors != "" && colors.length > 3 ? <p className="text-slate-700 underline leading-tight">+{colors.length - 3} </p> : null}
            {/* <Color color="bg-slate-700" isSelected={true} />
            <Color color="bg-blue-700" />
            <Color color="bg-green-700" />
            <Color color="bg-violet-700" /> */}
        </div>
    );
};

const Color = ({ color, isSelected }) => {
    return (
        <div className={`${isSelected ? "border-blue-950 rounded-full" : "border-transparent"}`} style={{ padding: 2, borderWidth: 1.5 }}>
            <div className={`w-4 h-4 rounded-full`} style={{ backgroundColor: color }}></div>
        </div>
    );
};
