// TanStack
import { useQuery } from "@tanstack/react-query";

// uuid
import { v4 as uuidv4 } from "uuid";

// Requests
import {
    createHomeCategory,
    createHomeCategoryStore,
    getHomeCategories,
    getHomeCategoriesForApp,
    getHomeCategoryById,
    getHomeCategoryStoreByHomeCategoryId,
    updateHomeCategory,
} from "@/app/request/categories/requestsHomeCategories";

export const useGetHomeCategories = () =>
    useQuery({
        queryKey: [`home-categories`],
        queryFn: () => getHomeCategories(),
    });

export const useGetHomeCategoryById = (id) =>
    useQuery({
        queryKey: [`home-categories-${id}`],
        queryFn: () => getHomeCategoryById(id),
    });

export const useCreateHomeCategory = async (department) => {
    const { status, data, message } = await createHomeCategory(department);
    return { status: status == 201, data };
};

export const useUpdateHomeCategory = async (department) => {
    const { status, data, message } = await updateHomeCategory(department);
    return status == 200;
};

export const useCreateHomeCategoryStore = async (articles, storeId) => {
    const promises = articles.map(async (article, i) => {
        const store = {};
        store.id = uuidv4();
        store.home_category_id = storeId;
        store.store_id = article.value;
        store.top = i < 4 ? 1 : 0;
        store.status = 1;

        console.log(store);
        const { data, status } = await createHomeCategoryStore(store);
        return status;
    });

    const results = await Promise.all(promises);
    return results.every((status) => status === 201);
};

export const useGetHomeCategoryStoreByHomeCategoryId = (id) =>
    useQuery({
        queryKey: [`home-category-store-${id}`],
        queryFn: () => getHomeCategoryStoreByHomeCategoryId(id),
    });

export const useGetHomeCategoriesForApp = () =>
    useQuery({
        queryKey: [`home-categories-for-app`],
        staleTime: Infinity,
        queryFn: () => getHomeCategoriesForApp(),
    });
