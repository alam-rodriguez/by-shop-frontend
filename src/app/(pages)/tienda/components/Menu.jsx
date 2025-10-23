"use client";

import React, { useEffect, useState } from "react";

// Icons
import { Icon } from "@iconify/react";

// Zustand
import { zusShops } from "@/app/zustand/shops/zusShops";

const Menu = () => {
    const { showMenu, setShowMenu, setShowSecondMenu, showSecondMenu } = zusShops();

    // useEffect(() => {
    //     console.log(showSecondMenu);
    // }, [showSecondMenu]);

    return (
        <div
            className={`${showMenu ? "fixed" : "hidden"} bg-black/50 top-0 left-0 h-screen w-screen z-40 mt-20`}
            // style={{ animationName: showMenu != null ? (showMenu ? "animation-menu-tienda" : "animation-menu-tienda-reverse") : "" }}
        >
            <div
                className="absolute w-5/6 h-full bg-white animation-menu-tienda"
                style={{ animationName: showMenu != null ? (showMenu ? "animation-menu-tienda" : "animation-menu-tienda-reverse") : "" }}
            >
                <ItemMenu text="Categorias" icon="proicons:cancel" link="/" isHead={true} setShowMenu={setShowMenu} />
                <ItemMenu text="Inicio" link="/" />
                <ItemMenu text="Categorias" icon="uiw:right" link="/" isCategory={true} setShowSecondMenu={setShowSecondMenu} />
                <ItemMenu text="Categorias" icon="uiw:right" link="/" isCategory={true} setShowSecondMenu={setShowSecondMenu} />
                <ItemMenu text="Categorias" icon="uiw:right" link="/" isCategory={true} setShowSecondMenu={setShowSecondMenu} />
                <ItemMenu text="Categorias" icon="uiw:right" link="/" isCategory={true} setShowSecondMenu={setShowSecondMenu} />
                <ItemMenu text="Categorias" icon="uiw:right" link="/" isCategory={true} setShowSecondMenu={setShowSecondMenu} />
                <ItemMenu text="Business Shop" link="/" />
                <ItemMenu text="Posts" link="/" />
            </div>
        </div>
    );
};

export default Menu;

const ItemMenu = ({ text, icon, link, isHead, setShowMenu, isCategory, setShowSecondMenu }) => {
    const handleClick = () => {
        if (isHead) setShowMenu();
        if (isCategory) setShowSecondMenu();
    };
    return (
        <div className={`flex justify-between px-4 py-6 border-b border-gray-500 ${isHead ? "bg-gray-500/25" : ""}`} onClick={handleClick}>
            <p>{text}</p>
            <Icon icon={icon} className="text-2xl" />
        </div>
    );
};
