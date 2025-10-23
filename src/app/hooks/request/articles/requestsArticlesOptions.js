import { useQuery } from "@tanstack/react-query";

// Requests
import { deleteArticleOption, getArticleOptions, updateArticleOption } from "@/app/request/articles/requestsArticlesOptions";

export const useGetArticleOptions = (idArticle) =>
    useQuery({
        queryKey: [`options-article-${idArticle}`],
        queryFn: () => getArticleOptions(idArticle),
    });

export const useDeleteArticleOption = async (articleOptions) => {
    const promises = articleOptions.map(async (articleOption) => {
        const { message, status } = await deleteArticleOption(articleOption.id);
        return status === 200;
    });

    const results = await Promise.all(promises);
    return results.every((status) => status);
};

export const useUpdateArticleOption = async (articleOptions) => {
    const promises = articleOptions.map(async (articleOption) => {
        const { message, status } = await updateArticleOption(articleOption.id, articleOption);
        return status === 200;
    });

    const results = await Promise.all(promises);
    return results.every((status) => status);
};
