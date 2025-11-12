// Axios
import api from "@/utils/axiosConfig";

export const getAdvertisements = async () => {
    try {
        const res = await api.get(`/advertisements/`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las monedas.");
    }
};

export const getAdvertisementById = async (id) => {
    try {
        const res = await api.get(`/advertisements/${id}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las monedas.");
    }
};

export const createAdvertisement = async (advertisement) => {
    try {
        const response = await api.post(`/advertisements`, advertisement);
        return { status: response.status, message: response.data.message, data: response.data.data };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const updateAdvertisement = async (advertisement) => {
    try {
        const response = await api.put(`/advertisements/${advertisement.id}`, advertisement);
        return { status: response.status, message: response.data.message, data: response.data.data };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const getAdvertisementsForApp = async () => {
    try {
        const res = await api.get(`/advertisements/for-app`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las monedas.");
    }
};
