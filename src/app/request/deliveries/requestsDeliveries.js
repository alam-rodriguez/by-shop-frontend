// Axios
import api from "@/app/api/api";

export const createDeliveryOrder = async (deliveryOrder) => {
    try {
        const res = await api.post(`/deliveries`, deliveryOrder);
        return { status: res.status, data: res.data.data, message: res.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la monedas.");
    }
};

export const getDeliveriesOrders = async () => {
    try {
        const res = await api.get(`/deliveries`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la monedas.");
    }
};

export const getDeliveriesOrdersHistoryByDeliveryUserId = async (deliveryUserId) => {
    try {
        const res = await api.get(`/deliveries/history-by-delivery-user/${deliveryUserId}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la monedas.");
    }
};

export const getDeliveryOrderById = async (id) => {
    try {
        const res = await api.get(`/deliveries/${id}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la monedas.");
    }
};

export const getDeliveryOrderExists = async (idCartBouth) => {
    try {
        const res = await api.get(`/deliveries/order-exists/${idCartBouth}`);
        return { status: res.status, data: res.data.data, message: res.data.message, exists: res.data.exists };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la monedas.");
    }
};

export const createDeliveryOrderPreference = async (deliveryOrderPreference) => {
    try {
        const res = await api.post(`/deliveries/order-preference`, deliveryOrderPreference);
        return { status: res.status, data: res.data.data, message: res.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la monedas.");
    }
};

export const getDeliveryOrderPreference = async (idDelivery, deliveryOrderId) => {
    try {
        const res = await api.get(`/deliveries/order-preference/${idDelivery}/${deliveryOrderId}`);
        return { status: res.status, data: res.data.data, message: res.data.message, hasPreference: res.data.hasPreference };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la monedas.");
    }
};

export const updateDeliveryOrderPreference = async (id, status, delivery_order_id, id_delivery) => {
    try {
        const res = await api.patch(`/deliveries/order-preference/${id}`, { status, delivery_order_id, id_delivery });
        return { status: res.status, data: res.data.data, message: res.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la monedas.");
    }
};

export const deliveryCanGetOrder = async (deliveryOrderId, deliveryId) => {
    try {
        const res = await api.get(`/deliveries/delivery-can-get-order/${deliveryOrderId}/${deliveryId}`);
        return {
            status: res.status,
            data: res.data.data,
            message: res.data.message,
            canGetOrder: res.data.canGetOrder,
            deliveryId: res.data.deliveryId,
        };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la monedas.");
    }
};

export const updateDeliveryOrderDeliveryId = async (deliveryOrderId, id_delivery, status) => {
    try {
        const res = await api.patch(`/deliveries/update-delivery-order-delivery-id/${deliveryOrderId}`, { id_delivery, status });
        return {
            status: res.status,
            data: res.data.data,
            message: res.data.message,
        };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la monedas.");
    }
};

export const updateDeliveryOrderStatus = async (deliveryOrderId, status) => {
    try {
        const res = await api.patch(`/deliveries/update-status/${deliveryOrderId}`, { status });
        return {
            status: res.status,
            data: res.data.data,
            message: res.data.message,
        };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la monedas.");
    }
};

export const fetchGetDeliveriesOrdersHistoryByDeliveryUserIdAndPeriodId = async (deliveryUserId, periodId) => {
    try {
        const res = await api.get(`/deliveries/history-by-delivery-user-and-period-id/${deliveryUserId}/${periodId}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la monedas.");
    }
};
