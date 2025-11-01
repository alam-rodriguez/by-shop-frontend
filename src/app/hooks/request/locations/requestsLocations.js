// TanStack Query
import { useQuery } from "@tanstack/react-query";

// Requests
import {
    createLocationCountry,
    createLocationMunicipality,
    createLocationNeighborhood,
    createLocationProvince,
    getLocationCountryById,
    getLocationMunicipalitiesByprovince,
    getLocationMunicipalityById,
    getLocationNeighborhoodById,
    getLocationNeighborhoodsByMunicipality,
    getLocationProvinceById,
    getLocationProvincesByCountry,
    getLocationsCountries,
    getLocationsMunicipalities,
    getLocationsNeighborhoods,
    getLocationsProvinces,
    updateLocationCountry,
    updateLocationMunicipality,
    updateLocationNeighborhood,
    updateLocationProvinces,
} from "@/app/request/locations/requestsLocations";
import { isUUID } from "../../app/app";

export const useGetLocationsCountries = () =>
    useQuery({
        queryKey: [`locations-countries`],
        queryFn: () => getLocationsCountries(),
    });

export const useGetLocationCountryById = (id) =>
    useQuery({
        queryKey: [`location-country-${id}`],
        enabled: isUUID(id),
        queryFn: () => getLocationCountryById(id),
    });

export const useCreateLocationCountry = async (country) => {
    const { data, status, message } = await createLocationCountry(country);
    return status == 201;
};

export const useUpdateLocationCountry = async (country) => {
    const { data, status, message } = await updateLocationCountry(country);
    return status == 200;
};

export const useGetLocationsProvinces = () =>
    useQuery({
        queryKey: [`locations-provinces`],
        queryFn: () => getLocationsProvinces(),
    });

export const useGetLocationProvinceById = (id) =>
    useQuery({
        queryKey: [`location-province-${id}`],
        enabled: isUUID(id),
        queryFn: () => getLocationProvinceById(id),
    });

export const useGetLocationProvincesByCountry = (id) =>
    useQuery({
        queryKey: [`locations-provinces-by-country-${id}`],
        enabled: isUUID(id),
        queryFn: () => getLocationProvincesByCountry(id),
    });

export const useCreateLocationProvince = async (province) => {
    const { data, status, message } = await createLocationProvince(province);
    return status == 201;
};

export const useUpdateLocationProvinces = async (province) => {
    const { data, status, message } = await updateLocationProvinces(province);
    return status == 200;
};

export const useGetLocationsMunicipalities = () =>
    useQuery({
        queryKey: [`locations-municipalities`],
        queryFn: () => getLocationsMunicipalities(),
    });

export const useGetLocationMunicipalityById = (id) =>
    useQuery({
        queryKey: [`location-municipality-${id}`],
        enabled: isUUID(id),
        queryFn: () => getLocationMunicipalityById(id),
    });

export const useGetLocationMunicipalitiesByprovince = (id) =>
    useQuery({
        queryKey: [`locations-municipalities-by-province-${id}`],
        enabled: isUUID(id),
        queryFn: () => getLocationMunicipalitiesByprovince(id),
    });

export const useCreateLocationMunicipality = async (province) => {
    const { data, status, message } = await createLocationMunicipality(province);
    return status == 201;
};

export const useUpdateLocationMunicipality = async (province) => {
    const { data, status, message } = await updateLocationMunicipality(province);
    return status == 200;
};

export const useGetLocationsNeighborhoods = () =>
    useQuery({
        queryKey: [`locations-neighborhoods`],
        queryFn: () => getLocationsNeighborhoods(),
    });

export const useGetLocationNeighborhoodById = (id) =>
    useQuery({
        queryKey: [`location-neighborhood-${id}`],
        enabled: isUUID(id),
        queryFn: () => getLocationNeighborhoodById(id),
    });

export const useGetLocationNeighborhoodsByMunicipality = (id) =>
    useQuery({
        queryKey: [`locations-neighborhoods-by-municipality-${id}`],
        enabled: isUUID(id),
        queryFn: () => getLocationNeighborhoodsByMunicipality(id),
    });

export const useCreateLocationNeighborhood = async (province) => {
    const { data, status, message } = await createLocationNeighborhood(province);
    return status == 201;
};

export const useUpdateLocationNeighborhood = async (province) => {
    const { data, status, message } = await updateLocationNeighborhood(province);
    return status == 200;
};
