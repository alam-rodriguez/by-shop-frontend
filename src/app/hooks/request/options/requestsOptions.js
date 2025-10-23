// tanStack Query
import { useQuery } from "@tanstack/react-query";

// Requets
import {
    createOptionCategory,
    getOptionById,
    getOptionCategories,
    getOptionCategoryById,
    getOptionValueById,
    updateOptionCatgory,
} from "@/app/request/options/requestsOptions";

// Hooks
import { isUUID } from "../../app/app";

export const useGetOptionCategories = () => {
    return useQuery({
        queryKey: [`option-categories`],
        // staleTime: Infinity,
        queryFn: () => getOptionCategories(),
    });
};

export const useCreateOptionCategory = async (optionCategory) => {
    const { res, data } = await createOptionCategory(optionCategory);
    console.log(res);
    console.log(data);
    return res.status == 201;
};

export const useUpdateOptionCatgory = async (optionCategory) => {
    const { res, data } = await updateOptionCatgory(optionCategory);
    console.log(res);
    console.log(data);
    return res.status == 200;
};

export const useGetOptionCategoryById = (id) => {
    return useQuery({
        queryKey: [`option-category-${id}`],
        // staleTime: Infinity,
        queryFn: () => getOptionCategoryById(id),
    });
};

export const useGetOptionById = (id) => {
    return useQuery({
        queryKey: [`option-${id}`],
        enabled: isUUID(id),
        queryFn: () => getOptionById(id),
    });
};

export const useGetOptionValueById = (id) => {
    return useQuery({
        queryKey: [`option-value-${id}`],
        enabled: isUUID(id),
        queryFn: () => getOptionValueById(id),
    });
};
