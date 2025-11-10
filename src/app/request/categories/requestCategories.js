import api from "@/app/api/api";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
// const url = "http://192.168.16.63:8081";

export const getDirectsCategories = async () => {
    const res = await fetch(`${url}/categories/direct-categories`);
    const data = await res.json();
    return { res, data };
};

export const getIndirectsCategories = async () => {
    const res = await fetch(`${url}/categories/indirect-categories`);
    const data = await res.json();
    return { res, data };
};

export const getGeneralCategories = async () => {
    const res = await fetch(`${url}/categories/general-categories`);
    const data = await res.json();
    return { res, data };
};

export const createCategory = async (category) => {
    const res = await fetch(`${url}/categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
    });
    const data = await res.json();
    return { res, data };
};

export const updateCategory = async (category) => {
    const res = await fetch(`${url}/categories/${category.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
    });
    const data = await res.json();
    return { res, data };
};

export const getDirectsCategoriesForApp = async (id) => {
    try {
        const response = await axios.get(`${url}/categories/direct-categories-for-app`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const getGeneralCategoriesArticles = async () => {
    try {
        const response = await axios.get(`${url}/categories/general-category-articles`);
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const getGeneralCategoriesGroupAndCategories = async () => {
    try {
        const response = await axios.get(`${url}/categories/general-category-group-and-categories`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const getDepartmentsArticles = async () => {
    try {
        const response = await axios.get(`${url}/categories/departments`);
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener los departamentos.");
    }
};

export const createDepartment = async (data) => {
    try {
        const response = await axios.post(`${url}/categories/departments`, data);
        return { status: res.status, data: response.data.data, message: response.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear el departamento.");
    }
};

export const getDirectsCategories2 = async () => {
    try {
        const response = await axios.get(`${url}/categories/direct-categories`);
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear el departamento.");
    }
};

export const getIndirectsCategories2 = async () => {
    try {
        const response = await api.get(`/api/categories/indirect-categories`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear el departamento.");
    }
};

export const getIndirectsCategoriesForHome = async () => {
    try {
        const response = await api.get(`/api/categories/indirect-categories-for-home`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear el departamento.");
    }
};

export const getGeneralCategories2 = async () => {
    try {
        const response = await api.get(`/api/categories/general-categories`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear el departamento.");
    }
};

export const getGeneralCategoriesOfArticle = async (idArticle) => {
    try {
        const response = await api.get(`/api/categories/general-categories-of-articles/${idArticle}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear el departamento.");
    }
};

export const createDirectCategoryDepartment = async (data) => {
    console.log(data);
    try {
        const response = await axios.post(`${url}/api/categories/direct-category-department`, data);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear el departamento.");
    }
};

export const getCategoriesByType = async (type) => {
    try {
        const response = await api.get(`/api/categories/by-type?type=${type}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear el departamento.");
    }
};

export const getCategoryById = async (id) => {
    try {
        const response = await api.get(`/api/categories/id/${id}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear el departamento.");
    }
};

export const getDirectsCategoriesByIdDepartment = async (id) => {
    try {
        const response = await api.get(`/api/categories/direct-categories-by-department/${id}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear el departamento.");
    }
};

export const deleteDepartmentDirectsCategories = async (idDepartment, idCategory) => {
    try {
        const response = await api.delete(`/api/categories/departments/directs-categories/${idDepartment}/${idCategory}`);
        return { status: response.status, data: response.data.data, message: response.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al eliminar la categoría directa del departamento.");
    }
};
