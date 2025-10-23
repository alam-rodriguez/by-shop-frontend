import React from "react";

// Request
import { createShop, getShops, updateShop } from "@/app/request/shops/requestShops";

// Zustand
import { zusAdminShops } from "@/app/zustand/admin/shops/zusAdminShops";

const useRequestsShops = () => {
    const { setShops } = zusAdminShops();

    const useGetShops = async () => {
        const { res, data } = await getShops();
        console.log(data);
        if (data.length > 0) setShops(data.data, 1);
        else setShops(data.data, 2);
    };

    const useCreateShop = async (shop) => {
        const { res, data } = await createShop(shop);
        console.log(res);
        console.log(data);
        return res.status == 201;
    };

    const useUpdateShop = async (shop) => {
        const { res, data } = await updateShop(shop);
        return res.status == 200;
    };

    return { useGetShops, useCreateShop, useUpdateShop };
};

export default useRequestsShops;
