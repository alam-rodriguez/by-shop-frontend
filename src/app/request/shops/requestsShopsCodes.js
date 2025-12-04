import api from "@/app/api/api";

export const getShopsCodes = async () => {
    try {
        const res = await api.get(`/shops/codes`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la tienda.");
    }
};

export const getShopCodeById = async (id) => {
    try {
        const res = await api.get(`/shops/codes/${id}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la tienda.");
    }
};

export const createShopCode = async (data) => {
    try {
        const res = await api.post(`/shops/codes`, data);
        return { data: res.data.data, status: res.status, message: res.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la tienda.");
    }
};

export const setUsedShopCode = async (id, used_by_shop_id) => {
    try {
        const res = await api.patch(`/shops/codes/set-code-used/${id}`, { used_by_shop_id });
        return { data: res.data.data, status: res.status, message: res.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la tienda.");
    }
};

export const updateShopCode = async (data) => {
    try {
        const res = await api.put(`/shops/codes/${data.id}`, data);
        return { data: res.data.data, status: res.status, message: res.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la tienda.");
    }
};

export const getShopCodeData = async (code) => {
    try {
        const res = await api.get(`/shops/codes/data/${code}`);
        return { data: res.data.data, status: res.status, message: res.data.message, exists: res.data.exists };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la tienda.");
    }
};
