import api from "@/app/api/api";

const url = "http://localhost:3001";
// const url = "http://192.168.16.63:8081";

export const getPaymentMethods = async () => {
    const res = await fetch(`${url}/api/payment-methods`);
    const data = await res.json();
    return { res, data };
};

export const createPaymentMethod = async (paymentMethod) => {
    const res = await fetch(`${url}/api/payment-methods`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentMethod),
    });
    const data = await res.json();
    return { res, data };
};

export const updatePaymentMethod = async (paymentMethod) => {
    const res = await fetch(`${url}/api/payment-methods/${paymentMethod.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentMethod),
    });
    const data = await res.json();
    return { res, data };
};

export const getPaymentMethods2 = async () => {
    try {
        const response = await api.get(`/api/payment-methods`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear la categoria de la oferta.");
    }
};

export const getPaymentMethodById = async (id) => {
    try {
        const response = await api.get(`/api/payment-methods/${id}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear la categoria de la oferta.");
    }
};
