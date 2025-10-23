// React Query
import { useQuery } from "@tanstack/react-query";

// Hooks
import { isUUID } from "../../app/app";

// Requests
import { getBrandById } from "@/app/request/brands/requestsBrands";

export const useGetBrandById = (id) =>
    useQuery({
        queryKey: [`brand-${id}`],
        enabled: isUUID(id),
        queryFn: () => getBrandById(id),
    });
