// TanStack Query
import { useQuery } from "@tanstack/react-query";

// uuid
import { v4 as uuid } from "uuid";

// Requests
import {
    createDeliveryOrder,
    createDeliveryOrderPreference,
    deliveryCanGetOrder,
    getDeliveriesOrders,
    getDeliveriesOrdersHistoryByDeliveryUserId,
    getDeliveryOrderById,
    getDeliveryOrderExists,
    getDeliveryOrderPreference,
    updateDeliveryOrderDeliveryId,
    updateDeliveryOrderPreference,
    updateDeliveryOrderStatus,
} from "@/app/request/deliveries/requestsDeliveries";

export const useCreateDeliveryOrder = async (idCartBouth, price) => {
    const deliveryOrder = {
        id: uuid(),
        id_delivery: null,
        id_cart_bouth: idCartBouth,
        price: price,
        status: 1,
    };
    const { data, status, message } = await createDeliveryOrder(deliveryOrder);
    return { data, status };
};

export const useGetDeliveriesOrders = () =>
    useQuery({
        queryKey: [`deliveries-orders`],
        // refetchInterval: 1000,
        queryFn: () => getDeliveriesOrders(),
    });

export const useGetDeliveriesOrdersHistoryByDeliveryUserId = (deliveryUserId) =>
    useQuery({
        queryKey: [`deliveries-orders-history-by-delivery-user-id-${deliveryUserId}`],
        queryFn: () => getDeliveriesOrdersHistoryByDeliveryUserId(deliveryUserId),
    });

export const useGetDeliveryOrderById = (id) =>
    useQuery({
        queryKey: [`deliveries-orders-${id}`],
        queryFn: () => getDeliveryOrderById(id),
    });

export const useGetDeliveryOrderExists = async (idCartBouth) => {
    const { data, status, message, exists } = await getDeliveryOrderExists(idCartBouth);
    return exists;
};

export const useCreateDeliveryOrderPreference = async (idDelivery, deliveryOrderId, status) => {
    const deliveryOrderPreference = {
        id: uuid(),
        id_delivery: idDelivery,
        delivery_order_id: deliveryOrderId,
        status: status,
    };
    const { data, status: resStatus, message } = await createDeliveryOrderPreference(deliveryOrderPreference);
    return resStatus == 201;
};

export const useGetDeliveryOrderPreference = async (idDelivery, deliveryOrderId) => {
    const { data, status, message, hasPreference } = await getDeliveryOrderPreference(idDelivery, deliveryOrderId);
    return { hasPreference, data };
};

export const useUpdateDeliveryOrderPreference = async (id, status, delivery_order_id, id_delivery) => {
    const { data, status: resStatus, message } = await updateDeliveryOrderPreference(id, status, delivery_order_id, id_delivery);
    return resStatus == 200;
};

export const useDeliveryCanGetOrder = async (deliveryOrderId, deliveryId) => {
    const { canGetOrder } = await deliveryCanGetOrder(deliveryOrderId, deliveryId);
    return canGetOrder;
};

export const useUpdateDeliveryOrderDeliveryId = async (id, id_delivery, status) => {
    const { data, status: resStatus, message } = await updateDeliveryOrderDeliveryId(id, id_delivery, status);
    return resStatus == 200;
};

export const useUpdateDeliveryOrderStatus = async (deliveryOrderId, status) => {
    const { data, status: resStatus, message } = await updateDeliveryOrderStatus(deliveryOrderId, status);
    return resStatus == 200;
};
