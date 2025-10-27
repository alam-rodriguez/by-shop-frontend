// TanStack Query
import { useQuery } from "@tanstack/react-query";

// uuid
import { v4 as uuidv4 } from "uuid";

// Requests
import { createSearchHistory, getSearchHistoryByIdUser, updateStatusSearchHistory } from "@/app/request/search-history/requestsSearchHistory";

// Hooks
import { isUUID } from "../../app/app";

export const useCreateSearchHistory = async (idUser, idArticle, phrase) => {
    const searchHistory = {
        id: uuidv4(),
        id_user: idUser,
        id_article: idArticle,
        seeker_phrase: phrase,
    };

    const { data, status, message } = await createSearchHistory(searchHistory);
    return status === 201;
};

export const useGetSearchHistoryByIdUser = (idUser) =>
    useQuery({
        queryKey: [`user-search-history-${idUser}`],
        enabled: isUUID(idUser),
        queryFn: () => getSearchHistoryByIdUser(idUser),
    });

export const useUpdateStatusSearchHistory = async (id, status) => {
    const { data, status: statusResponse, message } = await updateStatusSearchHistory(id, status);
    return statusResponse === 200;
};
