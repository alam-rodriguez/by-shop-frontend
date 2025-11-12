// TanStack
import { useQuery } from "@tanstack/react-query";

// Requests
import {
    createAdvertisement,
    getAdvertisementById,
    getAdvertisements,
    getAdvertisementsForApp,
    updateAdvertisement,
} from "@/app/request/advertisements/requestsAdvertisements";

export const useGetAdvertisements = () =>
    useQuery({
        queryKey: [`advertisements`],
        queryFn: () => getAdvertisements(),
    });

export const useGetAdvertisementById = (id) =>
    useQuery({
        queryKey: [`advertisements-${id}`],
        queryFn: () => getAdvertisementById(id),
    });

export const useCreateAdvertisement = async (advertisement) => {
    const { status } = await createAdvertisement(advertisement);
    return status == 201;
};

export const useUpdateAdvertisement = async (advertisement) => {
    const { status } = await updateAdvertisement(advertisement);
    return status == 200;
};

export const useGetAdvertisementsForApp = () =>
    useQuery({
        queryKey: [`advertisements-for-app`],
        staleTime: Infinity,
        queryFn: () => getAdvertisementsForApp(),
    });
