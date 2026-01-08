"use client";

// React
import { useEffect, useState } from "react";

// Zustand
import { zusUser } from "@/app/zustand/user/zusUser";

// Hooks
import { useResquestsUsers } from "@/app/hooks/request/users/requestsUsers";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { isUUID } from "@/app/hooks/app/app";

export default function DashboardLayout({ children }) {
    const pathname = usePathname();

    const router = useRouter();

    const { id, email, type, hasData, shop_id, userTypeName, wasSearched } = zusUser();

    const { useGetUserShopData } = useResquestsUsers();

    const [show, setshow] = useState(false);

    useEffect(() => {
        if (!wasSearched) return;
        if (!isUUID(id)) {
            toast.error("Debes iniciar sesión para acceder a esta sección.");
            router.replace("/");
            return;
        }
        if (pathname == "/admin/tiendas/0") {
            setshow(true);
            return;
        }
        if (userTypeName != "DEV" && userTypeName != "SUPPORT" && userTypeName != "ADMIN-SHOP" && userTypeName != "SUB-ADMIN-SHOP") {
            toast.error("No tienes permisos para acceder a esta sección.");
            router.replace("/");
            return;
        }
        setshow(true);
    }, [wasSearched, id, hasData, shop_id, userTypeName, pathname]);

    // useEffect(() => {
    //     if (id == "" || (type != 2 && type != 3)) return;
    //     // console.warn(type);
    //     // console.warn(id);
    //     useGetUserShopData(email);
    // }, [id]);

    if (!show) return <LoadingParagraph />;

    return <>{children}</>;
}
