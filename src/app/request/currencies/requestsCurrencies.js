// Axios
import api from "@/app/api/api";

export const getCurrencies = async () => {
    try {
        const res = await api.get(`/api/currencies/`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las monedas.");
    }
};

export const getCurrenciesForCustomers = async () => {
    try {
        const res = await api.get(`/api/currencies/for-customers`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las monedas.");
    }
};

export const getCurrencyById = async (idCurrency) => {
    try {
        const res = await api.get(`/api/currencies/${idCurrency}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la monedas.");
    }
};

export const createCurrency = async (currency) => {
    try {
        const res = await api.post(`/api/currencies/`, currency);
        return { status: res.status, data: res.data };
    } catch (error) {
        console.log(error);
        throw new Error("Error crear la moneda.");
    }
};

export const updateCurrency = async (currency) => {
    try {
        const res = await api.put(`/api/currencies/${currency.id}`, currency);
        return { status: res.status, data: res.data };
    } catch (error) {
        console.log(error);
        throw new Error("Error editar la moneda.");
    }
};

export const canBeMainCurrency = async (idCurrency) => {
    try {
        const res = await api.get(`/api/currencies/can-be-main-currency/${idCurrency}`);
        return { status: res.status, data: res.data };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la monedas.");
    }
};
