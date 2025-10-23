// React Query
import { useQuery } from "@tanstack/react-query";

// Requests
import { getArticlesForBoxContent } from "@/app/request/articles/requestsArticlesBoxContents";

export const useGetArticlesForBoxContent = (idShop, idArticle) =>
    useQuery({
        queryKey: [`article-box-contents-${idShop}-${idArticle}`],
        enabled: !!idShop && idShop !== "",
        queryFn: () => getArticlesForBoxContent(idShop, idArticle),
    });
