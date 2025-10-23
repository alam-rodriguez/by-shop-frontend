// Tanstack Query
import { useQuery } from "@tanstack/react-query";

// Request
import { deleteGeneralCategoryGroupCategory, getGeneralCategoryGroupById } from "@/app/request/categories/requestsGeneralCategoriesGroups";

export const useGetGeneralCategoryGroupById = (id) => {
    console.log(id);
    return useQuery({
        queryKey: [`general-category-group-${id}`],
        enabled: !!id && id !== "0",
        // staleTime: Infinity,
        queryFn: () => getGeneralCategoryGroupById(id),
    });
};

export const useDeleteGeneralCategoryGroupCategory = async (idGeneralCategoryGroup, categories) => {
    const promises = categories.map(async (category) => {
        const { data, status } = await deleteGeneralCategoryGroupCategory(idGeneralCategoryGroup, category.id);
        return status;
    });

    const results = await Promise.all(promises);
    return results.every((status) => status === 200);
};
