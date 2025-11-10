// Axios
import api from "@/app/api/api";

export const createSearchHistory = async (searchHistory) => {
    try {
        const res = await api.post(`/search-history/`, searchHistory);
        return { status: res.status, message: res.data.message, data: res.data.data };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la tienda.");
    }
};

export const getSearchHistoryByIdUser = async (idUser) => {
    try {
        const res = await api.get(`/search-history/${idUser}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la tienda.");
    }
};

export const updateStatusSearchHistory = async (id, status) => {
    try {
        const res = await api.patch(`/search-history/update-status/${id}`, { status });
        return { status: res.status, message: res.data.message, data: res.data.data };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la tienda.");
    }
};
