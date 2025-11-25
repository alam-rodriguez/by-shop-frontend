// Axios
import api from "@/app/api/api.js";

export const getOffers = async () => {
    try {
        const response = await api.get(`/offers`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las ofertas.");
    }
};

export const getOffersByShopId = async (shopId) => {
    try {
        const response = await api.get(`/offers/shop/${shopId}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las ofertas.");
    }
};

export const getOffer = async (id) => {
    try {
        const response = await api.get(`/offers/${id}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la oferta.");
    }
};

export const createOffer = async (offer) => {
    try {
        const response = await api.post(`/offers`, offer);
        console.log(response);
        return { status: response.status, data: response.data.data };
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear la oferta.");
    }
};

export const createOfferCategory = async (offer) => {
    try {
        const response = await api.post(`/offers/categories`, offer);
        return { status: response.status, data: response.data.data };
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear la categoria de la oferta.");
    }
};

export const deleteOfferCategory = async (idOffer, idCategory) => {
    try {
        const response = await api.delete(`/offers/categories/${idOffer}/${idCategory}`);
        return { status: response.status, data: response.data.data };
    } catch (error) {
        console.log(error);
        throw new Error("Error al eliminar la categoria de la oferta.");
    }
};

export const createOfferArticle = async (offer) => {
    try {
        const response = await api.post(`/offers/articles`, offer);
        return { status: response.status, data: response.data.data };
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear el articulo de la oferta.");
    }
};

export const deleteOfferArticle = async (idOffer, idArticle) => {
    try {
        const response = await api.delete(`/offers/articles/${idOffer}/${idArticle}`);
        return { status: response.status, data: response.data.data };
    } catch (error) {
        console.log(error);
        throw new Error("Error al eliminar el articulo de la oferta.");
    }
};

export const updateOffer = async (offer) => {
    try {
        const response = await api.put(`/offers/${offer.id}`, offer);
        console.log(response);
        return { status: response.status, data: response.data.data };
    } catch (error) {
        console.log(error);
        throw new Error("Error al actualizar la oferta.");
    }
};

export const updateOfferCategory = async (offerCategory) => {
    try {
        const response = await api.put(`/offers/categories/${offerCategory.id}`, offerCategory);
        return { status: response.status, data: response.data.data };
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear la categoria de la oferta.");
    }
};
