// React Query
import { useQuery } from "@tanstack/react-query";

// Requests
import {
    canBeMainCurrency,
    createCurrency,
    getCurrencies,
    getCurrenciesForCustomers,
    getCurrencyById,
    updateCurrency,
} from "@/app/request/currencies/requestsCurrencies";

export const useGetCurrencies = () =>
    useQuery({
        queryKey: [`currencies`],
        queryFn: () => getCurrencies(),
    });

export const useGetCurrenciesForCustomers = () =>
    useQuery({
        queryKey: [`currencies-for-customers`],
        queryFn: () => getCurrenciesForCustomers(),
    });

export const useGetCurrencyById = (idCurrency) =>
    useQuery({
        queryKey: [`currency-${idCurrency}`],
        queryFn: () => getCurrencyById(idCurrency),
    });

export const useCreateCurrency = async (currencies) => {
    const { data, status } = await createCurrency(currencies);
    return status == 201;
};

export const useUpdateCurrency = async (currency) => {
    const { data, status } = await updateCurrency(currency);
    return status == 200;
};

export const useCanBeMainCurrency = async (idCurrency) => {
    const { data, status } = await canBeMainCurrency(idCurrency);
    return data.data;
};
