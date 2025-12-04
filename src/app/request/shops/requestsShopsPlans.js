import api from "@/app/api/api";

export const getShopsPlans = async () => {
    try {
        const res = await api.get(`/shops/plans`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la tienda.");
    }
};

export const getShopPlanById = async (id) => {
    try {
        const res = await api.get(`/shops/plans/${id}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la tienda.");
    }
};

export const createShopPlan = async (data) => {
    try {
        const res = await api.post(`/shops/plans`, data);
        return { data: res.data.data, status: res.status, message: res.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la tienda.");
    }
};

export const updateShopPlan = async (data) => {
    try {
        const res = await api.put(`/shops/plans/${data.id}`, data);
        return { data: res.data.data, status: res.status, message: res.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la tienda.");
    }
};
