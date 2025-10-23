import React from "react";

// Requests
import {
    createCategory,
    getDirectsCategories,
    getGeneralCategories,
    getIndirectsCategories,
    updateCategory,
} from "@/app/request/categories/requestCategories";

// Zustand
import { zusAdminCategories } from "@/app/zustand/admin/categories/zusAdminCategories";

const useRequestCategories = () => {
    const { setDirectCategories, setIndirectCategories, setGeneralCategories } = zusAdminCategories();

    const useGetDirectsCategories = async () => {
        const { res, data } = await getDirectsCategories();
        if (data.data.length > 0) setDirectCategories(data.data, 1);
        else setDirectCategories([], 2);
    };

    const useGetIndirectsCategories = async () => {
        const { res, data } = await getIndirectsCategories();
        if (data.data.length > 0) setIndirectCategories(data.data, 1);
        else setIndirectCategories([], 2);
    };

    const useGetGeneralCategories = async () => {
        const { res, data } = await getGeneralCategories();
        if (data.data.length > 0) setGeneralCategories(data.data, 1);
        else setGeneralCategories([], 2);
    };

    const useCreateCategory = async (category) => {
        const { res, data } = await createCategory(category);
        console.log(res);
        console.log(data);
        return res.status == 201;
    };

    const useUpdateCategory = async (category) => {
        console.log(category);
        const { res, data } = await updateCategory(category);
        console.log(res);
        console.log(data);
        return res.status == 200;
    };

    return { useGetDirectsCategories, useCreateCategory, useUpdateCategory, useGetIndirectsCategories, useGetGeneralCategories };
};

export default useRequestCategories;
