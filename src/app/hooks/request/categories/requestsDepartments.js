// tanStack Query
import { useQuery } from "@tanstack/react-query";

// Requests
import { getDepartmentById, getDepartmentsForApp, updateDepartment } from "@/app/request/categories/requestsDepartments";

// Hooks
import { isUUID } from "@/app/hooks/app/app";

export const useGetDepartmentsForApp = () =>
    useQuery({
        queryKey: [`departments-for-app`],
        staleTime: Infinity,
        queryFn: () => getDepartmentsForApp(),
    });

export const useGetDepartmentById = (id) =>
    useQuery({
        queryKey: [`department-${id}`],
        enabled: isUUID(id),
        queryFn: () => getDepartmentById(id),
    });

export const useUpdateDepartment = async (department) => {
    const { status, data, message } = await updateDepartment(department);
    return status === 200;
};
