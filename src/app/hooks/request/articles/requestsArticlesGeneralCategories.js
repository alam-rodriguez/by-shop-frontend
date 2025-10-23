// Requests
import { deleteArticleGeneralCategory } from "@/app/request/articles/requestsArticlesGeneralCategories";

export const useDeleteArticleGeneralCategory = async (idArticle, generalCategories) => {
    const promises = generalCategories.map(async (generalCategory) => {
        const { data, status } = await deleteArticleGeneralCategory(idArticle, generalCategory.id);
        return status;
    });

    const results = await Promise.all(promises);
    return results.every((status) => status === 201);
};