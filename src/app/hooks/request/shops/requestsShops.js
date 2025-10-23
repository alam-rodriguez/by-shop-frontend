// React Query
import { useQuery } from "@tanstack/react-query";

// Requests
import { getShopById, getShops2 } from "@/app/request/shops/requestShops";

// Hooks
import { isUUID } from "../../app/app";

export const useGetShops = () =>
    useQuery({
        queryKey: [`shops`],
        queryFn: () => getShops2(),
    });

export const useGetShopById = (id) =>
    useQuery({
        queryKey: [`shop-${id}`],
        enabled: isUUID(id),
        queryFn: () => getShopById(id),
    });
