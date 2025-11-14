// Axios
import api from "@/utils/axiosConfig";

export const getHomeCategories = async () => {
    try {
        const response = await api.get(`/categories/home-categories`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear el departamento.");
    }
};

export const getHomeCategoryById = async (id) => {
    try {
        const response = await api.get(`/categories/home-categories/${id}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear el departamento.");
    }
};

export const createHomeCategory = async (homeCategory) => {
    try {
        const response = await api.post(`/categories/home-categories/`, homeCategory);
        return { status: response.status, data: response.data.data, message: response.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al eliminar la categoría directa del departamento.");
    }
};

export const updateHomeCategory = async (homeCategory) => {
    try {
        const response = await api.put(`/categories/home-categories/${homeCategory.id}`, homeCategory);
        return { status: response.status, data: response.data.data, message: response.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al eliminar la categoría directa del departamento.");
    }
};

export const createHomeCategoryStore = async (homeCategoryStore) => {
    try {
        const response = await api.post(`/categories/home-categories/home-categories-store/`, homeCategoryStore);
        return { status: response.status, data: response.data.data, message: response.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al eliminar la categoría directa del departamento.");
    }
};

// export const getHomeCategoriesByHomeCategoryId = async (id) => {
//     try {
//         const response = await api.get(`/categories/home-categories/${id}`);
//         return response.data.data;
//     } catch (error) {
//         console.log(error);
//         throw new Error("Error al crear el departamento.");
//     }
// };

export const getHomeCategoryStoreByHomeCategoryId = async (id) => {
    try {
        const response = await api.get(`/categories/home-categories/home-category-store-by-home-category/${id}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear el departamento.");
    }
};

export const getHomeCategoriesForApp = async () => {
    try {
        const response = await api.get(`/categories/home-categories-for-app`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear el departamento.");
    }
};
