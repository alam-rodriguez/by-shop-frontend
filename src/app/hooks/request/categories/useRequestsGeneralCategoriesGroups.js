import React from "react";

// uuid
import { v4 as uuidv4 } from "uuid";

// Requests
import {
    createGeneralCategoriesGroup,
    createGeneralCategoryGroupCategory,
    getCategoriesOfGeneralCategoryGroupForApp,
    getGeneralCategoriesGroups,
    updateGeneralCategoriesGroup,
    updateGeneralCategoryGroupCategory,
} from "@/app/request/categories/requestsGeneralCategoriesGroups";

// Requests for app
import { getGeneralCategoriesGroupsForApp } from "@/app/request/categories/requestsGeneralCategoriesGroups";

// Zustand
import { zusAdminCategories } from "@/app/zustand/admin/categories/zusAdminCategories";
import { zusGeneralCategoriesGroups } from "@/app/zustand/app/general-categories-groups/zusGeneralCategoriesGroups";
import { useQuery } from "@tanstack/react-query";

const useRequestsGeneralCategoriesGroups = () => {
    const { setGeneralCategoriesGroups } = zusAdminCategories();
    const { setGeneralCategoriesGroups: setGeneralCategoriesGroupsForApp, generalCategoriesGroupsStatus } = zusGeneralCategoriesGroups();

    const useGetGeneralCategoriesGroups = async () => {
        const { res, data } = await getGeneralCategoriesGroups();
        if (data.data.length > 0) setGeneralCategoriesGroups(data.data, 1);
        else setGeneralCategoriesGroups([], 2);
    };

    const useCreateGeneralCategoryGroup = async (generalCategoryGroup) => {
        const { res, data } = await createGeneralCategoriesGroup(generalCategoryGroup);
        console.log(res);
        console.log(data);
        return res.status == 201;
    };

    const useUseUpdateGeneralCategoryGroup = async (generalCategoryGroup) => {
        console.log(generalCategoryGroup);
        const { res, data } = await updateGeneralCategoriesGroup(generalCategoryGroup);
        console.log(res);
        console.log(data);
        return res.status == 200;
    };

    const useCreateGeneralCategoriesGroupsCategories = async (general_category_group_id, generalCategories) => {
        let status = 201;
        console.log(generalCategories);
        for (const generalCategory of generalCategories) {
            const object = {
                id: uuidv4(),
                general_category_group_id: general_category_group_id,
                id_category: generalCategory.value,
            };
            console.log(object);
            const { res, data } = await createGeneralCategoryGroupCategory(object);
            console.log(res);
            console.log(data);
            if (res.status != 201) status = res.status;
        }
        return status == 201;
    };

    const useUpdateGeneralCategoriesGroupCategory = async (generalCategoryGroup) => {
        console.log(generalCategoryGroup);
        const { res, data } = await updateGeneralCategoryGroupCategory(generalCategoryGroup);
        console.log(res);
        console.log(data);
        return res.status == 200;
    };

    // const useGetGeneralCategoriesGroupsForApp = async () => {
    //     const { res, data } = await getGeneralCategoriesGroupsForApp();
    //     setGeneralCategoriesGroupsForApp(data.data, );
    //     console.log(res);
    //     console.log(data);
    //     // if (data.data.length > 0) setGeneralCategoriesGroups(data.data, 1);
    //     // else setGeneralCategoriesGroups([], 2);
    // };

    const useGetGeneralCategoriesGroupsForApp = () => {
        return useQuery({
            queryKey: ["genralCategoriesGroups"],
            // refetchOnWindowFocus: false,
            staleTime: Infinity,
            queryFn: () => getGeneralCategoriesGroupsForApp(),
        });
    };

    const useGetCategoriesOfGeneralCategoryGroupForApp = (id) => {
        return useQuery({
            queryKey: [`categoriesOfgeneralCategoryGroup-${id}`],
            // refetchOnWindowFocus: false,
            staleTime: Infinity,
            queryFn: () => getCategoriesOfGeneralCategoryGroupForApp(id),
        });
    };

    return {
        useGetGeneralCategoriesGroups,
        useCreateGeneralCategoryGroup,
        useUseUpdateGeneralCategoryGroup,
        useCreateGeneralCategoriesGroupsCategories,
        useUpdateGeneralCategoriesGroupCategory,
        useGetGeneralCategoriesGroupsForApp,
        useGetCategoriesOfGeneralCategoryGroupForApp,
    };
};

export default useRequestsGeneralCategoriesGroups;
