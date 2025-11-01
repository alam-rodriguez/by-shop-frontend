// Axios
import api from "@/app/api/api";

export const createDeliveryOrder = async (deliveryOrder) => {
    try {
        const res = await api.post(`/api/deliveries`, deliveryOrder);
        return { status: res.status, data: res.data.data, message: res.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la monedas.");
    }
};

export const getDeliveriesOrders = async () => {
    try {
        const res = await api.get(`/api/deliveries`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la monedas.");
    }
};
