// React Query
import { useQuery } from "@tanstack/react-query";

// Requests
import { getModelById } from "@/app/request/models/requestsModels";

// Hooks
import { isUUID } from "../../app/app";

export const useGetModelById = (id) =>
    useQuery({
        queryKey: [`model-${id}`],
        enabled: isUUID(id),
        queryFn: () => getModelById(id),
    });
