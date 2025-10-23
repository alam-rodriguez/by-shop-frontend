import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import {
    createDepartment,
    createDirectCategoryDepartment,
    deleteDepartmentDirectsCategories,
    getCategoriesByType,
    getCategoryById,
    getDepartmentsArticles,
    getDirectsCategories,
    getDirectsCategories2,
    getDirectsCategoriesByIdDepartment,
    getDirectsCategoriesForApp,
    getGeneralCategories2,
    getGeneralCategoriesArticles,
    getGeneralCategoriesGroupAndCategories,
    getGeneralCategoriesOfArticle,
    getIndirectsCategories2,
    getIndirectsCategoriesForHome,
} from "@/app/request/categories/requestCategories";

// Hooks
import { isUUID } from "@/app/hooks/app/app";

export const useGetDirectsCategoriesForApp = () =>
    useQuery({
        queryKey: [`direct-categories-for-app`],
        staleTime: Infinity,
        queryFn: () => getDirectsCategoriesForApp(),
    });

export const useGetGeneralCategoriesArticles = () =>
    useQuery({
        queryKey: [`general-categories-articles`],
        staleTime: Infinity,
        queryFn: () => getGeneralCategoriesArticles(),
    });

export const useGetGeneralCategoriesGroupAndCategories = () =>
    useQuery({
        queryKey: [`general-categories-group-and-categories`],
        staleTime: Infinity,
        queryFn: () => getGeneralCategoriesGroupAndCategories(),
    });

export const useGetDepartmentsArticles = () =>
    useQuery({
        queryKey: [`departments-articles`],
        staleTime: Infinity,
        queryFn: () => getDepartmentsArticles(),
    });

export const useCreateDepartment = async (department) => {
    const { status, data, message } = await createDepartment(department);
    return status == 201;
};

export const useGetDirectsCategories = () =>
    useQuery({
        queryKey: [`directs-categories`],
        staleTime: Infinity,
        queryFn: () => getDirectsCategories2(),
    });

export const useGetIndirectsCategories = () =>
    useQuery({
        queryKey: [`indirects-categories`],
        staleTime: Infinity,
        queryFn: () => getIndirectsCategories2(),
    });

export const useGetIndirectsCategoriesForHome = () =>
    useQuery({
        queryKey: [`indirects-categories-for-home`],
        staleTime: Infinity,
        queryFn: () => getIndirectsCategoriesForHome(),
    });

export const useGetGeneralCategories = () =>
    useQuery({
        queryKey: [`general-categories`],
        staleTime: Infinity,
        queryFn: () => getGeneralCategories2(),
    });

export const useGetGeneralCategoriesOfArticle = (idArticle) =>
    useQuery({
        queryKey: [`general-categories-of-article-${idArticle}`],
        queryFn: () => getGeneralCategoriesOfArticle(idArticle),
    });

export const useCreateDirectCategoryDepartment = async (idDepartarment, data) => {
    const promises = data.map(async (directCategory) => {
        const directCategoryObj = {};
        directCategoryObj.id = uuidv4();
        directCategoryObj.id_department = idDepartarment;
        directCategoryObj.id_direct_category = directCategory.value;
        directCategoryObj.status = 1;

        console.log(directCategoryObj);
        const { data, status } = await createDirectCategoryDepartment(directCategoryObj);
        return status;
    });

    const results = await Promise.all(promises);
    return results.every((status) => status === 201);
};

export const useDeleteDepartmentDirectsCategories = async (idDepartment, directsCategories) => {
    const promises = directsCategories.map(async (directCategory) => {
        const { data, status } = await deleteDepartmentDirectsCategories(idDepartment, directCategory.id);
        return status;
    });

    const results = await Promise.all(promises);
    return results.every((status) => status === 202);
};

export const useGetCategoriesByType = (type) =>
    useQuery({
        queryKey: [`categories-type-${type}`],
        // staleTime: Infinity,
        queryFn: () => getCategoriesByType(type),
    });

export const useGetCategoryById = (id) =>
    useQuery({
        queryKey: [`category-${id}`],
        // staleTime: Infinity,
        queryFn: () => getCategoryById(id),
    });

export const useGetDirectsCategoriesByIdDepartment = (id) =>
    useQuery({
        queryKey: [`directs-categories-department-${id}`],
        enabled: isUUID(id),
        queryFn: () => getDirectsCategoriesByIdDepartment(id),
    });
