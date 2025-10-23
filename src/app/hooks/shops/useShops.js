"use client";

import React, { useEffect, useState } from "react";

const useShops = () => {
    // const [showMenu, setShowMenu] = useState(null);

    const handleChangeShowMenu = () => {
        // setShowMenu(!showMenu);
    };

    useEffect(() => {
        console.log(showMenu);
    }, [showMenu]);

    return { showMenu, handleChangeShowMenu };
};

export default useShops;
