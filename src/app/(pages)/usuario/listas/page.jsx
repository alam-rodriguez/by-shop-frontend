"use client";

export const dynamic = "force-dynamic";

import Spacer from "@/app/components/home/Spacer";
import ImageA from "@/app/components/others/ImageA";
import useApp from "@/app/hooks/app/useApp";
import { zusUser } from "@/app/zustand/user/zusUser";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
    return (
        <div>
            <div className="p-4 bg-blue-700/5">
                <div className="flex justify-between items-center">
                    <p className="font-semibold">Listas y litas de regalo</p>
                    <div className="size-8 border border-black rounded-full bg-white">
                        <Icon icon="material-symbols-light:add" className="size-full" />
                    </div>
                </div>
                <div>
                    <div className="w-48 h-24 bg-white rounded-xl border border-gray-400 flex p-2 items-center gap-3">
                        <ImageA
                            className="w-1/3 object-cover h-full rounded-lg"
                            src="https://8cfbi9foz7.ufs.sh/f/0DUeKQjxChl7lBHUB6y7D4zVcm0fFoU6uJhKXLwTOIMGkjN3"
                        />
                        <p className="w-2/3 text-lg">Lista de compras</p>
                    </div>
                </div>
                <Spacer space={10} />
                <p className="text-blue-600 cursor-pointer">Ver todos</p>
            </div>
            <div className="m-4">
                <div className="flex justify-between">
                    <p className="font-bold">Todos los articulos guardados</p>
                    <p className="text-blue-600 cursor-pointer">Agregar producto</p>
                </div>
                <Spacer space={10} />
                <div className="flex gap-5 overflow-scroll flex-nowrap no-scrollbar">
                    <div className="border border-gray-700 rounded-lg py-1 px-3">
                        <p className="font-bold">Filtros</p>
                    </div>
                    <div className="border border-gray-700 rounded-lg py-1 px-3">
                        <p className="font-bold">Todo</p>
                    </div>
                    <div className="border border-gray-700 rounded-lg py-1 px-3">
                        <p className="font-bold">Todo</p>
                    </div>
                    <div className="border border-gray-700 rounded-lg py-1 px-3">
                        <p className="font-bold">Todo</p>
                    </div>
                    <div className="border border-gray-700 rounded-lg py-1 px-3">
                        <p className="font-bold">Todo</p>
                    </div>
                    <div className="border border-gray-700 rounded-lg py-1 px-3">
                        <p className="font-bold">Todo</p>
                    </div>
                </div>
                <div>
                    <Article
                        id="234567"
                        img="https://8cfbi9foz7.ufs.sh/f/0DUeKQjxChl7lBHUB6y7D4zVcm0fFoU6uJhKXLwTOIMGkjN3"
                        description="Apple funda transparente para iphone 16 pro max con magsafe ..."
                        stars={4}
                        votes={3022}
                        BoughtLastMonth={500}
                        // hasOffer,
                        // priceWithOffer,
                        price={39.99}
                        colors={[]}
                        averageStars={4}
                        totalReviews={3022}
                    />
                </div>
            </div>
        </div>
    );
};

export default page;

const Article = ({
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
                    {/* {totalReviews > 0 && <Stars average={averageStars} reviews={totalReviews} />} */}
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
                {/* <Colors colors={colors} /> */}
                <div className="absolute bottom-0 left-0 w-full p-3">
                    <button className="bg-yellow-400 p-3 rounded-3xl w-full" onClick={() => handleClickAddToCart(false)}>
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    );
};
