// Hooks
import { isUUID } from "@/app/hooks/app/app";

// Next
import { useRouter } from "next/navigation";

// Zustand
import { zusUser } from "@/app/zustand/user/zusUser";

import React from "react";

const ButtonForAdmins = () => {
    const router = useRouter();

    const { userTypeName, shop_id: shopId } = zusUser();

    return (
        <>
            {userTypeName == "ADMIN-SHOP" || userTypeName == "SUB-ADMIN-SHOP" ? (
                isUUID(shopId) ? (
                    <button className="bg-red-700 text-white py-3 px-5 text-xl text rounded-xl" onClick={() => router.push("/admin")}>
                        Configuracion tienda
                    </button>
                ) : (
                    <button className="bg-red-700 text-white py-3 px-5 text-xl text rounded-xl" onClick={() => router.push("/admin/tiendas/0")}>
                        Registrar tienda
                    </button>
                )
            ) : null}

            {userTypeName == "DEV" && (
                <button className="bg-red-700 text-white py-3 px-5 text-xl text rounded-xl" onClick={() => router.push("/admin/dev")}>
                    admin dev
                </button>
            )}

            {userTypeName == "SUPPORT" && (
                <button className="bg-red-700 text-white py-3 px-5 text-xl text rounded-xl" onClick={() => router.push("/admin/support")}>
                    admin support
                </button>
            )}
        </>
    );
};

export default ButtonForAdmins;
