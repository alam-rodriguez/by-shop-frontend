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
    }, [pathname]);

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            router.push("/buscador");
            // alert("Hola");
            // event.preventDefault(); // Evita comportamientos no deseados
            // myFunction();
        }
    };

    if (pathname == "/usuario/sesion") return null;

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

    return (
        <div className="flex justify-between p-4 sticky top-0 z-50 bg-gray-100 gap-2">
            {pathname != "/" && pathname != "/usuario" && pathname != "/carrito" && pathname != "/menu" && (
                <div className="bg-white size-9 rounded-full grid place-items-center" onClick={() => router.back()}>
                    <Icon icon="icon-park-outline:left" className="size-6 text-gray-500" />
                </div>
            )}

            <div className="bg-white  rounded-full h-9 relative overflow-hidden flex-1" onFocus={() => router.push("/buscador")}>
                <Icon
                    icon="majesticons:search-line"
                    className="absolute left-5 top-1/2 -translate-x-1/2 -translate-y-1/2 size-5 text-gray-500 text-xl"
                />
                <input
                    type="text"
                    className="border-none outline-none shadow-none ring-0 focus:ring-0 focus:outline-none focus:border-none w-full h-full pl-10 text-sm"
                    placeholder="Buscar articulo..."
                    onKeyDown={handleKeyDown}
                    onChange={setseekerPhrase}
                />
            </div>
            {/* <div className="bg-white size-12 rounded-full grid place-items-center">
                <Icon icon="heroicons-outline:shopping-cart" className="size-7 text-gray-500" />
            </div> */}
        </div>
    );

    // return (
    //     <div className="flex justify-between p-4 sticky top-0 z-50 bg-gray-100">
    //         <div className="bg-white  rounded-full h-12 relative overflow-hidden" style={{ width: "70%" }}>
    //             <Icon
    //                 icon="majesticons:search-line"
    //                 className="absolute left-5 top-1/2 -translate-x-1/2 -translate-y-1/2 size-8 text-gray-500 text-xl"
    //             />
    //             <input
    //                 type="text"
    //                 className="border-none outline-none shadow-none ring-0 focus:ring-0 focus:outline-none focus:border-none w-full h-full pl-10 text-lg"
    //                 placeholder="Buscar articulo"
    //             />
    //         </div>
    //         <div className="bg-white size-12 rounded-full grid place-items-center">
    //             <Icon icon="famicons:notifications-outline" className="size-7 text-gray-500" />
    //         </div>
    //         <div className="bg-white size-12 rounded-full grid place-items-center">
    //             <Icon icon="heroicons-outline:shopping-cart" className="size-7 text-gray-500" />
    //         </div>
    //     </div>
    // );

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
