import { useQuery } from "@tanstack/react-query";
import { createPeriod, getActivePeriod } from "@/app/request/periods/requestsPeriods";

export const useCreatePeriod = async (period) => {
    const { data, status, message } = await createPeriod(period);
    return status === 201;
};

export const useGetActivePeriod = () =>
    useQuery({
        queryKey: [`active-period`],
        queryFn: () => getActivePeriod(),
    });
