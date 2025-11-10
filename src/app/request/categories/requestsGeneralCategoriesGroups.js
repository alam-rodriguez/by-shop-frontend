import api from "@/app/api/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const url = process.env.BACKEND_BASE_URL;
// const url = "http://192.168.16.63:8081";

export const getGeneralCategoriesGroups = async () => {
    const res = await fetch(`${url}/categories/general-categories-groups`);
    const data = await res.json();
    return { res, data };
};

export const createGeneralCategoriesGroup = async (generalCategoryGroup) => {
    const res = await fetch(`${url}/categories/general-categories-groups`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(generalCategoryGroup),
    });
    const data = await res.json();
    return { res, data };
};

export const updateGeneralCategoriesGroup = async (generalCategoryGroup) => {
    const res = await fetch(`${url}/categories/general-categories-groups/${generalCategoryGroup.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(generalCategoryGroup),
    });
    const data = await res.json();
    return { res, data };
};

export const createGeneralCategoryGroupCategory = async (category) => {
    const res = await fetch(`${url}/categories/general-categories-groups-categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
    });
    const data = await res.json();
    return { res, data };
};

export const updateGeneralCategoryGroupCategory = async (category) => {
    const res = await fetch(`${url}/categories/general-categories-groups-categories/${category.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
    });
    const data = await res.json();
    return { res, data };
};

export const getGeneralCategoriesGroupsForApp = async () => {
    const response = await axios.get(`${url}/categories/general-categories-groups-for-app`);
    return response.data.data;
};

export const getCategoriesOfGeneralCategoryGroupForApp = async (id) => {
    try {
        const response = await axios.get(`${url}/categories/categories-of-general-category-group-for-app/${id}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

// export const useGetGeneralCategoriesGroupsForApp = () => {
//     return useQuery({
//         queryKey: ["genralCategoriesGroups"],
//         // refetchOnWindowFocus: false,
//         staleTime: Infinity,
//         queryFn: () => getGeneralCategoriesGroupsForApp(),
//     });
// };

export const getGeneralCategoryGroupById = async (id) => {
    try {
        const response = await api.get(`/api/categories/general-categories-groups/${id}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const deleteGeneralCategoryGroupCategory = async (idGeneralCategoryGroup, idCategory) => {
    try {
        const response = await api.delete(`/api/categories/general-categories-groups-categories/${idGeneralCategoryGroup}/${idCategory}`);
        return { status: response.status, message: response.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

// export const getGeneralCategoriesGroups = async () => {
//     const res = await fetch(`${url}/api/categories/general-categories-groups`);
//     const data = await res.json();
//     return { res, data };
// };
