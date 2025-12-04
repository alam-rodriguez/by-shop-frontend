// TanStack Query
import { useQuery } from "@tanstack/react-query";

// Requests
import { createShopPlan, getShopPlanById, getShopsPlans, updateShopPlan } from "@/app/request/shops/requestsShopsPlans";
import { isUUID } from "../../app/app";

export const useGetShopsPlans = () =>
    useQuery({
        queryKey: [`shops-plans`],
        queryFn: () => getShopsPlans(),
    });

export const useGetShopPlanById = (id) =>
    useQuery({
        queryKey: [`shops-plans-${id}`],
        enabled: isUUID(id),
        queryFn: () => getShopPlanById(id),
    });

export const useCreateShopPlan = async (data) => {
    const { status } = await createShopPlan(data);
    return status === 201;
};

export const useUpdateShopPlan = async (data) => {
    const { status } = await updateShopPlan(data);
    return status === 200;
};
