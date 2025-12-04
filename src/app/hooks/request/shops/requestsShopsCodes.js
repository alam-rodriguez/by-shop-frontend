// TanStack Query
import { useQuery } from "@tanstack/react-query";

// Requests
import {
    createShopCode,
    getShopCodeById,
    getShopCodeData,
    getShopsCodes,
    setUsedShopCode,
    updateShopCode,
} from "@/app/request/shops/requestsShopsCodes";

// Hooks
import { isUUID } from "../../app/app";

export const useGetShopsCodes = () =>
    useQuery({
        queryKey: [`shops-codes`],
        queryFn: () => getShopsCodes(),
    });

export const useGetShopCodeById = (id) =>
    useQuery({
        queryKey: [`shops-codes-${id}`],
        enabled: isUUID(id),
        queryFn: () => getShopCodeById(id),
    });

export const useCreateShopCode = async (data) => {
    const { status } = await createShopCode(data);
    return status === 201;
};

export const useUpdateShopCode = async (data) => {
    const { status } = await updateShopCode(data);
    return status === 200;
};

export const useSetUsedShopCode = async (id, shopId) => {
    const { status } = await setUsedShopCode(id, shopId);
    return status === 200;
};

export const useGetShopCodeData = async (code) => {
    const { data, status, message, exists } = await getShopCodeData(code);
    return { exists, data, status, message };
};
