// TanStack Query
import { useQuery } from "@tanstack/react-query";

// uuid
import { v4 as uuidv4 } from "uuid";

// Requests
import {
    fetchCreatePeriodPayoutDelivery,
    fetchGetPeriodByIdAndDeliveryUserId,
    fetchGetPeriodsForDelivery,
} from "@/app/request/periods/requestsDeliveriesPeriods";

// Heart
import { isUUID } from "../../app/app";

export const getPeriodsForDelivery = (id) =>
    useQuery({
        queryKey: [`delivery-payouts-${id}`],
        queryFn: () => fetchGetPeriodsForDelivery(id),
    });

export const getPeriodByIdAndDeliveryUserId = (periodId, deliveryId) =>
    useQuery({
        queryKey: [`delivery-${deliveryId}-period-${periodId}`],
        enabled: isUUID(periodId) && isUUID(deliveryId),
        queryFn: () => fetchGetPeriodByIdAndDeliveryUserId(periodId, deliveryId),
    });

export const createPeriodPayoutDelivery = async (
    period_id,
    driver_id,
    orders_count,
    gross_amount,
    commission,
    net_amount,
    status,
    currency_id,
    paid_at
) => {
    const periodPayout = {
        id: uuidv4(),
        period_id,
        driver_id,
        orders_count,
        gross_amount,
        commission,
        net_amount,
        status,
        currency_id,
        paid_at,
    };

    const { data, status: resStatus, message } = await fetchCreatePeriodPayoutDelivery(periodPayout);
    return resStatus;
};
