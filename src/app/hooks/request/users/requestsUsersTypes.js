// Tanstack Query
import { useQuery } from "@tanstack/react-query";

// Requests
import { createUserType, getUsersTypes } from "@/app/request/users/requestsUsersTypes";

export const useGetUsersTypes = () =>
    useQuery({
        queryKey: [`users-types`],
        staleTime: Infinity,
        queryFn: () => getUsersTypes(),
    });

export const useCreateUserType = async (userType) => {
    const { message, status, data } = await createUserType(userType);
    if (status == 201) return true;
};
