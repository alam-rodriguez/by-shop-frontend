// React Query
import { useQuery } from "@tanstack/react-query";

// Requests
import { getPaymentMethodById, getPaymentMethods2 } from "@/app/request/payment_methods/requestsPaymentMethods";

export const useGetPaymentMethods = () =>
    useQuery({
        queryKey: [`payment-methods`],
        queryFn: () => getPaymentMethods2(),
    });

export const useGetPaymentMethodById = (id) =>
    useQuery({
        queryKey: [`payment-method-${id}`],
        queryFn: () => getPaymentMethodById(id),
    });
