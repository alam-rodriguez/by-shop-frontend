// TanStack Query
import { useQuery } from "@tanstack/react-query";

// uuid
import { v4 as uuid } from "uuid";

// Requests
import { createDeliveryOrder, getDeliveriesOrders } from "@/app/request/deliveries/requestsDeliveries";

export const useCreateDeliveryOrder = async (idCartBouth, price) => {
    const deliveryOrder = {
        id: uuid(),
        id_delivery: null,
        id_cart_bouth: idCartBouth,
        price: price,
        status: 1,
    };
    const { data, status, message } = await createDeliveryOrder(deliveryOrder);
    return status == 201;
};

export const useGetDeliveriesOrders = () =>
    useQuery({
        queryKey: [`offers`],
        queryFn: () => getDeliveriesOrders(),
    });
