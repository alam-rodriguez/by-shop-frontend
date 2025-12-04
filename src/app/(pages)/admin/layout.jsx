"use client";

// React
import { useEffect } from "react";

// Zustand
import { zusUser } from "@/app/zustand/user/zusUser";

// Hooks
import { useResquestsUsers } from "@/app/hooks/request/users/requestsUsers";

export default function DashboardLayout({ children }) {
    const { id, email, type } = zusUser();

    const { useGetUserShopData } = useResquestsUsers();

    // useEffect(() => {
    //     if (id == "" || (type != 2 && type != 3)) return;
    //     // console.warn(type);
    //     // console.warn(id);
    //     useGetUserShopData(email);
    // }, [id]);

    return <>{children}</>;
}
