// Axios
import api from "@/app/api/api";

const url = "http://localhost:3001";
// const url = "http://192.168.16.63:8081";

export const getModels = async () => {
    const res = await fetch(`${url}/api/models`);
    const data = await res.json();
    return { res, data };
};

export const createModel = async (model) => {
    const res = await fetch(`${url}/api/models`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(model),
    });
    const data = await res.json();
    return { res, data };
};

export const updateModel = async (model) => {
    const res = await fetch(`${url}/api/models/${model.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(model),
    });
    const data = await res.json();
    return { res, data };
};

export const getModelById = async (id) => {
    try {
        const res = await api.get(`/api/models/${id}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error.");
    }
};
