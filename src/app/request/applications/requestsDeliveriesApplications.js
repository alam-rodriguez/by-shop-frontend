// Axios
import api from "@/app/api/api";

export const fetchCreateDeliveryApplication = async (application) => {
    try {
        const res = await api.post(`/applications/deliveries`, application);
        return { status: res.status, data: res.data.data, message: res.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la monedas.");
    }
};

export const fetchGetDeliveryApplication = async (userId) => {
    try {
        const res = await api.get(`/applications/deliveries/by-user/${userId}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la monedas.");
    }
};

export const fetchGetDeliveryApplicationByApplicationId = async (id) => {
    try {
        const res = await api.get(`/applications/deliveries/${id}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la monedas.");
    }
};

export const fetchGetAllDeliveriesApplication = async () => {
    try {
        const res = await api.get(`/applications/deliveries`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la monedas.");
    }
};

export const fetchUpdateDeliveryStatusApplication = async (applicationId, status) => {
    try {
        const res = await api.patch(`/applications/deliveries/${applicationId}/status`, { status });
        return { status: res.status, data: res.data.data, message: res.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la monedas.");
    }
};
