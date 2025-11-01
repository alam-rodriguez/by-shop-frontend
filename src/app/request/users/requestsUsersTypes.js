// Axios
import api from "@/app/api/api";

export const getUsersTypes = async () => {
    try {
        const res = await api.get(`/api/users/types`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const createUserType = async (userType) => {
    try {
        const res = await api.post(`/api/users/types`, userType);
        return { message: res.data.message, status: res.status, data: res.data.data };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};
