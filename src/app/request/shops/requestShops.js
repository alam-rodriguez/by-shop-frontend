import api from "@/app/api/api";

export const getShops = async () => {
    const res = await fetch("http://localhost:3001/api/shops");
    const data = await res.json();
    return { res, data };
};

export const createShop = async (shop) => {
    const res = await fetch("http://localhost:3001/api/shops", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(shop),
    });
    const data = await res.json();
    return { res, data };
};

export const updateShop = async (shop) => {
    const res = await fetch(`http://localhost:3001/api/shops/${shop.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(shop),
    });
    const data = await res.json();
    return { res, data };
};

export const getShops2 = async () => {
    try {
        const res = await api.get(`/api/shops`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const getShopById = async (id) => {
    try {
        const res = await api.get(`/api/shops/${id}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la tienda.");
    }
};
