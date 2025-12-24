import { useQuery } from "@tanstack/react-query";

// uuid
import { v4 as uuidv4 } from "uuid";

import {
    createPeriod,
    fetchCreatePeriodPayoutShop,
    fetchGetActivePeriodsForAllShops,
    fetchGetPeriodById,
    fetchGetPeriods,
    fetchGetPeriodsByShop,
    fetchGetShopsActivePeriod,
    fetchGetShopsPeriodsById,
    fetchGetShopsPeriodsByPeriodId,
    getActivePeriod,
    getActivePeriodByShop,
} from "@/app/request/periods/requestsPeriods";
import { isUUID } from "../../app/app";

export const useCreatePeriod = async (period) => {
    const { data, status, message } = await createPeriod(period);
    return status === 201;
};

export const useGetActivePeriod = () =>
    useQuery({
        queryKey: [`active-period`],
        queryFn: () => getActivePeriod(),
    });

export const useGetActivePeriodByShop = (shopId) =>
    useQuery({
        queryKey: [`active-period-by-shop-${shopId}`],
        enabled: isUUID(shopId),
        queryFn: () => getActivePeriodByShop(shopId),
    });

export const getShopsActivePeriod = async () => {
    const { data, status, message } = await fetchGetShopsActivePeriod();
    return data;
};

export const getActivePeriodsForAllShops = () =>
    useQuery({
        queryKey: [`active-period-for-all-shop`],
        queryFn: () => fetchGetActivePeriodsForAllShops(),
    });

export const getShopsPeriodsByPeriodId = (periodId) =>
    useQuery({
        queryKey: [`shops-periods-by-peroid-id-${periodId}`],
        enabled: isUUID(periodId),
        queryFn: () => fetchGetShopsPeriodsByPeriodId(periodId),
    });

export const createPeriodPayoutShop = async (periodId, shopId, amount, commission, currencyId) => {
    const periodPayout = {
        id: uuidv4(),
        period_id: periodId,
        shop_id: shopId,
        amount,
        commission,
        net_amount: Number(amount) - Number(commission),
        currency_id: currencyId,
    };
    const { data, status, message } = await fetchCreatePeriodPayoutShop(periodPayout);
    return status;
};

export const getPeriods = () =>
    useQuery({
        queryKey: [`periods`],
        queryFn: () => fetchGetPeriods(),
    });

export const getPeriodsByShop = (shopId) =>
    useQuery({
        queryKey: [`periods-by-shop-${shopId}`],
        enabled: isUUID(shopId),
        queryFn: () => fetchGetPeriodsByShop(shopId),
    });

export const getPeriodById = (id) =>
    useQuery({
        queryKey: [`period-by-id-${id}`],
        enabled: isUUID(id),
        queryFn: () => fetchGetPeriodById(id),
    });
