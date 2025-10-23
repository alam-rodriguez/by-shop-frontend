// Requests
import { deleteArticleSpec, getArticleSpecs, updateArticleSpec2 } from "@/app/request/articles/requestsArticlesSpecs";

export const useDeleteArticleSpec = async (articleSpecs) => {
    const promises = articleSpecs.map(async (articleSpec) => {
        const { message, status } = await deleteArticleSpec(articleSpec.id);
        return status === 200;
    });

    const results = await Promise.all(promises);
    return results.every((status) => status);
};

export const useGetArticleSpecs = (idArticle) =>
    useQuery({
        queryKey: [`specs-article-${idArticle}`],
        queryFn: () => getArticleSpecs(idArticle),
    });

export const useUpdateArticleSpec2 = async (articleSpecs) => {
    const promises = articleSpecs.map(async (articleSpec) => {
        const { message, status } = await updateArticleSpec2(articleSpec.id, articleSpec);
        return status === 200;
    });

    const results = await Promise.all(promises);
    return results.every((status) => status);
};
