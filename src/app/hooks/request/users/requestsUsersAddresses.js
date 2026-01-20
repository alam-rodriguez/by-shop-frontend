// React Query
import { useQuery } from "@tanstack/react-query";

// Requests
import {
    getAddressById,
    getUserAddresses,
    setUserAddressPreferred,
    updateAddress,
    userAddressCanBePreferred,
} from "@/app/request/users/requestsUsersAddresses";

export const useGetUserAddresses = (idUser) =>
    useQuery({
        queryKey: [`users-addresses-${idUser}`],
        enabled: idUser !== "",
        queryFn: () => getUserAddresses(idUser),
        refetchOnWindowFocus: true,
    });

export const useGetAddressById = (id) =>
    useQuery({
        queryKey: [`address-${id}`],
        enabled: id !== "0",
        queryFn: () => getAddressById(id),
    });

export const useUpdateAddress = async (id, address) => {
    const { status } = await updateAddress(id, { ...address, preferred_address: address.preferred_address ? 1 : 0 });
    return status === 200;
};

export const useUserAddressCanBePreferred = async (idUser, idAddress) => {
    const { data } = await userAddressCanBePreferred(idUser, idAddress);
    return data;
};

export const useSetUserAddressPreferred = async (idUser, idAddress) => {
    const { data } = await setUserAddressPreferred(idUser, idAddress);
    return data;
};
