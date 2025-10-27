"use client";
import React, { useEffect, useState } from "react";

// Router
import { usePathname, useRouter } from "next/navigation";

// icons
import { Icon } from "@iconify/react";
import Link from "next/link";
import { zusUser } from "../zustand/user/zusUser";
import { useGetCartUserReadyToBuy } from "../hooks/request/carts/requestsCarts";

const Footer = () => {
    const pathname = usePathname();

    const { id: idUser } = zusUser();

    const router = useRouter();

    const [pageActive, setPageActive] = useState("inicio");

    useEffect(() => {}, []);

    useEffect(() => {
        router.prefetch("/");
        router.prefetch("/inicio");
        router.prefetch("/carrito");
        router.prefetch("/menu");
        if (pathname.startsWith("/usuario")) setPageActive("usuario");
        else if (pathname.startsWith("/carrito")) setPageActive("carrito");
        // else if (pathname.startsWith("/menu")) setPageActive("menu");
        else if (pathname.startsWith("/tiendas")) setPageActive("tiendas");
        else setPageActive("inicio");
    }, [pathname]);

    const { data: dataCartUser, isLoading, refetch } = useGetCartUserReadyToBuy(idUser);

    if (
        pathname == "/search" ||
        pathname == "/articulos/filtros" ||
        pathname.startsWith("/admin") ||
        pathname == "/usuario/sesion" ||
        pathname.endsWith("/mi-opinion")
    )
        return null;

    return (
        <div className="flex fixed left-0 bottom-0 w-screen bg-gray-100 border-t-2 border-gray-300 z-50 pb-5 pt-3">
            <Link className={`flex-1 flex justify-center items-center flex-col ${pageActive === "inicio" && "text-red-700"}`} href="/">
                <Icon icon="solar:home-2-outline" width="24" height="24" className="" />
                <p>Inicio</p>
            </Link>
            <Link className={`flex-1 flex justify-center items-center flex-col ${pageActive === "usuario" && "text-red-700"}`} href="/usuario">
                <Icon icon="mage:user" width="24" height="24" />
                <p>Usuario</p>
            </Link>

            <Link
                className={`flex-1 flex justify-center items-center flex-col relative ${pageActive === "carrito" && "text-red-700"}`}
                // onClick={() => router.push("/carrito")}
                href="/carrito"
            >
                <Icon icon="mdi-light:cart" width="24" height="24" />
                <p>Carrito</p>
                {dataCartUser && (
                    <div
                        className="absolute border border-red-700 rounded-full grid place-items-center"
                        style={{ right: 28, top: -10, width: 18, height: 18 }}
                    >
                        <p className="tracking-normal leading-none_ text-sm font-bold" style={{ lineHeight: 0 }}>
                            {dataCartUser.length}
                        </p>
                    </div>
                )}

                {/* <p className="absolute" style={{ right: 28, top: -10 }}>
                    3
                </p> */}
            </Link>
            {/* <div
                className={`flex-1 flex justify-center items-center flex-col ${pageActive === "menu" && "text-red-700"}`}
                onClick={() => router.push("/menu")}
            >
                <Icon icon="pepicons-pencil:menu-circle" width="24" height="24" />
                <p>Menu</p>
            </div> */}
            <Link className={`flex-1 flex justify-center items-center flex-col ${pageActive === "tiendas" && "text-red-700"}`} href="/tiendas">
                <Icon icon="clarity:store-line" width="24" height="24" />
                <p>Tiendas</p>
            </Link>
        </div>
    );
    // return (
    //     <div className="flex fixed left-0 bottom-0 w-screen bg-gray-100 border-t-2 border-gray-300 z-50 pb-5 pt-3">
    //         <Link className={`flex-1 flex justify-center items-center flex-col ${pageActive === "inicio" && "text-red-700"}`} href="/">
    //             <Icon icon="solar:home-2-outline" width="24" height="24" className="" />
    //             <p>Inicio</p>
    //         </Link>
    //         <Link className={`flex-1 flex justify-center items-center flex-col ${pageActive === "usuario" && "text-red-700"}`} href="/usuario">
    //             <Icon icon="mage:user" width="24" height="24" />
    //             <p>Usuario</p>
    //         </Link>

    //         <Link className={`flex-1 flex justify-center items-center flex-col ${pageActive === "carrito" && "text-red-700"}`} href="/carrito">
    //             <Icon icon="mdi-light:cart" width="24" height="24" />
    //             <p>Carrito</p>
    //         </Link>
    //         <Link className={`flex-1 flex justify-center items-center flex-col ${pageActive === "menu" && "text-red-700"}`} href="/menu">
    //             <Icon icon="pepicons-pencil:menu-circle" width="24" height="24" />
    //             <p>Menu</p>
    //         </Link>
    //     </div>
    // );

    if (
        pathname == "/search" ||
        pathname == "/articulos/filtros" ||
        pathname.startsWith("/admin") ||
        pathname == "/usuario/sesion" ||
        pathname.endsWith("/mi-opinion")
    )
        return null;
    return (
        <footer className="bg-white fixed left-0 bottom-0 w-screen flex h-20 justify-around items-start border-t-2 border-gray-300 width z-40">
            <FooterItem icon="material-symbols-light:home-outline" link="/" pathname={pathname} />
            {/* <FooterItem icon="cbi:apple-iphone" link="/reparaciones" pathname={pathname} /> */}
            <FooterItem icon="tdesign:user" link="/usuario" pathname={pathname} />
            <FooterItem icon="mdi:cart-outline" link="/carrito" pathname={pathname} />
            <FooterItem icon="mdi-light:menu" link="/menu" pathname={pathname} />
        </footer>
    );
};

export default Footer;

const FooterItem = ({ icon, link, pathname }) => {
    const router = useRouter();

    return (
        <div className={`${pathname == link ? "page-active" : ""}`}>
            <Icon icon={icon} className="text-4xl mt-2" onClick={() => router.push(link)} />
        </div>
    );
};
