// Axios
import api from "@/app/api/api";

export const getLocationsCountries = async () => {
    try {
        const res = await api.get(`/api/locations/countries`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error.");
    }
};

export const getLocationCountryById = async (id) => {
    try {
        const res = await api.get(`/api/locations/countries/${id}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error.");
    }
};

export const createLocationCountry = async (country) => {
    try {
        const res = await api.post(`/api/locations/countries`, country);
        return { status: res.status, data: res.data.data, message: res.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la monedas.");
    }
};

export const updateLocationCountry = async (country) => {
    try {
        const res = await api.put(`/api/locations/countries/${country.id}`, country);
        return { status: res.status, data: res.data.data, message: res.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la monedas.");
    }
};

export const getLocationsProvinces = async () => {
    try {
        const res = await api.get(`/api/locations/provinces`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error.");
    }
};

export const getLocationProvinceById = async (id) => {
    try {
        const res = await api.get(`/api/locations/provinces/${id}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error.");
    }
};

export const getLocationProvincesByCountry = async (id) => {
    try {
        const res = await api.get(`/api/locations/provinces/by-country/${id}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error.");
    }
};

export const createLocationProvince = async (province) => {
    try {
        const res = await api.post(`/api/locations/provinces`, province);
        return { status: res.status, data: res.data.data, message: res.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la monedas.");
    }
};

export const updateLocationProvinces = async (province) => {
    try {
        const res = await api.put(`/api/locations/provinces/${province.id}`, province);
        return { status: res.status, data: res.data.data, message: res.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la monedas.");
    }
};

export const getLocationsMunicipalities = async () => {
    try {
        const res = await api.get(`/api/locations/municipalities`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error.");
    }
};

export const getLocationMunicipalityById = async (id) => {
    try {
        const res = await api.get(`/api/locations/municipalities/${id}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error.");
    }
};

export const getLocationMunicipalitiesByprovince = async (id) => {
    try {
        const res = await api.get(`/api/locations/municipalities/by-province/${id}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error.");
    }
};

export const createLocationMunicipality = async (province) => {
    try {
        const res = await api.post(`/api/locations/municipalities`, province);
        return { status: res.status, data: res.data.data, message: res.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la monedas.");
    }
};

export const updateLocationMunicipality = async (province) => {
    try {
        const res = await api.put(`/api/locations/municipalities/${province.id}`, province);
        return { status: res.status, data: res.data.data, message: res.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la monedas.");
    }
};

export const getLocationsNeighborhoods = async () => {
    try {
        const res = await api.get(`/api/locations/neighborhoods`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error.");
    }
};

export const getLocationNeighborhoodById = async (id) => {
    try {
        const res = await api.get(`/api/locations/neighborhoods/${id}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error.");
    }
};
export const getLocationNeighborhoodsByMunicipality = async (id) => {
    try {
        const res = await api.get(`/api/locations/neighborhoods/by-municipality/${id}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error.");
    }
};

export const createLocationNeighborhood = async (province) => {
    try {
        const res = await api.post(`/api/locations/neighborhoods`, province);
        return { status: res.status, data: res.data.data, message: res.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la monedas.");
    }
};

export const updateLocationNeighborhood = async (province) => {
    try {
        const res = await api.put(`/api/locations/neighborhoods/${province.id}`, province);
        return { status: res.status, data: res.data.data, message: res.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la monedas.");
    }
};
