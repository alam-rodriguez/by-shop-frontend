// Axios
import api from "@/app/api/api";

export const getUserAddresses = async (idUser) => {
    try {
        const res = await api.get(`/api/users/addresses/user/${idUser}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const getAddressById = async (id) => {
    try {
        const res = await api.get(`/api/users/addresses/${id}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const updateAddress = async (id, address) => {
    try {
        const res = await api.put(`/api/users/addresses/${id}`, address);
        return { status: res.status, data: res.data.data, message: res.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const userAddressCanBePreferred = async (idUser, idAddress) => {
    try {
        const res = await api.get(`/api/users/addresses/can-be-preferred/${idUser}/${idAddress}`);
        return { status: res.status, data: res.data.data, message: res.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const setUserAddressPreferred = async (idUser, idAddress) => {
    try {
        const res = await api.patch(`/api/users/addresses/set-preferred/${idUser}/${idAddress}`);
        return { status: res.status, data: res.data.data, message: res.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};
