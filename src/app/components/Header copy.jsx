"use client";

import React, { useEffect, useState } from "react";

// icons
import { Icon } from "@iconify/react";

// Router
import { usePathname, useRouter } from "next/navigation";

// Zustand
import appSettings from "../zustand/app/zusApp";

const Header = () => {
    const pathname = usePathname();
    const router = useRouter();

    const [showCategories, setshowCategories] = useState(true);

    const { setseekerPhrase } = appSettings();

    useEffect(() => {
        if (pathname == "/search") setshowCategories(false);
        console.log(pathname);
    }, [pathname]);

    if (pathname == "/usuario/sesion") return <></>;

    if (pathname.startsWith("/admin")) {
        return (
            <header className="sticky top-0 w-screen py-4 px-3 z-50 flex justify-between items-center bg-white width">
                <div className="w-1/3">
                    <Icon icon="solar:arrow-left-linear" className="text-2xl" onClick={() => router.back()} />
                </div>
                <p className="w-1/3 text-center text-2xl font-semibold">Admin</p>
                <p className="w-1/3"></p>
            </header>
        );
    }

    if (pathname.startsWith("/carrito/comprar")) {
        return (
            <header className="sticky top-0 w-screen py-5 px-3 z-50 flex justify-between items-center bg-white- bg-slate-800 text-white width">
                <div className="w-1/3">
                    <Icon icon="solar:arrow-left-linear" className="text-2xl" onClick={() => router.back()} />
                </div>
                <p className="w-1/3 text-center text-2xl font-semibold"></p>
                <p className="w-1/3 text-end text-sm" onClick={() => router.back()}>
                    CANCELAR
                </p>
            </header>
        );
    }

    if (
        pathname == "/search" ||
        pathname == "/buscador" ||
        pathname.startsWith("/articulos/") ||
        pathname.startsWith("/tienda") ||
        pathname.startsWith("/admin") ||
        pathname.startsWith("/articulos")
    ) {
        return (
            <header className="sticky top-0 w-screen py-4 px-3 z-50 flex justify-between items-center bg-white width">
                <Icon icon="solar:arrow-left-linear" className="w-1/12 text-2xl" onClick={() => router.back()} />
                <div
                    className={`flex bg-white items-center p-2 border-2 border-black rounded-full w-11/12 text-xl`}
                    onClick={() => router.push("/buscador")}
                >
                    <Icon icon="radix-icons:magnifying-glass" />
                    <input type="text" className="w-full bg-transparent ps-3 tracking-tighter" placeholder="Buscar..." onChange={setseekerPhrase} />
                </div>
            </header>
        );
    }

    if (pathname.startsWith("/menu"))
        return (
            <header className="sticky top-0 w-screen py-4 px-3 z-50 flex justify-between items-center bg-white width">
                <div className={`flex bg-white items-center p-2 border-2 border-black rounded-full w-full text-xl`}>
                    <Icon icon="radix-icons:magnifying-glass" />
                    <input type="text" className="w-full bg-transparent ps-3 tracking-tighter" placeholder="Buscar en amazom" />
                </div>
            </header>
        );
    return (
        <header className={`sticky top-0 w-screen ${pathname == "/search" ? "" : "bg-red-700"} py-4 px-3 z-50 width`}>
            <div
                className={`flex bg-white rounded items-center p-2 ${pathname == "/search" ? "border-2 border-black rounded-full" : ""}`}
                onClick={() => router.push("/buscador")}
            >
                <Icon icon="radix-icons:magnifying-glass" />
                <input type="text" className="w-full bg-transparent ps-3" onChange={setseekerPhrase} />
            </div>
            <div className="flex overflow-x-scroll gap-5 text-white mt-3">
                <p>categorias</p>
                <p>categorias</p>
                <p>categorias</p>
                <p>categorias</p>
                <p>categorias</p>
                <p>categorias</p>
                <p>categorias</p>
            </div>
        </header>
    );
};

export default Header;
