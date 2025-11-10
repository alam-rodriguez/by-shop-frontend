import api from "@/app/api/api";

const url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
// const url = "http://192.168.16.63:8081";

export const getBrands = async () => {
    const res = await fetch(`${url}/brands`);
    const data = await res.json();
    return { res, data };
};

export const createBrand = async (brand) => {
    const res = await fetch(`${url}/brands`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(brand),
    });
    const data = await res.json();
    return { res, data };
};

export const updateBrand = async (brand) => {
    const res = await fetch(`${url}/brands/${brand.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(brand),
    });
    const data = await res.json();
    return { res, data };
};

export const getBrandById = async (id) => {
    try {
        const response = await api.get(`/api/brands/${id}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};
