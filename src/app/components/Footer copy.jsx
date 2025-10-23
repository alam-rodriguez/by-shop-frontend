"use client";
import React, { useEffect } from "react";

// Router
import { usePathname, useRouter } from "next/navigation";

// icons
import { Icon } from "@iconify/react";

const Footer = () => {
    const pathname = usePathname();

    // useEffect(() => {
    //     console.log(pathname);
    // }, [pathname]);

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
