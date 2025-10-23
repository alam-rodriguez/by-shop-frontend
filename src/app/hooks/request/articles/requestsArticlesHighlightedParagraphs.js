// React Query
import { useQuery } from "@tanstack/react-query";

// Requests
import {
    deleteArticleHighlightedParagraph,
    getArticleHighlightedParagraphs,
    updateArticleHighlightedParagraph,
} from "@/app/request/articles/requestsArticlesHighlightedParagraphs";

export const useDeleteArticleHighlightedParagraphs = async (articleHighlightedParagraph) => {
    const promises = articleHighlightedParagraph.map(async (articleHighlightedParagrap) => {
        const { message, status } = await deleteArticleHighlightedParagraph(articleHighlightedParagrap.id);
        return status === 200;
    });

    const results = await Promise.all(promises);
    return results.every((status) => status);
};

export const useUpdateArticleHighlightedParagraphs = async (articleHighlightedParagraph) => {
    const promises = articleHighlightedParagraph.map(async (articleHighlightedParagraph) => {
        const { message, status } = await updateArticleHighlightedParagraph(articleHighlightedParagraph.id, articleHighlightedParagraph.paragraph);
        return status === 200;
    });

    const results = await Promise.all(promises);
    return results.every((status) => status);
};

export const useGetArticleHighlightedParagraphs = (idArticle) =>
    useQuery({
        queryKey: [`highlighted-paragraphs-article-${idArticle}`],
        queryFn: () => getArticleHighlightedParagraphs(idArticle),
    });
