import api from "@/utils/axiosConfig";
import axios from "axios";

const url = "http://localhost:3001";
// const url = "http://192.168.16.63:8081";

export const getOptions = async () => {
    const res = await fetch(`${url}/api/options`);
    const data = await res.json();
    return { res, data };
};

export const createOption = async (option) => {
    const res = await fetch(`${url}/api/options`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(option),
    });
    const data = await res.json();
    return { res, data };
};

export const updateOption = async (option) => {
    const res = await fetch(`${url}/api/options/${option.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(option),
    });
    const data = await res.json();
    return { res, data };
};

export const getOptionsValues = async () => {
    const res = await fetch(`${url}/api/options/values-options`);
    const data = await res.json();
    return { res, data };
};

export const createOptionValue = async (optionValue) => {
    const res = await fetch(`${url}/api/options/values-options`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(optionValue),
    });
    const data = await res.json();
    return { res, data };
};

export const updateOptionValue = async (optionValue) => {
    const res = await fetch(`${url}/api/options/values-options/${optionValue.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(optionValue),
    });
    const data = await res.json();
    return { res, data };
};

export const getOptionCategories = async () => {
    try {
        const res = await axios.get(`${url}/api/options/option-categories`);
        return res.data.data;
    } catch (error) {
        throw new Error("Error al obtener las categorías.");
    }
};

export const createOptionCategory = async (optionCategory) => {
    const res = await fetch(`${url}/api/options/option-categories/${optionCategory.id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(optionCategory),
    });
    const data = await res.json();
    return { res, data };
};

export const updateOptionCatgory = async (optionCategory) => {
    const res = await fetch(`${url}/api/options/option-categories/${optionCategory.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(optionCategory),
    });
    const data = await res.json();
    return { res, data };
};

export const getOptionCategoryById = async (id) => {
    try {
        const res = await api.get(`/options/option-categories/${id}`);
        return res.data.data;
        // return { data: res.data.data, status: res.status, message: res.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const getOptionById = async (id) => {
    try {
        const res = await api.get(`/options/${id}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const getOptionValueById = async (id) => {
    try {
        const res = await api.get(`/options/values-options/${id}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};
