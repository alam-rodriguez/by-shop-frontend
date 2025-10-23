import React from "react";

// Icons
import { Icon } from "@iconify/react";

// Zustand
import { zusShops } from "@/app/zustand/shops/zusShops";

const HeaderShops = () => {
    const { setShowMenu } = zusShops();

    return (
        <div className="flex justify-between w-full p-4 bg-white border border-b-gray-700 sticky z-30">
            <div className="flex items-center gap-4">
                <Icon icon="ic:round-menu" className="text-2xl" onClick={setShowMenu} />
                <Icon icon="iconoir:search" className="text-2xl" />
            </div>
            <div className="flex items-center gap-4">
                <button className="bg-slate-400/40 px-6 py-2 rounded-xl shadow-2xl">Seguir</button>
                <Icon icon="meteor-icons:share" className="text-2xl" />
            </div>
        </div>
    );
};

export default HeaderShops;
