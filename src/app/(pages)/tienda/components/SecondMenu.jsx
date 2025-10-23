"use client";

import React, { useEffect, useState } from "react";

// Icons
import { Icon } from "@iconify/react";

// Zustand
import { zusShops } from "@/app/zustand/shops/zusShops";

const SecondMenu = () => {
    const { showMenu, setShowMenu, showSecondMenu, setShowSecondMenu } = zusShops();

    useEffect(() => {
        console.log(showSecondMenu);
    }, [showSecondMenu]);

    <Icon icon="" width="7" height="16" />;

    return (
        <div
            className={`${showSecondMenu ? "fixed" : "hidden"}  top-0 left-0 h-screen w-screen z-50 mt-20`}
            // style={{ animationName: showMenu != null ? (showMenu ? "animation-menu-tienda" : "animation-menu-tienda-reverse") : "" }}
        >
            <div
                className="absolute w-5/6 h-full bg-white animation-menu-tienda"
                style={{ animationName: showSecondMenu != null ? (showSecondMenu ? "animation-menu-tienda" : "animation-menu-tienda-reverse") : "" }}
            >
                <ItemMenu
                    text="Atras"
                    icon="proicons:cancel"
                    link="/"
                    isHead={true}
                    setShowMenu={setShowMenu}
                    setShowSecondMenu={setShowSecondMenu}
                />
                <ItemMenu text="Movil" link="/" />
                <ItemMenu text="Galaxy Ai" link="/" />
                <ItemMenu text="Galaxy Ai" link="/" />
                <ItemMenu text="Galaxy Ai" link="/" />
                <ItemMenu text="Galaxy Ai" link="/" />
                <ItemMenu text="Galaxy Ai" link="/" />
                <ItemMenu text="Galaxy Ai" link="/" />
                <ItemMenu text="Galaxy Ai" link="/" />
                <ItemMenu text="Galaxy Ai" link="/" />
                <ItemMenu text="Galaxy Ai" link="/" />
                <ItemMenu text="Galaxy Ai" link="/" />
            </div>
        </div>
    );
};

export default SecondMenu;

const ItemMenu = ({ text, icon, link, isHead, setShowMenu, setShowSecondMenu }) => {
    const handleClick = () => {
        if (isHead) {
            setShowSecondMenu();
            setShowMenu();
        }
    };
    return (
        <div className={`flex justify-between px-4 py-6 border-b border-gray-500 ${isHead ? "bg-gray-500/25" : ""}`}>
            <div className="flex items-center gap-2">
                {isHead && <Icon icon="uiw:left" className="text-2xl" onClick={setShowSecondMenu} />}
                <p>{text}</p>
            </div>
            <Icon icon={icon} className="text-2xl" onClick={handleClick} />
        </div>
    );
};
