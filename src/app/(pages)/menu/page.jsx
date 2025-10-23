"use client";

import { confirmAlert } from "react-confirm-alert";

import Divider from "@/app/components/home/Divider";
import { zusUser } from "@/app/zustand/user/zusUser";
import { Icon } from "@iconify/react";
import React from "react";
import PageUserType0 from "./user-type-0/PageUserType0";
import { useLogout } from "@/app/hooks/request/users/requestsUsers";
import useAlert from "@/app/alerts/react-confirm-alert/useAlert";
import { toast, Toaster } from "sonner";

const page = () => {
    const { id, firstNames, lastNames, registrationDate, type, setUserInfo } = zusUser();

    const { confirmAlertCustom } = useAlert();

    if (type == 0) return <PageUserType0 />;

    const handleClickLogout = async () => {
        const want = await confirmAlertCustom({
            head: "Confirmar Cierre de Sesión",
            content: `${firstNames} ${lastNames}, Estas a punto de cerra la sesion de las aplicaciones de amazon de este dispositivo.`,
            confirmText: "Sí",
            cancelText: "No",
        });

        if (!want) return;

        const { message, status } = await useLogout();
        if (status != 200) return;
        setUserInfo({
            id: "",
            firstName: "",
            firstNames: "",
            lastNames: "",
            registrationDate: "",
            type: 0,
            canBuy: 0,
            email: "",
            password: "",
            direction: {},
        });
        toast.info("Sesion cerrada");
    };

    return (
        <div className="mb-40">
            <Toaster richColors />
            <div className="m-4">
                <p className="text-xl font-semibold mb-5">Tus atajos</p>
                <div className="flex justify-between flex-wrap gap-12">
                    <Item icon="emojione:shopping-bags" text="Pedidos" />
                    <Item icon="emojione:shopping-bags" text="Pedidos" />
                    <Item icon="emojione:shopping-bags" text="Pedidos" />
                    <Item icon="emojione:shopping-bags" text="Pedidos" />
                    <Item icon="emojione:shopping-bags" text="Pedidos" />
                    <Item icon="emojione:shopping-bags" text="Pedidos" />
                    <Item icon="emojione:shopping-bags" text="Pedidos" />
                    <Item icon="emojione:shopping-bags" text="Pedidos" />
                </div>
            </div>
            <Divider mt={50} h={2.5} />
            <div className="m-4">
                <p className="text-xl font-semibold mb-5">Compra por categorias</p>
                <div className="flex justify-between flex-wrap gap-4">
                    <ItemCategoria
                        category="Prime"
                        img="https://th.bing.com/th/id/R.c3d543462e93543d5602fa7eebeb4275?rik=%2bx86bVk8HquhWA&pid=ImgRaw&r=0"
                    />
                    <ItemCategoria
                        category="Prime"
                        img="https://th.bing.com/th/id/R.c3d543462e93543d5602fa7eebeb4275?rik=%2bx86bVk8HquhWA&pid=ImgRaw&r=0"
                    />
                    <ItemCategoria
                        category="Prime"
                        img="https://th.bing.com/th/id/R.c3d543462e93543d5602fa7eebeb4275?rik=%2bx86bVk8HquhWA&pid=ImgRaw&r=0"
                    />
                    <ItemCategoria
                        category="Prime"
                        img="https://th.bing.com/th/id/R.c3d543462e93543d5602fa7eebeb4275?rik=%2bx86bVk8HquhWA&pid=ImgRaw&r=0"
                    />
                    <ItemCategoria
                        category="Prime"
                        img="https://th.bing.com/th/id/R.c3d543462e93543d5602fa7eebeb4275?rik=%2bx86bVk8HquhWA&pid=ImgRaw&r=0"
                    />
                    <ItemCategoria
                        category="Prime"
                        img="https://th.bing.com/th/id/R.c3d543462e93543d5602fa7eebeb4275?rik=%2bx86bVk8HquhWA&pid=ImgRaw&r=0"
                    />{" "}
                    <ItemCategoria
                        category="Prime"
                        img="https://th.bing.com/th/id/R.c3d543462e93543d5602fa7eebeb4275?rik=%2bx86bVk8HquhWA&pid=ImgRaw&r=0"
                    />
                    <ItemCategoria
                        category="Prime"
                        img="https://th.bing.com/th/id/R.c3d543462e93543d5602fa7eebeb4275?rik=%2bx86bVk8HquhWA&pid=ImgRaw&r=0"
                    />
                    <ItemCategoria
                        category="Prime"
                        img="https://th.bing.com/th/id/R.c3d543462e93543d5602fa7eebeb4275?rik=%2bx86bVk8HquhWA&pid=ImgRaw&r=0"
                    />{" "}
                    <ItemCategoria
                        category="Prime"
                        img="https://th.bing.com/th/id/R.c3d543462e93543d5602fa7eebeb4275?rik=%2bx86bVk8HquhWA&pid=ImgRaw&r=0"
                    />
                    <ItemCategoria
                        category="Prime"
                        img="https://th.bing.com/th/id/R.c3d543462e93543d5602fa7eebeb4275?rik=%2bx86bVk8HquhWA&pid=ImgRaw&r=0"
                    />
                    <ItemCategoria
                        category="Prime"
                        img="https://th.bing.com/th/id/R.c3d543462e93543d5602fa7eebeb4275?rik=%2bx86bVk8HquhWA&pid=ImgRaw&r=0"
                    />{" "}
                    <ItemCategoria
                        category="Prime"
                        img="https://th.bing.com/th/id/R.c3d543462e93543d5602fa7eebeb4275?rik=%2bx86bVk8HquhWA&pid=ImgRaw&r=0"
                    />
                    <ItemCategoria
                        category="Prime"
                        img="https://th.bing.com/th/id/R.c3d543462e93543d5602fa7eebeb4275?rik=%2bx86bVk8HquhWA&pid=ImgRaw&r=0"
                    />
                    <ItemCategoria
                        category="Prime"
                        img="https://th.bing.com/th/id/R.c3d543462e93543d5602fa7eebeb4275?rik=%2bx86bVk8HquhWA&pid=ImgRaw&r=0"
                    />{" "}
                    <ItemCategoria
                        category="Prime"
                        img="https://th.bing.com/th/id/R.c3d543462e93543d5602fa7eebeb4275?rik=%2bx86bVk8HquhWA&pid=ImgRaw&r=0"
                    />
                    <ItemCategoria
                        category="Prime"
                        img="https://th.bing.com/th/id/R.c3d543462e93543d5602fa7eebeb4275?rik=%2bx86bVk8HquhWA&pid=ImgRaw&r=0"
                    />
                    <ItemCategoria
                        category="Prime"
                        img="https://th.bing.com/th/id/R.c3d543462e93543d5602fa7eebeb4275?rik=%2bx86bVk8HquhWA&pid=ImgRaw&r=0"
                    />{" "}
                    <ItemCategoria
                        category="Prime"
                        img="https://th.bing.com/th/id/R.c3d543462e93543d5602fa7eebeb4275?rik=%2bx86bVk8HquhWA&pid=ImgRaw&r=0"
                    />
                    <ItemCategoria
                        category="Prime"
                        img="https://th.bing.com/th/id/R.c3d543462e93543d5602fa7eebeb4275?rik=%2bx86bVk8HquhWA&pid=ImgRaw&r=0"
                    />
                    <ItemCategoria
                        category="Prime"
                        img="https://th.bing.com/th/id/R.c3d543462e93543d5602fa7eebeb4275?rik=%2bx86bVk8HquhWA&pid=ImgRaw&r=0"
                    />
                </div>
            </div>

            <div className="m-4 flex flex-col gap-5">
                <button className="flex justify-between items-center bg-red-300- w-full border border-blue-500 py-3 px-5 rounded-xl shadow-xl">
                    <p className="text-lg font-semibold">Cambiar de cuenta </p>
                    <Icon icon="icon-park-outline:right" className="text-3xl" />
                </button>
                <button
                    className="flex justify-between items-center bg-red-300- w-full border border-blue-500 py-3 px-5 rounded-xl shadow-xl"
                    onClick={handleClickLogout}
                >
                    <p className="text-lg font-semibold">Cerrar sesión</p>
                    <Icon icon="icon-park-outline:right" className="text-3xl" />
                </button>
                <button className="flex justify-between items-center bg-red-300- w-full border border-blue-500 py-3 px-5 rounded-xl shadow-xl">
                    <p className="text-lg font-semibold">Cambiar de cuenta </p>
                    <Icon icon="icon-park-outline:right" className="text-3xl" />
                </button>
            </div>
        </div>
    );
};

export default page;

const Item = ({ icon, text, link }) => {
    return (
        <div className="h-20 w-20">
            <div className="grid place-items-center h-20 w-20 bg-blue-300 rounded-3xl">
                <Icon icon={icon} className="text-4xl" />
            </div>
            <p className="text-center">{text}</p>
        </div>
    );
};

const ItemCategoria = ({ category, img, link }) => {
    return (
        <div className="w-28 h-44 bg-slate-50 p-3 rounded-2xl relative border border-blue-500 overflow-hidden">
            <p>{category}</p>
            <img className="absolute bottom-5 z-20 left-1/2 w-24" style={{ transform: "translateX(-50%)" }} src={img} alt="" />
            <div
                className=" bg-blue-800/50 absolute rounded-full h-60 w-60 top-1/2 left-1/2 left-0-"
                style={{ transform: "translate(-50%, 10%)" }}
            ></div>
        </div>
    );
};
